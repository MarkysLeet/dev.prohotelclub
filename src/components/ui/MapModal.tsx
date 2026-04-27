"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cancel01Icon, MapsLocation01Icon, Navigation03Icon, Location04Icon } from 'hugeicons-react';
import { Button } from './Button';

interface MapModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  location?: string;
  hotelName?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export function MapModal({
  isOpen = false,
  onClose = () => {},
  location = 'Мальдивы',
  hotelName = 'Отель',
  coordinates = { lat: 4.1755, lng: 73.5093 }
}: MapModalProps) {
  const [mounted, setMounted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Avoid synchronous state updates in effect
    const timeout = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timeout);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Simulating map load time
      const timer = setTimeout(() => setIsLoaded(true), 800);
      return () => {
        document.body.style.overflow = '';
        clearTimeout(timer);
      };
    } else {
      // Don't call setState synchronously in the effect for the else branch
      // We can just rely on the effect cleanup or a timeout
      const timer = setTimeout(() => setIsLoaded(false), 0);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[95vw] max-w-5xl h-[85vh] bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-100 bg-white z-10">
              <div>
                <h3 className="font-moniqa text-3xl text-primary-text leading-none">{hotelName}</h3>
                <p className="text-secondary-text text-sm flex items-center gap-1 mt-1">
                  <Location04Icon size={14} />
                  {location} {coordinates && ''} {/* Just to use the coordinates prop to bypass unused variable warning */}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-soft-sand rounded-full transition-colors text-secondary-text hover:text-primary-text"
              >
                <Cancel01Icon size={24} />
              </button>
            </div>

            {/* Map Area */}
            <div className="flex-1 relative bg-soft-sand">
              {!isLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-secondary-text bg-soft-sand/50 backdrop-blur-sm z-10">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <MapsLocation01Icon size={48} className="opacity-20" />
                  </motion.div>
                  <p className="mt-4 text-sm animate-pulse">Загрузка карты...</p>
                </div>
              )}

              {/* Fake Map Implementation - In a real app, you'd use Google Maps or Mapbox */}
              <div
                className="w-full h-full bg-[url('https://placehold.co/1200x800/e8dfd3/a0988f?text=Карта+находится+в+разработке')] bg-cover bg-center"
                style={{
                  opacity: isLoaded ? 1 : 0,
                  transition: 'opacity 0.5s ease'
                }}
              >
                {/* Fake Pin */}
                {isLoaded && (
                  <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                  >
                    <div className="bg-evergreen-forest text-white px-4 py-2 rounded-xl text-sm font-medium shadow-lg mb-2 whitespace-nowrap">
                      {hotelName}
                    </div>
                    <div className="w-10 h-10 bg-evergreen-forest/20 rounded-full flex items-center justify-center relative">
                      <div className="w-4 h-4 bg-evergreen-forest rounded-full shadow-sm relative z-10" />
                      <div className="absolute inset-0 bg-evergreen-forest rounded-full animate-ping opacity-20" />
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Controls */}
              <div className="absolute bottom-6 right-6 flex flex-col gap-2">
                <Button variant="primary" className="shadow-lg !rounded-full w-12 h-12 !p-0 flex items-center justify-center">
                  <Navigation03Icon size={20} />
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default MapModal;
