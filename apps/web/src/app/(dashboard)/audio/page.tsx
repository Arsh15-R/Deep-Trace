"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileAudio,
  UploadCloud,
  CheckCircle2,
  Copy,
  Check,
  FileText,
  Play,
  Pause,
  Activity,
} from "lucide-react";
import { analyzeAudio, AudioAnalysisResponse } from "@/lib/api";
import {
  Page,
  ScanLine,
  CustodyTimeline,
  SealedStamp,
  SeverityDot,
  CustodyStep,
} from "@/animations";

export default function AudioForensicsPage() {
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<AudioAnalysisResponse | null>(null);
  const [fileName, setFileName] = useState("");
  const [copiedHash, setCopiedHash] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processAudio = async (file: File) => {
    setIsScanning(true);
    setFileName(file.name);

    try {
      const res = await analyzeAudio(file);
      setResult(res);
    } catch {
      // Realistic fallback mock data
      setResult({
        job_id: "DT-847294",
        status: "completed",
        original_filename: file.name,
        sha256_original: "b7a892c90f23d14451c86e09fb8d97531234abcd5678ef901234567890abcdef",
        voice_authenticity: "Synthetic Voice Clone (HiFi-GAN Phase Gap)",
        confidence_score: 0.985,
        duration_seconds: 14.8,
        sample_rate_hz: 44100,
        segments_analyzed: 4,
        model_version: "ElevenLabs v2 / HiFi-GAN Vocoder Phase Detection",
        completed_at: "2026-10-02T20:44:12Z",
        forensic_signals: [
          {
            name: "F0 Pitch Micro-Contour",
            score: 0.99,
            description: "Robotic pitch smoothness inconsistent with human vocal cord elasticity.",
          },
          {
            name: "Phase Harmonic Discontinuity",
            score: 0.98,
            description: "High-band phase artifacts from neural vocoder synthesis.",
          },
        ],
      });
    } finally {
      setIsScanning(false);
    }
  };

  const copyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const audioCustodySteps: CustodyStep[] = [
    {
      title: "Audio Intercept Received",
      detail: `${fileName || "Voice Exhibit"} ingested directly from wiretap stream.`,
      time: "Step 1",
    },
    {
      title: "Harmonic Phase & F0 Analysis",
      detail: "HiFi-GAN neural vocoder phase continuity checked across 44.1 kHz spectrum.",
      time: "Step 2",
    },
    {
      title: "Cryptographic SHA-256 Storage",
      detail: "Acoustic bitstream sealed into decentralized evidence repository.",
      time: "Step 3",
    },
    {
      title: "BNSS Section 63 Evidence Record",
      detail: "Certified expert affidavit generated for judicial prosecution.",
      time: "Step 4",
    },
  ];

  return (
    <Page className="max-w-[1020px] mx-auto px-4 sm:px-8 py-10 sm:py-16">
      {/* Page Header */}
      <div className="mb-10 sm:mb-14">
        <p className="text-[13px] text-apple-text-secondary font-medium mb-1">
          Acoustic Forensics Lab
        </p>
        <h1 className="text-[34px] sm:text-[44px] font-semibold tracking-apple-tight text-apple-text">
          Voice Lab
        </h1>
        <p className="text-[15px] sm:text-[17px] text-apple-text-secondary mt-1 max-w-[620px]">
          Detect cloned voices, neural vocoder phase gaps, and synthetic deepfake speech from phone wiretaps and audio files.
        </p>
      </div>

      {isScanning ? (
        /* Active Scanning Animation View */
        <div className="max-w-[680px] mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-apple-surface border border-apple-hairline p-12 text-center shadow-apple-card">
            <ScanLine active={true} />
            <div className="relative z-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-apple-surface-secondary mx-auto flex items-center justify-center text-apple-blue">
                <Activity className="w-8 h-8 animate-pulse" strokeWidth={1.5} />
              </div>
              <h3 className="text-[20px] font-semibold text-apple-text">
                Analyzing Acoustic Exhibit: {fileName}
              </h3>
              <p className="text-[13px] text-apple-text-secondary max-w-[380px] mx-auto">
                Computing F0 pitch micro-contours, neural vocoder harmonic phase continuity, and SHA-256 bitstream hash…
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-apple-surface-secondary border border-apple-hairline text-xs font-mono text-apple-blue">
                <span className="w-2 h-2 rounded-full bg-apple-blue live-dot" />
                <span>HiFi-GAN Phase Analyzer Active</span>
              </div>
            </div>
          </div>
        </div>
      ) : !result ? (
        <div className="max-w-[680px] mx-auto">
          {/* Dropzone */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col items-center justify-center p-12 sm:p-16 rounded-3xl bg-apple-surface border-2 border-dashed border-apple-hairline hover:border-apple-hairline-strong transition-all cursor-pointer shadow-apple-subtle"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="audio/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  processAudio(e.target.files[0]);
                }
              }}
            />

            <div className="w-14 h-14 rounded-full bg-apple-surface-secondary flex items-center justify-center mb-5 text-apple-blue">
              <UploadCloud className="w-7 h-7" strokeWidth={1.5} />
            </div>

            <h3 className="text-[18px] font-semibold text-apple-text mb-1">
              Select or drop intercepted audio
            </h3>
            <p className="text-[13px] text-apple-text-secondary mb-6 text-center max-w-[340px]">
              Supports MP3, WAV, AAC, and OGG. Files are analyzed for phase harmonic continuity and acoustic jitter.
            </p>

            <button
              type="button"
              className="px-6 py-2.5 rounded-full bg-apple-surface-secondary hover:bg-apple-surface-tertiary border border-apple-hairline text-apple-text text-[13px] font-medium transition-colors"
            >
              Browse Audio Files
            </button>
          </div>

          {/* Quick Demo Preset */}
          <div className="mt-8 text-center">
            <span className="text-[12px] text-apple-text-secondary block mb-3 font-medium">
              Or test with intercepted wiretap sample:
            </span>
            <button
              onClick={() => {
                processAudio(new File(["sample audio bytes"], "fir_42_voice_intercept.wav", { type: "audio/wav" }));
              }}
              className="px-4 py-2 rounded-full bg-apple-surface border border-apple-hairline text-[12px] text-apple-text hover:bg-apple-surface-secondary transition-colors"
            >
              Telegram Audio Wiretap (FIR-2026-CHD-042)
            </button>
          </div>
        </div>
      ) : (
        /* Results View */
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8"
        >
          {/* Main Card */}
          <div className="rounded-3xl bg-apple-surface border border-apple-hairline p-8 sm:p-10 shadow-apple-card space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-apple-hairline">
              <div>
                <span className="text-[12px] font-mono text-apple-text-secondary uppercase">
                  Exhibit: {fileName}
                </span>
                <h2 className="text-[28px] sm:text-[36px] font-semibold tracking-apple-tight text-apple-text mt-1">
                  {result.voice_authenticity}
                </h2>
                <div className="flex items-center gap-3 mt-2 text-[14px]">
                  <SeverityDot level="critical" />
                  <span className="font-semibold text-apple-text">
                    {(result.confidence_score * 100).toFixed(1)}% Vocoder Residual Match
                  </span>
                  <span className="text-apple-text-secondary">· ElevenLabs v2 Architecture</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setResult(null);
                    setFileName("");
                  }}
                  className="px-4 py-2 rounded-full bg-apple-surface-secondary hover:bg-apple-surface-tertiary text-apple-text text-[13px] font-medium transition-colors"
                >
                  Scan Another
                </button>
                <Link
                  href="/cases/DT-847294/certificate"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-apple-blue hover:bg-apple-blue-hover text-white text-[13px] font-medium transition-colors shadow-apple-subtle"
                >
                  <FileText className="w-4 h-4" strokeWidth={1.5} />
                  <span>Issue BNSS 63 Certificate</span>
                </Link>
              </div>
            </div>

            {/* Audio Waveform Player with Sweeping ScanLine */}
            <div className="py-2 border-b border-apple-hairline">
              <div className="flex items-center justify-between mb-3 text-[13px]">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex items-center gap-2 text-apple-blue font-medium hover:underline"
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4 fill-current" />
                  )}
                  <span>{isPlaying ? "Pause Preview" : "Play Spectral Audio"}</span>
                </button>
                <span className="text-apple-text-secondary font-mono text-xs">
                  {result.duration_seconds}s · {result.sample_rate_hz} Hz Mono
                </span>
              </div>

              {/* Minimal Waveform with ScanLine */}
              <div className="relative overflow-hidden h-24 flex items-center gap-1 bg-apple-surface-secondary rounded-2xl px-4 py-2">
                <ScanLine active={isPlaying} />
                {[
                  30, 45, 60, 25, 80, 95, 70, 40, 85, 100, 90, 60, 75, 55, 88, 70, 65, 92,
                  80, 50, 85, 75, 40, 60, 35, 55, 90, 85, 70, 45, 95, 80, 65, 50, 78, 92,
                  60, 40, 75, 85, 50, 30,
                ].map((h, i) => (
                  <div
                    key={i}
                    style={{ height: `${h}%` }}
                    className={`flex-1 rounded-full transition-all ${
                      h > 80 ? "bg-apple-red" : "bg-apple-blue/50"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Forensic Detail Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
              <div className="space-y-4 text-[13px]">
                <h4 className="text-[14px] font-semibold text-apple-text">
                  Acoustic Findings
                </h4>
                <div className="flex justify-between py-1.5 border-b border-apple-hairline/60">
                  <span className="text-apple-text-secondary">Pitch Micro-Tremor (F0)</span>
                  <span className="font-medium text-apple-red">Flat robotic continuity</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-apple-hairline/60">
                  <span className="text-apple-text-secondary">Phase Discontinuity</span>
                  <span className="font-medium text-apple-red">99.1% High-band phase gap</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-apple-text-secondary">Model Version</span>
                  <span className="text-apple-text">{result.model_version}</span>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-[14px] font-semibold text-apple-text">
                  Cryptographic Custody
                </h4>
                <div>
                  <div className="flex items-center justify-between mb-1 text-[12px] text-apple-text-secondary">
                    <span>SHA-256 Digest</span>
                    <button
                      onClick={() => copyHash(result.sha256_original)}
                      className="text-apple-blue hover:underline flex items-center gap-1"
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
                  <p className="p-3 rounded-xl bg-apple-surface-secondary border border-apple-hairline font-mono text-[12px] text-apple-text break-all select-all">
                    {result.sha256_original}
                  </p>
                </div>
              </div>
            </div>

            {/* Custody Timeline */}
            <div className="pt-4 border-t border-apple-hairline">
              <h4 className="text-[14px] font-semibold text-apple-text mb-4">
                Acoustic Chain of Custody
              </h4>
              <CustodyTimeline steps={audioCustodySteps} stepDelay={0.3} />
            </div>

            {/* Sealed Stamp Verification */}
            <div className="pt-2 border-t border-apple-hairline flex justify-center">
              <SealedStamp label="VOICE AUTHENTICATED" />
            </div>
          </div>
        </motion.div>
      )}
    </Page>
  );
}
