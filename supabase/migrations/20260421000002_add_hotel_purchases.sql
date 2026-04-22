-- Create hotel_purchases table
CREATE TABLE public.hotel_purchases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  hotel_slug TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, hotel_slug)
);

-- Enable RLS
ALTER TABLE public.hotel_purchases ENABLE ROW LEVEL SECURITY;

-- Policies for hotel_purchases
-- Users can only view their own purchases
CREATE POLICY "Users can view own purchases" ON public.hotel_purchases
  FOR SELECT USING (auth.uid() = user_id);

-- Only authenticated users can insert (handled by API function)
CREATE POLICY "Authenticated users can insert purchases" ON public.hotel_purchases
  FOR INSERT WITH CHECK (auth.role() = 'authenticated' AND auth.uid() = user_id);
