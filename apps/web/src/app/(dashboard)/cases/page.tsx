"use client";

import React, { useState } from "react";
import Link from "next/link";
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

const mockCertificates = [
  {
    id: "DT-847294",
    certNumber: "CERT-BSA63-2026-0042",
    fir: "FIR-2026-CHD-042",
    exhibit: "fir_42_voice_intercept.wav",
    standard: "Section 63 BSA 2023",
    supersededRef: "Replaced Sec 65B IEA",
    officer: "Insp. Daksh Walia",
    station: "Cyber Crime PS, Sector 17, Chandigarh",
    date: "19 Oct 2026",
    verdict: "Synthetic Voice Clone (87.4%)",
    status: "Sealed",
  },
  {
    id: "DT-910482",
    certNumber: "CERT-BSA63-2026-0109",
    fir: "FIR-2026-DEL-109",
    exhibit: "cctv_alibi_frame_02.mp4",
    standard: "Section 63 BSA 2023",
    supersededRef: "Replaced Sec 65B IEA",
    officer: "ACP R. Malhotra",
    station: "Special Cell Cyber Ops, New Delhi",
    date: "18 Oct 2026",
    verdict: "Diffusion Face Swap (92.1%)",
    status: "Sealed",
  },
  {
    id: "DT-739104",
    certNumber: "CERT-BSA63-2026-0831",
    fir: "FIR-2026-MUM-831",
    exhibit: "imposter_dg_photo.png",
    standard: "Section 63 BSA 2023",
    supersededRef: "Replaced Sec 65B IEA",
    officer: "SI Priya Deshmukh",
    station: "Cyber PS, Bandra Kurla, Mumbai",
    date: "17 Oct 2026",
    verdict: "Synthetic Diffusion (89.5%)",
    status: "Sealed",
  },
  {
    id: "DT-620491",
    certNumber: "CERT-BSA63-2026-0512",
    fir: "FIR-2026-BLR-512",
    exhibit: "ekyc_liveness_stream.webm",
    standard: "Section 63 BSA 2023",
    supersededRef: "Replaced Sec 65B IEA",
    officer: "Insp. A. Kulkarni",
    station: "CID Cyber Wing, Bengaluru",
    date: "16 Oct 2026",
    verdict: "Biometric Liveness Anomaly (94.6%)",
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
      c.officer.toLowerCase().includes(query.toLowerCase()) ||
      c.station.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-canvas text-text-primary antialiased font-sans py-10 sm:py-14">
      <div className="max-w-content mx-auto px-4 sm:px-6">
        {/* Title & Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-border-subtle">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-text-tertiary">
                Judicial Compliance Hub
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-xs bg-status-verified-bg text-status-verified border border-status-verified-border uppercase">
                Section 63 BSA 2023
              </span>
            </div>
            <h1 className="text-[26px] sm:text-[30px] font-semibold tracking-tight text-text-primary">
              Court Certificates
            </h1>
            <p className="text-[14px] text-text-secondary mt-1 max-w-[65ch]">
              Admissible electronic record affidavits under Section 63 of Bharatiya Sakshya Adhiniyam (BSA), 2023, superseding earlier Section 65B provisions.
            </p>
          </div>

          <Link
            href="/intake"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm bg-accent hover:bg-accent-hover text-white text-[13px] font-medium transition-colors duration-150"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Generate New Certificate</span>
          </Link>
        </div>

        {/* Filter Input */}
        <div className="relative w-full max-w-[360px] mb-6">
          <Search
            className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary pointer-events-none"
            strokeWidth={1.75}
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search certificate reference, FIR, or exhibit…"
            className="w-full pl-9 pr-3 py-1.5 rounded-sm bg-surface border border-border-default text-[13px] text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all"
          />
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.length === 0 ? (
            <div className="col-span-2 py-12 text-center rounded-md border border-border-default bg-surface p-6">
              <FileText className="w-8 h-8 text-text-tertiary mx-auto opacity-50 mb-2" />
              <p className="text-[14px] font-medium text-text-secondary">
                No matching certificates found
              </p>
              <p className="text-[12px] text-text-tertiary">
                Try adjusting your search criteria or register a new evidence intake.
              </p>
            </div>
          ) : (
            filtered.map((cert) => (
              <div
                key={cert.id}
                className="rounded-md bg-surface border border-border-default p-5 hover:border-border-strong transition-colors duration-150 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between pb-3 border-b border-border-subtle mb-3">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-accent" strokeWidth={1.75} />
                      <span className="font-mono text-[12px] font-medium text-text-primary">
                        {cert.certNumber}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-xs bg-status-verified-bg text-status-verified border border-status-verified-border">
                      Sealed · BSA 63
                    </span>
                  </div>

                  {/* Exhibit & Finding */}
                  <div className="space-y-2 mb-4">
                    <div>
                      <div className="text-[11px] text-text-tertiary">Exhibit Target</div>
                      <div className="font-mono text-[13px] text-text-primary truncate">
                        {cert.exhibit}
                      </div>
                    </div>

                    <div className="flex justify-between items-baseline text-[12px]">
                      <span className="text-text-tertiary">FIR Reference:</span>
                      <span className="font-mono text-text-secondary">{cert.fir}</span>
                    </div>

                    <div className="flex justify-between items-baseline text-[12px]">
                      <span className="text-text-tertiary">Deponent Authority:</span>
                      <span className="text-text-secondary">{cert.officer}</span>
                    </div>

                    <div className="flex justify-between items-baseline text-[12px]">
                      <span className="text-text-tertiary">Jurisdiction:</span>
                      <span className="text-text-tertiary truncate max-w-[200px]">{cert.station}</span>
                    </div>

                    <div className="pt-2 border-t border-border-subtle flex justify-between items-baseline text-[12px]">
                      <span className="text-text-tertiary">Forensic Finding:</span>
                      <span className="font-semibold text-status-critical">{cert.verdict}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-3 border-t border-border-subtle flex items-center justify-between text-[12px]">
                  <span className="font-mono text-[11px] text-text-tertiary">
                    {cert.date}
                  </span>
                  <div className="flex items-center gap-2">
                    <a
                      href={buildSection65bPdfUrl({
                        caseId: cert.fir,
                        officerBadgeId: "OFFICER-LEGAL",
                        officerName: cert.officer,
                        mediaJobId: cert.id,
                      })}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded-xs bg-surface-elevated hover:bg-surface-hover border border-border-default text-text-secondary hover:text-text-primary font-normal transition-colors duration-150 inline-flex items-center gap-1"
                    >
                      <Download className="w-3 h-3" />
                      <span>PDF</span>
                    </a>
                    <Link
                      href={`/cases/${cert.id}/certificate`}
                      className="px-2.5 py-1 rounded-xs bg-accent hover:bg-accent-hover text-white font-medium transition-colors duration-150 inline-flex items-center gap-1"
                    >
                      <span>Affidavit</span>
                      <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
