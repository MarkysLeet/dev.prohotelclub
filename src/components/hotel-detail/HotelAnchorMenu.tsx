"use client";

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { HotelSection } from '@/lib/hotel-mock-data';

interface HotelAnchorMenuProps {
  sections: HotelSection[];
}

export function HotelAnchorMenu({ sections }: HotelAnchorMenuProps) {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.filter((entry) => entry.isIntersecting);
        if (intersecting.length > 0) {
          const sorted = intersecting.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          setActiveSection(sorted[0].target.id);
        }
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0.1,
      }
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="sticky top-0 z-40 bg-soft-sand/80 backdrop-blur-xl border-b border-gray-200/50 py-5 transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <nav className="flex overflow-x-auto gap-8 no-scrollbar snap-x">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={cn(
                "whitespace-nowrap pb-1 text-[15px] font-medium transition-all duration-300 border-b-[3px] snap-start uppercase tracking-wider",
                activeSection === section.id
                  ? "text-evergreen-forest border-evergreen-forest"
                  : "text-secondary-text/70 border-transparent hover:text-primary-text hover:border-gray-300"
              )}
            >
              {section.title}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
