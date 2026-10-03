"use client";

import React, { useState } from "react";
import { Check, Copy, Award, Shield, FileText, Stamp, Sparkles, ExternalLink } from "lucide-react";
import ShinyText from "@/components/ShinyText";
import DecryptedText from "@/components/DecryptedText";

export const OLD_PHOTO_COLORS = [
  {
    name: "Cream Parchment",
    role: "Base Canvas / Paper Glow",
    hex: "#FDFBD4",
    rgb: "rgb(253, 251, 212)",
    textColor: "#545333",
    description: "Lightest warm parchment tone for historical affidavits, paper backgrounds, and soft glowing accents.",
  },
  {
    name: "Sage Sand",
    role: "Card Surface / Muted Field",
    hex: "#D9D7B6",
    rgb: "rgb(217, 215, 182)",
    textColor: "#545333",
    description: "Vintage neutral paper tone for secondary containers, badge backings, and subtle division bands.",
  },
  {
    name: "Antique Stone",
    role: "Borders / Metadata / Dividers",
    hex: "#878672",
    rgb: "rgb(135, 134, 114)",
    textColor: "#FDFBD4",
    description: "Muted taupe olive for forensic metadata, subtle statutory stamps, borders, and timestamp labels.",
  },
  {
    name: "Deep Olive Drab",
    role: "Headings / Primary Actions / Seals",
    hex: "#545333",
    rgb: "rgb(84, 83, 51)",
    textColor: "#FDFBD4",
    description: "Deepest vintage moss olive for high-contrast serif typography, court seals, and primary action buttons.",
  },
];

export default function OldPhotographPaletteDemo() {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const copyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <div className="space-y-8 font-sans">
      {/* ───────────────────────────────────────────────────────────── */}
      {/* 1. COLOR SWATCH TILES                                         */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-[10px] font-mono font-bold text-oldphoto-sage uppercase tracking-wider block">
              COLOR SYSTEM // 4-TONE VINTAGE FORENSIC SPEC
            </span>
            <h3 className="text-lg font-serif font-bold text-white tracking-wide">
              Old Photograph Palette
            </h3>
          </div>
          <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-[#545333]/30 text-[#D9D7B6] border border-[#878672]/40">
            OFFICIAL PALETTE SPEC
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {OLD_PHOTO_COLORS.map((color) => (
            <div
              key={color.hex}
              onClick={() => copyColor(color.hex)}
              className="group cursor-pointer rounded-xl border border-[#1E2436] hover:border-[#878672] bg-[#0D0F17] overflow-hidden transition-all duration-200 hover:-translate-y-0.5 shadow-md flex flex-col"
            >
              {/* Color Swatch Block */}
              <div
                className="h-28 w-full p-3 flex flex-col justify-between relative transition-opacity group-hover:opacity-95"
                style={{ backgroundColor: color.hex, color: color.textColor }}
              >
                <div className="flex items-center justify-between text-[11px] font-mono font-bold">
                  <span className="px-2 py-0.5 rounded bg-black/15 backdrop-blur-xs">
                    {color.role}
                  </span>
                  <div className="p-1 rounded bg-black/20 hover:bg-black/30 transition">
                    {copiedHex === color.hex ? (
                      <Check size={14} className="text-emerald-800" />
                    ) : (
                      <Copy size={14} />
                    )}
                  </div>
                </div>

                <div className="font-mono text-base font-bold tracking-wider">
                  {color.hex}
                </div>
              </div>

              {/* Swatch Details */}
              <div className="p-3.5 space-y-1.5 flex-1 flex flex-col justify-between bg-[#0A0D14]">
                <div>
                  <h4 className="text-xs font-serif font-bold text-white">
                    {color.name}
                  </h4>
                  <p className="text-[11px] text-[#94A3B8] leading-relaxed mt-1">
                    {color.description}
                  </p>
                </div>
                <div className="pt-2 border-t border-[#1E2436] flex justify-between items-center text-[10px] font-mono text-[#64748B]">
                  <span>{color.rgb}</span>
                  <span className="text-cyan-400 font-bold group-hover:underline">
                    {copiedHex === color.hex ? "COPIED!" : "CLICK TO COPY"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 2. SPECIMEN 1: ARCHIVAL COURT AFFIDAVIT DOCUMENT (PAPER)      */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="p-6 bg-[#08090D] border border-indigo-500/30 rounded-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#1E2436] gap-2">
          <div>
            <span className="text-xs font-mono text-cyan-400 font-bold">SPECIMEN 01 //</span>
            <h4 className="text-sm font-heading font-extrabold text-white tracking-wider uppercase">
              Paper Affidavit Document — Section 63 BNSS 2023
            </h4>
          </div>
          <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-[#FDFBD4]/10 text-[#FDFBD4] border border-[#D9D7B6]/30">
            HERITAGE LEGAL AFFIDAVIT
          </span>
        </div>

        {/* Live Heritage Paper Sheet */}
        <div
          className="rounded-xl p-8 max-w-2xl mx-auto shadow-2xl relative overflow-hidden border-2"
          style={{
            backgroundColor: "#FDFBD4",
            borderColor: "#545333",
            color: "#545333",
          }}
        >
          {/* Subtle Vintage Border Corner Accents */}
          <div
            className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 pointer-events-none"
            style={{ borderColor: "#878672" }}
          />
          <div
            className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 pointer-events-none"
            style={{ borderColor: "#878672" }}
          />
          <div
            className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 pointer-events-none"
            style={{ borderColor: "#878672" }}
          />
          <div
            className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 pointer-events-none"
            style={{ borderColor: "#878672" }}
          />

          {/* Stamped Watermark Seal */}
          <div className="absolute right-6 top-6 pointer-events-none select-none rotate-[-10deg]">
            <div
              className="px-3 py-1.5 rounded border-2 border-dashed font-mono font-bold text-[10px] tracking-widest uppercase shadow-sm"
              style={{
                borderColor: "#545333",
                color: "#545333",
                backgroundColor: "rgba(217, 215, 182, 0.4)",
              }}
            >
              ★ STATUTORY SEALED ★
            </div>
          </div>

          {/* Document Header */}
          <div
            className="text-center pb-4 border-b-2"
            style={{ borderColor: "#878672" }}
          >
            <Award size={36} className="mx-auto mb-1" style={{ color: "#545333" }} />
            <h3
              className="text-lg font-serif font-black tracking-widest uppercase"
              style={{ color: "#545333" }}
            >
              GOVERNMENT OF INDIA • CYBER CELL
            </h3>
            <p
              className="text-xs font-serif italic tracking-wide font-medium"
              style={{ color: "#878672" }}
            >
              State Cyber Crime Police Station • Central Forensic Science Laboratory
            </p>
            <div className="mt-2 inline-block">
              <span
                className="px-3 py-0.5 rounded font-mono font-bold text-[10px] uppercase tracking-wider"
                style={{
                  backgroundColor: "#545333",
                  color: "#FDFBD4",
                }}
              >
                SECTION 63 BHARATIYA NAGARIK SURAKSHA SANHITA (BNSS) 2023
              </span>
            </div>
          </div>

          {/* Document Body */}
          <div className="py-4 space-y-3 text-xs leading-relaxed font-serif">
            <p>
              <strong>IN THE COURT OF THE PRINCIPAL SESSIONS JUDGE:</strong> Electronic evidence verification docket for Case{" "}
              <strong className="font-mono" style={{ color: "#545333" }}>
                FIR-2026-CHD-042
              </strong>
              .
            </p>

            <div
              className="p-3 rounded border font-serif italic text-xs leading-normal"
              style={{
                backgroundColor: "#D9D7B6",
                borderColor: "#878672",
                color: "#545333",
              }}
            >
              &ldquo;I, Insp. Daksh Walia (Badge ID: CHD-CYB-0042), hereby depose that the digital evidence item recorded under custody has been generated on a computer device functioning in regular statutory course, with bit-for-bit SHA-256 seal guaranteed without alteration.&rdquo;
            </div>

            {/* Cryptographic Technical Box */}
            <div
              className="p-3 rounded border font-mono text-[11px] space-y-1.5"
              style={{
                backgroundColor: "#FDFBD4",
                borderColor: "#878672",
              }}
            >
              <div className="flex justify-between items-center">
                <span style={{ color: "#878672" }}>BITWISE SHA-256:</span>
                <strong className="font-bold tracking-tight" style={{ color: "#545333" }}>
                  b7a892c90f23d14451c86e09fb8d9753...
                </strong>
              </div>
              <div className="flex justify-between items-center">
                <span style={{ color: "#878672" }}>PINATA IPFS CID:</span>
                <strong style={{ color: "#545333" }}>
                  bafybeicciqduqsz6pecwgtpsfyl2texlw2xcqz...
                </strong>
              </div>
              <div className="flex justify-between items-center">
                <span style={{ color: "#878672" }}>TAMPER STATUS:</span>
                <span
                  className="font-bold px-1.5 py-0.2 rounded text-[10px]"
                  style={{
                    backgroundColor: "#545333",
                    color: "#FDFBD4",
                  }}
                >
                  ✓ ZERO MODIFICATION
                </span>
              </div>
            </div>
          </div>

          {/* Footer Signature Strip */}
          <div
            className="pt-3 border-t-2 flex items-center justify-between text-xs font-serif"
            style={{ borderColor: "#878672" }}
          >
            <div>
              <p className="font-bold" style={{ color: "#545333" }}>
                Insp. Daksh Walia
              </p>
              <p className="text-[10px]" style={{ color: "#878672" }}>
                Investigating Officer • State Cyber Crime PS
              </p>
            </div>

            <div className="text-right">
              <span
                className="inline-block px-2.5 py-1 rounded border border-dashed text-[9px] font-mono font-bold tracking-wider"
                style={{
                  borderColor: "#545333",
                  color: "#545333",
                  backgroundColor: "#D9D7B6",
                }}
              >
                OFFICIAL DIGITAL SEAL
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 3. SPECIMEN 2: UI BUTTONS, CHIPS, AND BADGES IN 4 COLORS     */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="p-6 bg-[#0D0F17] border border-[#1E2436] rounded-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#1E2436]">
          <div>
            <span className="text-xs font-mono text-indigo-400 font-bold">SPECIMEN 02 //</span>
            <h4 className="text-sm font-heading font-extrabold text-white tracking-wider uppercase">
              Interactive Component Tokens & Buttons
            </h4>
          </div>
          <span className="text-[10px] font-mono text-[#94A3B8]">
            TAILWIND: <code className="text-cyan-300">bg-oldphoto-*</code>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Action Buttons Specimen */}
          <div className="p-4 bg-[#08090D] border border-[#1E2436] rounded-lg space-y-3">
            <span className="text-[11px] font-mono text-[#64748B] uppercase block">
              Interactive Buttons
            </span>

            <div className="flex flex-wrap gap-2.5">
              <button
                className="px-4 py-2 rounded font-serif font-bold text-xs uppercase tracking-wider transition shadow"
                style={{
                  backgroundColor: "#545333",
                  color: "#FDFBD4",
                  border: "1px solid #878672",
                }}
              >
                PRIMARY ACTION (#545333)
              </button>

              <button
                className="px-4 py-2 rounded font-serif font-bold text-xs uppercase tracking-wider transition"
                style={{
                  backgroundColor: "#D9D7B6",
                  color: "#545333",
                  border: "1px solid #878672",
                }}
              >
                SECONDARY (#D9D7B6)
              </button>

              <button
                className="px-4 py-2 rounded font-serif font-bold text-xs uppercase tracking-wider transition"
                style={{
                  backgroundColor: "#FDFBD4",
                  color: "#545333",
                  border: "1px solid #545333",
                }}
              >
                LIGHT (#FDFBD4)
              </button>

              <button
                className="px-4 py-2 rounded font-serif font-bold text-xs uppercase tracking-wider transition"
                style={{
                  backgroundColor: "transparent",
                  color: "#D9D7B6",
                  border: "1px dashed #878672",
                }}
              >
                OUTLINE (#878672)
              </button>
            </div>
          </div>

          {/* Forensic Badges Specimen */}
          <div className="p-4 bg-[#08090D] border border-[#1E2436] rounded-lg space-y-3">
            <span className="text-[11px] font-mono text-[#64748B] uppercase block">
              Forensic Status Chips
            </span>

            <div className="flex flex-wrap gap-2">
              <span
                className="px-3 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1.5"
                style={{
                  backgroundColor: "#545333",
                  color: "#FDFBD4",
                  border: "1px solid #878672",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#FDFBD4" }} />
                SEC 63 BNSS SEAL
              </span>

              <span
                className="px-3 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1.5"
                style={{
                  backgroundColor: "#D9D7B6",
                  color: "#545333",
                  border: "1px solid #878672",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#545333" }} />
                IPFS IMMUTABLE
              </span>

              <span
                className="px-3 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1.5"
                style={{
                  backgroundColor: "#878672",
                  color: "#FDFBD4",
                }}
              >
                CHMOD 0444 READONLY
              </span>

              <span
                className="px-3 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1.5"
                style={{
                  backgroundColor: "#FDFBD4",
                  color: "#545333",
                  border: "1px solid #545333",
                }}
              >
                ZERO TAMPER VERIFIED
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
