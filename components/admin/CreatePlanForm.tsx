"use client";

import { useActionState } from "react";
import { createMembershipPlanAction, AdminActionResult } from "@/features/admin/actions";
import { Button } from "@/components/ui";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export default function CreatePlanForm() {
  const [state, formAction, isPending] = useActionState<AdminActionResult | null, FormData>(
    createMembershipPlanAction,
    null
  );

  return (
    <form action={formAction} className="space-y-6">
      {state?.error && (
        <div className="p-4 bg-red-950/60 border border-red-700 text-red-200 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{state.error}</span>
        </div>
      )}

      {state?.success && (
        <div className="p-4 bg-emerald-950/60 border border-emerald-600 text-emerald-200 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{state.message}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#BDBDBD] mb-1.5">
            Plan Slug ID (e.g. vip-annual) *
          </label>
          <input
            name="id"
            required
            placeholder="vip-annual"
            className="w-full bg-[#171717] border border-[#343434] text-white px-4 py-2.5 text-xs focus:border-white focus:outline-none font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#BDBDBD] mb-1.5">
            Display Name *
          </label>
          <input
            name="name"
            required
            placeholder="VIP Annual Membership"
            className="w-full bg-[#171717] border border-[#343434] text-white px-4 py-2.5 text-xs focus:border-white focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#BDBDBD] mb-1.5">
            Minor Unit Amount (e.g. 5900 = £59) *
          </label>
          <input
            name="amountMinorUnits"
            type="number"
            required
            min={0}
            placeholder="5900"
            className="w-full bg-[#171717] border border-[#343434] text-white px-4 py-2.5 text-xs focus:border-white focus:outline-none font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#BDBDBD] mb-1.5">
            Currency Code *
          </label>
          <input
            name="currency"
            required
            defaultValue="GBP"
            placeholder="GBP"
            className="w-full bg-[#171717] border border-[#343434] text-white px-4 py-2.5 text-xs focus:border-white focus:outline-none font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#BDBDBD] mb-1.5">
            Validity (Days) *
          </label>
          <input
            name="validityDays"
            type="number"
            required
            min={1}
            defaultValue={30}
            placeholder="30"
            className="w-full bg-[#171717] border border-[#343434] text-white px-4 py-2.5 text-xs focus:border-white focus:outline-none font-mono"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#BDBDBD] mb-1.5">
          Description
        </label>
        <input
          name="description"
          placeholder="Brief tagline or plan summary"
          className="w-full bg-[#171717] border border-[#343434] text-white px-4 py-2.5 text-xs focus:border-white focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#BDBDBD] mb-1.5">
          Plan Benefits (1 per line)
        </label>
        <textarea
          name="benefits"
          rows={4}
          placeholder="Unlimited strength floor access&#10;Sauna and recovery suites&#10;Private locker"
          className="w-full bg-[#171717] border border-[#343434] text-white px-4 py-2.5 text-xs focus:border-white focus:outline-none font-mono"
        />
      </div>

      <Button type="submit" variant="primary" size="md" isLoading={isPending}>
        {isPending ? "PROVISIONING..." : "SAVE & PUBLISH PLAN"}
      </Button>
    </form>
  );
}
