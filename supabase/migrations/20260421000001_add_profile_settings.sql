-- Add new notification columns
ALTER TABLE public.profiles
ADD COLUMN notify_email_updates BOOLEAN DEFAULT true,
ADD COLUMN notify_marketing BOOLEAN DEFAULT false;

-- Create function to allow users to delete their own account
CREATE OR REPLACE FUNCTION delete_user()
RETURNS void
LANGUAGE sql
SECURITY DEFINER
AS $$
  DELETE FROM auth.users WHERE id = auth.uid();
$$;
