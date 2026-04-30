"use client";

import { useAuth } from '@/lib/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { api, NewsItem } from '@/lib/api';
import { Button, Input, useToast } from '@/components/ui';
import Link from 'next/link';
import { ArrowLeft01Icon } from 'hugeicons-react';

function NewsFormContent() {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('id');
  const { success, error: showError } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    category: 'Обновление базы',
    content: '',
    imageUrl: '',
    publishedAt: new Date().toISOString().slice(0, 16) // Format: YYYY-MM-DDThh:mm
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user && !user.isAdmin) {
      router.push('/dashboard');
    } else if (editId) {
      let mounted = true;
      async function loadNews() {
        try {
          const newsList = await api.getAdminNews();
          const news = newsList.find((n: NewsItem) => n.id === editId);
          if (mounted && news) {
            setFormData({
              title: news.title,
              category: news.category,
              content: news.content,
              imageUrl: news.imageUrl || '',
              publishedAt: new Date(news.publishedAt).toISOString().slice(0, 16)
            });
          }
        } catch (error) {
           console.error("Error loading news:", error);
        }
      }
      loadNews();
      return () => { mounted = false; };
    }
  }, [user, router, editId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.content) return;

    const publishedDate = new Date(formData.publishedAt);
    if (isNaN(publishedDate.getTime())) {
      showError('Пожалуйста, введите корректную дату и время');
      return;
    }

    setIsSubmitting(true);
    try {
      await api.saveNews({
        id: editId || undefined,
        title: formData.title,
        category: formData.category,
        content: formData.content,
        imageUrl: formData.imageUrl || null,
        publishedAt: publishedDate.toISOString()
      });

      success(editId ? 'Новость обновлена' : 'Новость опубликована');
      router.refresh();
      router.push('/dashboard/admin/news');
    } catch (err) {
      console.error('Error saving news:', err);
      showError('Произошла ошибка при сохранении новости');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user || !user.isAdmin) return null;

  return (
    <div className="space-y-10">
      <Link href="/dashboard/admin/news" className="inline-flex items-center gap-2 text-secondary-text hover:text-primary-text transition-colors text-sm font-medium">
        <ArrowLeft01Icon size={16} /> Назад к списку
      </Link>

      <h1 className="font-moniqa text-[clamp(40px,5vw,72px)] text-primary-text leading-none">
        {editId ? 'Редактирование новости' : 'Новая публикация'}
      </h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-6 max-w-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Заголовок"
            required
            value={formData.title}
            onChange={e => setFormData({...formData, title: e.target.value})}
          />
          <Input
            label="Категория"
            required
            value={formData.category}
            onChange={e => setFormData({...formData, category: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-primary-text mb-2">Текст новости</label>
          <textarea
            required
            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-primary-text font-century-gothic text-base focus:outline-none focus:border-evergreen-forest transition-colors min-h-[200px] resize-y"
            value={formData.content}
            onChange={e => setFormData({...formData, content: e.target.value})}
          />
        </div>

        <Input
          label="URL изображения (опционально)"
          value={formData.imageUrl}
          onChange={e => setFormData({...formData, imageUrl: e.target.value})}
          placeholder="https://..."
        />

        <div className="w-1/2">
          <label className="block text-sm font-medium text-primary-text mb-2">Дата и время публикации</label>
          <input
            type="datetime-local"
            required
            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-primary-text font-century-gothic text-base focus:outline-none focus:border-evergreen-forest transition-colors"
            value={formData.publishedAt}
            onChange={e => setFormData({...formData, publishedAt: e.target.value})}
          />
          <p className="text-xs text-secondary-text mt-2">
            Установите дату в будущем для отложенной публикации.
          </p>
        </div>

        <div className="pt-6 border-t border-gray-100 flex justify-end gap-4">
          <Link href="/dashboard/admin/news">
            <Button type="button" variant="ghost" disabled={isSubmitting}>Отмена</Button>
          </Link>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Сохранение...' : (editId ? 'Сохранить изменения' : 'Опубликовать')}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default function NewsFormPage() {
  return (
    <Suspense fallback={<div className="p-8">Загрузка...</div>}>
      <NewsFormContent />
    </Suspense>
  );
}
