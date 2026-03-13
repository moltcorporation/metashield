import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Facebook Sharing Debugger Alternative — No Login, Multi-Platform | MetaShield",
  description:
    "Tired of Facebook's Sharing Debugger requiring a login? MetaShield checks your Open Graph tags instantly — no account needed. Preview your links on Facebook, Twitter/X, LinkedIn, Slack, Discord, and Google.",
  openGraph: {
    title: "Facebook Sharing Debugger Alternative | MetaShield",
    description:
      "Check your Open Graph tags without a Facebook account. MetaShield previews your links across 6 platforms instantly — free, no login required.",
    type: "website",
    siteName: "MetaShield",
  },
  twitter: {
    card: "summary_large_image",
    title: "Facebook Sharing Debugger Alternative | MetaShield",
    description:
      "Check your Open Graph tags without a Facebook account. Preview across 6 platforms instantly.",
  },
  alternates: {
    canonical:
      "https://metashield-moltcorporation.vercel.app/compare/facebook-debugger",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Facebook Sharing Debugger Alternative — MetaShield",
  url: "https://metashield-moltcorporation.vercel.app/compare/facebook-debugger",
  description:
    "MetaShield is a free alternative to Facebook's Sharing Debugger. Check Open Graph tags across 6 platforms without logging in.",
  mainEntity: {
    "@type": "SoftwareApplication",
    name: "MetaShield",
    url: "https://metashield-moltcorporation.vercel.app",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  },
};

function EyeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M8 32s8-16 24-16 24 16 24 16-8 16-24 16S8 32 8 32z"
        fill="currentColor"
        fillOpacity="0.1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle
        cx="32"
        cy="32"
        r="8"
        stroke="currentColor"
        strokeWidth="2"
        fill="currentColor"
        fillOpacity="0.2"
      />
      <circle cx="32" cy="32" r="3" fill="currentColor" />
    </svg>
  );
}

export default function FacebookDebuggerComparison() {
  return (
    <div className="flex min-h-screen flex-col bg-orange-50/30 font-sans dark:bg-stone-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <EyeIcon className="h-6 w-6 text-orange-600 dark:text-orange-400" />
          <span className="text-lg font-bold tracking-tight text-stone-900 dark:text-white">
            MetaShield
          </span>
        </Link>
        <a
          href="https://moltcorporation.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-stone-500 transition-colors hover:text-orange-600 dark:text-stone-400 dark:hover:text-orange-400"
        >
          by Moltcorp
        </a>
      </header>

      <main className="flex flex-1 flex-col items-center px-4 pb-16 pt-12">
        <article className="flex w-full max-w-2xl flex-col gap-10">
          <div className="flex flex-col gap-4 text-center">
            <p className="text-sm font-medium uppercase tracking-wide text-orange-600 dark:text-orange-400">
              Comparison
            </p>
            <h1 className="text-3xl font-extrabold tracking-tight text-stone-900 sm:text-4xl dark:text-white">
              Facebook Sharing Debugger Alternative
            </h1>
            <p className="mx-auto max-w-lg text-lg text-stone-600 dark:text-stone-400">
              Facebook&apos;s Sharing Debugger requires a developer account and
              only checks Facebook. MetaShield checks your Open Graph tags
              across 6 platforms — no login required.
            </p>
          </div>

          <Link
            href="/"
            className="mx-auto inline-flex rounded-xl bg-orange-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-orange-200 transition-all hover:bg-orange-700 hover:shadow-orange-300 dark:bg-orange-500 dark:shadow-orange-950/50 dark:hover:bg-orange-400"
          >
            Try MetaShield Free
          </Link>

          {/* The problem */}
          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-bold text-stone-900 dark:text-white">
              Why look for an alternative?
            </h2>
            <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400">
              Facebook&apos;s Sharing Debugger (developers.facebook.com/tools/debug)
              still works, but it has real limitations. You need a Facebook
              developer account to use it. It only shows you how links render on
              Facebook — nothing about Twitter/X, LinkedIn, Slack, or any other
              platform. And it can be slow, sometimes taking multiple
              &quot;Scrape Again&quot; clicks before it refreshes cached data.
            </p>
            <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400">
              If you share links on more than just Facebook — and most people
              do — you need a tool that shows you the full picture.
            </p>
          </section>

          {/* Comparison table */}
          <section className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-stone-900 dark:text-white">
              Facebook Sharing Debugger vs MetaShield
            </h2>
            <div className="overflow-hidden rounded-xl border border-orange-200 dark:border-orange-900/50">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-orange-200 bg-orange-50 dark:border-orange-900/50 dark:bg-orange-950/30">
                    <th className="px-4 py-3 font-semibold text-stone-900 dark:text-white">
                      Feature
                    </th>
                    <th className="px-4 py-3 font-semibold text-stone-400 dark:text-stone-500">
                      Facebook Debugger
                    </th>
                    <th className="px-4 py-3 font-semibold text-orange-600 dark:text-orange-400">
                      MetaShield
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-orange-100 dark:divide-orange-900/30">
                  {[
                    [
                      "Login required",
                      "Yes — Facebook developer account",
                      "No — paste a URL and go",
                    ],
                    [
                      "Platforms checked",
                      "Facebook only",
                      "Facebook, Twitter/X, LinkedIn, Slack, Discord, Google",
                    ],
                    [
                      "Visual previews",
                      "Facebook feed preview only",
                      "Rendered preview for each platform",
                    ],
                    [
                      "Scored analysis",
                      "No — shows raw tag data",
                      "Yes — 0-100 score across 30+ rules",
                    ],
                    [
                      "Fix suggestions",
                      "No",
                      "Yes — copy-paste HTML for every issue",
                    ],
                    [
                      "Cache busting",
                      "Manual \"Scrape Again\" button",
                      "Always fetches fresh data",
                    ],
                    [
                      "Twitter Card checks",
                      "No",
                      "Full twitter:card tag validation",
                    ],
                    [
                      "Shareable reports",
                      "No — results are session-only",
                      "Yes — permanent URL for every report",
                    ],
                  ].map(([feature, facebook, metashield]) => (
                    <tr
                      key={feature}
                      className="bg-white dark:bg-stone-900/50"
                    >
                      <td className="px-4 py-3 font-medium text-stone-900 dark:text-white">
                        {feature}
                      </td>
                      <td className="px-4 py-3 text-stone-400 dark:text-stone-500">
                        {facebook}
                      </td>
                      <td className="px-4 py-3 text-stone-700 dark:text-stone-300">
                        {metashield}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* When to use which */}
          <section className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-stone-900 dark:text-white">
              When to use each tool
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2 rounded-xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900">
                <h3 className="font-semibold text-stone-900 dark:text-white">
                  Use Facebook&apos;s Debugger when...
                </h3>
                <ul className="space-y-1 text-sm text-stone-500 dark:text-stone-400">
                  <li>You need to force Facebook to re-scrape a specific URL</li>
                  <li>You want to see Facebook&apos;s exact cache state</li>
                  <li>You only care about Facebook and already have a developer account</li>
                </ul>
              </div>
              <div className="flex flex-col gap-2 rounded-xl border border-orange-200 bg-orange-50/50 p-5 dark:border-orange-900/30 dark:bg-orange-950/20">
                <h3 className="font-semibold text-orange-700 dark:text-orange-400">
                  Use MetaShield when...
                </h3>
                <ul className="space-y-1 text-sm text-stone-600 dark:text-stone-400">
                  <li>You share links on multiple platforms, not just Facebook</li>
                  <li>You don&apos;t have or want a Facebook developer account</li>
                  <li>You want a score and specific fixes, not just raw tag data</li>
                  <li>You want a shareable report you can send to your team</li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="flex flex-col gap-6">
            <h2 className="text-xl font-bold text-stone-900 dark:text-white">
              FAQ
            </h2>

            <div className="flex flex-col gap-3">
              <h3 className="font-semibold text-stone-900 dark:text-white">
                Is Facebook&apos;s Sharing Debugger still available?
              </h3>
              <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                Yes, unlike Twitter&apos;s Card Validator (which was removed in
                2023), Facebook&apos;s Sharing Debugger is still live at
                developers.facebook.com/tools/debug. However, it requires a
                Facebook developer account and only checks Facebook-specific
                rendering.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="font-semibold text-stone-900 dark:text-white">
                Does MetaShield check the same OG tags as Facebook&apos;s tool?
              </h3>
              <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                Yes — MetaShield checks all Open Graph tags that Facebook uses
                (og:title, og:description, og:image, og:url, og:type, og:site_name)
                plus additional tags for Twitter Cards, general meta tags, and
                technical SEO. You get a complete picture, not just the Facebook
                slice.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="font-semibold text-stone-900 dark:text-white">
                Can MetaShield clear Facebook&apos;s OG cache?
              </h3>
              <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                No. If you need to force Facebook to re-scrape a URL and refresh
                its cache, you still need to use Facebook&apos;s Sharing
                Debugger and click &quot;Scrape Again.&quot; MetaShield always
                fetches tags fresh from your server, so you can verify your tags
                are correct before triggering a Facebook re-scrape.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="font-semibold text-stone-900 dark:text-white">
                Is MetaShield free?
              </h3>
              <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                Yes. The free tier gives you 10 checks per day. If you need
                unlimited checks, there&apos;s a Pro plan available.
              </p>
            </div>
          </section>

          {/* Bottom CTA */}
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-orange-200 bg-orange-50/50 p-8 text-center dark:border-orange-900/30 dark:bg-orange-950/20">
            <h2 className="text-2xl font-bold text-stone-900 dark:text-white">
              Check your Open Graph tags now
            </h2>
            <p className="max-w-md text-sm text-stone-600 dark:text-stone-400">
              See how your links look on Facebook and 5 other platforms. Free,
              instant, no login required.
            </p>
            <Link
              href="/"
              className="inline-flex rounded-xl bg-orange-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-orange-200 transition-all hover:bg-orange-700 hover:shadow-orange-300 dark:bg-orange-500 dark:shadow-orange-950/50 dark:hover:bg-orange-400"
            >
              Try MetaShield Free
            </Link>
          </div>
        </article>
      </main>

      <footer className="flex flex-col items-center gap-3 border-t border-orange-100 px-6 py-6 dark:border-orange-900/20">
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-stone-400 dark:text-stone-500">
          <span className="font-medium">Moltcorp Suite:</span>
          <span className="font-semibold text-orange-600 dark:text-orange-400">
            MetaShield
          </span>
          <a
            href="https://headerguard-moltcorporation.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-orange-600 dark:hover:text-orange-400"
          >
            HeaderGuard
          </a>
          <a
            href="https://statusping-moltcorporation.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-orange-600 dark:hover:text-orange-400"
          >
            StatusPing
          </a>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-stone-400 dark:text-stone-500">
          <span className="font-medium">Compare:</span>
          <a href="/compare/twitter-card-validator" className="transition-colors hover:text-orange-600 dark:hover:text-orange-400">vs Twitter Card Validator</a>
          <a href="/compare/facebook-debugger" className="transition-colors hover:text-orange-600 dark:hover:text-orange-400">vs Facebook Debugger</a>
          <a href="/compare/og-checkers" className="transition-colors hover:text-orange-600 dark:hover:text-orange-400">OG Checkers Compared</a>
          <a href="/linkedin-post-preview" className="transition-colors hover:text-orange-600 dark:hover:text-orange-400">LinkedIn Preview Checker</a>
        </div>
        <span className="text-xs text-stone-400 dark:text-stone-600">
          Built by agents at{" "}
          <a
            href="https://moltcorporation.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-orange-600 dark:hover:text-orange-400"
          >
            Moltcorp
          </a>
        </span>
      </footer>
    </div>
  );
}
