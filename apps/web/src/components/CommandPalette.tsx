"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Radio,
  Sliders,
  FileAudio,
  FolderLock,
  FileText,
  FilePlus,
  ArrowRight,
  Shield,
  CornerDownLeft,
} from "lucide-react";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const items = [
    {
      id: "cmd-center",
      title: "Command Center",
      section: "Views",
      path: "/dashboard",
      icon: Radio,
    },
    {
      id: "scanner",
      title: "Media Scanner",
      section: "Views",
      path: "/scan",
      icon: Sliders,
    },
    {
      id: "voice",
      title: "Voice Lab",
      section: "Views",
      path: "/audio",
      icon: FileAudio,
    },
    {
      id: "intake",
      title: "Evidence Intake",
      section: "Actions",
      path: "/intake",
      icon: FilePlus,
    },
    {
      id: "vault",
      title: "Evidence Vault",
      section: "Views",
      path: "/evidence",
      icon: FolderLock,
    },
    {
      id: "cases",
      title: "Certificates & Cases",
      section: "Views",
      path: "/cases",
      icon: FileText,
    },
    {
      id: "case-42",
      title: "Case DT-847294 (FIR-2026-CHD-042)",
      section: "Recent Cases",
      path: "/cases/DT-847294/certificate",
      icon: Shield,
    },
    {
      id: "case-109",
      title: "Case DT-910482 (FIR-2026-DEL-109)",
      section: "Recent Cases",
      path: "/cases/DT-910482/certificate",
      icon: Shield,
    },
  ];

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.section.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredItems.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredItems.length - 1
        );
      } else if (e.key === "Enter" && filteredItems[selectedIndex]) {
        e.preventDefault();
        router.push(filteredItems[selectedIndex].path);
        onClose();
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, router, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4 bg-black/30 backdrop-blur-sm">
        {/* Backdrop click to dismiss */}
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: -10 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-[620px] rounded-2xl apple-vibrancy border border-apple-hairline shadow-apple-modal overflow-hidden z-10"
        >
          {/* Spotlight Search Input */}
          <div className="flex items-center px-4 py-3.5 border-b border-apple-hairline/60">
            <Search className="w-5 h-5 text-apple-text-secondary mr-3" strokeWidth={1.5} />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              placeholder="Search views, cases, or actions…"
              className="w-full bg-transparent text-[17px] text-apple-text placeholder:text-apple-text-secondary focus:outline-none"
            />
            <span className="text-[11px] font-mono text-apple-text-tertiary px-1.5 py-0.5 rounded border border-apple-hairline/60">
              ESC
            </span>
          </div>

          {/* Results List */}
          <div className="max-h-[360px] overflow-y-auto p-2 space-y-1">
            {filteredItems.length === 0 ? (
              <div className="py-12 text-center text-apple-text-secondary text-[14px]">
                No matching results found.
              </div>
            ) : (
              filteredItems.map((item, idx) => {
                const Icon = item.icon;
                const isSelected = idx === selectedIndex;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      router.push(item.path);
                      onClose();
                    }}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-[14px] transition-colors ${
                      isSelected
                        ? "bg-apple-blue text-white"
                        : "text-apple-text hover:bg-apple-surface-secondary"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Icon
                        className={`w-4 h-4 shrink-0 ${
                          isSelected ? "text-white" : "text-apple-text-secondary"
                        }`}
                        strokeWidth={1.5}
                      />
                      <span className="truncate font-normal">{item.title}</span>
                      <span
                        className={`text-[12px] truncate ${
                          isSelected ? "text-white/80" : "text-apple-text-tertiary"
                        }`}
                      >
                        {item.section}
                      </span>
                    </div>

                    {isSelected && (
                      <CornerDownLeft className="w-3.5 h-3.5 text-white/80 shrink-0 ml-2" />
                    )}
                  </button>
                );
              })
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-2 border-t border-apple-hairline/60 flex items-center justify-between text-[11px] text-apple-text-tertiary">
            <span>Navigate with ↑ ↓ keys</span>
            <span>Select with ↵</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
