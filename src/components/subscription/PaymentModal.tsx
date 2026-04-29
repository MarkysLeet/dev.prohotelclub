"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cancel01Icon, CreditCardIcon } from 'hugeicons-react';
import { Button } from '@/components/ui';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  planTitle: string;
  planPrice: string;
}

export function PaymentModal({ isOpen, onClose, onSuccess, planTitle, planPrice }: PaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    // Имитация процесса оплаты (заглушка)
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsProcessing(false);
    onSuccess();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Фон */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[110]"
          />

          {/* Модальное окно */}
          <div className="fixed inset-0 flex items-center justify-center z-[120] p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden pointer-events-auto"
            >
              {/* Шапка */}
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-moniqa text-3xl text-primary-text">Оформление подписки</h3>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-gray-100 text-secondary-text flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <Cancel01Icon size={20} />
                </button>
              </div>

              {/* Содержимое */}
              <div className="p-6 space-y-6">
                <div className="bg-soft-sand rounded-xl p-4 flex justify-between items-center border border-gray-100">
                  <div>
                    <p className="text-sm text-secondary-text mb-1">Тариф</p>
                    <p className="font-medium text-primary-text">{planTitle}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-secondary-text mb-1">Сумма к оплате</p>
                    <p className="font-medium text-primary-text text-lg">{planPrice}</p>
                  </div>
                </div>


                <div className="space-y-4">
                  <p className="text-sm text-secondary-text mb-4">
                    Введите данные карты для симуляции оплаты.
                  </p>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-secondary-text mb-1">Номер карты</label>
                      <input
                        type="text"
                        placeholder="0000 0000 0000 0000"
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-evergreen-forest/50"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-secondary-text mb-1">Срок действия</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-evergreen-forest/50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-secondary-text mb-1">CVC</label>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-evergreen-forest/50"
                        />
                      </div>
                    </div>
                  </div>

                  <Button
                    className="w-full flex items-center justify-center gap-2 mt-6"
                    onClick={handlePayment}
                    disabled={isProcessing}
                  >
                    <CreditCardIcon size={20} />
                    {isProcessing ? "Обработка платежа..." : "Оплатить (Тест)"}
                  </Button>
                </div>

              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
