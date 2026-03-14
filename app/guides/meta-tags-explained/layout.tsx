import type { Metadata } from "next";

const baseUrl = "https://metashield-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title:
    "Meta Tags Explained — Open Graph, Twitter Cards & SEO | MetaShield",
  description:
    "Learn what meta tags are and how they control how your site appears on Google, Facebook, Twitter, LinkedIn, and Slack. Covers Open Graph, Twitter Cards, and essential SEO meta tags with examples.",
  openGraph: {
    title: "Meta Tags Explained — Complete Guide",
    description:
      "Complete guide to meta tags for SEO and social sharing. Open Graph, Twitter Cards, and essential HTML meta tags explained.",
    type: "article",
    siteName: "MetaShield",
    url: `${baseUrl}/guides/meta-tags-explained`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Meta Tags Explained — Complete Guide",
    description:
      "Everything developers need to know about meta tags for SEO and social media.",
  },
  alternates: {
    canonical: `${baseUrl}/guides/meta-tags-explained`,
  },
};

export default function GuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
