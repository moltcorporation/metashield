"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function TwitterCardValidator() {
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
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-stone-900 dark:text-white"
        >
          MetaShield
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/pricing"
            className="text-sm font-medium text-stone-600 transition-colors hover:text-orange-600 dark:text-stone-400 dark:hover:text-orange-400"
          >
            Pricing
          </Link>
          <a
            href="https://moltcorporation.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-stone-500 transition-colors hover:text-orange-600 dark:text-stone-400 dark:hover:text-orange-400"
          >
            by Moltcorp
          </a>
        </div>
      </header>

      {/* Hero */}
      <main className="flex flex-1 flex-col items-center px-4 pb-16 pt-12">
        <div className="flex w-full max-w-xl flex-col items-center gap-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl dark:text-white">
            Twitter Card
            <span className="block text-orange-600 dark:text-orange-400">Validator</span>
          </h1>
          <p className="max-w-md text-lg text-stone-600 dark:text-stone-400">
            See exactly how your link will look on Twitter/X before you post.
            Check your twitter:card, twitter:title, twitter:image, and more.
          </p>

          {/* URL Input Form */}
          <form
            onSubmit={handleSubmit}
            className="mt-2 flex w-full flex-col gap-3"
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://your-site.com"
                disabled={loading}
                className="flex-1 rounded-xl border border-orange-200 bg-white px-4 py-3.5 text-base text-stone-900 placeholder-stone-400 outline-none transition-all focus:border-orange-500 focus:ring-4 focus:ring-orange-100 disabled:opacity-50 dark:border-orange-800 dark:bg-stone-800 dark:text-white dark:placeholder-stone-500 dark:focus:border-orange-500 dark:focus:ring-orange-900/50"
              />
              <button
                type="submit"
                disabled={loading || !url.trim()}
                className="rounded-xl bg-orange-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-orange-200 transition-all hover:bg-orange-700 hover:shadow-orange-300 disabled:opacity-50 disabled:shadow-none dark:bg-orange-500 dark:shadow-orange-950/50 dark:hover:bg-orange-400"
              >
                {loading ? "Checking..." : "Check"}
              </button>
            </div>

            {error && (
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            )}

            {rateLimited && (
              <div className="flex flex-col items-center gap-2 rounded-xl border border-orange-300 bg-orange-50 p-4 dark:border-orange-700 dark:bg-orange-950/40">
                <p className="text-sm font-medium text-stone-900 dark:text-white">
                  You&apos;ve used all 5 free scans for today.
                </p>
                <p className="text-xs text-stone-600 dark:text-stone-400">
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
            <div className="flex items-center gap-3">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-orange-200 border-t-orange-600 dark:border-orange-800 dark:border-t-orange-400" />
              <p className="text-sm text-stone-500 dark:text-stone-400">
                Analyzing meta tags...
              </p>
            </div>
          )}
        </div>

        {/* FAQ Section */}
        {!loading && (
          <div className="mt-16 flex w-full max-w-2xl flex-col gap-8">
            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-stone-900 dark:text-white">
                What is a Twitter Card?
              </h2>
              <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                Twitter Cards are meta tags that control how your links appear
                when shared on Twitter/X. They determine the title, description,
                and image shown in the preview card. There are two main types:
                <strong> summary</strong> (small image with text) and
                <strong> summary_large_image</strong> (large image above text).
                Without proper Twitter Card tags, your links may appear as plain
                URLs with no preview.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-stone-900 dark:text-white">
                Why check your Twitter Card?
              </h2>
              <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                A broken or missing Twitter Card means your links look bare when
                shared — no image, no description, just a URL. This kills
                click-through rates. Common issues include missing
                twitter:image tags, images that are too small, titles that get
                truncated, and using the wrong card type. Checking before you
                share ensures your content looks professional and gets clicks.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-stone-900 dark:text-white">
                What happened to Twitter&apos;s Card Validator?
              </h2>
              <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                Twitter removed their official Card Validator tool in 2023 after
                the rebrand to X. There is no official replacement. MetaShield
                fills this gap — paste any URL and see exactly how your
                Twitter/X card will render, plus get a full meta tag audit with
                scores and fix suggestions across all platforms.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-stone-900 dark:text-white">
                What tags does this check?
              </h2>
              <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                MetaShield checks all Twitter Card meta tags including
                twitter:card, twitter:title, twitter:description, twitter:image,
                twitter:site, and twitter:creator. It also checks Open Graph
                tags (og:title, og:image, etc.) which Twitter/X uses as
                fallbacks. You get a full report with scores, platform previews
                for 6 platforms, and copy-paste HTML fixes for any issues found.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="flex flex-col items-center gap-3 border-t border-orange-100 px-6 py-6 dark:border-orange-900/30">
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-stone-400 dark:text-stone-500">
          <span className="font-medium">Compare:</span>
          <a href="/compare/twitter-card-validator" className="transition-colors hover:text-orange-600 dark:hover:text-orange-400">vs Twitter Card Validator</a>
          <a href="/compare/facebook-debugger" className="transition-colors hover:text-orange-600 dark:hover:text-orange-400">vs Facebook Debugger</a>
          <a href="/compare/og-checkers" className="transition-colors hover:text-orange-600 dark:hover:text-orange-400">OG Checkers Compared</a>
          <a href="/linkedin-post-preview" className="transition-colors hover:text-orange-600 dark:hover:text-orange-400">LinkedIn Preview Checker</a>
        </div>
        <span className="text-sm text-stone-400 dark:text-stone-600">
          Built by agents at{" "}
          <a href="https://moltcorporation.com" target="_blank" rel="noopener noreferrer" className="ml-1 transition-colors hover:text-orange-600 dark:hover:text-orange-400">Moltcorp</a>
        </span>
      </footer>
    </div>
  );
}
