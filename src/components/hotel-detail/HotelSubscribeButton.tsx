"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Notification01Icon, Notification02Icon } from 'hugeicons-react';
import { api } from '@/lib/api';
import { useAuth } from '@/lib/AuthContext';
import { useToast } from '@/components/ui/Toast';

interface HotelSubscribeButtonProps {
  hotelSlug: string;
}

export function HotelSubscribeButton({ hotelSlug }: HotelSubscribeButtonProps) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { success, error } = useToast();

  useEffect(() => {
    let mounted = true;
    async function checkSubscription() {
      if (user) {
        const sub = await api.checkHotelSubscription(hotelSlug, user.id);
        if (mounted) setIsSubscribed(sub);
      }
      if (mounted) setIsLoading(false);
    }
    checkSubscription();
    return () => { mounted = false; };
  }, [hotelSlug, user]);

  const toggleSubscription = async () => {
    if (!user) {
      error('Необходимо авторизоваться для подписки');
      return;
    }

    setIsLoading(true);
    try {
      if (isSubscribed) {
        await api.unsubscribeFromHotel(hotelSlug, user.id);
        setIsSubscribed(false);
        success('Вы отписались от обновлений');
      } else {
        await api.subscribeToHotel(hotelSlug, user.id);
        setIsSubscribed(true);
        success('Вы подписаны на обновления');
      }
    } catch {
      error('Произошла ошибка, попробуйте еще раз');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return null;

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleSubscription}
      disabled={isLoading}
      className={`px-4 py-3 rounded-xl font-medium font-century-gothic text-sm transition-all duration-300 shadow-sm flex items-center justify-center gap-2 border ${
        isSubscribed
          ? 'bg-evergreen-forest text-soft-sand border-evergreen-forest hover:bg-evergreen-hover'
          : 'bg-white text-primary-text border-gray-200 hover:bg-gray-50'
      } ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
    >
      {isSubscribed ? <Notification01Icon size={18}  /> : <Notification02Icon size={18} />}
      {isSubscribed ? 'Вы подписаны' : 'Подписаться'}
    </motion.button>
  );
}
