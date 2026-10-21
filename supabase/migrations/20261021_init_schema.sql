-- ==============================================================================
-- Unisex Fitness: Initial Database Schema & Row-Level Security (RLS)
-- Phase E / F Foundation
-- ==============================================================================

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 2. User Roles Table (Distinct from profile to prevent privilege escalation)
CREATE TYPE public.app_role AS ENUM ('member', 'admin');

CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL DEFAULT 'member',
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT unique_user_role UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 3. Membership Plans Table
CREATE TABLE IF NOT EXISTS public.membership_plans (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  amount_minor_units INTEGER NOT NULL CHECK (amount_minor_units >= 0),
  currency TEXT NOT NULL DEFAULT 'GBP',
  validity_days INTEGER NOT NULL CHECK (validity_days > 0),
  benefits TEXT[] NOT NULL DEFAULT '{}',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.membership_plans ENABLE ROW LEVEL SECURITY;

-- 4. Purchases / Payment Orders Table
CREATE TYPE public.purchase_status AS ENUM (
  'pending',
  'succeeded',
  'failed',
  'cancelled',
  'refunded',
  'requires_review'
);

CREATE TABLE IF NOT EXISTS public.purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE RESTRICT,
  plan_id TEXT NOT NULL REFERENCES public.membership_plans(id) ON DELETE RESTRICT,
  amount_minor_units INTEGER NOT NULL CHECK (amount_minor_units >= 0),
  currency TEXT NOT NULL,
  status public.purchase_status NOT NULL DEFAULT 'pending',
  provider TEXT,
  provider_order_id TEXT,
  provider_payment_id TEXT,
  idempotency_key TEXT UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;

-- 5. Active & Past Memberships Table
CREATE TYPE public.membership_status AS ENUM ('active', 'expired', 'cancelled', 'pending');

CREATE TABLE IF NOT EXISTS public.memberships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_id TEXT NOT NULL REFERENCES public.membership_plans(id) ON DELETE RESTRICT,
  purchase_id UUID REFERENCES public.purchases(id) ON DELETE SET NULL,
  status public.membership_status NOT NULL DEFAULT 'active',
  starts_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.memberships ENABLE ROW LEVEL SECURITY;

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Strict Isolation: Members can only read/manage their own records
-- ==============================================================================

-- Profiles: Members can read & update only their own profile
CREATE POLICY "Users can read own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- User Roles: Users can inspect their own role, but cannot insert/update roles
CREATE POLICY "Users can view own role"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

-- Membership Plans: Anyone can view active membership plans
CREATE POLICY "Public can view active membership plans"
  ON public.membership_plans FOR SELECT
  USING (is_active = true);

-- Purchases: Members can only view their own purchase records
CREATE POLICY "Members can view own purchases"
  ON public.purchases FOR SELECT
  USING (auth.uid() = user_id);

-- Memberships: Members can only view their own membership status
CREATE POLICY "Members can view own memberships"
  ON public.memberships FOR SELECT
  USING (auth.uid() = user_id);

-- ==============================================================================
-- AUTOMATIC USER PROVISIONING TRIGGER
-- On signup, automatically create profile and assign 'member' role
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert default profile
  INSERT INTO public.profiles (id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', 'Member'));

  -- Assign default 'member' role (Never 'admin')
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'member');

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Seed initial plans
INSERT INTO public.membership_plans (id, name, description, amount_minor_units, currency, validity_days, benefits, is_active)
VALUES
  ('standard-monthly', 'Standard Monthly', 'Unlimited gym floor & locker room access', 4900, 'GBP', 30, ARRAY['Gym floor access', 'Locker amenities', 'HIIT classes'], true),
  ('pro-quarterly', 'Pro Quarterly', 'Full access with priority booking and assessments', 12900, 'GBP', 90, ARRAY['All Standard features', 'Priority bookings', '3D InBody scans', 'Guest passes'], true),
  ('elite-annual', 'Elite Annual', 'Complete year of elite training and private locker', 44900, 'GBP', 365, ARRAY['All Pro features', '4x Personal training sessions', 'Private locker', 'Unlimited guest passes'], true)
ON CONFLICT (id) DO NOTHING;
