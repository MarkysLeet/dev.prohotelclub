-- Add subscription_ends_at to profiles
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS subscription_ends_at TIMESTAMPTZ;
