import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, MessageSquare, Calendar, Bell, Clock, Bot, BookOpen, Plug, Users, Sparkles } from "lucide-react";
import { Logo } from "./Logo";

type NavItem = { to: string; label: string; icon: typeof LayoutDashboard; exact?: boolean };
const items: NavItem[] = [
  { to: "/admin", label: "Tableau de bord", icon: LayoutDashboard, exact: true },
  { to: "/admin/conversations", label: "Conversations", icon: MessageSquare },
  { to: "/admin/appointments", label: "Rendez-vous", icon: Calendar },
  { to: "/admin/notifications", label: "Notifications", icon: Bell },
  { to: "/admin/hours", label: "Heures d'ouverture", icon: Clock },
  { to: "/admin/scenarios", label: "Scénarios IA", icon: Bot },
  { to: "/admin/knowledge", label: "Base de connaissances", icon: BookOpen },
  { to: "/admin/integrations", label: "Intégrations", icon: Plug },
  { to: "/admin/team", label: "Équipe & accès", icon: Users },
];

export function AdminSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <aside className="w-64 shrink-0 bg-sidebar text-sidebar-foreground flex flex-col border-r border-sidebar-border">
      <div className="p-5 border-b border-sidebar-border bg-white/5">
        <div className="flex items-center gap-2 mb-1">
          <Logo className="h-8 bg-white rounded-md p-1" />
        </div>
        <div className="text-[10px] uppercase tracking-widest opacity-60 mt-2 flex items-center gap-1">
          <Sparkles className="size-3" /> Admin Suite
        </div>
      </div>
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {items.map((it) => {
          const Icon = it.icon;
          const active = it.exact ? pathname === it.to : pathname.startsWith(it.to);
          return (
            <Link
              key={it.to}
              to={it.to as "/admin"}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${active ? "bg-sidebar-accent text-white shadow-soft" : "hover:bg-white/5 text-sidebar-foreground/80"}`}
            >
              <Icon className="size-4" />
              {it.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-sidebar-border text-[11px] opacity-60">
        Prototype de démonstration<br />Version non contractuelle
      </div>
    </aside>
  );
}
