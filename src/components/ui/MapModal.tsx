"use client";

import React, { useEffect } from 'react';
import { Cancel01Icon } from 'hugeicons-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
  location: string;
}

export function MapModal({ isOpen, onClose, location }: MapModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-primary-text/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-soft-sand w-full max-w-4xl rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200/50 bg-white">
              <div>
                <h3 className="font-moniqa text-3xl text-primary-text leading-none">Карта</h3>
                <p className="font-century-gothic text-sm text-secondary-text mt-1">{location}</p>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-soft-sand text-evergreen-forest hover:bg-gray-100 transition-colors"
              >
                <Cancel01Icon size={20} />
              </button>
            </div>

            {/* Map Placeholder */}
            <div className="w-full h-[500px] bg-gray-200 relative">
              <iframe
                src={`https://maps.google.com/maps?q=${encodeURIComponent(location)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 grayscale contrast-125 opacity-90"
              ></iframe>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
