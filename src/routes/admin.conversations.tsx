import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { conversations as initialConvs, type LeadStatus } from "@/lib/mock-data";
import { Send, UserCheck, Bot, Phone, MapPin, Sparkles } from "lucide-react";
import { StatusBadge } from "./admin.index";

export const Route = createFileRoute("/admin/conversations")({
  component: ConversationsPage,
});

const STATUS_FILTERS: (LeadStatus | "Tous")[] = ["Tous", "Nouveau Lead", "Lead Qualifié", "RDV Pris", "Reprise Humaine"];

function ConversationsPage() {
  const [convs, setConvs] = useState(initialConvs);
  const [activeId, setActiveId] = useState(convs[0].id);
  const [filter, setFilter] = useState<(typeof STATUS_FILTERS)[number]>("Tous");
  const [search, setSearch] = useState("");
  const [input, setInput] = useState("");
  const [humanMode, setHumanMode] = useState(false);

  const filtered = convs.filter(c =>
    (filter === "Tous" || c.status === filter) &&
    (search === "" || c.name.toLowerCase().includes(search.toLowerCase()))
  );
  const active = convs.find(c => c.id === activeId)!;

  const sendHuman = () => {
    if (!input.trim()) return;
    setConvs(cs => cs.map(c => c.id === activeId ? {
      ...c,
      messages: [...c.messages, { id: `m${Date.now()}`, from: "human", text: input, time: "maintenant" }],
      lastMessage: input,
    } : c));
    setInput("");
  };

  const takeover = () => {
    setHumanMode(true);
    setConvs(cs => cs.map(c => c.id === activeId ? { ...c, status: "Reprise Humaine" } : c));
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Conversations</h1>
        <p className="text-sm text-muted-foreground">Supervisez l'ensemble des échanges IA et humains.</p>
      </div>

      <div className="flex-1 flex gap-4 min-h-0">
        <div className="w-80 bg-card rounded-2xl border border-border shadow-soft flex flex-col overflow-hidden">
          <div className="p-3 border-b border-border">
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher…" className="w-full px-3 py-2 rounded-lg bg-secondary text-sm outline-none" />
            <div className="flex gap-1 mt-2 overflow-x-auto">
              {STATUS_FILTERS.map(f => (
                <button key={f} onClick={() => setFilter(f)} className={`text-[10px] px-2 py-1 rounded-md whitespace-nowrap ${filter === f ? "gradient-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-border">
            {filtered.map(c => (
              <button key={c.id} onClick={() => { setActiveId(c.id); setHumanMode(c.status === "Reprise Humaine"); }} className={`w-full text-left p-3 hover:bg-secondary/50 transition ${activeId === c.id ? "bg-secondary" : ""}`}>
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full gradient-primary text-primary-foreground flex items-center justify-center text-xs font-semibold shrink-0">
                    {c.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-medium text-sm truncate">{c.name}</span>
                      {c.unread > 0 && <span className="text-[10px] size-4 rounded-full gradient-primary text-primary-foreground flex items-center justify-center">{c.unread}</span>}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">{c.lastMessage}</div>
                    <div className="mt-1"><StatusBadge status={c.status} /></div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 bg-card rounded-2xl border border-border shadow-soft flex flex-col overflow-hidden min-w-0">
          <div className="p-4 border-b border-border flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="size-11 rounded-full gradient-primary text-primary-foreground flex items-center justify-center font-semibold">
                {active.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div className="min-w-0">
                <div className="font-semibold truncate">{active.name}</div>
                <div className="text-xs text-muted-foreground flex items-center gap-3">
                  <span className="flex items-center gap-1"><Phone className="size-3" />{active.phone}</span>
                  <span className="flex items-center gap-1"><MapPin className="size-3" />{active.city}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <StatusBadge status={active.status} />
              {!humanMode ? (
                <button onClick={takeover} className="text-xs px-3 py-1.5 rounded-lg gradient-primary text-primary-foreground inline-flex items-center gap-1.5 shadow-soft hover:shadow-glow transition">
                  <UserCheck className="size-3.5" /> Reprendre la conversation
                </button>
              ) : (
                <span className="text-xs px-3 py-1.5 rounded-lg bg-orange-500/10 text-orange-600 inline-flex items-center gap-1.5">
                  <UserCheck className="size-3.5" /> Mode humain actif
                </span>
              )}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-3 bg-gradient-to-b from-transparent to-secondary/30">
            {active.messages.map(m => (
              <div key={m.id} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"} animate-slide-up`}>
                <div className={`max-w-[70%] ${m.from === "user" ? "" : "flex gap-2"}`}>
                  {m.from !== "user" && (
                    <div className={`size-7 rounded-full flex items-center justify-center text-white shrink-0 ${m.from === "ai" ? "gradient-primary" : "bg-orange-500"}`}>
                      {m.from === "ai" ? <Bot className="size-3.5" /> : <UserCheck className="size-3.5" />}
                    </div>
                  )}
                  <div>
                    <div className={`px-4 py-2.5 rounded-2xl text-sm ${m.from === "user" ? "gradient-primary text-primary-foreground rounded-br-sm" : m.from === "human" ? "bg-orange-500/10 text-orange-900 rounded-bl-sm" : "bg-card border border-border rounded-bl-sm shadow-soft"}`}>
                      {m.text}
                    </div>
                    <div className="text-[10px] text-muted-foreground mt-1 px-1">{m.time}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={(e) => { e.preventDefault(); sendHuman(); }} className="p-3 border-t border-border bg-secondary/40 flex gap-2">
            <input value={input} onChange={e => setInput(e.target.value)} placeholder={humanMode ? "Répondre en tant que conseiller…" : "Surveiller… (cliquez sur Reprendre pour intervenir)"} disabled={!humanMode} className="flex-1 px-4 py-2 rounded-lg bg-card text-sm outline-none disabled:opacity-50" />
            <button type="submit" disabled={!humanMode} className="px-4 py-2 rounded-lg gradient-primary text-primary-foreground inline-flex items-center gap-2 disabled:opacity-50">
              <Send className="size-4" /> Envoyer
            </button>
          </form>
        </div>

        <div className="w-72 bg-card rounded-2xl border border-border shadow-soft p-4 hidden xl:flex flex-col gap-4">
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Détails client</div>
            <div className="space-y-2 text-sm">
              <Row label="Type" value={active.insuranceType} />
              <Row label="Téléphone" value={active.phone} />
              {active.email && <Row label="Email" value={active.email} />}
              <Row label="Ville" value={active.city} />
            </div>
          </div>
          <div className="border-t border-border pt-4">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Score IA</div>
            <div className="rounded-xl p-4 gradient-primary text-primary-foreground">
              <div className="flex items-center gap-2 text-sm font-medium"><Sparkles className="size-4" /> Lead Hot</div>
              <div className="mt-2 text-3xl font-bold">87<span className="text-base opacity-80">/100</span></div>
              <div className="text-xs opacity-90 mt-1">Probabilité de conversion élevée</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-2">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-right truncate">{value}</span>
    </div>
  );
}
