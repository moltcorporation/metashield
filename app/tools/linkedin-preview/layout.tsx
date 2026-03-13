import type { Metadata } from "next";

const baseUrl = "https://metashield-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title:
    "LinkedIn Link Preview Checker — Test Your OG Tags | MetaShield",
  description:
    "Check how your links appear on LinkedIn before posting. Validate og:image size (1200x627), og:title, og:description, and get a scored report with copy-paste fixes. Free and instant.",
  openGraph: {
    title: "LinkedIn Link Preview Checker — Test Your OG Tags",
    description:
      "See exactly how your link will appear in the LinkedIn feed. Check og:image dimensions, OG tags, and get instant fix suggestions.",
    type: "website",
    siteName: "MetaShield",
    url: `${baseUrl}/tools/linkedin-preview`,
  },
  twitter: {
    card: "summary_large_image",
    title: "LinkedIn Link Preview Checker — Test Your OG Tags",
    description:
      "Check your LinkedIn link preview before posting. Validate og:image, og:title, og:description instantly.",
  },
  alternates: {
    canonical: `${baseUrl}/tools/linkedin-preview`,
  },
};

export default function LinkedInPreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
