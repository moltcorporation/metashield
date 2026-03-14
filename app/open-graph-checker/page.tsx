"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function OpenGraphChecker() {
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

      <main className="flex flex-1 flex-col items-center px-4 pb-16 pt-12">
        <div className="flex w-full max-w-xl flex-col items-center gap-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl dark:text-white">
            Open Graph
            <span className="block text-orange-600 dark:text-orange-400">Checker</span>
          </h1>
          <p className="max-w-md text-lg text-stone-600 dark:text-stone-400">
            Check your Open Graph tags and see how your links appear on
            Facebook, LinkedIn, Slack, Discord, and more.
          </p>

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
                Analyzing Open Graph tags...
              </p>
            </div>
          )}
        </div>

        {!loading && (
          <div className="mt-16 flex w-full max-w-2xl flex-col gap-8">
            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-stone-900 dark:text-white">
                What are Open Graph tags?
              </h2>
              <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                Open Graph (OG) tags are meta tags that control how your links
                appear when shared on social platforms. Originally created by
                Facebook, they are now used by LinkedIn, Slack, Discord,
                WhatsApp, Telegram, and many other apps. The most important tags
                are <strong>og:title</strong>, <strong>og:description</strong>,
                and <strong>og:image</strong> — these determine the preview card
                people see when your link is shared.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-stone-900 dark:text-white">
                Why check your Open Graph tags?
              </h2>
              <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                Broken or missing OG tags mean your links look bare when shared
                — no image, wrong title, or a generic description. This hurts
                click-through rates and makes your content look unprofessional.
                Common issues include missing og:image tags, images that are too
                small (should be 1200x630px), titles that get truncated, and
                duplicate or conflicting tags. Checking before you share ensures
                your content looks great everywhere.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-stone-900 dark:text-white">
                What does MetaShield check?
              </h2>
              <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                MetaShield validates all Open Graph tags including og:title,
                og:description, og:image, og:type, og:url, and og:site_name. It
                also checks Twitter Card tags, basic SEO meta tags (title,
                description, canonical URL), technical tags (charset, viewport,
                robots), and JSON-LD structured data. You get a scored report
                out of 100, platform previews for 6 platforms, and copy-paste
                HTML fixes for every issue found.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-stone-900 dark:text-white">
                What is the ideal og:image size?
              </h2>
              <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                The recommended og:image size is <strong>1200 x 630 pixels</strong>{" "}
                with a 1.91:1 aspect ratio. This size works well across
                Facebook, LinkedIn, Slack, and Discord. Images smaller than
                600x315px may not display as a large preview card on some
                platforms. Always use absolute URLs for og:image (starting with
                https://) and ensure the image file is under 8MB.
              </p>
            </div>
          </div>
        )}
      </main>

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
