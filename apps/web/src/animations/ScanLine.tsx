"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Scanner sweep. Parent needs `relative overflow-hidden`. */
export function ScanLine({ active = true }: { active?: boolean }) {
  const reduce = useReducedMotion();
  if (!active || reduce) return null;
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute left-0 right-0 h-px"
      style={{
        background: "var(--fg)",
        boxShadow: "0 0 12px 2px color-mix(in srgb, var(--fg) 40%, transparent)",
      }}
      initial={{ top: "0%" }}
      animate={{ top: ["0%", "100%", "0%"] }}
      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}
