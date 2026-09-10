"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  AlertTriangle,
  Building2,
  FileText,
  FlaskConical,
  LayoutDashboard,
  MapPin,
  ShieldAlert,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Command Overview", href: "/", icon: LayoutDashboard },
  { name: "Surveillance Cases", href: "/cases", icon: FileText },
  { name: "Pathogen Catalog", href: "/diseases", icon: Activity },
  { name: "Geographic Units", href: "/locations", icon: MapPin },
  { name: "Health Facilities", href: "/facilities", icon: Building2 },
  { name: "Diagnostic Assays", href: "/diagnostics", icon: FlaskConical },
  { name: "User & RBAC Access", href: "/users", icon: Users },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-screen fixed left-0 top-0 text-slate-300">
      <div className="h-16 flex items-center px-6 gap-3 border-b border-slate-800">
        <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20 text-emerald-400">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-sm font-bold text-white tracking-wider">HEALTH SENTINEL</h1>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Operations Console</p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors",
                isActive
                  ? "bg-emerald-600/15 text-emerald-400 border border-emerald-500/30 font-semibold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
              )}
            >
              <item.icon className={cn("w-4 h-4", isActive ? "text-emerald-400" : "text-slate-400")} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800 text-[11px] text-slate-500">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-slate-300 font-medium">National Surveillance Node</span>
        </div>
        <p className="text-slate-500 font-mono text-[10px]">Phase 1 • CDM v1.0 • NGA</p>
      </div>
    </aside>
  );
}
