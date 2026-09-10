"use client";

import { useEffect, useState } from "react";
import { KeyRound, ShieldAlert, UserCheck, Users } from "lucide-react";
import { api } from "@/lib/api";
import { User } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUsers() {
      try {
        const data = await api.getUsers();
        setUsers(data);
      } catch (err) {
        console.error("Failed to load users:", err);
      } finally {
        setLoading(false);
      }
    }
    loadUsers();
  }, []);

  const getRoleStyle = (role: string) => {
    switch (role) {
      case "SYSTEM_ADMIN":
        return "bg-emerald-950 text-emerald-400 border-emerald-800";
      case "EPIDEMIOLOGIST":
        return "bg-sky-950 text-sky-400 border-sky-800";
      case "SURVEILLANCE_OFFICER":
        return "bg-amber-950 text-amber-400 border-amber-800";
      default:
        return "bg-purple-950 text-purple-400 border-purple-800";
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 tracking-wider uppercase mb-1">
          <Users className="w-3.5 h-3.5" />
          Access Governance & Security
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">User Accounts & Role-Based Access Control</h1>
        <p className="text-xs text-slate-400 mt-1">
          Cryptographically authenticated surveillance personnel categorized across 4 administrative tiers
        </p>
      </div>

      <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
        {loading ? (
          <p className="text-xs text-slate-500 py-8 text-center">Loading user directory...</p>
        ) : users.length === 0 ? (
          <div className="py-12 text-center border border-dashed border-slate-800 rounded-lg text-slate-500 text-xs">
            No users loaded. Note: Viewing all users requires SYSTEM_ADMIN authorization.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-800 text-slate-400">
                <tr>
                  <th className="pb-3 font-medium">User Full Name</th>
                  <th className="pb-3 font-medium">Official Email</th>
                  <th className="pb-3 font-medium">Assigned Role</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Enrolled Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {users.map((u) => (
                  <tr key={u.user_id} className="hover:bg-slate-800/40">
                    <td className="py-3 font-semibold text-white flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] text-slate-300">
                        {u.full_name[0]}
                      </div>
                      {u.full_name}
                    </td>
                    <td className="py-3 font-mono text-slate-400 text-[11px]">{u.email}</td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wider border ${getRoleStyle(u.role)}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3">
                      {u.is_active ? (
                        <span className="inline-flex items-center gap-1 text-emerald-400 text-[11px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Active
                        </span>
                      ) : (
                        <span className="text-slate-600 text-[11px]">Suspended</span>
                      )}
                    </td>
                    <td className="py-3 text-slate-500 font-mono text-[11px]">{formatDate(u.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
