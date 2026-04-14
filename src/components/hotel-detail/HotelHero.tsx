"use client";

import React from 'react';
import { useToast } from '@/components/ui/Toast';

interface HotelHeroProps {
  name: string;
  location: string;
  shootingDate: string;
}

export function HotelHero({ name, location, shootingDate }: HotelHeroProps) {
  const { toast } = useToast();

  const handlePdfClick = () => {
    toast('Файл будет добавлен позже', { type: 'info' });
  };

  return (
    <section className="pt-32 pb-16 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <p className="text-secondary-text text-sm uppercase tracking-wider font-semibold">
            {location} &bull; Съемка: {shootingDate}
          </p>
          <h1 className="font-moniqa text-6xl md:text-8xl lg:text-[120px] font-medium text-primary-text leading-none tracking-tight">
            {name}
          </h1>
        </div>

        <div className="flex flex-wrap gap-4 mt-4">
          <button
            onClick={handlePdfClick}
            className="px-6 py-3 bg-evergreen-forest text-soft-sand rounded-xl font-medium transition-colors hover:bg-evergreen-hover duration-200"
          >
            Сводный отчет (PDF)
          </button>
          <button
            onClick={handlePdfClick}
            className="px-6 py-3 bg-white text-primary-text border border-gray-200 rounded-xl font-medium transition-colors hover:border-evergreen-forest hover:text-evergreen-forest duration-200"
          >
            Концепция отеля (PDF)
          </button>
        </div>
      </div>
    </section>
  );
}
