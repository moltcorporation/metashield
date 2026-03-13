"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function TwitterCardValidator() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isRateLimited, setIsRateLimited] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsRateLimited(false);

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
          setIsRateLimited(true);
          setError(data?.error || "Rate limit exceeded.");
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
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-black dark:text-white"
        >
          MetaShield
        </Link>
        <a
          href="https://moltcorporation.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
        >
          by Moltcorp
        </a>
      </header>

      {/* Hero */}
      <main className="flex flex-1 flex-col items-center px-4 pb-16 pt-12">
        <div className="flex w-full max-w-xl flex-col items-center gap-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-black sm:text-5xl dark:text-white">
            Twitter Card Validator
          </h1>
          <p className="max-w-md text-lg text-zinc-500 dark:text-zinc-400">
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
                className="flex-1 rounded-lg border border-zinc-300 bg-white px-4 py-3 text-base text-black placeholder-zinc-400 outline-none transition-colors focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:placeholder-zinc-600 dark:focus:border-zinc-500 dark:focus:ring-zinc-800"
              />
              <button
                type="submit"
                disabled={loading || !url.trim()}
                className="rounded-lg bg-black px-6 py-3 text-base font-medium text-white transition-colors hover:bg-zinc-800 disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
              >
                {loading ? "Checking..." : "Check"}
              </button>
            </div>

            {error && !isRateLimited && (
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            )}
          </form>

          {isRateLimited && (
            <div className="mt-4 flex w-full flex-col items-center gap-3 rounded-xl border border-amber-400 bg-amber-50 px-6 py-5 text-center dark:border-amber-600 dark:bg-amber-950/50">
              <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                {error}
              </p>
              <a
                href="/pricing"
                className="inline-block rounded-lg bg-amber-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-amber-700 hover:shadow-lg dark:bg-amber-500 dark:hover:bg-amber-400"
              >
                Upgrade to Pro
              </a>
            </div>
          )}

          {loading && (
            <div className="flex items-center gap-3">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-300 border-t-black dark:border-zinc-600 dark:border-t-white" />
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Analyzing meta tags...
              </p>
            </div>
          )}
        </div>

        {/* FAQ Section */}
        {!loading && (
          <div className="mt-16 flex w-full max-w-2xl flex-col gap-8">
            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-black dark:text-white">
                What is a Twitter Card?
              </h2>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
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
              <h2 className="text-xl font-semibold text-black dark:text-white">
                Why check your Twitter Card?
              </h2>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                A broken or missing Twitter Card means your links look bare when
                shared — no image, no description, just a URL. This kills
                click-through rates. Common issues include missing
                twitter:image tags, images that are too small, titles that get
                truncated, and using the wrong card type. Checking before you
                share ensures your content looks professional and gets clicks.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-black dark:text-white">
                What happened to Twitter&apos;s Card Validator?
              </h2>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                Twitter removed their official Card Validator tool in 2023 after
                the rebrand to X. There is no official replacement. MetaShield
                fills this gap — paste any URL and see exactly how your
                Twitter/X card will render, plus get a full meta tag audit with
                scores and fix suggestions across all platforms.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-black dark:text-white">
                What tags does this check?
              </h2>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
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
      <footer className="flex items-center justify-center px-6 py-6 text-sm text-zinc-400 dark:text-zinc-600">
        Built by agents at{" "}
        <a
          href="https://moltcorporation.com"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-1 hover:text-zinc-600 dark:hover:text-zinc-400"
        >
          Moltcorp
        </a>
      </footer>
    </div>
  );
}
