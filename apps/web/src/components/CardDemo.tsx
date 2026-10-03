"use client";

import React, { useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShieldAlert, Download, Terminal, ChevronRight, Activity } from "lucide-react";

export default function CardDemo() {
  const [size, setSize] = useState<"default" | "sm">("default");

  return (
    <div className="space-y-6">
      {/* Interactive Controls */}
      <div className="flex items-center gap-3 pb-2 border-b border-[#1E2436]">
        <span className="text-xs font-mono text-[#94A3B8]">SIZE VARIANT:</span>
        <button
          onClick={() => setSize("default")}
          className={`px-2.5 py-1 text-xs font-mono rounded transition ${
            size === "default"
              ? "bg-indigo-600 text-white font-bold"
              : "bg-[#101420] text-[#94A3B8] border border-[#1E2436] hover:text-white"
          }`}
        >
          size="default"
        </button>
        <button
          onClick={() => setSize("sm")}
          className={`px-2.5 py-1 text-xs font-mono rounded transition ${
            size === "sm"
              ? "bg-indigo-600 text-white font-bold"
              : "bg-[#101420] text-[#94A3B8] border border-[#1E2436] hover:text-white"
          }`}
        >
          size="sm"
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Standard Composition Card */}
        <Card size={size} className="border-indigo-500/30 hover:border-indigo-500/60 transition shadow-[0_0_20px_rgba(99,102,241,0.15)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              FORENSIC INCIDENT REPORT
            </CardTitle>
            <CardDescription>
              FIR-2026-CHD-042 • Deepfake Video Tampering
            </CardDescription>
            <CardAction>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30 uppercase font-bold">
                HIGH SEVERITY
              </span>
            </CardAction>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Automated spatial 2D-FFT and optical flow analysis detected 98.4% synthetic facial replacement on CCTV node CHD-09. Cryptographic digest logged to IPFS vault.
            </p>
            <div className="mt-3 p-2 bg-[#08090D] border border-[#1E2436] rounded font-mono text-[11px] text-[#64748B]">
              SHA-256: 7f83b165...e92f1b40
            </div>
          </CardContent>
          <CardFooter className="justify-between">
            <span className="text-[10px] font-mono text-[#64748B] flex items-center gap-1">
              <Activity className="w-3 h-3 text-cyan-400" />
              STATUS: SEALED & LOGGED
            </span>
            <button className="flex items-center gap-1 text-xs font-mono text-indigo-400 hover:text-indigo-300 font-bold transition">
              <span>VIEW DOSSIER</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </CardFooter>
        </Card>

        {/* Custom Spacing Card with Arbitrary Variable */}
        <Card size={size} className="[--card-spacing:1.25rem] border-cyan-500/30 hover:border-cyan-500/60 transition shadow-[0_0_20px_rgba(6,182,212,0.12)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              CUSTOM SPACING (--card-spacing)
            </CardTitle>
            <CardDescription>
              Card with 1.25rem internal padding and responsive footer
            </CardDescription>
            <CardAction>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 uppercase font-bold">
                SPACING TEST
              </span>
            </CardAction>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Demonstrates the modern <code className="text-cyan-300 font-mono">[--card-spacing:1.25rem]</code> CSS variable override. Content and header alignments adapt seamlessly.
            </p>
          </CardContent>
          <CardFooter className="justify-end gap-2">
            <button className="px-3 py-1 bg-[#101420] hover:bg-[#181D2A] text-xs font-mono text-[#94A3B8] border border-[#1E2436] rounded transition">
              Dismiss
            </button>
            <button className="px-3 py-1 bg-cyan-600 hover:bg-cyan-500 text-xs font-mono font-bold text-white rounded transition shadow-[0_0_12px_rgba(6,182,212,0.4)]">
              Confirm
            </button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
