"use client";

import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { api, NewsItem } from '@/lib/api';
import { Button, Badge , PageErrorState } from '@/components/ui';
import Link from 'next/link';
import { ArrowLeft01Icon, PlusSignIcon, Edit01Icon, Delete01Icon } from 'hugeicons-react';

export default function AdminNewsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);



  useEffect(() => {
    if (user && !user.isAdmin) {
      router.push('/dashboard');
    } else {
      let mounted = true;
      async function loadNewsData() {
        const data = await api.getAdminNews();
        if (mounted) setNewsList(data);
      }
      loadNewsData();
      return () => { mounted = false; };
    }
  }, [user, router]);

  const handleDelete = async (id: string) => {
    if (confirm('Вы уверены, что хотите удалить эту новость?')) {
      await api.deleteNews(id);
      const data = await api.getAdminNews();
      setNewsList(data);
    }
  };

  if (!user || !user.isAdmin) return null;

  return (
    <div className="space-y-10">
      <Link href="/dashboard/admin" className="inline-flex items-center gap-2 text-secondary-text hover:text-primary-text transition-colors text-sm font-medium">
        <ArrowLeft01Icon size={16} /> Назад в панель
      </Link>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="font-moniqa text-[clamp(40px,5vw,72px)] text-primary-text leading-none">
          Управление новостями
        </h1>
        <Link href="/dashboard/admin/news/form">
          <Button className="flex items-center gap-2">
            <PlusSignIcon size={20} />
            Опубликовать новость
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {newsList.length === 0 ? (
          <div className="p-10 text-center text-secondary-text">
            Новостей пока нет.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-soft-sand/50 border-b border-gray-100">
                  <th className="p-4 font-medium text-sm text-secondary-text">Заголовок</th>
                  <th className="p-4 font-medium text-sm text-secondary-text">Категория</th>
                  <th className="p-4 font-medium text-sm text-secondary-text">Статус / Дата публикации</th>
                  <th className="p-4 font-medium text-sm text-secondary-text text-right">Действия</th>
                </tr>
              </thead>
              <tbody>
                {newsList.map((news: NewsItem) => {
                  const isPublished = new Date(news.publishedAt) <= new Date();
                  return (
                    <tr key={news.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                      <td className="p-4 font-medium text-primary-text max-w-xs truncate">{news.title}</td>
                      <td className="p-4 text-sm text-secondary-text">{news.category}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Badge variant={isPublished ? 'success' : 'warning'}>
                            {isPublished ? 'Опубликовано' : 'Отложено'}
                          </Badge>
                          <span className="text-sm text-secondary-text">
                            {new Date(news.publishedAt).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex gap-2 justify-end">
                          <Link href={`/dashboard/admin/news/form?id=${news.id}`}>
                            <Button size="sm" variant="secondary" className="px-3">
                              <Edit01Icon size={16} />
                            </Button>
                          </Link>
                          <Button size="sm" variant="dangerOutline" className="px-3" onClick={() => handleDelete(news.id)}>
                            <Delete01Icon size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}