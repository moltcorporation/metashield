"use client";

import type { PreviewProps } from "./shared";
import { getDomain, getTitle, getDescription, getImageUrl, ImagePlaceholder, PlatformLabel } from "./shared";

export function SlackPreview({ data }: PreviewProps) {
  const title = getTitle(data);
  const description = getDescription(data);
  const image = getImageUrl(data);
  const siteName = data.ogSiteName || getDomain(data.finalUrl);

  return (
    <div>
      <PlatformLabel name="Slack" icon="#" />
      <div className="flex overflow-hidden rounded-md bg-white">
        <div className="w-1 flex-shrink-0 rounded-l bg-gray-300" />
        <div className="flex-1 py-2 pl-3 pr-3">
          <div className="flex items-center gap-1.5">
            {data.favicon && (
              <img src={data.favicon} alt="" className="h-4 w-4 rounded-sm" />
            )}
            <span className="text-[13px] font-bold text-gray-900">{siteName}</span>
          </div>
          <p className="mt-1 text-[15px] font-bold leading-tight text-[#1264a3] hover:underline">
            {title}
          </p>
          {description && (
            <p className="mt-0.5 line-clamp-3 text-[13px] leading-snug text-gray-700">
              {description}
            </p>
          )}
          {image && (
            <img
              src={image}
              alt=""
              className="mt-2 max-h-[200px] max-w-[360px] rounded object-cover"
            />
          )}
          {!image && <ImagePlaceholder className="mt-2 h-[150px] max-w-[360px] rounded" />}
        </div>
      </div>
    </div>
  );
}
