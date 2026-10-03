"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { ShieldAlert, Clock, LogOut, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { session, profile, loading, signOut, switchDemoRole } = useAuth();

  useEffect(() => {
    if (!loading && !session && !profile) {
      router.push("/login");
    }
  }, [loading, session, profile, router]);

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-apple-bg flex items-center justify-center p-6">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="w-8 h-8 rounded-full border-2 border-apple-hairline border-t-apple-blue animate-spin" />
          <p className="text-[13px] text-apple-text-secondary">
            Verifying officer credentials…
          </p>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (!session && !profile) {
    return null;
  }

  // 1. Pending Approval State
  if (profile?.status === "pending") {
    return (
      <div className="min-h-screen bg-apple-bg text-apple-text flex flex-col justify-between p-6 sm:p-12">
        <div className="max-w-[440px] mx-auto w-full my-auto text-center">
          <div className="w-14 h-14 rounded-full bg-apple-surface-secondary border border-apple-hairline mx-auto flex items-center justify-center mb-5 text-apple-orange">
            <Clock className="w-7 h-7" strokeWidth={1.5} />
          </div>

          <span className="text-[11px] font-mono uppercase tracking-wider text-apple-orange px-2.5 py-1 rounded-full bg-apple-orange/10 border border-apple-orange/20 inline-block mb-3">
            Status: Pending Approval
          </span>

          <h1 className="text-[26px] sm:text-[32px] font-semibold tracking-apple-tight text-apple-text mb-2">
            Waiting for Admin Approval
          </h1>

          <p className="text-[14px] text-apple-text-secondary leading-relaxed mb-6">
            Your Google account (<span className="text-apple-text font-medium">{profile.email}</span>) has been registered. A State Cyber Crime administrator must approve and assign your police station before forensic access is granted.
          </p>

          <div className="p-4 rounded-2xl bg-apple-surface border border-apple-hairline text-left text-[13px] mb-8 space-y-2">
            <div className="flex justify-between">
              <span className="text-apple-text-secondary">Deponent Name:</span>
              <span className="font-medium text-apple-text">{profile.full_name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-apple-text-secondary">Requested Role:</span>
              <span className="font-medium text-apple-text uppercase">{profile.role}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-apple-text-secondary">Account ID:</span>
              <span className="font-mono text-[11px] text-apple-text-secondary truncate max-w-[200px]">
                {profile.id}
              </span>
            </div>
          </div>

          {/* Quick Demo Approval Button for reviewers */}
          <div className="space-y-3">
            <button
              onClick={() => switchDemoRole("officer", "active")}
              className="w-full py-2.5 px-4 rounded-full bg-apple-blue hover:bg-apple-blue-hover text-white text-[13px] font-medium transition-all shadow-apple-subtle"
            >
              Demo: Simulate Admin Approval (Activate)
            </button>

            <button
              onClick={() => signOut()}
              className="w-full py-2.5 px-4 rounded-full bg-apple-surface-secondary hover:bg-apple-surface-tertiary text-apple-text-secondary hover:text-apple-text text-[13px] font-medium transition-colors flex items-center justify-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. Disabled Account State
  if (profile?.status === "disabled") {
    return (
      <div className="min-h-screen bg-apple-bg text-apple-text flex flex-col justify-between p-6 sm:p-12">
        <div className="max-w-[440px] mx-auto w-full my-auto text-center">
          <div className="w-14 h-14 rounded-full bg-apple-surface-secondary border border-apple-hairline mx-auto flex items-center justify-center mb-5 text-apple-red">
            <ShieldAlert className="w-7 h-7" strokeWidth={1.5} />
          </div>

          <span className="text-[11px] font-mono uppercase tracking-wider text-apple-red px-2.5 py-1 rounded-full bg-apple-red/10 border border-apple-red/20 inline-block mb-3">
            Access Disabled
          </span>

          <h1 className="text-[26px] sm:text-[32px] font-semibold tracking-apple-tight text-apple-text mb-2">
            Access Revoked
          </h1>

          <p className="text-[14px] text-apple-text-secondary leading-relaxed mb-6">
            Access for this officer account has been disabled by the system administrator. If this is in error, please contact your station superintendent.
          </p>

          <div className="space-y-3">
            <button
              onClick={() => switchDemoRole("officer", "active")}
              className="w-full py-2.5 px-4 rounded-full bg-apple-surface border border-apple-hairline text-apple-text text-[13px] font-medium hover:bg-apple-surface-secondary transition-colors"
            >
              Demo: Re-activate Account
            </button>

            <button
              onClick={() => signOut()}
              className="w-full py-2.5 px-4 rounded-full bg-apple-blue hover:bg-apple-blue-hover text-white text-[13px] font-medium transition-colors flex items-center justify-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Active status -> render children
  return <>{children}</>;
}
