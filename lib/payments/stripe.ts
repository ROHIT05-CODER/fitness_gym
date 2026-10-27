import Stripe from "stripe";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { INITIAL_PLANS } from "@/features/memberships/data";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || process.env.PAYMENT_SECRET_KEY;

export const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, {
      apiVersion: "2025-02-24.acacia" as any,
    })
  : null;

export function isStripeConfigured(): boolean {
  return !!stripeSecretKey && !stripeSecretKey.includes("placeholder");
}

export interface CreateOrderParams {
  planId: string;
  userId: string;
  userEmail: string;
  appBaseUrl: string;
}

export interface CreateOrderResult {
  url?: string;
  orderId?: string;
  error?: string;
}

/**
 * Authoritative Server-Side Checkout Order Creation
 * Enforces integer minor-unit amount and trusted database pricing.
 */
export async function createCheckoutOrder({
  planId,
  userId,
  userEmail,
  appBaseUrl,
}: CreateOrderParams): Promise<CreateOrderResult> {
  // 1. Fetch Authoritative Plan Record
  let plan: {
    id: string;
    name: string;
    amountMinorUnits: number;
    currency: string;
    validityDays: number;
  } | null = null;

  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { data: dbPlan } = await supabase
      .from("membership_plans")
      .select("*")
      .eq("id", planId)
      .eq("is_active", true)
      .maybeSingle();

    if (dbPlan) {
      plan = {
        id: dbPlan.id,
        name: dbPlan.name,
        amountMinorUnits: dbPlan.amount_minor_units,
        currency: dbPlan.currency,
        validityDays: dbPlan.validity_days,
      };
    }
  }

  // Fallback to trusted static plans if database plan not found
  if (!plan) {
    const staticPlan = INITIAL_PLANS.find((p) => p.id === planId);
    if (staticPlan) {
      plan = {
        id: staticPlan.id,
        name: staticPlan.name,
        amountMinorUnits: staticPlan.amountMinorUnits,
        currency: staticPlan.currencyCode,
        validityDays: staticPlan.validityDays,
      };
    }
  }

  if (!plan) {
    return { error: "Selected membership plan is invalid or no longer active." };
  }

  // 2. Generate unique internal order reference
  const internalOrderId = crypto.randomUUID();

  // 3. Persist pending order to database
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { error: insertError } = await supabase.from("purchases").insert({
      id: internalOrderId,
      user_id: userId,
      plan_id: plan.id,
      amount_minor_units: plan.amountMinorUnits,
      currency: plan.currency,
      status: "pending",
      provider: isStripeConfigured() ? "Stripe" : "SandboxSimulator",
    });

    if (insertError) {
      console.error("[Database Purchase Insert Error]", insertError);
      return { error: "Failed to initialize internal purchase record." };
    }
  }

  const successUrl = `${appBaseUrl}/checkout/success?order_id=${internalOrderId}`;
  const cancelUrl = `${appBaseUrl}/checkout/cancel?order_id=${internalOrderId}`;

  // 4. Live Stripe Session or Sandbox Simulation
  if (isStripeConfigured() && stripe) {
    try {
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        customer_email: userEmail,
        client_reference_id: internalOrderId,
        metadata: {
          internalOrderId,
          planId: plan.id,
          userId,
        },
        line_items: [
          {
            price_data: {
              currency: plan.currency.toLowerCase(),
              product_data: {
                name: `Unisex Fitness — ${plan.name}`,
                description: `${plan.validityDays}-day access to Unisex Fitness training facilities.`,
              },
              unit_amount: plan.amountMinorUnits,
            },
            quantity: 1,
          },
        ],
        success_url: `${successUrl}&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: cancelUrl,
      });

      return { url: session.url || successUrl, orderId: internalOrderId };
    } catch (err: any) {
      console.error("[Stripe Session Error]", err);
      return { error: err.message || "Failed to create payment session with gateway." };
    }
  }

  // Preview / Sandbox simulation URL when live Stripe keys are pending
  return {
    url: `${successUrl}&simulated=true`,
    orderId: internalOrderId,
  };
}
