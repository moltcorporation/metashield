import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Twitter Card Validator Alternative — Free OG & Meta Tag Checker | MetaShield",
  description:
    "Twitter shut down their Card Validator. MetaShield is a free alternative that checks your Twitter Cards, Open Graph tags, and meta tags. See exactly how your links look when shared.",
  openGraph: {
    title: "Twitter Card Validator Alternative — MetaShield",
    description:
      "Free alternative to Twitter's deprecated Card Validator. Check Twitter Cards, OG tags, and social previews instantly.",
    type: "website",
    siteName: "MetaShield",
  },
  twitter: {
    card: "summary_large_image",
    title: "Twitter Card Validator Alternative — MetaShield",
    description:
      "Free alternative to Twitter's deprecated Card Validator. Check your cards instantly.",
  },
};

const features = [
  {
    metashield: "Full Twitter Card validation (summary, summary_large_image, player, app)",
    twitter: "Only validated summary and summary_large_image",
  },
  {
    metashield: "Open Graph tag analysis for Facebook, LinkedIn, Slack",
    twitter: "Twitter Cards only — no OG tag support",
  },
  {
    metashield: "Visual preview of how links appear on each platform",
    twitter: "Preview for Twitter only",
  },
  {
    metashield: "Scored results with fix suggestions",
    twitter: "Pass/fail only, no guidance",
  },
  {
    metashield: "Shareable report with permanent URL",
    twitter: "No shareable output",
  },
  {
    metashield: "Available now — free, no login required",
    twitter: "Shut down in 2023",
  },
];

export default function TwitterCardValidatorComparison() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 font-sans">
      <header className="flex items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-bold tracking-tight text-amber-400">
          MetaShield
        </Link>
        <Link
          href="/"
          className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-500"
        >
          Check your site free
        </Link>
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-4 py-12">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Twitter Card Validator Alternative
          </h1>
          <p className="text-lg text-zinc-400">
            Twitter shut down their Card Validator in 2023. MetaShield is the
            free replacement — check your Twitter Cards, Open Graph tags, and
            meta descriptions in seconds. No login required.
          </p>
        </div>

        {/* What happened */}
        <div className="flex flex-col gap-3 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="text-xl font-semibold text-white">
            What happened to the Twitter Card Validator?
          </h2>
          <p className="text-sm leading-relaxed text-zinc-400">
            In 2023, Twitter (now X) removed the Card Validator tool that
            developers used to preview and debug their Twitter Card meta tags.
            The tool was essential for anyone sharing links on Twitter — it
            showed exactly how your link would appear in the feed. With it gone,
            developers lost their primary way to test social previews before
            publishing.
          </p>
        </div>

        {/* Comparison table */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-white">
            MetaShield vs Twitter Card Validator
          </h2>
          <div className="overflow-x-auto rounded-xl border border-zinc-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900">
                  <th className="px-4 py-3 text-left font-medium text-amber-400">
                    MetaShield (free)
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-zinc-500">
                    Twitter Card Validator (discontinued)
                  </th>
                </tr>
              </thead>
              <tbody>
                {features.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-zinc-800/50 last:border-0"
                  >
                    <td className="px-4 py-3 text-zinc-300">{row.metashield}</td>
                    <td className="px-4 py-3 text-zinc-500">
                      {row.twitter}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* How to use */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-white">
            How to check your Twitter Cards
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                step: "1",
                title: "Enter your URL",
                desc: "Paste the URL you want to preview into MetaShield.",
              },
              {
                step: "2",
                title: "Get instant results",
                desc: "See your Twitter Card, OG tags, meta description, and social previews.",
              },
              {
                step: "3",
                title: "Fix and re-test",
                desc: "Follow the scored suggestions to fix issues, then test again.",
              },
            ].map((s) => (
              <div
                key={s.step}
                className="flex flex-col gap-2 rounded-lg border border-zinc-800 bg-zinc-900 p-5"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-600 text-sm font-bold text-white">
                  {s.step}
                </span>
                <h3 className="font-semibold text-white">{s.title}</h3>
                <p className="text-sm text-zinc-400">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4 rounded-xl border border-amber-500/30 bg-amber-950/20 p-8 text-center">
          <h2 className="text-2xl font-bold text-white">
            Check your Twitter Cards now
          </h2>
          <p className="text-zinc-400">
            Free. No signup. Instant results.
          </p>
          <Link
            href="/"
            className="rounded-lg bg-amber-600 px-8 py-3 text-base font-medium text-white transition-colors hover:bg-amber-500"
          >
            Open MetaShield
          </Link>
        </div>

        {/* Related tools */}
        <div className="flex flex-col gap-3 rounded-lg border border-zinc-800 bg-zinc-900/50 p-5">
          <p className="text-sm font-medium text-zinc-300">
            Also check your site with
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://headerguard-moltcorporation.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-500 hover:bg-zinc-800"
            >
              Security Headers &rarr;
            </a>
            <a
              href="https://ssl-certificate-checker-moltcorporation.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-500 hover:bg-zinc-800"
            >
              SSL Certificate &rarr;
            </a>
            <a
              href="https://dns-lookup-moltcorporation.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-500 hover:bg-zinc-800"
            >
              DNS Records &rarr;
            </a>
          </div>
        </div>
      </main>

      <footer className="flex flex-col items-center gap-3 px-6 py-6">
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-zinc-500">
          <span className="font-medium text-zinc-400">Moltcorp Suite:</span>
          <span className="font-medium text-amber-400">MetaShield</span>
          <a href="https://headerguard-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-300">HeaderGuard</a>
          <a href="https://dns-lookup-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-300">DNS Lookup</a>
          <a href="https://ssl-certificate-checker-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-300">SSL Checker</a>
          <a href="https://statusping-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-300">StatusPing</a>
        </div>
        <span className="text-xs text-zinc-600">
          Built by agents at{" "}
          <a href="https://moltcorporation.com" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-400">Moltcorp</a>
        </span>
      </footer>
    </div>
  );
}
