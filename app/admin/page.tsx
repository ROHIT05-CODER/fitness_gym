import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { Card, Badge, Button } from "@/components/ui";
import { Users, CreditCard, Dumbbell, ShieldCheck, ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface RecentPurchaseRecord {
  id: string;
  created_at: string;
  amount_minor_units: number;
  currency: string;
  status: string;
  membership_plans?: { name?: string } | null;
  profiles?: { display_name?: string } | null;
}

export default async function AdminOverviewPage() {
  const isConfigured = isSupabaseConfigured();

  let membersCount = 0;
  let activeMembershipsCount = 0;
  let totalRevenueMinorUnits = 0;
  let plansCount = 0;
  let recentPurchases: RecentPurchaseRecord[] = [];

  if (isConfigured) {
    const supabase = await createClient();

    // 1. Members count
    const { count: mCount } = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true });
    membersCount = mCount || 0;

    // 2. Active memberships count
    const { count: aCount } = await supabase
      .from("memberships")
      .select("*", { count: "exact", head: true })
      .eq("status", "active");
    activeMembershipsCount = aCount || 0;

    // 3. Plans count
    const { count: pCount } = await supabase
      .from("membership_plans")
      .select("*", { count: "exact", head: true });
    plansCount = pCount || 0;

    // 4. Total revenue & recent purchases
    const { data: purchaseData } = await supabase
      .from("purchases")
      .select("*, membership_plans(name), profiles(display_name)")
      .order("created_at", { ascending: false })
      .limit(5);

    if (purchaseData) {
      recentPurchases = purchaseData;
      totalRevenueMinorUnits = purchaseData
        .filter((p) => p.status === "succeeded")
        .reduce((acc, curr) => acc + (curr.amount_minor_units || 0), 0);
    }
  } else {
    // Development preview fallback
    membersCount = 142;
    activeMembershipsCount = 118;
    totalRevenueMinorUnits = 894000;
    plansCount = 3;
    recentPurchases = [
      {
        id: "ord-8923-preview",
        created_at: "2026-10-21T09:30:00Z",
        amount_minor_units: 12900,
        currency: "GBP",
        status: "succeeded",
        membership_plans: { name: "Pro Quarterly" },
        profiles: { display_name: "Marcus Vance" },
      },
      {
        id: "ord-8924-preview",
        created_at: "2026-10-20T16:45:00Z",
        amount_minor_units: 44900,
        currency: "GBP",
        status: "succeeded",
        membership_plans: { name: "Elite Annual" },
        profiles: { display_name: "Elena Rostova" },
      },
    ];
  }

  const formattedRevenue = (totalRevenueMinorUnits / 100).toLocaleString("en-GB", {
    style: "currency",
    currency: "GBP",
  });

  return (
    <div className="space-y-10 max-w-6xl">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline-white" size="sm">
            SYSTEM OVERVIEW
          </Badge>
          {!isConfigured && (
            <span className="text-[11px] text-amber-400 font-mono">
              [Preview Mock Data]
            </span>
          )}
        </div>
        <h1 className="font-display text-4xl sm:text-5xl text-white tracking-wide">
          EXECUTIVE DASHBOARD
        </h1>
        <p className="text-xs sm:text-sm text-[#A0A0A0] mt-1">
          Real-time metrics derived from authoritative database records and transaction ledgers.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card variant="surface" className="p-6">
          <div className="flex items-center justify-between text-[#888888] mb-3">
            <span className="text-xs uppercase font-semibold tracking-wider">
              Total Members
            </span>
            <Users className="w-4 h-4 text-white" />
          </div>
          <p className="font-display text-5xl text-white tracking-tight">
            {membersCount}
          </p>
          <span className="text-[11px] text-[#707070] mt-2 block">
            Registered athlete profiles
          </span>
        </Card>

        <Card variant="surface" className="p-6">
          <div className="flex items-center justify-between text-[#888888] mb-3">
            <span className="text-xs uppercase font-semibold tracking-wider">
              Active Passes
            </span>
            <Dumbbell className="w-4 h-4 text-white" />
          </div>
          <p className="font-display text-5xl text-white tracking-tight">
            {activeMembershipsCount}
          </p>
          <span className="text-[11px] text-emerald-400 mt-2 block">
            Valid turnstile access
          </span>
        </Card>

        <Card variant="surface" className="p-6">
          <div className="flex items-center justify-between text-[#888888] mb-3">
            <span className="text-xs uppercase font-semibold tracking-wider">
              Verified Revenue
            </span>
            <CreditCard className="w-4 h-4 text-white" />
          </div>
          <p className="font-display text-4xl sm:text-5xl text-white tracking-tight">
            {formattedRevenue}
          </p>
          <span className="text-[11px] text-[#707070] mt-2 block">
            Integer minor-unit sum
          </span>
        </Card>

        <Card variant="surface" className="p-6">
          <div className="flex items-center justify-between text-[#888888] mb-3">
            <span className="text-xs uppercase font-semibold tracking-wider">
              Active Plans
            </span>
            <ShieldCheck className="w-4 h-4 text-white" />
          </div>
          <p className="font-display text-5xl text-white tracking-tight">
            {plansCount}
          </p>
          <span className="text-[11px] text-[#707070] mt-2 block">
            Available for purchase
          </span>
        </Card>
      </div>

      {/* Quick Access & Recent Ledger */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Recent Purchases */}
        <div className="lg:col-span-8">
          <Card variant="surface" className="p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-[#2B2B2B] pb-4 mb-6">
              <h2 className="font-display text-2xl text-white tracking-wide">
                RECENT TRANSACTIONS
              </h2>
              <Link
                href="/admin/payments"
                className="text-xs text-[#BDBDBD] hover:text-white flex items-center gap-1 transition-colors"
              >
                View All <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {recentPurchases.length > 0 ? (
              <div className="divide-y divide-[#262626]">
                {recentPurchases.map((order) => (
                  <div
                    key={order.id}
                    className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs"
                  >
                    <div>
                      <span className="font-medium text-white block">
                        {order.profiles?.display_name || "Athlete"} —{" "}
                        {order.membership_plans?.name || "Membership"}
                      </span>
                      <span className="text-[#707070] font-mono text-[11px]">
                        ID: {order.id.slice(0, 12)} •{" "}
                        {new Date(order.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-white text-sm">
                        {order.currency}{" "}
                        {(order.amount_minor_units / 100).toFixed(2)}
                      </span>
                      <Badge
                        variant={order.status === "succeeded" ? "success" : "neutral"}
                        size="sm"
                      >
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-xs text-[#888888]">
                No payment transactions recorded yet.
              </div>
            )}
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="lg:col-span-4 space-y-6">
          <Card variant="highlight" className="p-6 space-y-4">
            <h3 className="font-display text-2xl text-white tracking-wide">
              ADMIN SHORTCUTS
            </h3>
            <p className="text-xs text-[#A0A0A0] leading-relaxed">
              Manage plans, toggle availability, or inspect member roster.
            </p>
            <div className="space-y-2 pt-2">
              <Button href="/admin/plans" variant="primary" size="sm" fullWidth>
                Manage Plans
              </Button>
              <Button href="/admin/members" variant="outline" size="sm" fullWidth>
                Browse Members
              </Button>
              <Button href="/admin/payments" variant="secondary" size="sm" fullWidth>
                View All Payments
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
