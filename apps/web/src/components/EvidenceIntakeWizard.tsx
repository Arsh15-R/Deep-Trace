"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  UploadCloud,
  File,
  CheckCircle2,
  Lock,
  ArrowRight,
  ChevronLeft,
  ShieldCheck,
  FileText,
} from "lucide-react";
import { SealedStamp } from "@/animations";
import { useAuth } from "@/contexts/AuthContext";

export default function EvidenceIntakeWizard() {
  const { profile } = useAuth();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [firNumber, setFirNumber] = useState("FIR-2026-CHD-042");
  const [category, setCategory] = useState("Deepfake Extortion");
  const [fileName, setFileName] = useState("voice_note_intercept_01.wav");
  const [fileSize, setFileSize] = useState("3.8 MB");
  const [officerName, setOfficerName] = useState(profile?.full_name || "Insp. Daksh Walia");
  const [badgeId, setBadgeId] = useState(profile?.badge_no || "CHD-CYB-0042");
  const [station, setStation] = useState(profile?.station || "Cyber Crime PS, Sector 17, Chandigarh");

  // Keep synced if profile loads after mount
  React.useEffect(() => {
    if (profile) {
      if (profile.full_name) setOfficerName(profile.full_name);
      if (profile.badge_no) setBadgeId(profile.badge_no);
      if (profile.station) setStation(profile.station);
    }
  }, [profile]);

  // Sealing simulation
  const [isSealing, setIsSealing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [generatedHash, setGeneratedHash] = useState("");
  const [generatedCid, setGeneratedCid] = useState("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      setFileName(f.name);
      setFileSize(`${(f.size / (1024 * 1024)).toFixed(1)} MB`);
    }
  };

  const handleSeal = () => {
    setIsSealing(true);
    setTimeout(() => {
      setGeneratedHash(
        "a9f4c3821098bfe19483dc081e74a8d0521e105e4fa01234abcd567890abcdef"
      );
      setGeneratedCid("bafybeih6m7z7nplm274c5rq544rvefxsvef4w225jpx45u35h2");
      setIsSealing(false);
      setIsComplete(true);
    }, 1200);
  };

  return (
    <div className="min-h-[75vh] flex flex-col justify-between max-w-[620px] mx-auto px-6 py-12">
      {/* Dynamic Screen Content (Apple Setup Assistant Style) */}
      <div className="flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {/* STEP 1: Case & FIR Information */}
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="text-center"
            >
              <p className="text-[13px] text-apple-text-secondary font-medium mb-2">
                Step 1 of 4
              </p>
              <h2 className="text-[34px] sm:text-[40px] font-semibold tracking-apple-tight text-apple-text mb-3">
                What is the case reference?
              </h2>
              <p className="text-[16px] text-apple-text-secondary max-w-[440px] mx-auto mb-10">
                Enter the First Information Report number and legal category for this exhibit.
              </p>

              <div className="space-y-5 text-left max-w-[420px] mx-auto">
                <div>
                  <label className="text-[13px] text-apple-text-secondary block mb-1.5 font-medium">
                    FIR Registration Number
                  </label>
                  <input
                    type="text"
                    value={firNumber}
                    onChange={(e) => setFirNumber(e.target.value)}
                    placeholder="FIR-2026-XXX-000"
                    className="w-full px-4 py-3 rounded-xl bg-apple-surface border border-apple-hairline text-[16px] font-mono text-apple-text focus:outline-none focus:border-apple-blue"
                  />
                </div>

                <div>
                  <label className="text-[13px] text-apple-text-secondary block mb-1.5 font-medium">
                    Incident Classification
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-apple-surface border border-apple-hairline text-[15px] text-apple-text focus:outline-none focus:border-apple-blue"
                  >
                    <option value="Deepfake Extortion">Deepfake Extortion</option>
                    <option value="Synthetic Impersonation">Synthetic Impersonation</option>
                    <option value="Financial Wiretap Fraud">Financial Wiretap Fraud</option>
                    <option value="Electoral Disinformation">Electoral Disinformation</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Exhibit File Intake */}
          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="text-center"
            >
              <p className="text-[13px] text-apple-text-secondary font-medium mb-2">
                Step 2 of 4
              </p>
              <h2 className="text-[34px] sm:text-[40px] font-semibold tracking-apple-tight text-apple-text mb-3">
                Select the exhibit file.
              </h2>
              <p className="text-[16px] text-apple-text-secondary max-w-[440px] mx-auto mb-10">
                Upload audio, video, or image media seized from suspect devices or feeds.
              </p>

              {/* Calm Dropzone */}
              <label className="max-w-[420px] mx-auto flex flex-col items-center justify-center p-8 rounded-2xl bg-apple-surface border-2 border-dashed border-apple-hairline hover:border-apple-blue cursor-pointer transition-colors group">
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="hidden"
                  accept="audio/*,video/*,image/*"
                />
                <div className="w-12 h-12 rounded-full bg-apple-surface-secondary flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <UploadCloud className="w-6 h-6 text-apple-blue" strokeWidth={1.5} />
                </div>
                <div className="text-[15px] font-medium text-apple-text mb-1">
                  {fileName}
                </div>
                <div className="text-[12px] text-apple-text-secondary">
                  {fileSize} · Click or drag to replace
                </div>
              </label>
            </motion.div>
          )}

          {/* STEP 3: Investigating Officer Credentials */}
          {step === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="text-center"
            >
              <p className="text-[13px] text-apple-text-secondary font-medium mb-2">
                Step 3 of 4
              </p>
              <h2 className="text-[34px] sm:text-[40px] font-semibold tracking-apple-tight text-apple-text mb-3">
                Officer in charge.
              </h2>
              <p className="text-[16px] text-apple-text-secondary max-w-[440px] mx-auto mb-10">
                Specify the investigating authority responsible for this chain of custody.
              </p>

              <div className="space-y-5 text-left max-w-[420px] mx-auto">
                <div>
                  <label className="text-[13px] text-apple-text-secondary block mb-1.5 font-medium">
                    Officer Full Name &amp; Rank
                  </label>
                  <input
                    type="text"
                    value={officerName}
                    onChange={(e) => setOfficerName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-apple-surface border border-apple-hairline text-[15px] text-apple-text focus:outline-none focus:border-apple-blue"
                  />
                </div>

                <div>
                  <label className="text-[13px] text-apple-text-secondary block mb-1.5 font-medium">
                    Badge Identification ID
                  </label>
                  <input
                    type="text"
                    value={badgeId}
                    onChange={(e) => setBadgeId(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-apple-surface border border-apple-hairline text-[15px] font-mono text-apple-text focus:outline-none focus:border-apple-blue"
                  />
                </div>

                <div>
                  <label className="text-[13px] text-apple-text-secondary block mb-1.5 font-medium">
                    Police Station / Jurisdiction
                  </label>
                  <input
                    type="text"
                    value={station}
                    onChange={(e) => setStation(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-apple-surface border border-apple-hairline text-[15px] text-apple-text focus:outline-none focus:border-apple-blue"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 4: Review and Seal / Completion */}
          {step === 4 && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="text-center"
            >
              {!isComplete ? (
                <>
                  <p className="text-[13px] text-apple-text-secondary font-medium mb-2">
                    Step 4 of 4
                  </p>
                  <h2 className="text-[34px] sm:text-[40px] font-semibold tracking-apple-tight text-apple-text mb-3">
                    Seal the exhibit.
                  </h2>
                  <p className="text-[16px] text-apple-text-secondary max-w-[440px] mx-auto mb-8">
                    Review parameters before computing the immutable SHA-256 cryptographic digest.
                  </p>

                  <div className="max-w-[420px] mx-auto bg-apple-surface border border-apple-hairline rounded-2xl p-6 text-left space-y-3 text-[14px] mb-8 shadow-apple-subtle">
                    <div className="flex justify-between py-1 border-b border-apple-hairline/60">
                      <span className="text-apple-text-secondary">FIR Number</span>
                      <span className="font-mono text-apple-text font-medium">{firNumber}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-apple-hairline/60">
                      <span className="text-apple-text-secondary">Exhibit File</span>
                      <span className="text-apple-text font-medium">{fileName}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-apple-hairline/60">
                      <span className="text-apple-text-secondary">Investigator</span>
                      <span className="text-apple-text">{officerName}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-apple-text-secondary">Compliance</span>
                      <span className="text-apple-text">Section 63 BNSS 2023</span>
                    </div>
                  </div>

                  <button
                    onClick={handleSeal}
                    disabled={isSealing}
                    className="w-full max-w-[420px] py-3.5 px-6 rounded-full bg-apple-blue hover:bg-apple-blue-hover text-white text-[15px] font-medium transition-all shadow-apple-subtle disabled:opacity-50"
                  >
                    {isSealing ? "Calculating SHA-256 Hash…" : "Seal Exhibit with SHA-256"}
                  </button>
                </>
              ) : (
                <div className="py-6">
                  <div className="flex justify-center mb-6">
                    <SealedStamp label="SEALED" className="text-apple-green" />
                  </div>
                  <h2 className="text-[34px] sm:text-[40px] font-semibold tracking-apple-tight text-apple-text mb-3">
                    Exhibit Sealed.
                  </h2>
                  <p className="text-[16px] text-apple-text-secondary max-w-[440px] mx-auto mb-8">
                    The evidence has been locked to the decentralized ledger with read-only permissions.
                  </p>

                  <div className="max-w-[420px] mx-auto bg-apple-surface border border-apple-hairline rounded-2xl p-5 text-left space-y-3 mb-8">
                    <div>
                      <span className="text-[11px] text-apple-text-secondary uppercase">
                        SHA-256 Digest
                      </span>
                      <p className="text-[12px] font-mono text-apple-text break-all mt-0.5">
                        {generatedHash}
                      </p>
                    </div>
                    <div>
                      <span className="text-[11px] text-apple-text-secondary uppercase">
                        IPFS CID
                      </span>
                      <p className="text-[12px] font-mono text-apple-text break-all mt-0.5">
                        {generatedCid}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                      href="/dashboard"
                      className="px-7 py-3 rounded-full bg-apple-blue text-white text-[14px] font-medium"
                    >
                      Return to Command Center
                    </Link>
                    <Link
                      href="/cases/DT-847294/certificate"
                      className="px-7 py-3 rounded-full bg-apple-surface border border-apple-hairline text-apple-text text-[14px] font-medium hover:bg-apple-surface-secondary"
                    >
                      View Court Certificate
                    </Link>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Navigation Bar: Progress Dots + Continue Pill */}
      {!isComplete && (
        <div className="pt-12 flex items-center justify-between border-t border-apple-hairline/80 mt-12">
          {/* Back button or placeholder */}
          {step > 1 ? (
            <button
              onClick={() => setStep((s) => (s > 1 ? ((s - 1) as any) : s))}
              className="inline-flex items-center gap-1 text-[14px] text-apple-text-secondary hover:text-apple-text transition-colors"
            >
              <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {/* 4 Apple Progress Dots */}
          <div className="flex items-center gap-2.5">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`transition-all duration-300 rounded-full ${
                  step === i
                    ? "w-6 h-2 bg-apple-text"
                    : step > i
                    ? "w-2 h-2 bg-apple-blue"
                    : "w-2 h-2 bg-apple-hairline-strong"
                }`}
              />
            ))}
          </div>

          {/* Continue Pill Button */}
          {step < 4 ? (
            <button
              onClick={() => setStep((s) => (s < 4 ? ((s + 1) as any) : s))}
              className="px-6 py-2.5 rounded-full bg-apple-blue hover:bg-apple-blue-hover text-white text-[14px] font-medium transition-all shadow-apple-subtle active:scale-[0.98]"
            >
              Continue
            </button>
          ) : (
            <div />
          )}
        </div>
      )}
    </div>
  );
}
