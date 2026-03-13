import type { Metadata } from "next";

const baseUrl = "https://metashield-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title:
    "LinkedIn Post Preview Checker — See How Your Links Look | MetaShield",
  description:
    "Check how your links appear when shared on LinkedIn. Validate og:title, og:description, og:image tags. Free, instant, no login required.",
  alternates: {
    canonical: `${baseUrl}/linkedin-post-preview`,
  },
  openGraph: {
    title:
      "LinkedIn Post Preview Checker — See How Your Links Look | MetaShield",
    description:
      "Check how your links appear when shared on LinkedIn. Validate og:title, og:description, og:image and get fix suggestions.",
    type: "website",
    siteName: "MetaShield",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "LinkedIn Post Preview Checker — See How Your Links Look | MetaShield",
    description:
      "Check how your links appear when shared on LinkedIn. Validate og:title, og:description, og:image and get fix suggestions.",
  },
};

const faqs = [
  {
    question: "What tags does LinkedIn use for link previews?",
    answer:
      "LinkedIn uses Open Graph (OG) meta tags to generate link previews. The three essential tags are og:title, og:description, and og:image. When someone shares a URL on LinkedIn, the platform fetches these tags to build the preview card that appears in the feed. Without them, LinkedIn may show a blank card or pull random text from the page.",
  },
  {
    question: "What is the recommended og:image size for LinkedIn?",
    answer:
      "LinkedIn recommends an og:image size of 1200 x 627 pixels with a 1.91:1 aspect ratio. Images must be at least 200 x 200 pixels to appear at all, but images smaller than 400 pixels wide will render as a small thumbnail instead of a large preview card. For the best results, always use a high-quality image at 1200 x 627px and keep the file size under 5MB.",
  },
  {
    question: "How do I check my LinkedIn link preview?",
    answer:
      "Paste your URL into MetaShield's LinkedIn Post Preview Checker and click Check. MetaShield will fetch your page, extract all Open Graph and meta tags, and show you exactly how your link will appear on LinkedIn — along with Twitter/X, Facebook, Slack, Discord, and Google. You get a scored report out of 100 with copy-paste HTML fixes for any issues found.",
  },
  {
    question: "What Open Graph tags does LinkedIn require?",
    answer:
      "LinkedIn requires og:title (up to 150 characters, though 60-70 is ideal), og:description (up to 300 characters, aim for 155), and og:image (1200x627px recommended). Optional but recommended tags include og:type (usually article or website), og:url (the canonical URL of the page), and og:site_name. LinkedIn does not use Twitter Card tags — it relies entirely on Open Graph meta tags.",
  },
  {
    question: "How do I force LinkedIn to refresh a link preview?",
    answer:
      "LinkedIn caches link previews aggressively. To force a refresh after updating your OG tags, use the LinkedIn Post Inspector tool at linkedin.com/post-inspector. Paste your URL there and click Inspect — this forces LinkedIn to re-fetch your page and update the cached preview. Use MetaShield first to validate your tags are correct, then use the Post Inspector to clear the cache.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "LinkedIn Post Preview Checker — MetaShield",
    description:
      "Check how your links appear when shared on LinkedIn. Validate og:title, og:description, og:image tags and get fix suggestions.",
    url: `${baseUrl}/linkedin-post-preview`,
    mainEntity: {
      "@type": "SoftwareApplication",
      name: "MetaShield",
      url: baseUrl,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Any",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
