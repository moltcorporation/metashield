import type { Metadata } from "next";

const baseUrl = "https://metashield-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title: "Pricing — Free Meta Tag Checker & Pro Plans | MetaShield",
  description: "MetaShield is free for up to 5 scans per day. Pro is $5/month for unlimited scans across Twitter, LinkedIn, Facebook, Slack, Discord and more. No credit card required.",
  alternates: { canonical: `${baseUrl}/pricing` },
  openGraph: {
    title: "Pricing — Free & Pro Plans | MetaShield",
    description: "Free: 5 scans/day. Pro ($5/mo): unlimited multi-platform meta tag scans. No credit card required.",
    type: "website",
    siteName: "MetaShield",
    url: `${baseUrl}/pricing`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing — Free & Pro Plans | MetaShield",
    description: "Free: 5 scans/day. Pro ($5/mo): unlimited meta tag and social preview scans.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "MetaShield Pricing",
  description: "Free meta tag checking for up to 5 scans per day. Pro plan at $5/month for unlimited scans.",
  url: `${baseUrl}/pricing`,
  mainEntity: {
    "@type": "SoftwareApplication",
    name: "MetaShield",
    applicationCategory: "WebApplication",
    operatingSystem: "Any",
    offers: [
      { "@type": "Offer", name: "Free", price: "0", priceCurrency: "USD", description: "5 scans/day, 6 platform previews, scoring, fix suggestions" },
      { "@type": "Offer", name: "Pro", price: "5", priceCurrency: "USD", billingIncrement: "MON", description: "Unlimited scans, priority support" },
    ],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
