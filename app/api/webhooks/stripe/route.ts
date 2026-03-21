import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { subscriptions } from "@/db/schema";
import {
  verifyWebhookSignature,
  getStripeInstance,
  STRIPE_WEBHOOK_SECRET,
} from "@/lib/stripe";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  if (!STRIPE_WEBHOOK_SECRET) {
    console.error("STRIPE_WEBHOOK_SECRET not configured");
    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 500 }
    );
  }

  let event;
  try {
    event = await verifyWebhookSignature(body, signature);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case "customer.subscription.updated": {
        const subscription = event.data.object as any;
        await handleSubscriptionUpdate(subscription);
        break;
      }
      case "customer.subscription.deleted": {
        const subscription = event.data.object as any;
        await handleSubscriptionDeleted(subscription);
        break;
      }
      case "invoice.payment_succeeded": {
        const invoice = event.data.object as any;
        if (invoice.subscription) {
          // Refresh subscription status
          const stripe = await getStripeInstance();
          const subscription = await stripe.subscriptions.retrieve(
            invoice.subscription as string
          );
          await handleSubscriptionUpdate(subscription);
        }
        break;
      }
    }
  } catch (err) {
    console.error("Error processing webhook event:", err);
    return NextResponse.json(
      { error: "Failed to process event" },
      { status: 500 }
    );
  }

  return NextResponse.json({ received: true });
}

async function handleSubscriptionUpdate(subscription: any) {
  try {
    const customerEmail = subscription.customer_email || subscription.metadata?.email;
    if (!customerEmail) {
      console.warn("Subscription update missing customer email:", subscription.id);
      return;
    }

    const existing = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.stripeSubscriptionId, subscription.id))
      .limit(1);

    const subscriptionData = {
      email: customerEmail.toLowerCase().trim(),
      stripeCustomerId: subscription.customer,
      stripeSubscriptionId: subscription.id,
      stripePriceId:
        subscription.items.data[0]?.price.id || subscription.metadata?.price_id,
      status: subscription.status,
      currentPeriodEnd: new Date(
        subscription.current_period_end * 1000
      ),
      canceledAt: subscription.canceled_at
        ? new Date(subscription.canceled_at * 1000)
        : null,
    };

    if (existing.length > 0) {
      await db
        .update(subscriptions)
        .set({
          ...subscriptionData,
          updatedAt: new Date(),
        })
        .where(eq(subscriptions.id, existing[0].id));
    } else {
      await db.insert(subscriptions).values(subscriptionData);
    }

    console.log("Subscription updated:", subscription.id);
  } catch (err) {
    console.error("Failed to update subscription:", err);
    throw err;
  }
}

async function handleSubscriptionDeleted(subscription: any) {
  try {
    await db
      .update(subscriptions)
      .set({
        status: "canceled",
        canceledAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(subscriptions.stripeSubscriptionId, subscription.id));

    console.log("Subscription canceled:", subscription.id);
  } catch (err) {
    console.error("Failed to cancel subscription:", err);
    throw err;
  }
}
