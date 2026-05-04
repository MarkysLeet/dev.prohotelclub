"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cancel01Icon } from 'hugeicons-react';
import { Button } from '@/components/ui';

interface ReviewRequestResponseModalProps {
  isOpen: boolean;
  type: 'approve' | 'reject';
  onClose: () => void;
  onSubmit: (reply?: string, scheduledDate?: string) => Promise<void>;
}

export function ReviewRequestResponseModal({ isOpen, type, onClose, onSubmit }: ReviewRequestResponseModalProps) {
  const [reply, setReply] = useState('');
  const [date, setDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (type === 'approve' && !date) return;
    if (type === 'reject' && !reply.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(
        reply.trim() ? reply.trim() : undefined,
        date ? new Date(date).toISOString() : undefined
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const isApprove = type === 'approve';
  const isValid = isApprove ? !!date : reply.trim().length > 0;

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
          <div className={`p-6 border-b border-gray-100 flex justify-between items-center ${isApprove ? 'bg-green-50' : 'bg-red-50'}`}>
            <h3 className="font-moniqa text-4xl text-primary-text leading-none mt-1">
              {isApprove ? 'Одобрить запрос' : 'Отклонить запрос'}
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
                {isApprove
                  ? 'Укажите дату, когда запланирован обзор. Пользователь получит уведомление с этой датой.'
                  : 'Укажите причину отказа. Пользователь получит уведомление с вашим комментарием.'}
              </p>

              {isApprove ? (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-primary-text font-century-gothic">
                    Дата обзора *
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-soft-sand/30 border border-gray-200 rounded-xl p-3 text-sm text-primary-text font-century-gothic focus:outline-none focus:border-evergreen-forest focus:ring-1 focus:ring-evergreen-forest transition-all"
                    required
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-primary-text font-century-gothic">
                    Причина отказа *
                  </label>
                  <textarea
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    placeholder="Опишите причину..."
                    className="w-full bg-soft-sand/30 border border-gray-200 rounded-xl p-3 text-sm text-primary-text font-century-gothic min-h-[100px] resize-none focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                    required
                  />
                </div>
              )}

              {isApprove && (
                <div className="space-y-2 mt-4">
                  <label className="text-sm font-medium text-primary-text font-century-gothic">
                    Комментарий (необязательно)
                  </label>
                  <textarea
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    placeholder="Дополнительная информация для пользователя..."
                    className="w-full bg-soft-sand/30 border border-gray-200 rounded-xl p-3 text-sm text-primary-text font-century-gothic min-h-[80px] resize-none focus:outline-none focus:border-evergreen-forest focus:ring-1 focus:ring-evergreen-forest transition-all"
                  />
                </div>
              )}
            </div>

            <div className="pt-4 flex gap-3">
              <Button type="button" variant="ghost" className="flex-1" onClick={onClose}>
                Отмена
              </Button>
              <Button type="submit" variant={isApprove ? 'primary' : 'danger'} disabled={!isValid || isSubmitting} className="flex-1">
                {isSubmitting ? 'Сохранение...' : (isApprove ? 'Одобрить' : 'Отклонить')}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
