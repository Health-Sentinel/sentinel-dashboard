"use client";

import { useEffect, useState } from "react";
import { Building2, Plus, Radio, Shield } from "lucide-react";
import { api } from "@/lib/api";
import { Facility } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export default function FacilitiesPage() {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFacilities() {
      try {
        const data = await api.getFacilities();
        setFacilities(data);
      } catch (err) {
        console.error("Failed to load facilities:", err);
      } finally {
        setLoading(false);
      }
    }
    loadFacilities();
  }, []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 tracking-wider uppercase mb-1">
            <Building2 className="w-3.5 h-3.5" />
            Healthcare Delivery Infrastructure
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Health Facilities & Sentinel Posts</h1>
          <p className="text-xs text-slate-400 mt-1">
            Primary Health Care Centers (PHCs), General Hospitals, and Environmental Sentinel Stations
          </p>
        </div>
      </div>

      <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
        {loading ? (
          <p className="text-xs text-slate-500 py-8 text-center">Loading facilities directory...</p>
        ) : facilities.length === 0 ? (
          <div className="py-12 text-center border border-dashed border-slate-800 rounded-lg">
            <Building2 className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-xs text-slate-300 font-medium">No Health Facilities Registered Yet</p>
            <p className="text-[11px] text-slate-500 mt-1 max-w-sm mx-auto">
              Facilities will be populated during state-level rollouts or can be registered via API.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-800 text-slate-400">
                <tr>
                  <th className="pb-3 font-medium">Facility Name</th>
                  <th className="pb-3 font-medium">Type</th>
                  <th className="pb-3 font-medium">Sentinel Node</th>
                  <th className="pb-3 font-medium">Bed Capacity</th>
                  <th className="pb-3 font-medium">Registered</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {facilities.map((f) => (
                  <tr key={f.facility_id} className="hover:bg-slate-800/40">
                    <td className="py-3 font-semibold text-white">{f.name}</td>
                    <td className="py-3 text-slate-400">{f.facility_type}</td>
                    <td className="py-3">
                      {f.is_sentinel_site ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-semibold">
                          <Radio className="w-3 h-3" /> Sentinel Active
                        </span>
                      ) : (
                        <span className="text-slate-500 text-[10px]">Standard PHC</span>
                      )}
                    </td>
                    <td className="py-3 font-mono">{f.bed_capacity} beds</td>
                    <td className="py-3 text-slate-500 font-mono text-[11px]">{formatDate(f.created_at)}</td>
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
