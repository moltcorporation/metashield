"use client";

import { useState } from "react";

export function ShareButtons({
  score,
  reportUrl,
}: {
  score: number;
  reportUrl: string;
}) {
  const [copied, setCopied] = useState(false);

  const tweetText = `My site scored ${score}/100 on MetaShield's meta tag check! Check yours:`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(reportUrl)}`;

  async function copyLink() {
    await navigator.clipboard.writeText(reportUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-orange-100 bg-white p-4 dark:border-orange-900/30 dark:bg-stone-900">
      <span className="text-sm font-semibold text-stone-900 dark:text-white">
        Share your score
      </span>
      <div className="flex gap-3">
        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-orange-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-400"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4 fill-current"
            aria-hidden="true"
          >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          Share on X
        </a>
        <button
          onClick={copyLink}
          className="inline-flex items-center gap-2 rounded-xl border border-orange-200 px-4 py-2 text-sm font-medium text-stone-900 transition-all hover:border-orange-400 hover:bg-orange-50 dark:border-orange-800 dark:text-white dark:hover:border-orange-600 dark:hover:bg-orange-950/30"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4 fill-none stroke-current"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          {copied ? "Copied!" : "Copy link"}
        </button>
      </div>
    </div>
  );
}
