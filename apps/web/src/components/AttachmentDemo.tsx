"use client";

import React, { useState } from "react";
import {
  Attachment,
  AttachmentMedia,
  AttachmentContent,
  AttachmentTitle,
  AttachmentDescription,
  AttachmentActions,
  AttachmentAction,
  AttachmentTrigger,
  AttachmentGroup,
  type AttachmentState,
  type AttachmentSize,
} from "@/components/ui/attachment";
import {
  FileText,
  Video,
  FileAudio,
  Image as ImageIcon,
  X,
  Download,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
} from "lucide-react";

export default function AttachmentDemo() {
  const [activeSize, setActiveSize] = useState<AttachmentSize>("default");
  const [demoState, setDemoState] = useState<AttachmentState>("done");

  return (
    <div className="space-y-6">
      {/* Interactive Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#1E2436]">
        {/* Size Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-[#94A3B8]">SIZE:</span>
          {(["xs", "sm", "default"] as const).map((sz) => (
            <button
              key={sz}
              onClick={() => setActiveSize(sz)}
              className={`px-2.5 py-1 text-xs font-mono rounded transition ${
                activeSize === sz
                  ? "bg-indigo-600 text-white font-bold"
                  : "bg-[#101420] text-[#94A3B8] border border-[#1E2436] hover:text-white"
              }`}
            >
              size=&quot;{sz}&quot;
            </button>
          ))}
        </div>

        {/* State Selector */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono text-[#94A3B8]">STATE:</span>
          {(["idle", "uploading", "processing", "error", "done"] as const).map(
            (st) => (
              <button
                key={st}
                onClick={() => setDemoState(st)}
                className={`px-2 py-0.5 text-xs font-mono rounded transition uppercase ${
                  demoState === st
                    ? st === "error"
                      ? "bg-rose-600 text-white font-bold"
                      : st === "processing"
                      ? "bg-cyan-600 text-white font-bold"
                      : "bg-indigo-600 text-white font-bold"
                    : "bg-[#101420] text-[#94A3B8] border border-[#1E2436] hover:text-white"
                }`}
              >
                {st}
              </button>
            )
          )}
        </div>
      </div>

      {/* Grid of Demos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1. Dynamic Interactive Attachment */}
        <div className="bg-[#08090D] border border-[#1E2436] rounded-xl p-4 space-y-3">
          <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-bold block">
            01 // DYNAMIC STATE & SIZE ATTACHMENT
          </span>

          <Attachment
            state={demoState}
            size={activeSize}
            className="w-full"
          >
            <AttachmentTrigger
              aria-label="Preview evidence-cctv-chd.mp4"
              onClick={() => alert(`Triggered card click for: ${demoState}`)}
            />
            <AttachmentMedia>
              <Video className="text-indigo-400" />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>cctv_chd_sec17_tampered.mp4</AttachmentTitle>
              <AttachmentDescription>
                {demoState === "uploading" && "Uploading to vault • 42% (14.2 MB / 34 MB)"}
                {demoState === "processing" && "Running 2D-FFT and optical flow analysis..."}
                {demoState === "error" && "Upload failed: SHA-256 integrity mismatch"}
                {demoState === "idle" && "Queued for cryptographic pin"}
                {demoState === "done" && "MP4 Video • 34.2 MB • SHA-256 Locked"}
              </AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction
                aria-label="Remove attachment"
                onClick={(e) => {
                  e.stopPropagation();
                  alert("Removed attachment");
                }}
              >
                <X className="size-3.5" />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>

          <p className="text-[11px] font-mono text-[#64748B]">
            * Click anywhere on card to activate trigger. The remove action button stays independently clickable.
          </p>
        </div>

        {/* 2. Image Variant (Vertical Orientation) */}
        <div className="bg-[#08090D] border border-[#1E2436] rounded-xl p-4 space-y-3">
          <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold block">
            02 // VERTICAL ORIENTATION WITH IMAGE PREVIEW
          </span>

          <div className="flex gap-4">
            <Attachment
              orientation="vertical"
              size="default"
              state="done"
              className="w-52"
            >
              <AttachmentMedia variant="image">
                <img
                  src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&auto=format&fit=crop&q=80"
                  alt="Forensic Frame Extract"
                />
              </AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>frame_0342_warp.png</AttachmentTitle>
                <AttachmentDescription>
                  PNG • 4.8 MB • Tampering Detected
                </AttachmentDescription>
              </AttachmentContent>
              <AttachmentActions>
                <AttachmentAction aria-label="Open in new tab">
                  <ExternalLink className="size-3.5" />
                </AttachmentAction>
                <AttachmentAction aria-label="Download frame">
                  <Download className="size-3.5" />
                </AttachmentAction>
              </AttachmentActions>
            </Attachment>

            <div className="flex-1 space-y-2 text-xs text-[#94A3B8] font-mono">
              <div className="text-white font-bold text-xs uppercase">
                Image Attachment Specs:
              </div>
              <ul className="list-disc pl-4 space-y-1 text-[11px] text-[#64748B]">
                <li><code className="text-cyan-300">variant=&quot;image&quot;</code> handles responsive container and object-cover</li>
                <li><code className="text-cyan-300">orientation=&quot;vertical&quot;</code> stacks media directly above content</li>
                <li>Inherits hover glow and border transitions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 3. AttachmentGroup (Horizontally Scrollable Snapping Row) */}
      <div className="bg-[#08090D] border border-[#1E2436] rounded-xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
            03 // ATTACHMENT GROUP (SNAPPING ROW WITH EDGE FADES)
          </span>
          <span className="text-[10px] font-mono text-[#64748B]">
            HORIZONTAL SCROLL
          </span>
        </div>

        <AttachmentGroup>
          {/* File 1: Audio */}
          <Attachment state="done" size="sm">
            <AttachmentMedia>
              <FileAudio className="text-indigo-400" />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>intercept_wiretap_01.wav</AttachmentTitle>
              <AttachmentDescription>WAV • 18.4 MB • Synthesized</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Remove">
                <X className="size-3.5" />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>

          {/* File 2: PDF Case Docket */}
          <Attachment state="done" size="sm">
            <AttachmentMedia>
              <FileText className="text-amber-400" />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>FIR_2026_CHD_042_Report.pdf</AttachmentTitle>
              <AttachmentDescription>PDF • 1.2 MB • BNSS-63</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Download">
                <Download className="size-3.5" />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>

          {/* File 3: Uploading Shimmer */}
          <Attachment state="uploading" size="sm">
            <AttachmentMedia>
              <Video className="text-indigo-400" />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>bodycam_officer_chd.mp4</AttachmentTitle>
              <AttachmentDescription>Uploading 68% • 22 MB</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Cancel">
                <X className="size-3.5" />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>

          {/* File 4: Processing Shimmer */}
          <Attachment state="processing" size="sm">
            <AttachmentMedia>
              <ShieldCheck className="text-cyan-400" />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>biometric_hash_table.json</AttachmentTitle>
              <AttachmentDescription>Verifying IPFS CID...</AttachmentDescription>
            </AttachmentContent>
          </Attachment>

          {/* File 5: Error State */}
          <Attachment state="error" size="sm">
            <AttachmentMedia>
              <AlertTriangle className="text-rose-400" />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>corrupted_packet_stream.pcap</AttachmentTitle>
              <AttachmentDescription>Failed: Zero byte length</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Retry">
                <RotateCcw className="size-3.5" />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
        </AttachmentGroup>
      </div>
    </div>
  );
}
