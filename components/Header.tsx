"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, User as UserIcon } from "lucide-react";
import { api } from "@/lib/api";
import { AuthSession } from "@/lib/types";

export function Header() {
  const router = useRouter();
  const [user, setUser] = useState<AuthSession | null>(null);

  useEffect(() => {
    setUser(api.getCurrentUser());
  }, []);

  const handleLogout = () => {
    api.logout();
    router.push("/login");
  };

  return (
    <header className="h-16 bg-slate-900/80 backdrop-blur border-b border-slate-800 flex items-center justify-between px-8 sticky top-0 z-10 ml-64">
      <div className="flex items-center gap-3">
        <span className="text-xs font-medium px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
          Federal Republic of Nigeria
        </span>
        <span className="text-xs text-slate-500 font-mono">Surveillance Epoch: 2026-W37</span>
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs font-semibold text-slate-200">{user.full_name}</p>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                {user.role}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <a
            href="/login"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition-colors"
          >
            <UserIcon className="w-3.5 h-3.5" />
            Sign In
          </a>
        )}
      </div>
    </header>
  );
}
