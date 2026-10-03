import { motion } from "framer-motion";

/** iOS-style passcode dots. `error` toggles a shake. Use inside your PIN modal. */
export function PinDots({ length = 6, filled, error }: { length?: number; filled: number; error?: boolean }) {
  return (
    <motion.div
      style={{ display: "flex", gap: 14, justifyContent: "center" }}
      animate={error ? { x: [0, -10, 10, -8, 8, -4, 4, 0] } : { x: 0 }}
      transition={{ duration: 0.4 }}
    >
      {Array.from({ length }).map((_, i) => (
        <motion.span
          key={i}
          animate={{ scale: i < filled ? 1 : 0.85, backgroundColor: i < filled ? "currentColor" : "transparent" }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          style={{ width: 14, height: 14, borderRadius: 999, border: "1.5px solid currentColor", display: "inline-block" }}
        />
      ))}
    </motion.div>
  );
}
