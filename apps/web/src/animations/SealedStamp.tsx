import { motion } from "framer-motion";
import { EASE } from "./motion";

/** Circle draws, check strokes in, then a "SEALED" stamp lands. */
export function SealedStamp({ label = "SEALED", className }: { label?: string; className?: string }) {
  return (
    <div className={className} style={{ display: "inline-flex", alignItems: "center", gap: 14 }}>
      <svg width="72" height="72" viewBox="0 0 96 96" fill="none" aria-hidden="true">
        <motion.circle
          cx="48"
          cy="48"
          r="40"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          style={{ rotate: -90, transformOrigin: "48px 48px" }}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.7, ease: EASE }}
        />
        <motion.path
          d="M30 50 L43 63 L68 36"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.6, duration: 0.4, ease: EASE }}
        />
      </svg>
      <motion.span
        initial={{ opacity: 0, scale: 1.7, rotate: -14 }}
        animate={{ opacity: 1, scale: 1, rotate: -6 }}
        transition={{ delay: 1, type: "spring", stiffness: 420, damping: 22 }}
        style={{
          border: "2px solid currentColor",
          padding: "4px 12px",
          borderRadius: 6,
          fontWeight: 700,
          letterSpacing: "0.14em",
          fontSize: 14,
        }}
      >
        {label}
      </motion.span>
    </div>
  );
}
