import { NextResponse } from "next/server";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { createCheckoutOrder } from "@/lib/payments/stripe";

export async function POST(request: Request) {
  try {
    const isConfigured = isSupabaseConfigured();

    let userId = "preview-user-id";
    let userEmail = "athlete@unisexfitness.com";

    if (isConfigured) {
      const supabase = await createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return NextResponse.json(
          { success: false, message: "Authentication required to initiate membership checkout." },
          { status: 401 }
        );
      }
      userId = user.id;
      userEmail = user.email || "member@unisexfitness.com";
    }

    const body = await request.json().catch(() => null);
    const planId = body?.planId;

    if (!planId) {
      return NextResponse.json(
        { success: false, message: "Missing required parameter: planId" },
        { status: 400 }
      );
    }

    const host = request.headers.get("host") || "localhost:3000";
    const protocol = host.includes("localhost") ? "http" : "https";
    const appBaseUrl = process.env.APP_BASE_URL || `${protocol}://${host}`;

    const orderResult = await createCheckoutOrder({
      planId,
      userId,
      userEmail,
      appBaseUrl,
    });

    if (orderResult.error || !orderResult.url) {
      return NextResponse.json(
        { success: false, message: orderResult.error || "Order creation failed" },
        { status: 422 }
      );
    }

    return NextResponse.json({
      success: true,
      url: orderResult.url,
      orderId: orderResult.orderId,
    });
  } catch (error) {
    console.error("[Checkout API Error]", error);
    return NextResponse.json(
      { success: false, message: "Internal server error initiating checkout." },
      { status: 500 }
    );
  }
}
