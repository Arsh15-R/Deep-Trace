"use client";

import { motion } from "framer-motion";
import { EASE } from "./motion";

export type CustodyStep = { title: string; detail: string; time: string };

/** Vertical line draws down; each step appears in sequence. */
export function CustodyTimeline({ steps, stepDelay = 0.45 }: { steps: CustodyStep[]; stepDelay?: number }) {
  return (
    <ol className="relative list-none p-0 m-0">
      <motion.span
        aria-hidden
        className="absolute left-[11px] top-2 w-px pointer-events-none"
        style={{ background: "var(--line)", height: "calc(100% - 24px)", transformOrigin: "top" }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: steps.length * stepDelay, ease: "linear" }}
      />
      {steps.map((s, i) => (
        <motion.li
          key={s.title + i}
          className="relative pb-8 pl-10"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * stepDelay, duration: 0.4, ease: EASE }}
        >
          <motion.span
            className="absolute left-0 top-0.5 grid h-6 w-6 place-items-center rounded-full text-[11px] font-semibold"
            style={{ background: "var(--fg)", color: "var(--bg)" }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * stepDelay, type: "spring", stiffness: 500, damping: 25 }}
          >
            {i + 1}
          </motion.span>
          <div className="text-sm font-medium text-[var(--fg)]">{s.title}</div>
          <p className="mt-1 text-sm text-[var(--muted)] leading-relaxed">{s.detail}</p>
          <div className="mt-1 font-mono text-xs text-[var(--subtle)]">{s.time}</div>
        </motion.li>
      ))}
    </ol>
  );
}
