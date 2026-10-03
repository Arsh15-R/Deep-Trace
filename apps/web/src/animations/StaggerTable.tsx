import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, stagger } from "./motion";

/**
 * Staggered table body. Change `animateKey` (e.g. the active filter string)
 * to replay the stagger when the filtered rows change.
 */
export function StaggerTBody({
  children,
  animateKey,
  className,
}: {
  children: ReactNode;
  animateKey?: string;
  className?: string;
}) {
  return (
    <motion.tbody
      key={animateKey}
      className={className}
      variants={stagger(0.04)}
      initial="hidden"
      animate="show"
    >
      {children}
    </motion.tbody>
  );
}

export function StaggerRow({
  children,
  className,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <motion.tr
      variants={fadeUp}
      className={className}
      onClick={onClick}
      whileHover={{ backgroundColor: "var(--apple-surface-secondary)" }}
      transition={{ duration: 0.15 }}
    >
      {children}
    </motion.tr>
  );
}
