"use client";

import React, { useState } from 'react';
import { HotelDetailData } from '@/lib/hotel-mock-data';
import { MapModal } from '@/components/ui/MapModal';
import { HotelSection } from './HotelSection';
import { api } from '@/lib/api';
import { useAuth } from '@/lib/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building03Icon,
  BedSingle02Icon,
  Restaurant01Icon,
  Tree02Icon,
  SwimmingIcon,
  WaveIcon,
  FerrisWheelIcon,
  MessageMultiple01Icon,
  ThumbsUpIcon,
  Note01Icon,
  ArrowRight01Icon,
  ArrowDown01Icon,
  ArrowUp01Icon,
  Coffee02Icon,
  Location01Icon
} from 'hugeicons-react';

interface HotelInteractiveContainerProps {
  hotelData: HotelDetailData;
}

// Хелпер для подбора иконок по ID секции
const getIconForSection = (id: string) => {
  switch (id) {
    case 'entrance': return <Building03Icon size={24} />;
    case 'rooms': return <BedSingle02Icon size={24} />;
    case 'dining': return <Restaurant01Icon size={24} />;
    case 'bars': return <Coffee02Icon size={24} />;
    case 'spa': return <Tree02Icon size={24} />;
    case 'pools': return <SwimmingIcon size={24} />;
    case 'beach': return <WaveIcon size={24} />;
    case 'territory': return <Location01Icon size={24} />;
    case 'entertainment': return <FerrisWheelIcon size={24} />;
    case 'reviews': return <MessageMultiple01Icon size={24} />;
    case 'pros-cons': return <ThumbsUpIcon size={24} />;
    case 'resume': return <Note01Icon size={24} />;
    default: return <ArrowRight01Icon size={24} />;
  }
};

export function HotelInteractiveContainer({ hotelData }: HotelInteractiveContainerProps) {
  // По умолчанию ничего не открыто
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isHotelPurchased, setIsHotelPurchased] = useState(false);
  const { user } = useAuth();

  React.useEffect(() => {
    let mounted = true;
    async function checkPurchase() {
      if (user) {
        const purchased = await api.checkHotelAccess(hotelData.slug, user.id);
        if (mounted) setIsHotelPurchased(purchased);
      }
    }
    checkPurchase();
    return () => { mounted = false; };
  }, [hotelData.slug, user]);

  const activeSection = hotelData.sections.find(s => s.id === activeSectionId);

  // Глобальный слушатель для открытия карты из виджета в page.tsx (используем CustomEvent)
  React.useEffect(() => {
    const handleOpenMap = () => setIsMapOpen(true);
    const handleOpenSection = (e: CustomEvent<{ id: string }>) => {
      setActiveSectionId(e.detail.id);
      setTimeout(() => {
        document.getElementById('hotel-sections-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    };

    window.addEventListener('open-hotel-map', handleOpenMap);
    window.addEventListener('open-hotel-section', handleOpenSection as EventListener);

    return () => {
      window.removeEventListener('open-hotel-map', handleOpenMap);
      window.removeEventListener('open-hotel-section', handleOpenSection as EventListener);
    };
  }, []);

  const toggleSection = (id: string) => {
    if (activeSectionId === id) {
      setActiveSectionId(null); // Закрываем, если уже открыто
    } else {
      setActiveSectionId(id);
      // Небольшая задержка, чтобы контент успел отрендериться перед скроллом
      setTimeout(() => {
        document.getElementById('hotel-content-area')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  };

  return (
    <div className="flex flex-col gap-12" id="hotel-sections-grid">

      {/* Grid Navigation (Сетка карточек-кнопок) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {hotelData.sections.map((section) => {
          const isActive = activeSectionId === section.id;

          return (
            <button
              key={section.id}
              onClick={() => toggleSection(section.id)}
              className={`flex flex-col items-center justify-center p-6 rounded-2xl border transition-all duration-300 group ${
                isActive
                  ? 'bg-evergreen-forest border-evergreen-forest text-soft-sand shadow-md'
                  : 'bg-white border-gray-100 text-primary-text hover:border-evergreen-forest/30 hover:shadow-sm'
              }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-colors ${
                isActive ? 'bg-white/10' : 'bg-soft-sand group-hover:bg-evergreen-forest/5 text-evergreen-forest'
              }`}>
                {getIconForSection(section.id)}
              </div>
              <span className="font-century-gothic font-medium text-sm text-center">
                {section.title}
              </span>
              <div className="mt-3">
                {isActive ? (
                   <ArrowUp01Icon size={16} className="opacity-70" />
                ) : (
                   <ArrowDown01Icon size={16} className="text-secondary-text opacity-50 group-hover:opacity-100 transition-opacity" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      <div id="hotel-content-area" className="w-full">
        <AnimatePresence mode="wait">
          {activeSection && (
            <motion.div
              key={activeSection.id}
              initial={{ opacity: 0, y: -20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -20, height: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="bg-white rounded-3xl p-8 lg:p-12 border border-gray-100 shadow-sm mt-4">
                <HotelSection section={activeSection} isPro={user?.hasActiveSubscription || isHotelPurchased} hotelSlug={hotelData.slug} onPurchaseSuccess={() => setIsHotelPurchased(true)} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <MapModal
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        location={hotelData.location}
      />
    </div>
  );
}
