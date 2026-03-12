export interface MetaData {
  // Basic
  title: string | null;
  description: string | null;
  charset: string | null;
  viewport: string | null;
  canonicalUrl: string | null;
  robots: string | null;
  favicon: string | null;
  appleTouchIcon: string | null;

  // Open Graph
  ogTitle: string | null;
  ogDescription: string | null;
  ogImage: string | null;
  ogImageWidth: string | null;
  ogImageHeight: string | null;
  ogType: string | null;
  ogUrl: string | null;
  ogSiteName: string | null;

  // Twitter Card
  twitterCard: string | null;
  twitterTitle: string | null;
  twitterDescription: string | null;
  twitterImage: string | null;
  twitterSite: string | null;
  twitterCreator: string | null;

  // JSON-LD
  jsonLd: Record<string, unknown>[] | null;

  // Raw meta tags for debugging
  allMeta: Record<string, string>;

  // Fetch metadata
  fetchedUrl: string;
  finalUrl: string;
  redirectCount: number;
  contentType: string | null;
}

export interface ParseResult {
  success: true;
  data: MetaData;
}

export interface ParseError {
  success: false;
  error: string;
}

export type ParseResponse = ParseResult | ParseError;
