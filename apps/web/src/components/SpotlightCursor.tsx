/**
 * SpotlightCursor — Awwwards-Winning Interactive Ambient Spotlight
 * Tracks mouse position and creates a smooth, floating radial light follower
 * Developer: Daksh Walia, B.Tech AIML, CGC Mohali
 */

"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function SpotlightCursor() {
  const [mounted, setMounted] = useState(false);

  // Smooth springs for cursor position with elastic damping
  const springX = useSpring(-200, { stiffness: 120, damping: 20 });
  const springY = useSpring(-200, { stiffness: 120, damping: 20 });

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      springX.set(e.clientX);
      springY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [springX, springY]);

  if (!mounted) return null;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
      style={{
        background: `radial-gradient(650px circle at var(--mouse-x, -200px) var(--mouse-y, -200px), rgba(217, 217, 217, 0.04), rgba(188, 186, 180, 0.02) 40%, transparent 80%)`,
      }}
    >
      {/* Dynamic Specular Orb that tracks exactly under the cursor */}
      <motion.div
        className="pointer-events-none fixed w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[90px] opacity-20"
        style={{
          left: springX,
          top: springY,
          background: "radial-gradient(circle, rgba(245, 245, 245, 0.12) 0%, rgba(188, 186, 180, 0.06) 50%, transparent 70%)",
        }}
      />
    </motion.div>
  );
}
