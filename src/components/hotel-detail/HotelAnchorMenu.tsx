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
      // Offset for floating header
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <nav className="flex flex-col gap-4 sticky top-32">
      <h3 className="font-moniqa text-2xl text-secondary-text mb-4">Навигация</h3>
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
          className={cn(
            "text-left text-sm transition-all duration-300 relative pl-4 border-l-2 py-1",
            activeSection === section.id
              ? "text-evergreen-forest border-evergreen-forest font-semibold"
              : "text-secondary-text border-transparent hover:text-primary-text hover:border-gray-300"
          )}
        >
          {section.title}
        </button>
      ))}
    </nav>
  );
}
