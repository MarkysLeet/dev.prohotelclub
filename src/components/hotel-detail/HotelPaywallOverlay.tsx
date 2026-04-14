"use client";

import React from 'react';
import { useToast } from '@/components/ui/Toast';
import { Locker01Icon } from 'hugeicons-react';

interface HotelPaywallOverlayProps {
  children: React.ReactNode;
}

export function HotelPaywallOverlay({ children }: HotelPaywallOverlayProps) {
  const { toast } = useToast();

  const handlePaywallClick = () => {
    toast('Имитация редиректа на страницу оформления Pro-подписки', { type: 'info' });
  };

  return (
    <div className="relative overflow-hidden rounded-2xl group cursor-pointer" onClick={handlePaywallClick}>
      {/* Размытый контент */}
      <div className="blur-md select-none opacity-60 pointer-events-none transition-opacity duration-300 group-hover:opacity-40">
        {children}
      </div>

      {/* Плашка блокировки */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="bg-white/90 backdrop-blur-sm px-8 py-6 rounded-2xl shadow-xl flex flex-col items-center gap-4 text-center max-w-sm mx-4 transform transition-transform duration-300 group-hover:scale-105 group-hover:shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-evergreen-forest/10 flex items-center justify-center text-evergreen-forest">
            <Locker01Icon size={32} />
          </div>
          <div>
            <h3 className="font-moniqa text-3xl font-medium text-primary-text mb-2">Закрытый контент</h3>
            <p className="text-secondary-text text-sm mb-4">
              Доступно только в Pro Hotel Club
            </p>
            <span className="inline-flex items-center justify-center px-6 py-3 bg-evergreen-forest text-soft-sand rounded-xl font-medium text-sm transition-colors group-hover:bg-evergreen-hover">
              Получить доступ
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
