import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export interface AdminVerificationResult {
  isAdmin: boolean;
  userId?: string;
  email?: string;
  reason?: "unauthenticated" | "not_admin" | "unconfigured" | "error";
}

/**
 * Server-only helper to verify if the currently active session belongs
 * to an authenticated user with an explicitly assigned 'admin' role.
 * NEVER trust user input or client-side tokens.
 */
export async function verifyAdminRole(): Promise<AdminVerificationResult> {
  if (!isSupabaseConfigured()) {
    // Development fallback when live Supabase credentials have not been configured
    return {
      isAdmin: true,
      userId: "dev-preview-admin-id",
      email: "owner@unisexfitness.com",
    };
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return { isAdmin: false, reason: "unauthenticated" };
    }

    // Verify role directly against user_roles table
    const { data: roleData, error: roleError } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .maybeSingle();

    if (roleError || !roleData) {
      return {
        isAdmin: false,
        userId: user.id,
        email: user.email,
        reason: "not_admin",
      };
    }

    return {
      isAdmin: true,
      userId: user.id,
      email: user.email,
    };
  } catch (error) {
    console.error("[Admin Verification Error]", error);
    return { isAdmin: false, reason: "error" };
  }
}
