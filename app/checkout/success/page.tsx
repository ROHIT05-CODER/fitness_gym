import { Suspense } from "react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { Card, Badge, Button } from "@/components/ui";
import { CheckCircle2, Clock, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Payment Verification | Unisex Fitness",
  description: "Verifying your membership transaction status.",
};

async function SuccessContent({ orderId }: { orderId?: string }) {
  let orderStatus: string = "pending";
  let planName: string = "Membership Plan";

  if (isSupabaseConfigured() && orderId) {
    const supabase = await createClient();
    const { data: purchase } = await supabase
      .from("purchases")
      .select("status, amount_minor_units, currency, membership_plans(name)")
      .eq("id", orderId)
      .maybeSingle();

    if (purchase) {
      orderStatus = purchase.status;
      planName = (purchase.membership_plans as any)?.name || "Membership Plan";
    }
  } else {
    // Development preview fallback
    orderStatus = "succeeded";
    planName = "Pro Quarterly Membership";
  }

  const isSucceeded = orderStatus === "succeeded";

  return (
    <Card variant="highlight" className="p-8 sm:p-12 text-center max-w-lg mx-auto space-y-6">
      <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500 flex items-center justify-center mx-auto text-emerald-400">
        {isSucceeded ? (
          <CheckCircle2 className="w-8 h-8" />
        ) : (
          <Clock className="w-8 h-8 animate-pulse text-amber-400" />
        )}
      </div>

      <div className="space-y-2">
        <Badge variant={isSucceeded ? "success" : "neutral"} size="sm">
          {isSucceeded ? "PAYMENT VERIFIED" : "VERIFYING SETTLEMENT..."}
        </Badge>
        <h1 className="font-display text-4xl sm:text-5xl text-white tracking-wide">
          {isSucceeded ? "WELCOME TO THE CLUB" : "TRANSACTION PENDING"}
        </h1>
        <p className="text-xs sm:text-sm text-[#A0A0A0] leading-relaxed">
          {isSucceeded
            ? `Your ${planName} is now active. Your digital pass and turnstile codes are provisioned.`
            : "Your payment order is being verified cryptographically with the gateway. This typically resolves within seconds."}
        </p>
      </div>

      {orderId && (
        <div className="p-3 bg-[#171717] border border-[#2B2B2B] text-xs font-mono text-[#888888]">
          Reference ID: <span className="text-white">{orderId.slice(0, 16)}...</span>
        </div>
      )}

      <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
        <Button href="/member" variant="primary" size="md">
          Go to Member Portal
        </Button>
        <Button href="/" variant="outline" size="md">
          Home
        </Button>
      </div>

      <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#707070]">
        <ShieldCheck className="w-3.5 h-3.5" />
        <span>Server-Verified Settlement • No Raw Card Data Stored</span>
      </div>
    </Card>
  );
}

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const orderId = typeof params.order_id === "string" ? params.order_id : undefined;

  return (
    <div className="bg-black text-white min-h-[85vh] flex items-center justify-center py-16 px-4">
      <Suspense
        fallback={
          <div className="text-center text-white font-display text-2xl animate-pulse">
            CHECKING PAYMENT STATUS...
          </div>
        }
      >
        <SuccessContent orderId={orderId} />
      </Suspense>
    </div>
  );
}
