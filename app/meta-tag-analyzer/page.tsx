"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function MetaTagAnalyzer() {
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
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black">
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

      <main className="flex flex-1 flex-col items-center px-4 pb-16 pt-12">
        <div className="flex w-full max-w-xl flex-col items-center gap-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-black sm:text-5xl dark:text-white">
            Meta Tag Analyzer
          </h1>
          <p className="max-w-md text-lg text-zinc-500 dark:text-zinc-400">
            Analyze all your meta tags in one place. Check title, description,
            Open Graph, Twitter Cards, structured data, and more.
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
                className="flex-1 rounded-lg border border-zinc-300 bg-white px-4 py-3 text-base text-black placeholder-zinc-400 outline-none transition-colors focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:placeholder-zinc-600 dark:focus:border-zinc-500 dark:focus:ring-zinc-800"
              />
              <button
                type="submit"
                disabled={loading || !url.trim()}
                className="rounded-lg bg-black px-6 py-3 text-base font-medium text-white transition-colors hover:bg-zinc-800 disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
              >
                {loading ? "Analyzing..." : "Analyze"}
              </button>
            </div>

            {error && (
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            )}

            {rateLimited && (
              <div className="flex flex-col items-center gap-2 rounded-lg border border-zinc-300 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-900">
                <p className="text-sm font-medium text-black dark:text-white">
                  You&apos;ve used all 5 free scans for today.
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Upgrade to Pro for unlimited scans — no waiting.
                </p>
                <a
                  href="/pricing"
                  className="inline-flex items-center gap-2 rounded-lg bg-black px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                >
                  Upgrade to Pro — $5/mo
                  <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            )}
          </form>

          {loading && (
            <div className="flex items-center gap-3">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-300 border-t-black dark:border-zinc-600 dark:border-t-white" />
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Analyzing meta tags...
              </p>
            </div>
          )}
        </div>

        {!loading && (
          <div className="mt-16 flex w-full max-w-2xl flex-col gap-8">
            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-black dark:text-white">
                What are meta tags?
              </h2>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                Meta tags are HTML elements that provide metadata about your web
                page. They live in the <strong>&lt;head&gt;</strong> section of
                your HTML and tell search engines, social platforms, and browsers
                how to interpret and display your content. The most important
                meta tags include <strong>title</strong>,{" "}
                <strong>description</strong>, <strong>Open Graph tags</strong>{" "}
                (og:title, og:image), and{" "}
                <strong>Twitter Card tags</strong> (twitter:card,
                twitter:image).
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-black dark:text-white">
                Why analyze your meta tags?
              </h2>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                Broken or missing meta tags hurt your site in two ways. First,
                search engines may not understand your content, leading to lower
                rankings and less traffic. Second, when people share your links
                on social media, the preview cards may show wrong titles, missing
                images, or generic descriptions — killing click-through rates.
                Regular meta tag analysis catches these issues before they cost
                you traffic.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-black dark:text-white">
                What does MetaShield analyze?
              </h2>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                MetaShield performs a comprehensive analysis of your page&apos;s
                meta tags across four categories:{" "}
                <strong>Essentials</strong> (title, description, canonical URL,
                viewport), <strong>Social</strong> (Open Graph and Twitter Card
                tags), <strong>Technical</strong> (charset, favicon, robots,
                JSON-LD structured data), and <strong>Quality</strong> (image
                dimensions, text length, duplicate detection). You get a score
                out of 100, platform previews showing how your link looks on 6
                platforms, and copy-paste HTML fixes for every issue found.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-black dark:text-white">
                How often should I check my meta tags?
              </h2>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                Check your meta tags after every deploy and whenever you change
                page titles, descriptions, or images. CMS updates, theme
                changes, and plugin updates can silently break meta tags.
                Marketing teams should check before any major campaign or social
                media push. A broken og:image on a viral post means thousands of
                shares with no preview image — that&apos;s traffic left on the
                table.
              </p>
            </div>
          </div>
        )}
      </main>

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
