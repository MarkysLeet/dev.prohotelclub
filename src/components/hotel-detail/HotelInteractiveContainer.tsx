"use client";

import React, { useState } from 'react';
import { HotelDetailData } from '@/lib/hotel-mock-data';
import { MapModal } from '@/components/ui/MapModal';
import { HotelSection } from './HotelSection';
import { api } from '@/lib/api';
import { useAuth } from '@/lib/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import * as HugeIcons from 'hugeicons-react';

interface HotelInteractiveContainerProps {
  hotelData: HotelDetailData;
}

// Helper to map string icon name to HugeIcons component
const getDynamicIcon = (iconName?: string, defaultId?: string) => {
        if (iconName && (HugeIcons as Record<string, React.ElementType>)[iconName]) {
        const IconComponent = (HugeIcons as Record<string, React.ElementType>)[iconName];
    return <IconComponent size={20} />;
  }

  // Fallback to legacy id-based mapping
  switch (defaultId) {
    case 'entrance': return <HugeIcons.Building03Icon size={20} />;
    case 'rooms': return <HugeIcons.BedSingle02Icon size={20} />;
    case 'dining': return <HugeIcons.Restaurant01Icon size={20} />;
    case 'bars': return <HugeIcons.Coffee02Icon size={20} />;
    case 'spa': return <HugeIcons.Tree02Icon size={20} />;
    case 'pools': return <HugeIcons.SwimmingIcon size={20} />;
    case 'beach': return <HugeIcons.WaveIcon size={20} />;
    case 'territory': return <HugeIcons.Location01Icon size={20} />;
    case 'entertainment': return <HugeIcons.FerrisWheelIcon size={20} />;
    case 'reviews': return <HugeIcons.MessageMultiple01Icon size={20} />;
    case 'pros-cons': return <HugeIcons.ThumbsUpIcon size={20} />;
    case 'resume': return <HugeIcons.Note01Icon size={20} />;
    default: return <HugeIcons.ArrowRight01Icon size={20} />;
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
              className={`flex flex-row items-center gap-3 p-3 px-4 rounded-xl border transition-all duration-300 group ${isActive ? 'bg-evergreen-forest border-evergreen-forest text-soft-sand shadow-md' : 'bg-white border-gray-100 text-primary-text hover:border-evergreen-forest/30 hover:shadow-sm'}`}
            >
              <div className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center transition-colors ${isActive ? 'bg-white/20' : 'bg-soft-sand group-hover:bg-evergreen-forest/10 text-evergreen-forest group-hover:text-evergreen-forest'}`}>
                {getDynamicIcon(section.icon, section.id)}
              </div>
              <span className="font-century-gothic font-medium text-sm text-left flex-1 line-clamp-2 leading-tight">
                {section.title}
              </span>
              <div className="shrink-0 ml-1">
                {isActive ? (
                   <HugeIcons.ArrowUp01Icon size={16} className="opacity-70" />
                ) : (
                   <HugeIcons.ArrowDown01Icon size={16} className="text-secondary-text opacity-50 group-hover:opacity-100 transition-opacity" />
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
