import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { db } from "@/db";
import { reports } from "@/db/schema";
import { fetchAndParseMeta } from "@/lib/parser";
import { scoreMetaData } from "@/lib/scoring";

export async function POST(request: NextRequest) {
  let body: { url?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { url } = body;
  if (!url || typeof url !== "string") {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  if (url.length > 2048) {
    return NextResponse.json(
      { error: "URL is too long (max 2048 characters)" },
      { status: 400 }
    );
  }

  // Hash the client IP for rate limiting (never store raw IP)
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "unknown";
  const ipHash = createHash("sha256").update(ip).digest("hex");

  // Fetch and parse the URL
  const parseResult = await fetchAndParseMeta(url);
  if (!parseResult.success) {
    return NextResponse.json({ error: parseResult.error }, { status: 422 });
  }

  // Score the meta data
  const scoringResult = scoreMetaData(parseResult.data);

  // Store in database
  const [report] = await db
    .insert(reports)
    .values({
      url: parseResult.data.finalUrl,
      score: scoringResult.score,
      metaData: parseResult.data,
      issues: scoringResult,
      ipHash,
    })
    .returning({ id: reports.id });

  return NextResponse.json({ id: report.id, score: scoringResult.score });
}
