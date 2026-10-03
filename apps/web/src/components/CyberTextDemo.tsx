"use client";

import React, { useState } from "react";
import DecryptedText from "@/components/DecryptedText";
import ShinyText from "@/components/ShinyText";
import BlurText from "@/components/BlurText";
import { Terminal, Sparkles, Eye, RefreshCw, Zap, Shield, Lock, FileCode, Check } from "lucide-react";

export default function CyberTextDemo() {
  // DecryptedText controls
  const [decryptSpeed, setDecryptSpeed] = useState<number>(35);
  const [decryptSequential, setDecryptSequential] = useState<boolean>(true);
  const [decryptDirection, setDecryptDirection] = useState<"start" | "end" | "center">("start");
  const [decryptPreset, setDecryptPreset] = useState<string>(
    "SHA256:b7a892c90f23d14451c86e09fb8d97531234abcd5678ef901234567890abcdef"
  );
  const [decryptKey, setDecryptKey] = useState<number>(0);

  // ShinyText controls
  const [shinySpeed, setShinySpeed] = useState<number>(2.5);
  const [shinyColor, setShinyColor] = useState<string>("#818cf8");
  const [shinyShine, setShinyShine] = useState<string>("#ffffff");
  const [shinySpread, setShinySpread] = useState<number>(100);

  // BlurText controls
  const [blurAnimateBy, setBlurAnimateBy] = useState<"words" | "letters">("words");
  const [blurDirection, setBlurDirection] = useState<"top" | "bottom">("top");
  const [blurKey, setBlurKey] = useState<number>(0);

  return (
    <div className="space-y-8">
      {/* ───────────────────────────────────────────────────────────── */}
      {/* 1. DECRYPTED TEXT PLAYGROUND                                  */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="p-5 bg-[#08090D] border border-indigo-500/30 rounded-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#1E2436] gap-2">
          <div className="flex items-center gap-2">
            <Terminal size={16} className="text-cyan-400" />
            <span className="font-heading font-bold text-white text-sm tracking-wider uppercase">
              1. DecryptedText — Kinetic Cyber Glyphs
            </span>
          </div>
          <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
            HOVER OR CLICK TO UNSCRAMBLE
          </span>
        </div>

        {/* Live Preview Screen */}
        <div className="p-6 bg-[#0D0F17] border border-[#1E2436] rounded-lg min-h-[110px] flex flex-col justify-center items-center text-center relative overflow-hidden group">
          <div className="absolute top-2 left-2 text-[9px] font-mono text-[#64748B]">
            HOVER OVER TEXT TO RE-TRIGGER DECRYPTION
          </div>
          <div className="text-sm sm:text-base font-mono text-cyan-300 font-bold tracking-wider select-all cursor-pointer">
            <DecryptedText
              key={decryptKey}
              text={decryptPreset}
              speed={decryptSpeed}
              sequential={decryptSequential}
              revealDirection={decryptDirection}
              maxIterations={12}
              animateOn="hover"
              className="text-cyan-300 drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]"
              encryptedClassName="text-indigo-400/70"
            />
          </div>
        </div>

        {/* Preset Selector */}
        <div className="flex flex-wrap gap-2 pt-1">
          {[
            {
              label: "SHA-256 Telemetry Hash",
              val: "SHA256:b7a892c90f23d14451c86e09fb8d97531234abcd5678ef901234567890abcdef",
            },
            {
              label: "BNSS Sec 63 Affidavit Seal",
              val: "BNSS-2026-CHDCYB-042 // TAMPER-EVIDENT ELECTRONIC RECORD AFFIDAVIT",
            },
            {
              label: "ElevenLabs HiFi-GAN Vocoder",
              val: "ELEVENLABS_VOCODER_V2_CONFIDENCE_98.5%_ACOUSTIC_PHASE_SPLIT",
            },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => {
                setDecryptPreset(item.val);
                setDecryptKey((prev) => prev + 1);
              }}
              className={`px-2.5 py-1 text-[11px] font-mono rounded border transition ${
                decryptPreset === item.val
                  ? "bg-cyan-500/10 text-cyan-300 border-cyan-500/40 font-bold"
                  : "bg-[#101420] text-[#94A3B8] border-[#1E2436] hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono">
          <div className="p-3 rounded bg-[#101420] border border-[#1E2436] space-y-1.5">
            <div className="flex justify-between text-[#94A3B8]">
              <span>Speed:</span>
              <span className="text-cyan-300 font-bold">{decryptSpeed}ms</span>
            </div>
            <input
              type="range"
              min="15"
              max="100"
              step="5"
              value={decryptSpeed}
              onChange={(e) => {
                setDecryptSpeed(Number(e.target.value));
                setDecryptKey((prev) => prev + 1);
              }}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          <div className="p-3 rounded bg-[#101420] border border-[#1E2436] space-y-1.5">
            <div className="flex justify-between text-[#94A3B8]">
              <span>Direction:</span>
              <span className="text-cyan-300 font-bold uppercase">{decryptDirection}</span>
            </div>
            <div className="flex gap-1.5 pt-0.5">
              {(["start", "center", "end"] as const).map((dir) => (
                <button
                  key={dir}
                  onClick={() => {
                    setDecryptDirection(dir);
                    setDecryptKey((prev) => prev + 1);
                  }}
                  className={`flex-1 py-1 rounded text-[10px] uppercase font-bold border transition ${
                    decryptDirection === dir
                      ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40"
                      : "bg-[#08090D] text-[#94A3B8] border-[#1E2436]"
                  }`}
                >
                  {dir}
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 rounded bg-[#101420] border border-[#1E2436] flex items-center justify-between">
            <span className="text-[#94A3B8]">Sequential Unmask:</span>
            <button
              onClick={() => {
                setDecryptSequential(!decryptSequential);
                setDecryptKey((prev) => prev + 1);
              }}
              className={`px-3 py-1 rounded text-[11px] font-bold border transition ${
                decryptSequential
                  ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                  : "bg-rose-500/20 text-rose-300 border-rose-500/40"
              }`}
            >
              {decryptSequential ? "ON (Sequential)" : "OFF (Random)"}
            </button>
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 2. SHINY TEXT PLAYGROUND                                      */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="p-5 bg-[#08090D] border border-indigo-500/30 rounded-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#1E2436] gap-2">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-indigo-400" />
            <span className="font-heading font-bold text-white text-sm tracking-wider uppercase">
              2. ShinyText — Metallic Specular Sweep
            </span>
          </div>
          <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
            GPU HARDWARE-ACCELERATED
          </span>
        </div>

        {/* Live Preview Display */}
        <div className="p-6 bg-[#0D0F17] border border-[#1E2436] rounded-lg min-h-[110px] flex flex-col items-center justify-center gap-3">
          <div className="text-xl sm:text-2xl font-heading font-extrabold tracking-wide">
            <ShinyText
              text="⚡ CONFIRMED SYNTHETIC DEEPFAKE VERDICT [CRITICAL]"
              speed={shinySpeed}
              color={shinyColor}
              shineColor={shinyShine}
              spread={shinySpread}
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <div className="px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-xs font-mono">
              <ShinyText
                text="SECTION 63 BNSS 2023 VALIDATED"
                speed={2.0}
                color="#6366f1"
                shineColor="#ffffff"
              />
            </div>

            <div className="px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-xs font-mono">
              <ShinyText
                text="100% BIT-FOR-BIT ZERO TAMPER SEAL"
                speed={3.0}
                color="#10b981"
                shineColor="#a7f3d0"
              />
            </div>
          </div>
        </div>

        {/* Shiny Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs font-mono">
          <div className="p-3 rounded bg-[#101420] border border-[#1E2436] space-y-1.5">
            <div className="flex justify-between text-[#94A3B8]">
              <span>Sweep Speed:</span>
              <span className="text-indigo-300 font-bold">{shinySpeed}s</span>
            </div>
            <input
              type="range"
              min="1"
              max="6"
              step="0.5"
              value={shinySpeed}
              onChange={(e) => setShinySpeed(Number(e.target.value))}
              className="w-full accent-indigo-400 cursor-pointer"
            />
          </div>

          <div className="p-3 rounded bg-[#101420] border border-[#1E2436] space-y-1.5">
            <div className="flex justify-between text-[#94A3B8]">
              <span>Beam Spread:</span>
              <span className="text-indigo-300 font-bold">{shinySpread}px</span>
            </div>
            <input
              type="range"
              min="40"
              max="200"
              step="10"
              value={shinySpread}
              onChange={(e) => setShinySpread(Number(e.target.value))}
              className="w-full accent-indigo-400 cursor-pointer"
            />
          </div>

          <div className="p-3 rounded bg-[#101420] border border-[#1E2436] space-y-1.5">
            <div className="flex justify-between text-[#94A3B8]">
              <span>Base Theme:</span>
            </div>
            <div className="flex gap-1.5">
              {[
                { label: "Indigo", col: "#818cf8" },
                { label: "Cyan", col: "#06b6d4" },
                { label: "Rose", col: "#f43f5e" },
                { label: "Gold", col: "#f59e0b" },
              ].map((p) => (
                <button
                  key={p.label}
                  onClick={() => setShinyColor(p.col)}
                  className={`flex-1 py-1 rounded text-[10px] font-bold border transition ${
                    shinyColor === p.col
                      ? "bg-white/10 text-white border-white/50"
                      : "bg-[#08090D] text-[#94A3B8] border-[#1E2436]"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 3. BLUR TEXT PLAYGROUND                                       */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="p-5 bg-[#08090D] border border-indigo-500/30 rounded-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#1E2436] gap-2">
          <div className="flex items-center gap-2">
            <Eye size={16} className="text-emerald-400" />
            <span className="font-heading font-bold text-white text-sm tracking-wider uppercase">
              3. BlurText — Soft-Focus Cinematic Reveal
            </span>
          </div>
          <button
            onClick={() => setBlurKey((prev) => prev + 1)}
            className="flex items-center gap-1.5 px-3 py-1 bg-[#101420] hover:bg-[#181D2A] border border-[#1E2436] rounded text-xs font-mono text-emerald-400 hover:text-white transition"
          >
            <RefreshCw size={12} />
            <span>REPLAY REVEAL</span>
          </button>
        </div>

        {/* Live Preview Screen */}
        <div className="p-8 bg-[#0D0F17] border border-[#1E2436] rounded-lg min-h-[120px] flex items-center justify-center text-center">
          <BlurText
            key={blurKey}
            text="STATE CYBER CRIME CELL • DEEPFAKE FORENSICS TELEMETRY INTERCEPT 2026"
            delay={50}
            animateBy={blurAnimateBy}
            direction={blurDirection}
            className="text-lg sm:text-xl font-heading font-extrabold text-white tracking-wider max-w-2xl leading-relaxed"
          />
        </div>

        {/* Blur Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs font-mono">
          <div className="p-3 rounded bg-[#101420] border border-[#1E2436] flex items-center justify-between">
            <span className="text-[#94A3B8]">Token Granularity:</span>
            <div className="flex gap-1.5">
              {(["words", "letters"] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setBlurAnimateBy(type);
                    setBlurKey((k) => k + 1);
                  }}
                  className={`px-3 py-1 rounded text-[10px] uppercase font-bold border transition ${
                    blurAnimateBy === type
                      ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                      : "bg-[#08090D] text-[#94A3B8] border-[#1E2436]"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 rounded bg-[#101420] border border-[#1E2436] flex items-center justify-between">
            <span className="text-[#94A3B8]">Entrance Direction:</span>
            <div className="flex gap-1.5">
              {(["top", "bottom"] as const).map((dir) => (
                <button
                  key={dir}
                  onClick={() => {
                    setBlurDirection(dir);
                    setBlurKey((k) => k + 1);
                  }}
                  className={`px-3 py-1 rounded text-[10px] uppercase font-bold border transition ${
                    blurDirection === dir
                      ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                      : "bg-[#08090D] text-[#94A3B8] border-[#1E2436]"
                  }`}
                >
                  {dir}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
