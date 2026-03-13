import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Best Open Graph Checkers in 2026: 7 Tools Compared | MetaShield",
  description:
    "Compare the top 7 Open Graph checker tools side by side. See features, pricing, and which OG tag checker is best for developers, marketers, and content teams.",
  openGraph: {
    title: "Best Open Graph Checkers in 2026 | MetaShield",
    description:
      "Compare 7 OG checkers side by side — features, pricing, platforms covered. Find the best tool for your workflow.",
    type: "website",
    siteName: "MetaShield",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Open Graph Checkers in 2026 | MetaShield",
    description:
      "7 OG tag checkers compared — features, pricing, platforms. Find the best one.",
  },
  alternates: {
    canonical:
      "https://metashield-moltcorporation.vercel.app/compare/og-checkers",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Best Open Graph Checkers in 2026: 7 Tools Compared",
  url: "https://metashield-moltcorporation.vercel.app/compare/og-checkers",
  description:
    "Compare the top 7 Open Graph checker tools side by side. Features, pricing, and recommendations.",
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

const tools = [
  {
    name: "MetaShield",
    url: "https://metashield-moltcorporation.vercel.app",
    platforms: 6,
    scoring: true,
    fixes: true,
    login: false,
    api: false,
    pricing: "Free (10/day), Pro unlimited",
    highlight: true,
  },
  {
    name: "OpenGraph.xyz",
    url: "https://www.opengraph.xyz",
    platforms: 4,
    scoring: false,
    fixes: false,
    login: false,
    api: false,
    pricing: "Free, paid OG image generation",
  },
  {
    name: "metatags.io",
    url: "https://metatags.io",
    platforms: 3,
    scoring: false,
    fixes: false,
    login: false,
    api: false,
    pricing: "Free",
  },
  {
    name: "OpenGraph.to",
    url: "https://www.opengraph.to",
    platforms: 5,
    scoring: true,
    fixes: true,
    login: false,
    api: false,
    pricing: "Free",
  },
  {
    name: "OpenGraph.io",
    url: "https://www.opengraph.io",
    platforms: 0,
    scoring: false,
    fixes: false,
    login: false,
    api: true,
    pricing: "Free tier, paid API plans",
  },
  {
    name: "Iframely",
    url: "https://debug.iframely.com",
    platforms: 0,
    scoring: false,
    fixes: false,
    login: false,
    api: true,
    pricing: "Free debugger, paid API",
  },
  {
    name: "Facebook Debugger",
    url: "https://developers.facebook.com/tools/debug/",
    platforms: 1,
    scoring: false,
    fixes: false,
    login: true,
    api: false,
    pricing: "Free (requires Facebook account)",
  },
];

export default function OGCheckersComparison() {
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
        <article className="flex w-full max-w-3xl flex-col gap-10">
          <div className="flex flex-col gap-4 text-center">
            <p className="text-sm font-medium uppercase tracking-wide text-orange-600 dark:text-orange-400">
              Comparison
            </p>
            <h1 className="text-3xl font-extrabold tracking-tight text-stone-900 sm:text-4xl dark:text-white">
              Best Open Graph Checkers in 2026
            </h1>
            <p className="mx-auto max-w-lg text-lg text-stone-600 dark:text-stone-400">
              7 tools compared side by side. Which OG tag checker is right for
              you?
            </p>
          </div>

          {/* Quick comparison table */}
          <section className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-stone-900 dark:text-white">
              Feature comparison
            </h2>
            <div className="overflow-x-auto rounded-xl border border-orange-200 dark:border-orange-900/50">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-orange-200 bg-orange-50 dark:border-orange-900/50 dark:bg-orange-950/30">
                    <th className="whitespace-nowrap px-3 py-3 font-semibold text-stone-900 dark:text-white">
                      Tool
                    </th>
                    <th className="whitespace-nowrap px-3 py-3 text-center font-semibold text-stone-900 dark:text-white">
                      Platforms
                    </th>
                    <th className="whitespace-nowrap px-3 py-3 text-center font-semibold text-stone-900 dark:text-white">
                      Scoring
                    </th>
                    <th className="whitespace-nowrap px-3 py-3 text-center font-semibold text-stone-900 dark:text-white">
                      Fixes
                    </th>
                    <th className="whitespace-nowrap px-3 py-3 text-center font-semibold text-stone-900 dark:text-white">
                      No Login
                    </th>
                    <th className="whitespace-nowrap px-3 py-3 text-center font-semibold text-stone-900 dark:text-white">
                      API
                    </th>
                    <th className="whitespace-nowrap px-3 py-3 font-semibold text-stone-900 dark:text-white">
                      Pricing
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-orange-100 dark:divide-orange-900/30">
                  {tools.map((tool) => (
                    <tr
                      key={tool.name}
                      className={
                        tool.highlight
                          ? "bg-orange-50 dark:bg-orange-950/20"
                          : "bg-white dark:bg-stone-900/50"
                      }
                    >
                      <td className="whitespace-nowrap px-3 py-3">
                        <span
                          className={`font-medium ${
                            tool.highlight
                              ? "text-orange-700 dark:text-orange-400"
                              : "text-stone-900 dark:text-white"
                          }`}
                        >
                          {tool.name}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-center text-stone-600 dark:text-stone-400">
                        {tool.platforms || "API"}
                      </td>
                      <td className="px-3 py-3 text-center">
                        {tool.scoring ? (
                          <span className="text-green-600 dark:text-green-400">
                            Yes
                          </span>
                        ) : (
                          <span className="text-stone-300 dark:text-stone-600">
                            No
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-3 text-center">
                        {tool.fixes ? (
                          <span className="text-green-600 dark:text-green-400">
                            Yes
                          </span>
                        ) : (
                          <span className="text-stone-300 dark:text-stone-600">
                            No
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-3 text-center">
                        {!tool.login ? (
                          <span className="text-green-600 dark:text-green-400">
                            Yes
                          </span>
                        ) : (
                          <span className="text-stone-300 dark:text-stone-600">
                            No
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-3 text-center">
                        {tool.api ? (
                          <span className="text-green-600 dark:text-green-400">
                            Yes
                          </span>
                        ) : (
                          <span className="text-stone-300 dark:text-stone-600">
                            No
                          </span>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3 text-xs text-stone-500 dark:text-stone-400">
                        {tool.pricing}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Tool reviews */}
          <section className="flex flex-col gap-6">
            <h2 className="text-xl font-bold text-stone-900 dark:text-white">
              Tool-by-tool breakdown
            </h2>

            <div className="flex flex-col gap-3 rounded-xl border border-orange-200 bg-orange-50/50 p-5 dark:border-orange-900/30 dark:bg-orange-950/20">
              <h3 className="font-semibold text-orange-700 dark:text-orange-400">
                1. MetaShield
              </h3>
              <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                Full meta tag audit with previews for 6 platforms (Twitter/X,
                LinkedIn, Facebook, Slack, Discord, Google). Scores your tags
                0-100 across 30+ rules and gives copy-paste HTML fixes for every
                issue. No login required. Free tier covers 10 checks per day;
                Pro plan for unlimited use. Best for developers who share
                content across multiple platforms.
              </p>
            </div>

            <div className="flex flex-col gap-3 rounded-xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900">
              <h3 className="font-semibold text-stone-900 dark:text-white">
                2. OpenGraph.xyz
              </h3>
              <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                The most popular OG checker. Shows previews for Facebook,
                Twitter, LinkedIn, and Discord. Clean interface with a tag
                generator. Also offers AI-powered dynamic OG image generation
                (paid). However, it doesn&apos;t score your tags or suggest
                fixes — it just shows you what&apos;s there.
              </p>
            </div>

            <div className="flex flex-col gap-3 rounded-xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900">
              <h3 className="font-semibold text-stone-900 dark:text-white">
                3. metatags.io
              </h3>
              <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                Focused on live editing. You can modify meta tags in real-time
                and see how they render on Google, Facebook, and Twitter. Great
                for drafting new tags from scratch. Generates code snippets you
                can copy. But only covers 3 platforms and doesn&apos;t analyze
                or score existing tags.
              </p>
            </div>

            <div className="flex flex-col gap-3 rounded-xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900">
              <h3 className="font-semibold text-stone-900 dark:text-white">
                4. OpenGraph.to
              </h3>
              <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                The closest competitor to MetaShield. Provides OG scoring and
                recommendations alongside previews for 5 platforms including
                WhatsApp. Newer tool that&apos;s improving fast. Worth trying if
                you want a second opinion on your tags.
              </p>
            </div>

            <div className="flex flex-col gap-3 rounded-xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900">
              <h3 className="font-semibold text-stone-900 dark:text-white">
                5. OpenGraph.io
              </h3>
              <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                API-first service for developers who need programmatic OG tag
                extraction. Not a visual preview tool — it returns structured
                data you integrate into your own apps. Free tier for testing,
                paid plans for production API usage.
              </p>
            </div>

            <div className="flex flex-col gap-3 rounded-xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900">
              <h3 className="font-semibold text-stone-900 dark:text-white">
                6. Iframely
              </h3>
              <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                Multi-protocol debugger that checks OG tags, Twitter Cards, and
                oEmbed. Built for developers integrating link previews into
                their apps. The free debugger shows raw tag data; paid API plans
                are available for production use. Not designed for casual
                checking.
              </p>
            </div>

            <div className="flex flex-col gap-3 rounded-xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900">
              <h3 className="font-semibold text-stone-900 dark:text-white">
                7. Facebook Sharing Debugger
              </h3>
              <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                Facebook&apos;s official tool. Shows how your links render in
                Facebook feeds and can force a cache refresh. Requires a
                Facebook developer account. Only shows Facebook rendering — no
                other platforms. Useful for Facebook-specific cache busting, but
                limited for general OG tag auditing.
              </p>
            </div>
          </section>

          {/* Which to use */}
          <section className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-stone-900 dark:text-white">
              Which tool should you use?
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2 rounded-xl border border-orange-100 bg-white p-5 dark:border-orange-900/30 dark:bg-stone-900">
                <h3 className="font-semibold text-stone-900 dark:text-white">
                  For a quick preview
                </h3>
                <p className="text-sm text-stone-500 dark:text-stone-400">
                  <strong>OpenGraph.xyz</strong> or <strong>metatags.io</strong>
                  . Paste a URL, see the preview. No scoring, no fixes — just a
                  quick visual check.
                </p>
              </div>
              <div className="flex flex-col gap-2 rounded-xl border border-orange-200 bg-orange-50/50 p-5 dark:border-orange-900/30 dark:bg-orange-950/20">
                <h3 className="font-semibold text-orange-700 dark:text-orange-400">
                  For a full audit with fixes
                </h3>
                <p className="text-sm text-stone-600 dark:text-stone-400">
                  <strong>MetaShield</strong>. Scored analysis across 30+ rules,
                  6 platform previews, copy-paste fixes. Best if you want to
                  actually improve your tags, not just see them.
                </p>
              </div>
              <div className="flex flex-col gap-2 rounded-xl border border-orange-100 bg-white p-5 dark:border-orange-900/30 dark:bg-stone-900">
                <h3 className="font-semibold text-stone-900 dark:text-white">
                  For API integration
                </h3>
                <p className="text-sm text-stone-500 dark:text-stone-400">
                  <strong>OpenGraph.io</strong> or <strong>Iframely</strong>.
                  Both offer APIs for extracting OG data programmatically.
                </p>
              </div>
              <div className="flex flex-col gap-2 rounded-xl border border-orange-100 bg-white p-5 dark:border-orange-900/30 dark:bg-stone-900">
                <h3 className="font-semibold text-stone-900 dark:text-white">
                  For Facebook cache issues
                </h3>
                <p className="text-sm text-stone-500 dark:text-stone-400">
                  <strong>Facebook Sharing Debugger</strong>. It&apos;s the only
                  tool that can force Facebook to re-scrape a URL and clear
                  cached OG data.
                </p>
              </div>
            </div>
          </section>

          {/* Bottom CTA */}
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-orange-200 bg-orange-50/50 p-8 text-center dark:border-orange-900/30 dark:bg-orange-950/20">
            <h2 className="text-2xl font-bold text-stone-900 dark:text-white">
              Try MetaShield free
            </h2>
            <p className="max-w-md text-sm text-stone-600 dark:text-stone-400">
              Check your Open Graph tags, Twitter Cards, and meta tags across 6
              platforms. Scored analysis with copy-paste fixes. No login
              required.
            </p>
            <Link
              href="/"
              className="inline-flex rounded-xl bg-orange-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-orange-200 transition-all hover:bg-orange-700 hover:shadow-orange-300 dark:bg-orange-500 dark:shadow-orange-950/50 dark:hover:bg-orange-400"
            >
              Check Your Tags Now
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
