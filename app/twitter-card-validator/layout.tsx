import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Twitter Card Validator | MetaShield",
  description:
    "Check how your links look on Twitter/X before you post. Free Twitter Card Validator — preview your twitter:card, twitter:image, and meta tags. Replaced the official Twitter Card Validator.",
  openGraph: {
    title: "Free Twitter Card Validator | MetaShield",
    description:
      "Check how your links look on Twitter/X before you post. Preview your Twitter Cards and fix meta tag issues.",
    type: "website",
    siteName: "MetaShield",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Twitter Card Validator | MetaShield",
    description:
      "Check how your links look on Twitter/X before you post. Preview your Twitter Cards and fix meta tag issues.",
  },
};

export default function TwitterCardValidatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
