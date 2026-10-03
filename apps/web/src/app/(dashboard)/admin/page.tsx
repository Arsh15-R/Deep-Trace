"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { RoleGate } from "@/components/auth/RoleGate";
import { Page, Reveal, CountUp, StaggerTBody, StaggerRow } from "@/animations";
import { toast } from "@/components/ui/sonner";
import { supabase, Profile, UserRole, UserStatus, AuditLogItem } from "@/lib/supabase";
import {
  Users,
  ShieldCheck,
  Clock,
  UserX,
  Search,
  Filter,
  Check,
  X,
  ShieldAlert,
  History,
  AlertTriangle,
  ChevronDown,
  RefreshCw,
  CheckCircle2,
} from "lucide-react";

// Fallback users for realistic display if remote DB is empty
const mockUsersSeed: Profile[] = [
  {
    id: "usr_admin_0042",
    email: "daksh.walia@police.gov.in",
    full_name: "Insp. Daksh Walia",
    avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    role: "admin",
    status: "active",
    badge_no: "#CHD-CYB-0042",
    designation: "Inspector (Cyber Forensics)",
    station: "Cyber Crime PS, Sector 17, Chandigarh",
    phone: "+91 98765 43210",
    last_active: "Just now",
  },
  {
    id: "usr_pending_101",
    email: "priya.sharma@delhipolice.gov.in",
    full_name: "SI Priya Sharma",
    avatar_url: null,
    role: "officer",
    status: "pending",
    badge_no: "#DEL-CYB-0189",
    designation: "Sub-Inspector",
    station: "Special Cell Cyber Ops, New Delhi",
    phone: "+91 98111 22334",
    last_active: "10 mins ago",
  },
  {
    id: "usr_pending_102",
    email: "k.raman@mumbaipolice.gov.in",
    full_name: "ACP K. Raman",
    avatar_url: null,
    role: "officer",
    status: "pending",
    badge_no: "#MUM-CYB-0412",
    designation: "Assistant Commissioner",
    station: "Cyber Crime PS, Bandra Kurla, Mumbai",
    phone: "+91 98222 33445",
    last_active: "1 hour ago",
  },
  {
    id: "usr_officer_203",
    email: "anil.deshmukh@police.gov.in",
    full_name: "Insp. Anil Deshmukh",
    avatar_url: null,
    role: "officer",
    status: "active",
    badge_no: "#PUN-CYB-0077",
    designation: "Investigating Officer",
    station: "Cyber Police Station, Shivaji Nagar, Pune",
    phone: "+91 98333 44556",
    last_active: "2 hours ago",
  },
  {
    id: "usr_viewer_304",
    email: "court.clerk@highcourt.gov.in",
    full_name: "Adv. Rajesh Mehra",
    avatar_url: null,
    role: "viewer",
    status: "active",
    badge_no: "#JUD-CLK-9102",
    designation: "Judicial Registry Clerk",
    station: "Punjab & Haryana High Court Registry",
    phone: "+91 98444 55667",
    last_active: "Yesterday",
  },
  {
    id: "usr_disabled_405",
    email: "former.officer@police.gov.in",
    full_name: "Ex-SI Vikram Seth",
    avatar_url: null,
    role: "officer",
    status: "disabled",
    badge_no: "#BLR-CYB-0012",
    designation: "Former Sub-Inspector",
    station: "CID Cyber Wing, Bengaluru",
    phone: "+91 98555 66778",
    last_active: "2 weeks ago",
  },
];

const mockAuditLogsSeed: AuditLogItem[] = [
  {
    id: "aud_01",
    actor_id: "usr_admin_0042",
    actor_name: "Insp. Daksh Walia",
    action: "USER_APPROVED",
    target_id: "usr_officer_203",
    target_email: "anil.deshmukh@police.gov.in",
    details: { assigned_role: "officer", status: "active", station: "Pune Cyber PS" },
    created_at: "Today, 11:20 AM",
  },
  {
    id: "aud_02",
    actor_id: "usr_admin_0042",
    actor_name: "Insp. Daksh Walia",
    action: "ROLE_CHANGED",
    target_id: "usr_viewer_304",
    target_email: "court.clerk@highcourt.gov.in",
    details: { from: "officer", to: "viewer" },
    created_at: "Yesterday, 03:45 PM",
  },
  {
    id: "aud_03",
    actor_id: "usr_admin_0042",
    actor_name: "Insp. Daksh Walia",
    action: "ACCESS_DISABLED",
    target_id: "usr_disabled_405",
    target_email: "former.officer@police.gov.in",
    details: { reason: "Officer transferred outside cyber jurisdiction" },
    created_at: "30 Sep 2026, 06:15 PM",
  },
];

export default function AdminPanelPage() {
  const { profile: currentAdmin } = useAuth();

  const [activeTab, setActiveTab] = useState<"users" | "pending" | "audit">("users");
  const [users, setUsers] = useState<Profile[]>(mockUsersSeed);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(mockAuditLogsSeed);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [loading, setLoading] = useState(false);

  // Confirm dialog state for sensitive role/status changes
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    user: Profile | null;
    actionType: "role" | "status";
    newRole?: UserRole;
    newStatus?: UserStatus;
  }>({
    isOpen: false,
    user: null,
    actionType: "role",
  });

  // Fetch users & audit log from Supabase
  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: dbUsers, error: usersErr } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (!usersErr && dbUsers && dbUsers.length > 0) {
        // Merge with currentAdmin if signed in
        setUsers(dbUsers as Profile[]);
      }

      const { data: dbAudit, error: auditErr } = await supabase
        .from("audit_log")
        .select("*")
        .order("created_at", { ascending: false });

      if (!auditErr && dbAudit && dbAudit.length > 0) {
        setAuditLogs(dbAudit as AuditLogItem[]);
      }
    } catch (err) {
      console.warn("Using offline mock seed for admin table:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Stats calculation
  const stats = useMemo(() => {
    return {
      total: users.length,
      pending: users.filter((u) => u.status === "pending").length,
      activeOfficers: users.filter((u) => u.role === "officer" && u.status === "active").length,
      admins: users.filter((u) => u.role === "admin").length,
    };
  }, [users]);

  // Filtered users
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesSearch =
        (u.full_name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (u.station || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (u.badge_no || "").toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRole = roleFilter === "all" ? true : u.role === roleFilter;
      const matchesStatus = statusFilter === "all" ? true : u.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchQuery, roleFilter, statusFilter]);

  const pendingUsers = useMemo(() => {
    return users.filter((u) => u.status === "pending");
  }, [users]);

  // RPC admin_update_user with fallback
  const handleUpdateUserStatus = async (
    targetUser: Profile,
    newRole: UserRole,
    newStatus: UserStatus
  ) => {
    // 1. Optimistic UI update
    setUsers((prev) =>
      prev.map((u) => (u.id === targetUser.id ? { ...u, role: newRole, status: newStatus } : u))
    );

    try {
      // Call RPC as requested
      const { error: rpcErr } = await supabase.rpc("admin_update_user", {
        target: targetUser.id,
        new_role: newRole,
        new_status: newStatus,
      });

      if (rpcErr) {
        // Fallback to direct profiles table update
        await supabase
          .from("profiles")
          .update({ role: newRole, status: newStatus })
          .eq("id", targetUser.id);
      }

      // Add to audit log
      const newLog: AuditLogItem = {
        id: `aud_${Date.now()}`,
        actor_id: currentAdmin?.id || "usr_admin_0042",
        actor_name: currentAdmin?.full_name || "Admin",
        action: newStatus === "active" ? "USER_APPROVED" : "STATUS_CHANGED",
        target_id: targetUser.id,
        target_email: targetUser.email,
        details: { new_role: newRole, new_status: newStatus },
        created_at: "Just now",
      };
      setAuditLogs((prev) => [newLog, ...prev]);

      // Attempt to save to audit_log table
      supabase
        .from("audit_log")
        .insert([
          {
            actor_id: currentAdmin?.id,
            action: newStatus === "active" ? "USER_APPROVED" : "STATUS_CHANGED",
            target_id: targetUser.id,
            details: { new_role: newRole, new_status: newStatus },
          },
        ])
        .then();

      toast.success(
        newStatus === "active"
          ? `Approved ${targetUser.full_name || targetUser.email}`
          : `Updated ${targetUser.full_name || targetUser.email}`,
        {
          description: `Role set to ${newRole.toUpperCase()} · Status ${newStatus.toUpperCase()}`,
        }
      );
    } catch (err: any) {
      toast.error("Failed to update user", { description: err.message });
      fetchData(); // Rollback
    }
  };

  return (
    <ProtectedRoute>
      <RoleGate allow={["admin"]}>
        <Page className="max-w-[1180px] mx-auto px-4 sm:px-8 py-10 sm:py-16">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-12 sm:mb-16">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-apple-blue font-semibold">
                  Judicial Administration
                </span>
                <span className="text-[12px] text-apple-text-tertiary">·</span>
                <span className="text-[12px] text-apple-text-secondary">
                  Restricted to State Admins
                </span>
              </div>
              <h1 className="text-[34px] sm:text-[44px] font-semibold tracking-apple-tight text-apple-text">
                Admin Panel
              </h1>
              <p className="text-[15px] sm:text-[17px] text-apple-text-secondary mt-1">
                Manage officer access, review pending approvals, and inspect chain-of-custody audit logs.
              </p>
            </div>

            <button
              onClick={fetchData}
              disabled={loading}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-apple-surface hover:bg-apple-surface-secondary border border-apple-hairline text-apple-text text-[13px] font-medium transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-apple-text-secondary ${loading ? "animate-spin" : ""}`} />
              <span>Refresh Roster</span>
            </button>
          </div>

          {/* 4 Stats Cards using CountUp from animation kit */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 mb-12 pb-10 border-b border-apple-hairline">
            <div>
              <div className="text-[44px] sm:text-[56px] font-semibold tracking-apple-tight text-apple-text leading-none mb-2">
                <CountUp to={stats.total} />
              </div>
              <div className="text-[13px] text-apple-text-secondary">
                Total Registered Users
              </div>
            </div>

            <div>
              <div className="text-[44px] sm:text-[56px] font-semibold tracking-apple-tight text-apple-orange leading-none mb-2">
                <CountUp to={stats.pending} />
              </div>
              <div className="text-[13px] text-apple-text-secondary">
                Pending Approvals
              </div>
            </div>

            <div>
              <div className="text-[44px] sm:text-[56px] font-semibold tracking-apple-tight text-apple-green leading-none mb-2">
                <CountUp to={stats.activeOfficers} />
              </div>
              <div className="text-[13px] text-apple-text-secondary">
                Active Cyber Officers
              </div>
            </div>

            <div>
              <div className="text-[44px] sm:text-[56px] font-semibold tracking-apple-tight text-apple-blue leading-none mb-2">
                <CountUp to={stats.admins} />
              </div>
              <div className="text-[13px] text-apple-text-secondary">
                State Administrators
              </div>
            </div>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center gap-2 mb-8 border-b border-apple-hairline pb-2">
            <button
              onClick={() => setActiveTab("users")}
              className={`px-4 py-2 rounded-full text-[13px] font-medium transition-colors ${
                activeTab === "users"
                  ? "bg-apple-text text-apple-bg"
                  : "text-apple-text-secondary hover:text-apple-text hover:bg-apple-surface-secondary"
              }`}
            >
              All Users ({users.length})
            </button>

            <button
              onClick={() => setActiveTab("pending")}
              className={`px-4 py-2 rounded-full text-[13px] font-medium transition-colors flex items-center gap-2 ${
                activeTab === "pending"
                  ? "bg-apple-text text-apple-bg"
                  : "text-apple-text-secondary hover:text-apple-text hover:bg-apple-surface-secondary"
              }`}
            >
              <span>Pending Approvals</span>
              {pendingUsers.length > 0 && (
                <span className="w-5 h-5 rounded-full bg-apple-orange text-white text-[11px] font-mono flex items-center justify-center">
                  {pendingUsers.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("audit")}
              className={`px-4 py-2 rounded-full text-[13px] font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === "audit"
                  ? "bg-apple-text text-apple-bg"
                  : "text-apple-text-secondary hover:text-apple-text hover:bg-apple-surface-secondary"
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>Audit Log ({auditLogs.length})</span>
            </button>
          </div>

          {/* TAB 1: ALL USERS TABLE */}
          {activeTab === "users" && (
            <div>
              {/* Search & Filters */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="relative w-full max-w-[340px]">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-apple-text-secondary" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name, email, badge, station…"
                    className="w-full pl-9 pr-4 py-2 rounded-full bg-apple-surface border border-apple-hairline text-[13px] text-apple-text placeholder:text-apple-text-secondary focus:outline-none focus:border-apple-blue"
                  />
                </div>

                <div className="flex items-center gap-3">
                  {/* Role Filter */}
                  <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="px-3 py-1.5 rounded-full bg-apple-surface border border-apple-hairline text-[12px] text-apple-text focus:outline-none focus:border-apple-blue"
                  >
                    <option value="all">All Roles</option>
                    <option value="admin">Admin</option>
                    <option value="officer">Officer</option>
                    <option value="viewer">Viewer</option>
                  </select>

                  {/* Status Filter */}
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-1.5 rounded-full bg-apple-surface border border-apple-hairline text-[12px] text-apple-text focus:outline-none focus:border-apple-blue"
                  >
                    <option value="all">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="disabled">Disabled</option>
                  </select>
                </div>
              </div>

              {/* Users Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-apple-hairline text-[12px] text-apple-text-secondary font-medium">
                      <th className="py-3 px-4 font-medium">Officer Identity</th>
                      <th className="py-3 px-4 font-medium">Role</th>
                      <th className="py-3 px-4 font-medium">Status</th>
                      <th className="py-3 px-4 font-medium hidden md:table-cell">Police Station</th>
                      <th className="py-3 px-4 font-medium hidden sm:table-cell">Last Active</th>
                      <th className="py-3 px-4 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <StaggerTBody animateKey={`${roleFilter}-${statusFilter}-${searchQuery}`}>
                    {filteredUsers.map((user) => {
                      const isSelf = user.id === currentAdmin?.id;

                      const statusColor =
                        user.status === "active"
                          ? "bg-apple-green text-apple-green"
                          : user.status === "pending"
                          ? "bg-apple-orange text-apple-orange"
                          : "bg-apple-red text-apple-red";

                      return (
                        <StaggerRow
                          key={user.id}
                          className="h-16 border-b border-apple-hairline/70 transition-colors"
                        >
                          {/* User Avatar & Name */}
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              {user.avatar_url ? (
                                <img
                                  src={user.avatar_url}
                                  alt={user.full_name || "User"}
                                  className="w-8 h-8 rounded-full object-cover border border-apple-hairline"
                                />
                              ) : (
                                <div className="w-8 h-8 rounded-full bg-apple-surface-secondary border border-apple-hairline flex items-center justify-center text-[11px] font-semibold text-apple-text">
                                  {(user.full_name || "OF")
                                    .split(" ")
                                    .map((p) => p[0])
                                    .slice(0, 2)
                                    .join("")
                                    .toUpperCase()}
                                </div>
                              )}

                              <div>
                                <div className="text-[14px] font-medium text-apple-text flex items-center gap-1.5">
                                  <span>{user.full_name || "Officer"}</span>
                                  {isSelf && (
                                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-apple-blue/15 text-apple-blue">
                                      You
                                    </span>
                                  )}
                                </div>
                                <div className="text-[12px] text-apple-text-secondary font-mono">
                                  {user.email}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Role Dropdown */}
                          <td className="py-3 px-4">
                            {isSelf ? (
                              <span className="text-[12px] font-mono uppercase text-apple-blue font-semibold">
                                {user.role}
                              </span>
                            ) : (
                              <select
                                value={user.role}
                                onChange={(e) => {
                                  const newRole = e.target.value as UserRole;
                                  setConfirmDialog({
                                    isOpen: true,
                                    user,
                                    actionType: "role",
                                    newRole,
                                    newStatus: user.status,
                                  });
                                }}
                                className="px-2.5 py-1 rounded-lg bg-apple-surface-secondary border border-apple-hairline text-[12px] font-mono uppercase text-apple-text focus:outline-none focus:border-apple-blue"
                              >
                                <option value="admin">Admin</option>
                                <option value="officer">Officer</option>
                                <option value="viewer">Viewer</option>
                              </select>
                            )}
                          </td>

                          {/* Status Dot */}
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-1.5 text-[13px] capitalize">
                              <span className={`w-2 h-2 rounded-full ${statusColor.split(" ")[0]}`} />
                              <span>{user.status}</span>
                            </div>
                          </td>

                          {/* Station */}
                          <td className="py-3 px-4 hidden md:table-cell text-[13px] text-apple-text-secondary max-w-[240px] truncate">
                            {user.station || "Unassigned"}
                          </td>

                          {/* Last Active */}
                          <td className="py-3 px-4 hidden sm:table-cell text-[12px] text-apple-text-secondary">
                            {user.last_active ? user.last_active.slice(0, 16) : "Unknown"}
                          </td>

                          {/* Actions: Enable / Disable */}
                          <td className="py-3 px-4 text-right">
                            {isSelf ? (
                              <span className="text-[11px] text-apple-text-tertiary">
                                Immutable
                              </span>
                            ) : user.status === "disabled" ? (
                              <button
                                onClick={() => handleUpdateUserStatus(user, user.role, "active")}
                                className="text-[12px] text-apple-green hover:underline font-medium"
                              >
                                Enable Access
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  setConfirmDialog({
                                    isOpen: true,
                                    user,
                                    actionType: "status",
                                    newRole: user.role,
                                    newStatus: "disabled",
                                  });
                                }}
                                className="text-[12px] text-apple-red hover:underline font-medium"
                              >
                                Disable Access
                              </button>
                            )}
                          </td>
                        </StaggerRow>
                      );
                    })}
                  </StaggerTBody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: PENDING APPROVALS QUEUE */}
          {activeTab === "pending" && (
            <div className="space-y-6">
              {pendingUsers.length === 0 ? (
                <div className="py-16 text-center text-apple-text-secondary">
                  <CheckCircle2 className="w-10 h-10 text-apple-green mx-auto mb-3" strokeWidth={1.5} />
                  <h3 className="text-[18px] font-semibold text-apple-text mb-1">
                    No pending approval requests
                  </h3>
                  <p className="text-[14px]">
                    All incoming officer accounts have been reviewed and approved.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingUsers.map((pendingUser) => (
                    <div
                      key={pendingUser.id}
                      className="p-6 rounded-2xl bg-apple-surface border border-apple-hairline shadow-apple-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-6"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-apple-surface-secondary border border-apple-hairline flex items-center justify-center text-[14px] font-semibold text-apple-text shrink-0">
                          {(pendingUser.full_name || "OF")
                            .split(" ")
                            .map((p) => p[0])
                            .slice(0, 2)
                            .join("")
                            .toUpperCase()}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-[16px] font-semibold text-apple-text">
                              {pendingUser.full_name || "New Officer"}
                            </h4>
                            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-apple-orange/15 text-apple-orange font-semibold">
                              Pending Approval
                            </span>
                          </div>

                          <div className="text-[13px] text-apple-text-secondary mt-1 font-mono">
                            {pendingUser.email}
                          </div>

                          <div className="text-[12px] text-apple-text-secondary mt-1 flex flex-wrap gap-x-4 gap-y-1">
                            <span>Badge: {pendingUser.badge_no || "Awaiting assignment"}</span>
                            <span>Station: {pendingUser.station || "State Cyber Cell"}</span>
                          </div>
                        </div>
                      </div>

                      {/* Approve / Reject buttons */}
                      <div className="flex items-center gap-3 shrink-0">
                        <button
                          onClick={() => handleUpdateUserStatus(pendingUser, "officer", "active")}
                          className="px-5 py-2 rounded-full bg-apple-blue hover:bg-apple-blue-hover text-white text-[13px] font-medium transition-all shadow-apple-subtle flex items-center gap-1.5"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Approve (Officer)</span>
                        </button>

                        <button
                          onClick={() => handleUpdateUserStatus(pendingUser, "viewer", "disabled")}
                          className="px-4 py-2 rounded-full bg-apple-surface-secondary hover:bg-apple-surface-tertiary text-apple-red text-[13px] font-medium transition-colors flex items-center gap-1.5"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Reject</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: AUDIT LOG */}
          {activeTab === "audit" && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-apple-hairline text-[12px] text-apple-text-secondary font-medium">
                    <th className="py-3 px-4 font-medium">Timestamp</th>
                    <th className="py-3 px-4 font-medium">Administrator</th>
                    <th className="py-3 px-4 font-medium">Action</th>
                    <th className="py-3 px-4 font-medium">Target Account</th>
                    <th className="py-3 px-4 font-medium">Audit Record</th>
                  </tr>
                </thead>
                <StaggerTBody animateKey="audit">
                  {auditLogs.map((log) => (
                    <StaggerRow
                      key={log.id}
                      className="h-14 border-b border-apple-hairline/70 transition-colors"
                    >
                      <td className="py-3 px-4 text-[12px] text-apple-text-secondary whitespace-nowrap">
                        {log.created_at}
                      </td>
                      <td className="py-3 px-4 text-[13px] font-medium text-apple-text">
                        {log.actor_name || log.actor_id}
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-apple-surface-secondary text-apple-blue border border-apple-hairline">
                          {log.action}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-[13px] font-mono text-apple-text">
                        {log.target_email || log.target_id || "System"}
                      </td>
                      <td className="py-3 px-4 text-[12px] text-apple-text-secondary font-mono truncate max-w-[280px]">
                        {JSON.stringify(log.details || {})}
                      </td>
                    </StaggerRow>
                  ))}
                </StaggerTBody>
              </table>
            </div>
          )}

          {/* CONFIRM DIALOG MODAL */}
          {confirmDialog.isOpen && confirmDialog.user && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
              <div
                className="absolute inset-0"
                onClick={() => setConfirmDialog({ isOpen: false, user: null, actionType: "role" })}
              />
              <div className="relative w-full max-w-[380px] rounded-3xl apple-vibrancy border border-apple-hairline p-7 shadow-apple-modal z-10 text-center">
                <div className="w-12 h-12 rounded-full bg-apple-surface-secondary border border-apple-hairline mx-auto flex items-center justify-center mb-4 text-apple-orange">
                  <AlertTriangle className="w-6 h-6 text-apple-orange" strokeWidth={1.5} />
                </div>

                <h3 className="text-[19px] font-semibold text-apple-text mb-2">
                  Confirm Account Modification
                </h3>

                <p className="text-[13px] text-apple-text-secondary leading-relaxed mb-6">
                  Are you sure you want to change{" "}
                  <strong className="text-apple-text font-semibold">
                    {confirmDialog.user.full_name || confirmDialog.user.email}
                  </strong>{" "}
                  to{" "}
                  <strong className="text-apple-text font-semibold uppercase">
                    {confirmDialog.actionType === "role"
                      ? confirmDialog.newRole
                      : confirmDialog.newStatus}
                  </strong>
                  ?
                </p>

                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() =>
                      setConfirmDialog({ isOpen: false, user: null, actionType: "role" })
                    }
                    className="px-5 py-2.5 rounded-full bg-apple-surface-secondary hover:bg-apple-surface-tertiary text-apple-text text-[13px] font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (confirmDialog.user && confirmDialog.newRole && confirmDialog.newStatus) {
                        handleUpdateUserStatus(
                          confirmDialog.user,
                          confirmDialog.newRole,
                          confirmDialog.newStatus
                        );
                      }
                      setConfirmDialog({ isOpen: false, user: null, actionType: "role" });
                    }}
                    className="px-5 py-2.5 rounded-full bg-apple-blue hover:bg-apple-blue-hover text-white text-[13px] font-medium transition-colors shadow-apple-subtle"
                  >
                    Confirm Change
                  </button>
                </div>
              </div>
            </div>
          )}
        </Page>
      </RoleGate>
    </ProtectedRoute>
  );
}
