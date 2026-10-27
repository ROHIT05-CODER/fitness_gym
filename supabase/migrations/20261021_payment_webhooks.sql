-- ==============================================================================
-- Unisex Fitness: Payment Webhooks & Idempotency Tracking Table
-- Phase G
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.payment_webhook_events (
  id TEXT PRIMARY KEY, -- Provider Event ID (e.g. evt_1N2x...)
  event_type TEXT NOT NULL,
  provider TEXT NOT NULL DEFAULT 'Stripe',
  processed_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  status TEXT NOT NULL CHECK (status IN ('processed', 'ignored', 'failed', 'duplicate')),
  order_id UUID REFERENCES public.purchases(id) ON DELETE SET NULL,
  amount_minor_units INTEGER,
  currency TEXT,
  error_message TEXT
);

ALTER TABLE public.payment_webhook_events ENABLE ROW LEVEL SECURITY;

-- Only service role or server-side functions should write webhook events
CREATE POLICY "Admins can view webhook event logs"
  ON public.payment_webhook_events FOR SELECT
  USING (public.is_admin());
