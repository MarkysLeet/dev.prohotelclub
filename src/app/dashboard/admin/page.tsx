"use client";

import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { Shield01Icon, Building04Icon, SentIcon, NewsIcon, UserMultipleIcon } from 'hugeicons-react';
import { Button } from '@/components/ui';

export default function AdminDashboard() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && !user.isAdmin) {
      router.push('/dashboard');
    }
  }, [user, router]);

  if (!user || !user.isAdmin) return null;

  return (
    <div className="space-y-10">
      <h1 className="font-moniqa text-[clamp(40px,5vw,72px)] text-primary-text leading-none flex items-center gap-4">
        <Shield01Icon size={48} className="text-[#D4AF37]" />
        Панель администратора
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Управление отелями */}
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-full bg-evergreen-forest/10 flex items-center justify-center mb-6">
              <Building04Icon size={24} className="text-evergreen-forest" />
            </div>
            <h2 className="text-xl font-medium text-primary-text mb-2">Управление отелями</h2>
            <p className="text-secondary-text mb-8">
              Добавляйте новые отели в базу данных, редактируйте существующую информацию, загружайте новые фотографии и управляйте тегами.
            </p>
          </div>
          <Link href="/dashboard/admin/hotels">
            <Button className="w-full justify-center">
              Перейти к отелям
            </Button>
          </Link>
        </div>

        {/* Управление новостями */}
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-full bg-evergreen-forest/10 flex items-center justify-center mb-6">
              <NewsIcon size={24} className="text-evergreen-forest" />
            </div>
            <h2 className="text-xl font-medium text-primary-text mb-2">Управление новостями</h2>
            <p className="text-secondary-text mb-8">
              Публикуйте обновления базы, отчеты с инспекций и новости платформы. Поддерживается отложенная публикация.
            </p>
          </div>
          <Link href="/dashboard/admin/news">
            <Button className="w-full justify-center">
              Перейти к новостям
            </Button>
          </Link>
        </div>

        {/* Управление пользователями */}
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-full bg-evergreen-forest/10 flex items-center justify-center mb-6">
              <UserMultipleIcon size={24} className="text-evergreen-forest" />
            </div>
            <h2 className="text-xl font-medium text-primary-text mb-2">Пользователи</h2>
            <p className="text-secondary-text mb-8">
              Просматривайте базу агентов, управляйте правами доступа (назначение администраторов) и удаляйте аккаунты.
            </p>
          </div>
          <Link href="/dashboard/admin/users">
            <Button className="w-full justify-center">
              Управление пользователями
            </Button>
          </Link>
        </div>

        {/* Запросы на обзоры */}
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mb-6">
              <SentIcon size={24} className="text-[#D4AF37]" />
            </div>
            <h2 className="text-xl font-medium text-primary-text mb-2">Запросы на обзоры</h2>
            <p className="text-secondary-text mb-8">
              Просматривайте запросы на новые обзоры отелей от пользователей с активной подпиской. Управляйте статусами заявок.
            </p>
          </div>
          <Link href="/dashboard/admin/requests">
            <Button variant="secondary" className="w-full justify-center border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/5">
              Смотреть запросы
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}