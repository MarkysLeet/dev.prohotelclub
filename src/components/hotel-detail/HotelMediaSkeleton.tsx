import React from 'react';
import { cn } from '@/lib/utils';

interface HotelMediaSkeletonProps {
  count: number;
}

export function HotelMediaSkeleton({ count }: HotelMediaSkeletonProps) {
  if (count <= 0) return null;

  // Функция для определения класса (layout) в зависимости от позиции
  // Имитируем асимметричную сетку
  const getItemClasses = (index: number, total: number) => {
    // Если всего 1 фото
    if (total === 1) return "col-span-full aspect-video";

    // Если 2 фото
    if (total === 2) return "col-span-1 aspect-[4/3]";

    // Если 3+ фото: делаем интересную раскладку
    const patternPos = index % 3;
    if (patternPos === 0) {
      // Большое фото
      return "col-span-2 row-span-2 aspect-[4/3] md:aspect-auto";
    } else {
      // Два маленьких фото сбоку
      return "col-span-1 row-span-1 aspect-square";
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mt-8">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "w-full bg-[#E8DFD1] rounded-3xl relative overflow-hidden",
            // Имитация деликатной пульсации
            "animate-pulse",
            getItemClasses(i, count)
          )}
        >
           {/* Декоративный элемент для вида "премиум плейсхолдера" */}
           <div className="absolute inset-0 border border-black/5 rounded-3xl pointer-events-none" />
           <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
        </div>
      ))}
    </div>
  );
}
