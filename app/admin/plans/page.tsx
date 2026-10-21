import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { Card, Badge } from "@/components/ui";
import PlanStatusToggle from "@/components/admin/PlanStatusToggle";
import CreatePlanForm from "@/components/admin/CreatePlanForm";
import { INITIAL_PLANS } from "@/features/memberships/data";
import { Dumbbell, Plus } from "lucide-react";
import { MembershipPlan } from "@/types";

export default async function AdminPlansPage() {
  const isConfigured = isSupabaseConfigured();

  let plans: MembershipPlan[] = [];

  if (isConfigured) {
    const supabase = await createClient();
    const { data } = await supabase
      .from("membership_plans")
      .select("*")
      .order("created_at", { ascending: true });
    plans = data || [];
  } else {
    // Development preview fallback mapping initial plans
    plans = INITIAL_PLANS.map((p) => ({
      id: p.id,
      name: p.name,
      description: p.tagline,
      amount_minor_units: p.amountMinorUnits,
      currency: p.currencyCode,
      validity_days: p.validityDays,
      benefits: p.benefits,
      is_active: true,
    }));
  }

  return (
    <div className="space-y-12 max-w-6xl">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline-white" size="sm">
            CATALOG MANAGEMENT
          </Badge>
          {!isConfigured && (
            <span className="text-[11px] text-amber-400 font-mono">
              [Preview Mode]
            </span>
          )}
        </div>
        <h1 className="font-display text-4xl sm:text-5xl text-white tracking-wide">
          MEMBERSHIP PLANS MANAGER
        </h1>
        <p className="text-xs sm:text-sm text-[#A0A0A0] mt-1">
          Configure authoritative prices, durations, and visibility. Prices are stored in integer minor units to guarantee financial accuracy.
        </p>
      </div>

      {/* Existing Plans Table */}
      <Card variant="surface" className="p-0 overflow-hidden">
        <div className="p-6 border-b border-[#282828] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Dumbbell className="w-5 h-5 text-white" />
            <h2 className="font-display text-2xl text-white tracking-wide">
              CONFIGURED PLANS ({plans.length})
            </h2>
          </div>
          <span className="text-xs text-[#888888]">
            Click status pill to toggle public availability
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#181818] border-b border-[#282828] text-[#888888] uppercase tracking-wider font-mono text-[11px]">
              <tr>
                <th className="p-4">Plan Name & ID</th>
                <th className="p-4">Duration</th>
                <th className="p-4">Authoritative Amount</th>
                <th className="p-4">Benefits Count</th>
                <th className="p-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#242424]">
              {plans.map((plan) => (
                <tr key={plan.id} className="hover:bg-[#1A1A1A] transition-colors">
                  <td className="p-4">
                    <span className="font-bold text-white text-sm block">
                      {plan.name}
                    </span>
                    <span className="text-[11px] font-mono text-[#707070]">
                      {plan.id}
                    </span>
                  </td>
                  <td className="p-4 text-white font-mono">
                    {plan.validity_days} days
                  </td>
                  <td className="p-4 text-white font-mono text-sm">
                    {plan.currency}{" "}
                    {(plan.amount_minor_units / 100).toFixed(2)}
                    <span className="text-[10px] text-[#707070] block">
                      ({plan.amount_minor_units} minor units)
                    </span>
                  </td>
                  <td className="p-4 text-[#A0A0A0]">
                    {plan.benefits?.length || 0} benefits
                  </td>
                  <td className="p-4 text-center">
                    <PlanStatusToggle
                      planId={plan.id}
                      initialStatus={plan.is_active}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add New Plan Form */}
      <Card variant="highlight" className="p-8 sm:p-10">
        <div className="flex items-center gap-2 mb-2">
          <Plus className="w-5 h-5 text-white" />
          <h2 className="font-display text-3xl text-white tracking-wide">
            PROVISION NEW PLAN
          </h2>
        </div>
        <p className="text-xs text-[#A0A0A0] mb-8">
          Add an owner-authorized tier. Changes will immediately reflect in the database and audit logs.
        </p>

        <CreatePlanForm />
      </Card>
    </div>
  );
}
