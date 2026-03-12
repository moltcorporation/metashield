import type { MetaData } from "./types";

export interface CrawlabilityCheck {
  id: string;
  label: string;
  status: "pass" | "warn" | "fail" | "info";
  message: string;
}

export interface CrawlabilityResult {
  checks: CrawlabilityCheck[];
  robotsTxtFound: boolean;
  robotsTxtRaw: string | null;
}

/**
 * Fetch robots.txt for the domain and check if the scanned URL path is blocked.
 * Also check canonical tag consistency.
 */
export async function checkCrawlability(
  metaData: MetaData
): Promise<CrawlabilityResult> {
  const checks: CrawlabilityCheck[] = [];
  let robotsTxtFound = false;
  let robotsTxtRaw: string | null = null;

  // 1. Fetch robots.txt
  try {
    const parsedUrl = new URL(metaData.finalUrl);
    const robotsUrl = `${parsedUrl.protocol}//${parsedUrl.host}/robots.txt`;

    const res = await fetch(robotsUrl, {
      headers: { "User-Agent": "MetaShield/1.0" },
      signal: AbortSignal.timeout(5000),
    });

    if (res.ok) {
      const text = await res.text();
      // Limit stored size
      robotsTxtRaw = text.slice(0, 5000);
      robotsTxtFound = true;

      // Parse robots.txt for Googlebot rules
      const blocked = isPathBlocked(text, parsedUrl.pathname);

      if (blocked) {
        checks.push({
          id: "robots-blocked",
          label: "robots.txt",
          status: "warn",
          message: `This page's path (${parsedUrl.pathname}) is blocked from Googlebot crawling by robots.txt.`,
        });
      } else {
        checks.push({
          id: "robots-allowed",
          label: "robots.txt",
          status: "pass",
          message: "This page is allowed for Googlebot crawling.",
        });
      }
    } else if (res.status === 404) {
      checks.push({
        id: "robots-missing",
        label: "robots.txt",
        status: "info",
        message: "No robots.txt found. All crawlers are allowed by default.",
      });
    } else {
      checks.push({
        id: "robots-error",
        label: "robots.txt",
        status: "info",
        message: `robots.txt returned HTTP ${res.status}. Unable to determine crawl rules.`,
      });
    }
  } catch {
    checks.push({
      id: "robots-fetch-error",
      label: "robots.txt",
      status: "info",
      message: "Could not fetch robots.txt. The domain may be unreachable.",
    });
  }

  // 2. Check meta robots tag
  if (metaData.robots) {
    const directives = metaData.robots.toLowerCase();
    if (directives.includes("noindex")) {
      checks.push({
        id: "meta-robots-noindex",
        label: "Meta Robots",
        status: "warn",
        message: `Meta robots tag contains "noindex" — this page will not appear in search results.`,
      });
    } else {
      checks.push({
        id: "meta-robots-ok",
        label: "Meta Robots",
        status: "pass",
        message: `Meta robots tag: "${metaData.robots}" — page is indexable.`,
      });
    }
  } else {
    checks.push({
      id: "meta-robots-absent",
      label: "Meta Robots",
      status: "pass",
      message: "No meta robots tag found. Page is indexable by default.",
    });
  }

  // 3. Check canonical URL
  if (metaData.canonicalUrl) {
    try {
      const canonical = new URL(metaData.canonicalUrl, metaData.finalUrl).toString();
      const final = metaData.finalUrl;

      // Normalize for comparison (strip trailing slashes)
      const normalizeUrl = (u: string) => u.replace(/\/+$/, "").toLowerCase();

      if (normalizeUrl(canonical) === normalizeUrl(final)) {
        checks.push({
          id: "canonical-match",
          label: "Canonical URL",
          status: "pass",
          message: "Canonical URL matches the current page URL.",
        });
      } else {
        checks.push({
          id: "canonical-mismatch",
          label: "Canonical URL",
          status: "warn",
          message: `Canonical URL points to a different page: ${canonical}`,
        });
      }
    } catch {
      checks.push({
        id: "canonical-invalid",
        label: "Canonical URL",
        status: "warn",
        message: `Invalid canonical URL: "${metaData.canonicalUrl}"`,
      });
    }
  } else {
    checks.push({
      id: "canonical-missing",
      label: "Canonical URL",
      status: "info",
      message: "No canonical URL set. Consider adding one to avoid duplicate content issues.",
    });
  }

  return { checks, robotsTxtFound, robotsTxtRaw };
}

/**
 * Simple robots.txt parser — checks if a path is blocked for Googlebot or *.
 */
function isPathBlocked(robotsTxt: string, path: string): boolean {
  const lines = robotsTxt.split("\n").map((l) => l.trim());
  let inRelevantBlock = false;
  let blocked = false;

  for (const line of lines) {
    const lower = line.toLowerCase();

    if (lower.startsWith("user-agent:")) {
      const agent = lower.slice("user-agent:".length).trim();
      inRelevantBlock = agent === "*" || agent === "googlebot";
      continue;
    }

    if (!inRelevantBlock) continue;

    if (lower.startsWith("disallow:")) {
      const pattern = line.slice("disallow:".length).trim();
      if (pattern && path.startsWith(pattern)) {
        blocked = true;
      }
    }

    if (lower.startsWith("allow:")) {
      const pattern = line.slice("allow:".length).trim();
      if (pattern && path.startsWith(pattern)) {
        blocked = false;
      }
    }
  }

  return blocked;
}
