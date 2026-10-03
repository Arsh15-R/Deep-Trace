"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/lib/supabase";
import { ShieldAlert, ArrowLeft } from "lucide-react";

interface RoleGateProps {
  allow: UserRole[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function RoleGate({ allow, children, fallback }: RoleGateProps) {
  const { profile, loading, switchDemoRole } = useAuth();

  if (loading) return null;

  const isAllowed = profile && allow.includes(profile.role);

  if (!isAllowed) {
    if (fallback) return <>{fallback}</>;

    return (
      <div className="max-w-[520px] mx-auto px-6 py-20 text-center">
        <div className="w-14 h-14 rounded-full bg-apple-surface-secondary border border-apple-hairline mx-auto flex items-center justify-center mb-5 text-apple-red">
          <ShieldAlert className="w-7 h-7" strokeWidth={1.5} />
        </div>

        <span className="text-[11px] font-mono uppercase tracking-wider text-apple-red px-2.5 py-1 rounded-full bg-apple-red/10 border border-apple-red/20 inline-block mb-3">
          Restricted Zone
        </span>

        <h2 className="text-[26px] sm:text-[32px] font-semibold tracking-apple-tight text-apple-text mb-2">
          Admin Access Required
        </h2>

        <p className="text-[14px] text-apple-text-secondary leading-relaxed mb-8">
          This console is restricted to State Cyber Crime Administrators. Your current role is{" "}
          <span className="font-semibold text-apple-text uppercase">{profile?.role || "viewer"}</span>.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-apple-surface border border-apple-hairline text-apple-text text-[13px] font-medium hover:bg-apple-surface-secondary transition-colors inline-flex items-center justify-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Command Center</span>
          </Link>

          {/* Quick Demo Switcher for Evaluation */}
          <button
            onClick={() => switchDemoRole("admin", "active")}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-apple-blue hover:bg-apple-blue-hover text-white text-[13px] font-medium transition-colors shadow-apple-subtle"
          >
            Demo: Switch to Admin Role
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
