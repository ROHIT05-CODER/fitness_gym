-- ==============================================================================
-- Unisex Fitness: Admin Role Provisioning & Privileged Access Control
-- Phase F
-- ==============================================================================

-- 1. Create Audit Logs Table for privileged administrative operations
CREATE TABLE IF NOT EXISTS public.admin_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  target_resource TEXT NOT NULL,
  resource_id TEXT,
  details JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.admin_audit_logs ENABLE ROW LEVEL SECURITY;

-- 2. Helper Security Definer function to check if current caller is an admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Admin RLS Policies for Privileged Tables

-- Admin can read/write plans
CREATE POLICY "Admins can insert and update membership plans"
  ON public.membership_plans FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Admin can view all member profiles for operational support
CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  USING (public.is_admin());

-- Admin can view all purchase/order status
CREATE POLICY "Admins can view all purchases"
  ON public.purchases FOR SELECT
  USING (public.is_admin());

-- Admin can view all memberships
CREATE POLICY "Admins can view all memberships"
  ON public.memberships FOR SELECT
  USING (public.is_admin());

-- Admin can read/write audit logs
CREATE POLICY "Admins can view audit logs"
  ON public.admin_audit_logs FOR SELECT
  USING (public.is_admin());

-- ==============================================================================
-- SECURE OWNER-CONTROLLED FIRST ADMIN PROVISIONING PROCEDURE
-- Run this query in the Supabase SQL editor with the owner's authenticated email.
-- ==============================================================================

-- Example:
-- DO $$
-- DECLARE
--   target_user_id UUID;
-- BEGIN
--   SELECT id INTO target_user_id FROM auth.users WHERE email = 'owner@unisexfitness.com';
--   IF target_user_id IS NOT NULL THEN
--     INSERT INTO public.user_roles (user_id, role)
--     VALUES (target_user_id, 'admin')
--     ON CONFLICT (user_id, role) DO NOTHING;
--   END IF;
-- END $$;
