"use client";

import { useState } from 'react';
import { userProfile } from '@/lib/mock-data';
import { Input, Button, useToast } from '@/components/ui';
import { UserIcon, Mail01Icon, Building04Icon } from 'hugeicons-react';

export default function ProfilePage() {
  const { success, error } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: userProfile.name,
    company: userProfile.company,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      if (formData.name.trim() === '') {
        error('Имя не может быть пустым');
        return;
      }
      success('Профиль успешно обновлен');
    }, 800);
  };

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
            <Button variant="ghost" size="sm" className="text-evergreen-forest">
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
                value={userProfile.email}
                disabled
                icon={<Mail01Icon size={20} />}
                readOnly
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
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Сохранение...' : 'Сохранить изменения'}
              </Button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}
