"use client";

import React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ShieldCheck, Activity, Terminal, Database, Clock, Lock } from "lucide-react";

const forensicLogs = [
  { id: "LOG-9041", time: "22:14:02 IST", event: "2D-FFT Spatial Mesh Deconstruction", target: "CCTV_CHD_09.mp4", status: "FLAGGED 98.4%" },
  { id: "LOG-9042", time: "22:14:18 IST", event: "Bitwise SHA-256 Digest Calculation", target: "Audio_Extort_02.wav", status: "VERIFIED" },
  { id: "LOG-9043", time: "22:15:05 IST", event: "Pinata IPFS Node Broadcast", target: "CID: QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco", status: "PINNED" },
  { id: "LOG-9044", time: "22:15:42 IST", event: "Section 63 BNSS Certificate Sealing", target: "CERT-2026-CHD-042", status: "SEALED" },
  { id: "LOG-9045", time: "22:16:11 IST", event: "Biometric Face Warping Optical Flow", target: "DG_Imposter_Photo.png", status: "MANIPULATED" },
  { id: "LOG-9046", time: "22:17:09 IST", event: "Vocoder Phase Inversion Detection", target: "Voice_Clone_SI_Sharma.wav", status: "SYNTHETIC" },
  { id: "LOG-9047", time: "22:17:35 IST", event: "Police Imposter Domain DNS Radar", target: "chd-cybercell-online.in", status: "TAKEDOWN ISSUED" },
  { id: "LOG-9048", time: "22:18:02 IST", event: "Chain of Custody Node Validation", target: "Node: Chandigarh Central PS", status: "MUTUAL_TLS_OK" },
  { id: "LOG-9049", time: "22:18:44 IST", event: "Encrypted Telegram Bot Dispatch", target: "Field Officer Alert #DEL-09", status: "DELIVERED" },
  { id: "LOG-9050", time: "22:19:12 IST", event: "Immutable Merkle Tree Commit", target: "Block #849204", status: "FINALIZED" },
];

const wideLedgerItems = [
  { cid: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco", hash: "7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069", tag: "CCTV_TAMPER_01" },
  { cid: "QmZtmD2qt8fJpq3CLDH2nvdfErNjhL72vedxjQkDDPo918", hash: "8e29a310f8b1ca54b92ec19149b1e75efc3e5c2eb4e788395beef311237e0180", tag: "VOICE_CLONE_CHANDIGARH" },
  { cid: "QmW2ekLpq8fJpq4DLDH3mvdfFrOkhM83vedxjQkEERp129", hash: "9f30b421a9c2db65c03fd20250c2f86fad4f6d3fc5f899406cff422348f1291", tag: "SEC63_AFFIDAVIT_SIGNED" },
  { cid: "QmV1ejKop7eIpq5ELDH4nvdfGrPliN94vedxjQkFFSp230", hash: "a041c532b0d3ec76d14ge31361d3g97gbe5g7e4gd6g000517dgg533459g2302", tag: "DEEPFAKE_WHATSAPP_LEAK" },
];

export default function ScrollAreaDemo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* 1. Vertical Scroll Area */}
      <div className="bg-[#08090D] border border-[#1E2436] rounded-xl p-4 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-[#1E2436]">
          <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-bold flex items-center gap-1.5">
            <Activity className="size-3.5 text-indigo-400" />
            01 // LIVE FORENSIC EVENT AUDIT
          </span>
          <span className="text-[10px] font-mono text-[#64748B]">
            VERTICAL SCROLL
          </span>
        </div>

        <ScrollArea className="h-64 w-full rounded-lg border border-[#1E2436]/60 bg-[#0D0F17] p-3">
          <div className="space-y-2.5 pr-2">
            {forensicLogs.map((log) => (
              <div
                key={log.id}
                className="p-2 rounded bg-[#08090D] border border-[#1E2436] flex items-center justify-between text-xs hover:border-indigo-500/40 transition"
              >
                <div className="min-w-0 flex-1 pr-2">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-mono text-indigo-400 font-bold">
                      {log.id}
                    </span>
                    <span className="text-[10px] font-mono text-[#64748B]">
                      {log.time}
                    </span>
                  </div>
                  <p className="font-heading font-bold text-white truncate text-xs">
                    {log.event}
                  </p>
                  <p className="text-[10px] font-mono text-[#94A3B8] truncate">
                    {log.target}
                  </p>
                </div>

                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#101420] text-emerald-400 border border-emerald-500/30 whitespace-nowrap font-bold">
                  {log.status}
                </span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* 2. Horizontal Scroll Area */}
      <div className="bg-[#08090D] border border-[#1E2436] rounded-xl p-4 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-[#1E2436]">
          <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-1.5">
            <Database className="size-3.5 text-cyan-400" />
            02 // WIDE CRYPTOGRAPHIC HASHLIST
          </span>
          <span className="text-[10px] font-mono text-[#64748B]">
            HORIZONTAL SCROLL
          </span>
        </div>

        <ScrollArea className="w-full rounded-lg border border-[#1E2436]/60 bg-[#0D0F17] p-3">
          <div className="flex gap-3 pb-3">
            {wideLedgerItems.map((item, idx) => (
              <div
                key={idx}
                className="w-72 shrink-0 p-3 rounded-lg bg-[#08090D] border border-[#1E2436] space-y-2 hover:border-cyan-500/40 transition"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold uppercase">
                    {item.tag}
                  </span>
                  <Lock className="size-3 text-[#64748B]" />
                </div>

                <div>
                  <span className="text-[9px] font-mono text-[#64748B] block">IPFS CID:</span>
                  <p className="text-[11px] font-mono text-white truncate">{item.cid}</p>
                </div>

                <div>
                  <span className="text-[9px] font-mono text-[#64748B] block">SHA-256 HASH:</span>
                  <p className="text-[10px] font-mono text-[#94A3B8] truncate">{item.hash}</p>
                </div>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <p className="text-[11px] font-mono text-[#64748B]">
          * Uses <code className="text-cyan-300 font-mono">&lt;ScrollBar orientation=&quot;horizontal&quot; /&gt;</code> for smooth native horizontal scroll augmenting cross-browser trackpad and mouse drag styling.
        </p>
      </div>
    </div>
  );
}
