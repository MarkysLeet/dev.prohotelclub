CREATE TABLE public.tags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    icon TEXT NOT NULL DEFAULT 'StarIcon',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for tags" ON public.tags
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage tags" ON public.tags
    FOR ALL USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true));

-- Seed basic tags
INSERT INTO public.tags (name, icon) VALUES
    ('Для семьи', 'SmileIcon'),
    ('С животными', 'FavouriteIcon'),
    ('Премиум', 'Diamond01Icon'),
    ('Ultra All Inclusive', 'Diamond01Icon'),
    ('Первая линия', 'Sun01Icon')
ON CONFLICT (name) DO NOTHING;
