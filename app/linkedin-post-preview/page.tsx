"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LinkedInPostPreview() {
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
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lg font-bold tracking-tight text-stone-900 dark:text-white">
            MetaShield
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <a
            href="/pricing"
            className="text-sm font-medium text-stone-600 transition-colors hover:text-orange-600 dark:text-stone-400 dark:hover:text-orange-400"
          >
            Pricing
          </a>
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
          <h1 className="text-4xl font-extrabold tracking-tight text-stone-900 sm:text-5xl dark:text-white">
            LinkedIn Post Preview
            <span className="block text-orange-600 dark:text-orange-400">
              Checker
            </span>
          </h1>
          <p className="max-w-md text-lg text-stone-600 dark:text-stone-400">
            See exactly how your link will look when shared on LinkedIn. Check
            your Open Graph tags and fix issues before you post.
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
              <div className="flex flex-col items-center gap-3 rounded-xl border border-orange-300 bg-orange-50 p-4 dark:border-orange-700 dark:bg-orange-950/40">
                <p className="text-sm font-medium text-stone-800 dark:text-stone-200">
                  You&apos;ve used all 5 free scans for today.
                </p>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Upgrade to Pro for unlimited scans &mdash; no waiting.
                </p>
                <a
                  href="/pricing"
                  className="inline-flex items-center gap-2 rounded-xl bg-orange-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-orange-200 transition-all hover:bg-orange-700 hover:shadow-orange-300 dark:bg-orange-500 dark:shadow-orange-950/50 dark:hover:bg-orange-400"
                >
                  Upgrade to Pro &mdash; $5/mo
                  <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            )}
          </form>

          {loading && (
            <div className="flex items-center gap-3">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-orange-200 border-t-orange-600 dark:border-orange-800 dark:border-t-orange-400" />
              <p className="text-sm text-stone-500 dark:text-stone-400">
                Analyzing LinkedIn preview tags...
              </p>
            </div>
          )}
        </div>

        {!loading && (
          <div className="mt-16 flex w-full max-w-2xl flex-col gap-8">
            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-stone-900 dark:text-white">
                What tags does LinkedIn use for link previews?
              </h2>
              <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                LinkedIn uses Open Graph (OG) meta tags to generate link
                previews. The three essential tags are{" "}
                <strong>og:title</strong>, <strong>og:description</strong>, and{" "}
                <strong>og:image</strong>. When someone shares a URL on
                LinkedIn, the platform fetches these tags to build the preview
                card that appears in the feed. Without them, LinkedIn may show a
                blank card or pull random text from the page.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-stone-900 dark:text-white">
                What is the recommended og:image size for LinkedIn?
              </h2>
              <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                LinkedIn recommends an og:image size of{" "}
                <strong>1200 x 627 pixels</strong> with a 1.91:1 aspect ratio.
                Images must be at least 200 x 200 pixels to appear at all, but
                images smaller than 400 pixels wide will render as a small
                thumbnail instead of a large preview card. For the best
                results, always use a high-quality image at 1200 x 627px and
                keep the file size under 5MB. Use an absolute URL starting with
                https:// for the og:image value.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-stone-900 dark:text-white">
                How do I check my LinkedIn link preview?
              </h2>
              <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                Paste your URL into the checker above and click &quot;Check.&quot;
                MetaShield will fetch your page, extract all Open Graph and meta
                tags, and show you exactly how your link will appear on LinkedIn
                &mdash; along with Twitter/X, Facebook, Slack, Discord, and Google.
                You get a scored report out of 100 with copy-paste HTML fixes
                for any issues found, so you can fix problems before sharing.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-stone-900 dark:text-white">
                What Open Graph tags does LinkedIn require?
              </h2>
              <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                LinkedIn requires <strong>og:title</strong> (up to 150
                characters, though 60&ndash;70 is ideal),{" "}
                <strong>og:description</strong> (up to 300 characters, aim for
                155), and <strong>og:image</strong> (1200x627px recommended).
                Optional but recommended tags include{" "}
                <strong>og:type</strong> (usually &quot;article&quot; or
                &quot;website&quot;), <strong>og:url</strong> (the canonical URL
                of the page), and <strong>og:site_name</strong>. LinkedIn does
                not use Twitter Card tags &mdash; it relies entirely on Open Graph
                meta tags for preview rendering.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-stone-900 dark:text-white">
                How do I force LinkedIn to refresh a link preview?
              </h2>
              <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                LinkedIn caches link previews aggressively. To force a refresh
                after updating your OG tags, use the{" "}
                <a
                  href="https://www.linkedin.com/post-inspector/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-orange-600 underline hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300"
                >
                  LinkedIn Post Inspector
                </a>{" "}
                tool. Paste your URL there and click &quot;Inspect&quot; &mdash; this
                forces LinkedIn to re-fetch your page and update the cached
                preview. Use MetaShield first to validate your tags are correct,
                then use the Post Inspector to clear the cache.
              </p>
            </div>

            <div className="rounded-2xl border border-orange-200 bg-orange-50/80 p-6 text-center dark:border-orange-900/40 dark:bg-orange-950/30">
              <h2 className="text-lg font-semibold text-stone-900 dark:text-white">
                Ready to check your LinkedIn preview?
              </h2>
              <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
                Paste your URL above and get a full meta tag report in seconds.
                Free, instant, no login required.
              </p>
            </div>
          </div>
        )}
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
          <a
            href="https://dns-lookup-moltcorporation.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-orange-600 dark:hover:text-orange-400"
          >
            DNS Lookup
          </a>
          <a
            href="https://ssl-certificate-checker-moltcorporation.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-orange-600 dark:hover:text-orange-400"
          >
            SSL Checker
          </a>
          <a
            href="https://whois-lookup-moltcorporation.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-orange-600 dark:hover:text-orange-400"
          >
            WHOIS Lookup
          </a>
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
