"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase, Profile, UserRole, UserStatus } from "@/lib/supabase";

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<{ error?: string }>;
  switchDemoRole: (role: UserRole, status?: UserStatus) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Default realistic fallback profile for offline/demo inspection
const defaultDemoProfile: Profile = {
  id: "usr_admin_0042",
  email: "daksh.walia@police.gov.in",
  full_name: "Daksh Walia",
  avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  role: "admin",
  status: "active",
  badge_no: "#CHD-CYB-0042",
  designation: "Cyber Forensics Inspector",
  station: "Cyber Crime Police Station, Sector 17, Chandigarh",
  phone: "+91 98765 43210",
  last_active: new Date().toISOString(),
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch or upsert profile in Supabase profiles table
  const fetchProfile = useCallback(async (currentSession: Session | null) => {
    if (!currentSession?.user) {
      // Check if local demo override exists
      const savedDemo = typeof window !== "undefined" ? localStorage.getItem("deeptrace_demo_profile") : null;
      if (savedDemo) {
        try {
          const parsed = JSON.parse(savedDemo);
          setProfile(parsed);
          setLoading(false);
          return;
        } catch {
          // ignore
        }
      }
      setProfile(null);
      setLoading(false);
      return;
    }

    const authUser = currentSession.user;
    setUser(authUser);

    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", authUser.id)
        .maybeSingle();

      if (error && error.code !== "PGRST116") {
        console.warn("Error fetching profile from Supabase:", error.message);
      }

      if (data) {
        setProfile(data as Profile);
        // update last_active timestamp in background
        supabase
          .from("profiles")
          .update({ last_active: new Date().toISOString() })
          .eq("id", authUser.id)
          .then();
      } else {
        // Create new profile row for first-time Google sign-in
        const newProfile: Partial<Profile> = {
          id: authUser.id,
          email: authUser.email || "",
          full_name:
            authUser.user_metadata?.full_name ||
            authUser.user_metadata?.name ||
            authUser.email?.split("@")[0] ||
            "Officer",
          avatar_url: authUser.user_metadata?.avatar_url || null,
          role: "officer",
          status: "pending", // Pending admin approval as required
          badge_no: null,
          designation: "Investigating Officer",
          station: "State Cyber Crime Cell",
          phone: null,
          last_active: new Date().toISOString(),
        };

        const { data: inserted, error: insertErr } = await supabase
          .from("profiles")
          .insert([newProfile])
          .select()
          .single();

        if (!insertErr && inserted) {
          setProfile(inserted as Profile);
        } else {
          // Fallback to local profile object
          setProfile({
            ...newProfile,
            id: authUser.id,
            email: authUser.email || "",
          } as Profile);
        }
      }
    } catch (err) {
      console.warn("Supabase profiles query failed; using fallback:", err);
      setProfile({
        ...defaultDemoProfile,
        id: authUser.id,
        email: authUser.email || defaultDemoProfile.email,
        full_name: authUser.user_metadata?.full_name || defaultDemoProfile.full_name,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    // 1. Check initial Supabase session
    supabase.auth.getSession().then(({ data: { session: initSession } }) => {
      if (!mounted) return;
      setSession(initSession);
      fetchProfile(initSession);
    });

    // 2. Subscribe to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, currentSession) => {
      if (!mounted) return;
      setSession(currentSession);
      fetchProfile(currentSession);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [fetchProfile]);

  const signInWithGoogle = async () => {
    setLoading(true);
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${origin}/dashboard`,
      },
    });
    if (error) {
      setLoading(false);
      throw error;
    }
  };

  const signOut = async () => {
    setLoading(true);
    if (typeof window !== "undefined") {
      localStorage.removeItem("deeptrace_demo_profile");
    }
    await supabase.auth.signOut();
    setSession(null);
    setUser(null);
    setProfile(null);
    setLoading(false);
  };

  const refreshProfile = async () => {
    await fetchProfile(session);
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!profile) return { error: "No profile loaded" };
    try {
      const { error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("id", profile.id);

      if (error) throw error;
      setProfile((prev) => (prev ? { ...prev, ...updates } : null));
      return {};
    } catch (err: any) {
      // Optimistic update locally
      setProfile((prev) => (prev ? { ...prev, ...updates } : null));
      return { error: err.message };
    }
  };

  // Demo role switcher for testing all roles (admin, officer, viewer, pending, disabled)
  const switchDemoRole = (role: UserRole, status: UserStatus = "active") => {
    const updated: Profile = {
      ...(profile || defaultDemoProfile),
      role,
      status,
    };
    setProfile(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("deeptrace_demo_profile", JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        profile,
        loading,
        signInWithGoogle,
        signOut,
        refreshProfile,
        updateProfile,
        switchDemoRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
