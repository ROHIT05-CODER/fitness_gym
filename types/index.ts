// Shared types — only client-safe fields; never expose secrets or role management internals

export type UserRole = "member" | "admin";

export interface Profile {
  id: string;
  display_name: string | null;
  created_at: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  description: string | null;
  amount_minor_units: number; // integer minor units e.g. pence/cents
  currency: string;
  validity_days: number;
  benefits: string[];
  is_active: boolean;
}

export type PurchaseStatus =
  | "pending"
  | "succeeded"
  | "failed"
  | "cancelled"
  | "refunded"
  | "requires_review";

export interface Purchase {
  id: string;
  plan_id: string;
  amount_minor_units: number;
  currency: string;
  status: PurchaseStatus;
  created_at: string;
}
