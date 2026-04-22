"use client";

import React, { useState } from 'react';
import { useToast } from '@/components/ui/Toast';
import { Locker01Icon } from 'hugeicons-react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { useAuth } from '@/lib/AuthContext';

interface HotelPaywallOverlayProps {
  children: React.ReactNode;
  hotelSlug?: string;
  onPurchaseSuccess?: () => void;
}

export function HotelPaywallOverlay({ children, hotelSlug, onPurchaseSuccess }: HotelPaywallOverlayProps) {
  const { success, error: toastError } = useToast();
  const router = useRouter();
  const { user } = useAuth();
  const [isBuying, setIsBuying] = useState(false);

  const handleSubscribe = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push('/dashboard/subscription');
  };

  const handleBuyHotel = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      toastError('Необходимо авторизоваться для покупки');
      router.push('/auth');
      return;
    }
    if (!hotelSlug) return;

    setIsBuying(true);
    try {
      const { success: purchaseSuccess } = await api.buyHotelAccess(hotelSlug, user.id);
      if (purchaseSuccess) {
        success('Доступ к отелю успешно приобретен!');
        if (onPurchaseSuccess) onPurchaseSuccess();
      } else {
        toastError('Произошла ошибка при покупке');
      }
    } catch {
      toastError('Ошибка сети');
    } finally {
      setIsBuying(false);
    }
  };

  return (
    <div className="relative group cursor-pointer" >
      {/* Размытый контент с плавным затуханием снизу */}
      <div
        className="blur-md select-none opacity-60 pointer-events-none transition-opacity duration-300 group-hover:opacity-40"
        style={{
          // Изящное затухание (mask) к низу, чтобы контент не обрывался резко
          WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)'
        }}
      >
        {children}
      </div>

      {/* Плашка блокировки */}
      <div className="absolute inset-0 flex items-center justify-center z-10 -mt-10">
        <div className="bg-white/95 backdrop-blur-md px-10 py-8 rounded-3xl shadow-[0_20px_50px_rgba(46,75,47,0.1)] flex flex-col items-center gap-4 text-center max-w-sm mx-4 transform transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-[0_30px_60px_rgba(46,75,47,0.15)] border border-gray-100">
          <div className="w-20 h-20 rounded-full bg-evergreen-forest/[0.08] flex items-center justify-center text-evergreen-forest mb-2">
            <Locker01Icon size={36} strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="font-moniqa text-4xl font-medium text-primary-text mb-3">Закрытый контент</h3>
            <p className="text-secondary-text text-[15px] mb-6 font-century-gothic">
              Эта информация доступна по подписке или при покупке отдельного отеля.
            </p>
            <div className="flex flex-col gap-3 w-full">
              <button
                onClick={handleSubscribe}
                className="inline-flex items-center justify-center w-full py-3.5 bg-evergreen-forest text-soft-sand rounded-xl font-medium text-sm transition-colors hover:bg-evergreen-hover"
              >
                Оформить подписку
              </button>
              <button
                onClick={handleBuyHotel}
                disabled={isBuying}
                className="inline-flex items-center justify-center w-full py-3.5 bg-white text-evergreen-forest border border-gray-200 rounded-xl font-medium text-sm transition-colors hover:bg-gray-50 hover:border-gray-300 disabled:opacity-50"
              >
                {isBuying ? 'Покупка...' : 'Купить доступ (250 руб.)'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
