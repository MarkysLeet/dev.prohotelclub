"use client";

import { useAuth } from '@/lib/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { storage } from '@/lib/storage';
import { Hotel } from '@/lib/mock-data';
import { Button, Input, useToast } from '@/components/ui';
import Link from 'next/link';
import { ArrowLeft01Icon } from 'hugeicons-react';

function HotelFormContent() {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('id');
  const { success } = useToast();

  const [formData, setFormData] = useState<Partial<Hotel>>({
    name: '',
    location: '',
    description: '',
    imageUrl: '',
    tags: []
  });

  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (user && !user.isAdmin) {
      router.push('/dashboard');
    } else if (editId) {
      const timer = setTimeout(() => {
        const hotels = storage.getHotels();
        const hotel = hotels.find(h => h.id === editId);
        if (hotel) {
          setFormData(hotel);
        }
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [user, router, editId]);

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags?.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...(prev.tags || []), tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter(tag => tag !== tagToRemove) || []
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.location || !formData.description) {
      return; // Add validation toast in real app
    }

    const id = editId || `hotel_${Date.now()}`;
    const slug = id; // simplified

    const hotelToSave: Hotel = {
      id,
      name: formData.name,
      location: formData.location,
      description: formData.description,
      imageUrl: formData.imageUrl || `https://placehold.co/800x600/F6EEE1/5A6B5D?text=${encodeURIComponent(formData.name)}`,
      tags: formData.tags || [],
      link: `/hotels/${slug}`
    };

    storage.saveHotel(hotelToSave);
    
    // Также создаем базовые данные для детальной страницы, если это новый отель
    if (!editId) {
      storage.saveHotelDetail({
        slug,
        name: hotelToSave.name,
        location: hotelToSave.location,
        shootingDate: new Date().toLocaleDateString('ru-RU'),
        heroImage: hotelToSave.imageUrl,
        stars: 5,
        distanceToSea: 'Не указано',
        distanceToCity: 'Не указано',
        googleRating: 5.0,
        buildYear: new Date().getFullYear(),
        mealPlan: 'Не указано',
        sections: []
      });
    }

    success(editId ? 'Отель обновлен' : 'Новый отель добавлен');
    router.push('/dashboard/admin/hotels');
  };

  if (!user || !user.isAdmin) return null;

  return (
    <div className="space-y-10">
      <Link href="/dashboard/admin/hotels" className="inline-flex items-center gap-2 text-secondary-text hover:text-primary-text transition-colors text-sm font-medium">
        <ArrowLeft01Icon size={16} /> Назад к списку
      </Link>

      <h1 className="font-moniqa text-[clamp(40px,5vw,72px)] text-primary-text leading-none">
        {editId ? 'Редактирование отеля' : 'Новый отель'}
      </h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-6 max-w-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input 
            label="Название отеля" 
            required 
            value={formData.name} 
            onChange={e => setFormData({...formData, name: e.target.value})} 
          />
          <Input 
            label="Локация (регион)" 
            required 
            value={formData.location} 
            onChange={e => setFormData({...formData, location: e.target.value})} 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-primary-text mb-2">Описание</label>
          <textarea 
            required
            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-primary-text font-century-gothic text-base focus:outline-none focus:border-evergreen-forest transition-colors min-h-[120px] resize-y"
            value={formData.description}
            onChange={e => setFormData({...formData, description: e.target.value})}
          />
        </div>

        <Input 
          label="URL изображения (опционально)" 
          value={formData.imageUrl} 
          onChange={e => setFormData({...formData, imageUrl: e.target.value})} 
          placeholder="https://..."
        />

        <div>
          <label className="block text-sm font-medium text-primary-text mb-2">Теги</label>
          <div className="flex gap-2 mb-3 flex-wrap">
            {formData.tags?.map(tag => (
              <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 bg-soft-sand rounded-full text-sm">
                {tag}
                <button type="button" onClick={() => handleRemoveTag(tag)} className="text-secondary-text hover:text-red-500">&times;</button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <Input 
              value={tagInput} 
              onChange={e => setTagInput(e.target.value)} 
              placeholder="Например: Для семьи" 
              onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
            />
            <Button type="button" variant="secondary" onClick={handleAddTag} className="shrink-0">
              Добавить тег
            </Button>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-100 flex justify-end gap-4">
          <Link href="/dashboard/admin/hotels">
            <Button type="button" variant="ghost">Отмена</Button>
          </Link>
          <Button type="submit">
            {editId ? 'Сохранить изменения' : 'Создать отель'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default function HotelFormPage() {
  return (
    <Suspense fallback={<div className="p-8">Загрузка...</div>}>
      <HotelFormContent />
    </Suspense>
  );
}
