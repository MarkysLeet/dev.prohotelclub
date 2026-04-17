"use client";

import React, { useState } from 'react';
import { HotelDetailData } from '@/lib/hotel-mock-data';
import { StarIcon, WaveIcon, City01Icon, Location01Icon, GoogleIcon, Calendar01Icon, Restaurant01Icon } from 'hugeicons-react';
import { MapModal } from '@/components/ui/MapModal';
import { HotelSection } from './HotelSection';
import { motion, AnimatePresence } from 'framer-motion';

interface HotelInteractiveContainerProps {
  hotelData: HotelDetailData;
}

export function HotelInteractiveContainer({ hotelData }: HotelInteractiveContainerProps) {
  const [activeSectionId, setActiveSectionId] = useState<string>(hotelData.sections[0]?.id || '');
  const [isMapOpen, setIsMapOpen] = useState(false);

  const activeSection = hotelData.sections.find(s => s.id === activeSectionId);

  // Обработчики кликов по виджетам
  const handleGoogleRatingClick = () => {
    // В реальности здесь будет ссылка на Google Maps/Отзывы
    window.open(`https://www.google.com/maps/search/${encodeURIComponent(hotelData.name + ' ' + hotelData.location)}`, '_blank');
  };

  const handleLocationClick = () => {
    setIsMapOpen(true);
  };

  const handleDiningClick = () => {
    const diningSection = hotelData.sections.find(s => s.id === 'dining' || s.title.toLowerCase().includes('питан'));
    if (diningSection) {
      setActiveSectionId(diningSection.id);
      // Плавный скролл к блоку табов, чтобы юзер видел, что контент переключился
      document.getElementById('hotel-tabs')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleBeachClick = () => {
    const beachSection = hotelData.sections.find(s => s.id === 'beach' || s.title.toLowerCase().includes('пляж'));
    if (beachSection) {
      setActiveSectionId(beachSection.id);
      document.getElementById('hotel-tabs')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="flex flex-col gap-16">

      {/* Info Panel (Перенесенный из page.tsx для обеспечения интерактивности) */}
      <div className="w-full bg-white/70 backdrop-blur-md rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8 flex flex-col justify-between">
         <div className="space-y-6">
            <h3 className="font-moniqa text-3xl text-primary-text mb-2">Общая информация</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
              {/* Stars */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-soft-sand flex items-center justify-center text-evergreen-forest shrink-0">
                  <StarIcon size={20} className="fill-current" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-secondary-text font-semibold">Категория</p>
                  <p className="text-primary-text font-medium text-sm">{hotelData.stars || 5} звёзд</p>
                </div>
              </div>

              {/* Rating */}
              <div
                className="flex items-center gap-3 cursor-pointer group transition-all"
                onClick={handleGoogleRatingClick}
              >
                <div className="w-10 h-10 rounded-full bg-soft-sand flex items-center justify-center text-evergreen-forest shrink-0 group-hover:bg-evergreen-forest group-hover:text-soft-sand transition-colors">
                  <GoogleIcon size={20}  />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-secondary-text font-semibold">Google Rating</p>
                  <p className="text-primary-text font-medium text-sm group-hover:text-evergreen-forest transition-colors">{hotelData.googleRating || 4.8} / 5</p>
                </div>
              </div>

              {/* Distance to Sea */}
              <div
                className="flex items-center gap-3 cursor-pointer group transition-all"
                onClick={handleBeachClick}
              >
                <div className="w-10 h-10 rounded-full bg-soft-sand flex items-center justify-center text-evergreen-forest shrink-0 group-hover:bg-evergreen-forest group-hover:text-soft-sand transition-colors">
                  <WaveIcon size={20} />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-secondary-text font-semibold">До моря</p>
                  <p className="text-primary-text font-medium text-sm group-hover:text-evergreen-forest transition-colors">{hotelData.distanceToSea || "Первая линия"}</p>
                </div>
              </div>

              {/* Distance to City */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-soft-sand flex items-center justify-center text-evergreen-forest shrink-0">
                  <City01Icon size={20} />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-secondary-text font-semibold">До города</p>
                  <p className="text-primary-text font-medium text-sm">{hotelData.distanceToCity || "5 км"}</p>
                </div>
              </div>

              {/* Meal Plan */}
              <div
                className="flex items-center gap-3 cursor-pointer group transition-all"
                onClick={handleDiningClick}
              >
                <div className="w-10 h-10 rounded-full bg-soft-sand flex items-center justify-center text-evergreen-forest shrink-0 group-hover:bg-evergreen-forest group-hover:text-soft-sand transition-colors">
                  <Restaurant01Icon size={20} />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-secondary-text font-semibold">Питание</p>
                  <p className="text-primary-text font-medium text-sm group-hover:text-evergreen-forest transition-colors">{hotelData.mealPlan || "Ultra All Inclusive"}</p>
                </div>
              </div>

              {/* Build Year */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-soft-sand flex items-center justify-center text-evergreen-forest shrink-0">
                  <Calendar01Icon size={20} />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-secondary-text font-semibold">Год постройки</p>
                  <p className="text-primary-text font-medium text-sm">{hotelData.buildYear || 2024}</p>
                </div>
              </div>
            </div>
         </div>

         <div
           className="mt-8 pt-6 border-t border-gray-100 flex items-center gap-3 cursor-pointer group transition-all"
           onClick={handleLocationClick}
         >
            <div className="w-10 h-10 rounded-full bg-soft-sand flex items-center justify-center text-evergreen-forest shrink-0 group-hover:bg-evergreen-forest group-hover:text-soft-sand transition-colors">
              <Location01Icon size={20} />
            </div>
            <p className="text-sm text-secondary-text leading-tight group-hover:text-evergreen-forest transition-colors">
              <span className="block text-primary-text font-medium mb-0.5 group-hover:text-evergreen-forest transition-colors">Локация</span>
              {hotelData.location}
            </p>
         </div>
      </div>

      {/* Interactive Tabs and Content */}
      <div id="hotel-tabs" className="scroll-mt-24">
        {/* Tabs Navigation */}
        <div className="w-full bg-white/50 backdrop-blur-md p-2 rounded-2xl border border-gray-100 shadow-sm flex overflow-x-auto no-scrollbar mb-8">
          {hotelData.sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSectionId(section.id)}
              className={`whitespace-nowrap px-6 py-3 rounded-xl font-century-gothic text-sm font-medium transition-all duration-300 ${
                activeSectionId === section.id
                  ? 'bg-evergreen-forest text-soft-sand shadow-sm'
                  : 'text-secondary-text hover:text-primary-text hover:bg-white'
              }`}
            >
              {section.title}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="w-full min-h-[400px]">
          <AnimatePresence mode="wait">
            {activeSection && (
              <motion.div
                key={activeSection.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <HotelSection section={activeSection} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <MapModal
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        location={hotelData.location}
      />
    </div>
  );
}
