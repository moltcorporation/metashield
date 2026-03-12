import { ImageResponse } from "next/og";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { reports } from "@/db/schema";
import type { ScoringResult } from "@/lib/scoring";

export const runtime = "edge";
export const alt = "MetaShield Report";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function getScoreColor(score: number): string {
  if (score >= 80) return "#22c55e";
  if (score >= 50) return "#eab308";
  return "#ef4444";
}

function getGrade(score: number): string {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 50) return "D";
  return "F";
}

export default async function OGImage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [report] = await db
    .select()
    .from(reports)
    .where(eq(reports.id, id))
    .limit(1);

  if (!report) {
    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            backgroundColor: "#09090b",
            color: "#fff",
            fontSize: 48,
            fontWeight: 700,
          }}
        >
          Report not found
        </div>
      ),
      { ...size }
    );
  }

  const scoring = report.issues as unknown as ScoringResult;
  const scoreColor = getScoreColor(report.score);
  const grade = getGrade(report.score);

  // Truncate URL for display
  const displayUrl =
    report.url.length > 50 ? report.url.slice(0, 47) + "..." : report.url;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          backgroundColor: "#09090b",
          padding: "48px 56px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top: Brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                backgroundColor: "#fff",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                fontWeight: 800,
                color: "#09090b",
              }}
            >
              M
            </div>
            <span
              style={{
                fontSize: "28px",
                fontWeight: 700,
                color: "#ffffff",
                letterSpacing: "-0.02em",
              }}
            >
              MetaShield
            </span>
          </div>
          <span
            style={{
              fontSize: "18px",
              color: "#71717a",
            }}
          >
            Meta Tag Report
          </span>
        </div>

        {/* Middle: Score + URL */}
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            gap: "48px",
          }}
        >
          {/* Score circle */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "180px",
              height: "180px",
              borderRadius: "90px",
              border: `6px solid ${scoreColor}`,
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontSize: "72px",
                fontWeight: 800,
                color: scoreColor,
                lineHeight: 1,
              }}
            >
              {report.score}
            </span>
            <span
              style={{
                fontSize: "20px",
                color: "#a1a1aa",
                marginTop: "4px",
              }}
            >
              / 100
            </span>
          </div>

          {/* URL + stats */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              flex: 1,
            }}
          >
            <span
              style={{
                fontSize: "24px",
                color: "#d4d4d8",
                wordBreak: "break-all",
              }}
            >
              {displayUrl}
            </span>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span
                style={{
                  fontSize: "48px",
                  fontWeight: 800,
                  color: scoreColor,
                }}
              >
                Grade {grade}
              </span>
            </div>

            {/* Pass / Warn / Fail counts */}
            <div style={{ display: "flex", gap: "24px" }}>
              <span style={{ fontSize: "18px", color: "#22c55e" }}>
                ✓ {scoring.passCount} passed
              </span>
              <span style={{ fontSize: "18px", color: "#eab308" }}>
                ⚠ {scoring.warnCount} warnings
              </span>
              <span style={{ fontSize: "18px", color: "#ef4444" }}>
                ✗ {scoring.failCount} failed
              </span>
            </div>
          </div>
        </div>

        {/* Bottom: Category bars */}
        <div
          style={{
            display: "flex",
            gap: "24px",
          }}
        >
          {scoring.categories.map((cat) => {
            const pct =
              cat.possible > 0
                ? Math.round((cat.earned / cat.possible) * 100)
                : 0;
            return (
              <div
                key={cat.category}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                  flex: 1,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "14px",
                    color: "#a1a1aa",
                  }}
                >
                  <span>{cat.label}</span>
                  <span>
                    {cat.earned}/{cat.possible}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    height: "8px",
                    borderRadius: "4px",
                    backgroundColor: "#27272a",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${pct}%`,
                      height: "100%",
                      borderRadius: "4px",
                      backgroundColor: getScoreColor(pct),
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "16px",
          }}
        >
          <span style={{ fontSize: "16px", color: "#71717a" }}>
            Check your site's meta tags → metashield-moltcorporation.vercel.app
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
