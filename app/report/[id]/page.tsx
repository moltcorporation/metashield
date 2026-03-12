export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { reports } from "@/db/schema";
import type { MetaData } from "@/lib/types";
import type { ScoringResult, RuleResult } from "@/lib/scoring";
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
  const color =
    score >= 80
      ? "text-green-600 dark:text-green-400"
      : score >= 50
        ? "text-yellow-600 dark:text-yellow-400"
        : "text-red-600 dark:text-red-400";

  const bg =
    score >= 80
      ? "bg-green-50 dark:bg-green-950"
      : score >= 50
        ? "bg-yellow-50 dark:bg-yellow-950"
        : "bg-red-50 dark:bg-red-950";

  return (
    <div
      className={`flex h-24 w-24 flex-col items-center justify-center rounded-full ${bg}`}
    >
      <span className={`text-3xl font-bold ${color}`}>{score}</span>
      <span className="text-xs text-zinc-500 dark:text-zinc-400">/100</span>
    </div>
  );
}

function StatusIcon({ status }: { status: string }) {
  if (status === "pass")
    return <span className="text-green-600 dark:text-green-400">&#10003;</span>;
  if (status === "warn")
    return (
      <span className="text-yellow-600 dark:text-yellow-400">&#9888;</span>
    );
  return <span className="text-red-600 dark:text-red-400">&#10005;</span>;
}

function RuleItem({ rule }: { rule: RuleResult }) {
  return (
    <div className="flex flex-col gap-1 rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
      <div className="flex items-center gap-2">
        <StatusIcon status={rule.status} />
        <span className="text-sm text-black dark:text-white">
          {rule.message}
        </span>
      </div>
      {rule.fix && (
        <code className="mt-1 block rounded bg-zinc-100 px-2 py-1 text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
          {rule.fix}
        </code>
      )}
    </div>
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

  const metaData = report.metaData as MetaData;
  const scoring = report.issues as unknown as ScoringResult;

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-black dark:text-white"
        >
          MetaShield
        </Link>
        <Link
          href="/"
          className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
        >
          Check another URL
        </Link>
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-8">
        {/* Score + URL */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
          <ScoreBadge score={report.score} />
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <h1 className="text-xl font-semibold text-black dark:text-white">
              Meta Tag Report
            </h1>
            <a
              href={report.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
            >
              {report.url}
            </a>
            <div className="mt-1 flex gap-3 text-xs text-zinc-400 dark:text-zinc-500">
              <span>{scoring.passCount} passed</span>
              <span>{scoring.warnCount} warnings</span>
              <span>{scoring.failCount} failed</span>
            </div>
          </div>
        </div>

        {/* Share */}
        <ShareButtons
          score={report.score}
          reportUrl={`https://metashield-moltcorporation.vercel.app/report/${id}`}
        />

        {/* Category Breakdown */}
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-black dark:text-white">
            Score Breakdown
          </h2>
          {scoring.categories.map((cat) => (
            <div key={cat.category} className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-medium text-black dark:text-white">
                  {cat.label}
                </span>
                <span className="text-sm text-zinc-500 dark:text-zinc-400">
                  {cat.earned}/{cat.possible}
                </span>
              </div>
              <div className="h-2 rounded-full bg-zinc-200 dark:bg-zinc-800">
                <div
                  className="h-2 rounded-full bg-black dark:bg-white"
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
          <h2 className="text-lg font-semibold text-black dark:text-white">
            Platform Previews
          </h2>
          <PlatformPreviews data={metaData} />
        </div>

        {/* Cross-links */}
        <div className="flex flex-col gap-3 rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm font-medium text-black dark:text-white">
            Also check this site&apos;s security headers
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Security headers protect against XSS, clickjacking, and MIME-sniffing attacks.
          </p>
          <a
            href={`https://headerguard-moltcorporation.vercel.app/?url=${encodeURIComponent(report.url)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800"
          >
            Check with HeaderGuard &rarr;
          </a>
        </div>

        {/* Raw Meta Tags */}
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold text-black dark:text-white">
            All Meta Tags
          </h2>
          <div className="overflow-x-auto rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-700">
                  <th className="pb-2 pr-4 text-left font-medium text-zinc-500 dark:text-zinc-400">
                    Tag
                  </th>
                  <th className="pb-2 text-left font-medium text-zinc-500 dark:text-zinc-400">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(metaData.allMeta).map(([key, value]) => (
                  <tr
                    key={key}
                    className="border-b border-zinc-100 dark:border-zinc-800"
                  >
                    <td className="py-1.5 pr-4 font-mono text-xs text-zinc-600 dark:text-zinc-400">
                      {key}
                    </td>
                    <td className="py-1.5 text-xs text-black dark:text-white">
                      {value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="flex flex-col items-center gap-3 px-6 py-6">
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-zinc-400 dark:text-zinc-500">
          <span className="font-medium">Moltcorp Suite:</span>
          <span className="font-medium text-zinc-600 dark:text-zinc-300">MetaShield</span>
          <a
            href="https://headerguard-moltcorporation.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-600 dark:hover:text-zinc-300"
          >
            HeaderGuard
          </a>
          <a
            href="https://statusping-moltcorporation.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-600 dark:hover:text-zinc-300"
          >
            StatusPing
          </a>
        </div>
        <span className="text-xs text-zinc-400 dark:text-zinc-600">
          Built by agents at{" "}
          <a
            href="https://moltcorporation.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-600 dark:hover:text-zinc-400"
          >
            Moltcorp
          </a>
        </span>
      </footer>
    </div>
  );
}
