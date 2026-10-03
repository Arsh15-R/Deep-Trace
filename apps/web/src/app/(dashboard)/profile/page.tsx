"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Page, Reveal } from "@/animations";
import { toast } from "@/components/ui/sonner";
import {
  User,
  Shield,
  Mail,
  Building,
  Phone,
  BadgeCheck,
  Save,
  CheckCircle2,
  Lock,
} from "lucide-react";

export default function ProfilePage() {
  const { profile, updateProfile, switchDemoRole } = useAuth();

  const [badgeNo, setBadgeNo] = useState("");
  const [designation, setDesignation] = useState("");
  const [station, setStation] = useState("");
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setBadgeNo(profile.badge_no || "");
      setDesignation(profile.designation || "");
      setStation(profile.station || "");
      setPhone(profile.phone || "");
    }
  }, [profile]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const { error } = await updateProfile({
      badge_no: badgeNo.trim() || null,
      designation: designation.trim() || null,
      station: station.trim() || null,
      phone: phone.trim() || null,
    });

    setSaving(false);
    if (error) {
      toast.error("Failed to update profile", { description: error });
    } else {
      toast.success("Profile updated successfully", {
        description: "Official credentials synchronized with database.",
      });
    }
  };

  const firstName = profile?.full_name ? profile.full_name.split(" ")[0] : "Officer";
  const initials = profile?.full_name
    ? profile.full_name
        .split(" ")
        .map((p) => p[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "OF";

  return (
    <ProtectedRoute>
      <Page className="max-w-[760px] mx-auto px-4 sm:px-8 py-10 sm:py-16">
        {/* Page Header */}
        <div className="mb-10">
          <p className="text-[13px] text-apple-text-secondary font-medium mb-1">
            Officer Credentials &amp; Station Assignment
          </p>
          <h1 className="text-[34px] sm:text-[42px] font-semibold tracking-apple-tight text-apple-text">
            Officer Profile
          </h1>
          <p className="text-[15px] text-apple-text-secondary mt-1">
            Manage your judicial deponent credentials used on Form II Section 63 BNSS certificates.
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-8">
          {/* Top Identity Card */}
          <Reveal>
            <div className="p-6 sm:p-8 rounded-3xl bg-apple-surface border border-apple-hairline shadow-apple-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                {profile?.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt={profile.full_name || "Officer"}
                    className="w-20 h-20 rounded-full object-cover border-2 border-apple-hairline"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-apple-surface-secondary border-2 border-apple-hairline flex items-center justify-center text-[22px] font-semibold text-apple-text">
                    {initials}
                  </div>
                )}

                <div>
                  <h2 className="text-[22px] font-semibold text-apple-text">
                    {profile?.full_name || "Investigating Officer"}
                  </h2>
                  <div className="text-[13px] text-apple-text-secondary mt-0.5 flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5" />
                    <span>{profile?.email}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded-full bg-apple-blue/15 text-apple-blue font-semibold">
                      Role: {profile?.role || "officer"}
                    </span>
                    <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded-full bg-apple-green/15 text-apple-green font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-apple-green" />
                      Status: {profile?.status || "active"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Demo Role Switcher for Testing Roles */}
              <div className="flex items-center gap-1.5 p-1 rounded-full bg-apple-surface-secondary border border-apple-hairline text-[11px]">
                <span className="px-2 text-apple-text-secondary">Demo Role:</span>
                {(["admin", "officer", "viewer"] as const).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => {
                      switchDemoRole(r, "active");
                      toast.info(`Switched role to ${r}`);
                    }}
                    className={`px-2.5 py-1 rounded-full capitalize font-medium transition-colors ${
                      profile?.role === r
                        ? "bg-apple-blue text-white"
                        : "text-apple-text-secondary hover:text-apple-text"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Form Fields Section */}
          <Reveal delay={0.08}>
            <div className="p-6 sm:p-8 rounded-3xl bg-apple-surface border border-apple-hairline shadow-apple-subtle space-y-6">
              <h3 className="text-[17px] font-semibold text-apple-text border-b border-apple-hairline pb-3">
                Station &amp; Judicial Parameters
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Badge Number */}
                <div>
                  <label className="text-[13px] text-apple-text-secondary block mb-1.5 font-medium">
                    Badge Identification ID
                  </label>
                  <div className="relative">
                    <BadgeCheck className="w-4 h-4 text-apple-text-secondary absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={badgeNo}
                      onChange={(e) => setBadgeNo(e.target.value)}
                      placeholder="#CHD-CYB-0042"
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-apple-surface-secondary border border-apple-hairline text-[14px] font-mono text-apple-text focus:outline-none focus:border-apple-blue"
                    />
                  </div>
                </div>

                {/* Designation */}
                <div>
                  <label className="text-[13px] text-apple-text-secondary block mb-1.5 font-medium">
                    Official Rank / Designation
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-apple-text-secondary absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                      placeholder="Inspector (Cyber Forensics)"
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-apple-surface-secondary border border-apple-hairline text-[14px] text-apple-text focus:outline-none focus:border-apple-blue"
                    />
                  </div>
                </div>

                {/* Police Station */}
                <div className="sm:col-span-2">
                  <label className="text-[13px] text-apple-text-secondary block mb-1.5 font-medium">
                    Police Station / Jurisdiction Unit
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-apple-text-secondary absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={station}
                      onChange={(e) => setStation(e.target.value)}
                      placeholder="State Cyber Crime Police Station, UT Chandigarh"
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-apple-surface-secondary border border-apple-hairline text-[14px] text-apple-text focus:outline-none focus:border-apple-blue"
                    />
                  </div>
                </div>

                {/* Contact Phone */}
                <div>
                  <label className="text-[13px] text-apple-text-secondary block mb-1.5 font-medium">
                    Official Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-apple-text-secondary absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-apple-surface-secondary border border-apple-hairline text-[14px] font-mono text-apple-text focus:outline-none focus:border-apple-blue"
                    />
                  </div>
                </div>

                {/* Read-only Email */}
                <div>
                  <label className="text-[13px] text-apple-text-secondary block mb-1.5 font-medium">
                    Google Identity (Read-only)
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-apple-text-tertiary absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      disabled
                      value={profile?.email || ""}
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-apple-surface-secondary/50 border border-apple-hairline text-[14px] text-apple-text-secondary cursor-not-allowed opacity-75"
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-apple-hairline flex items-center justify-end gap-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-full bg-apple-blue hover:bg-apple-blue-hover text-white text-[13px] font-medium transition-all shadow-apple-subtle active:scale-[0.98] flex items-center gap-2 disabled:opacity-50"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{saving ? "Saving…" : "Save Profile"}</span>
                </button>
              </div>
            </div>
          </Reveal>
        </form>
      </Page>
    </ProtectedRoute>
  );
}
