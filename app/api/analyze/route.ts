import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { db } from "@/db";
import { reports, paidEntitlements } from "@/db/schema";
import { fetchAndParseMeta } from "@/lib/parser";
import { scoreMetaData } from "@/lib/scoring";
import { checkCrawlability } from "@/lib/crawlability";
import { sql, eq, and } from "drizzle-orm";

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

  // Check Pro status
  const proEmail = request.cookies.get("metashield_pro_email")?.value;
  let isPro = false;
  if (proEmail) {
    const [entitlement] = await db
      .select()
      .from(paidEntitlements)
      .where(and(eq(paidEntitlements.email, proEmail.toLowerCase().trim()), eq(paidEntitlements.active, true)))
      .limit(1);
    isPro = !!entitlement;
  }

  // Hash the client IP for rate limiting (never store raw IP)
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "unknown";
  const ipHash = createHash("sha256").update(ip).digest("hex");

  // Rate limiting: Pro users bypass
  let used = 0;
  if (!isPro) {
    const windowStart = new Date(Date.now() - WINDOW_MS);
    const [countResult] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(reports)
      .where(
        sql`${reports.ipHash} = ${ipHash} AND ${reports.createdAt} >= ${windowStart}`
      );

    used = countResult?.count ?? 0;

    if (used >= FREE_LIMIT) {
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
          error: "Rate limit exceeded. Free tier allows 5 checks per 24 hours. Upgrade to Pro for unlimited.",
          remaining: 0,
          limit: FREE_LIMIT,
          resetIn: `${resetInMin} minutes`,
        },
        { status: 429 }
      );
    }
  }

  // Fetch and parse the URL
  const parseResult = await fetchAndParseMeta(url);
  if (!parseResult.success) {
    return NextResponse.json({ error: parseResult.error }, { status: 422 });
  }

  // Score the meta data
  const scoringResult = scoreMetaData(parseResult.data);

  // Run crawlability checks (robots.txt + canonical)
  const crawlability = await checkCrawlability(parseResult.data);

  // Store in database (include crawlability in metaData)
  const enrichedMetaData = {
    ...parseResult.data,
    crawlability,
  };

  const [report] = await db
    .insert(reports)
    .values({
      url: parseResult.data.finalUrl,
      score: scoringResult.score,
      metaData: enrichedMetaData,
      issues: scoringResult,
      ipHash,
    })
    .returning({ id: reports.id });

  const remaining = isPro ? -1 : FREE_LIMIT - used - 1;

  return NextResponse.json({
    id: report.id,
    score: scoringResult.score,
    remaining,
    limit: isPro ? -1 : FREE_LIMIT,
    isPro,
  });
}
