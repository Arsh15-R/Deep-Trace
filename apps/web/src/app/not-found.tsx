import React from "react";
import Link from "next/link";
import { ShieldAlert, ArrowLeft, FolderLock } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-canvas text-text-primary antialiased font-sans flex flex-col justify-between py-12 px-4 selection:bg-accent selection:text-white">
      <div />

      <main className="max-w-[480px] mx-auto text-center">
        <div className="w-12 h-12 rounded-sm bg-surface-elevated border border-border-default flex items-center justify-center text-text-secondary mx-auto mb-6">
          <ShieldAlert className="w-6 h-6 text-accent" strokeWidth={1.75} />
        </div>

        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xs bg-surface-elevated border border-border-default font-mono text-[11px] uppercase tracking-wider text-text-tertiary mb-3">
          Error 404 · Status Record Not Located
        </div>

        <h1 className="text-[24px] sm:text-[28px] font-semibold tracking-tight text-text-primary mb-3">
          Exhibit not found in custody ledger.
        </h1>

        <p className="text-[14px] text-text-secondary leading-[1.6] mb-8">
          The requested record, forensic certificate, or digital evidence exhibit does not exist
          in the active custody chain, or the route address was miskeyed.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-5 py-2.5 rounded-sm bg-accent hover:bg-accent-hover text-white text-[13px] font-medium transition-colors duration-150 inline-flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Command Center</span>
          </Link>

          <Link
            href="/evidence"
            className="w-full sm:w-auto px-5 py-2.5 rounded-sm bg-surface hover:bg-surface-elevated border border-border-default text-text-primary text-[13px] font-medium transition-colors duration-150 inline-flex items-center justify-center gap-2"
          >
            <FolderLock className="w-4 h-4 text-text-tertiary" />
            <span>Search Evidence Vault</span>
          </Link>
        </div>
      </main>

      <footer className="text-center font-mono text-[11px] text-text-tertiary">
        DeepTrace Cyber Forensics Core · Section 63 BSA 2023 Compliant
      </footer>
    </div>
  );
}
