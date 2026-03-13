export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { reports } from "@/db/schema";
import type { MetaData } from "@/lib/types";
import type { ScoringResult, RuleResult } from "@/lib/scoring";
import type { CrawlabilityResult, CrawlabilityCheck } from "@/lib/crawlability";
import { PlatformPreviews } from "@/app/components/previews";
import { ShareButtons } from "@/app/components/ShareButtons";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const [report] = await db
    .select()
    .from(reports)
    .where(eq(reports.id, id))
    .limit(1);

  if (!report) {
    return { title: "Report not found — MetaShield" };
  }

  const title = `Score ${report.score}/100 — ${report.url}`;
  const description = `MetaShield meta tag report for ${report.url}. Score: ${report.score}/100. Check your site's meta tags for free.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "MetaShield",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

function ScoreBadge({ score }: { score: number }) {
  const ring =
    score >= 80
      ? "ring-emerald-200 dark:ring-emerald-900"
      : score >= 50
        ? "ring-amber-200 dark:ring-amber-900"
        : "ring-red-200 dark:ring-red-900";

  const color =
    score >= 80
      ? "text-emerald-600 dark:text-emerald-400"
      : score >= 50
        ? "text-amber-600 dark:text-amber-400"
        : "text-red-600 dark:text-red-400";

  const bg =
    score >= 80
      ? "bg-emerald-50 dark:bg-emerald-950/50"
      : score >= 50
        ? "bg-amber-50 dark:bg-amber-950/50"
        : "bg-red-50 dark:bg-red-950/50";

  return (
    <div className={`flex h-28 w-28 flex-col items-center justify-center rounded-2xl ring-2 ${ring} ${bg}`}>
      <span className={`text-4xl font-extrabold tabular-nums ${color}`}>{score}</span>
      <span className="text-xs font-medium text-stone-500 dark:text-stone-400">/100</span>
    </div>
  );
}

function StatusIcon({ status }: { status: string }) {
  if (status === "pass")
    return (
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-xs text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400">
        &#10003;
      </span>
    );
  if (status === "warn")
    return (
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-100 text-xs text-amber-700 dark:bg-amber-900/50 dark:text-amber-400">
        &#9888;
      </span>
    );
  return (
    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-100 text-xs text-red-700 dark:bg-red-900/50 dark:text-red-400">
      &#10005;
    </span>
  );
}

function RuleItem({ rule }: { rule: RuleResult }) {
  const borderColor =
    rule.status === "pass"
      ? "border-emerald-100 dark:border-emerald-900/30"
      : rule.status === "warn"
        ? "border-amber-100 dark:border-amber-900/30"
        : "border-red-100 dark:border-red-900/30";

  return (
    <div className={`flex flex-col gap-1.5 rounded-xl border ${borderColor} bg-white p-4 dark:bg-stone-900`}>
      <div className="flex items-center gap-2.5">
        <StatusIcon status={rule.status} />
        <span className="text-sm text-stone-900 dark:text-white">
          {rule.message}
        </span>
      </div>
      {rule.fix && (
        <code className="mt-1 block rounded-lg bg-orange-50 px-3 py-2 font-mono text-xs text-orange-800 dark:bg-orange-950/30 dark:text-orange-300">
          {rule.fix}
        </code>
      )}
    </div>
  );
}

function EyeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <path
        d="M8 32s8-16 24-16 24 16 24 16-8 16-24 16S8 32 8 32z"
        fill="currentColor"
        fillOpacity="0.1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="32" cy="32" r="8" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.2" />
      <circle cx="32" cy="32" r="3" fill="currentColor" />
    </svg>
  );
}

export default async function ReportPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [report] = await db
    .select()
    .from(reports)
    .where(eq(reports.id, id))
    .limit(1);

  if (!report) {
    notFound();
  }

  const rawMetaData = report.metaData as MetaData & { crawlability?: CrawlabilityResult };
  const metaData = rawMetaData;
  const scoring = report.issues as unknown as ScoringResult;
  const crawlability = rawMetaData.crawlability || null;

  return (
    <div className="flex min-h-screen flex-col bg-orange-50/30 font-sans dark:bg-stone-950">
      <header className="flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <EyeIcon className="h-6 w-6 text-orange-600 dark:text-orange-400" />
          <span className="text-lg font-bold tracking-tight text-stone-900 dark:text-white">
            MetaShield
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/suite"
            className="text-sm font-medium text-stone-500 transition-colors hover:text-orange-600 dark:text-stone-400 dark:hover:text-orange-400"
          >
            All Tools
          </Link>
          <Link
            href="/"
            className="rounded-xl bg-orange-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-400"
          >
            Check another URL
          </Link>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-8">
        {/* Score + URL */}
        <div className="flex flex-col items-center gap-5 rounded-2xl border border-orange-100 bg-white p-6 sm:flex-row sm:gap-6 dark:border-orange-900/30 dark:bg-stone-900">
          <ScoreBadge score={report.score} />
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <h1 className="text-xl font-bold text-stone-900 dark:text-white">
              Meta Tag Report
            </h1>
            <a
              href={report.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-orange-600 hover:text-orange-800 dark:text-orange-400 dark:hover:text-orange-300"
            >
              {report.url}
            </a>
            <div className="mt-2 flex gap-4 text-xs">
              <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 font-medium text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                {scoring.passCount} passed
              </span>
              <span className="rounded-full bg-amber-50 px-2.5 py-0.5 font-medium text-amber-700 dark:bg-amber-950/50 dark:text-amber-400">
                {scoring.warnCount} warnings
              </span>
              <span className="rounded-full bg-red-50 px-2.5 py-0.5 font-medium text-red-700 dark:bg-red-950/50 dark:text-red-400">
                {scoring.failCount} failed
              </span>
            </div>
          </div>
        </div>

        {/* Share */}
        <ShareButtons
          score={report.score}
          reportUrl={`https://metashield-moltcorporation.vercel.app/report/${id}`}
        />

        {/* Category Breakdown */}
        <div className="flex flex-col gap-6">
          <h2 className="text-lg font-bold text-stone-900 dark:text-white">
            Score Breakdown
          </h2>
          {scoring.categories.map((cat) => (
            <div key={cat.category} className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-stone-900 dark:text-white">
                  {cat.label}
                </span>
                <span className="rounded-full bg-orange-50 px-2.5 py-0.5 text-xs font-bold tabular-nums text-orange-700 dark:bg-orange-950/50 dark:text-orange-300">
                  {cat.earned}/{cat.possible}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-orange-100 dark:bg-orange-950/30">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 transition-all dark:from-orange-400 dark:to-amber-400"
                  style={{
                    width: `${cat.possible > 0 ? (cat.earned / cat.possible) * 100 : 0}%`,
                  }}
                />
              </div>
              <div className="flex flex-col gap-2">
                {cat.rules.map((rule) => (
                  <RuleItem key={rule.id} rule={rule} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Platform Previews */}
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-bold text-stone-900 dark:text-white">
            Platform Previews
          </h2>
          <PlatformPreviews data={metaData} />
        </div>

        {/* Crawlability */}
        {crawlability && crawlability.checks.length > 0 && (
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-black dark:text-white">
              Crawlability
            </h2>
            <div className="flex flex-col gap-2">
              {crawlability.checks.map((check: CrawlabilityCheck) => {
                const statusStyles: Record<string, { icon: string; border: string; bg: string; text: string }> = {
                  pass: {
                    icon: "\u2713",
                    border: "border-green-200 dark:border-green-900",
                    bg: "bg-green-50 dark:bg-green-950",
                    text: "text-green-700 dark:text-green-300",
                  },
                  warn: {
                    icon: "\u26A0",
                    border: "border-yellow-200 dark:border-yellow-900",
                    bg: "bg-yellow-50 dark:bg-yellow-950",
                    text: "text-yellow-700 dark:text-yellow-300",
                  },
                  fail: {
                    icon: "\u2717",
                    border: "border-red-200 dark:border-red-900",
                    bg: "bg-red-50 dark:bg-red-950",
                    text: "text-red-700 dark:text-red-300",
                  },
                  info: {
                    icon: "\u2139",
                    border: "border-blue-200 dark:border-blue-900",
                    bg: "bg-blue-50 dark:bg-blue-950",
                    text: "text-blue-700 dark:text-blue-300",
                  },
                };
                const s = statusStyles[check.status] || statusStyles.info;
                return (
                  <div
                    key={check.id}
                    className={`flex items-start gap-3 rounded-lg border p-3 ${s.border} ${s.bg}`}
                  >
                    <span className={`mt-0.5 text-sm ${s.text}`}>{s.icon}</span>
                    <div className="flex flex-col gap-0.5">
                      <span className={`text-xs font-medium ${s.text}`}>
                        {check.label}
                      </span>
                      <p className="text-sm text-zinc-700 dark:text-zinc-300">
                        {check.message}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Cross-links */}
        <div className="flex flex-col gap-3 rounded-2xl border border-orange-100 bg-white p-5 dark:border-orange-900/30 dark:bg-stone-900">
          <p className="text-sm font-semibold text-stone-900 dark:text-white">
            Also check this site
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={`https://headerguard-moltcorporation.vercel.app/?url=${encodeURIComponent(report.url)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-orange-200 px-4 py-2.5 text-sm font-medium text-stone-900 transition-all hover:border-orange-400 hover:bg-orange-50 dark:border-orange-800 dark:text-white dark:hover:border-orange-600 dark:hover:bg-orange-950/30"
            >
              Security headers (HeaderGuard) &rarr;
            </a>
            <a
              href={`https://dns-lookup-moltcorporation.vercel.app/?domain=${encodeURIComponent(new URL(report.url).hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-orange-200 px-4 py-2.5 text-sm font-medium text-stone-900 transition-all hover:border-orange-400 hover:bg-orange-50 dark:border-orange-800 dark:text-white dark:hover:border-orange-600 dark:hover:bg-orange-950/30"
            >
              DNS records &rarr;
            </a>
            <a
              href={`https://whois-lookup-moltcorporation.vercel.app/?domain=${encodeURIComponent(new URL(report.url).hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-orange-200 px-4 py-2.5 text-sm font-medium text-stone-900 transition-all hover:border-orange-400 hover:bg-orange-50 dark:border-orange-800 dark:text-white dark:hover:border-orange-600 dark:hover:bg-orange-950/30"
            >
              WHOIS Lookup &rarr;
            </a>
          </div>
        </div>

        {/* Raw Meta Tags */}
        <details className="overflow-hidden rounded-2xl border border-orange-100 dark:border-orange-900/30">
          <summary className="cursor-pointer bg-white px-5 py-4 text-base font-bold text-stone-900 dark:bg-stone-900 dark:text-white">
            All Meta Tags
          </summary>
          <div className="overflow-x-auto border-t border-orange-100 bg-white p-4 dark:border-orange-900/30 dark:bg-stone-900">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-orange-100 dark:border-orange-900/30">
                  <th className="pb-2 pr-4 text-left text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                    Tag
                  </th>
                  <th className="pb-2 text-left text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(metaData.allMeta).map(([key, value]) => (
                  <tr
                    key={key}
                    className="border-b border-stone-100 last:border-0 dark:border-stone-800"
                  >
                    <td className="py-2 pr-4 font-mono text-xs font-medium text-orange-700 dark:text-orange-400">
                      {key}
                    </td>
                    <td className="max-w-md break-all py-2 font-mono text-xs text-stone-700 dark:text-stone-300">
                      {value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      </main>

      <footer className="flex flex-col items-center gap-3 border-t border-orange-100 px-6 py-6 dark:border-orange-900/20">
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-stone-400 dark:text-stone-500">
          <a href="/suite" className="font-medium transition-colors hover:text-orange-600 dark:hover:text-orange-400">All Tools</a>
          <span className="text-stone-300 dark:text-stone-600">|</span>
          <span className="font-semibold text-orange-600 dark:text-orange-400">MetaShield</span>
          <a href="https://headerguard-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-orange-600 dark:hover:text-orange-400">HeaderGuard</a>
          <a href="https://statusping-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-orange-600 dark:hover:text-orange-400">StatusPing</a>
          <a href="https://dns-lookup-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-orange-600 dark:hover:text-orange-400">DNS Lookup</a>
          <a href="https://ssl-certificate-checker-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-orange-600 dark:hover:text-orange-400">SSL Checker</a>
          <a href="https://whois-lookup-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-orange-600 dark:hover:text-orange-400">WHOIS Lookup</a>
        </div>
        <span className="text-xs text-stone-400 dark:text-stone-600">
          Built by agents at{" "}
          <a href="https://moltcorporation.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-orange-600 dark:hover:text-orange-400">Moltcorp</a>
        </span>
      </footer>
    </div>
  );
}
