"use client";

import { useEffect, useState } from "react";
import { FileText, Filter, RefreshCw, Search } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import { api } from "@/lib/api";
import { CaseRecord, Disease } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export default function CasesPage() {
  const [cases, setCases] = useState<CaseRecord[]>([]);
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [selectedDisease, setSelectedDisease] = useState<string>("");
  const [loading, setLoading] = useState(true);

  async function loadData() {
    setLoading(true);
    try {
      const [casesData, diseasesData] = await Promise.all([
        api.getCases(selectedDisease || undefined),
        api.getDiseases(),
      ]);
      setCases(casesData);
      setDiseases(diseasesData);
    } catch (err) {
      console.error("Failed to load cases:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, [selectedDisease]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 tracking-wider uppercase mb-1">
            <FileText className="w-3.5 h-3.5" />
            Epidemiological Surveillance Engine
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Case Records & State Machine</h1>
          <p className="text-xs text-slate-400 mt-1">
            Suspected &rarr; Probable &rarr; Confirmed &rarr; Discarded epidemiological case lifecycle
          </p>
        </div>

        <button
          onClick={loadData}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Refresh
        </button>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <Filter className="w-4 h-4 text-slate-500" />
          <select
            value={selectedDisease}
            onChange={(e) => setSelectedDisease(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-emerald-500"
          >
            <option value="">All Pathogens (Malaria, Cholera, ARI)</option>
            {diseases.map((d) => (
              <option key={d.disease_id} value={d.disease_id}>
                {d.common_name} ({d.scientific_name})
              </option>
            ))}
          </select>
        </div>
        <span className="text-xs font-mono text-slate-400">
          Total Cases: <strong className="text-white">{cases.length}</strong>
        </span>
      </div>

      {/* Cases Table */}
      <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
        {loading ? (
          <p className="text-xs text-slate-500 py-8 text-center">Loading surveillance case records...</p>
        ) : cases.length === 0 ? (
          <div className="py-12 text-center border border-dashed border-slate-800 rounded-lg text-slate-500 text-xs">
            No surveillance cases found matching criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-800 text-slate-400">
                <tr>
                  <th className="pb-3 font-medium">Case ID</th>
                  <th className="pb-3 font-medium">Classification</th>
                  <th className="pb-3 font-medium">Severity</th>
                  <th className="pb-3 font-medium">Trajectory</th>
                  <th className="pb-3 font-medium">Symptom Onset</th>
                  <th className="pb-3 font-medium">Confirmed At</th>
                  <th className="pb-3 font-medium">Logged</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {cases.map((c) => (
                  <tr key={c.case_id} className="hover:bg-slate-800/40">
                    <td className="py-3 font-mono text-[11px] text-emerald-400">{c.case_id.slice(0, 8)}...</td>
                    <td className="py-3"><StatusBadge status={c.classification} /></td>
                    <td className="py-3"><StatusBadge status={c.clinical_severity} /></td>
                    <td className="py-3"><StatusBadge status={c.case_status} /></td>
                    <td className="py-3 text-slate-400 font-mono text-[11px]">{formatDate(c.symptom_onset_date)}</td>
                    <td className="py-3 text-slate-400 font-mono text-[11px]">
                      {c.confirmation_date ? (
                        <span className="text-emerald-400">{formatDate(c.confirmation_date)}</span>
                      ) : (
                        <span className="text-slate-600">Pending</span>
                      )}
                    </td>
                    <td className="py-3 text-slate-500 font-mono text-[11px]">{formatDate(c.created_at)}</td>
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
