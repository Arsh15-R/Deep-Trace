"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, AlertCircle, ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Page, Reveal } from "@/animations";

export default function LoginPage() {
  const router = useRouter();
  const { signInWithGoogle, session, profile, switchDemoRole } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If already authenticated and active, redirect to dashboard
  React.useEffect(() => {
    if (session && profile?.status === "active") {
      router.push("/dashboard");
    }
  }, [session, profile, router]);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      await signInWithGoogle();
    } catch (err: any) {
      console.error("Google sign in error:", err);
      setError(err?.message || "Failed to initialize Google authentication. Please try again.");
      setLoading(false);
    }
  };

  const handleDemoSignIn = (role: "admin" | "officer") => {
    switchDemoRole(role, "active");
    router.push("/dashboard");
  };

  return (
    <Page className="min-h-screen bg-apple-bg text-apple-text flex flex-col justify-between p-6 sm:p-12">
      {/* Top Header */}
      <div className="max-w-[420px] mx-auto w-full flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-1.5 font-semibold tracking-tight text-apple-text hover:opacity-75 transition-opacity"
        >
          <span className="w-4 h-4 rounded-full border-[1.5px] border-apple-text flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-apple-blue" />
          </span>
          <span className="text-[14px]">DeepTrace</span>
        </Link>
        <span className="text-[12px] text-apple-text-secondary">
          Law Enforcement Portal
        </span>
      </div>

      {/* Main Centered Sign-in Card */}
      <div className="max-w-[380px] mx-auto w-full my-auto text-center">
        <Reveal>
          <div className="w-14 h-14 rounded-full bg-apple-surface-secondary border border-apple-hairline mx-auto flex items-center justify-center mb-5 text-apple-text">
            <ShieldCheck className="w-7 h-7 text-apple-blue" strokeWidth={1.5} />
          </div>

          <h1 className="text-[28px] sm:text-[34px] font-semibold tracking-apple-tight text-apple-text mb-2">
            Officer Sign In
          </h1>
          <p className="text-[14px] text-apple-text-secondary mb-8 leading-relaxed">
            Authenticate using your official government or police Google workspace account.
          </p>
        </Reveal>

        {/* Clear Error State */}
        {error && (
          <Reveal>
            <div className="mb-6 p-4 rounded-2xl bg-apple-red/10 border border-apple-red/20 text-left flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-apple-red shrink-0 mt-0.5" strokeWidth={1.5} />
              <div>
                <div className="text-[13px] font-semibold text-apple-red">Authentication Failed</div>
                <div className="text-[12px] text-apple-text-secondary mt-0.5 leading-snug">{error}</div>
              </div>
            </div>
          </Reveal>
        )}

        {/* Single "Continue with Google" Button */}
        <Reveal delay={0.08}>
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full py-3.5 px-5 rounded-full bg-apple-surface hover:bg-apple-surface-tertiary border border-apple-hairline text-apple-text text-[14px] font-medium transition-all shadow-apple-subtle active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-5 h-5 rounded-full border-2 border-apple-hairline border-t-apple-blue animate-spin" />
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            )}
            <span>{loading ? "Redirecting to Google…" : "Continue with Google"}</span>
          </button>
        </Reveal>

        {/* Demo Fast Logins for Testing */}
        <Reveal delay={0.16}>
          <div className="mt-8 pt-6 border-t border-apple-hairline/60">
            <span className="text-[12px] text-apple-text-tertiary block mb-3">
              Developer / Demo fast access:
            </span>
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => handleDemoSignIn("admin")}
                className="px-3.5 py-1.5 rounded-full bg-apple-surface-secondary hover:bg-apple-surface-tertiary text-apple-text text-[12px] font-medium transition-colors"
              >
                Sign in as Admin
              </button>
              <button
                onClick={() => handleDemoSignIn("officer")}
                className="px-3.5 py-1.5 rounded-full bg-apple-surface-secondary hover:bg-apple-surface-tertiary text-apple-text text-[12px] font-medium transition-colors"
              >
                Sign in as Officer
              </button>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Footer */}
      <div className="max-w-[420px] mx-auto w-full text-center text-[12px] text-apple-text-secondary">
        BNSS 2023 Sec 63 &amp; IEA 65B Electronic Records Authentication
      </div>
    </Page>
  );
}
