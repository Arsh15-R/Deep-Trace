"use client";

import React, { useState } from "react";
import {
  Shield,
  Sparkles,
  Sliders,
  CheckCircle2,
  Lock,
  ArrowRight,
  Layers,
  Fingerprint,
  Zap,
  Command,
  FileText
} from "lucide-react";
import ShinyText from "./ShinyText";

export default function AppleDesignShowcase() {
  const [activeSegment, setActiveSegment] = useState<"overview" | "cards" | "controls" | "typography">("overview");
  const [activePill, setActivePill] = useState<string>("All Modalities");
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const colors = [
    { name: "Cream Parchment", hex: "#FDFBD4", role: "Primary Bright / High Contrast Surface" },
    { name: "Sage Sand", hex: "#D9D7B6", role: "Warm Muted Neutral / Subtle Contrast" },
    { name: "Antique Stone", hex: "#878672", role: "Midtone Border & Structural Muted Accent" },
    { name: "Deep Olive Drab", hex: "#545333", role: "Tactile Dark Base / Forensic Authority Accent" },
    { name: "Ash Silver", hex: "#BCB8B1", role: "Technical Metadata & Hairline Highlight" },
  ];

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 1800);
  };

  return (
    <div className="space-y-6">
      {/* ── 1. macOS Window Chrome with Traffic Lights ─────────────── */}
      <div className="apple-card rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
        {/* macOS Titlebar */}
        <div className="px-5 py-3.5 border-b border-white/10 bg-white/[0.03] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/50 shadow-xs hover:opacity-80 transition cursor-pointer" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/50 shadow-xs hover:opacity-80 transition cursor-pointer" />
            <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/50 shadow-xs hover:opacity-80 transition cursor-pointer" />
            <span className="ml-3 text-xs font-serif font-bold text-white/80">
              macOS Sequoia & visionOS Human Interface Design Specimen
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="apple-pill-badge bg-white/[0.06] text-[#D9D7B6] border border-white/10 text-[10px] font-mono">
              <Command size={10} /> HIG PRO
            </span>
          </div>
        </div>

        {/* Window Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="apple-pill-badge bg-white/[0.06] text-[#D9D7B6] border border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#27C93F] animate-pulse" />
                  APPLE HIG + OLD PHOTOGRAPH SPEC
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                Cupertino Frosted Glass & Squircles
              </h2>
              <p className="text-xs text-[#94A3B8] mt-1 max-w-xl font-sans">
                Translucent frosted glass surfaces with specular highlights, continuous curvature corners, tactile pill actions, and Apple New York editorial serif headings.
              </p>
            </div>

            {/* Apple Segmented Control Navigation */}
            <div className="apple-segmented self-start sm:self-auto">
              {(["overview", "cards", "controls", "typography"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveSegment(tab)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-serif capitalize transition-all ${
                    activeSegment === tab
                      ? "apple-segmented-active text-[#FDFBD4]"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeSegment === "overview" && (
            <div className="space-y-6">
              {/* Palette Integration Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                {colors.map((c) => (
                  <button
                    key={c.hex}
                    onClick={() => handleCopy(c.hex)}
                    className="apple-card p-4 rounded-2xl flex flex-col text-left group hover:scale-[1.02] transition"
                  >
                    <div
                      className="w-full h-12 rounded-xl mb-3 border border-white/10 shadow-inner flex items-end justify-end p-1.5"
                      style={{ backgroundColor: c.hex }}
                    >
                      {copiedColor === c.hex && (
                        <span className="text-[9px] font-mono font-bold px-1 rounded bg-black/70 text-white">
                          COPIED
                        </span>
                      )}
                    </div>
                    <span className="font-serif font-bold text-xs text-white group-hover:text-[#FDFBD4] transition">
                      {c.name}
                    </span>
                    <span className="text-[11px] font-mono text-[#878672] mt-0.5">
                      {c.hex}
                    </span>
                    <span className="text-[10px] text-white/50 mt-1 line-clamp-2 font-sans">
                      {c.role}
                    </span>
                  </button>
                ))}
              </div>

              {/* Design Formula Callout */}
              <div className="apple-glass rounded-2xl p-5 border border-white/10 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-[#D9D7B6] uppercase tracking-wider font-semibold">
                    01 // FROSTED SURFACES
                  </span>
                  <h4 className="font-serif font-bold text-sm text-white">28px Blur + 190% Saturation</h4>
                  <p className="text-xs text-[#94A3B8] font-sans">
                    Multi-layer spatial backdrop filters with specular hairline borders and subtle top highlights.
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-[#D9D7B6] uppercase tracking-wider font-semibold">
                    02 // SQUIRCLE GEOMETRY
                  </span>
                  <h4 className="font-serif font-bold text-sm text-white">Continuous Curvature (Superellipse)</h4>
                  <p className="text-xs text-[#94A3B8] font-sans">
                    Smooth rounded-2xl and rounded-3xl corners mimicking Apple device hardware aesthetics.
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-[#D9D7B6] uppercase tracking-wider font-semibold">
                    03 // TACTILE INTERACTIONS
                  </span>
                  <h4 className="font-serif font-bold text-sm text-white">Pill Buttons & Segmented Bars</h4>
                  <p className="text-xs text-[#94A3B8] font-sans">
                    Rounded-full containers, subtle active scale response (97%), and micro-dot status badges.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CARDS SPECIMEN */}
          {activeSegment === "cards" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="apple-card p-5 rounded-2xl relative overflow-hidden group">
                <div className="flex items-center justify-between mb-3">
                  <span className="apple-pill-badge bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    VERIFIED SEC 63
                  </span>
                  <span className="text-[10px] font-mono text-[#878672]">01</span>
                </div>
                <h3 className="font-serif font-bold text-lg text-white mb-1">
                  Chain-of-Custody Card
                </h3>
                <p className="text-xs text-[#94A3B8] font-sans mb-4">
                  Frosted card with specular border highlight, responsive hover lift, and Old Photograph palette text.
                </p>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs font-mono text-[#D9D7B6]">
                  SHA-256: e3b0c442...b855
                </div>
              </div>

              <div className="apple-card p-5 rounded-2xl relative overflow-hidden group">
                <div className="flex items-center justify-between mb-3">
                  <span className="apple-pill-badge bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[10px] font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
                    DEEPFAKE CONFIRMED
                  </span>
                  <span className="text-[10px] font-mono text-[#878672]">02</span>
                </div>
                <h3 className="font-serif font-bold text-lg text-white mb-1">
                  Attribution Metric Card
                </h3>
                <p className="text-xs text-[#94A3B8] font-sans mb-4">
                  Visual alert card utilizing subtle rose glow with Old Photograph parchment typography.
                </p>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs font-mono text-[#FDFBD4]">
                  CONFIDENCE: 98.5%
                </div>
              </div>

              <div className="apple-card p-5 rounded-2xl relative overflow-hidden group">
                <div className="flex items-center justify-between mb-3">
                  <span className="apple-pill-badge bg-[#545333]/40 text-[#FDFBD4] border border-[#878672]/50 text-[10px] font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D9D7B6] animate-pulse" />
                    COURT DOCKET
                  </span>
                  <span className="text-[10px] font-mono text-[#878672]">03</span>
                </div>
                <h3 className="font-serif font-bold text-lg text-white mb-1">
                  Affidavit Specimen Card
                </h3>
                <p className="text-xs text-[#94A3B8] font-sans mb-4">
                  Legal statutory record surface styled in Deep Olive Drab with tactile button triggers.
                </p>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs font-mono text-[#878672]">
                  FIR-2026-CHD-042 // SEC 63
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CONTROLS & PILLS */}
          {activeSegment === "controls" && (
            <div className="space-y-6">
              {/* Segmented Controls Specimen */}
              <div className="apple-card p-6 rounded-2xl space-y-3">
                <span className="text-xs font-serif font-bold text-white block">
                  Apple Segmented Controls (Continuous Pill Container)
                </span>
                <div className="apple-segmented">
                  {["All Modalities", "Voice Intercepts", "Video Frames", "Web Scrapes"].map((pill) => (
                    <button
                      key={pill}
                      onClick={() => setActivePill(pill)}
                      className={`px-4 py-1.5 rounded-full text-xs font-serif transition-all ${
                        activePill === pill
                          ? "apple-segmented-active text-[#FDFBD4]"
                          : "text-white/60 hover:text-white"
                      }`}
                    >
                      {pill}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tactile Buttons Specimen */}
              <div className="apple-card p-6 rounded-2xl space-y-4">
                <span className="text-xs font-serif font-bold text-white block">
                  Tactile Pill Buttons (.apple-btn-primary & .apple-btn-secondary)
                </span>
                <div className="flex flex-wrap items-center gap-3">
                  <button className="apple-btn-primary">
                    <Shield size={14} className="text-[#FDFBD4]" />
                    <span className="font-serif">Primary Docket Action</span>
                  </button>

                  <button className="apple-btn-secondary">
                    <FileText size={14} />
                    <span className="font-serif">Secondary Frosted Action</span>
                  </button>

                  <button className="apple-btn-secondary p-2.5" title="Icon Only Pill">
                    <Sliders size={14} />
                  </button>
                </div>
              </div>

              {/* Micro-Badges Specimen */}
              <div className="apple-card p-6 rounded-2xl space-y-4">
                <span className="text-xs font-serif font-bold text-white block">
                  Apple Status Micro-Pills (.apple-pill-badge)
                </span>
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="apple-pill-badge bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    ONLINE STATUS
                  </span>
                  <span className="apple-pill-badge bg-rose-500/10 text-rose-400 border border-rose-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
                    CRITICAL SEVERITY
                  </span>
                  <span className="apple-pill-badge bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                    INSPECTION PENDING
                  </span>
                  <span className="apple-pill-badge bg-[#545333]/40 text-[#FDFBD4] border border-[#878672]/50">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D9D7B6] animate-pulse" />
                    STATUTORY SEC 63 BNSS
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: TYPOGRAPHY SPECIMEN */}
          {activeSegment === "typography" && (
            <div className="apple-card p-6 sm:p-8 rounded-2xl space-y-6">
              <div className="border-b border-white/10 pb-4">
                <span className="text-[10px] font-mono text-[#878672] uppercase tracking-widest block mb-1">
                  DISPLAY & HEADINGS // FRAUNCES / APPLE NEW YORK
                </span>
                <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
                  State Cyber Crime Command
                </h1>
                <p className="text-sm font-serif italic text-[#D9D7B6] mt-1">
                  Harmonizing timeless editorial serif typography with modern spatial glassmorphism.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl apple-glass border border-white/5 space-y-2">
                  <span className="text-[10px] font-mono text-[#878672] uppercase">BODY COPY // SANS-SERIF</span>
                  <p className="text-xs text-[#94A3B8] font-sans leading-relaxed">
                    Designed for high readability across dense forensic data tables, evidence chain timelines, and statutory police affidavits under the Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023.
                  </p>
                </div>

                <div className="p-4 rounded-xl apple-glass border border-white/5 space-y-2">
                  <span className="text-[10px] font-mono text-[#878672] uppercase">CRYPTOGRAPHIC // JETBRAINS MONO</span>
                  <p className="text-xs font-mono text-[#FDFBD4] break-all">
                    SHA-256: b7a892c90f23d14451c86e09fb8d97531234abcd5678ef901234567890abcdef
                  </p>
                  <p className="text-[10px] font-mono text-[#878672]">
                    IPFS CID: bafybeicciqduqsz6pecwgtpsfyl2texlw2xcqzf2v64e72wl5uw
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
