-- Allow system to insert notifications for users from trigger functions
CREATE POLICY "System can insert notifications" ON public.notifications
  FOR INSERT WITH CHECK (true);
