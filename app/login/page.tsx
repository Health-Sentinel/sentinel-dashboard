"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, ShieldAlert, UserCheck } from "lucide-react";
import { api } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await api.login(email, password);
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Failed to authenticate");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickRole = (rEmail: string, rPass: string) => {
    setEmail(rEmail);
    setPassword(rPass);
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center max-w-md mx-auto">
      <div className="w-full bg-slate-900/80 border border-slate-800 rounded-2xl p-8 shadow-2xl backdrop-blur">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-400">
            <ShieldAlert className="w-7 h-7" />
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-xl font-bold text-white tracking-tight">Sentinel Health Intelligence</h1>
          <p className="text-xs text-slate-400 mt-1">Authorized Public Health Operations Sign-In</p>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-lg bg-rose-950/40 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Government / Official Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="officer@sentinel.health.gov.ng"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Secure Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-semibold rounded-lg shadow-lg shadow-emerald-950/50 transition-colors flex items-center justify-center gap-2"
          >
            {loading ? "Authenticating..." : "Access Operations Console"}
          </button>
        </form>

        {/* Quick Credentials Sandbox */}
        <div className="mt-8 pt-6 border-t border-slate-800/80">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider text-center mb-3">
            Pilot Test Roles (Pre-Seeded)
          </p>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <button
              onClick={() => handleQuickRole("admin@sentinel.health.gov.ng", "SentinelAdmin2026!")}
              className="p-2 rounded bg-slate-950 border border-slate-800 text-slate-300 hover:border-slate-700 text-left transition-colors"
            >
              <span className="font-semibold text-emerald-400 block">System Admin</span>
              <span className="text-[9px] text-slate-500">Full System Control</span>
            </button>
            <button
              onClick={() => handleQuickRole("epidemiologist@sentinel.health.gov.ng", "SentinelEpi2026!")}
              className="p-2 rounded bg-slate-950 border border-slate-800 text-slate-300 hover:border-slate-700 text-left transition-colors"
            >
              <span className="font-semibold text-sky-400 block">Epidemiologist</span>
              <span className="text-[9px] text-slate-500">Disease Modeling</span>
            </button>
            <button
              onClick={() => handleQuickRole("dsno.kano@sentinel.health.gov.ng", "SentinelDsno2026!")}
              className="p-2 rounded bg-slate-950 border border-slate-800 text-slate-300 hover:border-slate-700 text-left transition-colors"
            >
              <span className="font-semibold text-amber-400 block">DSNO Officer</span>
              <span className="text-[9px] text-slate-500">Kano Field Ops</span>
            </button>
            <button
              onClick={() => handleQuickRole("worker.phc@sentinel.health.gov.ng", "SentinelWorker2026!")}
              className="p-2 rounded bg-slate-950 border border-slate-800 text-slate-300 hover:border-slate-700 text-left transition-colors"
            >
              <span className="font-semibold text-purple-400 block">Facility Worker</span>
              <span className="text-[9px] text-slate-500">Clinic Case Intake</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
