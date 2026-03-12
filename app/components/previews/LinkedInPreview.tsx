"use client";

import type { PreviewProps } from "./shared";
import { getDomain, getTitle, getImageUrl, ImagePlaceholder, PlatformLabel } from "./shared";

export function LinkedInPreview({ data }: PreviewProps) {
  const title = getTitle(data);
  const image = getImageUrl(data);
  const domain = getDomain(data.ogUrl || data.finalUrl);

  return (
    <div>
      <PlatformLabel name="LinkedIn" icon="in" />
      <div className="overflow-hidden rounded-sm border border-gray-300 bg-white">
        {image ? (
          <img
            src={image}
            alt=""
            className="aspect-[1.91/1] w-full object-cover"
          />
        ) : (
          <ImagePlaceholder className="aspect-[1.91/1] w-full" />
        )}
        <div className="border-t border-gray-200 bg-[#f3f6f8] px-3 py-2.5">
          <p className="line-clamp-2 text-[14px] font-semibold leading-tight text-[#000000e6]">
            {title}
          </p>
          <p className="mt-0.5 text-[12px] text-[#00000099]">{domain}</p>
        </div>
      </div>
    </div>
  );
}
