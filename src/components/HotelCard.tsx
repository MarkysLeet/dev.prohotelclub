"use client";

import { motion } from 'framer-motion';
import { Hotel } from '@/lib/mock-data';
import { Button } from '@/components/ui';
import { FavouriteIcon, Location01Icon, ArrowRight01Icon } from 'hugeicons-react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface HotelCardProps {
  hotel: Hotel;
  isFavorite: boolean;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  getTagIcon?: (tag: string) => ReactNode | null;
  layoutId?: string;
  variant?: 'collection' | 'dashboard';
  onTagClick?: (tag: string) => void;
}

export function HotelCard({
  hotel,
  isFavorite,
  onToggleFavorite,
  getTagIcon,
  variant = 'collection',
  onTagClick
}: HotelCardProps) {

  return (
    <motion.div
      layout

      className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 flex flex-col h-full hover:border-evergreen-forest/20"
    >
      {/* Image Area */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <Image
          src={hotel.imageUrl}
          alt={hotel.name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Favorite Button */}
        <button
          onClick={(e) => onToggleFavorite(hotel.id, e)}
          className={cn(
            "absolute top-4 right-4 z-10 p-2 rounded-full backdrop-blur-sm shadow-sm transition-all",
            variant === 'collection' ? "bg-white/90 hover:bg-white" : "bg-white/90 w-10 h-10 flex items-center justify-center hover:bg-white hover:scale-110"
          )}
        >
          <FavouriteIcon
            size={20}
            className={cn(
              "transition-colors",
              isFavorite ? "fill-red-500 text-red-500" : "text-secondary-text"
            )}
          />
        </button>

        {/* Location Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-white text-xs font-medium rounded-lg flex items-center gap-1.5">
            {variant === 'collection' && <Location01Icon size={12} />}
            {hotel.location}
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex flex-wrap gap-1.5 mb-4">
          {hotel.tags.slice(0, 3).map(tag => {
            const content = (
              <>
                {getTagIcon && getTagIcon(tag)} {tag}
              </>
            );
            const className = "inline-flex items-center gap-1 px-2 py-1 bg-soft-sand text-secondary-text text-[10px] font-medium rounded-md uppercase tracking-wider";

            if (onTagClick) {
              return (
                <button
                  key={tag}
                  onClick={(e) => {
                    e.preventDefault();
                    onTagClick(tag);
                  }}
                  className={cn(className, "hover:bg-evergreen-forest hover:text-white transition-colors cursor-pointer")}
                >
                  {content}
                </button>
              );
            }

            return (
              <span key={tag} className={className}>
                {content}
              </span>
            );
          })}
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

        {variant === 'collection' ? (
          <div className="mt-auto pt-4 border-t border-gray-100 flex flex-row items-center justify-between gap-2 flex-wrap">
            <Link href={hotel.link || `/hotels/${hotel.id}`} className="text-evergreen-forest text-sm font-medium flex items-center gap-2 hover:opacity-80 transition-opacity">
              Подробнее
            </Link>
            <Button variant="secondary" size="sm" className="h-9 px-4 text-xs rounded-lg">
              Материалы
            </Button>
          </div>
        ) : (
          <div className="mt-auto pt-4 border-t border-gray-100">
            <Link href={hotel.link || `/hotels/${hotel.id}`}>
              <Button variant="ghost" className="w-full justify-between px-0 text-evergreen-forest group-hover:px-4 group-hover:bg-soft-sand transition-all rounded-lg">
                <span>Перейти к материалам</span>
                <ArrowRight01Icon size={18} />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  );
}
