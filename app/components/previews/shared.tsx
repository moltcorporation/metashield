import type { MetaData } from "@/lib/types";

export interface PreviewProps {
  data: MetaData;
}

/** Extract display domain from a URL */
export function getDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

/** Get the best available title */
export function getTitle(data: MetaData): string {
  return data.ogTitle || data.twitterTitle || data.title || "Untitled";
}

/** Get the best available description */
export function getDescription(data: MetaData): string | null {
  return data.ogDescription || data.twitterDescription || data.description;
}

/** Get the best available image URL */
export function getImageUrl(data: MetaData): string | null {
  return data.ogImage || data.twitterImage;
}

/** Placeholder for missing images */
export function ImagePlaceholder({ className }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center bg-gray-100 text-gray-400 ${className || ""}`}
    >
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
        />
      </svg>
    </div>
  );
}

/** Platform label badge */
export function PlatformLabel({ name, icon }: { name: string; icon?: string }) {
  return (
    <div className="mb-2 flex items-center gap-1.5 text-xs font-medium text-gray-500">
      {icon && <span>{icon}</span>}
      <span>{name}</span>
    </div>
  );
}
