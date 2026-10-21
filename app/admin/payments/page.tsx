import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { Card, Badge } from "@/components/ui";
import { CreditCard, ShieldCheck } from "lucide-react";

interface AdminPurchaseRecord {
  id: string;
  user_id: string;
  plan_id: string;
  amount_minor_units: number;
  currency: string;
  status: string;
  provider?: string | null;
  provider_order_id?: string | null;
  created_at: string;
  membership_plans?: { name?: string } | null;
  profiles?: { display_name?: string } | null;
}

export default async function AdminPaymentsPage() {
  const isConfigured = isSupabaseConfigured();

  let purchases: AdminPurchaseRecord[] = [];

  if (isConfigured) {
    const supabase = await createClient();
    const { data } = await supabase
      .from("purchases")
      .select("*, membership_plans(name), profiles(display_name)")
      .order("created_at", { ascending: false })
      .limit(50);
    purchases = data || [];
  } else {
    // Development preview fallback
    purchases = [
      {
        id: "ord-8923-a17b-preview",
        user_id: "usr-4921-preview",
        plan_id: "pro-quarterly",
        amount_minor_units: 12900,
        currency: "GBP",
        status: "succeeded",
        provider: "Stripe",
        provider_order_id: "cs_test_a1B2c3D4e5",
        created_at: "2026-10-21T09:30:00Z",
        membership_plans: { name: "Pro Quarterly" },
        profiles: { display_name: "Marcus Vance" },
      },
      {
        id: "ord-8924-b28c-preview",
        user_id: "usr-4922-preview",
        plan_id: "elite-annual",
        amount_minor_units: 44900,
        currency: "GBP",
        status: "succeeded",
        provider: "Stripe",
        provider_order_id: "cs_test_f6G7h8I9j0",
        created_at: "2026-10-20T16:45:00Z",
        membership_plans: { name: "Elite Annual" },
        profiles: { display_name: "Elena Rostova" },
      },
      {
        id: "ord-8925-c39d-preview",
        user_id: "usr-4923-preview",
        plan_id: "standard-monthly",
        amount_minor_units: 4900,
        currency: "GBP",
        status: "pending",
        provider: "Stripe",
        provider_order_id: "cs_test_k1L2m3N4o5",
        created_at: "2026-10-19T14:10:00Z",
        membership_plans: { name: "Standard Monthly" },
        profiles: { display_name: "Alex Mercer" },
      },
    ];
  }

  return (
    <div className="space-y-10 max-w-6xl">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline-white" size="sm">
            TRANSACTION AUDIT
          </Badge>
          {!isConfigured && (
            <span className="text-[11px] text-amber-400 font-mono">
              [Preview Mode]
            </span>
          )}
        </div>
        <h1 className="font-display text-4xl sm:text-5xl text-white tracking-wide">
          VERIFIED PAYMENT TRANSACTIONS ({purchases.length})
        </h1>
        <p className="text-xs sm:text-sm text-[#A0A0A0] mt-1">
          Cryptographically confirmed purchase orders. Status transitions require signed provider webhook validation.
        </p>
      </div>

      {/* Orders Table */}
      <Card variant="surface" className="p-0 overflow-hidden">
        <div className="p-6 border-b border-[#282828] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <CreditCard className="w-5 h-5 text-white" />
            <h2 className="font-display text-2xl text-white tracking-wide">
              PURCHASE ORDERS LEDGER
            </h2>
          </div>
          <span className="text-xs text-[#888888] font-mono">
            Zero Card Data Vaulted
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#181818] border-b border-[#282828] text-[#888888] uppercase tracking-wider font-mono text-[11px]">
              <tr>
                <th className="p-4">Internal Order ID</th>
                <th className="p-4">Member</th>
                <th className="p-4">Plan</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Provider Ref</th>
                <th className="p-4">Date & Time</th>
                <th className="p-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#242424]">
              {purchases.map((order) => (
                <tr key={order.id} className="hover:bg-[#1A1A1A] transition-colors">
                  <td className="p-4 font-mono text-white text-[11px]">
                    {order.id}
                  </td>
                  <td className="p-4 text-white font-medium">
                    {order.profiles?.display_name || "Athlete"}
                  </td>
                  <td className="p-4 text-[#BDBDBD]">
                    {order.membership_plans?.name || order.plan_id}
                  </td>
                  <td className="p-4 font-mono text-white text-sm">
                    {order.currency}{" "}
                    {(order.amount_minor_units / 100).toFixed(2)}
                  </td>
                  <td className="p-4 font-mono text-[11px] text-[#707070]">
                    {order.provider || "Gateway"}: {order.provider_order_id || "—"}
                  </td>
                  <td className="p-4 font-mono text-[#888888] text-[11px]">
                    {new Date(order.created_at).toLocaleString()}
                  </td>
                  <td className="p-4 text-center">
                    <Badge
                      variant={
                        order.status === "succeeded"
                          ? "success"
                          : order.status === "pending"
                          ? "warning"
                          : "neutral"
                      }
                      size="sm"
                    >
                      {order.status.toUpperCase()}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="p-4 bg-[#141414] border border-[#2B2B2B] text-xs text-[#888888] flex items-center gap-3">
        <ShieldCheck className="w-4 h-4 text-white shrink-0" />
        <span>
          Idempotency Requirement: Duplicate provider webhook delivery will not trigger double membership activation or duplicate orders.
        </span>
      </div>
    </div>
  );
}
