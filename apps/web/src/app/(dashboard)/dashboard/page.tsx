"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Download,
  Plus,
  ArrowUpDown,
  FileSpreadsheet,
  CheckCircle2,
  Building,
} from "lucide-react";
import * as XLSX from "xlsx";
import CaseInspectorSheet, { CaseRecord } from "@/components/CaseInspectorSheet";
import { Page, CountUp, StaggerTBody, StaggerRow, SeverityDot } from "@/animations";
import { useAuth } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

// Realistic police case intercepts
const initialCases: CaseRecord[] = [
  {
    id: "DT-847294",
    fir: "FIR-2026-CHD-042",
    source: "Telegram Audio Wiretap",
    target: "fir_42_voice_intercept.wav",
    type: "AUDIO",
    severity: "CRITICAL",
    verdict: "Synthetic Voice Clone",
    score: 0.985,
    engine: "HiFi-GAN Vocoder / ElevenLabs",
    hash: "b7a892c90f23d14451c86e09fb8d97531234abcd5678ef901234567890abcdef",
    cid: "bafybeicciqduqsz6pecwgtpsfyl2texlw2xcqzf2v64e72wl5uw",
    station: "Cyber Crime Police Station, Sector 17, Chandigarh",
    time: "Today, 10:44 AM",
    status: "LOCKED",
  },
  {
    id: "DT-910482",
    fir: "FIR-2026-DEL-109",
    source: "Police FIR Portal",
    target: "cctv_alibi_frame_02.mp4",
    type: "VIDEO",
    severity: "CRITICAL",
    verdict: "Diffusion Face Swap",
    score: 0.942,
    engine: "DeepFaceLab / Runway Gen-3",
    hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    cid: "bafybeih6m7z7nplm274c5rq544rvefxsvef4w225jpx45u35h2",
    station: "Special Cell, Cyber Ops, New Delhi",
    time: "Today, 09:15 AM",
    status: "LOCKED",
  },
  {
    id: "DT-739104",
    fir: "FIR-2026-MUM-831",
    source: "WhatsApp Seizure",
    target: "imposter_dg_photo.png",
    type: "IMAGE",
    severity: "HIGH",
    verdict: "Synthetic Diffusion",
    score: 0.912,
    engine: "Midjourney v6.1 Residual",
    hash: "7d865e959b2466918c9863afca942d0fb89d7c9ac0c99bafc3749504ded97730",
    cid: "bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi",
    station: "Cyber Police Station, Bandra Kurla, Mumbai",
    time: "Yesterday, 04:30 PM",
    status: "LOCKED",
  },
  {
    id: "DT-620491",
    fir: "FIR-2026-BLR-512",
    source: "Bank Verification Feed",
    target: "ekyc_liveness_stream.webm",
    type: "VIDEO",
    severity: "CRITICAL",
    verdict: "Real-time Biometric Replay",
    score: 0.978,
    engine: "LivePortrait v2 / Real-Time GAN",
    hash: "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824",
    cid: "bafybeihdwdcefgh4dqkjv67uzcmw7ojee6xedzdetojuzjevtenxquvyku",
    station: "CID Cyber Wing, Bengaluru",
    time: "Yesterday, 02:18 PM",
    status: "LOCKED",
  },
  {
    id: "DT-519284",
    fir: "FIR-2026-HYD-204",
    source: "Judicial Summons Audio",
    target: "court_statement_wire.mp3",
    type: "AUDIO",
    severity: "MEDIUM",
    verdict: "Authentic Acoustic Recording",
    score: 0.124,
    engine: "Natural Acoustic Spectrum",
    hash: "4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a",
    cid: "bafybeihpaoitkwkvyx7q652qj323q675v6xodqeyq7c6ffq4v6mvei6wve",
    station: "Cyber Crime PS, Cyberabad",
    time: "01 Oct, 11:20 AM",
    status: "LOCKED",
  },
  {
    id: "DT-483920",
    fir: "FIR-2026-PUN-077",
    source: "Corporate Ransomware Incident",
    target: "cfo_authorization_call.wav",
    type: "AUDIO",
    severity: "CRITICAL",
    verdict: "Voice Clone Synthesis",
    score: 0.991,
    engine: "Fish-Speech / CosyVoice Zero-Shot",
    hash: "ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d",
    cid: "bafybeicb7gcv4j4mscu5v4g2r4u3f7x8w2z1a5s6d9e0f1g2h3j4k5l6m",
    station: "Cyber Police Station, Shivaji Nagar, Pune",
    time: "30 Sep, 08:50 PM",
    status: "LOCKED",
  },
];

export default function CommandCenterPage() {
  const { profile } = useAuth();
  const [cases] = useState<CaseRecord[]>(initialCases);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("ALL");
  const [stationScope, setStationScope] = useState<"MY_STATION" | "ALL">(
    profile?.role === "admin" ? "ALL" : "MY_STATION"
  );
  const [selectedCase, setSelectedCase] = useState<CaseRecord | null>(null);
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);

  const firstName = profile?.full_name ? profile.full_name.split(" ")[0] : "Officer";

  // Filtered cases: officers see their station's data by default; admins see all
  const filteredCases = useMemo(() => {
    return cases.filter((c) => {
      // Station scoping rule:
      if (profile?.role === "officer" && stationScope === "MY_STATION" && profile.station) {
        // Match city or station name keyword
        const officerStationLower = profile.station.toLowerCase();
        const caseStationLower = c.station.toLowerCase();
        const isMatch =
          officerStationLower.includes("chandigarh") && caseStationLower.includes("chandigarh")
            ? true
            : officerStationLower.includes("delhi") && caseStationLower.includes("delhi")
            ? true
            : officerStationLower.includes("mumbai") && caseStationLower.includes("mumbai")
            ? true
            : caseStationLower.includes(officerStationLower) || officerStationLower.includes(caseStationLower);

        if (!isMatch) return false;
      }

      const matchesSearch =
        c.target.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.fir.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.station.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.engine.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType =
        selectedType === "ALL" ? true : c.type === selectedType;

      return matchesSearch && matchesType;
    });
  }, [cases, searchQuery, selectedType, stationScope, profile]);

  const handleRowClick = (caseItem: CaseRecord) => {
    setSelectedCase(caseItem);
    setIsInspectorOpen(true);
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      filteredCases.map((c) => ({
        "Case ID": c.id,
        "FIR Number": c.fir,
        "Target Exhibit": c.target,
        Type: c.type,
        Severity: c.severity,
        Verdict: c.verdict,
        Confidence: `${(c.score * 100).toFixed(1)}%`,
        "Forensic Engine": c.engine,
        Station: c.station,
        "SHA-256 Hash": c.hash,
        "IPFS CID": c.cid,
        Timestamp: c.time,
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "DeepTrace_Intercepts");
    XLSX.writeFile(wb, `DeepTrace_Intercepts_${stationScope}.xlsx`);
  };

  return (
    <ProtectedRoute>
      <Page className="max-w-[1180px] mx-auto px-4 sm:px-8 py-10 sm:py-16">
        {/* Title & Actions Bar */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-12 sm:mb-16">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[12px] font-medium text-apple-blue">
                Welcome back, {firstName}
              </span>
              <span className="text-[12px] text-apple-text-tertiary">·</span>
              <span className="text-[12px] font-mono text-apple-text-secondary uppercase">
                {profile?.role === "admin"
                  ? "All Jurisdictions (State Admin)"
                  : profile?.station || "Chandigarh Cyber PS"}
              </span>
            </div>
            <h1 className="text-[34px] sm:text-[44px] font-semibold tracking-apple-tight text-apple-text">
              Command Center
            </h1>
            <p className="text-[15px] sm:text-[17px] text-apple-text-secondary mt-1">
              Live forensic telemetry and sealed evidence logs across police stations.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Station Scope Toggle (Officers see their station data; admins can view all) */}
            {profile?.role === "admin" ? (
              <div className="flex items-center p-0.5 rounded-full bg-apple-surface border border-apple-hairline text-[11px]">
                <button
                  onClick={() => setStationScope("ALL")}
                  className={`px-3 py-1 rounded-full font-medium transition-colors ${
                    stationScope === "ALL"
                      ? "bg-apple-blue text-white"
                      : "text-apple-text-secondary hover:text-apple-text"
                  }`}
                >
                  All Stations
                </button>
                <button
                  onClick={() => setStationScope("MY_STATION")}
                  className={`px-3 py-1 rounded-full font-medium transition-colors ${
                    stationScope === "MY_STATION"
                      ? "bg-apple-blue text-white"
                      : "text-apple-text-secondary hover:text-apple-text"
                  }`}
                >
                  Assigned Station
                </button>
              </div>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-apple-surface border border-apple-hairline text-[11px] font-medium text-apple-text-secondary">
                <Building className="w-3 h-3 text-apple-blue" />
                <span>Station: {profile?.station ? profile.station.split(",")[0] : "Local Cyber PS"}</span>
              </span>
            )}

            <button
              onClick={exportToExcel}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-apple-surface hover:bg-apple-surface-secondary border border-apple-hairline text-apple-text text-[13px] font-medium transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-apple-text-secondary" strokeWidth={1.5} />
              <span>Export Table</span>
            </button>
            <Link
              href="/intake"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-apple-blue hover:bg-apple-blue-hover text-white text-[13px] font-medium transition-colors shadow-apple-subtle"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Intake</span>
            </Link>
          </div>
        </div>

        {/* 2. STAT NUMBERS COUNT UP (CountUp from animation kit) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 mb-16 sm:mb-20 pb-12 border-b border-apple-hairline">
          <div>
            <div className="text-[48px] sm:text-[64px] font-semibold tracking-apple-tight text-apple-text leading-none mb-2">
              <CountUp to={filteredCases.length * 24} />
            </div>
            <div className="text-[13px] sm:text-[14px] text-apple-text-secondary font-normal">
              Active investigations ({stationScope === "ALL" ? "All Stations" : "Local"})
            </div>
          </div>

          <div>
            <div className="text-[48px] sm:text-[64px] font-semibold tracking-apple-tight text-apple-text leading-none mb-2">
              <CountUp to={98.4} decimals={1} suffix="%" />
            </div>
            <div className="text-[13px] sm:text-[14px] text-apple-text-secondary font-normal">
              Average forensic confidence
            </div>
          </div>

          <div>
            <div className="text-[48px] sm:text-[64px] font-semibold tracking-apple-tight text-apple-text leading-none mb-2">
              <CountUp to={filteredCases.length * 210} />
            </div>
            <div className="text-[13px] sm:text-[14px] text-apple-text-secondary font-normal">
              Sealed exhibits in vault
            </div>
          </div>

          <div>
            <div className="text-[48px] sm:text-[64px] font-semibold tracking-apple-tight text-apple-text leading-none mb-2">
              <CountUp to={filteredCases.length * 15} />
            </div>
            <div className="text-[13px] sm:text-[14px] text-apple-text-secondary font-normal">
              BNSS 63 certificates issued
            </div>
          </div>
        </div>

        {/* Search & Media Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="relative w-full max-w-[320px]">
            <Search
              className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-apple-text-secondary"
              strokeWidth={1.5}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by filename, FIR, station…"
              className="w-full pl-9 pr-4 py-2 rounded-full bg-apple-surface border border-apple-hairline text-[13px] text-apple-text placeholder:text-apple-text-secondary focus:outline-none focus:border-apple-blue"
            />
          </div>

          {/* Calm Type Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {["ALL", "AUDIO", "VIDEO", "IMAGE"].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors ${
                  selectedType === type
                    ? "bg-apple-text text-apple-bg"
                    : "bg-transparent text-apple-text-secondary hover:text-apple-text hover:bg-apple-surface-secondary"
                }`}
              >
                {type === "ALL" ? "All media" : type.toLowerCase()}
              </button>
            ))}
          </div>
        </div>

        {/* 3. STAGGERED TABLE BODY */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-apple-hairline text-[12px] text-apple-text-secondary font-medium tracking-normal">
                <th className="py-3 px-4 font-medium">Exhibit</th>
                <th className="py-3 px-4 font-medium">Severity</th>
                <th className="py-3 px-4 font-medium">Verdict</th>
                <th className="py-3 px-4 font-medium hidden md:table-cell">Station</th>
                <th className="py-3 px-4 font-medium hidden sm:table-cell">FIR Reference</th>
                <th className="py-3 px-4 font-medium text-right">Time</th>
              </tr>
            </thead>
            <StaggerTBody animateKey={`${selectedType}-${stationScope}-${searchQuery}`}>
              {filteredCases.map((c) => (
                <StaggerRow
                  key={c.id}
                  onClick={() => handleRowClick(c)}
                  className="h-14 border-b border-apple-hairline/70 transition-colors cursor-pointer group"
                >
                  {/* Exhibit Filename & ID */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="text-[14px] font-medium text-apple-text group-hover:text-apple-blue transition-colors">
                          {c.target}
                        </div>
                        <div className="text-[11px] font-mono text-apple-text-tertiary">
                          {c.id}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Severity: Apple Minimalist Indicator */}
                  <td className="py-3 px-4">
                    <SeverityDot level={c.severity} />
                  </td>

                    {/* Verdict & Score */}
                    <td className="py-3 px-4">
                      <div className="text-[13px] text-apple-text font-normal">
                        {c.verdict}
                      </div>
                      <div className="text-[11px] text-apple-text-secondary">
                        {(c.score * 100).toFixed(1)}% confidence
                      </div>
                    </td>

                    {/* Station */}
                    <td className="py-3 px-4 hidden md:table-cell text-[13px] text-apple-text-secondary max-w-[220px] truncate">
                      {c.station}
                    </td>

                    {/* FIR */}
                    <td className="py-3 px-4 hidden sm:table-cell text-[13px] font-mono text-apple-text">
                      {c.fir}
                    </td>

                    {/* Timestamp */}
                    <td className="py-3 px-4 text-right text-[12px] text-apple-text-secondary">
                      {c.time}
                    </td>
                  </StaggerRow>
                ))}
            </StaggerTBody>
          </table>

          {filteredCases.length === 0 && (
            <div className="py-16 text-center text-apple-text-secondary text-[14px]">
              No cases found for the selected station filter.
            </div>
          )}
        </div>

        {/* Slide-over Inspector Sheet */}
        <CaseInspectorSheet
          caseData={selectedCase}
          isOpen={isInspectorOpen}
          onClose={() => setIsInspectorOpen(false)}
        />
      </Page>
    </ProtectedRoute>
  );
}
