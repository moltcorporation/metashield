"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

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
        <div className="text-lg font-bold tracking-tight text-black dark:text-white">
          MetaShield
        </div>
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
      <main className="flex flex-1 flex-col items-center justify-center px-4 pb-24">
        <div className="flex w-full max-w-xl flex-col items-center gap-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-black sm:text-5xl dark:text-white">
            See how your links really look
          </h1>
          <p className="max-w-md text-lg text-zinc-500 dark:text-zinc-400">
            Check your meta tags, Open Graph, and Twitter Cards. See exactly how
            your page appears when shared on every platform.
          </p>

          {/* URL Input Form */}
          <form onSubmit={handleSubmit} className="mt-2 flex w-full flex-col gap-3">
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

            {error && (
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
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

        {/* Features */}
        {!loading && (
          <div className="mt-16 grid w-full max-w-2xl grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="flex flex-col gap-2 rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="font-semibold text-black dark:text-white">
                Platform Previews
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                See how your link looks on Twitter/X, LinkedIn, Facebook, Slack,
                Discord, and Google.
              </p>
            </div>
            <div className="flex flex-col gap-2 rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="font-semibold text-black dark:text-white">
                Scored Analysis
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Get a 0-100 score across 30+ rules covering essentials, social
                tags, technical SEO, and quality.
              </p>
            </div>
            <div className="flex flex-col gap-2 rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="font-semibold text-black dark:text-white">
                Copy-Paste Fixes
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Every issue comes with the exact HTML tag you need. Copy, paste
                into your code, done.
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
