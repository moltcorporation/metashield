import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "LinkedIn Post Preview Checker — See How Your Links Look | MetaShield",
  description:
    "Check how your links appear when shared on LinkedIn. Validate og:title, og:description, og:image tags. Free, instant, no login required.",
  alternates: {
    canonical: "/linkedin-post-preview",
  },
  openGraph: {
    title:
      "LinkedIn Post Preview Checker — See How Your Links Look | MetaShield",
    description:
      "Check how your links appear when shared on LinkedIn. Validate og:title, og:description, og:image and get fix suggestions.",
    type: "website",
    siteName: "MetaShield",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "LinkedIn Post Preview Checker — See How Your Links Look | MetaShield",
    description:
      "Check how your links appear when shared on LinkedIn. Validate og:title, og:description, og:image and get fix suggestions.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
