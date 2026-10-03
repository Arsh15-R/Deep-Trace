"use client";

import React, { useMemo, useState } from "react";
import {
  CaseDrawer,
  CountUp,
  CustodyTimeline,
  Page,
  Reveal,
  ScanLine,
  SealedStamp,
  SeverityDot,
  StaggerRow,
  StaggerTBody,
  Hero3D,
} from "@/animations";
import type { Severity } from "@/animations";

type Row = {
  id: string;
  fir: string;
  media: string;
  severity: Severity;
  hash: string;
  station: string;
  time: string;
};

const ROWS: Row[] = [
  {
    id: "DT-847294",
    fir: "FIR-2026-CHD-042",
    media: "AUDIO",
    severity: "critical",
    hash: "260f24779d",
    station: "Cyber Crime PS",
    time: "20:44 IST",
  },
  {
    id: "DT-910482",
    fir: "FIR-2026-DEL-109",
    media: "VIDEO",
    severity: "critical",
    hash: "c92f79b092",
    station: "Special Cell",
    time: "19:15 IST",
  },
  {
    id: "DT-739104",
    fir: "FIR-2026-MUM-831",
    media: "IMAGE",
    severity: "high",
    hash: "585a96be0a",
    station: "Cyber Crime Unit",
    time: "18:22 IST",
  },
  {
    id: "DT-628491",
    fir: "FIR-2026-BLR-057",
    media: "AUDIO",
    severity: "medium",
    hash: "8a49c2e011",
    station: "Central Cyber Cell",
    time: "17:05 IST",
  },
];

const STATS = [
  { label: "Total cases", value: 1842 },
  { label: "Deepfakes", value: 934 },
  { label: "Pinned files", value: 2156 },
  { label: "Certificates", value: 789 },
];

const STEPS = [
  { title: "Evidence received", detail: "Logged under the FIR and catalogued.", time: "20:44:02" },
  { title: "SHA-256 computed", detail: "Hash recorded before any analysis.", time: "20:44:06" },
  { title: "Pinned to IPFS", detail: "Read-only copy stored on the cluster.", time: "20:44:10" },
  { title: "Section 63 certificate", detail: "Affidavit generated and signed.", time: "20:44:12" },
];

export default function MotionDemoPage() {
  const [filter, setFilter] = useState("ALL");
  const [selected, setSelected] = useState<Row | null>(null);
  const rows = useMemo(() => ROWS.filter((r) => filter === "ALL" || r.media === filter), [filter]);

  return (
    <Page className="mx-auto max-w-6xl p-8 space-y-12">
      <Reveal>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs uppercase font-mono tracking-widest text-[var(--subtle)]">
              Motion Kit • Showcase
            </span>
            <h1 className="text-4xl font-semibold tracking-tight text-[var(--fg)] mt-1">
              Every deepfake leaves a trace.
            </h1>
            <p className="mt-2 text-base text-[var(--muted)]">
              Live detections from audio, video, image and web scans.
            </p>
          </div>
        </div>
      </Reveal>

      {/* 3D Hero Wireframe Evidence Cube */}
      <Reveal delay={0.1}>
        <Hero3D className="my-6" />
      </Reveal>

      {/* 4 Large Clean Numbers */}
      <div className="my-10 grid grid-cols-2 gap-8 md:grid-cols-4 border-y border-[var(--line)] py-8">
        {STATS.map((s) => (
          <div key={s.label}>
            <CountUp to={s.value} className="text-5xl font-semibold tabular-nums text-[var(--fg)]" />
            <div className="mt-1 text-sm text-[var(--subtle)]">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="space-y-4">
        <div className="flex gap-2">
          {["ALL", "AUDIO", "VIDEO", "IMAGE"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="rounded-full px-4 py-1.5 text-xs font-medium transition-colors"
              style={{
                border: "1px solid var(--line)",
                background: filter === f ? "var(--fg)" : "transparent",
                color: filter === f ? "var(--bg)" : "var(--muted)",
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Staggered Table */}
        <div className="overflow-x-auto rounded-xl border border-[var(--line)] bg-[var(--surface)]">
          <table className="w-full text-left text-sm">
            <thead style={{ color: "var(--subtle)", borderBottom: "1px solid var(--line)" }}>
              <tr>
                <th className="py-3 px-4 font-medium">Record</th>
                <th className="px-4 font-medium">Media</th>
                <th className="px-4 font-medium">Severity</th>
                <th className="px-4 font-medium">SHA-256</th>
                <th className="px-4 font-medium">Station</th>
                <th className="px-4 font-medium">Time</th>
              </tr>
            </thead>
            <StaggerTBody animateKey={filter}>
              {rows.map((r) => (
                <StaggerRow key={r.id} onClick={() => setSelected(r)}>
                  <td className="py-4 px-4">
                    <div className="font-mono text-sm font-semibold text-[var(--fg)]">{r.id}</div>
                    <div className="text-xs text-[var(--subtle)]">{r.fir}</div>
                  </td>
                  <td className="px-4 text-[var(--muted)] font-mono text-xs">{r.media}</td>
                  <td className="px-4">
                    <SeverityDot level={r.severity} />
                  </td>
                  <td className="px-4 font-mono text-xs text-[var(--muted)]">{r.hash}…</td>
                  <td className="px-4 text-[var(--fg)] text-sm">{r.station}</td>
                  <td className="px-4 text-[var(--muted)] text-xs font-mono">{r.time}</td>
                </StaggerRow>
              ))}
            </StaggerTBody>
          </table>
        </div>
      </div>

      {/* Case Drawer Slide-Over with Custody Timeline, ScanLine, and Sealed Stamp */}
      <CaseDrawer
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected ? selected.id : ""}
        subtitle={selected ? selected.fir : ""}
      >
        <div className="space-y-6">
          <div
            className="relative grid h-44 place-items-center overflow-hidden rounded-xl"
            style={{ border: "1px solid var(--line)", background: "var(--surface)" }}
          >
            <span className="text-xs uppercase tracking-wider font-mono text-[var(--subtle)]">
              Media Stream Analyzer
            </span>
            <ScanLine />
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--subtle)] mb-4">
              Chain of Custody
            </h3>
            <CustodyTimeline steps={STEPS} />
          </div>

          <div className="pt-4 border-t border-[var(--line)]">
            <SealedStamp label="VERIFIED" />
          </div>
        </div>
      </CaseDrawer>
    </Page>
  );
}
