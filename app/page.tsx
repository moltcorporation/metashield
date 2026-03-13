"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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

function SampleScoreBadge() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-orange-100 bg-white p-6 dark:border-orange-900/30 dark:bg-stone-900">
      <p className="text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500">
        Sample Report
      </p>
      <div className="flex h-24 w-24 flex-col items-center justify-center rounded-2xl bg-emerald-50 ring-2 ring-emerald-200 dark:bg-emerald-950/50 dark:ring-emerald-900">
        <span className="text-3xl font-extrabold tabular-nums text-emerald-600 dark:text-emerald-400">92</span>
        <span className="text-xs font-medium text-stone-500 dark:text-stone-400">/100</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <span className="text-sm font-semibold text-stone-900 dark:text-white">example.com</span>
        <div className="flex gap-2 text-xs">
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 font-medium text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">28 passed</span>
          <span className="rounded-full bg-amber-50 px-2 py-0.5 font-medium text-amber-700 dark:bg-amber-950/50 dark:text-amber-400">2 warnings</span>
          <span className="rounded-full bg-red-50 px-2 py-0.5 font-medium text-red-700 dark:bg-red-950/50 dark:text-red-400">1 failed</span>
        </div>
      </div>
      <div className="mt-1 w-full space-y-1.5">
        <div className="flex items-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50/50 px-3 py-1.5 text-xs dark:border-emerald-900/30 dark:bg-emerald-950/30">
          <span className="text-emerald-600 dark:text-emerald-400">&#10003;</span>
          <span className="text-stone-700 dark:text-stone-300">og:title present</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50/50 px-3 py-1.5 text-xs dark:border-emerald-900/30 dark:bg-emerald-950/30">
          <span className="text-emerald-600 dark:text-emerald-400">&#10003;</span>
          <span className="text-stone-700 dark:text-stone-300">twitter:card is set</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-amber-100 bg-amber-50/50 px-3 py-1.5 text-xs dark:border-amber-900/30 dark:bg-amber-950/30">
          <span className="text-amber-600 dark:text-amber-400">&#9888;</span>
          <span className="text-stone-700 dark:text-stone-300">Description could be longer</span>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rateLimited, setRateLimited] = useState(false);
  const [upgradeUrl, setUpgradeUrl] = useState("");
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
          if (data?.upgradeUrl) setUpgradeUrl(data.upgradeUrl);
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
        <div className="flex items-center gap-2">
          <EyeIcon className="h-6 w-6 text-orange-600 dark:text-orange-400" />
          <span className="text-lg font-bold tracking-tight text-stone-900 dark:text-white">
            MetaShield
          </span>
        </div>
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

      <main className="flex flex-1 flex-col items-center justify-center px-4 pb-24">
        <div className="hero-gradient flex w-full max-w-2xl flex-col items-center gap-8 rounded-2xl border border-orange-100 bg-white/60 px-6 py-16 text-center backdrop-blur-sm sm:px-12 dark:border-orange-900/30 dark:bg-stone-900/60">
          <EyeIcon className="h-16 w-16 text-orange-600 dark:text-orange-400" />

          <div className="flex flex-col gap-3">
            <h1 className="text-4xl font-extrabold tracking-tight text-stone-900 sm:text-5xl dark:text-white">
              Free Twitter Card Validator
              <span className="block text-orange-600 dark:text-orange-400">&amp; OG Image Tester</span>
            </h1>
            <p className="mx-auto max-w-lg text-base font-medium text-stone-700 dark:text-stone-300">
              Twitter killed their Card Validator. We replaced it — and made it better.
            </p>
            <p className="mx-auto max-w-md text-lg text-stone-600 dark:text-stone-400">
              Check your meta tags, Open Graph, and Twitter Cards. See exactly how
              your page appears when shared on every platform.
            </p>
          </div>

          {/* Trust signal */}
          <div className="flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 dark:border-orange-800 dark:bg-orange-950/40">
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-orange-600 dark:text-orange-400"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">1,000+ pages analyzed</span>
          </div>

          <form onSubmit={handleSubmit} className="mt-2 flex w-full max-w-lg flex-col gap-3">
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
                  Upgrade to Pro for unlimited scans — no waiting.
                </p>
                <a
                  href={upgradeUrl || "/pricing"}
                  target={upgradeUrl ? "_blank" : undefined}
                  rel={upgradeUrl ? "noopener noreferrer" : undefined}
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

        {!loading && (
          <>
            <div className="mt-12 grid w-full max-w-2xl grid-cols-1 gap-6 sm:grid-cols-3">
              {[
                { step: "1", title: "Paste your URL", desc: "Drop in any link — we take it from there." },
                { step: "2", title: "We check your meta tags", desc: "We fetch your page and analyze every Open Graph and Twitter Card tag." },
                { step: "3", title: "See your social preview score", desc: "Get a score out of 100 with previews for every major platform." },
              ].map((s) => (
                <div key={s.step} className="flex flex-col items-center gap-2 rounded-xl border border-orange-100 bg-orange-50/50 p-5 text-center dark:border-orange-900/50 dark:bg-orange-950/30">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-600 text-sm font-bold text-white dark:bg-orange-500">{s.step}</span>
                  <h3 className="text-sm font-semibold text-stone-900 dark:text-white">{s.title}</h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400">{s.desc}</p>
                </div>
              ))}
            </div>

            {/* Sample report card */}
            <div className="mt-12 w-full max-w-sm">
              <SampleScoreBadge />
            </div>

            <div className="mt-12 grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex flex-col gap-2 rounded-2xl border border-orange-100 bg-white p-5 dark:border-orange-900/30 dark:bg-stone-900">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-400">
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/></svg>
              </div>
              <h3 className="font-semibold text-stone-900 dark:text-white">
                Platform Previews
              </h3>
              <p className="text-sm text-stone-500 dark:text-stone-400">
                See how your link looks on Twitter/X, LinkedIn, Facebook, Slack,
                Discord, and Google.
              </p>
            </div>
            <div className="flex flex-col gap-2 rounded-2xl border border-orange-100 bg-white p-5 dark:border-orange-900/30 dark:bg-stone-900">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-400">
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
              </div>
              <h3 className="font-semibold text-stone-900 dark:text-white">
                Scored Analysis
              </h3>
              <p className="text-sm text-stone-500 dark:text-stone-400">
                Get a 0-100 score across 30+ rules covering essentials, social
                tags, technical SEO, and quality.
              </p>
            </div>
            <div className="flex flex-col gap-2 rounded-2xl border border-orange-100 bg-white p-5 dark:border-orange-900/30 dark:bg-stone-900">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-400">
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z"/><path d="M3 5a2 2 0 012-2 3 3 0 003 3h4a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H6zm3 0a1 1 0 000 2h4a1 1 0 100-2H9zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H6zm3 0a1 1 0 100 2h4a1 1 0 100-2H9z"/></svg>
              </div>
              <h3 className="font-semibold text-stone-900 dark:text-white">
                Copy-Paste Fixes
              </h3>
              <p className="text-sm text-stone-500 dark:text-stone-400">
                Every issue comes with the exact HTML tag you need. Copy, paste
                into your code, done.
              </p>
            </div>
          </div>
          </>
        )}
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
          <a href="/suite" className="font-semibold transition-colors hover:text-orange-600 dark:hover:text-orange-400">Website Health Check &rarr;</a>
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
          <a href="https://moltcorporation.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-orange-600 dark:hover:text-orange-400">Moltcorp</a>
        </span>
      </footer>
    </div>
  );
}
