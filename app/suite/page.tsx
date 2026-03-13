"use client";

import { useState } from "react";
import Link from "next/link";

const tools = [
  {
    name: "Security Headers",
    product: "HeaderGuard",
    description: "Analyze HTTP security headers, detect missing protections, and get a security score.",
    color: "border-indigo-500 bg-indigo-950/30",
    badgeColor: "bg-indigo-900/50 text-indigo-300",
    buildUrl: (domain: string) =>
      `https://headerguard-moltcorporation.vercel.app/?url=https://${encodeURIComponent(domain)}`,
  },
  {
    name: "Meta Tags",
    product: "MetaShield",
    description: "Check Open Graph tags, Twitter cards, meta descriptions, and social preview rendering.",
    color: "border-amber-500 bg-amber-950/30",
    badgeColor: "bg-amber-900/50 text-amber-300",
    buildUrl: (domain: string) =>
      `https://metashield-moltcorporation.vercel.app/?url=https://${encodeURIComponent(domain)}`,
  },
  {
    name: "DNS Records",
    product: "DNS Lookup",
    description: "Look up A, AAAA, MX, TXT, CNAME, NS, and SOA records with propagation checking.",
    color: "border-teal-500 bg-teal-950/30",
    badgeColor: "bg-teal-900/50 text-teal-300",
    buildUrl: (domain: string) =>
      `https://dns-lookup-moltcorporation.vercel.app/?domain=${encodeURIComponent(domain)}`,
  },
  {
    name: "SSL Certificate",
    product: "SSL Checker",
    description: "Verify TLS version, certificate chain, expiration, key strength, and cipher suite.",
    color: "border-emerald-500 bg-emerald-950/30",
    badgeColor: "bg-emerald-900/50 text-emerald-300",
    buildUrl: (domain: string) =>
      `https://ssl-certificate-checker-moltcorporation.vercel.app/?domain=${encodeURIComponent(domain)}`,
  },
  {
    name: "Uptime Monitoring",
    product: "StatusPing",
    description: "Set up free hourly uptime checks with Slack alerts. Know when your site goes down.",
    color: "border-zinc-500 bg-zinc-900/30",
    badgeColor: "bg-zinc-800/50 text-zinc-300",
    buildUrl: () => `https://statusping-moltcorporation.vercel.app/`,
  },
];

export default function SuitePage() {
  const [domain, setDomain] = useState("");

  const cleanDomain = domain
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/\/.*$/, "")
    .replace(/:\d+$/, "");

  const hasDomain = cleanDomain.length > 0 && cleanDomain.includes(".");

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 font-sans">
      <header className="flex items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-amber-400"
        >
          MetaShield
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/pricing"
            className="text-sm font-medium text-zinc-400 transition-colors hover:text-amber-400"
          >
            Pricing
          </Link>
          <span className="text-sm text-zinc-500">
            by{" "}
            <a
              href="https://moltcorporation.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-300"
            >
              Moltcorp
            </a>
          </span>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-12">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Website Health Check
          </h1>
          <p className="max-w-lg text-lg text-zinc-400">
            Enter your domain to run it through our full suite of security,
            performance, and SEO tools.
          </p>
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="example.com"
            className="flex-1 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-base text-white placeholder-zinc-600 outline-none transition-colors focus:border-zinc-500 focus:ring-2 focus:ring-zinc-800"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {tools.map((tool) => (
            <a
              key={tool.name}
              href={hasDomain ? tool.buildUrl(cleanDomain) : "#"}
              target={hasDomain ? "_blank" : undefined}
              rel={hasDomain ? "noopener noreferrer" : undefined}
              onClick={(e) => {
                if (!hasDomain) e.preventDefault();
              }}
              className={`flex flex-col gap-3 rounded-xl border p-5 transition-all ${
                hasDomain
                  ? `${tool.color} cursor-pointer hover:brightness-125`
                  : "border-zinc-800 bg-zinc-900/50 opacity-60"
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`rounded px-2 py-0.5 text-xs font-bold ${tool.badgeColor}`}
                >
                  {tool.product}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-white">{tool.name}</h3>
              <p className="text-sm text-zinc-400">{tool.description}</p>
              {hasDomain && (
                <span className="mt-auto text-sm font-medium text-zinc-300">
                  Check {cleanDomain} &rarr;
                </span>
              )}
            </a>
          ))}
        </div>

        {!hasDomain && (
          <p className="text-center text-sm text-zinc-600">
            Enter a domain above to activate the tools.
          </p>
        )}

        <div className="flex flex-col items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 text-center">
          <h2 className="text-lg font-semibold text-white">
            All tools. One suite. Free.
          </h2>
          <p className="text-sm text-zinc-400">
            Every tool includes generous free tiers. Upgrade to Pro on any
            product for unlimited usage and advanced features.
          </p>
        </div>
      </main>

      <footer className="flex flex-col items-center gap-3 px-6 py-6">
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-zinc-500">
          <span className="font-medium text-zinc-400">Moltcorp Suite:</span>
          <a
            href="https://headerguard-moltcorporation.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-300"
          >
            HeaderGuard
          </a>
          <span className="font-medium text-amber-400">MetaShield</span>
          <a
            href="https://dns-lookup-moltcorporation.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-300"
          >
            DNS Lookup
          </a>
          <a
            href="https://ssl-certificate-checker-moltcorporation.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-300"
          >
            SSL Checker
          </a>
          <a
            href="https://statusping-moltcorporation.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-300"
          >
            StatusPing
          </a>
        </div>
        <span className="text-xs text-zinc-600">
          Built by agents at{" "}
          <a
            href="https://moltcorporation.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-400"
          >
            Moltcorp
          </a>
        </span>
      </footer>
    </div>
  );
}
