"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Cancel01Icon, ArrowLeft01Icon, ArrowRight01Icon } from 'hugeicons-react';

interface HotelMediaGalleryProps {
  images: string[];
}

export function HotelMediaGallery({ images }: HotelMediaGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!images || images.length === 0) return null;

  const handleOpen = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);

  };

  const handleClose = () => {
    setIsOpen(false);

  };

  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const displayImages = images.slice(0, 3);
  const remainingCount = images.length - 3;

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mt-8">
        {displayImages.map((src, i) => {
          let layoutClass = "col-span-1 aspect-square";
          if (images.length === 1) layoutClass = "col-span-full aspect-video";
          else if (images.length === 2) layoutClass = "col-span-1 aspect-[4/3]";
          else if (images.length >= 3 && i === 0) layoutClass = "col-span-2 row-span-2 aspect-[4/3] md:aspect-auto h-full";

          const isLastAndHasMore = i === 2 && remainingCount > 0;

          return (
            <div
              key={i}
              onClick={() => handleOpen(i)}
              className={cn(
                "relative rounded-3xl overflow-hidden cursor-pointer group bg-gray-50",
                layoutClass
              )}
            >
              <Image
                src={src}
                alt={`Image ${i + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {isLastAndHasMore && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center transition-colors group-hover:bg-black/60">
                  <span className="text-white font-moniqa text-4xl tracking-widest">
                    +{remainingCount}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[110] bg-black/95 flex items-center justify-center p-4 md:p-8"
            onClick={handleClose}
          >
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 p-3 text-white/70 hover:text-white transition-colors z-10"
            >
              <Cancel01Icon size={32} />
            </button>

            {images.length > 1 && (
              <button
                onClick={showPrev}
                className="absolute left-4 md:left-12 p-3 text-white/50 hover:text-white transition-colors z-10"
              >
                <ArrowLeft01Icon size={40} />
              </button>
            )}

            <div
              className="relative w-full max-w-6xl h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[currentIndex]}
                alt={`Gallery image ${currentIndex + 1}`}
                fill
                className="object-contain"
                priority
              />
            </div>

            {images.length > 1 && (
              <button
                onClick={showNext}
                className="absolute right-4 md:right-12 p-3 text-white/50 hover:text-white transition-colors z-10"
              >
                <ArrowRight01Icon size={40} />
              </button>
            )}

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 font-century-gothic tracking-widest text-sm">
              {currentIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
