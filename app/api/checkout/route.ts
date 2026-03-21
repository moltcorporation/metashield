import { NextRequest, NextResponse } from "next/server";
import { createCheckoutSession } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  let body: {
    email?: string;
    priceId?: string;
    successUrl?: string;
    cancelUrl?: string;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { email, priceId, successUrl, cancelUrl } = body;

  if (!email || typeof email !== "string") {
    return NextResponse.json(
      { error: "Email is required" },
      { status: 400 }
    );
  }

  if (!priceId || typeof priceId !== "string") {
    return NextResponse.json(
      { error: "Price ID is required" },
      { status: 400 }
    );
  }

  if (!successUrl || typeof successUrl !== "string") {
    return NextResponse.json(
      { error: "Success URL is required" },
      { status: 400 }
    );
  }

  if (!cancelUrl || typeof cancelUrl !== "string") {
    return NextResponse.json(
      { error: "Cancel URL is required" },
      { status: 400 }
    );
  }

  try {
    const sessionId = await createCheckoutSession(
      email.toLowerCase().trim(),
      priceId,
      successUrl,
      cancelUrl
    );

    return NextResponse.json({ sessionId });
  } catch (error) {
    console.error("Failed to create checkout session:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
