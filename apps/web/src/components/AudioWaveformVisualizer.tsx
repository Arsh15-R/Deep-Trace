"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Activity, Mic, Volume2, AlertOctagon, CheckCircle2 } from "lucide-react";

interface Props {
  isSynthetic?: boolean;
  score?: number;
  syntheticScore?: number;
  engineName?: string;
  filename?: string;
  duration?: number;
}

export default function AudioWaveformVisualizer({
  isSynthetic = true,
  score,
  syntheticScore,
  engineName = "ElevenLabs Neural Vocoder",
  filename,
  duration,
}: Props) {
  const activeScore = syntheticScore ?? score ?? 96.5;
  const [isPlaying, setIsPlaying] = useState(true);
  const [frequencies, setFrequencies] = useState<number[]>([]);

  useEffect(() => {
    // Generate 36 dynamic frequency equalizer bars
    const baseBars = Array.from({ length: 36 }, (_, i) => {
      if (isSynthetic && i > 24) {
        // High frequency cutoff / vocoder artifact plateau
        return Math.floor(Math.random() * 25) + 65;
      }
      return Math.floor(Math.random() * 60) + 20;
    });
    setFrequencies(baseBars);

    if (!isPlaying) return;

    const interval = setInterval(() => {
      setFrequencies((prev) =>
        prev.map((val, idx) => {
          const delta = Math.floor(Math.random() * 20) - 10;
          let next = Math.max(15, Math.min(95, val + delta));
          if (isSynthetic && idx > 26) {
            // Unnatural neural vocoder high-frequency rigidity
            next = Math.max(70, Math.min(90, next));
          }
          return next;
        })
      );
    }, 120);

    return () => clearInterval(interval);
  }, [isPlaying, isSynthetic]);

  return (
    <div className="bg-[#141413] border border-[#262624] rounded-2xl p-5 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#262624]">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#F5F5F5]" />
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#F5F5F5]">
            Acoustic Spectrum & Neural Vocoder Visualizer
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-3 py-1 bg-[#1C1C1A] hover:bg-[#262624] border border-[#383734] text-[#F5F5F5] rounded-lg text-xs font-mono transition"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3 h-3" /> <span>Pause Sweep</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3" /> <span>Resume Sweep</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Real-time Oscillating Equalizer Waveform */}
      <div className="relative h-28 bg-[#111110] border border-[#262624] rounded-xl p-3 flex items-end justify-between gap-1 overflow-hidden">
        {/* Ambient Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_19px,rgba(255,255,255,0.03)_20px)] bg-[size:100%_20px] pointer-events-none" />

        {/* 8 kHz High-Frequency Cutoff Line */}
        <div className="absolute top-4 right-1/4 bottom-4 w-px border-r border-dashed border-[#6B6762] flex items-start">
          <span className="text-[9px] font-mono text-[#F5F5F5] bg-[#1C1C1A] border border-[#262624] px-1.5 py-0.5 rounded -translate-y-2">
            8 kHz Neural Threshold
          </span>
        </div>

        {frequencies.map((height, i) => {
          const isHighAnomaly = isSynthetic && i > 24;
          const barColor = isHighAnomaly
            ? "from-[#6B6762] to-[#F5F5F5] shadow-[0_0_8px_rgba(245,245,245,0.3)]"
            : "from-[#262624] to-[#BCBAB4]";

          return (
            <motion.div
              key={i}
              style={{ height: `${height}%` }}
              className={`flex-1 rounded-t-sm bg-gradient-to-t ${barColor} transition-all duration-100 min-w-[3px]`}
            />
          );
        })}
      </div>

      {/* Diagnostic Signal Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-[#111110] border border-[#262624] p-3 rounded-xl">
          <div className="text-[10px] font-mono text-[#BCBAB4] uppercase">Pitch Jitter (F0)</div>
          <div className="text-base font-bold font-mono text-[#F5F5F5] mt-0.5">
            {isSynthetic ? "0.012% (Robotic Flatness)" : "0.840% (Organic Micro-Jitter)"}
          </div>
          <div className="text-[10px] text-[#6B6762] mt-1">Absence of natural human vocal friction</div>
        </div>

        <div className="bg-[#111110] border border-[#262624] p-3 rounded-xl">
          <div className="text-[10px] font-mono text-[#BCBAB4] uppercase">Vocoder Phase Signature</div>
          <div className="text-base font-bold font-mono text-[#D9D9D9] mt-0.5">
            {isSynthetic ? "HiFi-GAN Detected" : "Organic Resonance"}
          </div>
          <div className="text-[10px] text-[#6B6762] mt-1">Phase continuity mismatch in high harmonics</div>
        </div>

        <div className="bg-[#111110] border border-[#262624] p-3 rounded-xl">
          <div className="text-[10px] font-mono text-[#BCBAB4] uppercase">Engine Attribution</div>
          <div className="text-base font-bold font-mono text-[#F5F5F5] mt-0.5 truncate">
            {engineName}
          </div>
          <div className="text-[10px] text-[#6B6762] mt-1">Confidence Score: {activeScore}%</div>
          {filename && <div className="text-[9px] text-[#BCBAB4] font-mono mt-0.5 truncate">{filename} {duration ? `(${duration}s)` : ""}</div>}
        </div>
      </div>
    </div>
  );
}
