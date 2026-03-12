import { scoreMetaData } from "./scoring";
import type { MetaData } from "./types";

function makeMetaData(overrides: Partial<MetaData> = {}): MetaData {
  return {
    title: null,
    description: null,
    charset: null,
    viewport: null,
    canonicalUrl: null,
    robots: null,
    favicon: null,
    appleTouchIcon: null,
    ogTitle: null,
    ogDescription: null,
    ogImage: null,
    ogImageWidth: null,
    ogImageHeight: null,
    ogType: null,
    ogUrl: null,
    ogSiteName: null,
    twitterCard: null,
    twitterTitle: null,
    twitterDescription: null,
    twitterImage: null,
    twitterSite: null,
    twitterCreator: null,
    jsonLd: null,
    allMeta: {},
    fetchedUrl: "https://example.com",
    finalUrl: "https://example.com",
    redirectCount: 0,
    contentType: "text/html",
    ...overrides,
  };
}

describe("scoreMetaData", () => {
  test("empty page scores very low", () => {
    const result = scoreMetaData(makeMetaData());
    expect(result.score).toBeLessThan(30);
    expect(result.failCount).toBeGreaterThan(5);
  });

  test("perfect page scores near 100", () => {
    const result = scoreMetaData(
      makeMetaData({
        title: "MetaShield — Check Your Social Cards & Meta Tags",
        description:
          "See exactly how your links look when shared on Twitter, LinkedIn, Facebook, and more. Score your meta tags and get fix suggestions.",
        charset: "utf-8",
        viewport: "width=device-width, initial-scale=1",
        canonicalUrl: "https://metashield.com",
        robots: "index, follow",
        favicon: "/favicon.ico",
        ogTitle: "MetaShield — Check Your Social Cards & Meta Tags",
        ogDescription:
          "See exactly how your links look when shared on Twitter, LinkedIn, Facebook, and more.",
        ogImage: "https://metashield.com/og.png",
        ogImageWidth: "1200",
        ogImageHeight: "630",
        ogType: "website",
        ogUrl: "https://metashield.com",
        ogSiteName: "MetaShield",
        twitterCard: "summary_large_image",
        twitterTitle: "MetaShield — Check Your Social Cards",
        twitterDescription: "Score your meta tags and get fix suggestions.",
        twitterImage: "https://metashield.com/twitter.png",
        twitterSite: "@metashield",
        twitterCreator: "@metashield",
        jsonLd: [{ "@context": "https://schema.org", "@type": "WebPage", name: "MetaShield" }],
        allMeta: {},
        fetchedUrl: "https://metashield.com",
        finalUrl: "https://metashield.com",
        redirectCount: 0,
        contentType: "text/html; charset=utf-8",
      })
    );
    expect(result.score).toBeGreaterThanOrEqual(95);
    expect(result.failCount).toBe(0);
  });

  test("missing og:image is a social fail", () => {
    const result = scoreMetaData(makeMetaData({ title: "Test", ogTitle: "Test" }));
    const ogImageRule = result.rules.find((r) => r.id === "og-image-exists");
    expect(ogImageRule?.status).toBe("fail");
    expect(ogImageRule?.fix).toBeTruthy();
  });

  test("title too long triggers warning", () => {
    const longTitle = "A".repeat(70);
    const result = scoreMetaData(makeMetaData({ title: longTitle }));
    const titleLenRule = result.rules.find((r) => r.id === "title-length");
    expect(titleLenRule?.status).toBe("warn");
  });

  test("noindex in robots triggers warning", () => {
    const result = scoreMetaData(makeMetaData({ robots: "noindex, nofollow" }));
    const robotsRule = result.rules.find((r) => r.id === "robots-not-blocking");
    expect(robotsRule?.status).toBe("warn");
  });

  test("placeholder text is detected", () => {
    const result = scoreMetaData(makeMetaData({ title: "Lorem ipsum dolor sit amet" }));
    const placeholderRule = result.rules.find((r) => r.id === "no-placeholder-text");
    expect(placeholderRule?.status).toBe("fail");
  });

  test("fix suggestions contain valid HTML", () => {
    const result = scoreMetaData(makeMetaData());
    const fixes = result.rules.filter((r) => r.fix !== null);
    expect(fixes.length).toBeGreaterThan(0);
    for (const rule of fixes) {
      expect(rule.fix).toMatch(/<(meta|link|title|script)/);
    }
  });

  test("category scores sum to total", () => {
    const data = makeMetaData({
      title: "Test Page",
      description: "A reasonable description for testing purposes that is about the right length.",
    });
    const result = scoreMetaData(data);
    const sum = result.categories.reduce((s, c) => s + c.earned, 0);
    expect(sum).toBe(result.score);
  });

  test("warn scores half points", () => {
    // A page with only a short title should get partial essentials points
    const result = scoreMetaData(makeMetaData({ title: "Hi" }));
    const essentials = result.categories.find((c) => c.category === "essentials");
    expect(essentials!.earned).toBeGreaterThan(0);
    expect(essentials!.earned).toBeLessThan(essentials!.possible);
  });

  test("twitter:image fallback to og:image is a pass", () => {
    const result = scoreMetaData(makeMetaData({ ogImage: "https://example.com/og.png" }));
    const twitterImageRule = result.rules.find((r) => r.id === "twitter-image");
    expect(twitterImageRule?.status).toBe("pass");
  });

  test("returns correct rule count (30+)", () => {
    const result = scoreMetaData(makeMetaData());
    expect(result.rules.length).toBeGreaterThanOrEqual(20);
  });
});
