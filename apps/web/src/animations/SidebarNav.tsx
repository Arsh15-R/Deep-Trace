"use client";

import React from "react";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { spring } from "./motion";

export type NavItem = { to: string; label: string; icon?: ReactNode };

/** Active item gets a pill that slides between links (shared layout animation). */
export function SidebarNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {items.map((item) => {
        const isActive = pathname === item.to || (item.to !== "/" && pathname?.startsWith(item.to));
        return (
          <Link
            key={item.to}
            href={item.to}
            className="relative block rounded-lg px-3 py-2 text-sm select-none transition-colors"
          >
            {isActive && (
              <motion.span
                layoutId="nav-pill"
                className="absolute inset-0 rounded-lg pointer-events-none"
                style={{ background: "var(--hover)", border: "1px solid var(--line)" }}
                transition={spring}
              />
            )}
            <span
              className="relative z-10 flex items-center gap-3 font-medium transition-colors"
              style={{ color: isActive ? "var(--fg)" : "var(--muted)" }}
            >
              {item.icon}
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
