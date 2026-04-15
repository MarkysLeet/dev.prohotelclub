"use client";

import React from 'react';
import { HotelSection as IHotelSection } from '@/lib/hotel-mock-data';
import { HotelMediaSkeleton } from './HotelMediaSkeleton';
import { HotelPaywallOverlay } from './HotelPaywallOverlay';

interface HotelSectionProps {
  section: IHotelSection;
}

export function HotelSection({ section }: HotelSectionProps) {
  // Имитация переменной (по ТЗ)
  const isPro = false;

  const content = (
    <div className="flex flex-col gap-8">
      <div className="max-w-3xl">
        <h2 className="font-moniqa text-5xl md:text-7xl font-medium text-primary-text mb-6 tracking-tight">
          {section.title}
        </h2>
        <p className="font-century-gothic text-xl md:text-2xl leading-loose text-secondary-text">
          {section.content}
        </p>
      </div>
      <HotelMediaSkeleton count={section.mediaCount} />
    </div>
  );

  // Удален max-w-7xl mx-auto px-4, так как теперь мы внутри сетки Two-Column Layout
  return (
    <section id={section.id} className="scroll-mt-32 py-16 relative border-b border-gray-200/50 last:border-0">
      {section.isPaywalled && !isPro ? (
        <HotelPaywallOverlay>
          {content}
        </HotelPaywallOverlay>
      ) : (
        content
      )}
    </section>
  );
}
