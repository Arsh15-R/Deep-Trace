"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Search,
  Sun,
  Moon,
  Shield,
  CheckCircle2,
  Lock,
  ChevronRight,
  Menu,
  X,
  User,
  ShieldAlert,
  LogOut,
  Sliders,
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
  const { theme, setTheme, resolvedTheme } = useTheme();
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
    { href: "/scan", label: "Scanner" },
    { href: "/audio", label: "Voice Lab" },
    { href: "/intake", label: "Intake" },
    { href: "/evidence", label: "Vault" },
    { href: "/cases", label: "Certificates" },
  ];

  // If admin, add Admin Panel to nav links or dropdown
  const isAdmin = profile?.role === "admin";

  const firstName = profile?.full_name ? profile.full_name.split(" ")[0] : "Officer";
  const initials = profile?.full_name
    ? profile.full_name
        .split(" ")
        .map((p) => p[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "OF";

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
      <header className="sticky top-0 z-40 w-full h-12 apple-vibrancy border-b border-apple-hairline/60 transition-colors">
        <div className="max-w-[1020px] mx-auto h-full px-4 sm:px-6 flex items-center justify-between text-[13px]">
          {/* Left: DeepTrace Wordmark */}
          <Link
            href="/"
            className="flex items-center gap-1.5 font-semibold tracking-tight text-apple-text hover:opacity-75 transition-opacity"
          >
            <span className="w-4 h-4 rounded-full border-[1.5px] border-apple-text flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-apple-blue" />
            </span>
            <span className="text-[14px]">DeepTrace</span>
          </Link>

          {/* Center: 5-6 Apple-style text links */}
          <nav className="hidden md:flex items-center space-x-7">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors duration-150 ${
                    isActive
                      ? "text-apple-text font-medium"
                      : "text-apple-text-secondary hover:text-apple-text"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right: Search (Cmd+K), Theme Toggle, Officer Avatar & Dropdown */}
          <div className="flex items-center gap-3">
            {/* Search Trigger */}
            <button
              onClick={handleOpenCmdk}
              aria-label="Search cases (Command + K)"
              className="p-1.5 text-apple-text-secondary hover:text-apple-text transition-colors rounded-full hover:bg-apple-surface-secondary"
              title="Search cases (⌘K)"
            >
              <Search className="w-4 h-4" strokeWidth={1.5} />
            </button>

            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={() =>
                  setTheme(resolvedTheme === "dark" ? "light" : "dark")
                }
                aria-label="Toggle display theme"
                className="p-1.5 text-apple-text-secondary hover:text-apple-text transition-colors rounded-full hover:bg-apple-surface-secondary"
                title={resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                {resolvedTheme === "dark" ? (
                  <Sun className="w-4 h-4" strokeWidth={1.5} />
                ) : (
                  <Moon className="w-4 h-4" strokeWidth={1.5} />
                )}
              </button>
            )}

            {/* Profile Menu Component with Rotating Ring, Live Dot, and Apple Vibrancy */}
            <ProfileMenu
              user={{
                name: profile?.full_name || "Investigating Officer",
                email: profile?.email || "officer@police.gov.in",
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

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-apple-text-secondary hover:text-apple-text"
              aria-label="Open menu"
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
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="md:hidden border-b border-apple-hairline apple-vibrancy px-6 py-4 flex flex-col space-y-3"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-apple-text hover:text-apple-blue py-1 text-[15px]"
                >
                  {link.label}
                </Link>
              ))}
              {isAdmin && (
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-apple-blue font-medium py-1 text-[15px]"
                >
                  Admin Panel
                </Link>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Embedded Modals if not externally controlled */}
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
