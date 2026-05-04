-- 1. Modify review_requests
ALTER TABLE public.review_requests ADD COLUMN reason TEXT;
ALTER TABLE public.review_requests ADD COLUMN admin_reply TEXT;
ALTER TABLE public.review_requests ADD COLUMN scheduled_date TIMESTAMPTZ;

-- 2. Modify ENUM for notifications (this needs to be handled via ALTER TYPE)
ALTER TYPE notification_type ADD VALUE 'review_approved';
ALTER TYPE notification_type ADD VALUE 'review_rejected';
ALTER TYPE notification_type ADD VALUE 'new_comment';

-- 3. Create hotel_subscriptions
CREATE TABLE public.hotel_subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  hotel_slug TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, hotel_slug)
);

-- Enable RLS for hotel_subscriptions
ALTER TABLE public.hotel_subscriptions ENABLE ROW LEVEL SECURITY;

-- Policies for hotel_subscriptions
CREATE POLICY "Users can manage own subscriptions" ON public.hotel_subscriptions
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
