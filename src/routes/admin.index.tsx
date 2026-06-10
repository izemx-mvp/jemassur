import { createFileRoute, Link } from "@tanstack/react-router";
import { stats, conversations, notifications, appointments, advisors, insuranceProducts } from "@/lib/mock-data";
import {
  MessageSquare,
  Sparkles,
  Calendar,
  TrendingUp,
  ArrowUpRight,
  Bell,
  Users,
  Bot,
  PhoneCall,
  CheckCircle2,
  Clock,
  Activity,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export const Route = createFileRoute("/admin/")({
  component: Dashboard,
});

const weeklyData = [
  { day: "Lun", conversations: 32, leads: 14, rdv: 6 },
  { day: "Mar", conversations: 41, leads: 19, rdv: 9 },
  { day: "Mer", conversations: 38, leads: 17, rdv: 7 },
  { day: "Jeu", conversations: 52, leads: 24, rdv: 11 },
  { day: "Ven", conversations: 47, leads: 23, rdv: 12 },
  { day: "Sam", conversations: 28, leads: 12, rdv: 5 },
  { day: "Dim", conversations: 19, leads: 8, rdv: 3 },
];

const hourlyTraffic = [
  { h: "08h", v: 4 },
  { h: "10h", v: 12 },
  { h: "12h", v: 18 },
  { h: "14h", v: 27 },
  { h: "16h", v: 22 },
  { h: "18h", v: 15 },
  { h: "20h", v: 8 },
];

const productMix = [
  { name: "Auto", value: 38, color: "hsl(220 90% 56%)" },
  { name: "Habitation", value: 22, color: "hsl(199 89% 48%)" },
  { name: "Santé", value: 18, color: "hsl(340 82% 60%)" },
  { name: "Voyage", value: 10, color: "hsl(190 95% 50%)" },
  { name: "Pro", value: 8, color: "hsl(262 83% 62%)" },
  { name: "Prévoyance", value: 4, color: "hsl(160 84% 42%)" },
];

function Dashboard() {
  const cards = [
    { label: "Conversations aujourd'hui", value: stats.conversationsToday, delta: "+12%", icon: MessageSquare, color: "from-blue-500 to-cyan-500" },
    { label: "Leads qualifiés", value: stats.qualifiedLeads, delta: "+8%", icon: Sparkles, color: "from-indigo-500 to-blue-500" },
    { label: "RDV pris", value: stats.appointments, delta: "+24%", icon: Calendar, color: "from-emerald-500 to-teal-500" },
    { label: "Taux de conversion", value: `${stats.conversionRate}%`, delta: "+3.2pt", icon: TrendingUp, color: "from-violet-500 to-purple-500" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Bonjour, Salma 👋</h1>
          <p className="text-sm text-muted-foreground">Aperçu en temps réel de votre activité Jemassur — {new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 text-success text-xs font-semibold">
            <span className="size-2 rounded-full bg-success animate-pulse" /> IA Jemma — Opérationnelle
          </span>
          <button className="px-3 py-1.5 rounded-lg bg-secondary text-xs font-medium hover:bg-accent transition">Aujourd'hui</button>
          <button className="px-3 py-1.5 rounded-lg gradient-primary text-primary-foreground text-xs font-semibold shadow-soft">Cette semaine</button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c, i) => (
          <div
            key={c.label}
            className="bg-card rounded-2xl p-5 border border-border shadow-soft hover:shadow-elegant hover:-translate-y-0.5 transition-all animate-fade-in"
            style={{ animationDelay: `${i * 60}ms` }}
          >
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

      {/* Charts row */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card rounded-2xl p-6 border border-border shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-semibold">Performance hebdomadaire</h2>
              <p className="text-xs text-muted-foreground">Conversations, leads qualifiés et RDV pris</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <LegendDot color="hsl(220 90% 56%)" label="Conversations" />
              <LegendDot color="hsl(160 84% 42%)" label="Leads" />
              <LegendDot color="hsl(262 83% 62%)" label="RDV" />
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyData} margin={{ left: -20, right: 8, top: 10 }}>
                <defs>
                  <linearGradient id="gConv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(220 90% 56%)" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="hsl(220 90% 56%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gLead" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(160 84% 42%)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="hsl(160 84% 42%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gRdv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(262 83% 62%)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="hsl(262 83% 62%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12, fontSize: 12 }} />
                <Area type="monotone" dataKey="conversations" stroke="hsl(220 90% 56%)" strokeWidth={2.5} fill="url(#gConv)" />
                <Area type="monotone" dataKey="leads" stroke="hsl(160 84% 42%)" strokeWidth={2.5} fill="url(#gLead)" />
                <Area type="monotone" dataKey="rdv" stroke="hsl(262 83% 62%)" strokeWidth={2.5} fill="url(#gRdv)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card rounded-2xl p-6 border border-border shadow-soft">
          <h2 className="font-semibold mb-1">Répartition par produit</h2>
          <p className="text-xs text-muted-foreground mb-4">Demandes des 30 derniers jours</p>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={productMix} dataKey="value" innerRadius={48} outerRadius={78} paddingAngle={3}>
                  {productMix.map((p) => (
                    <Cell key={p.name} fill={p.color} stroke="hsl(var(--card))" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {productMix.map((p) => (
              <div key={p.name} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2"><span className="size-2 rounded-full" style={{ background: p.color }} />{p.name}</span>
                <span className="text-muted-foreground">{p.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Traffic + Activity */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="bg-card rounded-2xl p-6 border border-border shadow-soft">
          <h2 className="font-semibold mb-1">Trafic horaire</h2>
          <p className="text-xs text-muted-foreground mb-4">Conversations entrantes par tranche horaire</p>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hourlyTraffic} margin={{ left: -20, right: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="h" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12, fontSize: 12 }} />
                <Bar dataKey="v" fill="hsl(220 90% 56%)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-2 bg-card rounded-2xl p-6 border border-border shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold flex items-center gap-2"><Activity className="size-4 text-primary" /> Activité en temps réel</h2>
            <span className="text-xs text-muted-foreground inline-flex items-center gap-1">
              <span className="size-2 rounded-full bg-success animate-pulse" /> Live
            </span>
          </div>
          <div className="space-y-3">
            {[
              { icon: Bot, color: "text-blue-500 bg-blue-500/10", text: "Jemma a qualifié Sophie Martin", meta: "Auto · Casablanca", time: "à l'instant" },
              { icon: PhoneCall, color: "text-violet-500 bg-violet-500/10", text: "Numéro collecté pour Yasmine Tazi", meta: "Santé · Marrakech", time: "il y a 2 min" },
              { icon: CheckCircle2, color: "text-emerald-500 bg-emerald-500/10", text: "RDV confirmé avec Hamza Bennani", meta: "Demain 14:00", time: "il y a 5 min" },
              { icon: Users, color: "text-orange-500 bg-orange-500/10", text: "Reprise humaine demandée — Mehdi Benjelloun", meta: "Assurance Pro", time: "il y a 7 min" },
              { icon: Sparkles, color: "text-cyan-500 bg-cyan-500/10", text: "Nouveau lead — Karim El Amrani", meta: "Habitation · Rabat", time: "il y a 12 min" },
            ].map((a, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/60 transition">
                <div className={`size-9 rounded-lg flex items-center justify-center ${a.color}`}>
                  <a.icon className="size-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{a.text}</div>
                  <div className="text-xs text-muted-foreground">{a.meta}</div>
                </div>
                <div className="text-xs text-muted-foreground shrink-0">{a.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Conversations + notifications */}
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
                  {c.name.split(" ").map((n) => n[0]).join("")}
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
            <h2 className="font-semibold flex items-center gap-2"><Bell className="size-4 text-primary" /> Notifications</h2>
            <Link to="/admin/notifications" className="text-xs text-primary hover:underline">Tout voir</Link>
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

      {/* Calendar + Team */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card rounded-2xl p-6 border border-border shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-semibold flex items-center gap-2"><Calendar className="size-4 text-primary" /> Prochains rendez-vous</h2>
              <p className="text-xs text-muted-foreground">Cette semaine</p>
            </div>
            <Link to="/admin/appointments" className="text-xs text-primary inline-flex items-center gap-1 hover:underline">Calendrier complet <ArrowUpRight className="size-3" /></Link>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {appointments.map((a) => (
              <div key={a.id} className="rounded-xl border border-border p-4 hover:shadow-soft transition">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-semibold text-sm">{a.client}</div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-md font-medium ${a.status === "Confirmé" ? "bg-success/10 text-success" : a.status === "En attente" ? "bg-warning/10 text-warning-foreground" : "bg-destructive/10 text-destructive"}`}>{a.status}</span>
                </div>
                <div className="text-xs text-muted-foreground">{a.type} • avec {a.advisor}</div>
                <div className="mt-2 flex items-center gap-1 text-sm font-medium text-primary">
                  <Clock className="size-3.5" /> {a.date} à {a.time}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-2xl p-6 border border-border shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold flex items-center gap-2"><Users className="size-4 text-primary" /> Équipe</h2>
            <Link to="/admin/team" className="text-xs text-primary hover:underline">Gérer</Link>
          </div>
          <div className="space-y-3">
            {advisors.map((ad) => (
              <div key={ad.id} className="flex items-center gap-3">
                <div className="relative">
                  <div className="size-10 rounded-full gradient-primary text-primary-foreground flex items-center justify-center text-xs font-semibold">
                    {ad.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <span className={`absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-card ${ad.status === "En ligne" ? "bg-success" : "bg-muted-foreground"}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{ad.name}</div>
                  <div className="text-xs text-muted-foreground truncate">{ad.role}</div>
                </div>
                <div className="text-xs text-muted-foreground">{ad.conversations}</div>
              </div>
            ))}
          </div>
          <div className="mt-5 pt-4 border-t border-border">
            <div className="text-xs text-muted-foreground mb-2">Produits les plus demandés</div>
            <div className="flex flex-wrap gap-1.5">
              {insuranceProducts.slice(0, 4).map((p) => (
                <span key={p.name} className="text-[11px] px-2 py-1 rounded-md bg-secondary">{p.icon} {p.name}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-muted-foreground">
      <span className="size-2 rounded-full" style={{ background: color }} />
      {label}
    </span>
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
