"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

interface ToastItem {
  id: string;
  type: "success" | "error" | "info";
  message: string;
  description?: string;
}

type ToastListener = (toasts: ToastItem[]) => void;

let toasts: ToastItem[] = [];
const listeners: Set<ToastListener> = new Set();

function emit() {
  listeners.forEach((listener) => listener([...toasts]));
}

export const toast = {
  success: (message: string, options?: { description?: string }) => {
    const id = Math.random().toString(36).substring(2, 9);
    toasts = [...toasts, { id, type: "success", message, description: options?.description }];
    emit();
    setTimeout(() => {
      toasts = toasts.filter((t) => t.id !== id);
      emit();
    }, 4000);
    return id;
  },
  error: (message: string, options?: { description?: string }) => {
    const id = Math.random().toString(36).substring(2, 9);
    toasts = [...toasts, { id, type: "error", message, description: options?.description }];
    emit();
    setTimeout(() => {
      toasts = toasts.filter((t) => t.id !== id);
      emit();
    }, 4500);
    return id;
  },
  info: (message: string, options?: { description?: string }) => {
    const id = Math.random().toString(36).substring(2, 9);
    toasts = [...toasts, { id, type: "info", message, description: options?.description }];
    emit();
    setTimeout(() => {
      toasts = toasts.filter((t) => t.id !== id);
      emit();
    }, 4000);
    return id;
  },
  dismiss: (id: string) => {
    toasts = toasts.filter((t) => t.id !== id);
    emit();
  },
};

export function Toaster() {
  const [items, setItems] = useState<ToastItem[]>([]);

  useEffect(() => {
    const handler: ToastListener = (newToasts) => setItems(newToasts);
    listeners.add(handler);
    return () => {
      listeners.delete(handler);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm pointer-events-none">
      <AnimatePresence mode="popLayout">
        {items.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 16, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.2 } }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="pointer-events-auto rounded-2xl apple-vibrancy border border-apple-hairline p-4 shadow-apple-card flex items-start gap-3 text-apple-text select-none"
          >
            {t.type === "success" && (
              <CheckCircle2 className="w-5 h-5 text-apple-green shrink-0 mt-0.5" strokeWidth={1.5} />
            )}
            {t.type === "error" && (
              <AlertCircle className="w-5 h-5 text-apple-red shrink-0 mt-0.5" strokeWidth={1.5} />
            )}
            {t.type === "info" && (
              <Info className="w-5 h-5 text-apple-blue shrink-0 mt-0.5" strokeWidth={1.5} />
            )}

            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-medium leading-snug">{t.message}</div>
              {t.description && (
                <div className="text-[12px] text-apple-text-secondary mt-0.5 leading-snug">
                  {t.description}
                </div>
              )}
            </div>

            <button
              onClick={() => toast.dismiss(t.id)}
              className="text-apple-text-tertiary hover:text-apple-text p-1 -mr-1 -mt-1 rounded-full transition-colors"
            >
              <X className="w-3.5 h-3.5" strokeWidth={1.5} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
