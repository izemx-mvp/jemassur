import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { notifications as initial } from "@/lib/mock-data";
import { Bell, Send } from "lucide-react";

export const Route = createFileRoute("/admin/notifications")({
  component: NotificationsPage,
});

const SAMPLES = [
  { type: "new_lead", title: "✨ Nouveau visiteur", message: "Un nouveau lead vient d'arriver sur le site" },
  { type: "qualified", title: "🎯 Lead qualifié", message: "Conversation qualifiée par l'IA" },
  { type: "appointment", title: "📅 RDV pris", message: "Nouveau créneau réservé" },
  { type: "phone", title: "📞 Téléphone collecté", message: "L'IA a collecté un numéro" },
];

function NotificationsPage() {
  const [items, setItems] = useState(initial);
  const [live, setLive] = useState(true);

  useEffect(() => {
    if (!live) return;
    const t = setInterval(() => {
      const s = SAMPLES[Math.floor(Math.random() * SAMPLES.length)];
      setItems(prev => [{ id: `n${Date.now()}`, ...s, time: "à l'instant" } as typeof prev[number], ...prev].slice(0, 30));
    }, 6000);
    return () => clearInterval(t);
  }, [live]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Notifications temps réel</h1>
          <p className="text-sm text-muted-foreground">Flux Telegram simulé — chaque événement clé est notifié à votre équipe.</p>
        </div>
        <button onClick={() => setLive(l => !l)} className={`text-xs px-3 py-2 rounded-lg inline-flex items-center gap-2 ${live ? "bg-success/10 text-success" : "bg-secondary text-muted-foreground"}`}>
          <span className={`size-2 rounded-full ${live ? "bg-success animate-pulse" : "bg-muted-foreground"}`} /> {live ? "Flux en direct" : "Flux en pause"}
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card rounded-2xl border border-border shadow-soft p-5">
          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            {items.map(n => (
              <div key={n.id} className="flex gap-3 p-3 rounded-xl bg-secondary/40 hover:bg-secondary transition animate-slide-up">
                <div className="size-9 rounded-lg gradient-primary text-primary-foreground flex items-center justify-center shrink-0">
                  <Bell className="size-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">{n.title}</div>
                  <div className="text-xs text-muted-foreground">{n.message}</div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">{n.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-card rounded-2xl border border-border shadow-soft p-5">
            <h2 className="font-semibold mb-4 flex items-center gap-2"><Send className="size-4 text-primary" /> Configuration Telegram</h2>
            <div className="space-y-3 text-sm">
              <Field label="Bot Token" value="•••••••• 5482:AAH****" />
              <Field label="Chat ID" value="-1001234567890" />
              <Field label="Canal" value="#jemassur-leads" />
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-success bg-success/10 px-3 py-2 rounded-lg">
              <span className="size-2 rounded-full bg-success animate-pulse" /> Connecté
            </div>
          </div>

          <div className="bg-card rounded-2xl border border-border shadow-soft p-5">
            <h2 className="font-semibold mb-4">Types de notifications</h2>
            <div className="space-y-2 text-sm">
              {["Nouveau lead", "Lead qualifié", "Téléphone collecté", "RDV pris", "Reprise humaine demandée"].map(l => (
                <label key={l} className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary/50">
                  <span>{l}</span>
                  <input type="checkbox" defaultChecked className="accent-primary" />
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs text-muted-foreground mb-1">{label}</div>
      <div className="px-3 py-2 rounded-lg bg-secondary text-xs font-mono">{value}</div>
    </div>
  );
}
