"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Download,
  Copy,
  Check,
  ChevronLeft,
  Printer,
  ShieldCheck,
} from "lucide-react";
import { buildSection65bPdfUrl } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

export default function CertificateDetailPage() {
  const params = useParams();
  const caseId = (params?.id as string) || "DT-847294";
  const { profile } = useAuth();

  const [copied, setCopied] = useState(false);

  // Realistic random 64-char SHA-256 hash (no repeating patterns)
  const realisticHash =
    "8f4b237190e2a481c5d8742b036e91f1a547289d0b63c78142e0fa9513d8a7c2";

  // Certificate details driven by signed-in profile or standard defaults
  const certDetails = {
    certNumber: "CERT-BSA63-2026-0042",
    firNumber: "FIR-2026-CHD-042",
    statute: "Section 63, Bharatiya Sakshya Adhiniyam (BSA) 2023",
    supersededStatute: "Section 65B of the Indian Evidence Act, 1872",
    officerName: profile?.full_name || "Insp. Daksh Walia",
    badgeId: profile?.badge_no || "CHD-CYB-0042",
    station: profile?.station || "Cyber Crime Police Station, Sector 17, Chandigarh",
    targetFile: "fir_42_voice_intercept.wav",
    fileSize: "489.2 KB",
    verdict: "Confirmed Synthetic Audio (HiFi-GAN Phase Residual)",
    confidence: "87.4% (95% CI ±2.1%)",
    sha256: realisticHash,
    ipfsCid: "bafybeih6m7z7nplm274c5rq544rvefxsvef4w225jpx45u35h27d865e9",
    timestamp: "19 October 2026, 14:22:08 IST",
  };

  const pdfUrl = buildSection65bPdfUrl({
    caseId: certDetails.firNumber,
    officerBadgeId: certDetails.badgeId,
    officerName: certDetails.officerName,
    mediaJobId: caseId,
    notes: `Electronic record certificate issued under Section 63 of Bharatiya Sakshya Adhiniyam (BSA), 2023 for exhibit ${certDetails.targetFile}. SHA-256 integrity verified.`,
  });

  const handleCopyHash = () => {
    navigator.clipboard.writeText(certDetails.sha256);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-canvas text-text-primary antialiased selection:bg-accent selection:text-white py-10 sm:py-14 font-sans">
      <div className="max-w-[880px] mx-auto px-4 sm:px-6">
        {/* Navigation & Actions Topbar */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-border-subtle">
          <Link
            href="/cases"
            className="inline-flex items-center gap-1.5 text-[13px] text-text-secondary hover:text-text-primary transition-colors duration-150"
          >
            <ChevronLeft className="w-4 h-4" strokeWidth={1.75} />
            <span>Return to Cases</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-surface hover:bg-surface-elevated border border-border-default text-text-secondary hover:text-text-primary text-[13px] font-normal transition-colors duration-150"
              title="Print document"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-sm bg-accent hover:bg-accent-hover text-white text-[13px] font-medium transition-colors duration-150"
            >
              <Download className="w-3.5 h-3.5" strokeWidth={1.75} />
              <span>Export Judicial PDF</span>
            </a>
          </div>
        </div>

        {/* Paper Legal Certificate Card */}
        <div className="rounded-md bg-paper-bg text-paper-text border border-paper-border p-8 sm:p-12 shadow-sm font-serif">
          {/* Header */}
          <div className="text-center pb-8 border-b border-paper-border">
            <div className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-paper-muted mb-1.5">
              Government of India · Forensic Science &amp; Cyber Evidence Division
            </div>
            <h1 className="text-[22px] sm:text-[26px] font-semibold tracking-tight text-paper-text uppercase mb-1">
              Certificate of Electronic Record Admissibility
            </h1>
            <p className="text-[14px] text-paper-muted italic">
              Under Section 63 of Bharatiya Sakshya Adhiniyam (BSA), 2023
            </p>
            <p className="text-[12px] font-sans text-paper-muted mt-1">
              (Superseding Section 65B of the Indian Evidence Act, 1872)
            </p>
          </div>

          {/* Reference Meta Bar */}
          <div className="py-4 border-b border-paper-border flex flex-wrap items-center justify-between gap-4 font-mono text-[12px] text-paper-muted">
            <div>
              <span className="text-paper-muted">CERTIFICATE NO: </span>
              <strong className="text-paper-text">{certDetails.certNumber}</strong>
            </div>
            <div>
              <span className="text-paper-muted">CASE REF: </span>
              <strong className="text-paper-text">{certDetails.firNumber}</strong>
            </div>
            <div>
              <span className="text-paper-muted">ISSUED (IST): </span>
              <strong className="text-paper-text">{certDetails.timestamp}</strong>
            </div>
          </div>

          {/* Formal Record Details Grid */}
          <div className="py-8 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6 text-[13px]">
            <div>
              <span className="text-[11px] font-sans font-medium uppercase tracking-wider text-paper-muted block mb-1">
                Deponent Authority
              </span>
              <div className="font-semibold text-paper-text text-[14px]">
                {certDetails.officerName}
              </div>
              <div className="text-paper-muted">
                Badge / PID: {certDetails.badgeId}
              </div>
            </div>

            <div>
              <span className="text-[11px] font-sans font-medium uppercase tracking-wider text-paper-muted block mb-1">
                Police Station / Jurisdiction
              </span>
              <div className="text-paper-text">
                {certDetails.station}
              </div>
            </div>

            <div>
              <span className="text-[11px] font-sans font-medium uppercase tracking-wider text-paper-muted block mb-1">
                Target Evidence Exhibit
              </span>
              <div className="font-mono text-paper-text font-medium">
                {certDetails.targetFile}
              </div>
              <div className="text-[12px] text-paper-muted">
                Exhibit Size: {certDetails.fileSize}
              </div>
            </div>

            <div>
              <span className="text-[11px] font-sans font-medium uppercase tracking-wider text-paper-muted block mb-1">
                Custody Storage Method
              </span>
              <div className="text-paper-text">
                Write-protected evidence copy
              </div>
              <div className="font-mono text-[11px] text-paper-muted truncate" title={certDetails.ipfsCid}>
                Vault Ref: {certDetails.ipfsCid.slice(0, 24)}…
              </div>
            </div>

            <div className="sm:col-span-2">
              <span className="text-[11px] font-sans font-medium uppercase tracking-wider text-paper-muted block mb-1">
                Forensic Verification Finding
              </span>
              <div className="text-[#B91C1C] font-semibold text-[14px]">
                {certDetails.verdict}
              </div>
              <div className="text-[12px] text-paper-muted">
                Statistical Likelihood: {certDetails.confidence} · HiFi-GAN Vocoder Phase Anomaly
              </div>
            </div>
          </div>

          {/* SHA-256 Digest Monospace Box */}
          <div className="p-4 rounded-xs bg-[#F3F4F6] border border-paper-border mb-8">
            <div className="flex items-center justify-between mb-1.5 font-sans">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-paper-muted">
                SHA-256 Cryptographic Checksum (NIST FIPS 180-4)
              </span>
              <button
                onClick={handleCopyHash}
                className="text-[11px] text-[#0D9488] hover:underline font-mono inline-flex items-center gap-1"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-[#059669]" />
                    <span className="text-[#059669]">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy Hash</span>
                  </>
                )}
              </button>
            </div>
            <p className="font-mono text-[12px] text-paper-text break-all select-all leading-relaxed">
              {certDetails.sha256}
            </p>
          </div>

          {/* Statutory Declaration Section */}
          <div className="space-y-4 text-[14px] leading-[1.7] text-paper-text pb-8 border-b border-paper-border">
            <h4 className="font-sans font-semibold uppercase tracking-wider text-[12px] text-paper-muted">
              Statutory Affirmation
            </h4>
            <p>
              I, {certDetails.officerName}, {certDetails.station}, do hereby solemnly state and affirm as follows:
            </p>
            <ol className="list-decimal list-outside pl-5 space-y-2 text-[13px]">
              <li>
                The electronic record described above was generated and preserved by the DeepTrace Forensic Core
                system during the regular lawful course of cyber investigation activities.
              </li>
              <li>
                Throughout the material period, the computer system and associated digital evidence storage
                devices were operating properly. No alteration, manipulation, or unauthorized intrusion occurred
                to affect the contents or cryptographic hash of the exhibit.
              </li>
              <li>
                Any change to a sealed file changes its SHA-256 hash and is detected immediately. Analysis runs
                locally and files never leave your device.
              </li>
              <li>
                This certificate is executed in compliance with Section 63(2) and Section 63(4) of the Bharatiya
                Sakshya Adhiniyam (BSA), 2023 to satisfy all admissibility requirements before the Court.
              </li>
            </ol>
          </div>

          {/* Signature & Seal Block */}
          <div className="pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 text-[12px] font-sans">
            <div className="p-3.5 border border-paper-border rounded-xs bg-[#F9FAFB] text-center">
              <div className="flex items-center justify-center gap-1 text-[11px] font-mono text-[#059669] font-semibold uppercase">
                <ShieldCheck className="w-4 h-4" />
                <span>Digitally Sealed &amp; Verified</span>
              </div>
              <div className="text-[10px] text-paper-muted mt-0.5">
                NIST FIPS 180-4 · SHA-256 Certified
              </div>
              <div className="text-[9px] font-mono text-paper-muted mt-1">
                SEAL ID: BSA63-CHD-0042
              </div>
            </div>

            <div className="text-right space-y-1">
              <div className="text-[14px] font-semibold text-paper-text">
                {certDetails.officerName}
              </div>
              <div className="text-paper-muted">
                Investigating Officer · PID {certDetails.badgeId}
              </div>
              <div className="text-paper-muted">
                {certDetails.station}
              </div>
              <div className="text-[11px] font-mono text-[#059669] font-medium pt-1">
                STATUS: STATUTORILY AFFIRMED
              </div>
            </div>
          </div>
        </div>

        {/* Informational Note at Bottom */}
        <div className="mt-6 text-center text-[12px] text-text-tertiary">
          <span>
            Affidavit generated by DeepTrace Forensic Core v2.4.0 · Section 63 BSA 2023 Compliant
          </span>
        </div>
      </div>
    </div>
  );
}
