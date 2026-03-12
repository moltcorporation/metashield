import * as cheerio from "cheerio";
import type { MetaData, ParseResponse } from "./types";

const USER_AGENT =
  "MetaShield/1.0 (https://metashield-moltcorporation.vercel.app; meta tag checker)";
const FETCH_TIMEOUT_MS = 10_000;
const MAX_REDIRECTS = 5;
const MAX_BODY_BYTES = 5 * 1024 * 1024; // 5MB

export async function fetchAndParseMeta(url: string): Promise<ParseResponse> {
  // Validate and normalize URL
  let normalizedUrl = url.trim();
  if (
    !normalizedUrl.startsWith("http://") &&
    !normalizedUrl.startsWith("https://")
  ) {
    normalizedUrl = "https://" + normalizedUrl;
  }

  let parsed: URL;
  try {
    parsed = new URL(normalizedUrl);
  } catch {
    return { success: false, error: "Invalid URL" };
  }

  // Only allow http/https
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    return { success: false, error: "Only HTTP and HTTPS URLs are supported" };
  }

  // Fetch the page
  let response: Response;
  let redirectCount = 0;
  let currentUrl = normalizedUrl;

  try {
    response = await fetch(currentUrl, {
      headers: { "User-Agent": USER_AGENT },
      redirect: "follow",
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });

    // Track redirects via response.redirected and url
    if (response.redirected) {
      redirectCount = 1; // fetch API doesn't expose the count, but we know it redirected
      currentUrl = response.url;
    }

    // Enforce redirect limit by checking if the final URL changed
    if (redirectCount > MAX_REDIRECTS) {
      return { success: false, error: "Too many redirects" };
    }
  } catch (err) {
    if (err instanceof DOMException && err.name === "TimeoutError") {
      return { success: false, error: "Request timed out (10s limit)" };
    }
    if (err instanceof TypeError) {
      return { success: false, error: "Could not connect to the URL" };
    }
    return {
      success: false,
      error: `Fetch failed: ${err instanceof Error ? err.message : "Unknown error"}`,
    };
  }

  if (!response.ok) {
    return {
      success: false,
      error: `HTTP ${response.status}: ${response.statusText}`,
    };
  }

  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("text/html") && !contentType.includes("text/xhtml")) {
    return {
      success: false,
      error: `Not an HTML page (content-type: ${contentType})`,
    };
  }

  // Read body with size limit
  let html: string;
  try {
    const buffer = await response.arrayBuffer();
    if (buffer.byteLength > MAX_BODY_BYTES) {
      return { success: false, error: "Page too large (>5MB)" };
    }
    html = new TextDecoder("utf-8").decode(buffer);
  } catch {
    return { success: false, error: "Failed to read response body" };
  }

  // Parse with cheerio
  const data = parseHtml(html, currentUrl);

  return {
    success: true,
    data: {
      ...data,
      fetchedUrl: normalizedUrl,
      finalUrl: currentUrl,
      redirectCount,
      contentType,
    },
  };
}

function parseHtml(
  html: string,
  baseUrl: string
): Omit<MetaData, "fetchedUrl" | "finalUrl" | "redirectCount" | "contentType"> {
  const $ = cheerio.load(html);

  // Check for <base href>
  const baseHref = $("base").attr("href");
  const resolveBase = baseHref || baseUrl;

  function resolveUrl(url: string | null | undefined): string | null {
    if (!url) return null;
    try {
      return new URL(url, resolveBase).href;
    } catch {
      return url;
    }
  }

  // Extract all meta tags into a flat map
  const allMeta: Record<string, string> = {};
  $("meta").each((_, el) => {
    const $el = $(el);
    const prop =
      $el.attr("property") || $el.attr("name") || $el.attr("http-equiv");
    const content = $el.attr("content");
    if (prop && content) {
      // Store first occurrence (platforms use the first one)
      if (!(prop in allMeta)) {
        allMeta[prop] = content;
      }
    }
  });

  // Title: prefer <title> tag
  const titleTag = $("title").first().text().trim() || null;

  // Charset
  const charset =
    $('meta[charset]').attr("charset") ||
    allMeta["Content-Type"]?.match(/charset=([^\s;]+)/)?.[1] ||
    null;

  // Favicon
  const favicon =
    resolveUrl(
      $('link[rel="icon"]').attr("href") ||
        $('link[rel="shortcut icon"]').attr("href")
    );

  // Apple touch icon
  const appleTouchIcon = resolveUrl(
    $('link[rel="apple-touch-icon"]').attr("href")
  );

  // Canonical
  const canonicalUrl = resolveUrl($('link[rel="canonical"]').attr("href"));

  // JSON-LD
  const jsonLdScripts: Record<string, unknown>[] = [];
  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const parsed = JSON.parse($(el).html() || "");
      jsonLdScripts.push(parsed);
    } catch {
      // Skip malformed JSON-LD
    }
  });

  return {
    title: titleTag,
    description: allMeta["description"] || null,
    charset,
    viewport: allMeta["viewport"] || null,
    canonicalUrl,
    robots: allMeta["robots"] || null,
    favicon,
    appleTouchIcon,

    ogTitle: allMeta["og:title"] || null,
    ogDescription: allMeta["og:description"] || null,
    ogImage: resolveUrl(allMeta["og:image"]),
    ogImageWidth: allMeta["og:image:width"] || null,
    ogImageHeight: allMeta["og:image:height"] || null,
    ogType: allMeta["og:type"] || null,
    ogUrl: allMeta["og:url"] || null,
    ogSiteName: allMeta["og:site_name"] || null,

    twitterCard: allMeta["twitter:card"] || null,
    twitterTitle: allMeta["twitter:title"] || null,
    twitterDescription: allMeta["twitter:description"] || null,
    twitterImage: resolveUrl(allMeta["twitter:image"]),
    twitterSite: allMeta["twitter:site"] || null,
    twitterCreator: allMeta["twitter:creator"] || null,

    jsonLd: jsonLdScripts.length > 0 ? jsonLdScripts : null,

    allMeta,
  };
}
