"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Copy,
  Check,
  FileText,
  FileAudio,
  FileVideo,
  ImageIcon,
} from "lucide-react";
import { ScanLine, CustodyTimeline, SealedStamp, SeverityDot, CustodyStep } from "@/animations";

export interface CaseRecord {
  id: string;
  fir: string;
  source: string;
  target: string;
  type: "VIDEO" | "AUDIO" | "IMAGE" | "WEB";
  severity: "CRITICAL" | "HIGH" | "MEDIUM";
  verdict: string;
  score: number;
  engine: string;
  hash: string;
  cid: string;
  station: string;
  time: string;
  status: "LOCKED" | "PINNED" | "PROCESSING";
}

interface CaseInspectorSheetProps {
  caseData: CaseRecord | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CaseInspectorSheet({
  caseData,
  isOpen,
  onClose,
}: CaseInspectorSheetProps) {
  const [copiedHash, setCopiedHash] = useState(false);
  const [copiedCid, setCopiedCid] = useState(false);

  if (!caseData) return null;

  const copyToClipboard = (text: string, type: "hash" | "cid") => {
    navigator.clipboard.writeText(text);
    if (type === "hash") {
      setCopiedHash(true);
      setTimeout(() => setCopiedHash(false), 2000);
    } else {
      setCopiedCid(true);
      setTimeout(() => setCopiedCid(false), 2000);
    }
  };

  const custodySteps: CustodyStep[] = [
    {
      title: "Evidence Registered & Catalogued",
      detail: `Seized under ${caseData.fir} via ${caseData.source}`,
      time: caseData.time,
    },
    {
      title: "SHA-256 Bitstream Hash Generated",
      detail: `${caseData.hash.slice(0, 16)}… verified before byte ingestion`,
      time: "T+4s",
    },
    {
      title: "Decentralized IPFS Cluster Pinned",
      detail: `Stored in read-only mode at CID ${caseData.cid.slice(0, 14)}…`,
      time: "T+9s",
    },
    {
      title: "BNSS Section 63 Certificate Generated",
      detail: `Forensic audit signed by deponent officer for judicial presentation`,
      time: "T+12s",
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-[3px]"
          />

          {/* macOS Inspector Slide-over Sheet */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            className="relative w-full max-w-[500px] h-full apple-vibrancy border-l border-apple-hairline shadow-apple-modal z-10 flex flex-col justify-between overflow-y-auto"
          >
            {/* Header */}
            <div>
              <div className="flex items-center justify-between p-6 border-b border-apple-hairline/70">
                <div className="flex items-center gap-2">
                  <span className="text-[12px] font-mono text-apple-text-tertiary">
                    {caseData.id}
                  </span>
                  <span className="text-[12px] text-apple-text-tertiary">·</span>
                  <span className="text-[13px] font-medium text-apple-text">
                    Forensic Case Inspector
                  </span>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close inspector"
                  className="p-1.5 rounded-full text-apple-text-secondary hover:text-apple-text hover:bg-apple-surface-secondary transition-colors"
                >
                  <X className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </div>

              {/* Main Content */}
              <div className="p-6 space-y-6">
                {/* Active Media Preview Box with ScanLine */}
                <div className="relative rounded-2xl border border-apple-hairline bg-apple-surface-secondary/70 overflow-hidden p-5 flex flex-col justify-between min-h-[140px]">
                  <div className="flex items-center justify-between z-10">
                    <div className="flex items-center gap-2 text-[12px] font-mono text-apple-text-secondary">
                      {caseData.type === "AUDIO" ? (
                        <FileAudio className="w-4 h-4 text-apple-blue" />
                      ) : caseData.type === "VIDEO" ? (
                        <FileVideo className="w-4 h-4 text-apple-blue" />
                      ) : (
                        <ImageIcon className="w-4 h-4 text-apple-blue" />
                      )}
                      <span className="truncate max-w-[260px]">{caseData.target}</span>
                    </div>
                    <SeverityDot level={caseData.severity} />
                  </div>

                  <div className="z-10 py-3">
                    <h3 className="text-[20px] font-semibold text-apple-text tracking-tight">
                      {caseData.verdict}
                    </h3>
                    <p className="text-[12px] text-apple-text-secondary mt-0.5">
                      {(caseData.score * 100).toFixed(1)}% synthetic match • {caseData.engine}
                    </p>
                  </div>

                  {/* Sweeping Scanner Beam */}
                  <ScanLine active={true} />
                </div>

                {/* Case Parameters */}
                <div className="p-4 rounded-xl bg-apple-surface border border-apple-hairline space-y-2.5 text-[13px]">
                  <div className="flex justify-between py-1 border-b border-apple-hairline/60">
                    <span className="text-apple-text-secondary">FIR Number</span>
                    <span className="font-mono text-apple-text font-medium">{caseData.fir}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-apple-hairline/60">
                    <span className="text-apple-text-secondary">Seizure Station</span>
                    <span className="text-apple-text text-right max-w-[240px]">
                      {caseData.station}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-apple-hairline/60">
                    <span className="text-apple-text-secondary">Evidence Ingest Time</span>
                    <span className="text-apple-text">{caseData.time}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-apple-text-secondary">Legal Compliance</span>
                    <span className="text-apple-blue font-medium">Sec 63 BNSS 2023 &amp; 65B IEA</span>
                  </div>
                </div>

                {/* Cryptographic Monospace Records */}
                <div className="space-y-3.5">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[12px] text-apple-text-secondary font-medium">
                        SHA-256 Bitstream Digest
                      </span>
                      <button
                        onClick={() => copyToClipboard(caseData.hash, "hash")}
                        className="text-[11px] text-apple-blue hover:underline flex items-center gap-1"
                      >
                        {copiedHash ? (
                          <>
                            <Check className="w-3 h-3 text-apple-green" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <p
                      data-mono="true"
                      className="text-[12px] font-mono text-apple-text bg-apple-surface border border-apple-hairline p-2.5 rounded-lg break-all select-all leading-relaxed"
                    >
                      {caseData.hash}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[12px] text-apple-text-secondary font-medium">
                        IPFS Immutable Storage CID
                      </span>
                      <button
                        onClick={() => copyToClipboard(caseData.cid, "cid")}
                        className="text-[11px] text-apple-blue hover:underline flex items-center gap-1"
                      >
                        {copiedCid ? (
                          <>
                            <Check className="w-3 h-3 text-apple-green" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <p
                      data-mono="true"
                      className="text-[12px] font-mono text-apple-text bg-apple-surface border border-apple-hairline p-2.5 rounded-lg break-all select-all leading-relaxed"
                    >
                      {caseData.cid}
                    </p>
                  </div>
                </div>

                {/* Animated Custody Timeline */}
                <div>
                  <h4 className="text-[12px] uppercase font-mono tracking-wider text-apple-text-secondary mb-3">
                    Cryptographic Chain of Custody
                  </h4>
                  <div className="p-4 rounded-xl bg-apple-surface border border-apple-hairline">
                    <CustodyTimeline steps={custodySteps} stepDelay={0.3} />
                  </div>
                </div>

                {/* Sealed Stamp Verification */}
                <div className="pt-2 flex justify-center">
                  <SealedStamp label="SEALED &amp; VERIFIED" />
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-6 border-t border-apple-hairline/70 bg-apple-surface/40 space-y-3">
              <Link
                href={`/cases/${caseData.id}/certificate`}
                className="w-full py-3 px-4 rounded-full bg-apple-blue hover:bg-apple-blue-hover text-white text-[14px] font-medium flex items-center justify-center gap-2 transition-all shadow-apple-subtle"
              >
                <FileText className="w-4 h-4" strokeWidth={1.5} />
                <span>View BNSS 63 Court Certificate</span>
              </Link>

              <button
                onClick={onClose}
                className="w-full py-2.5 px-4 rounded-full bg-transparent hover:bg-apple-surface-secondary text-apple-text-secondary hover:text-apple-text text-[13px] font-normal transition-colors"
              >
                Close Inspector
              </button>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
