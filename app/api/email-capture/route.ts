import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { emailCaptures } from "@/db/schema";

export async function POST(request: NextRequest) {
  let body: { email?: string; reportId?: string; reportUrl?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { email, reportId, reportUrl } = body;

  if (!email || typeof email !== "string") {
    return NextResponse.json(
      { error: "Email is required" },
      { status: 400 }
    );
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { error: "Invalid email address" },
      { status: 400 }
    );
  }

  if (!reportId || typeof reportId !== "string") {
    return NextResponse.json(
      { error: "Report ID is required" },
      { status: 400 }
    );
  }

  if (!reportUrl || typeof reportUrl !== "string") {
    return NextResponse.json(
      { error: "Report URL is required" },
      { status: 400 }
    );
  }

  try {
    await db.insert(emailCaptures).values({
      email: email.toLowerCase().trim(),
      reportId,
      reportUrl,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to save email capture:", error);
    return NextResponse.json(
      { error: "Failed to save email" },
      { status: 500 }
    );
  }
}
