"use client";

import { useEffect, useState } from "react";
import { Activity, Bug, Droplets, Wind, ShieldCheck } from "lucide-react";
import { api } from "@/lib/api";
import { Disease } from "@/lib/types";

export default function DiseasesPage() {
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDiseases() {
      try {
        const data = await api.getDiseases();
        setDiseases(data);
      } catch (err) {
        console.error("Failed to load diseases:", err);
      } finally {
        setLoading(false);
      }
    }
    loadDiseases();
  }, []);

  const getIcon = (type: string) => {
    if (type === "VECTOR_BORNE") return Bug;
    if (type === "WATERBORNE") return Droplets;
    return Wind;
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 tracking-wider uppercase mb-1">
          <Activity className="w-3.5 h-3.5" />
          Epidemiological Disease Ontology
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Pathogen Surveillance Catalog</h1>
        <p className="text-xs text-slate-400 mt-1">
          Biological transmission kinetics, incubation windows, and ICD-11 classifications for Phase 0 pilot diseases
        </p>
      </div>

      {loading ? (
        <p className="text-xs text-slate-500 py-8 text-center">Loading pathogen catalog...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {diseases.map((d) => {
            const IconComponent = getIcon(d.transmission_type);
            return (
              <div key={d.disease_id} className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-lg bg-slate-800 text-emerald-400">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                      ICD-11: {d.icd11_code}
                    </span>
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-white tracking-tight">{d.common_name}</h2>
                    <p className="text-xs text-slate-400 italic font-serif">{d.scientific_name}</p>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Transmission Mode:</span>
                      <span className="font-semibold text-slate-200">{d.transmission_type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Incubation Window:</span>
                      <span className="font-semibold text-slate-200">{d.incubation_min_days} – {d.incubation_max_days} days</span>
                    </div>
                    {d.serial_interval_days && (
                      <div className="flex justify-between">
                        <span className="text-slate-500">Serial Interval:</span>
                        <span className="font-semibold text-slate-200">{d.serial_interval_days} days</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Active Surveillance
                  </span>
                  <span className="font-mono text-[10px]">{d.disease_id.slice(0, 8)}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
