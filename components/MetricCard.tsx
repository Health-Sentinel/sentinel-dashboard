import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  variant?: "default" | "emerald" | "amber" | "rose";
}

export function MetricCard({ title, value, subtitle, icon: Icon, variant = "default" }: MetricCardProps) {
  const variantStyles = {
    default: "border-slate-800 bg-slate-900/60 text-slate-400",
    emerald: "border-emerald-900/50 bg-emerald-950/20 text-emerald-400",
    amber: "border-amber-900/50 bg-amber-950/20 text-amber-400",
    rose: "border-rose-900/50 bg-rose-950/20 text-rose-400",
  };

  return (
    <div className={`p-5 rounded-xl border backdrop-blur ${variantStyles[variant]}`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-slate-400">{title}</span>
        <div className="p-2 rounded-lg bg-slate-800/80">
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div className="text-2xl font-bold text-white tracking-tight">{value}</div>
      {subtitle && <p className="text-[11px] text-slate-500 mt-1">{subtitle}</p>}
    </div>
  );
}
