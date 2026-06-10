import { createFileRoute, Link } from "@tanstack/react-router";
import { stats, conversations, notifications, appointments } from "@/lib/mock-data";
import { MessageSquare, Sparkles, Calendar, TrendingUp, ArrowUpRight, Bell } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: Dashboard,
});

function Dashboard() {
  const cards = [
    { label: "Conversations aujourd'hui", value: stats.conversationsToday, delta: "+12%", icon: MessageSquare, color: "from-blue-500 to-cyan-500" },
    { label: "Leads qualifiés", value: stats.qualifiedLeads, delta: "+8%", icon: Sparkles, color: "from-indigo-500 to-blue-500" },
    { label: "RDV pris", value: stats.appointments, delta: "+24%", icon: Calendar, color: "from-emerald-500 to-teal-500" },
    { label: "Taux de conversion", value: `${stats.conversionRate}%`, delta: "+3.2pt", icon: TrendingUp, color: "from-violet-500 to-purple-500" },
  ];
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Bonjour, Salma 👋</h1>
        <p className="text-sm text-muted-foreground">Voici un aperçu en temps réel de votre activité Jemassur.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="bg-card rounded-2xl p-5 border border-border shadow-soft hover:shadow-elegant transition">
            <div className="flex items-start justify-between">
              <div className={`size-10 rounded-xl bg-gradient-to-br ${c.color} text-white flex items-center justify-center shadow-soft`}>
                <c.icon className="size-5" />
              </div>
              <span className="text-xs font-semibold text-success bg-success/10 px-2 py-1 rounded-md">{c.delta}</span>
            </div>
            <div className="mt-4 text-3xl font-bold">{c.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{c.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card rounded-2xl p-6 border border-border shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Conversations récentes</h2>
            <Link to="/admin/conversations" className="text-xs text-primary inline-flex items-center gap-1 hover:underline">Voir tout <ArrowUpRight className="size-3" /></Link>
          </div>
          <div className="divide-y divide-border">
            {conversations.slice(0, 5).map((c) => (
              <Link key={c.id} to="/admin/conversations" className="flex items-center gap-4 py-3 hover:bg-secondary/50 -mx-2 px-2 rounded-lg transition">
                <div className="size-10 rounded-full gradient-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                  {c.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm truncate">{c.name}</span>
                    <StatusBadge status={c.status} />
                  </div>
                  <div className="text-xs text-muted-foreground truncate mt-0.5">{c.lastMessage}</div>
                </div>
                <div className="text-xs text-muted-foreground shrink-0">{c.updatedAt}</div>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-2xl p-6 border border-border shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold flex items-center gap-2"><Bell className="size-4 text-primary" /> Notifications Telegram</h2>
          </div>
          <div className="space-y-3">
            {notifications.slice(0, 5).map((n) => (
              <div key={n.id} className="p-3 rounded-xl bg-secondary/60 hover:bg-secondary transition">
                <div className="text-sm font-medium">{n.title}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{n.message}</div>
                <div className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wider">{n.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-card rounded-2xl p-6 border border-border shadow-soft">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">Prochains rendez-vous</h2>
          <Link to="/admin/appointments" className="text-xs text-primary inline-flex items-center gap-1 hover:underline">Calendrier <ArrowUpRight className="size-3" /></Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {appointments.slice(0, 3).map((a) => (
            <div key={a.id} className="rounded-xl border border-border p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="font-semibold text-sm">{a.client}</div>
                <span className={`text-[10px] px-2 py-0.5 rounded-md ${a.status === "Confirmé" ? "bg-success/10 text-success" : "bg-warning/10 text-warning-foreground"}`}>{a.status}</span>
              </div>
              <div className="text-xs text-muted-foreground">{a.type} • avec {a.advisor}</div>
              <div className="mt-2 text-sm font-medium text-primary">{a.date} à {a.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    "Nouveau Lead": "bg-blue-500/10 text-blue-600",
    "Lead Qualifié": "bg-success/10 text-success",
    "RDV Pris": "bg-violet-500/10 text-violet-600",
    "Reprise Humaine": "bg-orange-500/10 text-orange-600",
  };
  return <span className={`text-[10px] px-2 py-0.5 rounded-md font-medium ${map[status] || "bg-secondary"}`}>{status}</span>;
}
