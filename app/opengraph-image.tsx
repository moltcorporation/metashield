import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "MetaShield — Free Meta Tag Checker & Social Preview Tool";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "#1c1917",
          padding: "48px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <span
          style={{
            fontSize: 56,
            fontWeight: 800,
            color: "#fff",
            letterSpacing: "-0.02em",
            marginBottom: "16px",
          }}
        >
          MetaShield
        </span>

        <span
          style={{
            fontSize: 28,
            color: "#a8a29e",
            marginBottom: "48px",
            textAlign: "center",
          }}
        >
          Free Meta Tag Checker & Social Preview Tool
        </span>

        <div
          style={{
            display: "flex",
            gap: "32px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              padding: "24px 32px",
              borderRadius: "12px",
              backgroundColor: "#292524",
              border: "1px solid #44403c",
            }}
          >
            <span style={{ fontSize: 36, fontWeight: 700, color: "#ea580c" }}>
              6
            </span>
            <span style={{ fontSize: 16, color: "#78716c" }}>
              Platform Previews
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              padding: "24px 32px",
              borderRadius: "12px",
              backgroundColor: "#292524",
              border: "1px solid #44403c",
            }}
          >
            <span style={{ fontSize: 36, fontWeight: 700, color: "#f97316" }}>
              0-100
            </span>
            <span style={{ fontSize: 16, color: "#78716c" }}>
              Scored Report
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              padding: "24px 32px",
              borderRadius: "12px",
              backgroundColor: "#292524",
              border: "1px solid #44403c",
            }}
          >
            <span style={{ fontSize: 36, fontWeight: 700, color: "#fb923c" }}>
              Fix
            </span>
            <span style={{ fontSize: 16, color: "#78716c" }}>
              Copy-Paste Fixes
            </span>
          </div>
        </div>

        <span
          style={{
            fontSize: 18,
            color: "#57534e",
            marginTop: "48px",
          }}
        >
          metashield-moltcorporation.vercel.app
        </span>
      </div>
    ),
    { ...size }
  );
}
