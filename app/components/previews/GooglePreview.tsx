"use client";

import type { PreviewProps } from "./shared";
import { getDomain, PlatformLabel } from "./shared";

export function GooglePreview({ data }: PreviewProps) {
  const title = data.title || data.ogTitle || "Untitled";
  const description = data.description || data.ogDescription || "";
  const url = data.canonicalUrl || data.ogUrl || data.finalUrl;
  const domain = getDomain(url);
  const favicon = data.favicon;

  // Build breadcrumb-style URL display
  const urlParts = url.replace(/^https?:\/\//, "").split("/").filter(Boolean);
  const breadcrumb = urlParts.length > 1
    ? `${urlParts[0]} › ${urlParts.slice(1).join(" › ")}`
    : urlParts[0] || domain;

  return (
    <div>
      <PlatformLabel name="Google Search" icon="G" />
      <div className="max-w-[600px] font-[arial,sans-serif]">
        <div className="flex items-center gap-2">
          <div className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-gray-100">
            {favicon ? (
              <img src={favicon} alt="" className="h-[18px] w-[18px] rounded-sm" />
            ) : (
              <span className="text-[12px] font-bold text-gray-400">
                {domain.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <div>
            <p className="text-[14px] leading-tight text-[#202124]">{domain}</p>
            <p className="text-[12px] leading-tight text-[#4d5156]">{breadcrumb}</p>
          </div>
        </div>
        <h3 className="mt-1 text-[20px] leading-[1.3] text-[#1a0dab] hover:underline">
          {title.length > 60 ? title.substring(0, 60) + "..." : title}
        </h3>
        {description && (
          <p className="mt-0.5 line-clamp-2 text-[14px] leading-[1.58] text-[#4d5156]">
            {description.length > 160 ? description.substring(0, 160) + "..." : description}
          </p>
        )}
      </div>
    </div>
  );
}
