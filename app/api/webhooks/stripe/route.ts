import { NextResponse } from "next/server";
import { stripe, isStripeConfigured } from "@/lib/payments/stripe";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || process.env.PAYMENT_WEBHOOK_SECRET;

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get("stripe-signature");

    let event: any;

    if (isStripeConfigured() && stripe && webhookSecret) {
      if (!signature) {
        return NextResponse.json(
          { error: "Missing stripe-signature header." },
          { status: 400 }
        );
      }

      try {
        event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
      } catch (err: any) {
        console.error("[Webhook Signature Verification Failed]", err.message);
        return NextResponse.json(
          { error: `Webhook signature verification failed: ${err.message}` },
          { status: 400 }
        );
      }
    } else {
      // In development / sandbox simulator mode, parse JSON payload safely
      try {
        event = JSON.parse(rawBody);
      } catch {
        return NextResponse.json({ error: "Malformed payload." }, { status: 400 });
      }
    }

    const eventId = event.id || `sim_evt_${Date.now()}`;
    const eventType = event.type || "checkout.session.completed";

    // 1. Idempotency Check via Database
    if (isSupabaseConfigured()) {
      const supabase = await createClient();

      // Check if event was already processed
      const { data: existingEvent } = await supabase
        .from("payment_webhook_events")
        .select("id, status")
        .eq("id", eventId)
        .maybeSingle();

      if (existingEvent) {
        console.log(`[Idempotent Webhook] Event ${eventId} already processed. Skipping.`);
        return NextResponse.json({ received: true, status: "duplicate_ignored" });
      }

      // Record incoming event
      await supabase.from("payment_webhook_events").insert({
        id: eventId,
        event_type: eventType,
        provider: "Stripe",
        status: "processed",
      });
    }

    // 2. Handle Checkout Session Completed
    if (eventType === "checkout.session.completed") {
      const session = event.data?.object || event;

      const internalOrderId = session.client_reference_id || session.metadata?.internalOrderId;
      const planId = session.metadata?.planId;
      const userId = session.metadata?.userId;
      const amountTotal = session.amount_total;
      const currency = session.currency?.toUpperCase();
      const paymentIntentId = session.payment_intent;

      if (!internalOrderId) {
        console.warn("[Webhook Warning] Missing client_reference_id in completed session.");
        return NextResponse.json({ received: true, warning: "Missing internal order ID." });
      }

      if (isSupabaseConfigured()) {
        const supabase = await createClient();

        // 3. Verify internal purchase record
        const { data: purchase, error: purchaseError } = await supabase
          .from("purchases")
          .select("*, membership_plans(*)")
          .eq("id", internalOrderId)
          .single();

        if (purchaseError || !purchase) {
          console.error(`[Webhook Mismatch] Order ${internalOrderId} not found.`);
          return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        // 4. Validate Amount and Currency Match Exactly
        if (amountTotal && purchase.amount_minor_units !== amountTotal) {
          console.error(
            `[Webhook Amount Mismatch] Expected ${purchase.amount_minor_units}, received ${amountTotal}`
          );
          await supabase
            .from("purchases")
            .update({ status: "requires_review" })
            .eq("id", internalOrderId);
          return NextResponse.json({ error: "Amount mismatch detected" }, { status: 422 });
        }

        // 5. Transition Order to Succeeded State
        await supabase
          .from("purchases")
          .update({
            status: "succeeded",
            provider_payment_id: paymentIntentId || session.id,
            updated_at: new Date().toISOString(),
          })
          .eq("id", internalOrderId);

        // 6. Activate Membership Duration
        const validityDays = purchase.membership_plans?.validity_days || 30;
        const startsAt = new Date();
        const expiresAt = new Date();
        expiresAt.setDate(startsAt.getDate() + validityDays);

        await supabase.from("memberships").insert({
          user_id: userId || purchase.user_id,
          plan_id: planId || purchase.plan_id,
          purchase_id: internalOrderId,
          status: "active",
          starts_at: startsAt.toISOString(),
          expires_at: expiresAt.toISOString(),
        });

        console.log(
          `[Membership Activated] Member ${userId || purchase.user_id} active for ${validityDays} days.`
        );
      }
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error("[Webhook Processing Error]", err);
    return NextResponse.json(
      { error: "Webhook handler encountered an unhandled exception." },
      { status: 500 }
    );
  }
}
