"use client";

import { hotels } from '@/lib/mock-data';
import { Badge, Button } from '@/components/ui';
import { FavouriteIcon, ArrowRight01Icon } from 'hugeicons-react';
import Image from 'next/image';

export default function FavoritesPage() {
  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <h1 className="font-moniqa text-[clamp(40px,5vw,72px)] text-primary-text leading-none">
          Избранное
        </h1>
        <Badge variant="primary" className="text-sm">
          {hotels.length} сохранено
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {hotels.map((hotel) => (
          <div key={hotel.id} className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-cinematic border border-gray-100 flex flex-col h-full">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src={hotel.imageUrl}
                alt={hotel.name}
                fill
                className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute top-4 right-4 z-10">
                <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-evergreen-forest hover:bg-white hover:scale-110 transition-all shadow-sm">
                  <FavouriteIcon size={20} className="fill-evergreen-forest" />
                </button>
              </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
              <div className="flex flex-wrap gap-2 mb-4">
                {hotel.tags.slice(0, 2).map((tag, idx) => (
                  <Badge key={idx} variant="default" className="text-[10px]">
                    {tag}
                  </Badge>
                ))}
              </div>

              <h3 className="font-moniqa text-3xl text-primary-text mb-3 group-hover:text-evergreen-forest transition-colors">
                {hotel.name}
              </h3>

              <p className="text-secondary-text text-sm line-clamp-3 mb-6 flex-grow">
                {hotel.description}
              </p>

              <Button variant="ghost" className="w-full justify-between px-0 text-evergreen-forest group-hover:px-4 group-hover:bg-soft-sand transition-all">
                <span>Перейти к материалам</span>
                <ArrowRight01Icon size={18} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
