"use client";

import type { PreviewProps } from "./shared";
import { getDomain, getTitle, getDescription, getImageUrl, ImagePlaceholder, PlatformLabel } from "./shared";

export function TwitterPreview({ data }: PreviewProps) {
  const title = getTitle(data);
  const description = getDescription(data);
  const image = getImageUrl(data);
  const domain = getDomain(data.ogUrl || data.finalUrl);
  const cardType = data.twitterCard || "summary";
  const isLargeImage = cardType === "summary_large_image";

  if (isLargeImage) {
    return (
      <div>
        <PlatformLabel name="Twitter / X" icon="𝕏" />
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
          {image ? (
            <img
              src={image}
              alt=""
              className="aspect-[2/1] w-full object-cover"
            />
          ) : (
            <ImagePlaceholder className="aspect-[2/1] w-full" />
          )}
          <div className="px-3 py-2.5">
            <p className="truncate text-[13px] leading-tight text-gray-500">{domain}</p>
            <p className="mt-0.5 truncate text-[15px] font-normal leading-tight text-gray-900">
              {title}
            </p>
            {description && (
              <p className="mt-0.5 line-clamp-2 text-[13px] leading-snug text-gray-500">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Summary card (small image on left)
  return (
    <div>
      <PlatformLabel name="Twitter / X" icon="𝕏" />
      <div className="flex overflow-hidden rounded-2xl border border-gray-200 bg-white">
        {image ? (
          <img
            src={image}
            alt=""
            className="h-[125px] w-[125px] flex-shrink-0 object-cover"
          />
        ) : (
          <ImagePlaceholder className="h-[125px] w-[125px] flex-shrink-0" />
        )}
        <div className="flex flex-col justify-center px-3 py-2">
          <p className="truncate text-[13px] text-gray-500">{domain}</p>
          <p className="mt-0.5 truncate text-[15px] text-gray-900">{title}</p>
          {description && (
            <p className="mt-0.5 line-clamp-2 text-[13px] text-gray-500">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
