"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft01Icon } from 'hugeicons-react';
import { cn } from '@/lib/utils';

export function HotelHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        <Link
          href="/hotels"
          className={cn(
            "flex items-center gap-2 font-medium transition-colors hover:opacity-70",
            scrolled ? "text-primary-text" : "text-white"
          )}
        >
          <ArrowLeft01Icon size={20} />
          Назад к каталогу
        </Link>
      </div>
    </header>
  );
}
