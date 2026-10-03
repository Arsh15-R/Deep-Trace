"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FolderLock,
  Search,
  Download,
  Copy,
  Check,
  FileText,
  CheckCircle2,
  Lock,
  Plus,
} from "lucide-react";
import { Page, StaggerTBody, StaggerRow } from "@/animations";

interface VaultItem {
  id: string;
  filename: string;
  size: string;
  sha256: string;
  cid: string;
  fir: string;
  station: string;
  timestamp: string;
  status: "Sealed";
}

const mockVault: VaultItem[] = [
  {
    id: "DT-VAULT-042",
    filename: "fir_42_voice_intercept.wav",
    size: "489 KB",
    sha256: "b7a892c90f23d14451c86e09fb8d97531234abcd5678ef901234567890abcdef",
    cid: "bafybeicciqduqsz6pecwgtpsfyl2texlw2xcqzf2v64e72wl5uw",
    fir: "FIR-2026-CHD-042",
    station: "Cyber Crime PS, Sector 17, Chandigarh",
    timestamp: "02 Oct 2026, 20:44",
    status: "Sealed",
  },
  {
    id: "DT-VAULT-109",
    filename: "cctv_alibi_frame_02.mp4",
    size: "18.4 MB",
    sha256: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    cid: "bafybeih6m7z7nplm274c5rq544rvefxsvef4w225jpx45u35h2",
    fir: "FIR-2026-DEL-109",
    station: "Special Cell, Cyber Ops, New Delhi",
    timestamp: "01 Oct 2026, 19:15",
    status: "Sealed",
  },
  {
    id: "DT-VAULT-831",
    filename: "imposter_dg_photo.png",
    size: "2.1 MB",
    sha256: "7d865e959b2466918c9863afca942d0fb89d7c9ac0c99bafc3749504ded97730",
    cid: "bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi",
    fir: "FIR-2026-MUM-831",
    station: "Cyber Police Station, Bandra Kurla, Mumbai",
    timestamp: "30 Sep 2026, 16:30",
    status: "Sealed",
  },
  {
    id: "DT-VAULT-512",
    filename: "ekyc_liveness_stream.webm",
    size: "12.8 MB",
    sha256: "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824",
    cid: "bafybeihdwdcefgh4dqkjv67uzcmw7ojee6xedzdetojuzjevtenxquvyku",
    fir: "FIR-2026-BLR-512",
    station: "CID Cyber Wing, Bengaluru",
    timestamp: "29 Sep 2026, 14:18",
    status: "Sealed",
  },
];

export default function EvidenceVaultPage() {
  const [query, setQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = mockVault.filter(
    (item) =>
      item.filename.toLowerCase().includes(query.toLowerCase()) ||
      item.fir.toLowerCase().includes(query.toLowerCase()) ||
      item.station.toLowerCase().includes(query.toLowerCase())
  );

  const copyHash = (hash: string, id: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <Page className="max-w-[1180px] mx-auto px-4 sm:px-8 py-10 sm:py-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-12 sm:mb-16">
        <div>
          <h1 className="text-[34px] sm:text-[44px] font-semibold tracking-apple-tight text-apple-text">
            Evidence Vault
          </h1>
          <p className="text-[15px] sm:text-[17px] text-apple-text-secondary mt-1">
            Immutable custody repository pinned with SHA-256 hash chains.
          </p>
        </div>

        <Link
          href="/intake"
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-apple-blue hover:bg-apple-blue-hover text-white text-[13px] font-medium transition-colors shadow-apple-subtle"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Intake New Evidence</span>
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
          placeholder="Filter vault exhibits…"
          className="w-full pl-9 pr-4 py-2 rounded-full bg-apple-surface border border-apple-hairline text-[13px] text-apple-text placeholder:text-apple-text-secondary focus:outline-none focus:border-apple-blue"
        />
      </div>

      {/* Calm Table with Staggered Rows */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-apple-hairline text-[12px] text-apple-text-secondary font-medium">
              <th className="py-3 px-4 font-medium">Exhibit File</th>
              <th className="py-3 px-4 font-medium">Custody Status</th>
              <th className="py-3 px-4 font-medium">FIR Reference</th>
              <th className="py-3 px-4 font-medium hidden md:table-cell">Station</th>
              <th className="py-3 px-4 font-medium hidden sm:table-cell">SHA-256 Hash</th>
              <th className="py-3 px-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <StaggerTBody animateKey={query}>
            {filtered.map((item) => (
              <StaggerRow
                key={item.id}
                className="h-14 border-b border-apple-hairline/70 transition-colors"
              >
                {/* Filename & size */}
                <td className="py-3 px-4">
                  <div className="text-[14px] font-medium text-apple-text">
                    {item.filename}
                  </div>
                  <div className="text-[11px] text-apple-text-secondary">
                    {item.size} · {item.timestamp}
                  </div>
                </td>

                {/* Status Dot */}
                <td className="py-3 px-4">
                  <div className="flex items-center gap-1.5 text-[13px] text-apple-green font-medium">
                    <span className="w-2 h-2 rounded-full bg-apple-green" />
                    <span>Sealed</span>
                  </div>
                </td>

                {/* FIR */}
                <td className="py-3 px-4 text-[13px] font-mono text-apple-text">
                  {item.fir}
                </td>

                {/* Station */}
                <td className="py-3 px-4 hidden md:table-cell text-[13px] text-apple-text-secondary max-w-[220px] truncate">
                  {item.station}
                </td>

                {/* Hash */}
                <td className="py-3 px-4 hidden sm:table-cell">
                  <button
                    onClick={() => copyHash(item.sha256, item.id)}
                    className="flex items-center gap-1.5 font-mono text-[11px] text-apple-text-secondary hover:text-apple-blue"
                    title="Click to copy SHA-256 digest"
                  >
                    <span>{item.sha256.slice(0, 16)}…</span>
                    {copiedId === item.id ? (
                      <Check className="w-3 h-3 text-apple-green" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                </td>

                {/* Actions */}
                <td className="py-3 px-4 text-right">
                  <Link
                    href={`/cases/${item.id}/certificate`}
                    className="inline-flex items-center gap-1 text-[13px] text-apple-blue hover:underline font-medium"
                  >
                    <span>Certificate</span>
                  </Link>
                </td>
              </StaggerRow>
            ))}
          </StaggerTBody>
        </table>
      </div>
    </Page>
  );
}
