/**
 * BiometricFaceMeshOverlay — Animated Neural Landmark HUD
 * Renders 68 facial landmark tracking points, bounding reticles, and scanning laser
 * Developer: Daksh Walia, B.Tech AIML, CGC Mohali
 */

"use client";

import { motion } from "framer-motion";

interface BiometricFaceMeshOverlayProps {
  detected?: boolean;
  score?: number;
  engine?: string;
  className?: string;
}

export default function BiometricFaceMeshOverlay({
  detected = true,
  score = 94,
  engine = "Runway Gen-3 / DeepFaceLab",
  className = "",
}: BiometricFaceMeshOverlayProps) {
  // 32 Key Facial Landmark Points (relative percentage coordinates)
  const landmarkPoints = [
    // Jawline
    { x: 25, y: 55 }, { x: 28, y: 70 }, { x: 38, y: 82 }, { x: 50, y: 88 }, { x: 62, y: 82 }, { x: 72, y: 70 }, { x: 75, y: 55 },
    // Eyebrows
    { x: 32, y: 35 }, { x: 38, y: 32 }, { x: 44, y: 35 },
    { x: 56, y: 35 }, { x: 62, y: 32 }, { x: 68, y: 35 },
    // Eyes
    { x: 34, y: 42 }, { x: 42, y: 42 }, { x: 38, y: 44 },
    { x: 58, y: 42 }, { x: 66, y: 42 }, { x: 62, y: 44 },
    // Nose bridge and tip
    { x: 50, y: 40 }, { x: 50, y: 50 }, { x: 50, y: 58 }, { x: 45, y: 62 }, { x: 55, y: 62 },
    // Mouth
    { x: 40, y: 72 }, { x: 50, y: 70 }, { x: 60, y: 72 }, { x: 50, y: 76 }
  ];

  return (
    <div className={`relative w-full h-full pointer-events-none select-none overflow-hidden ${className}`}>
      {/* Laser Scanning Beam */}
      <motion.div
        animate={{ top: ["0%", "95%", "0%"] }}
        transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
        className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#FF6500] to-transparent shadow-[0_0_12px_#FF6500] z-20"
      />

      {/* Outer Bounding Box with Corner Brackets */}
      <div className="absolute inset-4 border border-[#FF6500]/30 rounded-lg">
        {/* Top-Left Bracket */}
        <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-[#FF6500]" />
        {/* Top-Right Bracket */}
        <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-[#FF6500]" />
        {/* Bottom-Left Bracket */}
        <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-[#FF6500]" />
        {/* Bottom-Right Bracket */}
        <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-[#FF6500]" />
      </div>

      {/* SVG Facial Landmarks Mesh */}
      <svg className="absolute inset-0 w-full h-full z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Connecting Mesh Lines */}
        <polyline
          points="25,55 28,70 38,82 50,88 62,82 72,70 75,55"
          fill="none"
          stroke="rgba(255, 101, 0, 0.4)"
          strokeWidth="0.5"
          strokeDasharray="1,1"
        />
        <polyline
          points="32,35 38,32 44,35"
          fill="none"
          stroke="rgba(6, 182, 212, 0.5)"
          strokeWidth="0.5"
        />
        <polyline
          points="56,35 62,32 68,35"
          fill="none"
          stroke="rgba(6, 182, 212, 0.5)"
          strokeWidth="0.5"
        />
        <polyline
          points="50,40 50,58 45,62 55,62 50,58"
          fill="none"
          stroke="rgba(212, 175, 55, 0.4)"
          strokeWidth="0.5"
        />
        <polygon
          points="40,72 50,70 60,72 50,76"
          fill="rgba(255, 101, 0, 0.1)"
          stroke="rgba(255, 101, 0, 0.6)"
          strokeWidth="0.5"
        />

        {/* Animated Landmark Nodes */}
        {landmarkPoints.map((pt, idx) => (
          <circle
            key={idx}
            cx={pt.x}
            cy={pt.y}
            r="1"
            className="fill-[#FF6500]"
          >
            <animate
              attributeName="r"
              values="0.8;1.5;0.8"
              dur={`${1.5 + (idx % 3) * 0.4}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.4;1;0.4"
              dur={`${1.5 + (idx % 3) * 0.4}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}

        {/* Rotating Circular Reticle Center */}
        <g transform="translate(50, 50)">
          <circle r="8" fill="none" stroke="rgba(255, 101, 0, 0.3)" strokeWidth="0.5" strokeDasharray="2,2">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0"
              to="360"
              dur="8s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      </svg>

      {/* Floating HUD Telemetry Tags */}
      <div className="absolute top-2 left-2 z-20 flex flex-col gap-1">
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/75 border border-cyan-500/40 text-[9px] font-mono text-cyan-400">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          <span>FACIAL LANDMARK AI SCAN: ACTIVE</span>
        </div>
        <div className="px-2 py-0.5 rounded bg-black/75 border border-[#D4AF37]/40 text-[9px] font-mono text-[#D4AF37]">
          CFA BAYER NOISE: SYNTHETIC JITTER
        </div>
      </div>

      <div className="absolute bottom-2 right-2 z-20 flex flex-col items-end gap-1">
        <div className="px-2 py-0.5 rounded bg-rose-500/20 border border-rose-500/40 text-[9px] font-mono text-rose-400 font-bold">
          ANOMALY PROBABILITY: {score}%
        </div>
      </div>
    </div>
  );
}
