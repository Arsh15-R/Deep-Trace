"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Shield,
  CheckCircle2,
  FileText,
  Lock,
  ArrowRight,
  ChevronRight,
  ExternalLink,
  Cpu,
  Layers,
  Zap,
  Check,
  Copy,
} from "lucide-react";
import AppleNavbar from "@/components/AppleNavbar";

export default function LandingPage() {
  const [copiedHash, setCopiedHash] = useState(false);
  const sampleHash =
    "8f4b237190e2a481c5d8742b036e91f1a547289d0b63c78142e0fa9513d8a7c2";

  const handleCopyHash = () => {
    navigator.clipboard.writeText(sampleHash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  return (
    <div className="min-h-screen bg-canvas text-text-primary antialiased selection:bg-accent selection:text-white flex flex-col font-sans">
      {/* 1. Global Navigation */}
      <AppleNavbar />

      <main className="flex-1">
        {/* 2. HERO SECTION: Left-Aligned Copy with Real Evidence Inspector on the Right */}
        <section className="py-16 sm:py-24 border-b border-border-subtle">
          <div className="max-w-content mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-xs bg-surface-elevated border border-border-default mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span className="text-[11px] font-mono tracking-wider uppercase text-text-secondary">
                  Cyber Forensics Standard · Section 63 BSA 2023
                </span>
              </div>

              <h1 className="text-[34px] sm:text-[46px] lg:text-[52px] font-semibold tracking-tight text-text-primary leading-[1.12] mb-5">
                Every deepfake leaves a trace.
              </h1>

              <p className="text-[15px] sm:text-[16px] text-text-secondary leading-[1.6] max-w-[65ch] mb-8">
                Forensic-grade synthetic media detection, tamper-evident hash chaining,
                and court-admissible certificate generation for law enforcement and judicial inquiry.
              </p>

              {/* Action Buttons: Solid primary, Outlined secondary, 150ms transitions */}
              <div className="flex flex-wrap items-center gap-3 mb-10">
                <Link
                  href="/dashboard"
                  className="px-5 py-2.5 rounded-sm bg-accent hover:bg-accent-hover text-white text-[14px] font-medium transition-colors duration-150 inline-flex items-center gap-2"
                >
                  <span>Open Command Center</span>
                  <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
                </Link>

                <Link
                  href="/scan"
                  className="px-5 py-2.5 rounded-sm bg-surface hover:bg-surface-elevated border border-border-default text-text-primary text-[14px] font-medium transition-colors duration-150 inline-flex items-center gap-2"
                >
                  <span>Scan Media File</span>
                </Link>

                <Link
                  href="/cases/DT-847294/certificate"
                  className="px-5 py-2.5 rounded-sm bg-transparent hover:bg-surface-elevated text-text-secondary hover:text-text-primary text-[14px] font-normal transition-colors duration-150 inline-flex items-center gap-1.5"
                >
                  <span>View Sample Certificate</span>
                  <ChevronRight className="w-3.5 h-3.5 text-text-tertiary" />
                </Link>
              </div>

              {/* Core Trust Directives */}
              <div className="w-full pt-6 border-t border-border-subtle grid grid-cols-1 sm:grid-cols-3 gap-4 text-[12px] text-text-tertiary">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" strokeWidth={1.75} />
                  <span>Analysis runs locally. Files never leave your device.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Lock className="w-4 h-4 text-accent shrink-0 mt-0.5" strokeWidth={1.75} />
                  <span>Any change to a sealed file changes its SHA-256 hash and is detected.</span>
                </div>
                <div className="flex items-start gap-2">
                  <FileText className="w-4 h-4 text-accent shrink-0 mt-0.5" strokeWidth={1.75} />
                  <span>Form II affidavit compliant with Section 63 BSA 2023.</span>
                </div>
              </div>
            </div>

            {/* Right Hero: Real Product UI — The Evidence Inspector */}
            <div className="lg:col-span-5">
              <div className="rounded-md bg-surface border border-border-default overflow-hidden shadow-sm">
                {/* Panel Window Header */}
                <div className="px-4 py-3 bg-surface-elevated border-b border-border-default flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-border-strong" />
                    <span className="text-[11px] font-mono text-text-secondary tracking-wide uppercase">
                      Evidence Inspector
                    </span>
                  </div>
                  <span className="text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 rounded-xs bg-status-verified-bg text-status-verified border border-status-verified-border">
                    Sealed · BSA 2023
                  </span>
                </div>

                {/* Forensic Record Monospace Rows */}
                <div className="p-4 space-y-3 font-mono text-[12px]">
                  {/* Case Ref */}
                  <div className="flex justify-between items-center py-1 border-b border-border-subtle">
                    <span className="text-text-tertiary">Case Reference</span>
                    <span className="text-text-primary font-medium">FIR-2026-CHD-04289</span>
                  </div>

                  {/* Exhibit Name */}
                  <div className="flex justify-between items-center py-1 border-b border-border-subtle">
                    <span className="text-text-tertiary">Target Exhibit</span>
                    <span className="text-text-primary truncate max-w-[200px]" title="fir_4289_intercept_voice.wav">
                      fir_4289_intercept_voice.wav
                    </span>
                  </div>

                  {/* SHA-256 Checksum */}
                  <div className="py-2 border-b border-border-subtle">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-text-tertiary">SHA-256 Checksum</span>
                      <button
                        onClick={handleCopyHash}
                        className="text-[11px] text-accent hover:text-accent-light inline-flex items-center gap-1 font-mono transition-colors"
                      >
                        {copiedHash ? (
                          <>
                            <Check className="w-3 h-3 text-status-verified" />
                            <span className="text-status-verified">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-[11px] text-text-primary bg-surface-elevated p-2 rounded-xs border border-border-subtle break-all leading-relaxed">
                      {sampleHash}
                    </p>
                  </div>

                  {/* Custody Store */}
                  <div className="flex justify-between items-center py-1 border-b border-border-subtle">
                    <span className="text-text-tertiary">Custody Node</span>
                    <span className="text-text-secondary text-[11px]">
                      Write-protected evidence copy
                    </span>
                  </div>

                  {/* Verdict & Score */}
                  <div className="py-2 border-b border-border-subtle">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-text-tertiary">Forensic Finding</span>
                      <span className="text-status-critical font-medium">
                        87.4% Synthetic Match
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-text-tertiary">
                      <span>HiFi-GAN Phase Residual</span>
                      <span className="text-text-secondary">Conf: High (95% CI ±2.1%)</span>
                    </div>
                  </div>

                  {/* Investigating Officer */}
                  <div className="flex justify-between items-center py-1 border-b border-border-subtle">
                    <span className="text-text-tertiary">Investigating Officer</span>
                    <span className="text-text-secondary">Insp. Daksh Walia (PB-9482)</span>
                  </div>

                  {/* Statute */}
                  <div className="flex justify-between items-center pt-1 text-[11px]">
                    <span className="text-text-tertiary">Affidavit Standard</span>
                    <span className="text-accent font-medium">Section 63 BSA 2023 Form II</span>
                  </div>
                </div>

                {/* Panel Footer Action */}
                <div className="px-4 py-2.5 bg-surface-elevated/70 border-t border-border-default flex items-center justify-between text-[11px]">
                  <span className="text-text-tertiary font-mono">Status: Hash verified in local vault</span>
                  <Link
                    href="/cases/DT-847294/certificate"
                    className="text-accent hover:text-accent-light font-medium inline-flex items-center gap-1 transition-colors"
                  >
                    <span>Inspect Record</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. COMPACT 3-ITEM SPEC LIST */}
        <section className="py-16 sm:py-20 border-b border-border-subtle">
          <div className="max-w-content mx-auto px-4 sm:px-6">
            <div className="mb-10 text-left">
              <span className="text-[11px] font-mono tracking-wider uppercase text-text-tertiary block mb-2">
                Technical Specifications
              </span>
              <h2 className="text-[24px] sm:text-[28px] font-semibold text-text-primary tracking-tight">
                Algorithmic attribution across signal domains.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Spec 1: 2D-FFT */}
              <div className="p-5 rounded-md bg-surface border border-border-default flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[13px] font-mono font-medium text-accent uppercase">
                      01 · Signal Transform
                    </span>
                    <Cpu className="w-4 h-4 text-text-tertiary" />
                  </div>
                  <h3 className="text-[17px] font-semibold text-text-primary mb-2">
                    2D-FFT Azimuthal Decay
                  </h3>
                  <p className="text-[14px] text-text-secondary leading-[1.6]">
                    Spatial frequency spectrum analysis detects azimuthal roll-off and checkerboard
                    sampling grids inherent to generative diffusion and neural upsampling blocks.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-border-subtle text-[11px] font-mono text-text-tertiary flex justify-between">
                  <span>Modality: Image / Video Frames</span>
                  <span className="text-text-secondary">Sensitivity: 98.2%</span>
                </div>
              </div>

              {/* Spec 2: Bayer CFA */}
              <div className="p-5 rounded-md bg-surface border border-border-default flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[13px] font-mono font-medium text-accent uppercase">
                      02 · Sensor Fingerprint
                    </span>
                    <Layers className="w-4 h-4 text-text-tertiary" />
                  </div>
                  <h3 className="text-[17px] font-semibold text-text-primary mb-2">
                    Bayer CFA Residuals
                  </h3>
                  <p className="text-[14px] text-text-secondary leading-[1.6]">
                    Cross-validates Color Filter Array demosaicing patterns and Photo-Response Non-Uniformity
                    (PRNU) noise profiles against authentic physical sensor signatures.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-border-subtle text-[11px] font-mono text-text-tertiary flex justify-between">
                  <span>Modality: Raw Optical Capture</span>
                  <span className="text-text-secondary">Sensor Correlation: High</span>
                </div>
              </div>

              {/* Spec 3: Speed & Privacy */}
              <div className="p-5 rounded-md bg-surface border border-border-default flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[13px] font-mono font-medium text-accent uppercase">
                      03 · Execution Speed
                    </span>
                    <Zap className="w-4 h-4 text-text-tertiary" />
                  </div>
                  <h3 className="text-[17px] font-semibold text-text-primary mb-2">
                    Sub-1.2s Local Analysis
                  </h3>
                  <p className="text-[14px] text-text-secondary leading-[1.6]">
                    Analysis runs locally. Files never leave your device or transit untrusted networks,
                    preserving strict evidentiary chain of custody from seizure to courtroom.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-border-subtle text-[11px] font-mono text-text-tertiary flex justify-between">
                  <span>Latency: &lt;1.2s on Edge</span>
                  <span className="text-status-verified">Zero Cloud Leak</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. 3-STEP "HOW IT WORKS" WORKFLOW */}
        <section className="py-16 sm:py-20 border-b border-border-subtle">
          <div className="max-w-content mx-auto px-4 sm:px-6">
            <div className="mb-10 text-left">
              <span className="text-[11px] font-mono tracking-wider uppercase text-text-tertiary block mb-2">
                Standard Operating Procedure
              </span>
              <h2 className="text-[24px] sm:text-[28px] font-semibold text-text-primary tracking-tight">
                From forensic intake to judicial submission.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Step 1: Ingest */}
              <div className="p-5 rounded-md bg-surface border border-border-default">
                <span className="text-[11px] font-mono text-accent font-semibold tracking-wider uppercase block mb-3">
                  Step 01
                </span>
                <h3 className="text-[16px] font-semibold text-text-primary mb-2">
                  1. Ingest &amp; Seal
                </h3>
                <p className="text-[14px] text-text-secondary leading-[1.6] mb-4">
                  The evidence exhibit is received via direct intake or secure custody transfer. A bit-for-bit
                  SHA-256 cryptographic digest is calculated at the exact second of receipt.
                </p>
                <div className="text-[11px] font-mono text-text-tertiary bg-surface-elevated p-2 rounded-xs border border-border-subtle">
                  Write-protected evidence copy created
                </div>
              </div>

              {/* Step 2: Analyze */}
              <div className="p-5 rounded-md bg-surface border border-border-default">
                <span className="text-[11px] font-mono text-accent font-semibold tracking-wider uppercase block mb-3">
                  Step 02
                </span>
                <h3 className="text-[16px] font-semibold text-text-primary mb-2">
                  2. Neural Analysis
                </h3>
                <p className="text-[14px] text-text-secondary leading-[1.6] mb-4">
                  Parallel multi-modal models evaluate phase continuity, acoustic vocoder signatures,
                  facial landmark jitter, and sensor PRNU noise without modifying original bitstreams.
                </p>
                <div className="text-[11px] font-mono text-text-tertiary bg-surface-elevated p-2 rounded-xs border border-border-subtle">
                  Output: Confidence intervals &amp; spectrograms
                </div>
              </div>

              {/* Step 3: Certify */}
              <div className="p-5 rounded-md bg-surface border border-border-default">
                <span className="text-[11px] font-mono text-accent font-semibold tracking-wider uppercase block mb-3">
                  Step 03
                </span>
                <h3 className="text-[16px] font-semibold text-text-primary mb-2">
                  3. Judicial Certification
                </h3>
                <p className="text-[14px] text-text-secondary leading-[1.6] mb-4">
                  An electronic affidavit under Section 63, Bharatiya Sakshya Adhiniyam (BSA) 2023 is generated
                  with officer credentials, hardware identifier, and cryptographic verification link.
                </p>
                <div className="text-[11px] font-mono text-text-tertiary bg-surface-elevated p-2 rounded-xs border border-border-subtle">
                  Admissible in High Court &amp; Sessions
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. LEGAL CERTIFICATE PREVIEW (Paper-White Card with Serif Font) */}
        <section className="py-16 sm:py-24 border-b border-border-subtle">
          <div className="max-w-content mx-auto px-4 sm:px-6">
            <div className="max-w-[760px] mx-auto mb-10 text-center">
              <span className="text-[11px] font-mono tracking-wider uppercase text-text-tertiary block mb-2">
                Statutory Compliance
              </span>
              <h2 className="text-[24px] sm:text-[30px] font-semibold text-text-primary tracking-tight mb-3">
                Court-admissible electronic records under BSA 2023.
              </h2>
              <p className="text-[15px] text-text-secondary leading-[1.6]">
                Section 63 of Bharatiya Sakshya Adhiniyam (BSA), 2023 governs the admissibility of electronic
                records in Indian courts, superseding Section 65B of the Indian Evidence Act, 1872.
              </p>
            </div>

            {/* Paper Document Preview Card */}
            <div className="max-w-[820px] mx-auto rounded-md bg-paper-bg text-paper-text border border-paper-border p-8 sm:p-12 shadow-sm font-serif">
              {/* Official Header */}
              <div className="text-center pb-6 border-b border-paper-border">
                <div className="text-[11px] tracking-[0.2em] font-sans font-semibold uppercase text-paper-muted mb-1">
                  Government of India · State Cyber Crime Police Division
                </div>
                <h3 className="text-[18px] sm:text-[20px] font-semibold uppercase tracking-tight text-paper-text mb-1">
                  Certificate of Electronic Evidence Admissibility
                </h3>
                <p className="text-[13px] text-paper-muted italic">
                  Under Section 63, Bharatiya Sakshya Adhiniyam (BSA) 2023
                </p>
                <p className="text-[11px] font-sans text-paper-muted mt-1">
                  (Corresponding to earlier Section 65B of the Indian Evidence Act, 1872)
                </p>
              </div>

              {/* Document Meta Row */}
              <div className="py-4 border-b border-paper-border flex flex-wrap justify-between gap-4 text-[12px] font-mono text-paper-muted">
                <span>REF NO: CERT-BSA63-2026-0042</span>
                <span>CASE: FIR-2026-CHD-042</span>
                <span>DATE: 19-OCT-2026 14:22 IST</span>
              </div>

              {/* Official Affirmation Body */}
              <div className="py-6 space-y-4 text-[14px] sm:text-[15px] leading-[1.7] text-paper-text">
                <p>
                  I, the undersigned Investigating Officer, hereby certify that the electronic record
                  produced herewith has been retrieved, preserved, and analyzed by the DeepTrace Forensic Core
                  workstation operating under my lawful custody.
                </p>
                <p>
                  At all material times during the collection and hash-sealing process, the computer system and
                  forensic imaging peripherals were operating properly. Any change to a sealed file changes its
                  SHA-256 hash and is detected immediately.
                </p>
                
                {/* Exhibit Monospace Box inside Paper */}
                <div className="my-4 p-4 rounded-xs bg-[#F3F4F6] border border-paper-border font-mono text-[12px] space-y-1 text-paper-text">
                  <div><strong>Exhibit File:</strong> fir_42_voice_intercept.wav (489.2 KB)</div>
                  <div className="break-all"><strong>SHA-256:</strong> {sampleHash}</div>
                  <div><strong>Forensic Score:</strong> 87.4% Synthetic Likelihood · HiFi-GAN Vocoder Anomaly</div>
                  <div><strong>Custody Copy:</strong> Write-protected evidence copy · Node #4-DELHI-CYBER</div>
                </div>

                <p className="text-[13px] text-paper-muted italic">
                  This certificate satisfies the statutory conditions laid down in Section 63(2) and Section 63(4) of
                  the Bharatiya Sakshya Adhiniyam (BSA), 2023.
                </p>
              </div>

              {/* Official Signature Block */}
              <div className="pt-6 border-t border-dashed border-paper-border flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 text-[12px]">
                <div className="p-3 border border-paper-muted/40 rounded-xs text-center font-sans">
                  <div className="text-[10px] tracking-wider uppercase font-semibold text-paper-muted">
                    Digital Seal of Integrity
                  </div>
                  <div className="text-[11px] font-mono text-accent font-semibold mt-1">
                    SHA-256 VERIFIED &amp; SEEDED
                  </div>
                  <div className="text-[9px] text-paper-muted font-mono mt-0.5">
                    DEEPTRACE FORENSIC CORE
                  </div>
                </div>

                <div className="text-right font-sans text-paper-muted space-y-1">
                  <div className="text-paper-text font-semibold text-[13px]">
                    Insp. Daksh Walia
                  </div>
                  <div>Badge: PB-9482 · Cyber Crime PS, Sector 17</div>
                  <div>State Cyber Crime Division, Chandigarh</div>
                  <div className="text-[11px] font-mono text-status-verified font-medium pt-1">
                    STATUS: DIGITALLY AFFIRMED
                  </div>
                </div>
              </div>
            </div>

            {/* Link to view active case certificate */}
            <div className="text-center mt-8">
              <Link
                href="/cases/DT-847294/certificate"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-surface-elevated hover:bg-surface-hover border border-border-default text-text-primary text-[13px] font-medium transition-colors duration-150"
              >
                <FileText className="w-4 h-4 text-accent" />
                <span>Open Interactive Certificate Viewer</span>
                <ChevronRight className="w-3.5 h-3.5 text-text-tertiary" />
              </Link>
            </div>
          </div>
        </section>

        {/* 6. CALL TO ACTION SECTION */}
        <section className="py-16 sm:py-20 text-center">
          <div className="max-w-[700px] mx-auto px-4 sm:px-6">
            <h2 className="text-[26px] sm:text-[32px] font-semibold tracking-tight text-text-primary mb-3">
              Deploy forensic verification.
            </h2>
            <p className="text-[15px] text-text-secondary leading-[1.6] mb-8">
              Authenticate digital evidence, seal chain-of-custody hashes, and generate court-ready
              BSA 2023 affidavits from your forensic terminal.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/dashboard"
                className="px-6 py-2.5 rounded-sm bg-accent hover:bg-accent-hover text-white text-[14px] font-medium transition-colors duration-150"
              >
                Access Command Center
              </Link>
              <Link
                href="/evidence"
                className="px-6 py-2.5 rounded-sm bg-surface hover:bg-surface-elevated border border-border-default text-text-primary text-[14px] font-medium transition-colors duration-150"
              >
                Browse Evidence Vault
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* 7. INSTITUTIONAL FOOTER */}
      <footer className="border-t border-border-default py-12 px-4 sm:px-6 bg-surface text-[12px] text-text-secondary font-sans">
        <div className="max-w-content mx-auto">
          {/* Top row: Brand & Links */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-border-subtle">
            <div className="md:col-span-2 space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-xs bg-surface-elevated border border-border-default flex items-center justify-center text-accent">
                  <Shield className="w-3 h-3" strokeWidth={2} />
                </div>
                <span className="font-semibold text-text-primary text-[13px]">DeepTrace Forensics</span>
              </div>
              <p className="text-text-tertiary max-w-[45ch] leading-relaxed">
                Government-grade synthetic media forensics suite for police cyber crime units,
                prosecutors, and digital evidence custody officers.
              </p>
              <p className="text-text-tertiary font-mono text-[11px]">
                DeepTrace Forensic Core v2.4.0 (BSA 2023 Compliant)
              </p>
            </div>

            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-text-tertiary block mb-3">
                Forensic Modules
              </span>
              <ul className="space-y-2">
                <li>
                  <Link href="/dashboard" className="hover:text-text-primary transition-colors">
                    Command Center
                  </Link>
                </li>
                <li>
                  <Link href="/scan" className="hover:text-text-primary transition-colors">
                    Media Scanner (2D-FFT)
                  </Link>
                </li>
                <li>
                  <Link href="/audio" className="hover:text-text-primary transition-colors">
                    Voice Lab (Phase Residual)
                  </Link>
                </li>
                <li>
                  <Link href="/evidence" className="hover:text-text-primary transition-colors">
                    Evidence Vault
                  </Link>
                </li>
                <li>
                  <Link href="/cases" className="hover:text-text-primary transition-colors">
                    Court Certificates
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-text-tertiary block mb-3">
                Law Enforcement Contact
              </span>
              <ul className="space-y-2 text-text-tertiary">
                <li>Cyber Crime PS Technical Cell</li>
                <li>Helpline: 1930 (National Cyber Crime)</li>
                <li>Support: forensics@deeptrace.police.in</li>
                <li>Station: Chandigarh Cyber Unit</li>
              </ul>
            </div>
          </div>

          {/* Statutory Evidence Disclaimer */}
          <div className="pt-2">
            <p className="text-[11px] text-text-tertiary leading-[1.6]">
              <strong className="text-text-secondary">Statutory Evidence Disclaimer:</strong> Findings generated by
              DeepTrace are expert-assisted computational forensics provided under Section 63 of the
              Bharatiya Sakshya Adhiniyam (BSA), 2023 (formerly Section 65B of the Indian Evidence Act, 1872).
              Automated classification scores represent probabilistic statistical indicators and do not
              constitute a final judicial determination. All exhibits must be corroborated in accordance with
              statutory procedural rules.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
