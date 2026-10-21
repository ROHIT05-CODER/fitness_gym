import { connection } from "next/server";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Card, Badge, Button } from "@/components/ui";
import { signOutAction } from "@/features/auth/actions";
import { Purchase } from "@/types";
import {
  User,
  CreditCard,
  Shield,
  Clock,
  Dumbbell,
  LogOut,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Member Portal | Unisex Fitness",
  description: "Manage your Unisex Fitness membership, pass, and purchase receipts.",
};

export default async function MemberDashboardPage() {
  await connection();
  const isConfigured = isSupabaseConfigured();

  let user = null;
  let profile = null;
  let activeMembership = null;
  interface PurchaseItem extends Partial<Purchase> {
    id: string;
    amount_minor_units: number;
    currency: string;
    status: Purchase["status"];
    created_at: string;
    membership_plans?: { name?: string } | null;
  }

  let purchases: PurchaseItem[] = [];

  if (isConfigured) {
    const supabase = await createClient();
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();

    if (!authUser) {
      redirect("/sign-in");
    }
    user = authUser;

    // Fetch Profile (Scoped to auth.uid())
    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();
    profile = profileData;

    // Fetch Active Membership
    const { data: membershipData } = await supabase
      .from("memberships")
      .select("*, membership_plans(*)")
      .eq("user_id", user.id)
      .eq("status", "active")
      .order("expires_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    activeMembership = membershipData;

    // Fetch Purchases History
    const { data: purchaseData } = await supabase
      .from("purchases")
      .select("*, membership_plans(name)")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(10);
    purchases = purchaseData || [];
  } else {
    // Development preview fallback when Supabase credentials are empty
    user = {
      id: "preview-user-id",
      email: "athlete@unisexfitness.com",
    };
    profile = {
      display_name: "Jordan Steele",
      phone: "+44 7900 123456",
      created_at: "2026-10-21T00:00:00.000Z",
    };
  }

  return (
    <div className="bg-black text-white min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Supabase Setup Banner (if not yet configured) */}
        {!isConfigured && (
          <div className="mb-8 p-4 bg-amber-950/40 border border-amber-600/60 rounded text-amber-200 text-xs flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
              <span>
                <strong>Developer Preview Mode:</strong> Connect your Supabase project in{" "}
                <code className="bg-black/50 px-1 py-0.5 rounded">.env.local</code> to enable live database reads & RLS.
              </span>
            </div>
            <Link
              href="https://supabase.com"
              target="_blank"
              className="underline text-amber-300 hover:text-white flex items-center gap-1 shrink-0"
            >
              Supabase Console <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        )}

        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#343434] pb-8 mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline-white" size="sm">
                MEMBER WORKSPACE
              </Badge>
              <span className="text-xs font-mono text-[#888888]">{user?.email}</span>
            </div>
            <h1 className="font-display text-4xl sm:text-6xl text-white tracking-wide">
              WELCOME BACK, {profile?.display_name?.toUpperCase() || "ATHLETE"}
            </h1>
          </div>

          <form action={signOutAction}>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-4 py-2 border border-[#343434] bg-[#141414] hover:bg-white hover:text-black transition-colors text-xs font-semibold tracking-wider uppercase text-[#BDBDBD]"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </form>
        </div>

        {/* Overview Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Active Membership Status */}
          <div className="lg:col-span-8 space-y-8">
            <Card variant="highlight" className="p-8">
              <div className="flex items-center justify-between border-b border-[#282828] pb-4 mb-6">
                <div className="flex items-center gap-2.5">
                  <Dumbbell className="w-5 h-5 text-white" />
                  <h3 className="font-display text-2xl tracking-wide text-white">
                    MEMBERSHIP STATUS
                  </h3>
                </div>
                {activeMembership ? (
                  <Badge variant="success" size="sm">
                    ACTIVE PASS
                  </Badge>
                ) : (
                  <Badge variant="neutral" size="sm">
                    NO ACTIVE PLAN
                  </Badge>
                )}
              </div>

              {activeMembership ? (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-display text-4xl text-white tracking-wide mb-1">
                      {activeMembership.membership_plans?.name || "PRO MEMBERSHIP"}
                    </h4>
                    <p className="text-xs text-[#A0A0A0]">
                      Full gym floor & recovery amenities included.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-[#141414] border border-[#2B2B2B] text-xs">
                    <div className="space-y-1">
                      <span className="text-[#888888] uppercase tracking-wider block">
                        Valid Until
                      </span>
                      <span className="font-mono text-white text-sm">
                        {new Date(activeMembership.expires_at).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[#888888] uppercase tracking-wider block">
                        Club Turnstile Code
                      </span>
                      <span className="font-mono text-white text-sm tracking-widest">
                        UNX-8942-PT
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-6 text-center sm:text-left space-y-4">
                  <p className="text-sm text-[#BDBDBD] max-w-lg leading-relaxed">
                    You do not currently have an active training membership. Compare our verified tiers to unlock unlimited floor access.
                  </p>
                  <Button href="/memberships" variant="primary" size="md">
                    Explore Membership Plans
                  </Button>
                </div>
              )}
            </Card>

            {/* Purchase & Payment History */}
            <Card variant="surface" className="p-8">
              <div className="flex items-center justify-between border-b border-[#2B2B2B] pb-4 mb-6">
                <div className="flex items-center gap-2.5">
                  <CreditCard className="w-5 h-5 text-white" />
                  <h3 className="font-display text-2xl tracking-wide text-white">
                    PAYMENT & ORDER HISTORY
                  </h3>
                </div>
                <span className="text-xs text-[#888888] font-mono">
                  Server-Verified Records
                </span>
              </div>

              {purchases.length > 0 ? (
                <div className="divide-y divide-[#2B2B2B]">
                  {purchases.map((purchase) => (
                    <div
                      key={purchase.id}
                      className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs"
                    >
                      <div>
                        <span className="text-white font-semibold block">
                          {purchase.membership_plans?.name || "Membership Plan"}
                        </span>
                        <span className="text-[#888888] font-mono">
                          {new Date(purchase.created_at).toLocaleDateString()} • Ref:{" "}
                          {purchase.id.slice(0, 8)}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-white text-sm">
                          {purchase.currency} {(purchase.amount_minor_units / 100).toFixed(2)}
                        </span>
                        <Badge
                          variant={purchase.status === "succeeded" ? "success" : "neutral"}
                          size="sm"
                        >
                          {purchase.status.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-xs text-[#888888] space-y-1">
                  <Clock className="w-6 h-6 mx-auto mb-2 text-[#555555]" />
                  <p className="text-white font-medium">No verified purchase records found.</p>
                  <p>When you complete a checkout order, server-confirmed receipts will appear here.</p>
                </div>
              )}
            </Card>
          </div>

          {/* Member Profile Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <Card variant="surface" className="p-6">
              <div className="flex items-center gap-2.5 border-b border-[#2B2B2B] pb-4 mb-6">
                <User className="w-5 h-5 text-white" />
                <h3 className="font-display text-2xl tracking-wide text-white">
                  MEMBER PROFILE
                </h3>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-[#888888] uppercase tracking-wider block mb-1">
                    Full Name
                  </span>
                  <span className="text-white font-medium text-sm">
                    {profile?.display_name || "Not Specified"}
                  </span>
                </div>

                <div>
                  <span className="text-[#888888] uppercase tracking-wider block mb-1">
                    Email
                  </span>
                  <span className="text-white font-mono text-xs">{user?.email}</span>
                </div>

                <div>
                  <span className="text-[#888888] uppercase tracking-wider block mb-1">
                    Phone
                  </span>
                  <span className="text-white font-mono text-xs">
                    {profile?.phone || "Not Specified"}
                  </span>
                </div>

                <div className="pt-4 border-t border-[#262626]">
                  <span className="text-[11px] text-[#707070] leading-relaxed block mb-4">
                    Member profile edits are strictly isolated by Row-Level Security policies.
                  </span>
                  <Button href="/contact" variant="outline" size="sm" fullWidth>
                    Contact Concierge
                  </Button>
                </div>
              </div>
            </Card>

            <Card variant="surface" className="p-6">
              <div className="flex items-center gap-2 text-xs font-semibold text-white uppercase tracking-wider mb-2">
                <Shield className="w-4 h-4" /> Security Guarantee
              </div>
              <p className="text-[11px] text-[#888888] leading-relaxed">
                Card data is never vaulted on gym servers. All checkout orders require cryptographic webhook validation before membership activation.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
