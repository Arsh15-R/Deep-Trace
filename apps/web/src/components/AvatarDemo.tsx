"use client";

import React, { useState } from "react";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/ui/avatar";
import { Shield, Radio, CheckCircle2, UserCheck } from "lucide-react";

export default function AvatarDemo() {
  const [selectedSize, setSelectedSize] = useState<"sm" | "default" | "lg">("default");

  return (
    <div className="space-y-6">
      {/* Size Selector */}
      <div className="flex items-center gap-3 pb-2 border-b border-[#1E2436]">
        <span className="text-xs font-mono text-[#94A3B8]">AVATAR SIZE:</span>
        {(["sm", "default", "lg"] as const).map((sz) => (
          <button
            key={sz}
            onClick={() => setSelectedSize(sz)}
            className={`px-2.5 py-1 text-xs font-mono rounded transition ${
              selectedSize === sz
                ? "bg-indigo-600 text-white font-bold"
                : "bg-[#101420] text-[#94A3B8] border border-[#1E2436] hover:text-white"
            }`}
          >
            size=&quot;{sz}&quot;
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 1. Basic Avatar with Online Badge */}
        <div className="bg-[#08090D] border border-[#1E2436] rounded-lg p-4 space-y-3">
          <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-bold block">
            01 // OFFICER AVATAR WITH BADGE
          </span>
          <div className="flex items-center gap-3">
            <Avatar size={selectedSize} className="ring-2 ring-indigo-500/30">
              <AvatarImage
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                alt="Insp. Daksh Walia"
              />
              <AvatarFallback className="bg-indigo-600 text-white">DW</AvatarFallback>
              <AvatarBadge className="bg-emerald-500 ring-2 ring-[#08090D]" />
            </Avatar>
            <div className="text-left text-xs leading-tight">
              <span className="font-heading font-bold text-white block">Insp. Daksh Walia</span>
              <span className="text-[10px] font-mono text-[#64748B]">#CHD-CYB-0042</span>
            </div>
          </div>
        </div>

        {/* 2. Fallback Mode (Image Fails / Unavailable) */}
        <div className="bg-[#08090D] border border-[#1E2436] rounded-lg p-4 space-y-3">
          <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold block">
            02 // AUTOMATIC INITIALS FALLBACK
          </span>
          <div className="flex items-center gap-3">
            <Avatar size={selectedSize} className="ring-2 ring-cyan-500/30">
              {/* Intentional broken image to demonstrate fallback */}
              <AvatarImage src="https://broken-image-link.internal/avatar.jpg" alt="ACP Ananya Rao" />
              <AvatarFallback className="bg-cyan-600 text-white">AR</AvatarFallback>
              <AvatarBadge className="bg-amber-500 ring-2 ring-[#08090D]" />
            </Avatar>
            <div className="text-left text-xs leading-tight">
              <span className="font-heading font-bold text-white block">ACP Ananya Rao</span>
              <span className="text-[10px] font-mono text-[#64748B]">ON PATROL • #DEL-8812</span>
            </div>
          </div>
        </div>

        {/* 3. Avatar Group (Forensics Squad) */}
        <div className="bg-[#08090D] border border-[#1E2436] rounded-lg p-4 space-y-3">
          <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
            03 // FORENSICS SQUAD GROUP
          </span>
          <div className="flex items-center gap-3">
            <AvatarGroup>
              <Avatar size={selectedSize}>
                <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" alt="Lead" />
                <AvatarFallback>DW</AvatarFallback>
              </Avatar>
              <Avatar size={selectedSize}>
                <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" alt="Audio" />
                <AvatarFallback>RK</AvatarFallback>
              </Avatar>
              <Avatar size={selectedSize}>
                <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80" alt="Legal" />
                <AvatarFallback>SP</AvatarFallback>
              </Avatar>
              <AvatarGroupCount className={selectedSize === "sm" ? "size-8 text-[10px]" : selectedSize === "lg" ? "size-12 text-sm" : "size-10 text-xs"}>
                +4
              </AvatarGroupCount>
            </AvatarGroup>
          </div>
        </div>
      </div>
    </div>
  );
}
