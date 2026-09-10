"use client";

import { useEffect, useState } from "react";
import { Globe, MapPin, Navigation, Layers } from "lucide-react";
import { api } from "@/lib/api";
import { Location } from "@/lib/types";

export default function LocationsPage() {
  const [states, setStates] = useState<Location[]>([]);
  const [selectedState, setSelectedState] = useState<Location | null>(null);
  const [lgas, setLgas] = useState<Location[]>([]);
  const [loadingStates, setLoadingStates] = useState(true);
  const [loadingLgas, setLoadingLgas] = useState(false);

  useEffect(() => {
    async function loadStates() {
      try {
        const data = await api.getStates();
        setStates(data);
        if (data.length > 0) {
          setSelectedState(data[0]);
        }
      } catch (err) {
        console.error("Failed to load states:", err);
      } finally {
        setLoadingStates(false);
      }
    }
    loadStates();
  }, []);

  useEffect(() => {
    if (!selectedState?.state_code) return;
    async function loadLgas() {
      setLoadingLgas(true);
      try {
        const data = await api.getLgasForState(selectedState!.state_code!);
        setLgas(data);
      } catch (err) {
        console.error("Failed to load LGAs:", err);
      } finally {
        setLoadingLgas(false);
      }
    }
    loadLgas();
  }, [selectedState]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 tracking-wider uppercase mb-1">
          <Globe className="w-3.5 h-3.5" />
          Spatial & Demographic Foundation
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Nigerian Administrative Hierarchy</h1>
        <p className="text-xs text-slate-400 mt-1">
          Admin 0 (National) &rarr; Admin 1 (36 States + FCT) &rarr; Admin 2 (774 LGAs) &rarr; Uber H3 Spatial Index
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* States List (Admin 1) */}
        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wide flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400" />
              States & Territories (Admin 1)
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
              {states.length} Total
            </span>
          </div>

          {loadingStates ? (
            <p className="text-xs text-slate-500 py-4 text-center">Loading states...</p>
          ) : (
            <div className="space-y-1.5 max-h-[600px] overflow-y-auto pr-1">
              {states.map((s) => {
                const isSelected = selectedState?.location_id === s.location_id;
                return (
                  <button
                    key={s.location_id}
                    onClick={() => setSelectedState(s)}
                    className={`w-full p-2.5 rounded-lg text-left text-xs transition-colors flex items-center justify-between ${
                      isSelected
                        ? "bg-emerald-600/15 border border-emerald-500/30 text-emerald-300 font-semibold"
                        : "bg-slate-950/40 border border-slate-800/60 text-slate-300 hover:border-slate-700"
                    }`}
                  >
                    <span>{s.state_name}</span>
                    <span className="text-[10px] font-mono text-slate-500">{s.state_code}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Selected State & LGAs (Admin 2) */}
        <div className="md:col-span-2 space-y-6">
          {selectedState && (
            <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">
                    Selected Administrative Territory
                  </span>
                  <h2 className="text-xl font-bold text-white mt-0.5">{selectedState.state_name} State</h2>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">ISO 3166-2: {selectedState.state_code}</p>
                </div>
                <div className="text-right text-xs font-mono text-slate-400">
                  <p>Lat: {selectedState.centroid_lat?.toFixed(4)}°N</p>
                  <p>Lon: {selectedState.centroid_lon?.toFixed(4)}°E</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-800 text-xs">
                <div className="p-3 rounded-lg bg-slate-950/50 border border-slate-800/80">
                  <span className="text-slate-500 block text-[10px]">Spatial Grid</span>
                  <span className="font-semibold text-slate-200">Uber H3 Res 8</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-950/50 border border-slate-800/80">
                  <span className="text-slate-500 block text-[10px]">Admin Tier</span>
                  <span className="font-semibold text-slate-200">ADMIN_1</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-950/50 border border-slate-800/80">
                  <span className="text-slate-500 block text-[10px]">Pilot Status</span>
                  <span className="font-semibold text-emerald-400">Active Node</span>
                </div>
              </div>
            </div>
          )}

          {/* LGAs Grid */}
          <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wide flex items-center gap-2">
                  <Layers className="w-4 h-4 text-emerald-400" />
                  Local Government Areas (Admin 2)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Sub-districts within {selectedState?.state_name || "selected state"}
                </p>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                {lgas.length} Registered
              </span>
            </div>

            {loadingLgas ? (
              <p className="text-xs text-slate-500 py-6 text-center">Loading LGAs...</p>
            ) : lgas.length === 0 ? (
              <div className="py-8 text-center border border-dashed border-slate-800 rounded-lg text-slate-500 text-xs">
                No LGAs currently mapped in pilot slice for this state.
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {lgas.map((lga) => (
                  <div
                    key={lga.location_id}
                    className="p-3 rounded-lg bg-slate-950/50 border border-slate-800/80 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-slate-200">{lga.lga_name}</span>
                      <Navigation className="w-3 h-3 text-slate-600" />
                    </div>
                    <div className="text-[10px] font-mono text-slate-500">
                      {lga.centroid_lat?.toFixed(3)}°N, {lga.centroid_lon?.toFixed(3)}°E
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
