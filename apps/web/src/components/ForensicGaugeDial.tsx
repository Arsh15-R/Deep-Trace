"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, AlertTriangle, ShieldAlert } from "lucide-react";

interface Props {
  score: number; // 0.0 to 1.0 or 0 to 100
  size?: number;
  engine?: string;
  attributedEngine?: string;
  verdict?: string;
}

export default function ForensicGaugeDial({
  score,
  size = 200,
  engine = "ElevenLabs Neural Voice",
  attributedEngine,
  verdict,
}: Props) {
  const activeEngine = attributedEngine || engine;
  // Normalize percentage [0 - 100]
  const pct = score <= 1.0 ? Math.round(score * 100) : Math.round(score);

  const radius = size * 0.38;
  const strokeWidth = size * 0.08;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (pct / 100) * circumference;

  const isSynthetic = pct >= 65;
  const isSuspicious = pct >= 40 && pct < 65;

  const strokeColor = isSynthetic
    ? "#f43f5e"
    : isSuspicious
    ? "#f59e0b"
    : "#10b981";

  const glowShadow = isSynthetic
    ? "0 0 20px rgba(244, 63, 94, 0.4)"
    : isSuspicious
    ? "0 0 20px rgba(245, 158, 11, 0.3)"
    : "0 0 20px rgba(16, 185, 129, 0.3)";

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-[#141413] border border-[#262624] rounded-2xl shadow-xl backdrop-blur-md">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        {/* Background track circle */}
        <svg className="transform -rotate-90" width={size} height={size}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#262624"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Animated Value Arc */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            strokeLinecap="round"
            fill="transparent"
            style={{ filter: glowShadow }}
          />
        </svg>

        {/* Center Readout */}
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-extrabold font-mono text-[#F5F5F5] tracking-tight">
            {pct}%
          </span>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#BCBAB4] mt-0.5">
            AI PROBABILITY
          </span>
        </div>
      </div>

      {/* Verdict Badge */}
      <div className="mt-2 text-center space-y-1">
        <div
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono border ${
            isSynthetic
              ? "bg-rose-500/10 text-rose-400 border-rose-500/40"
              : isSuspicious
              ? "bg-amber-500/10 text-amber-400 border-amber-500/40"
              : "bg-emerald-500/10 text-emerald-400 border-emerald-500/40"
          }`}
        >
          {isSynthetic ? (
            <ShieldAlert className="w-3.5 h-3.5" />
          ) : isSuspicious ? (
            <AlertTriangle className="w-3.5 h-3.5" />
          ) : (
            <ShieldCheck className="w-3.5 h-3.5" />
          )}
          <span>{verdict || (isSynthetic ? "SYNTHETIC DEEPFAKE" : isSuspicious ? "SUSPICIOUS" : "ORGANIC CAPTURE")}</span>
        </div>

        <div className="text-xs text-[#BCBAB4] font-mono">
          Engine: <strong className="text-[#F5F5F5]">{activeEngine}</strong>
        </div>
      </div>
    </div>
  );
}
