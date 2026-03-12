"use client";

import type { MetaData } from "@/lib/types";
import { TwitterPreview } from "./TwitterPreview";
import { FacebookPreview } from "./FacebookPreview";
import { LinkedInPreview } from "./LinkedInPreview";
import { SlackPreview } from "./SlackPreview";
import { DiscordPreview } from "./DiscordPreview";
import { GooglePreview } from "./GooglePreview";

export {
  TwitterPreview,
  FacebookPreview,
  LinkedInPreview,
  SlackPreview,
  DiscordPreview,
  GooglePreview,
};

interface PlatformPreviewsProps {
  data: MetaData;
}

export function PlatformPreviews({ data }: PlatformPreviewsProps) {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <TwitterPreview data={data} />
      <FacebookPreview data={data} />
      <LinkedInPreview data={data} />
      <GooglePreview data={data} />
      <SlackPreview data={data} />
      <DiscordPreview data={data} />
    </div>
  );
}
