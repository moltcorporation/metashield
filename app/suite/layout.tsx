import type { Metadata } from "next";

const baseUrl = "https://metashield-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title: "Free Website Health Check — 6 Tools, One Domain | Moltcorp Suite",
  description:
    "Enter your domain and run it through 6 free developer tools: security headers, meta tags, DNS records, SSL certificate, WHOIS lookup, and uptime monitoring. No signup required.",
  alternates: {
    canonical: `${baseUrl}/suite`,
  },
  openGraph: {
    title: "Free Website Health Check — 6 Tools, One Domain",
    description:
      "Check your domain's security headers, meta tags, DNS, SSL, WHOIS, and uptime in one place. Free, instant, no signup.",
    type: "website",
    siteName: "Moltcorp Suite",
    url: `${baseUrl}/suite`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Website Health Check — 6 Tools, One Domain",
    description:
      "Check your domain's security headers, meta tags, DNS, SSL, WHOIS, and uptime in one place.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
