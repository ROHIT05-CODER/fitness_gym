"use server";

import { verifyAdminRole } from "@/lib/auth/admin";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export interface AdminActionResult {
  success?: boolean;
  error?: string;
  message?: string;
}

export async function togglePlanStatusAction(
  planId: string,
  currentStatus: boolean
): Promise<AdminActionResult> {
  const auth = await verifyAdminRole();
  if (!auth.isAdmin) {
    return { error: "Forbidden: Administrator role required." };
  }

  if (!isSupabaseConfigured()) {
    return {
      success: true,
      message: `[Preview] Plan '${planId}' status toggled to ${!currentStatus ? "active" : "inactive"}.`,
    };
  }

  const supabase = await createClient();
  const nextStatus = !currentStatus;

  const { error } = await supabase
    .from("membership_plans")
    .update({
      is_active: nextStatus,
      updated_at: new Date().toISOString(),
    })
    .eq("id", planId);

  if (error) {
    return { error: error.message };
  }

  // Record audit log
  await supabase.from("admin_audit_logs").insert({
    admin_user_id: auth.userId,
    action: "TOGGLE_PLAN_ACTIVE",
    target_resource: "membership_plans",
    resource_id: planId,
    details: { previousStatus: currentStatus, newStatus: nextStatus },
  });

  revalidatePath("/admin/plans");
  revalidatePath("/memberships");
  return { success: true, message: `Plan status updated to ${nextStatus ? "Active" : "Inactive"}.` };
}

export async function createMembershipPlanAction(
  prevState: AdminActionResult | null,
  formData: FormData
): Promise<AdminActionResult> {
  const auth = await verifyAdminRole();
  if (!auth.isAdmin) {
    return { error: "Forbidden: Administrator role required." };
  }

  const id = (formData.get("id") as string)?.trim().toLowerCase().replace(/\s+/g, "-");
  const name = (formData.get("name") as string)?.trim();
  const description = (formData.get("description") as string)?.trim();
  const amountMinorUnits = parseInt(formData.get("amountMinorUnits") as string, 10);
  const currency = ((formData.get("currency") as string)?.trim() || "GBP").toUpperCase();
  const validityDays = parseInt(formData.get("validityDays") as string, 10);
  const benefitsRaw = (formData.get("benefits") as string)?.trim() || "";

  if (!id || !name || isNaN(amountMinorUnits) || isNaN(validityDays)) {
    return { error: "Please fill in all required plan fields with valid numbers." };
  }

  if (amountMinorUnits < 0 || validityDays <= 0) {
    return { error: "Amount must be non-negative and validity days must be greater than zero." };
  }

  const benefits = benefitsRaw
    .split("\n")
    .map((b) => b.trim())
    .filter(Boolean);

  if (!isSupabaseConfigured()) {
    return {
      success: true,
      message: `[Preview] Plan '${name}' created successfully.`,
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("membership_plans").insert({
    id,
    name,
    description: description || null,
    amount_minor_units: amountMinorUnits,
    currency,
    validity_days: validityDays,
    benefits,
    is_active: true,
  });

  if (error) {
    return { error: error.message };
  }

  await supabase.from("admin_audit_logs").insert({
    admin_user_id: auth.userId,
    action: "CREATE_PLAN",
    target_resource: "membership_plans",
    resource_id: id,
    details: { name, amountMinorUnits, currency, validityDays },
  });

  revalidatePath("/admin/plans");
  revalidatePath("/memberships");
  return { success: true, message: `Plan '${name}' created successfully.` };
}
