"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, X, Check, Delete } from "lucide-react";
import { PinDots } from "@/animations";

interface OfficerAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  title?: string;
  subtitle?: string;
}

export default function OfficerAuthModal({
  isOpen,
  onClose,
  onSuccess,
  title = "Officer Passcode",
  subtitle = "Enter 6-digit credential passcode to authenticate.",
}: OfficerAuthModalProps) {
  const [pin, setPin] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Accepted PINs: 424242, 004200, 123456, or any 6-digit sequence for seamless police demo
  const verifyPin = (candidate: string) => {
    if (["424242", "004200", "123456", "999999", "111111"].includes(candidate)) {
      setIsSuccess(true);
      setTimeout(() => {
        if (onSuccess) onSuccess();
        onClose();
        resetState();
      }, 500);
    } else {
      setIsError(true);
      setTimeout(() => {
        setPin("");
        setIsError(false);
      }, 700);
    }
  };

  const resetState = () => {
    setPin("");
    setIsError(false);
    setIsSuccess(false);
  };

  const handleDigit = (digit: string) => {
    if (pin.length < 6 && !isError && !isSuccess) {
      const nextPin = pin + digit;
      setPin(nextPin);
      if (nextPin.length === 6) {
        verifyPin(nextPin);
      }
    }
  };

  const handleBackspace = () => {
    if (!isError && !isSuccess) {
      setPin((prev) => prev.slice(0, -1));
    }
  };

  // Keyboard support for typing PIN
  useEffect(() => {
    if (!isOpen) {
      resetState();
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= "0" && e.key <= "9") {
        e.preventDefault();
        handleDigit(e.key);
      } else if (e.key === "Backspace") {
        e.preventDefault();
        handleBackspace();
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, pin, isError, isSuccess]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
        {/* Backdrop click */}
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative w-full max-w-[340px] p-8 rounded-2xl apple-vibrancy border border-apple-hairline shadow-apple-modal z-10 flex flex-col items-center text-center"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="absolute top-4 right-4 p-1.5 rounded-full text-apple-text-secondary hover:text-apple-text hover:bg-apple-surface-secondary transition-colors"
          >
            <X className="w-4 h-4" strokeWidth={1.5} />
          </button>

          {/* Calm Lock glyph */}
          <div className="w-12 h-12 rounded-full bg-apple-surface-secondary border border-apple-hairline flex items-center justify-center mb-4">
            <Lock className="w-5 h-5 text-apple-text" strokeWidth={1.5} />
          </div>

          <h2 className="text-[20px] font-semibold text-apple-text tracking-tight mb-1">
            {title}
          </h2>
          <p className="text-[13px] text-apple-text-secondary mb-8">
            {subtitle}
          </p>

          {/* 7. PIN MODAL DOTS (PinDots from animation kit) */}
          <div className="mb-8 text-apple-text">
            <PinDots length={6} filled={pin.length} error={isError} />
          </div>

          {/* Numeric keypad (calm, minimal circles) */}
          <div className="grid grid-cols-3 gap-3.5 w-full max-w-[240px]">
            {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((digit) => (
              <button
                key={digit}
                onClick={() => handleDigit(digit)}
                className="w-16 h-16 rounded-full bg-apple-surface-secondary hover:bg-apple-surface-tertiary active:scale-95 transition-all flex items-center justify-center text-[22px] font-normal text-apple-text mx-auto"
              >
                {digit}
              </button>
            ))}
            <div className="w-16 h-16 mx-auto flex items-center justify-center">
              {/* Demo hint */}
              <button
                onClick={() => {
                  setPin("424242");
                  verifyPin("424242");
                }}
                className="text-[11px] text-apple-blue hover:underline"
                title="Use demo PIN 424242"
              >
                Demo
              </button>
            </div>
            <button
              onClick={() => handleDigit("0")}
              className="w-16 h-16 rounded-full bg-apple-surface-secondary hover:bg-apple-surface-tertiary active:scale-95 transition-all flex items-center justify-center text-[22px] font-normal text-apple-text mx-auto"
            >
              0
            </button>
            <button
              onClick={handleBackspace}
              aria-label="Delete last digit"
              className="w-16 h-16 rounded-full hover:bg-apple-surface-secondary active:scale-95 transition-all flex items-center justify-center text-apple-text-secondary hover:text-apple-text mx-auto"
            >
              <Delete className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>

          <div className="mt-6 text-[12px] text-apple-text-tertiary">
            Demo passcode: <span className="font-mono text-apple-text-secondary">424242</span> or <span className="font-mono text-apple-text-secondary">123456</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
