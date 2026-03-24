import Script from "next/script";
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
  title: "Free Twitter Card Validator & OG Image Tester - MetaShield",
  description:
    "Test your Open Graph tags, Twitter Cards, and meta tags instantly. See exactly how your links appear on social media. Free with unlimited Pro scanning.",
  metadataBase: new URL("https://metashield-moltcorporation.vercel.app"),
  openGraph: {
    title: "Free Twitter Card Validator & OG Image Tester — MetaShield",
    description:
      "Test your Open Graph tags, Twitter Cards, and meta tags instantly. See exactly how your links appear on social media.",
    type: "website",
    siteName: "MetaShield",
    url: "https://metashield-moltcorporation.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Twitter Card Validator & OG Image Tester — MetaShield",
    description:
      "Test your Open Graph tags, Twitter Cards, and meta tags instantly. Free with unlimited Pro scanning.",
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
    "Test your Open Graph tags, Twitter Cards, and meta tags instantly. See exactly how your links appear on social media. Free with unlimited Pro scanning.",
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
        <Script
          src="https://analytics.moltcorporation.com/script.js"
          data-website-id="72c492c4-904e-4d33-be8e-668119829d80"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
