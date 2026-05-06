"use client";

import React from 'react';
import { RefreshIcon, Alert01Icon } from 'hugeicons-react';
import { Button } from './Button';
import { motion } from 'framer-motion';

interface PageErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function PageErrorState({
  title = 'Произошла ошибка загрузки данных',
  message = 'Не удалось загрузить необходимые данные. Пожалуйста, попробуйте обновить страницу или повторить попытку позже.',
  onRetry
}: PageErrorStateProps) {
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-24 px-4 text-center w-full"
    >
      <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6 shadow-sm border border-red-100">
        <Alert01Icon size={32} className="text-red-500" strokeWidth={1.5} />
      </div>
      <h3 className="text-2xl font-medium text-primary-text mb-3 font-century-gothic">{title}</h3>
      <p className="text-secondary-text max-w-md mb-8 font-century-gothic leading-relaxed">
        {message}
      </p>
      <Button
        onClick={handleRetry}
        className="flex items-center gap-2"
      >
        <RefreshIcon size={18} />
        Обновить страницу
      </Button>
    </motion.div>
  );
}
