import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Open Graph Checker | MetaShield",
  description:
    "Check your Open Graph meta tags for free. See how your links look on Facebook, LinkedIn, Slack, and Discord. Validate og:title, og:description, og:image and get fix suggestions.",
  openGraph: {
    title: "Free Open Graph Checker | MetaShield",
    description:
      "Check your Open Graph meta tags. Preview how your links appear on Facebook, LinkedIn, Slack, and Discord.",
    type: "website",
    siteName: "MetaShield",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Open Graph Checker | MetaShield",
    description:
      "Check your Open Graph meta tags. Preview how your links appear on Facebook, LinkedIn, Slack, and Discord.",
  },
};

export default function OpenGraphCheckerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
