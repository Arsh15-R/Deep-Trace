/**
 * CertificatePass — CodeZen Tournament Pass Styled Legal Evidence Pass
 * DeepTrace Police Cyber Forensics • Section 63 BNSS 2023 Compliance
 */

"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Download,
  ShieldCheck,
  FileCheck,
  RefreshCw,
  Copy,
  Check,
  QrCode,
  Lock,
  ExternalLink
} from "lucide-react";
import { buildSection65bPdfUrl } from "@/lib/api";
import ShinyText from "@/components/ShinyText";
import DecryptedText from "@/components/DecryptedText";

export interface CertificatePassData {
  caseId: string;
  firNumber: string;
  fileName: string;
  fileSize?: string;
  sha256Hash: string;
  ipfsCid: string;
  certNumber: string;
  officerName: string;
  badgeId: string;
  station: string;
  timestamp: string;
}

interface CertificatePassProps {
  data: CertificatePassData;
  onReset?: () => void;
}

export default function CertificatePass({ data, onReset }: CertificatePassProps) {
  const [copiedHash, setCopiedHash] = React.useState(false);

  const copyHash = () => {
    navigator.clipboard.writeText(data.sha256Hash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const pdfUrl = buildSection65bPdfUrl({
    caseId: data.firNumber || data.caseId,
    officerBadgeId: data.badgeId,
    officerName: data.officerName,
    mediaJobId: data.caseId,
  });

  return (
    <div className="w-full max-w-xl mx-auto py-6">
      {/* Top Banner Chip */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <ShinyText
            text="RECORD IMMUTABLY SEALED"
            speed={2.2}
            shineColor="#a7f3d0"
            color="#34d399"
            className="text-xs font-mono font-bold tracking-wider"
          />
        </div>
        <ShinyText
          text="SECTION 63 BNSS 2023 VALIDATED"
          speed={2.8}
          shineColor="#ffffff"
          color="#818cf8"
          className="text-xs font-mono"
        />
      </div>

      {/* Main Ticket / Pass Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative bg-[#0D0F17] border border-indigo-500/40 rounded-xl overflow-hidden shadow-[0_0_40px_rgba(99,102,241,0.2)]"
      >
        {/* Glowing Top Indigo Accent Line */}
        <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-indigo-600 shadow-[0_0_12px_#6366F1]" />

        {/* Perforated Side Notches */}
        <div className="absolute top-[108px] -left-3 w-6 h-6 rounded-full bg-[#08090D] border-r border-indigo-500/40 z-10" />
        <div className="absolute top-[108px] -right-3 w-6 h-6 rounded-full bg-[#08090D] border-l border-indigo-500/40 z-10" />

        {/* Pass Header */}
        <div className="p-6 pb-5 border-b border-dashed border-[#1E2436] bg-[#0A0D14] relative">
          {/* Stamped Watermark */}
          <div className="absolute right-6 top-5 pointer-events-none select-none rotate-[-12deg] z-20">
            <div className="px-3.5 py-1.5 text-xs rounded border-2 border-dashed border-[#878672] text-[#FDFBD4] bg-[#545333]/90 shadow-[0_0_15px_rgba(84,83,51,0.5)] font-mono font-bold tracking-widest">
              ★ SEALED & VERIFIED ★
            </div>
          </div>

          <div className="flex items-center gap-2 mb-1.5">
            <div className="p-1 rounded bg-[#545333]/30 text-[#D9D7B6] border border-[#878672]/40">
              <ShieldCheck size={14} />
            </div>
            <span className="text-[11px] font-mono tracking-widest text-[#D9D7B6]">
              OFFICIAL ELECTRONIC RECORD CERTIFICATE PASS
            </span>
          </div>

          <h2 className="text-xl font-serif font-bold text-white tracking-wide">
            BHARATIYA NAGARIK SURAKSHA SANHITA
          </h2>
          <p className="text-xs font-mono text-cyan-400 mt-0.5">
            SECTION 63 BNSS 2023 // SECTION 65B INDIAN EVIDENCE ACT
          </p>
        </div>

        {/* Pass Body Content */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-2.5 rounded bg-[#101420] border border-[#1E2436]">
              <span className="text-[10px] font-mono text-[#64748B] block uppercase">STATUS</span>
              <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                IMMUTABLE
              </span>
            </div>

            <div className="p-2.5 rounded bg-[#101420] border border-[#1E2436]">
              <span className="text-[10px] font-mono text-[#64748B] block uppercase">CASE DOCKET ID</span>
              <span className="text-xs font-mono font-bold text-white mt-0.5 block truncate">
                {data.caseId}
              </span>
            </div>

            <div className="p-2.5 rounded bg-[#101420] border border-[#1E2436] col-span-2 sm:col-span-1">
              <span className="text-[10px] font-mono text-[#64748B] block uppercase">CERTIFICATE NO.</span>
              <span className="text-xs font-mono font-bold text-indigo-400 mt-0.5 block truncate">
                {data.certNumber}
              </span>
            </div>
          </div>

          <div className="p-3 rounded bg-[#08090D] border border-[#1E2436] space-y-2 text-xs font-mono">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="text-[#BCB8B1]">EVIDENCE TARGET:</span>
              <strong className="text-white font-medium truncate max-w-[320px]">{data.fileName}</strong>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pt-1.5 border-t border-[#1E2436]">
              <span className="text-[#BCB8B1]">SHA-256 INTEGRITY HASH:</span>
              <div className="flex items-center gap-2">
                <span className="text-cyan-300 font-semibold truncate max-w-[220px]">
                  <DecryptedText
                    text={data.sha256Hash}
                    speed={22}
                    maxIterations={10}
                    animateOn="hover"
                    className="text-cyan-300 font-semibold"
                  />
                </span>
                <button
                  onClick={copyHash}
                  className="p-1 rounded text-[#BCB8B1] hover:text-white hover:bg-[#131722] transition"
                  title="Copy Hash"
                >
                  {copiedHash ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pt-1.5 border-t border-[#1E2436]">
              <span className="text-[#BCB8B1]">PINATA IPFS CID:</span>
              <span className="text-indigo-300 truncate max-w-[240px]">
                <DecryptedText
                  text={data.ipfsCid}
                  speed={22}
                  maxIterations={10}
                  animateOn="hover"
                  className="text-indigo-300"
                />
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pt-1.5 border-t border-[#1E2436]">
              <span className="text-[#BCB8B1]">CERTIFYING OFFICER:</span>
              <span className="text-white">
                {data.officerName} ({data.badgeId})
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pt-1.5 border-t border-[#1E2436]">
              <span className="text-[#64748B]">TIMESTAMP (IST):</span>
              <span className="text-[#94A3B8]">
                {data.timestamp}
              </span>
            </div>
          </div>
        </div>

        {/* Pass Actions Bar */}
        <div className="p-6 pt-4 border-t border-[#1E2436] bg-[#0A0D14] flex flex-col sm:flex-row items-center gap-3">
          <a
            href={pdfUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:flex-1 py-2.5 px-4 rounded glow-indigo-btn flex items-center justify-center gap-2 text-xs"
          >
            <Download size={14} />
            <span>DOWNLOAD SEC 63 PDF</span>
          </a>

          {onReset && (
            <button
              onClick={onReset}
              className="w-full sm:w-auto py-2.5 px-4 rounded bg-[#101420] hover:bg-[#181D2A] border border-[#1E2436] text-white font-heading font-semibold text-xs tracking-wider uppercase transition flex items-center justify-center gap-2"
            >
              <RefreshCw size={13} />
              <span>SEAL ANOTHER FILE</span>
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
