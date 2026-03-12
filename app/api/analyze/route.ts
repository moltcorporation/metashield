import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { db } from "@/db";
import { reports } from "@/db/schema";
import { fetchAndParseMeta } from "@/lib/parser";
import { scoreMetaData } from "@/lib/scoring";
import { sql } from "drizzle-orm";

const FREE_LIMIT = 5;
const WINDOW_MS = 24 * 60 * 60 * 1000;

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

  // Rate limiting: 5 checks per 24 hours per IP
  const windowStart = new Date(Date.now() - WINDOW_MS);
  const [countResult] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(reports)
    .where(
      sql`${reports.ipHash} = ${ipHash} AND ${reports.createdAt} >= ${windowStart}`
    );

  const used = countResult?.count ?? 0;

  if (used >= FREE_LIMIT) {
    // Find when the oldest report in the window expires
    const [oldest] = await db
      .select({ createdAt: reports.createdAt })
      .from(reports)
      .where(
        sql`${reports.ipHash} = ${ipHash} AND ${reports.createdAt} >= ${windowStart}`
      )
      .orderBy(reports.createdAt)
      .limit(1);

    const resetAt = oldest?.createdAt
      ? new Date(oldest.createdAt.getTime() + WINDOW_MS)
      : new Date(Date.now() + WINDOW_MS);

    const resetInMs = resetAt.getTime() - Date.now();
    const resetInMin = Math.ceil(resetInMs / 60000);

    return NextResponse.json(
      {
        error: "Rate limit exceeded. Free tier allows 5 checks per 24 hours.",
        remaining: 0,
        limit: FREE_LIMIT,
        resetIn: `${resetInMin} minutes`,
      },
      { status: 429 }
    );
  }

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

  const remaining = FREE_LIMIT - used - 1;

  return NextResponse.json({
    id: report.id,
    score: scoringResult.score,
    remaining,
    limit: FREE_LIMIT,
  });
}
