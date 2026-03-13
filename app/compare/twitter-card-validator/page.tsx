import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Twitter Card Validator Alternative — Free, Works for Every Platform | MetaShield",
  description:
    "Twitter killed their Card Validator in 2023. MetaShield is the free replacement — preview your links on Twitter/X, LinkedIn, Facebook, Slack, Discord, and Google. No login required.",
  openGraph: {
    title: "Twitter Card Validator Alternative | MetaShield",
    description:
      "Twitter killed their Card Validator. MetaShield replaces it — preview your links across 6 platforms, get a scored audit, and copy-paste fixes. Free.",
    type: "website",
    siteName: "MetaShield",
  },
  twitter: {
    card: "summary_large_image",
    title: "Twitter Card Validator Alternative | MetaShield",
    description:
      "Twitter killed their Card Validator. MetaShield replaces it — preview your links across 6 platforms with a scored audit.",
  },
  alternates: {
    canonical:
      "https://metashield-moltcorporation.vercel.app/compare/twitter-card-validator",
  },
};

const faqs = [
  {
    question: "Is there any official Twitter Card Validator replacement?",
    answer:
      "No. Twitter/X has not released a replacement for their Card Validator tool. The official documentation suggests using Tweet Composer to preview cards, but that requires posting a tweet (or scheduling one) to see the preview. MetaShield lets you preview without posting anything.",
  },
  {
    question: "Does MetaShield check the same tags as Twitter's validator?",
    answer:
      "Yes — and more. MetaShield checks all twitter:card meta tags (twitter:card, twitter:title, twitter:description, twitter:image, twitter:site, twitter:creator) plus Open Graph tags that Twitter/X uses as fallbacks. You also get analysis for 5 additional platforms.",
  },
  {
    question: "Is MetaShield free?",
    answer:
      "Yes. The free tier gives you 10 checks per day — enough for most developers. If you need unlimited checks, there's a Pro plan.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Twitter Card Validator Alternative — MetaShield",
    url: "https://metashield-moltcorporation.vercel.app/compare/twitter-card-validator",
    description:
      "Twitter killed their Card Validator in 2023. MetaShield is the free replacement for previewing social cards across every platform.",
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

export default function TwitterCardValidatorComparison() {
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
              Twitter Card Validator Alternative
            </h1>
            <p className="mx-auto max-w-lg text-lg text-stone-600 dark:text-stone-400">
              Twitter killed their Card Validator in 2023. MetaShield is the
              free replacement — and it works for every platform, not just
              Twitter.
            </p>
          </div>

          <Link
            href="/"
            className="mx-auto inline-flex rounded-xl bg-orange-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-orange-200 transition-all hover:bg-orange-700 hover:shadow-orange-300 dark:bg-orange-500 dark:shadow-orange-950/50 dark:hover:bg-orange-400"
          >
            Try MetaShield Free
          </Link>

          {/* What happened */}
          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-bold text-stone-900 dark:text-white">
              What happened to Twitter&apos;s Card Validator?
            </h2>
            <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400">
              In 2023, Twitter (now X) removed their official Card Validator
              tool as part of broader API and feature cuts following the
              acquisition. The validator let developers preview how their links
              would appear in tweets and debug meta tag issues. There is no
              official replacement — the Cards section of the developer portal
              now redirects to generic docs with no preview functionality.
            </p>
            <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400">
              This left millions of developers and content creators without a
              way to check their Twitter Cards before sharing. MetaShield fills
              that gap — and goes much further.
            </p>
          </section>

          {/* Comparison table */}
          <section className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-stone-900 dark:text-white">
              Twitter Card Validator vs MetaShield
            </h2>
            <div className="overflow-hidden rounded-xl border border-orange-200 dark:border-orange-900/50">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-orange-200 bg-orange-50 dark:border-orange-900/50 dark:bg-orange-950/30">
                    <th className="px-4 py-3 font-semibold text-stone-900 dark:text-white">
                      Feature
                    </th>
                    <th className="px-4 py-3 font-semibold text-stone-400 line-through dark:text-stone-500">
                      Twitter Validator
                    </th>
                    <th className="px-4 py-3 font-semibold text-orange-600 dark:text-orange-400">
                      MetaShield
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-orange-100 dark:divide-orange-900/30">
                  {[
                    ["Available", "Removed in 2023", "Free and live"],
                    [
                      "Platforms",
                      "Twitter only",
                      "Twitter/X, LinkedIn, Facebook, Slack, Discord, Google",
                    ],
                    ["Login required", "Yes (Twitter account)", "No"],
                    [
                      "Scored analysis",
                      "No — pass/fail only",
                      "Yes — 0-100 score across 30+ rules",
                    ],
                    [
                      "Fix suggestions",
                      "No",
                      "Yes — copy-paste HTML for every issue",
                    ],
                    [
                      "Open Graph support",
                      "Partial (fallback only)",
                      "Full analysis and scoring",
                    ],
                    [
                      "API rate limits",
                      "Strict",
                      "Generous free tier, Pro for heavy use",
                    ],
                  ].map(([feature, twitter, metashield]) => (
                    <tr
                      key={feature}
                      className="bg-white dark:bg-stone-900/50"
                    >
                      <td className="px-4 py-3 font-medium text-stone-900 dark:text-white">
                        {feature}
                      </td>
                      <td className="px-4 py-3 text-stone-400 dark:text-stone-500">
                        {twitter}
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

          {/* Why MetaShield */}
          <section className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-stone-900 dark:text-white">
              Why developers are switching to MetaShield
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                {
                  title: "6 platforms, one check",
                  desc: "See how your link renders on Twitter/X, LinkedIn, Facebook, Slack, Discord, and Google — all at once. No switching between platform-specific tools.",
                },
                {
                  title: "No login required",
                  desc: "Twitter's validator required a Twitter account. MetaShield works instantly — paste a URL, get results. No accounts, no API keys.",
                },
                {
                  title: "Scored reports",
                  desc: "Get a 0-100 score across 30+ rules covering essentials, social tags, technical SEO, and content quality. Not just pass/fail.",
                },
                {
                  title: "Copy-paste fixes",
                  desc: "Every issue comes with the exact HTML meta tag you need. Copy it, paste it into your code, deploy. Done.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex flex-col gap-2 rounded-xl border border-orange-100 bg-white p-5 dark:border-orange-900/30 dark:bg-stone-900"
                >
                  <h3 className="font-semibold text-stone-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm text-stone-500 dark:text-stone-400">
                    {item.desc}
                  </p>
                </div>
              ))}
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

          {/* Bottom CTA */}
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-orange-200 bg-orange-50/50 p-8 text-center dark:border-orange-900/30 dark:bg-orange-950/20">
            <h2 className="text-2xl font-bold text-stone-900 dark:text-white">
              Ready to check your Twitter Cards?
            </h2>
            <p className="max-w-md text-sm text-stone-600 dark:text-stone-400">
              Paste any URL and see how it looks on Twitter/X and 5 other
              platforms. Free, instant, no login required.
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
