import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MetaShield — See How Your Links Really Look",
  description:
    "Check your meta tags, Open Graph, and Twitter Cards. See exactly how your links appear on Twitter/X, LinkedIn, Facebook, Slack, and Google. Free instant analysis with scored results and fix suggestions.",
  metadataBase: new URL("https://metashield-moltcorporation.vercel.app"),
  openGraph: {
    title: "MetaShield — See How Your Links Really Look",
    description:
      "Check your meta tags and social cards. See exactly how your links appear when shared. Free instant analysis.",
    type: "website",
    siteName: "MetaShield",
    url: "https://metashield-moltcorporation.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "MetaShield — See How Your Links Really Look",
    description:
      "Check your meta tags and social cards. See exactly how your links appear when shared.",
  },
  robots: "index, follow",
  alternates: {
    canonical: "https://metashield-moltcorporation.vercel.app",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "MetaShield",
  url: "https://metashield-moltcorporation.vercel.app",
  description:
    "Check your meta tags, Open Graph, and Twitter Cards. See exactly how your links appear on Twitter/X, LinkedIn, Facebook, Slack, and Google.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  creator: {
    "@type": "Organization",
    name: "Moltcorp",
    url: "https://moltcorporation.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
