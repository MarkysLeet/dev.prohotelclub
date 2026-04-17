-- Create custom types
CREATE TYPE review_request_status AS ENUM ('pending', 'reviewed', 'rejected');

-- Profiles table (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  name TEXT,
  email TEXT UNIQUE,
  is_admin BOOLEAN DEFAULT false,
  has_active_subscription BOOLEAN DEFAULT false,
  company TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Hotels table
CREATE TABLE public.hotels (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  description TEXT,
  image_url TEXT,
  link TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Hotel Details table
CREATE TABLE public.hotel_details (
  slug TEXT PRIMARY KEY REFERENCES public.hotels(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  shooting_date TEXT,
  hero_image TEXT,
  stars INTEGER,
  distance_to_sea TEXT,
  distance_to_city TEXT,
  google_rating NUMERIC(3, 1),
  build_year INTEGER,
  meal_plan TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Hotel Sections table
CREATE TABLE public.hotel_sections (
  id TEXT NOT NULL,
  hotel_slug TEXT REFERENCES public.hotel_details(slug) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT,
  media_count INTEGER DEFAULT 0,
  is_paywalled BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (id, hotel_slug)
);

-- Comments table
CREATE TABLE public.comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  hotel_slug TEXT REFERENCES public.hotels(id) ON DELETE CASCADE,
  author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Comment Likes table
CREATE TABLE public.comment_likes (
  comment_id UUID REFERENCES public.comments(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (comment_id, user_id)
);

-- Review Requests table
CREATE TABLE public.review_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  hotel_id TEXT NOT NULL,
  hotel_name TEXT NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  status review_request_status DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Favorites table
CREATE TABLE public.favorites (
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  hotel_id TEXT REFERENCES public.hotels(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, hotel_id)
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hotels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hotel_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hotel_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comment_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.review_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

-- Policies

-- Profiles: Users can read their own profile, admins can read all
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

-- Hotels & Details & Sections: Public read access for everyone
CREATE POLICY "Public read access for hotels" ON public.hotels
  FOR SELECT USING (true);
CREATE POLICY "Public read access for hotel_details" ON public.hotel_details
  FOR SELECT USING (true);
CREATE POLICY "Public read access for hotel_sections" ON public.hotel_sections
  FOR SELECT USING (true);

-- Hotels & Details & Sections: Admins can manage
CREATE POLICY "Admins can insert hotels" ON public.hotels
  FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true));
CREATE POLICY "Admins can update hotels" ON public.hotels
  FOR UPDATE USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true));
CREATE POLICY "Admins can delete hotels" ON public.hotels
  FOR DELETE USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true));

-- Repeat for hotel_details and hotel_sections admin policies...
CREATE POLICY "Admins can insert hotel_details" ON public.hotel_details
  FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true));
CREATE POLICY "Admins can update hotel_details" ON public.hotel_details
  FOR UPDATE USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true));
CREATE POLICY "Admins can delete hotel_details" ON public.hotel_details
  FOR DELETE USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true));

CREATE POLICY "Admins can insert hotel_sections" ON public.hotel_sections
  FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true));
CREATE POLICY "Admins can update hotel_sections" ON public.hotel_sections
  FOR UPDATE USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true));
CREATE POLICY "Admins can delete hotel_sections" ON public.hotel_sections
  FOR DELETE USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true));

-- Comments: Everyone can read, authenticated can insert, authors can update/delete
CREATE POLICY "Public read access for comments" ON public.comments
  FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert comments" ON public.comments
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authors can update own comments" ON public.comments
  FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Authors can delete own comments" ON public.comments
  FOR DELETE USING (auth.uid() = author_id);

-- Comment Likes: Everyone can read, authenticated can insert/delete own
CREATE POLICY "Public read access for comment_likes" ON public.comment_likes
  FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert likes" ON public.comment_likes
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own likes" ON public.comment_likes
  FOR DELETE USING (auth.uid() = user_id);

-- Review Requests: Authenticated users can insert, read own. Admins can read/update all
CREATE POLICY "Users can view own review requests" ON public.review_requests
  FOR SELECT USING (auth.uid() = user_id OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true));
CREATE POLICY "Authenticated users can insert review requests" ON public.review_requests
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can update review requests" ON public.review_requests
  FOR UPDATE USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true));

-- Favorites: Users can manage their own favorites
CREATE POLICY "Users can manage own favorites" ON public.favorites
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email, is_admin, has_active_subscription)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'name',
    new.email,
    false,
    false
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
