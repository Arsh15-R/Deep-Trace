"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileText,
  Download,
  ExternalLink,
  Search,
  CheckCircle2,
  ChevronRight,
  Shield,
  Plus,
} from "lucide-react";
import { buildSection65bPdfUrl } from "@/lib/api";
import { Page, TiltCard } from "@/animations";

const mockCertificates = [
  {
    id: "DT-847294",
    certNumber: "CERT-BNSS-2026-0042",
    fir: "FIR-2026-CHD-042",
    exhibit: "fir_42_voice_intercept.wav",
    standard: "Section 63 BNSS 2023",
    officer: "Insp. Daksh Walia",
    station: "Cyber Crime PS, Sector 17, Chandigarh",
    date: "02 Oct 2026",
    verdict: "Synthetic Voice Clone (98.5%)",
    status: "Sealed",
  },
  {
    id: "DT-910482",
    certNumber: "CERT-BNSS-2026-0109",
    fir: "FIR-2026-DEL-109",
    exhibit: "cctv_alibi_frame_02.mp4",
    standard: "Section 63 BNSS 2023",
    officer: "ACP R. Malhotra",
    station: "Special Cell Cyber Ops, New Delhi",
    date: "01 Oct 2026",
    verdict: "Diffusion Face Swap (94.2%)",
    status: "Sealed",
  },
  {
    id: "DT-739104",
    certNumber: "CERT-IEA-2026-0831",
    fir: "FIR-2026-MUM-831",
    exhibit: "imposter_dg_photo.png",
    standard: "Section 65B Indian Evidence Act",
    officer: "SI Priya Deshmukh",
    station: "Cyber PS, Bandra Kurla, Mumbai",
    date: "30 Sep 2026",
    verdict: "Synthetic Diffusion (91.2%)",
    status: "Sealed",
  },
  {
    id: "DT-620491",
    certNumber: "CERT-BNSS-2026-0512",
    fir: "FIR-2026-BLR-512",
    exhibit: "ekyc_liveness_stream.webm",
    standard: "Section 63 BNSS 2023",
    officer: "Insp. A. Kulkarni",
    station: "CID Cyber Wing, Bengaluru",
    date: "29 Sep 2026",
    verdict: "Real-time Biometric Replay (97.8%)",
    status: "Sealed",
  },
];

export default function CertificatesHubPage() {
  const [query, setQuery] = useState("");

  const filtered = mockCertificates.filter(
    (c) =>
      c.certNumber.toLowerCase().includes(query.toLowerCase()) ||
      c.fir.toLowerCase().includes(query.toLowerCase()) ||
      c.exhibit.toLowerCase().includes(query.toLowerCase()) ||
      c.officer.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Page className="max-w-[1020px] mx-auto px-4 sm:px-8 py-10 sm:py-16">
      {/* Title & Action */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-12 sm:mb-16">
        <div>
          <h1 className="text-[34px] sm:text-[44px] font-semibold tracking-apple-tight text-apple-text">
            Court Certificates
          </h1>
          <p className="text-[15px] sm:text-[17px] text-apple-text-secondary mt-1">
            Certified electronic record affidavits compliant with Section 63 BNSS 2023.
          </p>
        </div>

        <Link
          href="/intake"
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-apple-blue hover:bg-apple-blue-hover text-white text-[13px] font-medium transition-colors shadow-apple-subtle"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Evidence Affidavit</span>
        </Link>
      </div>

      {/* Search Input */}
      <div className="relative w-full max-w-[340px] mb-8">
        <Search
          className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-apple-text-secondary"
          strokeWidth={1.5}
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search certificate, FIR, or officer…"
          className="w-full pl-9 pr-4 py-2 rounded-full bg-apple-surface border border-apple-hairline text-[13px] text-apple-text placeholder:text-apple-text-secondary focus:outline-none focus:border-apple-blue"
        />
      </div>

      {/* 4. SCANNER / CERTIFICATE CARDS: 3D TILT ON HOVER (TiltCard from animation kit) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((cert) => {
          const pdfUrl = buildSection65bPdfUrl({
            caseId: cert.fir,
            officerBadgeId: "CHD-CYB-0042",
            officerName: cert.officer,
            mediaJobId: cert.id,
            notes: `Certified under ${cert.standard} for exhibit ${cert.exhibit}.`,
          });

          return (
            <TiltCard
              key={cert.id}
              className="rounded-2xl bg-apple-surface border border-apple-hairline p-6 shadow-apple-subtle hover:shadow-apple-card transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-apple-hairline/60">
                  <span className="text-[12px] font-mono text-apple-text-tertiary">
                    {cert.certNumber}
                  </span>
                  <span className="text-[12px] text-apple-green font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                    <span>{cert.status}</span>
                  </span>
                </div>

                <div className="pt-4">
                  <h3 className="text-[18px] font-semibold text-apple-text mb-1">
                    {cert.exhibit}
                  </h3>
                  <p className="text-[13px] font-mono text-apple-text-secondary mb-3">
                    {cert.fir}
                  </p>

                  <div className="space-y-1.5 text-[13px] text-apple-text-secondary">
                    <div className="flex justify-between">
                      <span>Standard:</span>
                      <span className="text-apple-text">{cert.standard}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Authority:</span>
                      <span className="text-apple-text">{cert.officer}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Finding:</span>
                      <span className="text-apple-red font-medium">{cert.verdict}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-apple-hairline/60 flex items-center justify-between">
                <Link
                  href={`/cases/${cert.id}/certificate`}
                  className="text-[13px] text-apple-blue hover:underline inline-flex items-center gap-1 font-medium"
                >
                  <span>View Certificate</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>

                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-apple-surface-secondary hover:bg-apple-surface-tertiary text-apple-text text-[12px] font-medium transition-colors"
                >
                  <Download className="w-3.5 h-3.5" strokeWidth={1.5} />
                  <span>Download PDF</span>
                </a>
              </div>
            </TiltCard>
          );
        })}
      </div>
    </Page>
  );
}
