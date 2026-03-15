"use client";

import { useState } from "react";

export function EmailCapture({
  reportId,
  reportUrl,
}: {
  reportId: string;
  reportUrl: string;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/email-capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, reportId, reportUrl }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "success") {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-orange-100 bg-white p-4 dark:border-orange-900/30 dark:bg-stone-900">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-sm text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400">
          &#10003;
        </span>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-stone-900 dark:text-white">
            Report link saved!
          </span>
          <span className="text-xs text-stone-500 dark:text-stone-400">
            We&apos;ll send the report link to your inbox.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-orange-100 bg-white p-4 dark:border-orange-900/30 dark:bg-stone-900">
      <div className="flex flex-col gap-1">
        <span className="text-sm font-semibold text-stone-900 dark:text-white">
          Save this report
        </span>
        <span className="text-xs text-stone-500 dark:text-stone-400">
          Get a link to this report in your inbox so you can reference it later.
        </span>
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 rounded-xl border border-orange-200 bg-orange-50/50 px-3 py-2 text-sm text-stone-900 placeholder:text-stone-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200 dark:border-orange-800 dark:bg-stone-800 dark:text-white dark:placeholder:text-stone-500 dark:focus:border-orange-600 dark:focus:ring-orange-900"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex items-center gap-2 rounded-xl bg-orange-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-orange-700 disabled:opacity-60 dark:bg-orange-500 dark:hover:bg-orange-400"
        >
          {status === "loading" ? (
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 fill-none stroke-current"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          )}
          Send
        </button>
      </form>
      {status === "error" && (
        <p className="text-xs text-red-600 dark:text-red-400">{errorMessage}</p>
      )}
    </div>
  );
}
