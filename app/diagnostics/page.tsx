"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Eye, FlaskConical, ShieldCheck, XCircle } from "lucide-react";
import { api } from "@/lib/api";
import { DiagnosticTest } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export default function DiagnosticsPage() {
  const [tests, setTests] = useState<DiagnosticTest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTests() {
      try {
        const data = await api.getTests();
        setTests(data);
      } catch (err) {
        console.error("Failed to load diagnostic tests:", err);
      } finally {
        setLoading(false);
      }
    }
    loadTests();
  }, []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 tracking-wider uppercase mb-1">
          <FlaskConical className="w-3.5 h-3.5" />
          Point-of-Care & Laboratory Validation
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Diagnostic Assays & Edge-CV Telemetry</h1>
        <p className="text-xs text-slate-400 mt-1">
          Lateral flow RDT cassette readings, computer-vision line intensity profiles, and molecular assays
        </p>
      </div>

      <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
        {loading ? (
          <p className="text-xs text-slate-500 py-8 text-center">Loading diagnostic assays...</p>
        ) : tests.length === 0 ? (
          <div className="py-12 text-center border border-dashed border-slate-800 rounded-lg text-slate-500 text-xs">
            No diagnostic tests recorded yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-800 text-slate-400">
                <tr>
                  <th className="pb-3 font-medium">Test ID</th>
                  <th className="pb-3 font-medium">Technology</th>
                  <th className="pb-3 font-medium">Sample</th>
                  <th className="pb-3 font-medium">Kit / Lot</th>
                  <th className="pb-3 font-medium">Result</th>
                  <th className="pb-3 font-medium">CV Signal / Noise</th>
                  <th className="pb-3 font-medium">Verified</th>
                  <th className="pb-3 font-medium">Recorded</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {tests.map((t) => (
                  <tr key={t.test_id} className="hover:bg-slate-800/40">
                    <td className="py-3 font-mono text-[11px] text-emerald-400">{t.test_id.slice(0, 8)}...</td>
                    <td className="py-3 font-medium text-white">{t.technology}</td>
                    <td className="py-3 text-slate-400">{t.sample_type}</td>
                    <td className="py-3 text-slate-400 text-[11px]">{t.kit_manufacturer || "Standard"}</td>
                    <td className="py-3">
                      {t.status === "POSITIVE" ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-800 text-[10px] font-bold">
                          <XCircle className="w-3 h-3" /> POSITIVE
                        </span>
                      ) : t.status === "NEGATIVE" ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold">
                          <CheckCircle2 className="w-3 h-3" /> NEGATIVE
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px]">
                          {t.status}
                        </span>
                      )}
                    </td>
                    <td className="py-3 font-mono text-[11px]">
                      {t.signal_to_noise_ratio ? (
                        <span className="text-slate-300">SNR: {t.signal_to_noise_ratio.toFixed(1)}</span>
                      ) : (
                        <span className="text-slate-600">—</span>
                      )}
                    </td>
                    <td className="py-3">
                      {t.verified_by_human ? (
                        <span className="inline-flex items-center gap-1 text-emerald-400 text-[11px]">
                          <ShieldCheck className="w-3.5 h-3.5" /> Clinician
                        </span>
                      ) : (
                        <span className="text-slate-500 text-[11px]">Automated CV</span>
                      )}
                    </td>
                    <td className="py-3 text-slate-500 font-mono text-[11px]">{formatDate(t.created_at)}</td>
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
