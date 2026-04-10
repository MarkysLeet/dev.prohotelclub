"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Alert01Icon, CheckmarkCircle01Icon, Cancel01Icon } from 'hugeicons-react';
import { cn } from '@/lib/utils';

export type ToastType = 'success' | 'error' | 'info';

interface ToastAction {
  label: string;
  onClick: () => void;
}

interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
  action?: ToastAction;
}

interface ToastOptions {
  type?: ToastType;
  action?: ToastAction;
}

interface ToastContextType {
  toast: (message: string, options?: ToastOptions) => void;
  success: (message: string) => void;
  error: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const toast = useCallback((message: string, options: ToastOptions = {}) => {
    const id = Math.random().toString(36).substring(2, 9);
    const type = options.type || 'info';

    setToasts((prev) => [...prev, { id, message, type, action: options.action }]);

    // Если есть экшен, тост висит дольше (10 секунд вместо 5)
    const timeout = options.action ? 10000 : 5000;

    setTimeout(() => {
      removeToast(id);
    }, timeout);
  }, [removeToast]);

  const success = useCallback((message: string) => toast(message, { type: 'success' }), [toast]);
  const error = useCallback((message: string) => toast(message, { type: 'error' }), [toast]);

  return (
    <ToastContext.Provider value={{ toast, success, error }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "flex items-center gap-3 p-4 rounded-xl shadow-xl border pointer-events-auto max-w-sm w-full",
                t.type === 'success' && "bg-white border-green-200 text-primary-text",
                t.type === 'error' && "bg-white border-red-200 text-primary-text",
                t.type === 'info' && "bg-white border-gray-200 text-primary-text"
              )}
            >
              <div className="flex-shrink-0">
                {t.type === 'success' && <CheckmarkCircle01Icon className="text-green-500" size={24} />}
                {t.type === 'error' && <Alert01Icon className="text-red-500" size={24} />}
                {t.type === 'info' && <Alert01Icon className="text-evergreen-forest" size={24} />}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{t.message}</p>
                {t.action && (
                  <button
                    onClick={() => {
                      t.action?.onClick();
                      removeToast(t.id);
                    }}
                    className="mt-2 text-sm font-bold text-evergreen-forest hover:text-evergreen-hover transition-colors underline decoration-2 underline-offset-2"
                  >
                    {t.action.label}
                  </button>
                )}
              </div>

              <button
                onClick={() => removeToast(t.id)}
                className="ml-2 text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0 self-start mt-0.5"
              >
                <Cancel01Icon size={20} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
