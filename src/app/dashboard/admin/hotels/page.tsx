"use client";

import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Hotel } from '@/lib/mock-data';
import { Button , PageErrorState } from '@/components/ui';
import Link from 'next/link';
import { ArrowLeft01Icon, PlusSignIcon, Edit01Icon, Delete01Icon } from 'hugeicons-react';
import Image from 'next/image';

export default function AdminHotelsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (user && !user.isAdmin) {
      router.push('/dashboard');
    } else {
      let mounted = true;
      async function loadHotels() {
        setIsLoading(true);
        setIsError(false);
        try {
          const data = await api.getHotels();
          if (mounted) setHotels(data);
        } catch (err) {
          console.error("Failed to load", err);
          if (mounted) setIsError(true);
        } finally {
          if (mounted) setIsLoading(false);
        }
      }
      loadHotels();
      return () => { mounted = false; };
    }
  }, [user, router]);

  const handleDelete = async (id: string) => {
    if (confirm('Вы уверены, что хотите удалить этот отель? Это действие необратимо.')) {
      await api.deleteHotel(id);
      const data = await api.getHotels();
      setHotels(data);
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
          Управление отелями
        </h1>
        <Link href="/dashboard/admin/hotels/form">
          <Button className="flex items-center gap-2">
            <PlusSignIcon size={20} />
            Добавить отель
          </Button>
        </Link>
      </div>

      {isError ? (
        <PageErrorState
          title="Ошибка загрузки отелей"
          message="Не удалось загрузить список отелей. Пожалуйста, попробуйте обновить страницу."
        />
      ) : isLoading ? (
        <div className="py-12 flex justify-center">
            <div className="w-8 h-8 border-4 border-evergreen-forest/20 border-t-evergreen-forest rounded-full animate-spin"></div>
        </div>
      ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {hotels.map(hotel => (
          <div key={hotel.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
            <div className="relative h-48 w-full bg-gray-100">
              <Image 
                src={hotel.imageUrl.startsWith('http') ? hotel.imageUrl : `https://placehold.co/800x600/F6EEE1/5A6B5D?text=${encodeURIComponent(hotel.name)}`} 
                alt={hotel.name} 
                fill 
                className="object-cover" 
              />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-moniqa text-2xl text-primary-text leading-none">{hotel.name}</h3>
                <span className="text-xs font-medium text-secondary-text bg-soft-sand px-2 py-1 rounded">{hotel.location}</span>
              </div>
              <p className="text-sm text-secondary-text mb-6 line-clamp-2 flex-1">{hotel.description}</p>
              
              <div className="flex gap-2 mt-auto pt-4 border-t border-gray-50">
                <Link href={`/dashboard/admin/hotels/form?id=${hotel.id}`} className="flex-1">
                  <Button variant="secondary" className="w-full flex justify-center gap-2" size="sm">
                    <Edit01Icon size={16} /> Редактировать
                  </Button>
                </Link>
                <Button
                  variant="dangerOutline"
                  className="px-3"
                  size="sm"
                  onClick={() => handleDelete(hotel.id)}
                  title="Удалить отель"
                >
                  <Delete01Icon size={16} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      )}
    </div>
  );
}