"use client";

import React from 'react';
import { ArrowLeft01Icon } from 'hugeicons-react';
import { useRouter } from 'next/navigation';

interface HotelHeaderProps {
  hotelName: string;
}

export function HotelHeader({ hotelName }: HotelHeaderProps) {
  const router = useRouter();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-soft-sand/90 backdrop-blur-xl border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-secondary-text hover:text-primary-text transition-colors text-sm font-medium pr-4 border-r border-gray-300"
        >
          <ArrowLeft01Icon size={20} />
          Назад
        </button>
        <div className="pl-4">
          <h2 className="font-moniqa text-2xl md:text-3xl font-medium text-primary-text leading-none tracking-wide pt-1">
            {hotelName}
          </h2>
        </div>
      </div>
    </header>
  );
}
