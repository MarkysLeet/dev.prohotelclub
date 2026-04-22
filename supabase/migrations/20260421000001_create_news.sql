-- Create news table
CREATE TABLE public.news (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;

-- Policies for news
CREATE POLICY "Public read access for news" ON public.news
  FOR SELECT USING (true);
CREATE POLICY "Admins can insert news" ON public.news
  FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true));
CREATE POLICY "Admins can update news" ON public.news
  FOR UPDATE USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true));
CREATE POLICY "Admins can delete news" ON public.news
  FOR DELETE USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true));

INSERT INTO public.news (title, content, image_url) VALUES
('Открытие нового сезона', 'Мы рады объявить об открытии нового сезона и добавлении новых отелей в нашу базу. Следите за обновлениями!', 'https://placehold.co/800x400/F6EEE1/5A6B5D?text=News+1'),
('Обновление платформы', 'В новой версии платформы добавлена функция оставления комментариев с помощью клавиши Enter, а также исправлены мелкие ошибки.', 'https://placehold.co/800x400/F6EEE1/5A6B5D?text=News+2');
