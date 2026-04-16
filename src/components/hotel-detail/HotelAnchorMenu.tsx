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
      // Offset for floating header (64px) + some breathing room (32px) = 96px
      const y = el.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full max-h-full overflow-y-auto no-scrollbar pb-8 bg-white/50 backdrop-blur-md p-6 rounded-2xl border border-gray-100 shadow-sm">
      <h3 className="font-century-gothic text-xs font-semibold text-secondary-text uppercase tracking-widest mb-6">Навигация</h3>
      <nav className="flex flex-col gap-4">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={cn(
              "text-left font-century-gothic text-sm transition-all duration-300 relative pl-4 py-1 group",
              activeSection === section.id
                ? "text-evergreen-forest font-bold"
                : "text-secondary-text hover:text-primary-text"
            )}
          >
            {/* Active Line */}
            {activeSection === section.id && (
              <span className="absolute left-0 top-0 bottom-0 w-[2px] bg-evergreen-forest rounded-full" />
            )}
            {/* Inactive Line Hover */}
            {activeSection !== section.id && (
              <span className="absolute left-0 top-1 bottom-1 w-[1px] bg-gray-200 group-hover:bg-gray-400 group-hover:w-[2px] transition-all rounded-full" />
            )}

            {section.title}
          </button>
        ))}
      </nav>
    </div>
  );
}
