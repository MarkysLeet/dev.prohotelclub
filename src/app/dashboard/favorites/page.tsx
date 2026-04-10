"use client";

import { useMemo } from 'react';
import { hotels } from '@/lib/mock-data';
import { Button } from '@/components/ui';
import { HotelCard } from '@/components/HotelCard';
import { InformationCircleIcon } from 'hugeicons-react';
import Link from 'next/link';
import { useFavorites } from '@/lib/useFavorites';
import { motion, AnimatePresence } from 'framer-motion';

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites();

  const favoriteHotels = useMemo(() => {
    return hotels.filter(hotel => favorites.has(hotel.id));
  }, [favorites]);

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

      {favoriteHotels.length > 0 ? (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          <AnimatePresence>
            {favoriteHotels.map((hotel) => (
              <HotelCard
                key={hotel.id}
                hotel={hotel}
                isFavorite={favorites.has(hotel.id)}
                onToggleFavorite={(id) => toggleFavorite(id)}
                variant="dashboard"
              />
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
