import type { Metadata } from "next";
import Link from "next/link";

const baseUrl = "https://metashield-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title:
    "Metatags.io Alternative — 6-Platform Preview & Scored Audit | MetaShield",
  description:
    "Metatags.io previews Open Graph tags. MetaShield goes further — preview your links on 6 platforms, get a scored audit with fix suggestions, and share reports. Free, no signup.",
  openGraph: {
    title: "Metatags.io Alternative | MetaShield",
    description:
      "Metatags.io previews OG tags. MetaShield previews 6 platforms, scores your tags across 30+ rules, and gives copy-paste fixes. Free.",
    type: "website",
    siteName: "MetaShield",
    url: `${baseUrl}/compare/metatags-io`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Metatags.io Alternative | MetaShield",
    description:
      "Metatags.io previews OG tags. MetaShield previews 6 platforms, scores your tags, and gives copy-paste fixes. Free.",
  },
  alternates: {
    canonical: `${baseUrl}/compare/metatags-io`,
  },
};

const faqs = [
  {
    question: "Is metatags.io free?",
    answer:
      "Yes, metatags.io is free to use with no account required. It focuses on Open Graph tag editing and preview. MetaShield is also free (10 checks/day) and adds multi-platform previews, scoring, and fix suggestions on top of OG analysis.",
  },
  {
    question: "Can MetaShield edit meta tags like metatags.io?",
    answer:
      "MetaShield doesn't have a live tag editor like metatags.io. Instead, it analyzes your live page and gives you the exact HTML meta tags to copy-paste into your code. This works better for production sites where you want to audit what's actually deployed, not what you're drafting.",
  },
  {
    question: "Which platforms does MetaShield preview?",
    answer:
      "MetaShield shows how your link renders on Twitter/X, LinkedIn, Facebook, Slack, Discord, and Google. Metatags.io focuses primarily on Open Graph previews (Facebook, Twitter, LinkedIn, Pinterest, Slack). MetaShield adds Discord and Google, plus platform-specific tag validation.",
  },
  {
    question: "Does MetaShield check more than just Open Graph tags?",
    answer:
      "Yes. MetaShield checks Open Graph tags, Twitter Card tags, standard meta tags (title, description, canonical), technical SEO signals, and content quality indicators. You get a score out of 100 across 30+ rules, not just a visual preview.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Metatags.io Alternative — MetaShield",
    url: `${baseUrl}/compare/metatags-io`,
    description:
      "Compare metatags.io and MetaShield. Both check Open Graph tags — MetaShield adds 6-platform previews, scored audits, and copy-paste fixes.",
    mainEntity: {
      "@type": "SoftwareApplication",
      name: "MetaShield",
      url: baseUrl,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Any",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  },
];

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

const comparisonRows = [
  ["Live tag editor", "Yes — edit and preview in real time", "No — analyzes your deployed page"],
  ["Platforms previewed", "Facebook, Twitter, LinkedIn, Pinterest, Slack", "Twitter/X, LinkedIn, Facebook, Slack, Discord, Google"],
  ["Scored audit", "No", "Yes — 0-100 across 30+ rules"],
  ["Fix suggestions", "No — manual editing", "Yes — copy-paste HTML for every issue"],
  ["Shareable reports", "No", "Yes — unique URL per scan"],
  ["Login required", "No", "No"],
  ["Pro tier", "No (fully free)", "Yes — unlimited checks at $4/mo"],
  ["Tag coverage", "Open Graph focused", "OG + Twitter Cards + SEO + technical signals"],
];

export default function MetatagsIoComparison() {
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
              Metatags.io vs MetaShield
            </h1>
            <p className="mx-auto max-w-lg text-lg text-stone-600 dark:text-stone-400">
              Metatags.io is a solid tool for editing and previewing Open Graph
              tags. MetaShield takes a different approach — audit your live page
              across 6 platforms with a scored report.
            </p>
          </div>

          <Link
            href="/"
            className="mx-auto inline-flex rounded-xl bg-orange-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-orange-200 transition-all hover:bg-orange-700 hover:shadow-orange-300 dark:bg-orange-500 dark:shadow-orange-950/50 dark:hover:bg-orange-400"
          >
            Try MetaShield Free
          </Link>

          {/* What is metatags.io */}
          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-bold text-stone-900 dark:text-white">
              What is metatags.io?
            </h2>
            <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400">
              Metatags.io is a free meta tag editor and preview tool. You paste a
              URL or type in your tags manually, and it shows you a live preview
              of how your link will appear when shared on social platforms. It has
              a clean UI and the live editing feature is genuinely useful for
              drafting tags before you deploy.
            </p>
            <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400">
              Where metatags.io focuses on the editing experience, MetaShield
              focuses on auditing what&apos;s already live. It connects to your
              deployed URL, fetches the actual tags, scores them across 30+
              rules, and tells you exactly what to fix.
            </p>
          </section>

          {/* Comparison table */}
          <section className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-stone-900 dark:text-white">
              Feature comparison
            </h2>
            <div className="overflow-hidden rounded-xl border border-orange-200 dark:border-orange-900/50">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-orange-200 bg-orange-50 dark:border-orange-900/50 dark:bg-orange-950/30">
                    <th className="px-4 py-3 font-semibold text-stone-900 dark:text-white">
                      Feature
                    </th>
                    <th className="px-4 py-3 font-semibold text-stone-500 dark:text-stone-400">
                      metatags.io
                    </th>
                    <th className="px-4 py-3 font-semibold text-orange-600 dark:text-orange-400">
                      MetaShield
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-orange-100 dark:divide-orange-900/30">
                  {comparisonRows.map(([feature, metatags, metashield]) => (
                    <tr
                      key={feature}
                      className="bg-white dark:bg-stone-900/50"
                    >
                      <td className="px-4 py-3 font-medium text-stone-900 dark:text-white">
                        {feature}
                      </td>
                      <td className="px-4 py-3 text-stone-500 dark:text-stone-400">
                        {metatags}
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

          {/* When to use each */}
          <section className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-stone-900 dark:text-white">
              When to use each tool
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2 rounded-xl border border-orange-100 bg-white p-5 dark:border-orange-900/30 dark:bg-stone-900">
                <h3 className="font-semibold text-stone-900 dark:text-white">
                  Use metatags.io when...
                </h3>
                <ul className="space-y-1 text-sm text-stone-500 dark:text-stone-400">
                  <li>You&apos;re drafting OG tags before deploying</li>
                  <li>You want a live editor to experiment with tags</li>
                  <li>You only need Open Graph previews</li>
                </ul>
              </div>
              <div className="flex flex-col gap-2 rounded-xl border border-orange-200 bg-orange-50/50 p-5 dark:border-orange-800/50 dark:bg-orange-950/20">
                <h3 className="font-semibold text-orange-700 dark:text-orange-400">
                  Use MetaShield when...
                </h3>
                <ul className="space-y-1 text-sm text-stone-600 dark:text-stone-400">
                  <li>You need to audit a live, deployed page</li>
                  <li>You want previews across 6 platforms at once</li>
                  <li>You want a scored report with specific fixes</li>
                  <li>You need a shareable URL to send to your team</li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="flex flex-col gap-6">
            <h2 className="text-xl font-bold text-stone-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            {faqs.map((faq, i) => (
              <div key={i} className="flex flex-col gap-3">
                <h3 className="font-semibold text-stone-900 dark:text-white">
                  {faq.question}
                </h3>
                <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                  {faq.answer}
                </p>
              </div>
            ))}
          </section>

          {/* More comparisons */}
          <div className="flex flex-col gap-3 rounded-lg border border-orange-100 bg-white p-5 dark:border-orange-900/30 dark:bg-stone-900">
            <p className="text-sm font-medium text-stone-700 dark:text-stone-300">
              More meta tag comparisons
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/compare/twitter-card-validator" className="rounded-lg border border-orange-200 px-4 py-2 text-sm font-medium text-orange-700 transition-colors hover:bg-orange-50 dark:border-orange-800 dark:text-orange-400 dark:hover:bg-orange-950/20">
                vs Twitter Card Validator &rarr;
              </Link>
              <Link href="/compare/facebook-debugger" className="rounded-lg border border-orange-200 px-4 py-2 text-sm font-medium text-orange-700 transition-colors hover:bg-orange-50 dark:border-orange-800 dark:text-orange-400 dark:hover:bg-orange-950/20">
                vs Facebook Debugger &rarr;
              </Link>
              <Link href="/compare/og-checkers" className="rounded-lg border border-orange-200 px-4 py-2 text-sm font-medium text-orange-700 transition-colors hover:bg-orange-50 dark:border-orange-800 dark:text-orange-400 dark:hover:bg-orange-950/20">
                OG Checkers Compared &rarr;
              </Link>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-orange-200 bg-orange-50/50 p-8 text-center dark:border-orange-900/30 dark:bg-orange-950/20">
            <h2 className="text-2xl font-bold text-stone-900 dark:text-white">
              Ready to audit your meta tags?
            </h2>
            <p className="max-w-md text-sm text-stone-600 dark:text-stone-400">
              Paste any URL and see how it renders on 6 platforms. Get a scored
              report with copy-paste fixes. Free, no signup.
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
          <a href="https://headerguard-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-orange-600 dark:hover:text-orange-400">HeaderGuard</a>
          <a href="https://statusping-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-orange-600 dark:hover:text-orange-400">StatusPing</a>
          <a href="https://dns-lookup-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-orange-600 dark:hover:text-orange-400">DNS Lookup</a>
          <a href="https://ssl-certificate-checker-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-orange-600 dark:hover:text-orange-400">SSL Checker</a>
          <a href="https://whois-lookup-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-orange-600 dark:hover:text-orange-400">WHOIS Lookup</a>
          <a href="/suite" className="font-semibold transition-colors hover:text-orange-600 dark:hover:text-orange-400">Website Health Check &rarr;</a>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-stone-400 dark:text-stone-500">
          <span className="font-medium">Compare:</span>
          <a href="/compare/metatags-io" className="font-semibold text-orange-600 dark:text-orange-400">vs Metatags.io</a>
          <a href="/compare/twitter-card-validator" className="transition-colors hover:text-orange-600 dark:hover:text-orange-400">vs Twitter Card Validator</a>
          <a href="/compare/facebook-debugger" className="transition-colors hover:text-orange-600 dark:hover:text-orange-400">vs Facebook Debugger</a>
          <a href="/compare/og-checkers" className="transition-colors hover:text-orange-600 dark:hover:text-orange-400">OG Checkers Compared</a>
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
