"use client";

import { useMemo, useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Hotel } from '@/lib/mock-data';
import { Button } from '@/components/ui';
import { HotelCard } from '@/components/HotelCard';
import { HotelCardSkeleton } from '@/components/HotelCardSkeleton';
import { PageErrorState } from '@/components/ui';
import { InformationCircleIcon } from 'hugeicons-react';
import Link from 'next/link';
import { useFavorites } from '@/lib/useFavorites';
import { motion, AnimatePresence } from 'framer-motion';

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function loadHotels() {
      setIsLoading(true);
      setIsError(false);
      try {
        const data = await api.getHotels();
        if (mounted) setHotels(data);
      } catch(err) { console.error(err);
        if(mounted) setIsError(true);
      } finally {
        if(mounted) setIsLoading(false);
      }
    }
    loadHotels();
    return () => { mounted = false; };
  }, []);

  const favoriteHotels = useMemo(() => {
    return hotels.filter(hotel => favorites.has(hotel.id));
  }, [favorites, hotels]);

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="font-moniqa text-[clamp(40px,5vw,72px)] text-primary-text leading-none">
          Избранное
        </h1>
        {favoriteHotels.length > 0 && (
          <span className="px-4 py-1.5 bg-white border border-gray-100 rounded-full text-sm font-medium text-secondary-text shadow-sm w-fit">
            Сохранено: <span className="text-primary-text">{favoriteHotels.length}</span>
          </span>
        )}
      </div>

      {isError ? (
        <PageErrorState title="Ошибка загрузки избранного" message="Не удалось загрузить список избранных отелей. Пожалуйста, попробуйте обновить страницу." />
      ) : isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <HotelCardSkeleton key={i} variant="dashboard" />
          ))}
        </div>
      ) : favoriteHotels.length > 0 ? (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          <AnimatePresence>
            {favoriteHotels.map((hotel) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                key={hotel.id}
                className="h-full"
              >
                <HotelCard
                  hotel={hotel}
                  isFavorite={favorites.has(hotel.id)}
                  onToggleFavorite={(id) => toggleFavorite(id)}
                  variant="dashboard"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-xl border border-gray-100 p-12 flex flex-col items-center justify-center text-center shadow-sm h-[400px]"
        >
          <div className="w-20 h-20 bg-soft-sand rounded-full flex items-center justify-center mb-6">
            <InformationCircleIcon size={32} className="text-secondary-text" strokeWidth={1.5} />
          </div>
          <h3 className="text-2xl font-medium text-primary-text mb-2">Нет сохраненных отелей</h3>
          <p className="text-secondary-text max-w-md mb-8">
            Вы еще не добавили ни одного отеля в избранное. Перейдите в коллекцию, чтобы найти лучшие предложения.
          </p>
          <Link href="/hotels">
            <Button>
              Перейти в коллекцию
            </Button>
          </Link>
        </motion.div>
      )}
    </div>
  );
}
