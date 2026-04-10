"use client";

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { hotels } from '@/lib/mock-data';
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
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui';

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

const LOCATIONS = ['Все регионы', ...Array.from(new Set(hotels.map(h => h.location)))];
const ALL_TAGS = Array.from(new Set(hotels.flatMap(h => h.tags)));

export default function HotelsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('Все регионы');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation if wrapped in a link later
    setFavorites(prev => {
      const newFavs = new Set(prev);
      if (newFavs.has(id)) {
        newFavs.delete(id);
      } else {
        newFavs.add(id);
      }
      return newFavs;
    });
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const filteredHotels = useMemo(() => {
    return hotels.filter(hotel => {
      const matchesSearch = hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           hotel.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLocation = selectedLocation === 'Все регионы' || hotel.location === selectedLocation;
      const matchesTags = selectedTags.length === 0 || selectedTags.every(tag => hotel.tags.includes(tag));

      return matchesSearch && matchesLocation && matchesTags;
    });
  }, [searchQuery, selectedLocation, selectedTags]);

  return (
    <div className="min-h-screen bg-soft-sand font-century-gothic flex flex-col">
      <Header />

      <main className="flex-1 pt-[80px] lg:pt-[100px] pb-24">
        <div className="max-w-[1920px] mx-auto px-6 lg:px-[35px]">

          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12 md:mb-16"
          >
            <h1 className="font-moniqa text-[clamp(48px,8vw,120px)] text-primary-text leading-none tracking-wide mb-4">
              Коллекция
            </h1>
            <p className="text-secondary-text text-lg max-w-2xl">
              Эксклюзивные отели Турции. Безупречный сервис, первоклассный отдых и привилегии для членов клуба.
            </p>
          </motion.div>

          {/* Filters Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12 space-y-6"
          >
            {/* Search & Location Row */}
            <div className="flex flex-col md:flex-row gap-4">
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

              <div className="relative md:w-64">
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
            <div className="flex flex-wrap gap-2">
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
          {filteredHotels.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              <AnimatePresence>
                {filteredHotels.map((hotel) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    key={hotel.id}
                    className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:border-evergreen-forest/20 flex flex-col"
                  >
                    {/* Image Area */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                      <Image
                        src={hotel.imageUrl}
                        alt={hotel.name}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Favorite Button */}
                      <button
                        onClick={(e) => toggleFavorite(hotel.id, e)}
                        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sm hover:bg-white transition-colors"
                      >
                        <FavouriteIcon
                          size={20}
                          className={cn(
                            "transition-colors",
                            favorites.has(hotel.id) ? "fill-red-500 text-red-500" : "text-secondary-text"
                          )}
                        />
                      </button>

                      {/* Location Badge */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-white text-xs font-medium rounded-lg flex items-center gap-1.5">
                          <Location01Icon size={12} /> {hotel.location}
                        </span>
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {hotel.tags.slice(0, 3).map(tag => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 px-2 py-1 bg-soft-sand text-secondary-text text-[10px] font-medium rounded-md uppercase tracking-wider"
                          >
                            {getTagIcon(tag)} {tag}
                          </span>
                        ))}
                        {hotel.tags.length > 3 && (
                          <span className="inline-flex items-center px-2 py-1 bg-soft-sand text-secondary-text text-[10px] font-medium rounded-md">
                            +{hotel.tags.length - 3}
                          </span>
                        )}
                      </div>

                      <h3 className="font-moniqa text-3xl text-primary-text mb-2 leading-none group-hover:text-evergreen-forest transition-colors">
                        {hotel.name}
                      </h3>

                      <p className="text-secondary-text text-sm line-clamp-3 mb-6 flex-1">
                        {hotel.description}
                      </p>

                      <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                        <Link href={`/hotels/${hotel.id}`} className="text-evergreen-forest text-sm font-medium flex items-center gap-2 hover:opacity-80 transition-opacity">
                          Подробнее
                        </Link>
                        <Button variant="secondary" size="sm" className="h-9 px-4 text-xs rounded-lg">
                          Материалы
                        </Button>
                      </div>
                    </div>
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
    </div>
  );
}
