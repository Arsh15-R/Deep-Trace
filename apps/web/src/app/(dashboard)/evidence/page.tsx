"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FolderLock,
  Search,
  Download,
  Copy,
  Check,
  FileText,
  Lock,
  Plus,
  Shield,
  ExternalLink,
} from "lucide-react";

interface VaultItem {
  id: string;
  filename: string;
  size: string;
  sha256: string;
  cid: string;
  fir: string;
  station: string;
  timestamp: string;
  storageMode: string;
  status: "Sealed";
}

const mockVault: VaultItem[] = [
  {
    id: "DT-VAULT-042",
    filename: "fir_42_voice_intercept.wav",
    size: "489.2 KB",
    sha256: "8f4b237190e2a481c5d8742b036e91f1a547289d0b63c78142e0fa9513d8a7c2",
    cid: "bafybeih6m7z7nplm274c5rq544rvefxsvef4w225jpx45u35h27d865e9",
    fir: "FIR-2026-CHD-042",
    station: "Cyber Crime PS, Sector 17, Chandigarh",
    timestamp: "19 Oct 2026, 14:22",
    storageMode: "Write-protected evidence copy",
    status: "Sealed",
  },
  {
    id: "DT-VAULT-109",
    filename: "cctv_alibi_frame_02.mp4",
    size: "18.4 MB",
    sha256: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    cid: "bafybeicciqduqsz6pecwgtpsfyl2texlw2xcqzf2v64e72wl5uw671239",
    fir: "FIR-2026-DEL-109",
    station: "Special Cell, Cyber Ops, New Delhi",
    timestamp: "18 Oct 2026, 19:15",
    storageMode: "Write-protected evidence copy",
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
    timestamp: "17 Oct 2026, 16:30",
    storageMode: "Write-protected evidence copy",
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
    timestamp: "16 Oct 2026, 11:18",
    storageMode: "Write-protected evidence copy",
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
      item.station.toLowerCase().includes(query.toLowerCase()) ||
      item.sha256.toLowerCase().includes(query.toLowerCase())
  );

  const copyHash = (hash: string, id: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-canvas text-text-primary antialiased font-sans py-10 sm:py-14">
      <div className="max-w-content mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-border-subtle">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-text-tertiary">
                Statutory Evidence Custody
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-xs bg-status-verified-bg text-status-verified border border-status-verified-border uppercase">
                Section 63 BSA 2023
              </span>
            </div>
            <h1 className="text-[26px] sm:text-[30px] font-semibold tracking-tight text-text-primary">
              Evidence Vault
            </h1>
            <p className="text-[14px] text-text-secondary mt-1 max-w-[65ch]">
              Tamper-evident repository with irreversible SHA-256 digests. Any change to a sealed file changes its hash and is detected immediately.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/intake"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm bg-accent hover:bg-accent-hover text-white text-[13px] font-medium transition-colors duration-150"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Intake Evidence</span>
            </Link>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
          <div className="relative w-full max-w-[360px]">
            <Search
              className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary pointer-events-none"
              strokeWidth={1.75}
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter by exhibit name, FIR, station, or hash…"
              className="w-full pl-9 pr-3 py-1.5 rounded-sm bg-surface border border-border-default text-[13px] text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all"
            />
          </div>

          <div className="text-[12px] font-mono text-text-tertiary self-center">
            Exhibits in custody: <strong className="text-text-primary">{filtered.length}</strong> of {mockVault.length}
          </div>
        </div>

        {/* Vault Table */}
        <div className="rounded-md border border-border-default bg-surface overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[13px]">
              <thead>
                <tr className="border-b border-border-default bg-surface-elevated text-[11px] font-mono uppercase text-text-tertiary tracking-wider">
                  <th className="py-2.5 px-4 font-medium">Exhibit Record</th>
                  <th className="py-2.5 px-4 font-medium">Custody Mode</th>
                  <th className="py-2.5 px-4 font-medium">FIR Reference</th>
                  <th className="py-2.5 px-4 font-medium hidden md:table-cell">Police Station</th>
                  <th className="py-2.5 px-4 font-medium hidden sm:table-cell">SHA-256 Digest</th>
                  <th className="py-2.5 px-4 font-medium text-right">Affidavit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-text-tertiary">
                      <div className="max-w-[300px] mx-auto space-y-2">
                        <FolderLock className="w-8 h-8 text-text-tertiary mx-auto opacity-50" />
                        <p className="text-[14px] font-medium text-text-secondary">
                          No exhibits found
                        </p>
                        <p className="text-[12px] text-text-tertiary">
                          No digital evidence exhibits match your filter criteria in this custody ledger.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filtered.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-surface-elevated/50 transition-colors duration-150"
                    >
                      {/* Filename & size */}
                      <td className="py-3 px-4">
                        <div className="font-medium text-text-primary">
                          {item.filename}
                        </div>
                        <div className="text-[11px] font-mono text-text-tertiary">
                          {item.size} · {item.timestamp}
                        </div>
                      </td>

                      {/* Custody Status */}
                      <td className="py-3 px-4">
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-xs bg-status-verified-bg text-status-verified border border-status-verified-border text-[11px] font-mono">
                          <span className="w-1.5 h-1.5 rounded-full bg-status-verified" />
                          <span>Sealed</span>
                        </div>
                        <div className="text-[10px] text-text-tertiary mt-0.5">
                          {item.storageMode}
                        </div>
                      </td>

                      {/* FIR */}
                      <td className="py-3 px-4 font-mono text-[12px] text-text-secondary">
                        {item.fir}
                      </td>

                      {/* Station */}
                      <td className="py-3 px-4 hidden md:table-cell text-text-tertiary max-w-[220px] truncate text-[12px]">
                        {item.station}
                      </td>

                      {/* Hash */}
                      <td className="py-3 px-4 hidden sm:table-cell">
                        <button
                          onClick={() => copyHash(item.sha256, item.id)}
                          className="flex items-center gap-1.5 font-mono text-[11px] text-text-secondary hover:text-accent transition-colors"
                          title="Click to copy 64-char SHA-256 hash"
                        >
                          <span>{item.sha256.slice(0, 16)}…</span>
                          {copiedId === item.id ? (
                            <Check className="w-3 h-3 text-status-verified" />
                          ) : (
                            <Copy className="w-3 h-3 text-text-tertiary" />
                          )}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <Link
                          href={`/cases/${item.id}/certificate`}
                          className="inline-flex items-center gap-1 text-[12px] text-accent hover:text-accent-light font-medium transition-colors"
                        >
                          <span>BSA 63 Form</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="px-4 py-3 bg-surface-elevated/50 border-t border-border-default flex flex-col sm:flex-row items-center justify-between text-[11px] text-text-tertiary gap-2">
            <span>
              All exhibits sealed with NIST FIPS 180-4 SHA-256 digests.
            </span>
            <span>
              Analysis runs locally. Files never leave your device.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
