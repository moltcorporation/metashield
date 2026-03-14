import Link from "next/link";

const sections = [
  {
    category: "Essential SEO Meta Tags",
    tags: [
      {
        name: "title",
        what: "The page title shown in browser tabs and search engine results. This is the single most important on-page SEO element. Keep it under 60 characters so it doesn't get truncated in Google results. Each page should have a unique, descriptive title.",
        example: '<title>Free Meta Tag Checker — Preview Social Cards | MetaShield</title>',
      },
      {
        name: "meta description",
        what: "A summary of the page shown below the title in search results. Google uses it as the snippet text (though it may generate its own). Keep it under 160 characters. Write it like ad copy — it's your pitch to searchers deciding whether to click.",
        example: '<meta name="description" content="Check your meta tags and preview how your site appears on Google, Facebook, Twitter, LinkedIn, and Slack. Free, no signup required." />',
      },
      {
        name: "canonical",
        what: "Tells search engines which URL is the 'official' version of a page. Prevents duplicate content issues when the same page is accessible at multiple URLs (with/without www, with query parameters, etc.). Every page should have a canonical tag pointing to its preferred URL.",
        example: '<link rel="canonical" href="https://example.com/page" />',
      },
    ],
  },
  {
    category: "Open Graph (Facebook, LinkedIn, Slack)",
    tags: [
      {
        name: "og:title",
        what: "The title shown when your page is shared on Facebook, LinkedIn, Slack, Discord, and most other platforms. Can be different from your SEO title — optimize it for social engagement rather than search keywords.",
        example: '<meta property="og:title" content="Free Meta Tag Checker" />',
      },
      {
        name: "og:description",
        what: "The description shown in social media link previews. Keep it under 200 characters. Focus on what makes someone want to click — this is your social media pitch.",
        example: '<meta property="og:description" content="Preview how your site looks on Google, Facebook, Twitter, LinkedIn, and Slack." />',
      },
      {
        name: "og:image",
        what: "The image shown in social media previews. This single tag has the biggest impact on click-through rates from social shares. Use a 1200x630 image. Must be an absolute URL. Facebook caches aggressively — use their Sharing Debugger to refresh after changes.",
        example: '<meta property="og:image" content="https://example.com/og-image.png" />',
      },
    ],
  },
  {
    category: "Twitter Cards",
    tags: [
      {
        name: "twitter:card",
        what: "Controls the card format for Twitter/X link previews. 'summary' shows a small square image with text. 'summary_large_image' shows a large banner image above the text — this format gets more engagement. Use 'summary_large_image' for most pages.",
        example: '<meta name="twitter:card" content="summary_large_image" />',
      },
      {
        name: "twitter:title & twitter:description",
        what: "Title and description for Twitter/X previews. If not set, Twitter falls back to og:title and og:description. Only set these separately if you want Twitter-specific messaging (shorter, more conversational).",
        example: '<meta name="twitter:title" content="Free Meta Tag Checker" />',
      },
    ],
  },
];

const faqs = [
  {
    question: "What are meta tags?",
    answer:
      "Meta tags are HTML elements in your page's <head> section that provide metadata about the page. They don't appear on the page itself — instead, they tell search engines, social media platforms, and browsers how to handle and display your page. The most important meta tags control your search result appearance (title, description) and social media previews (Open Graph, Twitter Cards).",
  },
  {
    question: "How do I check my meta tags?",
    answer:
      "Use MetaShield — enter your URL and instantly see how your page appears on Google, Facebook, Twitter, LinkedIn, and Slack. You'll see which meta tags are present, which are missing, and get a preview of your social cards. No signup required.",
  },
  {
    question: "What is Open Graph?",
    answer:
      "Open Graph is a protocol created by Facebook that controls how your page appears when shared on social media. Open Graph tags (og:title, og:description, og:image) are used by Facebook, LinkedIn, Slack, Discord, iMessage, and many other platforms. Without Open Graph tags, these platforms guess what title, description, and image to show — and they often guess wrong.",
  },
  {
    question: "Do I need both Open Graph and Twitter Card tags?",
    answer:
      "You need Open Graph tags for sure — they're used by most platforms. Twitter/X will fall back to Open Graph tags if Twitter-specific tags aren't set. The only Twitter-specific tag worth setting is twitter:card (to choose between 'summary' and 'summary_large_image' format). Set og:title, og:description, og:image, and twitter:card as your minimum.",
  },
  {
    question: "What size should my og:image be?",
    answer:
      "Use 1200x630 pixels for the best results across all platforms. This is the recommended size for Facebook, LinkedIn, and Twitter's summary_large_image card. Use PNG or JPG, keep the file under 5MB, and always use an absolute URL (starting with https://). Include important text in the center third of the image, since some platforms crop the edges.",
  },
  {
    question: "Why doesn't my social preview update after I change meta tags?",
    answer:
      "Social platforms cache link previews aggressively. Facebook caches for 24 hours — use the Facebook Sharing Debugger to force a refresh. Twitter has its own Card Validator. LinkedIn's Post Inspector lets you recrawl a URL. MetaShield shows you what the platforms will see based on your current meta tags, so you can verify before sharing.",
  },
];

export default function MetaTagsGuide() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  return (
    <div className="flex min-h-screen flex-col bg-orange-50/30 font-sans dark:bg-stone-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <header className="flex items-center justify-between border-b border-orange-100 px-6 py-4 dark:border-stone-800">
        <Link href="/" className="flex items-center gap-2">
          <svg viewBox="0 0 64 64" fill="none" className="h-6 w-6 text-orange-600 dark:text-orange-400" aria-hidden="true">
            <rect x="8" y="8" width="48" height="48" rx="8" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2" />
            <path d="M20 24h24M20 32h24M20 40h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="text-lg font-bold tracking-tight text-stone-900 dark:text-white">
            MetaShield
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/pricing"
            className="text-sm font-medium text-stone-600 transition-colors hover:text-orange-600 dark:text-stone-400 dark:hover:text-orange-400"
          >
            Pricing
          </Link>
          <Link
            href="/"
            className="rounded-xl bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-200 transition-all hover:bg-orange-700 hover:shadow-orange-300 dark:bg-orange-500 dark:shadow-orange-950/50 dark:hover:bg-orange-400"
          >
            Check your meta tags free
          </Link>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-4 py-12">
        <div className="flex flex-col gap-4">
          <p className="text-sm font-medium text-orange-600 dark:text-orange-400">
            Guide
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight text-stone-900 sm:text-4xl dark:text-white">
            Meta Tags Explained
            <span className="block text-orange-600 dark:text-orange-400">
              SEO, Open Graph & Twitter Cards
            </span>
          </h1>
          <p className="text-lg text-stone-600 dark:text-stone-400">
            Meta tags control how your site appears on Google, Facebook, Twitter,
            LinkedIn, and Slack. Get them right and your links look professional
            and get clicked. Get them wrong and your pages show broken previews
            or missing images. Here&apos;s what each tag does.
          </p>
        </div>

        {/* Tag sections */}
        {sections.map((section, si) => (
          <div key={si} className="flex flex-col gap-5">
            <h2 className="text-xl font-semibold text-stone-900 dark:text-white">
              {section.category}
            </h2>
            {section.tags.map((tag, ti) => (
              <div
                key={ti}
                className="flex flex-col gap-3 rounded-lg border border-orange-100 bg-white p-5 dark:border-stone-800 dark:bg-stone-900"
              >
                <h3 className="font-semibold text-orange-600 dark:text-orange-400">
                  {tag.name}
                </h3>
                <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                  {tag.what}
                </p>
                <code className="overflow-x-auto rounded-lg bg-stone-100 px-3 py-2 text-xs text-stone-700 dark:bg-stone-800 dark:text-stone-300">
                  {tag.example}
                </code>
              </div>
            ))}
          </div>
        ))}

        {/* CTA */}
        <div className="flex flex-col items-center gap-4 rounded-xl border border-orange-200 bg-orange-50/60 p-8 text-center dark:border-orange-900/30 dark:bg-orange-950/20">
          <h2 className="text-2xl font-bold text-stone-900 dark:text-white">
            Check your meta tags now
          </h2>
          <p className="max-w-md text-sm text-stone-600 dark:text-stone-400">
            Enter your URL and preview how your page appears on Google, Facebook,
            Twitter, LinkedIn, and Slack. See which tags are present, which are
            missing, and fix issues before you share. Free, no signup required.
          </p>
          <Link
            href="/"
            className="rounded-xl bg-orange-600 px-8 py-3 text-base font-semibold text-white shadow-lg shadow-orange-200 transition-all hover:bg-orange-700 hover:shadow-orange-300 dark:bg-orange-500 dark:shadow-orange-950/50 dark:hover:bg-orange-400"
          >
            Check your meta tags free
          </Link>
        </div>

        {/* Compare tools */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-stone-900 dark:text-white">
            Compare meta tag checkers
          </h2>
          <div className="flex flex-wrap gap-3">
            {[
              { name: "Facebook Debugger", href: "/compare/facebook-debugger" },
              { name: "Twitter Card Validator", href: "/compare/twitter-card-validator" },
              { name: "metatags.io", href: "/compare/metatags-io" },
              { name: "Other OG Checkers", href: "/compare/og-checkers" },
            ].map((tool) => (
              <Link
                key={tool.name}
                href={tool.href}
                className="rounded-lg border border-orange-100 bg-white px-4 py-2.5 text-sm font-medium text-stone-700 transition-colors hover:border-orange-300 hover:text-orange-700 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300 dark:hover:border-orange-600 dark:hover:text-orange-400"
              >
                vs {tool.name}
              </Link>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="flex flex-col gap-5">
          <h2 className="text-xl font-semibold text-stone-900 dark:text-white">
            Frequently asked questions
          </h2>
          <div className="flex flex-col gap-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-lg border border-orange-100 bg-white p-5 dark:border-stone-800 dark:bg-stone-900"
              >
                <h3 className="font-semibold text-stone-900 dark:text-white">
                  {faq.question}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="flex flex-col items-center gap-3 border-t border-orange-100 px-6 py-6 dark:border-stone-800">
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-stone-400 dark:text-stone-500">
          <span className="font-medium">Moltcorp Suite:</span>
          <span className="font-semibold text-orange-600 dark:text-orange-400">MetaShield</span>
          <a href="https://statusping-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-orange-600 dark:hover:text-orange-400">StatusPing</a>
          <a href="https://federal-contract-tracker-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-orange-600 dark:hover:text-orange-400">Federal Contract Tracker</a>
          <a href="https://headerguard-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-orange-600 dark:hover:text-orange-400">HeaderGuard</a>
          <a href="https://ssl-certificate-checker-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-orange-600 dark:hover:text-orange-400">SSL Checker</a>
          <a href="https://dns-lookup-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-orange-600 dark:hover:text-orange-400">DNS Lookup</a>
          <a href="https://whois-lookup-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-orange-600 dark:hover:text-orange-400">WHOIS Lookup</a>
        </div>
        <p className="text-xs text-stone-400 dark:text-stone-600">
          Built by agents at{" "}
          <a href="https://moltcorporation.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-orange-600 dark:hover:text-orange-400">Moltcorp</a>
        </p>
      </footer>
    </div>
  );
}
