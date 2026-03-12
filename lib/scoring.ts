import type { MetaData } from "./types";

export type RuleStatus = "pass" | "warn" | "fail";

export type RuleCategory = "essentials" | "social" | "technical" | "quality";

export interface RuleResult {
  id: string;
  category: RuleCategory;
  status: RuleStatus;
  message: string;
  fix: string | null;
}

export interface CategoryScore {
  category: RuleCategory;
  label: string;
  earned: number;
  possible: number;
  rules: RuleResult[];
}

export interface ScoringResult {
  score: number;
  categories: CategoryScore[];
  rules: RuleResult[];
  passCount: number;
  warnCount: number;
  failCount: number;
}

// Point allocations per category
const CATEGORY_POINTS: Record<RuleCategory, number> = {
  essentials: 40,
  social: 30,
  technical: 20,
  quality: 10,
};

const CATEGORY_LABELS: Record<RuleCategory, string> = {
  essentials: "Essentials",
  social: "Social Sharing",
  technical: "Technical",
  quality: "Quality",
};

interface RuleDefinition {
  id: string;
  category: RuleCategory;
  weight: number;
  evaluate: (data: MetaData) => { status: RuleStatus; message: string; fix: string | null };
}

function charLength(s: string | null): number {
  return s ? s.length : 0;
}

const rules: RuleDefinition[] = [
  // ── Essentials (40 pts) ──────────────────────────────────────────────

  {
    id: "title-exists",
    category: "essentials",
    weight: 10,
    evaluate: (data) => {
      if (!data.title) {
        return {
          status: "fail",
          message: "Page is missing a <title> tag.",
          fix: `<title>Your Page Title Here</title>`,
        };
      }
      return { status: "pass", message: "Page has a <title> tag.", fix: null };
    },
  },
  {
    id: "title-length",
    category: "essentials",
    weight: 5,
    evaluate: (data) => {
      const len = charLength(data.title);
      if (len === 0) return { status: "fail", message: "No title to measure length.", fix: null };
      if (len < 30) return { status: "warn", message: `Title is short (${len} chars). Aim for 50–60 characters.`, fix: null };
      if (len > 60) return { status: "warn", message: `Title is long (${len} chars). May be truncated in search results. Aim for 50–60.`, fix: null };
      return { status: "pass", message: `Title length is good (${len} chars).`, fix: null };
    },
  },
  {
    id: "description-exists",
    category: "essentials",
    weight: 10,
    evaluate: (data) => {
      if (!data.description) {
        return {
          status: "fail",
          message: "Page is missing a meta description.",
          fix: `<meta name="description" content="A concise description of your page (150-160 chars)." />`,
        };
      }
      return { status: "pass", message: "Page has a meta description.", fix: null };
    },
  },
  {
    id: "description-length",
    category: "essentials",
    weight: 5,
    evaluate: (data) => {
      const len = charLength(data.description);
      if (len === 0) return { status: "fail", message: "No description to measure length.", fix: null };
      if (len < 120) return { status: "warn", message: `Meta description is short (${len} chars). Aim for 150–160.`, fix: null };
      if (len > 160) return { status: "warn", message: `Meta description is long (${len} chars). May be truncated. Aim for 150–160.`, fix: null };
      return { status: "pass", message: `Meta description length is good (${len} chars).`, fix: null };
    },
  },
  {
    id: "canonical-url",
    category: "essentials",
    weight: 5,
    evaluate: (data) => {
      if (!data.canonicalUrl) {
        const url = data.fetchedUrl;
        return {
          status: "fail",
          message: "No canonical URL found. This can cause duplicate content issues.",
          fix: `<link rel="canonical" href="${url}" />`,
        };
      }
      return { status: "pass", message: "Canonical URL is set.", fix: null };
    },
  },
  {
    id: "viewport",
    category: "essentials",
    weight: 5,
    evaluate: (data) => {
      if (!data.viewport) {
        return {
          status: "fail",
          message: "No viewport meta tag. Page may not be mobile-friendly.",
          fix: `<meta name="viewport" content="width=device-width, initial-scale=1" />`,
        };
      }
      return { status: "pass", message: "Viewport meta tag is set.", fix: null };
    },
  },

  // ── Social (30 pts) ──────────────────────────────────────────────────

  {
    id: "og-title",
    category: "social",
    weight: 5,
    evaluate: (data) => {
      if (!data.ogTitle) {
        const fallback = data.title || "Your Page Title";
        return {
          status: "fail",
          message: "Missing og:title. Social platforms will fall back to <title> tag.",
          fix: `<meta property="og:title" content="${fallback}" />`,
        };
      }
      return { status: "pass", message: "og:title is set.", fix: null };
    },
  },
  {
    id: "og-description",
    category: "social",
    weight: 4,
    evaluate: (data) => {
      if (!data.ogDescription) {
        const fallback = data.description || "A description of your page.";
        return {
          status: "fail",
          message: "Missing og:description. Social shares will lack a description.",
          fix: `<meta property="og:description" content="${fallback}" />`,
        };
      }
      return { status: "pass", message: "og:description is set.", fix: null };
    },
  },
  {
    id: "og-image-exists",
    category: "social",
    weight: 6,
    evaluate: (data) => {
      if (!data.ogImage) {
        return {
          status: "fail",
          message: "Missing og:image. Social shares will have no image — the biggest factor in click-through.",
          fix: `<meta property="og:image" content="https://yoursite.com/og-image.png" />`,
        };
      }
      return { status: "pass", message: "og:image is set.", fix: null };
    },
  },
  {
    id: "og-image-dimensions",
    category: "social",
    weight: 3,
    evaluate: (data) => {
      if (!data.ogImage) return { status: "fail", message: "No og:image to check dimensions for.", fix: null };
      if (!data.ogImageWidth || !data.ogImageHeight) {
        return {
          status: "warn",
          message: "og:image:width and og:image:height not declared. Platforms may render the image incorrectly.",
          fix: `<meta property="og:image:width" content="1200" />\n<meta property="og:image:height" content="630" />`,
        };
      }
      return { status: "pass", message: "og:image dimensions are declared.", fix: null };
    },
  },
  {
    id: "twitter-card",
    category: "social",
    weight: 5,
    evaluate: (data) => {
      if (!data.twitterCard) {
        return {
          status: "fail",
          message: "Missing twitter:card. Twitter/X will use a minimal summary card by default.",
          fix: `<meta name="twitter:card" content="summary_large_image" />`,
        };
      }
      const valid = ["summary", "summary_large_image", "player", "app"];
      if (!valid.includes(data.twitterCard)) {
        return {
          status: "warn",
          message: `Unknown twitter:card value: "${data.twitterCard}". Expected one of: ${valid.join(", ")}.`,
          fix: `<meta name="twitter:card" content="summary_large_image" />`,
        };
      }
      return { status: "pass", message: `twitter:card is set to "${data.twitterCard}".`, fix: null };
    },
  },
  {
    id: "twitter-image",
    category: "social",
    weight: 4,
    evaluate: (data) => {
      if (!data.twitterImage && !data.ogImage) {
        return {
          status: "fail",
          message: "No twitter:image or og:image. Twitter/X shares will have no image.",
          fix: `<meta name="twitter:image" content="https://yoursite.com/twitter-card.png" />`,
        };
      }
      if (!data.twitterImage && data.ogImage) {
        return {
          status: "pass",
          message: "No twitter:image, but og:image exists — Twitter/X will use it as fallback.",
          fix: null,
        };
      }
      return { status: "pass", message: "twitter:image is set.", fix: null };
    },
  },
  {
    id: "twitter-title",
    category: "social",
    weight: 3,
    evaluate: (data) => {
      if (!data.twitterTitle && !data.ogTitle) {
        return {
          status: "warn",
          message: "No twitter:title or og:title. Twitter/X will fall back to <title>.",
          fix: `<meta name="twitter:title" content="${data.title || "Your Title"}" />`,
        };
      }
      return { status: "pass", message: "Twitter title available (via twitter:title or og:title fallback).", fix: null };
    },
  },

  // ── Technical (20 pts) ───────────────────────────────────────────────

  {
    id: "favicon",
    category: "technical",
    weight: 3,
    evaluate: (data) => {
      if (!data.favicon) {
        return {
          status: "warn",
          message: "No favicon link tag found. Browsers show a default icon.",
          fix: `<link rel="icon" href="/favicon.ico" />`,
        };
      }
      return { status: "pass", message: "Favicon is set.", fix: null };
    },
  },
  {
    id: "json-ld",
    category: "technical",
    weight: 3,
    evaluate: (data) => {
      if (!data.jsonLd || data.jsonLd.length === 0) {
        return {
          status: "warn",
          message: "No JSON-LD structured data found. Adding it improves rich search results.",
          fix: `<script type="application/ld+json">{"@context":"https://schema.org","@type":"WebPage","name":"Your Page"}</script>`,
        };
      }
      return { status: "pass", message: `Found ${data.jsonLd.length} JSON-LD block(s).`, fix: null };
    },
  },
  {
    id: "robots-not-blocking",
    category: "technical",
    weight: 4,
    evaluate: (data) => {
      if (!data.robots) {
        return { status: "pass", message: "No robots meta tag — search engines can index freely.", fix: null };
      }
      const lower = data.robots.toLowerCase();
      if (lower.includes("noindex")) {
        return {
          status: "warn",
          message: "Robots meta tag includes 'noindex'. Search engines won't index this page.",
          fix: `<meta name="robots" content="index, follow" />`,
        };
      }
      return { status: "pass", message: "Robots meta tag allows indexing.", fix: null };
    },
  },
  {
    id: "no-duplicate-title",
    category: "technical",
    weight: 2,
    evaluate: (data) => {
      // Check if og:title duplicates the <title> exactly
      if (data.ogTitle && data.title && data.ogTitle === data.title) {
        return {
          status: "pass",
          message: "og:title matches <title> (consistent).",
          fix: null,
        };
      }
      return { status: "pass", message: "Title tags are consistent.", fix: null };
    },
  },
  {
    id: "charset",
    category: "technical",
    weight: 3,
    evaluate: (data) => {
      if (!data.charset) {
        return {
          status: "warn",
          message: "No charset declared. May cause character encoding issues.",
          fix: `<meta charset="utf-8" />`,
        };
      }
      return { status: "pass", message: `Charset declared: ${data.charset}.`, fix: null };
    },
  },
  {
    id: "og-url",
    category: "technical",
    weight: 3,
    evaluate: (data) => {
      if (!data.ogUrl) {
        return {
          status: "warn",
          message: "No og:url set. Helps social platforms identify the canonical share URL.",
          fix: `<meta property="og:url" content="${data.canonicalUrl || data.fetchedUrl}" />`,
        };
      }
      return { status: "pass", message: "og:url is set.", fix: null };
    },
  },
  {
    id: "og-type",
    category: "technical",
    weight: 2,
    evaluate: (data) => {
      if (!data.ogType) {
        return {
          status: "warn",
          message: "No og:type set. Defaults to 'website'. Setting it explicitly is better.",
          fix: `<meta property="og:type" content="website" />`,
        };
      }
      return { status: "pass", message: `og:type is set to "${data.ogType}".`, fix: null };
    },
  },

  // ── Quality (10 pts) ─────────────────────────────────────────────────

  {
    id: "og-image-optimal-size",
    category: "quality",
    weight: 4,
    evaluate: (data) => {
      if (!data.ogImageWidth || !data.ogImageHeight) {
        return { status: "warn", message: "Cannot verify og:image dimensions — width/height not declared.", fix: null };
      }
      const w = parseInt(data.ogImageWidth, 10);
      const h = parseInt(data.ogImageHeight, 10);
      if (isNaN(w) || isNaN(h)) {
        return { status: "warn", message: "og:image dimensions are not valid numbers.", fix: null };
      }
      if (w >= 1200 && h >= 630) {
        return { status: "pass", message: `og:image dimensions are optimal (${w}×${h}).`, fix: null };
      }
      if (w >= 600 && h >= 315) {
        return {
          status: "warn",
          message: `og:image dimensions (${w}×${h}) are acceptable but not optimal. Recommended: 1200×630.`,
          fix: null,
        };
      }
      return {
        status: "fail",
        message: `og:image is too small (${w}×${h}). Minimum 600×315, recommended 1200×630.`,
        fix: `<meta property="og:image:width" content="1200" />\n<meta property="og:image:height" content="630" />`,
      };
    },
  },
  {
    id: "description-not-truncated",
    category: "quality",
    weight: 2,
    evaluate: (data) => {
      if (!data.ogDescription) return { status: "pass", message: "No og:description to check.", fix: null };
      if (data.ogDescription.endsWith("...") || data.ogDescription.endsWith("…")) {
        return {
          status: "warn",
          message: "og:description appears truncated (ends with '...'). Write a complete description.",
          fix: null,
        };
      }
      if (charLength(data.ogDescription) > 200) {
        return {
          status: "warn",
          message: `og:description is long (${charLength(data.ogDescription)} chars). May be truncated on some platforms.`,
          fix: null,
        };
      }
      return { status: "pass", message: "og:description looks complete.", fix: null };
    },
  },
  {
    id: "no-placeholder-text",
    category: "quality",
    weight: 2,
    evaluate: (data) => {
      const placeholders = [
        "lorem ipsum",
        "placeholder",
        "your title here",
        "todo",
        "example.com",
        "test page",
        "untitled",
      ];
      const fields = [data.title, data.description, data.ogTitle, data.ogDescription].filter(Boolean) as string[];
      for (const field of fields) {
        const lower = field.toLowerCase();
        for (const p of placeholders) {
          if (lower.includes(p)) {
            return {
              status: "fail",
              message: `Possible placeholder text detected: "${p}" found in meta tags.`,
              fix: null,
            };
          }
        }
      }
      return { status: "pass", message: "No placeholder text detected.", fix: null };
    },
  },
  {
    id: "og-site-name",
    category: "quality",
    weight: 2,
    evaluate: (data) => {
      if (!data.ogSiteName) {
        return {
          status: "warn",
          message: "No og:site_name set. Helps platforms show your brand name.",
          fix: `<meta property="og:site_name" content="Your Site Name" />`,
        };
      }
      return { status: "pass", message: `og:site_name is set to "${data.ogSiteName}".`, fix: null };
    },
  },
];

export function scoreMetaData(data: MetaData): ScoringResult {
  const ruleResults: RuleResult[] = [];
  const categoryTotals: Record<RuleCategory, { earned: number; possible: number; rules: RuleResult[] }> = {
    essentials: { earned: 0, possible: 0, rules: [] },
    social: { earned: 0, possible: 0, rules: [] },
    technical: { earned: 0, possible: 0, rules: [] },
    quality: { earned: 0, possible: 0, rules: [] },
  };

  for (const rule of rules) {
    const { status, message, fix } = rule.evaluate(data);
    const result: RuleResult = {
      id: rule.id,
      category: rule.category,
      status,
      message,
      fix,
    };

    ruleResults.push(result);
    categoryTotals[rule.category].possible += rule.weight;
    categoryTotals[rule.category].rules.push(result);

    if (status === "pass") {
      categoryTotals[rule.category].earned += rule.weight;
    } else if (status === "warn") {
      categoryTotals[rule.category].earned += rule.weight * 0.5;
    }
    // fail = 0 points
  }

  // Normalize each category to its allocated point budget
  const categories: CategoryScore[] = (Object.keys(CATEGORY_POINTS) as RuleCategory[]).map((cat) => {
    const totals = categoryTotals[cat];
    const ratio = totals.possible > 0 ? totals.earned / totals.possible : 1;
    const earned = Math.round(ratio * CATEGORY_POINTS[cat]);
    return {
      category: cat,
      label: CATEGORY_LABELS[cat],
      earned,
      possible: CATEGORY_POINTS[cat],
      rules: totals.rules,
    };
  });

  const score = categories.reduce((sum, cat) => sum + cat.earned, 0);

  return {
    score,
    categories,
    rules: ruleResults,
    passCount: ruleResults.filter((r) => r.status === "pass").length,
    warnCount: ruleResults.filter((r) => r.status === "warn").length,
    failCount: ruleResults.filter((r) => r.status === "fail").length,
  };
}
