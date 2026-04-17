"use client";

import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { storage } from '@/lib/storage';
import { Hotel } from '@/lib/mock-data';
import { Button } from '@/components/ui';
import Link from 'next/link';
import { ArrowLeft01Icon, PlusSignIcon, Edit01Icon } from 'hugeicons-react';
import Image from 'next/image';

export default function AdminHotelsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [hotels, setHotels] = useState<Hotel[]>([]);

  useEffect(() => {
    if (user && !user.isAdmin) {
      router.push('/dashboard');
    } else {
      const timer = setTimeout(() => {
        setHotels(storage.getHotels());
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [user, router]);

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
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
