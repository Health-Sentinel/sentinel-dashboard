"use client";

import { useEffect, useState } from "react";
import { Activity, AlertOctagon, Building2, CheckCircle2, Clock, FileWarning, ShieldAlert } from "lucide-react";
import { MetricCard } from "@/components/MetricCard";
import { StatusBadge } from "@/components/StatusBadge";
import { api } from "@/lib/api";
import { CaseRecord, Disease } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export default function DashboardOverview() {
  const [cases, setCases] = useState<CaseRecord[]>([]);
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [casesData, diseasesData] = await Promise.all([
          api.getCases(),
          api.getDiseases(),
        ]);
        setCases(casesData);
        setDiseases(diseasesData);
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const suspectedCount = cases.filter((c) => c.classification === "SUSPECTED").length;
  const probableCount = cases.filter((c) => c.classification === "PROBABLE").length;
  const confirmedCount = cases.filter((c) => c.classification === "CONFIRMED").length;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 tracking-wider uppercase mb-1">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          Real-Time Epidemiological Intelligence
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Public Health Operations Command</h1>
        <p className="text-xs text-slate-400 mt-1">
          Surveillance monitoring across 36 Nigerian States + FCT • Pilot Archetypes: Malaria, Cholera & ARI
        </p>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard
          title="Suspected Cases"
          value={loading ? "..." : suspectedCount}
          subtitle="Awaiting laboratory or RDT confirmation"
          icon={FileWarning}
          variant="rose"
        />
        <MetricCard
          title="Probable Clusters"
          value={loading ? "..." : probableCount}
          subtitle="Epidemiologically linked to active threat"
          icon={AlertOctagon}
          variant="amber"
        />
        <MetricCard
          title="Confirmed Cases"
          value={loading ? "..." : confirmedCount}
          subtitle="Verified via RDT, PCR or culture"
          icon={CheckCircle2}
          variant="emerald"
        />
        <MetricCard
          title="Pilot Pathogens"
          value={loading ? "..." : diseases.length || 3}
          subtitle="In-scope Phase 0 active ontologies"
          icon={Activity}
          variant="default"
        />
      </div>

      {/* Pathogen Pilot Archetype Cards */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-slate-200 tracking-wide uppercase">Pilot Surveillance Scope</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400">VECTOR-BORNE</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">ICD-11: 1F40</span>
            </div>
            <h3 className="text-base font-bold text-white">Malaria (P. falciparum)</h3>
            <p className="text-xs text-slate-400">
              Correlated with cumulative rainfall &gt;80mm, temperature 22–31°C, and relative humidity &ge;65%. Confirmed via Pf HRP-2 / pLDH RDT.
            </p>
            <div className="pt-2 border-t border-slate-800 flex justify-between text-[11px] text-slate-500 font-mono">
              <span>Incubation: 9–14d</span>
              <span>Lead Time: 14–28d</span>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-sky-400">WATERBORNE</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">ICD-11: 1A00</span>
            </div>
            <h3 className="text-base font-bold text-white">Cholera (V. cholerae)</h3>
            <p className="text-xs text-slate-400">
              Explosive transmission linked to water turbidity &gt;25 NTU, water pH &ge;7.5, and flash flooding. Screened via Crystal VC dipstick.
            </p>
            <div className="pt-2 border-t border-slate-800 flex justify-between text-[11px] text-slate-500 font-mono">
              <span>Incubation: 2h–5d</span>
              <span>Lead Time: 2–5d</span>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-400">AIRBORNE / DROPLET</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">ICD-11: CA40</span>
            </div>
            <h3 className="text-base font-bold text-white">Acute Respiratory Infection (ARI)</h3>
            <p className="text-xs text-slate-400">
              Seasonal surge driven by Harmattan dust PM2.5 &gt;75µg/m³, sudden temperature drops, and acoustic cough bout frequency spikes.
            </p>
            <div className="pt-2 border-t border-slate-800 flex justify-between text-[11px] text-slate-500 font-mono">
              <span>Incubation: 1–10d</span>
              <span>Lead Time: 3–7d</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Surveillance Cases Table */}
      <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-slate-200 uppercase tracking-wide">Live Surveillance Feed</h2>
            <p className="text-xs text-slate-500">Chronological stream of incoming cases across sentinel health facilities</p>
          </div>
          <a href="/cases" className="text-xs text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
            View All Cases &rarr;
          </a>
        </div>

        {loading ? (
          <p className="text-xs text-slate-500 py-6 text-center">Loading surveillance feed...</p>
        ) : cases.length === 0 ? (
          <div className="py-8 text-center border border-dashed border-slate-800 rounded-lg">
            <Clock className="w-6 h-6 text-slate-600 mx-auto mb-2" />
            <p className="text-xs text-slate-400">No active surveillance cases recorded in current window.</p>
            <p className="text-[11px] text-slate-600 mt-1">Use the Case Surveillance view to log suspect cases.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-800 text-slate-400 font-medium">
                <tr>
                  <th className="pb-3 font-medium">Case ID</th>
                  <th className="pb-3 font-medium">Classification</th>
                  <th className="pb-3 font-medium">Severity</th>
                  <th className="pb-3 font-medium">Lifecycle Status</th>
                  <th className="pb-3 font-medium">Logged Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {cases.slice(0, 5).map((c) => (
                  <tr key={c.case_id} className="hover:bg-slate-800/40">
                    <td className="py-3 font-mono text-[11px] text-slate-400">{c.case_id.slice(0, 8)}...</td>
                    <td className="py-3"><StatusBadge status={c.classification} /></td>
                    <td className="py-3"><StatusBadge status={c.clinical_severity} /></td>
                    <td className="py-3"><StatusBadge status={c.case_status} /></td>
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
