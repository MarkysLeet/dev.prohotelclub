"use client";

import React from 'react';
import { useToast } from '@/components/ui/Toast';
import Image from 'next/image';

interface HotelHeroProps {
  name: string;
  location: string;
  shootingDate: string;
  heroImage?: string;
}

export function HotelHero({ name, location, shootingDate, heroImage }: HotelHeroProps) {
  const { toast } = useToast();

  const handlePdfClick = () => {
    toast('Файл будет добавлен позже', { type: 'info' });
  };

  return (
    <section className="relative w-full h-[80vh] min-h-[600px] flex flex-col justify-end">
      {/* Background Image / Placeholder */}
      <div className="absolute inset-0 z-0 bg-gray-200">
        {heroImage ? (
          <Image
            src={heroImage}
            alt={name}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-evergreen-forest/5 flex items-center justify-center animate-pulse">
             <span className="text-secondary-text/30 font-century-gothic text-xl">Main Photo Placeholder</span>
          </div>
        )}
      </div>

      {/* Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 md:px-8 pb-16">
        <div className="flex flex-col gap-6 max-w-4xl">
          <div className="flex flex-col gap-3">
            <p className="text-white/80 text-sm md:text-base uppercase tracking-[0.2em] font-medium">
              {location} &bull; Съемка: {shootingDate}
            </p>
            <h1 className="font-moniqa text-6xl md:text-8xl lg:text-[140px] font-medium text-white leading-[0.85] tracking-tight">
              {name}
            </h1>
          </div>

          <div className="flex flex-wrap gap-4 mt-6">
            <button
              onClick={handlePdfClick}
              className="px-8 py-4 bg-evergreen-forest text-soft-sand rounded-xl font-medium transition-all hover:bg-evergreen-hover hover:scale-[1.02] duration-300 shadow-lg"
            >
              Сводный отчет (PDF)
            </button>
            <button
              onClick={handlePdfClick}
              className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/30 rounded-xl font-medium transition-all hover:bg-white/20 hover:border-white/50 hover:scale-[1.02] duration-300"
            >
              Концепция отеля (PDF)
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
