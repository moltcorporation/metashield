import Link from "next/link";

const STRIPE_LINK = "https://buy.stripe.com/test_6oU14n6q96nFeKz21S2ZO09";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    features: [
      "10 scans per day",
      "Full meta tag analysis",
      "Social preview cards",
      "Shareable report link",
    ],
    cta: "Get started",
    ctaHref: "/",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$5",
    period: "/month",
    features: [
      "Unlimited scans",
      "Full meta tag analysis",
      "Social preview cards",
      "Shareable report link",
      "Batch URL scanning",
      "Export reports",
    ],
    cta: "Upgrade to Pro",
    ctaHref: STRIPE_LINK,
    highlight: true,
  },
];

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-4 py-16 font-sans">
      <div className="mb-12 text-center">
        <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-300">
          &larr; MetaShield
        </Link>
        <h1 className="mt-4 text-4xl font-bold text-white">Pricing</h1>
        <p className="mt-2 text-lg text-zinc-400">
          Shield your metadata. Simple pricing.
        </p>
      </div>
      <div className="grid w-full max-w-3xl gap-6 md:grid-cols-2">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`flex flex-col rounded-xl border p-8 ${
              plan.highlight
                ? "border-amber-500 bg-zinc-900 shadow-lg shadow-amber-500/10"
                : "border-zinc-800 bg-zinc-900"
            }`}
          >
            <h2 className="text-xl font-bold text-white">{plan.name}</h2>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-bold text-white">{plan.price}</span>
              <span className="text-zinc-400">{plan.period}</span>
            </div>
            <ul className="mt-6 flex-1 space-y-3">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-zinc-400">
                  <span className="mt-0.5 text-amber-500">&#10003;</span>
                  {f}
                </li>
              ))}
            </ul>
            <a
              href={plan.ctaHref}
              className={`mt-8 block rounded-lg py-3 text-center text-base font-medium transition-colors ${
                plan.highlight
                  ? "bg-amber-600 text-white hover:bg-amber-500"
                  : "border border-zinc-700 text-white hover:bg-zinc-800"
              }`}
            >
              {plan.cta}
            </a>
          </div>
        ))}
      </div>

      <footer className="mt-16 flex flex-col items-center gap-3 px-6 py-6">
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-zinc-400">
          <span className="font-medium">Moltcorp Suite:</span>
          <span className="font-semibold text-orange-400">MetaShield</span>
          <a href="https://headerguard-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-orange-400">HeaderGuard</a>
          <a href="https://dns-lookup-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-orange-400">DNS Lookup</a>
          <a href="https://ssl-certificate-checker-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-orange-400">SSL Checker</a>
          <a href="https://statusping-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-orange-400">StatusPing</a>
          <a href="https://whois-lookup-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-orange-400">WHOIS Lookup</a>
        </div>
        <span className="text-xs text-zinc-500">
          Built by agents at{" "}
          <a href="https://moltcorporation.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-orange-400">Moltcorp</a>
        </span>
      </footer>
    </div>
  );
}
