"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import React, { useEffect, useId, useRef, useState } from "react";
import type { ReactNode } from "react";
import { spring } from "@/animations/motion";

export type MenuUser = {
  name: string;
  email: string;
  role: string; // e.g. "admin", "officer", "viewer"
  avatarUrl?: string | null;
};

const formatRole = (r: string) =>
  r
    .split(/[_\s-]+/)
    .filter(Boolean)
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");

const initials = (n: string) =>
  n
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");

/* ---------- tiny icons (stroke = currentColor) ---------- */
const Icon = ({ children }: { children: ReactNode }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    {children}
  </svg>
);

const UserIcon = () => (
  <Icon>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
  </Icon>
);

const ShieldIcon = () => (
  <Icon>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </Icon>
);

const KeyIcon = () => (
  <Icon>
    <circle cx="8" cy="15" r="4" />
    <path d="M11 12l9-9M16 7l3 3M14 9l2 2" />
  </Icon>
);

const OutIcon = () => (
  <Icon>
    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
  </Icon>
);

/* ---------- avatar with Google photo + initials fallback ---------- */
function Avatar({ user, size }: { user: MenuUser; size: number }) {
  const [failed, setFailed] = useState(false);
  const show = user.avatarUrl && !failed;
  return (
    <span
      className="grid shrink-0 place-items-center overflow-hidden rounded-full font-semibold select-none"
      style={{
        width: size,
        height: size,
        background: "var(--fg)",
        color: "var(--bg)",
        fontSize: size * 0.38,
      }}
    >
      {show ? (
        <img
          src={user.avatarUrl!}
          alt={user.name}
          width={size}
          height={size}
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        initials(user.name)
      )}
    </span>
  );
}

/* ---------- main ProfileMenu component ---------- */
export function ProfileMenu({
  user,
  isAdmin = false,
  onProfile,
  onAdmin,
  onPinSheet,
  onSignOut,
}: {
  user: MenuUser;
  isAdmin?: boolean;
  onProfile: () => void;
  onAdmin?: () => void;
  onPinSheet: () => void;
  onSignOut: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  const close = (returnFocus = true) => {
    setOpen(false);
    setHovered(null);
    if (returnFocus) triggerRef.current?.focus();
  };

  // click outside + Escape
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) close(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // focus first item when opened via keyboard
  useEffect(() => {
    if (open) listRef.current?.querySelector<HTMLElement>('[role="menuitem"]')?.focus();
  }, [open]);

  const onListKey = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const nodes = Array.from(listRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? []);
    const i = nodes.indexOf(document.activeElement as HTMLElement);
    const next = e.key === "ArrowDown" ? (i + 1) % nodes.length : (i - 1 + nodes.length) % nodes.length;
    nodes[next]?.focus();
  };

  const items = [
    {
      key: "profile",
      label: "Profile & Credentials",
      hint: "Badge, station and contact",
      icon: <UserIcon />,
      run: onProfile,
    },
    ...(isAdmin && onAdmin
      ? [
          {
            key: "admin",
            label: "Admin Panel",
            hint: "User approvals and audit log",
            icon: <ShieldIcon />,
            run: onAdmin,
          },
        ]
      : []),
    {
      key: "pin",
      label: "PIN Passcode Sheet",
      hint: "Manage your access PIN",
      icon: <KeyIcon />,
      run: onPinSheet,
    },
    {
      key: "out",
      label: "Sign out",
      hint: "End this session",
      icon: <OutIcon />,
      run: onSignOut,
    },
  ];

  return (
    <div ref={wrapRef} className="relative inline-block text-left">
      {/* trigger */}
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
        className="group flex items-center gap-2.5 rounded-full py-1 pl-1 pr-3 transition-colors hover:bg-[var(--hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        style={{ border: "1px solid var(--line)", outlineColor: "var(--fg)" }}
      >
        <Avatar user={user} size={30} />
        <span className="hidden text-left leading-tight sm:block">
          <span className="block max-w-[130px] truncate text-xs font-medium text-[var(--fg)]">
            {user.name}
          </span>
          <span className="block text-[10px] text-[var(--subtle)]">
            {formatRole(user.role)}
          </span>
        </span>
        <motion.svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--muted)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{ rotate: open ? 180 : 0 }}
          transition={spring}
          aria-hidden
        >
          <path d="M6 9l6 6 6-6" />
        </motion.svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={menuId}
            role="menu"
            aria-label="Account"
            className="absolute right-0 top-full z-50 mt-3 w-[320px] origin-top-right overflow-hidden rounded-2xl"
            style={{
              background: "color-mix(in srgb, var(--bg) 92%, transparent)",
              backdropFilter: "blur(22px) saturate(160%)",
              WebkitBackdropFilter: "blur(22px) saturate(160%)",
              border: "1px solid var(--line)",
              boxShadow: "0 24px 60px -12px rgba(0,0,0,0.45)",
            }}
            initial={{ opacity: 0, scale: 0.95, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -4, transition: { duration: 0.12 } }}
            transition={spring}
          >
            {/* header */}
            <div className="relative p-5" style={{ borderBottom: "1px solid var(--line)" }}>
              <div className="flex items-center gap-4">
                {/* slowly rotating monochrome ring around the avatar */}
                <span className="relative grid h-[64px] w-[64px] shrink-0 place-items-center">
                  <motion.span
                    aria-hidden
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        "conic-gradient(from 0deg, var(--line), var(--fg), var(--line), var(--subtle), var(--line))",
                    }}
                    animate={reduce ? undefined : { rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  />
                  <span
                    className="relative grid place-items-center rounded-full p-[3px]"
                    style={{ background: "var(--bg)" }}
                  >
                    <Avatar user={user} size={56} />
                  </span>
                </span>

                <div className="min-w-0">
                  <div className="truncate text-base font-semibold text-[var(--fg)]">
                    {user.name}
                  </div>
                  <div className="truncate text-xs text-[var(--muted)]">
                    {user.email}
                  </div>
                  <span
                    className="mt-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em]"
                    style={{ border: "1px solid var(--line)", color: "var(--muted)" }}
                  >
                    <span
                      aria-hidden
                      className="live-dot inline-block h-1.5 w-1.5 rounded-full"
                      style={{ background: "var(--fg)" }}
                    />
                    {formatRole(user.role)}
                  </span>
                </div>
              </div>
            </div>

            {/* items */}
            <motion.div
              ref={listRef}
              className="p-2"
              onKeyDown={onListKey}
              onMouseLeave={() => setHovered(null)}
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } },
              }}
            >
              {items.map((it, i) => (
                <div key={it.key}>
                  {i === items.length - 1 && (
                    <div className="mx-3 my-1.5 h-px" style={{ background: "var(--line)" }} />
                  )}
                  <motion.button
                    type="button"
                    role="menuitem"
                    variants={{ hidden: { opacity: 0, y: 6 }, show: { opacity: 1, y: 0 } }}
                    onMouseEnter={() => setHovered(it.key)}
                    onFocus={() => setHovered(it.key)}
                    onClick={() => {
                      close(false);
                      it.run();
                    }}
                    className="relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left outline-none cursor-pointer"
                  >
                    {hovered === it.key && (
                      <motion.span
                        layoutId="profile-menu-hover"
                        aria-hidden
                        className="absolute inset-0 rounded-xl"
                        style={{ background: "var(--hover)", border: "1px solid var(--line)" }}
                        transition={spring}
                      />
                    )}
                    <span
                      className="relative z-10 transition-colors"
                      style={{ color: hovered === it.key ? "var(--fg)" : "var(--muted)" }}
                    >
                      {it.icon}
                    </span>
                    <span className="relative z-10 min-w-0 flex-1">
                      <span className="block text-sm font-medium text-[var(--fg)]">
                        {it.label}
                      </span>
                      <span className="block text-xs text-[var(--subtle)]">
                        {it.hint}
                      </span>
                    </span>
                    <motion.svg
                      className="relative z-10"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--muted)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                      animate={{
                        x: hovered === it.key ? 0 : -4,
                        opacity: hovered === it.key ? 1 : 0,
                      }}
                      transition={{ duration: 0.18 }}
                    >
                      <path d="M9 6l6 6-6 6" />
                    </motion.svg>
                  </motion.button>
                </div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ProfileMenu;
