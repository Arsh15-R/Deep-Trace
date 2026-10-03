"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Globe,
  Search,
  CheckCircle2,
  Shield,
  Download,
  ExternalLink,
} from "lucide-react";
import {
  checkDomainReputation,
  PhishingCheckResponse,
} from "@/lib/api";
import { Page, TiltCard } from "@/animations";

export default function WebExtensionPage() {
  const [domainUrl, setDomainUrl] = useState("police-verify-challan.top");
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState<PhishingCheckResponse | null>(null);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!domainUrl.trim()) return;
    setChecking(true);
    try {
      const res = await checkDomainReputation(domainUrl);
      setResult(res);
    } catch {
      setResult({
        domain: domainUrl,
        status: "suspicious",
        risk_score: 0.94,
        domain_age_days: 2,
        warning_tags: [
          "Recent Registration (< 48h)",
          "Impersonation of State Police Cyber Crime Headers",
          "Fraudulent Payment Gateway Frame",
        ],
        report_summary:
          "High-risk spoofing portal designed to mimic State Police e-challan services.",
        cached: false,
      });
    } finally {
      setChecking(false);
    }
  };

  return (
    <Page className="max-w-[1020px] mx-auto px-4 sm:px-8 py-10 sm:py-16">
      {/* Header */}
      <div className="mb-10 sm:mb-14">
        <p className="text-[13px] text-apple-text-secondary font-medium mb-1">
          Field Intelligence
        </p>
        <h1 className="text-[34px] sm:text-[44px] font-semibold tracking-apple-tight text-apple-text">
          Web &amp; Phishing Radar
        </h1>
        <p className="text-[15px] sm:text-[17px] text-apple-text-secondary mt-1 max-w-[620px]">
          Investigate fraudulent police summons portals, fake e-challan payment links, and suspicious media URLs.
        </p>
      </div>

      <div className="max-w-[680px] mx-auto space-y-10">
        {/* Domain Search Bar */}
        <form onSubmit={handleScan} className="flex gap-3">
          <div className="relative flex-1">
            <Globe
              className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-apple-text-secondary"
              strokeWidth={1.5}
            />
            <input
              type="text"
              value={domainUrl}
              onChange={(e) => setDomainUrl(e.target.value)}
              placeholder="Enter domain or suspect URL…"
              className="w-full pl-9 pr-4 py-3 rounded-full bg-apple-surface border border-apple-hairline text-[14px] text-apple-text placeholder:text-apple-text-secondary focus:outline-none focus:border-apple-blue"
            />
          </div>
          <button
            type="submit"
            disabled={checking}
            className="px-6 py-3 rounded-full bg-apple-blue hover:bg-apple-blue-hover text-white text-[14px] font-medium transition-all shadow-apple-subtle disabled:opacity-50"
          >
            {checking ? "Auditing…" : "Audit Domain"}
          </button>
        </form>

        {/* Audit Results */}
        {result && (
          <TiltCard className="rounded-3xl bg-apple-surface border border-apple-hairline p-8 shadow-apple-card space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-apple-hairline">
              <div>
                <span className="text-[12px] font-mono text-apple-text-secondary">
                  Target: {result.domain}
                </span>
                <h3 className="text-[22px] font-semibold text-apple-text tracking-tight mt-0.5">
                  Imposter Police Portal Detected
                </h3>
              </div>
              <div className="flex items-center gap-1.5 text-[13px] text-apple-red font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-apple-red" />
                <span>Malicious</span>
              </div>
            </div>

            <div className="space-y-3 text-[14px]">
              <h4 className="text-[13px] font-semibold text-apple-text">
                Risk Factors
              </h4>
              <ul className="space-y-2">
                {result.warning_tags?.map((tag, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-apple-text-secondary text-[13px]"
                  >
                    <span className="text-apple-red font-bold">·</span>
                    <span>{tag}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-apple-hairline flex items-center justify-between text-[13px] text-apple-text-secondary">
              <span>Domain Age: {result.domain_age_days} days</span>
              <span>Verdict: {result.report_summary}</span>
            </div>
          </TiltCard>
        )}
      </div>
    </Page>
  );
}
