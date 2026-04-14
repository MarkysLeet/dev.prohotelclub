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
        // Find all intersecting entries
        const intersecting = entries.filter((entry) => entry.isIntersecting);
        if (intersecting.length > 0) {
          // If multiple are intersecting, pick the one closest to the top
          // For simplicity in this mock, we just take the first one or we can sort
          const sorted = intersecting.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          setActiveSection(sorted[0].target.id);
        }
      },
      {
        // Adjust these margins to trigger earlier/later
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
      // Offset for sticky menu height
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="sticky top-0 z-40 bg-soft-sand/90 backdrop-blur-md border-b border-gray-200 py-4 shadow-sm mb-8 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <nav className="flex overflow-x-auto gap-6 no-scrollbar snap-x">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={cn(
                "whitespace-nowrap pb-2 text-sm font-medium transition-colors border-b-2 snap-start",
                activeSection === section.id
                  ? "text-evergreen-forest border-evergreen-forest"
                  : "text-secondary-text border-transparent hover:text-primary-text"
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
