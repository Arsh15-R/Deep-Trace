"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Shield,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Lock,
  ArrowRight,
  Sliders,
  FileAudio,
  FolderLock,
  Play,
} from "lucide-react";
import AppleNavbar from "@/components/AppleNavbar";
import EvidenceHero3D from "@/components/EvidenceHero3D";
import { Page, Reveal, TiltCard } from "@/animations";

export default function LandingPage() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <Page className="min-h-screen bg-apple-bg text-apple-text antialiased selection:bg-apple-blue selection:text-white flex flex-col">
      {/* 1. Slim 48px translucent navbar */}
      <AppleNavbar />

      <main className="flex-1">
        {/* 2. LANDING HERO (Centered, Apple product page style) */}
        <section className="pt-20 sm:pt-28 pb-16 px-6 text-center max-w-[980px] mx-auto">
          {/* Eyebrow */}
          <Reveal>
            <p className="text-[14px] sm:text-[16px] font-medium text-apple-text-secondary mb-3 tracking-normal">
              DeepTrace Forensics
            </p>
          </Reveal>

          {/* Giant Headline */}
          <Reveal delay={0.08}>
            <h1 className="text-[44px] sm:text-[68px] md:text-[80px] font-semibold tracking-apple-tight text-apple-text leading-[1.06] mb-5">
              Every deepfake leaves a trace.
            </h1>
          </Reveal>

          {/* One-line subhead */}
          <Reveal delay={0.16}>
            <p className="text-[19px] sm:text-[23px] text-apple-text-secondary font-normal max-w-[680px] mx-auto leading-relaxed mb-8">
              Find what&apos;s fake. Prove what&apos;s real. Court-ready certificates sealed the moment files arrive.
            </p>
          </Reveal>

          {/* Two Apple actions */}
          <Reveal delay={0.24}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-12">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-apple-blue hover:bg-apple-blue-hover text-white text-[15px] font-medium transition-all shadow-apple-subtle active:scale-[0.98]"
              >
                Open Command Center
              </Link>

              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="inline-flex items-center gap-1.5 text-[15px] text-apple-blue hover:underline font-normal group"
              >
                <span>Watch how it works</span>
                <ChevronRight
                  className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                  strokeWidth={1.5}
                />
              </button>
            </div>
          </Reveal>

          {/* 3D Hero Scene */}
          <Reveal delay={0.32}>
            <div className="mt-4">
              <EvidenceHero3D />
            </div>
          </Reveal>
        </section>

        {/* 3. FEATURE SECTION 1: Full-Bleed Dark Section */}
        <section className="w-full bg-[#000000] text-white py-28 sm:py-36 px-6">
          <div className="max-w-[980px] mx-auto text-center mb-16">
            <Reveal>
              <p className="text-[14px] text-[#86868B] font-medium mb-3">
                Immutable Custody
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="text-[36px] sm:text-[56px] font-semibold tracking-apple-tight leading-[1.1] mb-5 text-[#F5F5F7]">
                Every file sealed the moment it arrives.
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="text-[17px] sm:text-[21px] text-[#86868B] max-w-[620px] mx-auto leading-relaxed">
                Bit-for-bit cryptographic SHA-256 hashes calculated at ingest and pinned to decentralized IPFS custody. Tampering is mathematically impossible.
              </p>
            </Reveal>
          </div>

          {/* Dark Surface Visual with 3D Tilt */}
          <Reveal delay={0.24}>
            <TiltCard className="max-w-[860px] mx-auto rounded-2xl bg-[#1C1C1E] border border-[#333336] p-6 sm:p-8 shadow-2xl">
              <div className="flex items-center justify-between pb-6 border-b border-[#333336]">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-[#FF453A]" />
                  <div className="w-3 h-3 rounded-full bg-[#FF9F0A]" />
                  <div className="w-3 h-3 rounded-full bg-[#30D158]" />
                  <span className="text-[13px] text-[#86868B] ml-2">
                    Evidence Inspector — FIR-2026-CHD-042
                  </span>
                </div>
                <span className="text-[12px] font-mono text-[#30D158] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#30D158]" />
                  Cryptographically Sealed
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
                <div>
                  <span className="text-[12px] text-[#86868B] uppercase tracking-wider block mb-1">
                    SHA-256 Checksum
                  </span>
                  <p className="text-[13px] font-mono text-[#F5F5F7] bg-[#2C2C2E] p-3 rounded-xl break-all">
                    b7a892c90f23d14451c86e09fb8d97531234abcd5678ef901234567890abcdef
                  </p>

                  <div className="mt-5 space-y-3 text-[13px]">
                    <div className="flex justify-between py-1.5 border-b border-[#333336]/60">
                      <span className="text-[#86868B]">Storage standard</span>
                      <span className="text-[#F5F5F7]">IPFS Node (Read-only 0444)</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-[#333336]/60">
                      <span className="text-[#86868B]">Legal compliance</span>
                      <span className="text-[#F5F5F7]">Section 63 BNSS 2023</span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-[#86868B]">Custody station</span>
                      <span className="text-[#F5F5F7]">Cyber Crime PS, Sector 17</span>
                    </div>
                  </div>
                </div>

                {/* Minimalist Waveform / Signal Visual */}
                <div className="bg-[#2C2C2E] rounded-xl p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between text-[12px] mb-2">
                      <span className="text-[#86868B]">Acoustic Frequency Residual</span>
                      <span className="text-[#FF453A] font-semibold">98.5% Synthetic Match</span>
                    </div>
                    <div className="h-28 flex items-end gap-1.5 pt-4">
                      {[42, 68, 85, 30, 95, 88, 72, 45, 92, 100, 84, 55, 78, 62, 90, 81, 74, 96, 68, 52, 89, 77, 43, 64].map(
                        (val, i) => (
                          <div
                            key={i}
                            style={{ height: `${val}%` }}
                            className={`flex-1 rounded-sm transition-all ${
                              val > 75 ? "bg-[#FF453A]" : "bg-[#86868B]/40"
                            }`}
                          />
                        )
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#333336] flex items-center justify-between text-[12px] text-[#86868B]">
                    <span>Detection: HiFi-GAN Vocoder phase anomaly</span>
                    <span className="text-[#2997FF]">Verified</span>
                  </div>
                </div>
              </div>
            </TiltCard>
          </Reveal>
        </section>

        {/* 4. FEATURE SECTION 2: Split Layout Section (Light) */}
        <section className="py-28 sm:py-36 px-6 max-w-[980px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Copy */}
            <Reveal>
              <div>
                <p className="text-[14px] text-apple-text-secondary font-medium mb-3">
                  Legal Admissibility
                </p>
                <h2 className="text-[36px] sm:text-[52px] font-semibold tracking-apple-tight leading-[1.12] mb-5 text-apple-text">
                  Court-ready certificates in one click.
                </h2>
                <p className="text-[17px] text-apple-text-secondary leading-relaxed mb-6">
                  Built specifically for judicial scrutiny under Section 63 of Bharatiya Nagarik Suraksha Sanhita (BNSS 2023) and Section 65B of the Indian Evidence Act. Every document bears verified cryptographic verification links and officer credentials.
                </p>
                <Link
                  href="/cases/DT-847294/certificate"
                  className="inline-flex items-center gap-1.5 text-[15px] text-apple-blue hover:underline font-medium group"
                >
                  <span>View sample court certificate</span>
                  <ChevronRight
                    className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                    strokeWidth={1.5}
                  />
                </Link>
              </div>
            </Reveal>

            {/* Right Visual: Clean Document Card with Tilt */}
            <Reveal delay={0.16}>
              <TiltCard className="rounded-2xl bg-apple-surface border border-apple-hairline p-7 shadow-apple-card">
                <div className="flex items-center justify-between pb-4 border-b border-apple-hairline">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-apple-blue" strokeWidth={1.5} />
                    <span className="text-[14px] font-semibold text-apple-text">
                      Form II — Section 63 BNSS
                    </span>
                  </div>
                  <span className="text-[11px] text-apple-text-secondary font-mono">
                    REF: CERT-2026-042
                  </span>
                </div>

                <div className="py-5 space-y-3.5 text-[13px]">
                  <div className="flex justify-between">
                    <span className="text-apple-text-secondary">Deponent</span>
                    <span className="font-medium text-apple-text">Insp. Daksh Walia</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-apple-text-secondary">Cyber Unit</span>
                    <span className="font-medium text-apple-text">Chandigarh Cyber Crime Cell</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-apple-text-secondary">Target Exhibit</span>
                    <span className="font-mono text-apple-text">fir_42_voice_intercept.wav</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-apple-text-secondary">Judicial Finding</span>
                    <span className="font-semibold text-apple-red">Synthetic Voice Clone (98.5%)</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-apple-hairline flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[12px] text-apple-green font-medium">
                    <CheckCircle2 className="w-4 h-4" strokeWidth={1.5} />
                    <span>Digital Cryptographic Seal Intact</span>
                  </div>
                  <span className="text-[11px] font-mono text-apple-text-tertiary">
                    Verified
                  </span>
                </div>
              </TiltCard>
            </Reveal>
          </div>
        </section>

        {/* 5. FEATURE SECTION 3: Minimal Light Vision Section */}
        <section className="py-24 sm:py-32 px-6 bg-apple-surface-secondary border-t border-b border-apple-hairline">
          <div className="max-w-[980px] mx-auto text-center mb-16">
            <Reveal>
              <p className="text-[14px] text-apple-text-secondary font-medium mb-3">
                Forensic Vision
              </p>
              <h2 className="text-[36px] sm:text-[52px] font-semibold tracking-apple-tight text-apple-text leading-[1.12] mb-5">
                Sensor noise never lies.
              </h2>
              <p className="text-[17px] text-apple-text-secondary max-w-[620px] mx-auto leading-relaxed">
                Camera sensors print physical noise patterns called Photo-Response Non-Uniformity. AI diffusion models leave flat, synthetic spectrums. DeepTrace detects the discrepancy immediately.
              </p>
            </Reveal>
          </div>

          {/* Clean 3-Metric Surface with Tilt */}
          <div className="max-w-[840px] mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Reveal delay={0.08}>
              <TiltCard className="bg-apple-surface rounded-2xl p-6 border border-apple-hairline text-center shadow-apple-subtle">
                <span className="text-[36px] font-semibold text-apple-text tracking-tight block mb-1">
                  2D-FFT
                </span>
                <p className="text-[13px] text-apple-text-secondary">
                  Spatial azimuthal frequency spectrum analysis for GAN artifacts.
                </p>
              </TiltCard>
            </Reveal>

            <Reveal delay={0.16}>
              <TiltCard className="bg-apple-surface rounded-2xl p-6 border border-apple-hairline text-center shadow-apple-subtle">
                <span className="text-[36px] font-semibold text-apple-text tracking-tight block mb-1">
                  Bayer CFA
                </span>
                <p className="text-[13px] text-apple-text-secondary">
                  Color filter array sensor demosaicing cross-validation.
                </p>
              </TiltCard>
            </Reveal>

            <Reveal delay={0.24}>
              <TiltCard className="bg-apple-surface rounded-2xl p-6 border border-apple-hairline text-center shadow-apple-subtle">
                <span className="text-[36px] font-semibold text-apple-text tracking-tight block mb-1">
                  0.2s
                </span>
                <p className="text-[13px] text-apple-text-secondary">
                  Instant frame-by-frame analysis with zero cloud telemetry leak.
                </p>
              </TiltCard>
            </Reveal>
          </div>
        </section>

        {/* 6. CALL TO ACTION */}
        <section className="py-24 sm:py-32 px-6 text-center max-w-[720px] mx-auto">
          <Reveal>
            <h2 className="text-[36px] sm:text-[48px] font-semibold tracking-apple-tight text-apple-text leading-[1.15] mb-4">
              Ready for investigative action.
            </h2>
            <p className="text-[17px] text-apple-text-secondary mb-8">
              Access the police command center or begin a guided evidence intake flow.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/dashboard"
                className="px-8 py-3.5 rounded-full bg-apple-blue hover:bg-apple-blue-hover text-white text-[15px] font-medium transition-all shadow-apple-subtle active:scale-[0.98]"
              >
                Open Command Center
              </Link>
              <Link
                href="/intake"
                className="px-8 py-3.5 rounded-full bg-apple-surface hover:bg-apple-surface-tertiary border border-apple-hairline text-apple-text text-[15px] font-medium transition-all shadow-apple-subtle active:scale-[0.98]"
              >
                Register New Evidence
              </Link>
            </div>
          </Reveal>
        </section>
      </main>

      {/* Apple Minimal Footer */}
      <footer className="border-t border-apple-hairline/80 py-10 px-6 text-apple-text-secondary text-[12px] bg-apple-bg">
        <div className="max-w-[980px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-apple-text">DeepTrace</span>
            <span>· State Cyber Crime PS Forensics Suite</span>
          </div>
          <div className="flex items-center space-x-6 text-apple-text-secondary">
            <span>BNSS 2023 Sec 63 Compliant</span>
            <span>SHA-256 IPFS Sealed</span>
            <span>Indian Evidence Act Sec 65B</span>
          </div>
        </div>
      </footer>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div
            className="absolute inset-0"
            onClick={() => setIsVideoModalOpen(false)}
          />
          <div className="relative w-full max-w-[640px] rounded-2xl apple-vibrancy border border-apple-hairline p-6 shadow-apple-modal z-10 text-center">
            <h3 className="text-[20px] font-semibold text-apple-text mb-2">
              DeepTrace System Overview
            </h3>
            <p className="text-[14px] text-apple-text-secondary mb-6">
              From field seizure to court bench affidavit in three deterministic stages:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left mb-6">
              <div className="p-4 rounded-xl bg-apple-surface-secondary border border-apple-hairline/60">
                <span className="text-[12px] text-apple-blue font-semibold block mb-1">
                  01. INTAKE &amp; SEAL
                </span>
                <p className="text-[12px] text-apple-text-secondary">
                  Instant SHA-256 hash generation and distributed node pinning.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-apple-surface-secondary border border-apple-hairline/60">
                <span className="text-[12px] text-apple-blue font-semibold block mb-1">
                  02. SPECTRAL SCAN
                </span>
                <p className="text-[12px] text-apple-text-secondary">
                  Vocoder phase contour and Bayer CFA demosaicing matching.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-apple-surface-secondary border border-apple-hairline/60">
                <span className="text-[12px] text-apple-blue font-semibold block mb-1">
                  03. BNSS 63 AFFIDAVIT
                </span>
                <p className="text-[12px] text-apple-text-secondary">
                  Deterministic PDF certificate ready for High Court submission.
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="px-6 py-2 rounded-full bg-apple-blue text-white text-[14px] font-medium"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </Page>
  );
}
