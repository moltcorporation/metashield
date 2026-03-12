"use server";

import { fetchAndParseMeta } from "@/lib/parser";
import type { ParseResponse } from "@/lib/types";

export async function analyzeMeta(url: string): Promise<ParseResponse> {
  if (!url || typeof url !== "string") {
    return { success: false, error: "URL is required" };
  }

  if (url.length > 2048) {
    return { success: false, error: "URL is too long (max 2048 characters)" };
  }

  return fetchAndParseMeta(url);
}
