"use client";

import React from 'react';
import { HotelSection as IHotelSection } from '@/lib/hotel-mock-data';
import { HotelMediaSkeleton } from './HotelMediaSkeleton';
import { HotelPaywallOverlay } from './HotelPaywallOverlay';

interface HotelSectionProps {
  isPro?: boolean;
  hotelSlug?: string;
  onPurchaseSuccess?: () => void;
  section: IHotelSection;
}

export function HotelSection({ section, isPro = false, hotelSlug, onPurchaseSuccess }: HotelSectionProps) {

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
      {section.mediaCount > 0 && <HotelMediaSkeleton count={section.mediaCount} />}
    </div>
  );

  return (
    <section className="pb-16 relative">
      {section.isPaywalled && !isPro ? (
        <HotelPaywallOverlay hotelSlug={hotelSlug} onPurchaseSuccess={onPurchaseSuccess}>
          {content}
        </HotelPaywallOverlay>
      ) : (
        content
      )}
    </section>
  );
}
