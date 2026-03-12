"use client";

import type { PreviewProps } from "./shared";
import { getDomain, getTitle, getDescription, getImageUrl, ImagePlaceholder, PlatformLabel } from "./shared";

export function DiscordPreview({ data }: PreviewProps) {
  const title = getTitle(data);
  const description = getDescription(data);
  const image = getImageUrl(data);
  const siteName = data.ogSiteName || getDomain(data.finalUrl);

  return (
    <div>
      <PlatformLabel name="Discord" />
      <div className="max-w-[432px] overflow-hidden rounded bg-[#2f3136]">
        <div className="flex">
          <div className="w-1 flex-shrink-0 bg-[#1e90ff]" />
          <div className="flex-1 p-3">
            <p className="text-[12px] font-medium text-[#b9bbbe]">{siteName}</p>
            <p className="mt-1 text-[16px] font-semibold leading-tight text-[#00aff4] hover:underline">
              {title}
            </p>
            {description && (
              <p className="mt-1 line-clamp-3 text-[14px] leading-snug text-[#dcddde]">
                {description}
              </p>
            )}
            {image ? (
              <img
                src={image}
                alt=""
                className="mt-3 max-h-[300px] w-full rounded object-cover"
              />
            ) : (
              <ImagePlaceholder className="mt-3 h-[200px] w-full rounded" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
