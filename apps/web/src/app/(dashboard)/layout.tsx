"use client";

import React, { useState } from "react";
import AppleNavbar from "@/components/AppleNavbar";
import OfficerAuthModal from "@/components/OfficerAuthModal";
import CommandPalette from "@/components/CommandPalette";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);

  return (
    <div className="min-h-screen bg-apple-bg text-apple-text flex flex-col antialiased selection:bg-apple-blue selection:text-white transition-colors duration-200">
      {/* 48px Translucent Apple Navbar */}
      <AppleNavbar
        onOpenPinModal={() => setIsPinModalOpen(true)}
        onOpenCommandPalette={() => setIsPaletteOpen(true)}
      />

      {/* Main Workspace */}
      <main className="flex-1 w-full">
        {children}
      </main>

      {/* Shared Modals */}
      <OfficerAuthModal
        isOpen={isPinModalOpen}
        onClose={() => setIsPinModalOpen(false)}
      />
      <CommandPalette
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
      />
    </div>
  );
}
