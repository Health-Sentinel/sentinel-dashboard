import { CaseClassification, CaseStatus, ClinicalSeverity } from "@/lib/types";

interface StatusBadgeProps {
  status: CaseClassification | CaseStatus | ClinicalSeverity | string;
  type?: "classification" | "status" | "severity";
}

export function StatusBadge({ status, type = "classification" }: StatusBadgeProps) {
  let style = "bg-slate-800 text-slate-300 border-slate-700";

  if (status === "CONFIRMED" || status === "RECOVERED") {
    style = "bg-emerald-950/60 text-emerald-400 border-emerald-800/60";
  } else if (status === "PROBABLE" || status === "MODERATE") {
    style = "bg-amber-950/60 text-amber-400 border-amber-800/60";
  } else if (status === "SUSPECTED" || status === "ACTIVE" || status === "SEVERE" || status === "CRITICAL" || status === "DECEASED") {
    style = "bg-rose-950/60 text-rose-400 border-rose-800/60";
  } else if (status === "DISCARDED") {
    style = "bg-slate-800/60 text-slate-400 border-slate-700/60";
  }

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider border ${style}`}>
      {status}
    </span>
  );
}
