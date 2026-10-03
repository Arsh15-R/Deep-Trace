"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Download,
  Copy,
  Check,
  ChevronLeft,
  FileText,
  Shield,
  Printer,
} from "lucide-react";
import { buildSection65bPdfUrl } from "@/lib/api";
import { Page, SealedStamp } from "@/animations";
import { useAuth } from "@/contexts/AuthContext";

export default function CertificateDetailPage() {
  const params = useParams();
  const router = useRouter();
  const caseId = (params?.id as string) || "DT-847294";
  const { profile } = useAuth();

  const [copied, setCopied] = useState(false);

  // Certificate details driven by signed-in profile
  const certDetails = {
    certNumber: "CERT-BNSS-2026-0042",
    firNumber: "FIR-2026-CHD-042",
    statute: "Section 63 Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023",
    officerName: profile?.full_name || "Insp. Daksh Walia",
    badgeId: profile?.badge_no || "CHD-CYB-0042",
    station: profile?.station || "Cyber Crime Police Station, Sector 17, Chandigarh",
    targetFile: "fir_42_voice_intercept.wav",
    fileSize: "489.2 KB",
    verdict: "Confirmed Synthetic Audio (HiFi-GAN Phase Residual)",
    confidence: "98.5%",
    sha256: "b7a892c90f23d14451c86e09fb8d97531234abcd5678ef901234567890abcdef",
    ipfsCid: "bafybeicciqduqsz6pecwgtpsfyl2texlw2xcqzf2v64e72wl5uw",
    timestamp: "02 October 2026, 22:00:58 IST",
  };

  const pdfUrl = buildSection65bPdfUrl({
    caseId: certDetails.firNumber,
    officerBadgeId: certDetails.badgeId,
    officerName: certDetails.officerName,
    mediaJobId: caseId,
    notes: `Electronic certificate issued under Section 63 BNSS 2023 for exhibit ${certDetails.targetFile}. SHA-256 integrity verified.`,
  });

  const handleCopyHash = () => {
    navigator.clipboard.writeText(certDetails.sha256);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Page className="max-w-[840px] mx-auto px-4 sm:px-6 py-12 sm:py-16">
      {/* Navigation & Header */}
      <div className="flex items-center justify-between mb-8">
        <Link
          href="/cases"
          className="inline-flex items-center gap-1.5 text-[14px] text-apple-text-secondary hover:text-apple-text transition-colors"
        >
          <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
          <span>All Certificates</span>
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={() => window.print()}
            className="p-2 rounded-full hover:bg-apple-surface-secondary text-apple-text-secondary hover:text-apple-text transition-colors"
            title="Print document"
          >
            <Printer className="w-4 h-4" strokeWidth={1.5} />
          </button>
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-apple-blue hover:bg-apple-blue-hover text-white text-[13px] font-medium transition-all shadow-apple-subtle active:scale-[0.98]"
          >
            <Download className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span>Download PDF</span>
          </a>
        </div>
      </div>

      {/* 6. CLEAN DOCUMENT-LIKE CARD */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-3xl bg-apple-surface border border-apple-hairline p-8 sm:p-12 shadow-apple-card relative overflow-hidden"
      >
        {/* Document Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-8 border-b border-apple-hairline">
          <div>
            <span className="text-[12px] font-mono text-apple-text-secondary uppercase tracking-wider block mb-1">
              Government of India · Judicial Forensics
            </span>
            <h1 className="text-[26px] sm:text-[32px] font-semibold text-apple-text tracking-tight">
              Certificate of Electronic Record
            </h1>
            <p className="text-[13px] text-apple-text-secondary mt-1">
              Admissibility under Section 63 BNSS 2023 &amp; Section 65B Indian Evidence Act
            </p>
          </div>

          {/* 6. SEALED STAMP (SealedStamp from animation kit) */}
          <div className="self-start sm:self-center">
            <SealedStamp label="SEALED" className="text-apple-green" />
          </div>
        </div>

        {/* DETAILS IN A TIDY TWO-COLUMN LIST */}
        <div className="py-8 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6 text-[14px]">
          <div>
            <span className="text-[12px] text-apple-text-secondary block mb-1 font-medium">
              Certificate Reference
            </span>
            <span className="font-mono text-apple-text font-medium">
              {certDetails.certNumber}
            </span>
          </div>

          <div>
            <span className="text-[12px] text-apple-text-secondary block mb-1 font-medium">
              FIR Seizure Reference
            </span>
            <span className="font-mono text-apple-text font-medium">
              {certDetails.firNumber}
            </span>
          </div>

          <div>
            <span className="text-[12px] text-apple-text-secondary block mb-1 font-medium">
              Deponent Authority
            </span>
            <span className="text-apple-text font-medium">
              {certDetails.officerName} ({certDetails.badgeId})
            </span>
          </div>

          <div>
            <span className="text-[12px] text-apple-text-secondary block mb-1 font-medium">
              Jurisdiction &amp; Station
            </span>
            <span className="text-apple-text">
              {certDetails.station}
            </span>
          </div>

          <div>
            <span className="text-[12px] text-apple-text-secondary block mb-1 font-medium">
              Digital Evidence Exhibit
            </span>
            <span className="font-medium text-apple-text">
              {certDetails.targetFile}{" "}
              <span className="text-apple-text-secondary text-[12px]">
                ({certDetails.fileSize})
              </span>
            </span>
          </div>

          <div>
            <span className="text-[12px] text-apple-text-secondary block mb-1 font-medium">
              Judicial Finding &amp; Confidence
            </span>
            <span className="font-medium text-apple-red">
              {certDetails.verdict} ({certDetails.confidence})
            </span>
          </div>

          <div>
            <span className="text-[12px] text-apple-text-secondary block mb-1 font-medium">
              Seal Timestamp
            </span>
            <span className="text-apple-text">
              {certDetails.timestamp}
            </span>
          </div>

          <div>
            <span className="text-[12px] text-apple-text-secondary block mb-1 font-medium">
              Decentralized Custody CID
            </span>
            <span className="font-mono text-[12px] text-apple-text truncate block">
              {certDetails.ipfsCid}
            </span>
          </div>
        </div>

        {/* Cryptographic SHA-256 Box */}
        <div className="pt-6 border-t border-apple-hairline">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[12px] text-apple-text-secondary font-medium">
              SHA-256 Cryptographic Checksum
            </span>
            <button
              onClick={handleCopyHash}
              className="text-[12px] text-apple-blue hover:underline inline-flex items-center gap-1 font-medium"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-apple-green" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Checksum</span>
                </>
              )}
            </button>
          </div>
          <div className="bg-apple-surface-secondary border border-apple-hairline rounded-xl p-3.5 font-mono text-[13px] text-apple-text break-all select-all">
            {certDetails.sha256}
          </div>
        </div>

        {/* Bottom Court Attestation */}
        <div className="mt-8 pt-6 border-t border-apple-hairline/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[12px] text-apple-text-secondary">
          <p className="max-w-[480px]">
            Certified that the above electronic record was produced in ordinary course from an automated custody pipeline with unbroken chain of custody.
          </p>
          <div className="text-right sm:text-right shrink-0">
            <span className="block font-medium text-apple-text">
              {certDetails.officerName}
            </span>
            <span>Investigating Officer, Cyber Crime PS</span>
          </div>
        </div>
      </motion.div>
    </Page>
  );
}
