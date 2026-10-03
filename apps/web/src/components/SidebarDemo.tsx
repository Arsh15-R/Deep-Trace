"use client";

import React, { useState } from "react";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarMenuSkeleton,
  SidebarRail,
  SidebarInset,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Shield,
  Radio,
  Sliders,
  FileAudio,
  FolderLock,
  FileText,
  Globe,
  Plus,
  ChevronDown,
  User2,
  Terminal,
  Clock,
  Sparkles,
  KeyRound,
  ExternalLink,
} from "lucide-react";

function InnerConsoleView() {
  const { state, toggleSidebar } = useSidebar();

  return (
    <div className="flex-1 p-5 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#1E2436]">
        <div className="flex items-center gap-3">
          <SidebarTrigger />
          <div>
            <h3 className="text-sm font-heading font-bold text-white uppercase">
              FORENSIC TELEMETRY VIEWPORT
            </h3>
            <p className="text-[11px] font-mono text-[#64748B]">
              Sidebar State: <span className="text-indigo-400 font-bold uppercase">{state}</span> • Press <kbd className="px-1 py-0.5 rounded bg-[#101420] text-white border border-[#1E2436]">Ctrl+B</kbd> to toggle
            </p>
          </div>
        </div>

        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
          NODE: ONLINE
        </span>
      </div>

      <div className="p-4 rounded-xl bg-[#08090D] border border-[#1E2436] space-y-2">
        <span className="text-xs font-heading font-bold text-white block">
          COMPOSABLE SIDEBAR ARCHITECTURE
        </span>
        <p className="text-xs text-[#94A3B8] leading-relaxed">
          The sidebar collapses down into icon mode seamlessly, supports keyboard shortcuts (<code className="text-indigo-300 font-mono">ctrl+b</code> / <code className="text-indigo-300 font-mono">cmd+b</code>), persistent cookie state, submenus, badges, and responsive offcanvas drawer for mobile devices.
        </p>
      </div>
    </div>
  );
}

export default function SidebarDemo() {
  const [activeItem, setActiveItem] = useState("01");

  return (
    <div className="border border-[#1E2436] rounded-xl overflow-hidden shadow-2xl h-[480px] flex flex-col bg-[#08090D]">
      <SidebarProvider defaultOpen={true}>
        <Sidebar collapsible="icon" className="border-r border-[#1E2436]">
          {/* Header */}
          <SidebarHeader>
            <div className="flex items-center gap-2.5 px-1 py-0.5">
              <div className="size-8 rounded-lg bg-indigo-600/20 border border-indigo-500/40 text-indigo-400 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(99,102,241,0.3)]">
                <Shield size={16} />
              </div>
              <div className="min-w-0 flex-1 overflow-hidden">
                <div className="text-xs font-heading font-extrabold tracking-wider text-white truncate">
                  DEEPTRACE
                </div>
                <div className="text-[9px] font-mono text-[#64748B] truncate">
                  CYBER FORENSICS
                </div>
              </div>
            </div>
          </SidebarHeader>

          {/* Content */}
          <SidebarContent>
            {/* Primary Navigation Group */}
            <SidebarGroup>
              <SidebarGroupLabel>OPERATIONS</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      isActive={activeItem === "01"}
                      onClick={() => setActiveItem("01")}
                    >
                      <Radio className="size-4 shrink-0 text-indigo-400" />
                      <span className="truncate">COMMAND CENTER</span>
                      <SidebarMenuBadge>01</SidebarMenuBadge>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton
                      isActive={activeItem === "02"}
                      onClick={() => setActiveItem("02")}
                    >
                      <Sliders className="size-4 shrink-0 text-cyan-400" />
                      <span className="truncate">AI MEDIA SCANNER</span>
                      <SidebarMenuBadge>02</SidebarMenuBadge>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton
                      isActive={activeItem === "03"}
                      onClick={() => setActiveItem("03")}
                    >
                      <FileAudio className="size-4 shrink-0 text-amber-400" />
                      <span className="truncate">VOICE LAB</span>
                      <SidebarMenuBadge>03</SidebarMenuBadge>
                    </SidebarMenuButton>

                    {/* Submenu Demonstration */}
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton isActive={true}>
                          <span>Pitch Contours</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton>
                          <span>Phase Sync</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Custody Group */}
            <SidebarGroup>
              <SidebarGroupLabel>EVIDENCE CUSTODY</SidebarGroupLabel>
              <SidebarGroupAction title="Add case docket">
                <Plus size={13} />
              </SidebarGroupAction>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      isActive={activeItem === "05"}
                      onClick={() => setActiveItem("05")}
                    >
                      <FolderLock className="size-4 shrink-0 text-emerald-400" />
                      <span className="truncate">IPFS VAULT</span>
                      <SidebarMenuBadge>LOCKED</SidebarMenuBadge>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton
                      isActive={activeItem === "06"}
                      onClick={() => setActiveItem("06")}
                    >
                      <FileText className="size-4 shrink-0 text-indigo-400" />
                      <span className="truncate">BNSS 63 HUB</span>
                      <SidebarMenuBadge>06</SidebarMenuBadge>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          {/* Footer */}
          <SidebarFooter>
            <div className="flex items-center gap-2 px-1">
              <div className="size-7 rounded bg-indigo-600 text-white flex items-center justify-center font-heading font-bold text-xs shrink-0">
                DW
              </div>
              <div className="min-w-0 flex-1 truncate">
                <div className="text-[11px] font-heading font-bold text-white truncate">
                  Insp. Daksh Walia
                </div>
                <div className="text-[9px] font-mono text-[#64748B] truncate">
                  #CHD-CYB-0042
                </div>
              </div>
            </div>
          </SidebarFooter>

          {/* Rail */}
          <SidebarRail />
        </Sidebar>

        {/* Inset Main Viewport */}
        <SidebarInset>
          <InnerConsoleView />
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
