"use client";

import { useState, useMemo, useEffect } from 'react';
import { useFavorites } from '@/lib/useFavorites';
import { motion, AnimatePresence } from 'framer-motion';
import { Hotel } from '@/lib/mock-data';
import { api } from '@/lib/api';
import Header from '@/components/Header';
import {
  Search01Icon,
  Location01Icon,
  FavouriteIcon,
  FilterIcon,
  SmileIcon,
  Diamond01Icon,
  Sun01Icon,
  InformationCircleIcon
} from 'hugeicons-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui';
import { HotelCard } from '@/components/HotelCard';
import { HotelCardSkeleton } from '@/components/HotelCardSkeleton';
import { PageErrorState } from '@/components/ui';
import { useAuth } from '@/lib/AuthContext';
import { useToast } from '@/components/ui/Toast';
import { useRouter } from 'next/navigation';

// import dynamic from 'next/dynamic';

import Footer from "@/components/Footer";
// Map tags to icons
const getTagIcon = (tag: string) => {
  switch (tag.toLowerCase()) {
    case 'для семьи': return <SmileIcon size={14} />;
    case 'с животными': return <FavouriteIcon size={14} />;
    case 'премиум':
    case 'ultra all inclusive': return <Diamond01Icon size={14} />;
    case 'первая линия': return <Sun01Icon size={14} />;
    default: return null;
  }
};

// const MapModal = dynamic(() => import("@/components/ui/MapModal"), { ssr: false });

export default function HotelsPage() {
  const { isAuth } = useAuth();
  const [hotelsList, setHotelsList] = useState<Hotel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function loadHotels() {
      setIsLoading(true);
      setIsError(false);
      try {
        const data = await api.getHotels();
        if (mounted) {
          setHotelsList(data);
        }
      } catch (err) {
        console.error("Failed to load hotels", err);
        if (mounted) {
          setIsError(true);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }
    loadHotels();
    return () => { mounted = false; };
  }, []);

  const LOCATIONS = useMemo(() => ['Все регионы', ...Array.from(new Set(hotelsList.map(h => h.location)))], [hotelsList]);
  const ALL_TAGS = useMemo(() => Array.from(new Set(hotelsList.flatMap(h => h.tags))), [hotelsList]);
  const { toast } = useToast();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('Все регионы');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const { favorites, toggleFavorite } = useFavorites();

  const handleToggleFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuth) {
      toast('Только авторизованные пользователи могут добавлять отели в избранное.', {
        type: 'info',
        action: {
          label: 'Авторизоваться',
          onClick: () => router.push('/auth')
        }
      });
      return;
    }
    toggleFavorite(id);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const filteredHotels = useMemo(() => {
    return hotelsList.filter(hotel => {
      const matchesSearch = hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           hotel.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLocation = selectedLocation === 'Все регионы' || hotel.location === selectedLocation;
      const matchesTags = selectedTags.length === 0 || selectedTags.every(tag => hotel.tags.includes(tag));

      return matchesSearch && matchesLocation && matchesTags;
    });
  }, [hotelsList, searchQuery, selectedLocation, selectedTags]);

  return (
    <div className="min-h-screen bg-soft-sand font-century-gothic flex flex-col">
      <Header />

      <main className="flex-1 pt-[80px] lg:pt-[100px] pb-24">
        <div className="max-w-[1920px] mx-auto px-6 lg:px-[35px]">

          {/* Filters Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12 space-y-6"
          >
            {/* Search & Location Row */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-secondary-text">
                  <Search01Icon size={20} strokeWidth={1.5} />
                </div>
                <input
                  type="text"
                  placeholder="Поиск по названию или описанию..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-gray-200 text-primary-text rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-evergreen-forest transition-colors shadow-sm"
                />
              </div>

              <div className="relative w-full sm:w-64 flex-shrink-0">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-secondary-text">
                  <Location01Icon size={20} strokeWidth={1.5} />
                </div>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full bg-white border border-gray-200 text-primary-text rounded-xl py-4 pl-12 pr-10 appearance-none focus:outline-none focus:border-evergreen-forest transition-colors shadow-sm cursor-pointer"
                >
                  {LOCATIONS.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-secondary-text">
                  <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Tags Row */}
            <div className="flex flex-wrap gap-2 items-center">
              <div className="flex items-center gap-2 text-secondary-text mr-2 text-sm font-medium">
                <FilterIcon size={16} /> Фильтры:
              </div>
              {ALL_TAGS.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border flex items-center gap-2",
                    selectedTags.includes(tag)
                      ? "bg-evergreen-forest border-evergreen-forest text-white"
                      : "bg-white border-gray-200 text-secondary-text hover:border-evergreen-forest hover:text-evergreen-forest"
                  )}
                >
                  {getTagIcon(tag)} {tag}
                </button>
              ))}
              {selectedTags.length > 0 && (
                <button
                  onClick={() => setSelectedTags([])}
                  className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                >
                  Сбросить
                </button>
              )}
            </div>
          </motion.div>

          {/* Grid Section */}
          {isError ? (
            <PageErrorState
              title="Не удалось загрузить каталог отелей"
              message="Произошла ошибка при получении данных. Проверьте подключение к интернету или попробуйте обновить страницу."
            />
          ) : isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {Array.from({ length: 8 }).map((_, i) => (
                <HotelCardSkeleton key={i} variant="collection" />
              ))}
            </div>
          ) : filteredHotels.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              <AnimatePresence>
                {filteredHotels.map((hotel) => (
                  <motion.div
                    layout
                    initial={{ opacity: 1, scale: 1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    key={hotel.id}
                    className="h-full"
                  >
                    <HotelCard
                      hotel={hotel}
                      isFavorite={favorites.has(hotel.id)}
                      onToggleFavorite={handleToggleFavorite}
                      getTagIcon={getTagIcon}
                      variant="collection"
                      onTagClick={toggleTag}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            /* Empty State */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-24 flex flex-col items-center justify-center text-center"
            >
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                <InformationCircleIcon size={32} className="text-secondary-text" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-medium text-primary-text mb-2">Ничего не найдено</h3>
              <p className="text-secondary-text max-w-md mb-8">
                По вашему запросу не найдено ни одного отеля. Попробуйте изменить параметры поиска или сбросить фильтры.
              </p>
              <Button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedLocation('Все регионы');
                  setSelectedTags([]);
                }}
              >
                Сбросить все фильтры
              </Button>
            </motion.div>
          )}

        </div>

    </main>
      <Footer />
      {/* MapModal logic will be integrated via context or separate state later if needed,
          but we render it safely here to test lazy loading */}
    </div>
  );
}
