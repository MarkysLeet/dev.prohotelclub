-- Add notification preferences to profiles
ALTER TABLE public.profiles
ADD COLUMN notify_likes BOOLEAN DEFAULT true,
ADD COLUMN notify_replies BOOLEAN DEFAULT true;

-- Add parent_id to comments for replies
ALTER TABLE public.comments
ADD COLUMN parent_id UUID REFERENCES public.comments(id) ON DELETE CASCADE;

-- Create notifications table
CREATE TYPE notification_type AS ENUM ('like', 'reply');

CREATE TABLE public.notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  actor_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  type notification_type NOT NULL,
  comment_id UUID REFERENCES public.comments(id) ON DELETE CASCADE,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for notifications
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Notifications Policies
-- Users can only see their own notifications
CREATE POLICY "Users can view own notifications" ON public.notifications
  FOR SELECT USING (auth.uid() = user_id);

-- Users can only update (e.g. mark as read) their own notifications
CREATE POLICY "Users can update own notifications" ON public.notifications
  FOR UPDATE USING (auth.uid() = user_id);

-- Authenticated users can insert notifications (e.g. when liking/replying)
CREATE POLICY "Authenticated users can insert notifications" ON public.notifications
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Function to handle comment updates (updated_at) if needed later
