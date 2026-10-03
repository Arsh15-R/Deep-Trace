"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import type { ReactNode } from "react";
import { spring } from "./motion";

/** Right-side slide-over (macOS inspector style). Esc or overlay click closes. */
export function CaseDrawer({
  open,
  onClose,
  title,
  subtitle,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="overlay"
          className="fixed inset-0 z-40"
          style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />
      )}
      {open && (
        <motion.aside
          key="drawer"
          role="dialog"
          aria-modal="true"
          aria-label={title}
          className="fixed right-0 top-0 z-50 h-full w-full max-w-[480px] overflow-y-auto p-6"
          style={{ background: "var(--bg)", borderLeft: "1px solid var(--line)" }}
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={spring}
        >
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-[var(--fg)]">{title}</h2>
              {subtitle && (
                <p className="mt-1 text-sm text-[var(--muted)]">
                  {subtitle}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              className="rounded-md px-2.5 py-1 text-xs font-mono transition-colors hover:bg-[var(--hover)]"
              style={{ border: "1px solid var(--line)", color: "var(--muted)" }}
            >
              Esc
            </button>
          </div>
          {children}
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
