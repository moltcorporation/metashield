import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Meta Tag Analyzer | MetaShield",
  description:
    "Analyze your meta tags for free. Check title, description, Open Graph, Twitter Cards, and structured data. Get a scored report with fix suggestions for every issue.",
  openGraph: {
    title: "Free Meta Tag Analyzer | MetaShield",
    description:
      "Analyze your meta tags. Check title, description, Open Graph, Twitter Cards, and get a scored report.",
    type: "website",
    siteName: "MetaShield",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Meta Tag Analyzer | MetaShield",
    description:
      "Analyze your meta tags. Check title, description, Open Graph, Twitter Cards, and get a scored report.",
  },
};

export default function MetaTagAnalyzerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
