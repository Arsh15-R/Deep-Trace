"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Search,
  Menu,
  X,
  Shield,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import OfficerAuthModal from "./OfficerAuthModal";
import CommandPalette from "./CommandPalette";
import { ProfileMenu } from "./ProfileMenu";
import { useAuth } from "@/contexts/AuthContext";

interface AppleNavbarProps {
  onOpenPinModal?: () => void;
  onOpenCommandPalette?: () => void;
}

export default function AppleNavbar({
  onOpenPinModal,
  onOpenCommandPalette,
}: AppleNavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { profile, signOut } = useAuth();

  const [mounted, setMounted] = useState(false);
  const [isPinOpen, setIsPinOpen] = useState(false);
  const [isCmdkOpen, setIsCmdkOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { href: "/dashboard", label: "Command Center" },
    { href: "/scan", label: "Media Scanner" },
    { href: "/audio", label: "Voice Lab" },
    { href: "/evidence", label: "Evidence Vault" },
    { href: "/cases", label: "Cases" },
    { href: "/extension", label: "Web Radar" },
  ];

  const isAdmin = profile?.role === "admin";

  const handleOpenPin = () => {
    if (onOpenPinModal) {
      onOpenPinModal();
    } else {
      setIsPinOpen(true);
    }
  };

  const handleOpenCmdk = () => {
    if (onOpenCommandPalette) {
      onOpenCommandPalette();
    } else {
      setIsCmdkOpen(true);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full h-13 bg-canvas/95 backdrop-blur-md border-b border-border-subtle transition-colors">
        <div className="max-w-[1100px] mx-auto h-full px-4 sm:px-6 flex items-center justify-between text-[13px]">
          {/* Brand: Government Cyber Forensics Identity */}
          <Link
            href="/"
            className="flex items-center gap-2.5 font-semibold tracking-tight text-text-primary hover:text-white transition-colors"
          >
            <div className="w-6 h-6 rounded-[4px] bg-surface-elevated border border-border-default flex items-center justify-center text-accent">
              <Shield className="w-3.5 h-3.5" strokeWidth={2} />
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] font-semibold tracking-tight leading-tight">
                DeepTrace
              </span>
              <span className="text-[10px] text-text-tertiary uppercase tracking-wider font-mono">
                Cyber Forensics Core
              </span>
            </div>
          </Link>

          {/* Navigation Links (Matching Routes) */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[13px] py-1 transition-colors duration-150 ${
                    isActive
                      ? "text-text-primary font-medium border-b border-accent"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2">
            {/* Command Palette Trigger */}
            <button
              onClick={handleOpenCmdk}
              aria-label="Search cases (Ctrl + K)"
              className="inline-flex items-center gap-2 px-2.5 py-1.5 text-text-tertiary hover:text-text-secondary bg-surface border border-border-subtle rounded-[6px] text-xs font-mono transition-colors duration-150"
              title="Search records (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5" strokeWidth={1.5} />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden sm:inline text-[10px] bg-surface-elevated px-1 py-0.5 rounded border border-border-subtle">
                ⌘K
              </kbd>
            </button>

            {/* Profile Dropdown */}
            <ProfileMenu
              user={{
                name: profile?.full_name || "Investigating Officer",
                email: profile?.email || "officer@cyber.police.gov.in",
                role: profile?.role || "officer",
                avatarUrl: profile?.avatar_url,
              }}
              isAdmin={isAdmin}
              onProfile={() => router.push("/profile")}
              onAdmin={() => router.push("/admin")}
              onPinSheet={handleOpenPin}
              onSignOut={async () => {
                await signOut();
                router.push("/login");
              }}
            />

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-text-secondary hover:text-text-primary rounded-[6px]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-4 h-4" strokeWidth={1.5} />
              ) : (
                <Menu className="w-4 h-4" strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="md:hidden border-b border-border-subtle bg-surface px-6 py-4 flex flex-col space-y-2.5"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-text-secondary hover:text-text-primary py-1 text-[14px]"
                >
                  {link.label}
                </Link>
              ))}
              {isAdmin && (
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-accent font-medium py-1 text-[14px]"
                >
                  Admin Panel
                </Link>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <OfficerAuthModal
        isOpen={isPinOpen}
        onClose={() => setIsPinOpen(false)}
      />
      <CommandPalette
        isOpen={isCmdkOpen}
        onClose={() => setIsCmdkOpen(false)}
      />
    </>
  );
}
