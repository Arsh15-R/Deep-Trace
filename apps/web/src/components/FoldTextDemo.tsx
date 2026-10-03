"use client";

import React, { useState } from "react";
import FoldText from "@/components/FoldText";
import { RotateCcw, Sparkles } from "lucide-react";

export const FoldTextDemo = () => {
  const [splitBy, setSplitBy] = useState<"char" | "word" | "line">("char");
  const [hinge, setHinge] = useState<"top" | "bottom" | "left" | "right">("top");
  const [trigger, setTrigger] = useState<"mount" | "hover" | "loop">("mount");
  const [key, setKey] = useState(0);

  const replay = () => setKey((k) => k + 1);

  return (
    <div className="space-y-6">
      {/* Interactive Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-[#08090D] border border-[#1E2436] rounded-xl text-xs font-mono">
        <div className="flex flex-wrap items-center gap-4">
          {/* Split Mode */}
          <div className="flex items-center gap-1.5">
            <span className="text-zinc-500 uppercase tracking-wider">Split:</span>
            {(["char", "word", "line"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => {
                  setSplitBy(mode);
                  replay();
                }}
                className={`px-2 py-1 rounded transition uppercase ${
                  splitBy === mode
                    ? "bg-indigo-600 text-white font-bold"
                    : "bg-[#101420] text-zinc-400 hover:text-white border border-[#1E2436]"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          {/* Hinge Direction */}
          <div className="flex items-center gap-1.5">
            <span className="text-zinc-500 uppercase tracking-wider">Hinge:</span>
            {(["top", "bottom", "left", "right"] as const).map((dir) => (
              <button
                key={dir}
                onClick={() => {
                  setHinge(dir);
                  replay();
                }}
                className={`px-2 py-1 rounded transition uppercase ${
                  hinge === dir
                    ? "bg-indigo-600 text-white font-bold"
                    : "bg-[#101420] text-zinc-400 hover:text-white border border-[#1E2436]"
                }`}
              >
                {dir}
              </button>
            ))}
          </div>

          {/* Trigger Mode */}
          <div className="flex items-center gap-1.5">
            <span className="text-zinc-500 uppercase tracking-wider">Trigger:</span>
            {(["mount", "hover", "loop"] as const).map((trig) => (
              <button
                key={trig}
                onClick={() => {
                  setTrigger(trig);
                  replay();
                }}
                className={`px-2 py-1 rounded transition uppercase ${
                  trigger === trig
                    ? "bg-indigo-600 text-white font-bold"
                    : "bg-[#101420] text-zinc-400 hover:text-white border border-[#1E2436]"
                }`}
              >
                {trig}
              </button>
            ))}
          </div>
        </div>

        {/* Replay Button */}
        <button
          onClick={replay}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 font-semibold transition"
        >
          <RotateCcw className="size-3.5" />
          <span>REPLAY</span>
        </button>
      </div>

      {/* Hero Display Canvas */}
      <div className="relative overflow-hidden rounded-2xl border border-[#1E2436] bg-gradient-to-b from-[#0D0F17] to-[#08090D] p-10 md:p-14 min-h-[260px] flex flex-col items-center justify-center text-center shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-mono tracking-widest text-indigo-400 uppercase bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
              3D ORIGAMI KINETICS
            </span>
          </div>

          <FoldText
            key={key}
            text={
              splitBy === "line"
                ? "DEEPTRACE\nCYBER FORENSICS\nBNSS SEC 63"
                : "Launch with clarity"
            }
            splitBy={splitBy}
            hinge={hinge}
            trigger={trigger}
            duration={0.65}
            stagger={0.045}
            ease="power3.out"
            perspective={700}
            creaseShading={0.55}
            fontSize="clamp(2rem, 5vw, 4.5rem)"
            fontWeight={800}
            color="#f7f2e8"
          />

          <p className="text-xs text-zinc-500 font-mono mt-3">
            {trigger === "hover" ? "Hover over the text to trigger fold" : "Interactive GSAP unfold timeline with crease depth shading"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FoldTextDemo;
