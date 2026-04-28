"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { api } from '@/lib/api';
import { Input, Button, useToast, Skeleton } from '@/components/ui';
import { UserIcon, Mail01Icon, Building04Icon } from 'hugeicons-react';

export default function ProfilePage() {
  const { user, refreshUser, isLoading: isAuthLoading } = useAuth();
  const { success, error } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        company: user.company || '',
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (formData.name.trim() === '') {
      error('Имя не может быть пустым');
      return;
    }

    setIsSaving(true);
    try {
      await api.updateProfileData(user.id, formData.name, formData.company);
      await refreshUser();
      success('Профиль успешно обновлен');
    } catch {
      error('Ошибка при сохранении профиля');
    } finally {
      setIsSaving(false);
    }
  };

  if (isAuthLoading) {
    return (
      <div className="space-y-10">
        <Skeleton className="h-16 w-64 rounded-lg" />
        <div className="bg-white rounded-xl shadow-sm p-8 lg:p-10 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-10 items-start">
            <div className="shrink-0 flex flex-col items-center gap-4">
              <Skeleton className="w-32 h-32 rounded-full" />
              <Skeleton className="h-8 w-24" />
            </div>
            <div className="flex-1 w-full space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
              <Skeleton className="h-12 w-full" />
              <div className="pt-4 flex justify-end">
                <Skeleton className="h-12 w-48" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <h1 className="font-moniqa text-[clamp(40px,5vw,72px)] text-primary-text leading-none">
        Мой профиль
      </h1>

      <div className="bg-white rounded-xl shadow-sm p-8 lg:p-10 border border-gray-100">
        <div className="flex flex-col md:flex-row gap-10 items-start">

          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-4 shrink-0">
            <div className="w-32 h-32 rounded-full bg-soft-sand flex items-center justify-center border-2 border-evergreen-forest/20 text-evergreen-forest">
              <UserIcon size={48} strokeWidth={1.5} />
            </div>
            <Button variant="ghost" size="sm" className="text-evergreen-forest" disabled>
              Изменить фото
            </Button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex-1 w-full space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Имя"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                icon={<UserIcon size={20} />}
                placeholder="Введите ваше имя"
              />
              <Input
                label="Email"
                value={user?.email || ''}
                disabled
                icon={<Mail01Icon size={20} />}
                readOnly
                className="bg-gray-50 text-gray-500 cursor-not-allowed"
              />
            </div>

            <Input
              label="Компания / Агентство"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              icon={<Building04Icon size={20} />}
              placeholder="Название компании"
            />

            <div className="pt-4 flex justify-end">
              <Button type="submit" disabled={isSaving || (formData.name === user?.name && formData.company === user?.company)}>
                {isSaving ? 'Сохранение...' : 'Сохранить изменения'}
              </Button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}
