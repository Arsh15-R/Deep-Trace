"use client";

import React from "react";
import EvidenceHero3D from "@/components/EvidenceHero3D";

/**
 * High-performance 3D Wireframe / Matte Evidence Hero Scene.
 * Responsive, hardware-accelerated, zero heavy external bundle dependencies,
 * automatic light/dark theme adaptation, and pauses off-screen.
 */
export function Hero3D({ className, theme = "dark" }: { className?: string; theme?: "dark" | "light" }) {
  return (
    <div className={className}>
      <EvidenceHero3D />
    </div>
  );
}

export default Hero3D;
