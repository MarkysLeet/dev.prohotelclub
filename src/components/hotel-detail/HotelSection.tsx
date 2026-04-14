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
    <div className="flex flex-col gap-4">
      <h2 className="font-moniqa text-4xl md:text-5xl font-medium text-primary-text mb-2">
        {section.title}
      </h2>
      <p className="font-century-gothic text-xl leading-relaxed text-primary-text">
        {section.content}
      </p>
      <HotelMediaSkeleton count={section.mediaCount} />
    </div>
  );

  return (
    <section id={section.id} className="scroll-mt-32 max-w-7xl mx-auto px-4 md:px-8 py-12 relative">
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
