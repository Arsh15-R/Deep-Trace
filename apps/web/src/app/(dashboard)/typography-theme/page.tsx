/**
 * UI Components Showcase Page
 * Demonstrates:
 * 1. shadcn/ui Scroll Area Suite (@/components/ui/scroll-area) with ScrollArea, ScrollBar
 * 2. shadcn/ui Sidebar Suite (@/components/ui/sidebar)
 * 3. shadcn/ui Attachment Suite (@/components/ui/attachment)
 * 4. shadcn/ui Avatar Suite (@/components/ui/avatar)
 * 5. shadcn/ui Card Suite (@/components/ui/card)
 * 6. MUI OutlinedCard (@/components/OutlinedCard)
 * 7. MUI TypographyTheme (@/components/TypographyTheme)
 * 8. MUI Skeleton Variants (@/components/SkeletonVariants)
 */

"use client";

import TypographyTheme from "@/components/TypographyTheme";
import Variants from "@/components/SkeletonVariants";
import OutlinedCard from "@/components/OutlinedCard";
import CardDemo from "@/components/CardDemo";
import AvatarDemo from "@/components/AvatarDemo";
import AvatarGroupDemo from "@/components/AvatarGroupDemo";
import AttachmentDemo from "@/components/AttachmentDemo";
import SidebarDemo from "@/components/SidebarDemo";
import RadixSidebarDemo from "@/components/RadixSidebarDemo";
import BaseProgressDemo from "@/components/BaseProgressDemo";
import StarsBackgroundDemo from "@/components/StarsBackgroundDemo";
import FoldTextDemo from "@/components/FoldTextDemo";
import CyberTextDemo from "@/components/CyberTextDemo";
import OldPhotographPaletteDemo from "@/components/OldPhotographPaletteDemo";
import ScrollAreaDemo from "@/components/ScrollAreaDemo";
import AppleDesignShowcase from "@/components/AppleDesignShowcase";
import { Sparkles, Layers, Box as BoxIcon, Terminal, Code, CreditCard, Paperclip, User, Layout, PanelLeft, ArrowDownUp, Activity, Star, Eye, Palette, Command } from "lucide-react";
import { useState } from "react";

export default function TypographyThemePage() {
  const [activeTab, setActiveTab] = useState<
    "all" | "apple-design" | "oldphoto" | "cyber-text" | "fold-text" | "stars" | "scroll-area" | "progress" | "sidebar" | "radix-sidebar" | "attachment" | "avatar" | "shadcn-card" | "mui-card" | "typography" | "skeleton"
  >("all");

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-4">
      {/* Header Banner */}
      <div className="bg-[#0D0F17] p-5 rounded-lg border border-indigo-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 uppercase tracking-wider">
            UI DESIGN SYSTEM COMPONENT HUB
          </span>
          <span className="text-[11px] font-mono text-[#94A3B8]">
            SHADCN/UI & MATERIAL UI
          </span>
        </div>
        
        <h1 className="text-2xl font-heading font-extrabold text-white tracking-wide">
          CONSOLE COMPONENT PLAYGROUND
        </h1>
        <p className="text-xs text-[#94A3B8] mt-1 max-w-2xl">
          Live verification and documentation of custom UI components: ScrollArea, Sidebar, Attachment, Avatar, Card suites, plus Material UI modules.
        </p>

        {/* Filter / Toggle Tabs */}
        <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-[#1E2436]">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-3 py-1.5 rounded text-xs font-mono transition ${
              activeTab === "all"
                ? "bg-indigo-600 text-white font-bold"
                : "bg-[#101420] text-[#94A3B8] hover:text-white border border-[#1E2436]"
            }`}
          >
            SHOW ALL
          </button>
          <button
            onClick={() => setActiveTab("apple-design")}
            className={`px-3 py-1.5 rounded text-xs font-mono transition flex items-center gap-1.5 ${
              activeTab === "apple-design"
                ? "bg-[#545333] text-[#FDFBD4] font-bold border border-[#878672]"
                : "bg-[#101420] text-[#D9D7B6] hover:text-[#FDFBD4] border border-[#1E2436]"
            }`}
          >
            <Command size={12} />
            APPLE HIG DESIGN
          </button>
          <button
            onClick={() => setActiveTab("oldphoto")}
            className={`px-3 py-1.5 rounded text-xs font-mono transition flex items-center gap-1.5 ${
              activeTab === "oldphoto"
                ? "bg-[#545333] text-[#FDFBD4] font-bold border border-[#878672]"
                : "bg-[#101420] text-[#D9D7B6] hover:text-[#FDFBD4] border border-[#1E2436]"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#D9D7B6]" />
            OLD PHOTOGRAPH PALETTE
          </button>
          <button
            onClick={() => setActiveTab("cyber-text")}
            className={`px-3 py-1.5 rounded text-xs font-mono transition ${
              activeTab === "cyber-text"
                ? "bg-indigo-600 text-white font-bold"
                : "bg-[#101420] text-[#94A3B8] hover:text-white border border-[#1E2436]"
            }`}
          >
            CYBER TEXT (REACT BITS)
          </button>
          <button
            onClick={() => setActiveTab("fold-text")}
            className={`px-3 py-1.5 rounded text-xs font-mono transition ${
              activeTab === "fold-text"
                ? "bg-indigo-600 text-white font-bold"
                : "bg-[#101420] text-[#94A3B8] hover:text-white border border-[#1E2436]"
            }`}
          >
            FOLD TEXT (REACT BITS)
          </button>
          <button
            onClick={() => setActiveTab("stars")}
            className={`px-3 py-1.5 rounded text-xs font-mono transition ${
              activeTab === "stars"
                ? "bg-indigo-600 text-white font-bold"
                : "bg-[#101420] text-[#94A3B8] hover:text-white border border-[#1E2436]"
            }`}
          >
            STARS (ANIMATE-UI)
          </button>
          <button
            onClick={() => setActiveTab("scroll-area")}
            className={`px-3 py-1.5 rounded text-xs font-mono transition ${
              activeTab === "scroll-area"
                ? "bg-indigo-600 text-white font-bold"
                : "bg-[#101420] text-[#94A3B8] hover:text-white border border-[#1E2436]"
            }`}
          >
            SCROLL AREA (BASE-NOVA)
          </button>
          <button
            onClick={() => setActiveTab("progress")}
            className={`px-3 py-1.5 rounded text-xs font-mono transition ${
              activeTab === "progress"
                ? "bg-indigo-600 text-white font-bold"
                : "bg-[#101420] text-[#94A3B8] hover:text-white border border-[#1E2436]"
            }`}
          >
            PROGRESS (BASE-UI)
          </button>
          <button
            onClick={() => setActiveTab("sidebar")}
            className={`px-3 py-1.5 rounded text-xs font-mono transition ${
              activeTab === "sidebar"
                ? "bg-indigo-600 text-white font-bold"
                : "bg-[#101420] text-[#94A3B8] hover:text-white border border-[#1E2436]"
            }`}
          >
            SIDEBAR (NOVA)
          </button>
          <button
            onClick={() => setActiveTab("radix-sidebar")}
            className={`px-3 py-1.5 rounded text-xs font-mono transition ${
              activeTab === "radix-sidebar"
                ? "bg-indigo-600 text-white font-bold"
                : "bg-[#101420] text-[#94A3B8] hover:text-white border border-[#1E2436]"
            }`}
          >
            RADIX SIDEBAR (ANIMATE-UI)
          </button>
          <button
            onClick={() => setActiveTab("attachment")}
            className={`px-3 py-1.5 rounded text-xs font-mono transition ${
              activeTab === "attachment"
                ? "bg-indigo-600 text-white font-bold"
                : "bg-[#101420] text-[#94A3B8] hover:text-white border border-[#1E2436]"
            }`}
          >
            ATTACHMENT
          </button>
          <button
            onClick={() => setActiveTab("avatar")}
            className={`px-3 py-1.5 rounded text-xs font-mono transition ${
              activeTab === "avatar"
                ? "bg-indigo-600 text-white font-bold"
                : "bg-[#101420] text-[#94A3B8] hover:text-white border border-[#1E2436]"
            }`}
          >
            AVATAR
          </button>
          <button
            onClick={() => setActiveTab("shadcn-card")}
            className={`px-3 py-1.5 rounded text-xs font-mono transition ${
              activeTab === "shadcn-card"
                ? "bg-indigo-600 text-white font-bold"
                : "bg-[#101420] text-[#94A3B8] hover:text-white border border-[#1E2436]"
            }`}
          >
            SHADCN CARD
          </button>
          <button
            onClick={() => setActiveTab("mui-card")}
            className={`px-3 py-1.5 rounded text-xs font-mono transition ${
              activeTab === "mui-card"
                ? "bg-indigo-600 text-white font-bold"
                : "bg-[#101420] text-[#94A3B8] hover:text-white border border-[#1E2436]"
            }`}
          >
            MUI OUTLINED CARD
          </button>
          <button
            onClick={() => setActiveTab("typography")}
            className={`px-3 py-1.5 rounded text-xs font-mono transition ${
              activeTab === "typography"
                ? "bg-indigo-600 text-white font-bold"
                : "bg-[#101420] text-[#94A3B8] hover:text-white border border-[#1E2436]"
            }`}
          >
            MUI TYPOGRAPHY THEME
          </button>
          <button
            onClick={() => setActiveTab("skeleton")}
            className={`px-3 py-1.5 rounded text-xs font-mono transition ${
              activeTab === "skeleton"
                ? "bg-indigo-600 text-white font-bold"
                : "bg-[#101420] text-[#94A3B8] hover:text-white border border-[#1E2436]"
            }`}
          >
            MUI SKELETON VARIANTS
          </button>
        </div>
      </div>

      {/* Module 00A: Apple Cupertino / macOS Sequoia / visionOS Design System */}
      {(activeTab === "all" || activeTab === "apple-design") && (
        <AppleDesignShowcase />
      )}

      {/* Module 00D: Old Photograph 4-Tone Forensic Archive Palette */}
      {(activeTab === "all" || activeTab === "oldphoto") && (
        <div className="bg-[#0D0F17] border border-[#878672]/40 rounded-lg p-6 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#1E2436]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#D9D7B6] font-bold">00D //</span>
              <h2 className="text-base font-serif font-extrabold text-white tracking-wider uppercase">
                Old Photograph Palette — #FDFBD4 • #D9D7B6 • #878672 • #545333
              </h2>
            </div>
            <span className="text-[10px] font-mono text-[#D9D7B6] bg-[#545333]/40 px-2 py-0.5 rounded border border-[#878672]">
              HERITAGE FORENSIC SPEC
            </span>
          </div>

          <p className="text-xs text-[#94A3B8]">
            Archival forensic palette inspired by historical government records and aged judicial affidavits. Composed of 4 tones: <strong className="text-[#FDFBD4]">#FDFBD4</strong> (Cream Parchment), <strong className="text-[#D9D7B6]">#D9D7B6</strong> (Sage Sand), <strong className="text-[#878672]">#878672</strong> (Antique Stone), and <strong className="text-[#D9D7B6] bg-[#545333] px-1 py-0.2 rounded">#545333</strong> (Deep Olive Drab).
          </p>

          <OldPhotographPaletteDemo />
        </div>
      )}

      {/* Module 00C: React Bits Cyber-Text Suite (DecryptedText, ShinyText, BlurText) */}
      {(activeTab === "all" || activeTab === "cyber-text") && (
        <div className="bg-[#0D0F17] border border-indigo-500/30 rounded-lg p-6 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#1E2436]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-cyan-400 font-bold">00C //</span>
              <h2 className="text-base font-heading font-extrabold text-white tracking-wider uppercase">
                Cyber-Text Suite — DecryptedText, ShinyText & BlurText
              </h2>
            </div>
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
              REACT BITS ANIMATION SUITE
            </span>
          </div>

          <p className="text-xs text-[#94A3B8]">
            Three forensic kinetic typography engines: <strong className="text-cyan-300">DecryptedText</strong> (dynamic SHA-256 / IPFS hash unscrambling with speed and directional controls), <strong className="text-indigo-300">ShinyText</strong> (GPU-accelerated specular metallic sweep on critical badges), and <strong className="text-emerald-300">BlurText</strong> (cinematic soft-focus letter/word reveals).
          </p>

          <CyberTextDemo />
        </div>
      )}

      {/* Module 00B: React Bits Fold Text Suite */}
      {(activeTab === "all" || activeTab === "fold-text") && (
        <div className="bg-[#0D0F17] border border-indigo-500/30 rounded-lg p-6 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#1E2436]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-cyan-400 font-bold">00B //</span>
              <h2 className="text-base font-heading font-extrabold text-white tracking-wider uppercase">
                Fold Text Suite — @/components/FoldText
              </h2>
            </div>
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
              REACT BITS GSAP SPEC
            </span>
          </div>

          <p className="text-xs text-[#94A3B8]">
            3D origami kinetic typography that cascades characters, words, or lines into place along 4 configurable hinges (<code className="text-indigo-300 font-mono">top</code>, <code className="text-indigo-300 font-mono">bottom</code>, <code className="text-indigo-300 font-mono">left</code>, <code className="text-indigo-300 font-mono">right</code>) with realistic crease shading, depth perspectives, and GSAP scroll/hover triggers.
          </p>

          <FoldTextDemo />

          {/* Code Reference */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-[#08090D] border border-[#1E2436] rounded-lg font-mono text-[11px] text-[#94A3B8] space-y-2">
              <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-bold">
                <Code size={13} />
                <span>PROPS & VARIANTS</span>
              </div>
              <pre className="text-slate-300">
{`splitBy: "char" | "word" | "line"
hinge: "top" | "bottom" | "left" | "right"
trigger: "mount" | "hover" | "scroll" | "loop"
creaseShading: 0.0 - 1.0 (gradient depth)
perspective: 120px+ (3D distance)`}
              </pre>
            </div>

            <div className="p-4 bg-[#08090D] border border-[#1E2436] rounded-lg font-mono text-[11px] text-[#94A3B8] space-y-2 overflow-x-auto">
              <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-bold">
                <Code size={13} />
                <span>IMPORT & USAGE</span>
              </div>
              <pre className="text-slate-300">
{`import FoldText from '@/components/FoldText';

<FoldText
  text="Launch with clarity"
  splitBy="char"
  hinge="top"
  trigger="scroll"
  duration={0.65}
  stagger={0.045}
  ease="power3.out"
  perspective={700}
  creaseShading={0.55}
  fontSize="clamp(2rem, 5vw, 4.5rem)"
  fontWeight={800}
  color="#f7f2e8"
/>`}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Module 00: Animate-UI Stars Background Suite */}
      {(activeTab === "all" || activeTab === "stars") && (
        <div className="bg-[#0D0F17] border border-indigo-500/30 rounded-lg p-6 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#1E2436]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-indigo-400 font-bold">00 //</span>
              <h2 className="text-base font-heading font-extrabold text-white tracking-wider uppercase">
                Stars Background Suite — @/components/animate-ui/components/backgrounds/stars
              </h2>
            </div>
            <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
              ANIMATE-UI STARS SPEC
            </span>
          </div>

          <p className="text-xs text-[#94A3B8]">
            An interactive cosmic space background featuring multi-layered animated stars with parallax mouse tracking, configurable densities, speeds, and theme-adaptive coloring.
          </p>

          <StarsBackgroundDemo />

          {/* Code Reference */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-[#08090D] border border-[#1E2436] rounded-lg font-mono text-[11px] text-[#94A3B8] space-y-2">
              <div className="flex items-center gap-1.5 text-xs text-indigo-400 font-bold">
                <Code size={13} />
                <span>COMPOSITION</span>
              </div>
              <pre className="text-slate-300">
{`StarsBackground
├── StarLayer (size 1px, 1000 stars)
├── StarLayer (size 2px, 400 stars)
└── StarLayer (size 3px, 200 stars)`}
              </pre>
            </div>

            <div className="p-4 bg-[#08090D] border border-[#1E2436] rounded-lg font-mono text-[11px] text-[#94A3B8] space-y-2 overflow-x-auto">
              <div className="flex items-center gap-1.5 text-xs text-indigo-400 font-bold">
                <Code size={13} />
                <span>IMPORT & USAGE</span>
              </div>
              <pre className="text-slate-300">
{`import { StarsBackground } from '@/components/animate-ui/components/backgrounds/stars';
import { useTheme } from 'next-themes';

const { resolvedTheme } = useTheme();

<StarsBackground
  starColor={resolvedTheme === 'dark' ? '#FFF' : '#000'}
  className="absolute inset-0 flex items-center justify-center rounded-xl"
/>`}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Module 01: shadcn/ui Scroll Area Suite */}
      {(activeTab === "all" || activeTab === "scroll-area") && (
        <div className="bg-[#0D0F17] border border-indigo-500/30 rounded-lg p-6 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#1E2436]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-indigo-400 font-bold">01 //</span>
              <h2 className="text-base font-heading font-extrabold text-white tracking-wider uppercase">
                Scroll Area Suite — @/components/ui/scroll-area
              </h2>
            </div>
            <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
              BASE-NOVA SPEC
            </span>
          </div>

          <p className="text-xs text-[#94A3B8]">
            Augments native scroll functionality with custom cross-browser styling, vertical and horizontal scrollbars (<code className="text-indigo-300 font-mono">orientation=&quot;horizontal&quot;</code>), thumb glow states, and RTL compatibility.
          </p>

          {/* Interactive Live Demo */}
          <ScrollAreaDemo />

          {/* Code Reference & Composition */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-[#08090D] border border-[#1E2436] rounded-lg font-mono text-[11px] text-[#94A3B8] space-y-2">
              <div className="flex items-center gap-1.5 text-xs text-indigo-400 font-bold">
                <Code size={13} />
                <span>COMPOSITION</span>
              </div>
              <pre className="text-slate-300">
{`ScrollArea
└── ScrollBar`}
              </pre>
            </div>

            <div className="p-4 bg-[#08090D] border border-[#1E2436] rounded-lg font-mono text-[11px] text-[#94A3B8] space-y-2 overflow-x-auto">
              <div className="flex items-center gap-1.5 text-xs text-indigo-400 font-bold">
                <Code size={13} />
                <span>IMPORT & USAGE</span>
              </div>
              <pre className="text-slate-300">
{`import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

{/* Vertical */}
<ScrollArea className="h-64 w-80 rounded-md border p-4">
  {content}
</ScrollArea>

{/* Horizontal */}
<ScrollArea className="w-96 rounded-md border p-4">
  <div className="flex gap-4">{wideContent}</div>
  <ScrollBar orientation="horizontal" />
</ScrollArea>`}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Module 01B: Base UI / Animate-UI Progress Suite */}
      {(activeTab === "all" || activeTab === "progress") && (
        <div className="bg-[#0D0F17] border border-indigo-500/30 rounded-lg p-6 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#1E2436]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-cyan-400 font-bold">01B //</span>
              <h2 className="text-base font-heading font-extrabold text-white tracking-wider uppercase">
                Animated Progress Suite — @/components/animate-ui/components/base/progress
              </h2>
            </div>
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
              BASE-UI ANIMATE SPEC
            </span>
          </div>

          <p className="text-xs text-[#94A3B8]">
            Displays the live progress of long-running tasks using smooth spring-physics animations powered by Framer Motion, counting number values, customizable labels, and accessible Base UI primitives.
          </p>

          <div className="p-8 bg-[#08090D] border border-[#1E2436] rounded-xl flex flex-col items-center justify-center min-h-[160px]">
            <BaseProgressDemo />
          </div>

          {/* Code Reference */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-[#08090D] border border-[#1E2436] rounded-lg font-mono text-[11px] text-[#94A3B8] space-y-2">
              <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-bold">
                <Code size={13} />
                <span>COMPOSITION</span>
              </div>
              <pre className="text-slate-300">
{`Progress
├── ProgressLabel
├── ProgressValue
└── ProgressTrack
    └── ProgressIndicator (motion)`}
              </pre>
            </div>

            <div className="p-4 bg-[#08090D] border border-[#1E2436] rounded-lg font-mono text-[11px] text-[#94A3B8] space-y-2 overflow-x-auto">
              <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-bold">
                <Code size={13} />
                <span>IMPORT & USAGE</span>
              </div>
              <pre className="text-slate-300">
{`import {
  Progress,
  ProgressLabel,
  ProgressTrack,
  ProgressValue,
} from '@/components/animate-ui/components/base/progress';

<Progress value={progress} className="w-[300px] space-y-2">
  <div className="flex items-center justify-between gap-1">
    <ProgressLabel>Export data</ProgressLabel>
    <span className="text-sm">
      <ProgressValue /> %
    </span>
  </div>
  <ProgressTrack />
</Progress>`}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Module 02: shadcn/ui Sidebar Suite */}
      {(activeTab === "all" || activeTab === "sidebar") && (
        <div className="bg-[#0D0F17] border border-indigo-500/30 rounded-lg p-6 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#1E2436]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-cyan-400 font-bold">02 //</span>
              <h2 className="text-base font-heading font-extrabold text-white tracking-wider uppercase">
                Sidebar Suite — @/components/ui/sidebar
              </h2>
            </div>
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
              SHADCN/UI NOVA SPEC
            </span>
          </div>

          <p className="text-xs text-[#94A3B8]">
            A composable, themeable, and customizable sidebar component with icon collapsing, keyboard toggle (<kbd className="px-1 py-0.5 rounded bg-[#101420] text-indigo-300 font-mono">Ctrl+B</kbd>), submenus, badges, rails, and responsive mobile drawers.
          </p>

          <SidebarDemo />
        </div>
      )}

      {/* Module 02B: Radix Sidebar Suite (Animate-UI) */}
      {(activeTab === "all" || activeTab === "radix-sidebar") && (
        <div className="bg-[#0D0F17] border border-indigo-500/30 rounded-lg p-6 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#1E2436]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-indigo-400 font-bold">02B //</span>
              <h2 className="text-base font-heading font-extrabold text-white tracking-wider uppercase">
                Radix Sidebar Suite — @/components/animate-ui/components/radix/sidebar
              </h2>
            </div>
            <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
              RADIX ANIMATE-UI SPEC
            </span>
          </div>

          <p className="text-xs text-[#94A3B8]">
            Multi-tenant collapsible sidebar with team switcher, collapsible submenus, project dropdowns, user menu, breadcrumb header, and keyboard collapse shortcut.
          </p>

          <div className="rounded-xl border border-[#1E2436] overflow-hidden min-h-[580px] shadow-2xl bg-[#08090D]">
            <RadixSidebarDemo />
          </div>
        </div>
      )}

      {/* Module 03: shadcn/ui Attachment Suite */}
      {(activeTab === "all" || activeTab === "attachment") && (
        <div className="bg-[#0D0F17] border border-indigo-500/30 rounded-lg p-6 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#1E2436]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-emerald-400 font-bold">03 //</span>
              <h2 className="text-base font-heading font-extrabold text-white tracking-wider uppercase">
                Attachment Suite — @/components/ui/attachment
              </h2>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              BASE-RHEA SPEC
            </span>
          </div>

          <p className="text-xs text-[#94A3B8]">
            Displays a file or image attachment with media preview, metadata, upload states (<code className="text-indigo-300 font-mono">idle</code>, <code className="text-indigo-300 font-mono">uploading</code>, <code className="text-indigo-300 font-mono">processing</code>, <code className="text-indigo-300 font-mono">error</code>, <code className="text-indigo-300 font-mono">done</code>), actions, triggers, and snapping <code className="text-indigo-300 font-mono">AttachmentGroup</code> rows.
          </p>

          <AttachmentDemo />
        </div>
      )}

      {/* Module 04: shadcn/ui Avatar Suite */}
      {(activeTab === "all" || activeTab === "avatar") && (
        <div className="bg-[#0D0F17] border border-indigo-500/30 rounded-lg p-6 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#1E2436]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-indigo-400 font-bold">04 //</span>
              <h2 className="text-base font-heading font-extrabold text-white tracking-wider uppercase">
                Avatar Suite — @/components/ui/avatar
              </h2>
            </div>
            <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
              SHADCN/UI & BASE-UI
            </span>
          </div>

          <p className="text-xs text-[#94A3B8]">
            An image element with a fallback for representing the logged-in user. Supports <code className="text-indigo-300 font-mono">AvatarImage</code>, <code className="text-indigo-300 font-mono">AvatarFallback</code>, <code className="text-indigo-300 font-mono">AvatarBadge</code>, <code className="text-indigo-300 font-mono">AvatarGroup</code>, and sizes.
          </p>

          <AvatarDemo />

          {/* Animate-UI Avatar Group with Tooltips */}
          <div className="pt-4 border-t border-[#1E2436] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold block">
                ANIMATE-UI AVATAR GROUP WITH HOVER TOOLTIPS:
              </span>
              <span className="text-[10px] font-mono text-[#64748B]">
                @/components/animate-ui/components/animate/avatar-group
              </span>
            </div>
            <div className="p-8 bg-[#08090D] border border-cyan-500/20 rounded-xl flex items-center justify-center">
              <AvatarGroupDemo />
            </div>
          </div>
        </div>
      )}

      {/* Module 05: Modern shadcn/ui Card */}
      {(activeTab === "all" || activeTab === "shadcn-card") && (
        <div className="bg-[#0D0F17] border border-indigo-500/30 rounded-lg p-6 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#1E2436]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-cyan-400 font-bold">05 //</span>
              <h2 className="text-base font-heading font-extrabold text-white tracking-wider uppercase">
                Card Suite — @/components/ui/card
              </h2>
            </div>
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
              SHADCN/UI NOVA SPEC
            </span>
          </div>

          <p className="text-xs text-[#94A3B8]">
            Displays a card with header, content, and footer. Features <code className="text-indigo-300 font-mono">CardTitle</code>, <code className="text-indigo-300 font-mono">CardDescription</code>, <code className="text-indigo-300 font-mono">CardAction</code>, <code className="text-indigo-300 font-mono">size=&quot;sm&quot;</code>, and the <code className="text-indigo-300 font-mono">--card-spacing</code> CSS variable.
          </p>

          <CardDemo />
        </div>
      )}

      {/* Module 06: MUI OutlinedCard */}
      {(activeTab === "all" || activeTab === "mui-card") && (
        <div className="bg-[#0D0F17] border border-[#1E2436] rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#1E2436]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-emerald-400 font-bold">06 //</span>
              <h2 className="text-base font-heading font-extrabold text-white tracking-wider uppercase">
                MUI OutlinedCard — Card, CardContent, CardActions, Typography
              </h2>
            </div>
            <span className="text-[10px] font-mono text-[#64748B] bg-[#101420] px-2 py-0.5 rounded border border-[#1E2436]">
              @mui/material/Card
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-[#08090D] border border-[#1E2436] rounded-lg space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#64748B] block">
                LIVE COMPONENT PREVIEW:
              </span>
              <div className="p-2 inline-block">
                <OutlinedCard />
              </div>
            </div>

            <div className="p-4 bg-[#08090D] border border-[#1E2436] rounded-lg font-mono text-[11px] text-[#94A3B8] space-y-2 overflow-x-auto max-h-72">
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold">
                <Code size={13} />
                <span>IMPLEMENTATION</span>
              </div>
              <pre className="text-slate-300">
{`import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function OutlinedCard() {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}`}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Module 07: Typography System & Serif Font */}
      {(activeTab === "all" || activeTab === "typography") && (
        <div className="bg-[#0D0F17] border border-indigo-500/30 rounded-lg p-6 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#1E2436]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-indigo-400 font-bold">07 //</span>
              <h2 className="text-base font-heading font-extrabold text-white tracking-wider uppercase">
                Typography System & Serif Font Spec
              </h2>
            </div>
            <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
              FRAUNCES SERIF + RAJDHANI + IBM PLEX
            </span>
          </div>

          {/* Typography Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Serif (Fraunces) */}
            <div className="p-4 bg-[#08090D] border border-amber-500/30 rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">
                  01. SERIF FONT (FRAUNCES)
                </span>
                <span className="text-[10px] font-mono text-[#64748B]">font-serif</span>
              </div>
              <h3 className="font-serif text-lg font-bold text-white tracking-normal leading-snug">
                Bharatiya Nagarik Suraksha Sanhita — Section 63 Affidavit
              </h3>
              <p className="font-serif text-xs text-[#94A3B8] italic leading-relaxed">
                &ldquo;In the Court of the Chief Judicial Magistrate: Forensic verification of electronic records, bitwise integrity hashes, and custodial affidavits.&rdquo;
              </p>
              <div className="pt-2 text-[10px] font-mono text-[#64748B] border-t border-[#1E2436]">
                Target use: Court affidavits, case docket titles, gazetted legal certificates.
              </div>
            </div>

            {/* Heading (Rajdhani) */}
            <div className="p-4 bg-[#08090D] border border-indigo-500/30 rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-bold">
                  02. DISPLAY HEADING (RAJDHANI)
                </span>
                <span className="text-[10px] font-mono text-[#64748B]">font-heading</span>
              </div>
              <h3 className="font-heading text-xl font-extrabold text-white tracking-wider uppercase">
                AUTONOMOUS CYBER TELEMETRY RADAR
              </h3>
              <p className="font-sans text-xs text-[#94A3B8] leading-relaxed">
                Tight uppercase display for console metrics, module banners, and tactical statuses.
              </p>
              <div className="pt-2 text-[10px] font-mono text-[#64748B] border-t border-[#1E2436]">
                Target use: Navigation, stat headers, console modules, action buttons.
              </div>
            </div>

            {/* Sans (IBM Plex Sans) */}
            <div className="p-4 bg-[#08090D] border border-[#1E2436] rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#94A3B8] font-bold">
                  03. BODY SANS (IBM PLEX SANS)
                </span>
                <span className="text-[10px] font-mono text-[#64748B]">font-sans</span>
              </div>
              <p className="font-sans text-xs text-white leading-relaxed">
                Clean, legible typography optimized for law enforcement officers scanning dense forensic logs and investigator notes during long shifts.
              </p>
              <div className="pt-2 text-[10px] font-mono text-[#64748B] border-t border-[#1E2436]">
                Target use: General UI body text, form labels, tooltips, dialogs.
              </div>
            </div>

            {/* Monospace (JetBrains Mono) */}
            <div className="p-4 bg-[#08090D] border border-cyan-500/30 rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold">
                  04. MONOSPACE (JETBRAINS MONO)
                </span>
                <span className="text-[10px] font-mono text-[#64748B]">font-mono</span>
              </div>
              <p className="font-mono text-xs text-cyan-300 truncate">
                SHA-256: 7f83b1657ff1fc53b92dc18148a1d65d
              </p>
              <p className="font-mono text-[11px] text-[#64748B]">
                CID: bafybeicciqduqsz6pecwgtpsfyl2texlw2xcqz
              </p>
              <div className="pt-2 text-[10px] font-mono text-[#64748B] border-t border-[#1E2436]">
                Target use: Cryptographic hashes, IPFS CIDs, FIR IDs, UTC/IST clocks.
              </div>
            </div>
          </div>

          {/* Color Token: #BCB8B1 (Ash / Archival Paper) */}
          <div className="p-4 bg-[#08090D] border border-[#BCB8B1]/30 rounded-lg space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#1E2436]">
              <div className="flex items-center gap-2">
                <span className="size-4 rounded-full bg-[#BCB8B1] inline-block shadow-[0_0_8px_rgba(188,184,177,0.4)]" />
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  COLOR TOKEN: #BCB8B1 (ASH / ARCHIVAL PAPER)
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#BCB8B1] bg-[#101420] px-2 py-0.5 rounded border border-[#BCB8B1]/20">
                RGB(188, 184, 177)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-3 rounded bg-[#101420] border border-[#1E2436] space-y-1">
                <span className="text-[10px] font-mono text-[#64748B] block uppercase">TAILWIND TOKEN</span>
                <p className="text-xs font-mono font-bold text-[#BCB8B1]">text-ash / text-bcb8b1</p>
                <p className="text-[10px] font-mono text-[#64748B]">bg-ash, border-ash</p>
              </div>

              <div className="p-3 rounded bg-[#101420] border border-[#1E2436] space-y-1">
                <span className="text-[10px] font-mono text-[#64748B] block uppercase">CSS VARIABLE</span>
                <p className="text-xs font-mono font-bold text-[#BCB8B1]">var(--ash)</p>
                <p className="text-[10px] font-mono text-[#64748B]">var(--paper-ash)</p>
              </div>

              <div className="p-3 rounded bg-[#101420] border border-[#1E2436] space-y-1">
                <span className="text-[10px] font-mono text-[#64748B] block uppercase">PRIMARY APPLICATION</span>
                <p className="text-xs font-serif text-[#BCB8B1]">Affidavits & Evidence Seals</p>
                <p className="text-[10px] font-mono text-[#64748B]">Legal labels, docket hashes</p>
              </div>
            </div>
          </div>

          {/* MUI TypographyTheme */}
          <div className="pt-3 border-t border-[#1E2436]">
            <span className="text-xs font-mono uppercase tracking-wider text-[#64748B] block mb-2">
              MUI TYPOGRAPHY BUTTON DIV INTEGRATION:
            </span>
            <div className="p-4 bg-[#08090D] border border-indigo-500/20 rounded inline-block">
              <TypographyTheme />
            </div>
          </div>
        </div>
      )}

      {/* Module 08: Skeleton Variants */}
      {(activeTab === "all" || activeTab === "skeleton") && (
        <div className="bg-[#0D0F17] border border-[#1E2436] rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#1E2436]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-cyan-400 font-bold">08 //</span>
              <h2 className="text-base font-heading font-extrabold text-white tracking-wider uppercase">
                Skeleton Variants — Skeleton & Stack
              </h2>
            </div>
            <span className="text-[10px] font-mono text-[#64748B] bg-[#101420] px-2 py-0.5 rounded border border-[#1E2436]">
              @mui/material/Skeleton + Stack
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-[#08090D] border border-[#1E2436] rounded-lg space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#64748B] block">
                LIVE COMPONENT PREVIEW:
              </span>
              <div className="p-4 bg-[#101420] border border-cyan-500/20 rounded max-w-xs">
                <div className="[&_.MuiSkeleton-root]:bg-slate-800/80 [&_.MuiSkeleton-root]:after:bg-slate-700/30">
                  <Variants />
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#08090D] border border-[#1E2436] rounded-lg font-mono text-[11px] text-[#94A3B8] space-y-2 overflow-x-auto">
              <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-bold">
                <Code size={13} />
                <span>IMPLEMENTATION</span>
              </div>
              <pre className="text-slate-300">
{`import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function Variants() {
  return (
    <Stack spacing={1}>
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="rectangular" width={210} height={60} />
      <Skeleton variant="rounded" width={210} height={60} />
    </Stack>
  );
}`}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
