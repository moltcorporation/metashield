"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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

const imageRequirements = [
  { label: "Recommended size", value: "1200 × 627 px" },
  { label: "Aspect ratio", value: "1.91:1" },
  { label: "Minimum size", value: "200 × 200 px (thumbnail only)" },
  { label: "Large card threshold", value: "≥ 400 px wide" },
  { label: "Max file size", value: "5 MB" },
  { label: "Formats", value: "JPG, PNG, GIF (first frame), WebP" },
  { label: "URL format", value: "Absolute HTTPS URL required" },
];

const commonIssues = [
  {
    problem: "Blank preview card — no image",
    cause: "Missing og:image tag, or image URL uses http:// instead of https://",
    fix: '<meta property="og:image" content="https://example.com/image.jpg" />',
  },
  {
    problem: "Tiny thumbnail instead of large card",
    cause: "og:image is smaller than 400px wide",
    fix: "Use an image at least 1200 × 627 px for the large card format",
  },
  {
    problem: "Wrong title or description showing",
    cause: "Missing og:title / og:description — LinkedIn falls back to <title> and <meta name=\"description\">",
    fix: '<meta property="og:title" content="Your Title Here" />\n<meta property="og:description" content="Your description here." />',
  },
  {
    problem: "Old preview still showing after update",
    cause: "LinkedIn caches previews aggressively",
    fix: "Use LinkedIn Post Inspector to force a re-fetch: linkedin.com/post-inspector/",
  },
  {
    problem: "Preview looks fine in MetaShield but broken on LinkedIn",
    cause: "LinkedIn can't reach the og:image URL (firewall, auth wall, or relative path)",
    fix: "Ensure og:image URL is publicly accessible — test by opening it in an incognito window",
  },
];

const faqs = [
  {
    question: "What tags does LinkedIn use for link previews?",
    answer:
      "LinkedIn relies entirely on Open Graph (og:) meta tags — og:title, og:description, and og:image. It does not use Twitter Card tags. If OG tags are missing, LinkedIn falls back to the <title> tag and <meta name=\"description\">, but results are unpredictable.",
  },
  {
    question: "How do I force LinkedIn to update a cached preview?",
    answer:
      "Use the LinkedIn Post Inspector (linkedin.com/post-inspector/) — paste your URL and click Inspect. This forces LinkedIn to re-fetch your page and clear the cached preview. Use MetaShield first to validate your tags are correct, then use the Post Inspector to clear the cache.",
  },
  {
    question: "What is the best og:image size for LinkedIn?",
    answer:
      "1200 × 627 pixels at a 1.91:1 aspect ratio. Images below 400px wide render as a small thumbnail. Keep file size under 5MB and use an absolute HTTPS URL. JPG and PNG work best — avoid SVG, which LinkedIn doesn't render.",
  },
  {
    question: "Does LinkedIn support og:video?",
    answer:
      "LinkedIn does not render og:video in link previews. If you share a link with og:video, LinkedIn will show the og:image as a static preview card instead. To share video natively, upload it directly to LinkedIn.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "LinkedIn Link Preview Checker",
  description:
    "Check how your links appear on LinkedIn before posting. Validate og:image size, og:title, og:description, and get a scored report with copy-paste fixes.",
  url: "https://metashield-moltcorporation.vercel.app/tools/linkedin-preview",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  creator: {
    "@type": "Organization",
    name: "Moltcorp",
    url: "https://moltcorporation.com",
  },
};

export default function LinkedInPreviewChecker() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rateLimited, setRateLimited] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setRateLimited(false);

    let normalizedUrl = url.trim();
    if (!normalizedUrl) return;

    if (
      !normalizedUrl.startsWith("http://") &&
      !normalizedUrl.startsWith("https://")
    ) {
      normalizedUrl = "https://" + normalizedUrl;
    }

    try {
      new URL(normalizedUrl);
    } catch {
      setError("Please enter a valid URL.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: normalizedUrl }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        if (res.status === 429) {
          setRateLimited(true);
          setLoading(false);
          return;
        }
        throw new Error(data?.error || "Something went wrong. Try again.");
      }

      const data = await res.json();
      router.push(`/report/${data.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  }

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
            Full meta scan
          </Link>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-4 py-12">
        {/* Hero + scan form */}
        <div className="flex flex-col items-center gap-5 text-center">
          <EyeIcon className="h-14 w-14 text-orange-600 dark:text-orange-400" />
          <h1 className="text-3xl font-extrabold tracking-tight text-stone-900 sm:text-4xl dark:text-white">
            LinkedIn Link Preview
            <span className="block text-orange-600 dark:text-orange-400">
              Checker
            </span>
          </h1>
          <p className="mx-auto max-w-xl text-lg text-stone-600 dark:text-stone-400">
            See exactly how your link will appear in the LinkedIn feed.
            Check your og:image, og:title, and og:description — fix issues{" "}
            <strong className="text-stone-900 dark:text-white">
              before you post
            </strong>.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mx-auto flex w-full max-w-lg flex-col gap-3"
        >
          <div className="flex gap-2">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://your-site.com/blog-post"
              disabled={loading}
              className="flex-1 rounded-xl border border-orange-200 bg-white px-4 py-3.5 text-base text-stone-900 placeholder-stone-400 outline-none transition-all focus:border-orange-500 focus:ring-4 focus:ring-orange-100 disabled:opacity-50 dark:border-orange-800 dark:bg-stone-800 dark:text-white dark:placeholder-stone-500 dark:focus:border-orange-500 dark:focus:ring-orange-900/50"
            />
            <button
              type="submit"
              disabled={loading || !url.trim()}
              className="rounded-xl bg-orange-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-orange-200 transition-all hover:bg-orange-700 hover:shadow-orange-300 disabled:opacity-50 disabled:shadow-none dark:bg-orange-500 dark:shadow-orange-950/50 dark:hover:bg-orange-400"
            >
              {loading ? "Checking..." : "Check Preview"}
            </button>
          </div>

          {error && (
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          )}

          {rateLimited && (
            <div className="flex flex-col items-center gap-3 rounded-xl border border-orange-300 bg-orange-50 p-4 dark:border-orange-700 dark:bg-orange-950/40">
              <p className="text-sm font-medium text-stone-800 dark:text-stone-200">
                You&apos;ve used all 5 free scans for today.
              </p>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Upgrade to Pro for unlimited scans — no waiting.
              </p>
              <a
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-xl bg-orange-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-orange-200 transition-all hover:bg-orange-700 hover:shadow-orange-300 dark:bg-orange-500 dark:shadow-orange-950/50 dark:hover:bg-orange-400"
              >
                Upgrade to Pro — $5/mo
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          )}
        </form>

        {loading && (
          <div className="flex items-center justify-center gap-3">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-orange-200 border-t-orange-600 dark:border-orange-800 dark:border-t-orange-400" />
            <p className="text-sm text-stone-500 dark:text-stone-400">
              Analyzing LinkedIn preview tags...
            </p>
          </div>
        )}

        {/* og:image requirements */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-stone-900 dark:text-white">
            LinkedIn og:image requirements
          </h2>
          <div className="overflow-x-auto rounded-xl border border-orange-100 dark:border-orange-900/30">
            <table className="w-full text-sm">
              <tbody>
                {imageRequirements.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-orange-50 last:border-0 dark:border-stone-800/50"
                  >
                    <td className="px-4 py-3 font-medium text-stone-700 dark:text-stone-300">
                      {row.label}
                    </td>
                    <td className="px-4 py-3 text-stone-600 dark:text-stone-400">
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Common issues and fixes */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-stone-900 dark:text-white">
            Common LinkedIn preview issues
          </h2>
          <div className="flex flex-col gap-3">
            {commonIssues.map((issue, i) => (
              <div
                key={i}
                className="rounded-lg border border-orange-100 bg-white p-4 dark:border-orange-900/30 dark:bg-stone-900"
              >
                <h3 className="font-semibold text-stone-900 dark:text-white">
                  {issue.problem}
                </h3>
                <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                  <span className="font-medium text-stone-600 dark:text-stone-300">Cause:</span>{" "}
                  {issue.cause}
                </p>
                <div className="mt-2 rounded-md bg-stone-50 px-3 py-2 dark:bg-stone-800">
                  <p className="text-xs font-medium text-stone-500 dark:text-stone-400">Fix:</p>
                  <pre className="mt-1 whitespace-pre-wrap text-xs text-orange-700 dark:text-orange-400">
                    {issue.fix}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Essential OG tags for LinkedIn */}
        <div className="flex flex-col gap-4 rounded-xl border border-orange-200 bg-orange-50/60 p-6 dark:border-orange-900/30 dark:bg-orange-950/20">
          <h2 className="text-xl font-semibold text-stone-900 dark:text-white">
            Essential meta tags for LinkedIn
          </h2>
          <div className="rounded-md bg-white p-4 dark:bg-stone-900">
            <pre className="whitespace-pre-wrap text-xs leading-relaxed text-stone-700 dark:text-stone-300">
{`<meta property="og:title" content="Your Page Title" />
<meta property="og:description" content="A concise description (under 155 characters)." />
<meta property="og:image" content="https://example.com/og-image.jpg" />
<meta property="og:url" content="https://example.com/page" />
<meta property="og:type" content="article" />
<meta property="og:site_name" content="Your Site Name" />`}
            </pre>
          </div>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            LinkedIn uses only Open Graph tags — it ignores twitter:card,
            twitter:title, and other Twitter-specific tags. The first three
            (og:title, og:description, og:image) are required. The rest are
            recommended.
          </p>
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
                className="rounded-lg border border-orange-100 bg-white p-5 dark:border-orange-900/30 dark:bg-stone-900"
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

        {/* CTA */}
        <div className="flex flex-col items-center gap-4 rounded-xl border border-orange-200 bg-orange-50 p-8 text-center dark:border-orange-900/30 dark:bg-orange-950/20">
          <h2 className="text-2xl font-bold text-stone-900 dark:text-white">
            Check your LinkedIn preview now
          </h2>
          <p className="max-w-md text-sm text-stone-600 dark:text-stone-400">
            Free. Instant. Scored report with copy-paste fixes for every issue.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="rounded-xl bg-orange-600 px-8 py-3 text-base font-semibold text-white shadow-lg shadow-orange-200 transition-all hover:bg-orange-700 hover:shadow-orange-300 dark:bg-orange-500 dark:shadow-orange-950/50 dark:hover:bg-orange-400"
          >
            Check my LinkedIn preview
          </button>
        </div>

        {/* Related tools */}
        <div className="flex flex-col gap-3 rounded-lg border border-orange-100 bg-white p-5 dark:border-orange-900/30 dark:bg-stone-900">
          <p className="text-sm font-medium text-stone-700 dark:text-stone-300">
            Also check your site with
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Full Meta Scan", href: "/" },
              { label: "Twitter Card Checker", href: "/twitter-card-validator" },
              { label: "OG Tag Checker", href: "/open-graph-checker" },
              { label: "Security Headers", href: "https://headerguard-moltcorporation.vercel.app" },
              { label: "SSL Checker", href: "https://ssl-certificate-checker-moltcorporation.vercel.app" },
            ].map((tool) => (
              <Link
                key={tool.label}
                href={tool.href}
                className="rounded-lg border border-stone-200 px-4 py-2 text-sm font-medium text-stone-700 transition-colors hover:border-orange-300 hover:bg-orange-50 dark:border-stone-700 dark:text-stone-300 dark:hover:border-orange-700 dark:hover:bg-orange-950/20"
              >
                {tool.label} &rarr;
              </Link>
            ))}
          </div>
        </div>
      </main>

      <footer className="flex flex-col items-center gap-3 border-t border-orange-100 px-6 py-6 dark:border-orange-900/20">
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-stone-400 dark:text-stone-500">
          <span className="font-medium">Moltcorp Suite:</span>
          <span className="font-semibold text-orange-600 dark:text-orange-400">MetaShield</span>
          <a href="https://headerguard-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-orange-600 dark:hover:text-orange-400">HeaderGuard</a>
          <a href="https://statusping-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-orange-600 dark:hover:text-orange-400">StatusPing</a>
          <a href="https://dns-lookup-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-orange-600 dark:hover:text-orange-400">DNS Lookup</a>
          <a href="https://ssl-certificate-checker-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-orange-600 dark:hover:text-orange-400">SSL Checker</a>
          <a href="https://whois-lookup-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-orange-600 dark:hover:text-orange-400">WHOIS Lookup</a>
          <a href="https://federal-contract-tracker-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-orange-600 dark:hover:text-orange-400">Contract Tracker</a>        </div>
        <span className="text-xs text-stone-400 dark:text-stone-600">
          Built by agents at{" "}
          <a href="https://moltcorporation.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-orange-600 dark:hover:text-orange-400">Moltcorp</a>
        </span>
      </footer>
    </div>
  );
}
