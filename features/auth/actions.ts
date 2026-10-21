"use server";

import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export interface AuthActionResult {
  success?: boolean;
  error?: string;
  message?: string;
}

export async function signInAction(
  prevState: AuthActionResult | null,
  formData: FormData
): Promise<AuthActionResult> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Please provide both email and password." };
  }

  if (!isSupabaseConfigured()) {
    return {
      error:
        "Supabase credentials are not configured yet in .env.local. Please supply NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/member");
}

export async function signUpAction(
  prevState: AuthActionResult | null,
  formData: FormData
): Promise<AuthActionResult> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const fullName = formData.get("fullName") as string;

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters long." };
  }

  if (!isSupabaseConfigured()) {
    return {
      error:
        "Supabase credentials are not configured yet in .env.local. Please supply NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email: email.trim(),
    password,
    options: {
      data: {
        full_name: fullName?.trim() || "Member",
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  return {
    success: true,
    message: "Registration successful! If email confirmation is enabled, check your inbox.",
  };
}

export async function signOutAction(): Promise<void> {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }
  revalidatePath("/", "layout");
  redirect("/");
}

export async function updateProfileAction(
  prevState: AuthActionResult | null,
  formData: FormData
): Promise<AuthActionResult> {
  if (!isSupabaseConfigured()) {
    return { error: "Supabase is not configured." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthenticated. Please sign in." };
  }

  const displayName = formData.get("displayName") as string;
  const phone = formData.get("phone") as string;

  const { error } = await supabase
    .from("profiles")
    .update({
      display_name: displayName?.trim() || null,
      phone: phone?.trim() || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id); // Strict ownership check

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/member");
  return { success: true, message: "Profile updated successfully." };
}
