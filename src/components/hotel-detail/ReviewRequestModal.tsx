"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cancel01Icon } from 'hugeicons-react';
import { Button } from '@/components/ui';

interface ReviewRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reason: string) => Promise<void>;
  hotelName: string;
}

const PREDEFINED_REASONS = [
  "Была реновация",
  "Сменился менеджмент",
  "Произошёл инцидент",
  "Устаревшие данные",
];

export function ReviewRequestModal({ isOpen, onClose, onSubmit, hotelName }: ReviewRequestModalProps) {
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [customReason, setCustomReason] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const finalReason = selectedReason === 'Другое' ? customReason.trim() : selectedReason;
    if (!finalReason) return;

    setIsSubmitting(true);
    try {
      await onSubmit(finalReason);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  const isValid = selectedReason && (selectedReason !== 'Другое' || customReason.trim().length > 0);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
        >
          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-soft-sand/30">
            <h3 className="font-moniqa text-4xl text-primary-text leading-none mt-1">
              Запросить обзор
            </h3>
            <button
              onClick={onClose}
              className="text-secondary-text hover:text-primary-text transition-colors"
            >
              <Cancel01Icon size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div>
              <p className="text-sm text-secondary-text font-century-gothic mb-4">
                Укажите причину запроса обзора для отеля <strong className="text-primary-text">{hotelName}</strong>. Администратор рассмотрит ваш запрос и свяжется с вами.
              </p>

              <div className="space-y-3">
                {PREDEFINED_REASONS.map(reason => (
                  <label key={reason} className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center w-5 h-5 rounded-full border border-gray-300 group-hover:border-evergreen-forest transition-colors">
                      {selectedReason === reason && (
                        <motion.div layoutId="radio" className="w-2.5 h-2.5 rounded-full bg-evergreen-forest" />
                      )}
                    </div>
                    <input
                      type="radio"
                      name="reason"
                      value={reason}
                      checked={selectedReason === reason}
                      onChange={(e) => setSelectedReason(e.target.value)}
                      className="sr-only"
                    />
                    <span className="text-sm font-medium text-primary-text group-hover:text-evergreen-forest transition-colors">
                      {reason}
                    </span>
                  </label>
                ))}

                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center w-5 h-5 rounded-full border border-gray-300 group-hover:border-evergreen-forest transition-colors">
                    {selectedReason === 'Другое' && (
                      <motion.div layoutId="radio" className="w-2.5 h-2.5 rounded-full bg-evergreen-forest" />
                    )}
                  </div>
                  <input
                    type="radio"
                    name="reason"
                    value="Другое"
                    checked={selectedReason === 'Другое'}
                    onChange={(e) => setSelectedReason(e.target.value)}
                    className="sr-only"
                  />
                  <span className="text-sm font-medium text-primary-text group-hover:text-evergreen-forest transition-colors">
                    Другое
                  </span>
                </label>
              </div>
            </div>

            <AnimatePresence>
              {selectedReason === 'Другое' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <textarea
                    value={customReason}
                    onChange={(e) => setCustomReason(e.target.value)}
                    placeholder="Опишите причину подробно..."
                    className="w-full bg-soft-sand/30 border border-gray-200 rounded-xl p-3 text-sm text-primary-text font-century-gothic min-h-[100px] resize-none focus:outline-none focus:border-evergreen-forest focus:ring-1 focus:ring-evergreen-forest transition-all"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="pt-4 flex gap-3">
              <Button type="button" variant="ghost" className="flex-1" onClick={onClose}>
                Отмена
              </Button>
              <Button type="submit" disabled={!isValid || isSubmitting} className="flex-1">
                {isSubmitting ? 'Отправка...' : 'Отправить запрос'}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
