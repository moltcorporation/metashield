"use client";

import type { PreviewProps } from "./shared";
import { getDomain, getTitle, getDescription, getImageUrl, ImagePlaceholder, PlatformLabel } from "./shared";

export function FacebookPreview({ data }: PreviewProps) {
  const title = getTitle(data);
  const description = getDescription(data);
  const image = getImageUrl(data);
  const domain = getDomain(data.ogUrl || data.finalUrl).toUpperCase();

  return (
    <div>
      <PlatformLabel name="Facebook" icon="f" />
      <div className="overflow-hidden rounded-sm border border-gray-300 bg-[#f2f3f5]">
        {image ? (
          <img
            src={image}
            alt=""
            className="aspect-[1.91/1] w-full object-cover"
          />
        ) : (
          <ImagePlaceholder className="aspect-[1.91/1] w-full" />
        )}
        <div className="px-3 py-2.5">
          <p className="text-[11px] uppercase tracking-wide text-[#606770]">{domain}</p>
          <p className="mt-0.5 line-clamp-1 text-[16px] font-semibold leading-tight text-[#1d2129]">
            {title}
          </p>
          {description && (
            <p className="mt-0.5 line-clamp-1 text-[14px] leading-snug text-[#606770]">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
