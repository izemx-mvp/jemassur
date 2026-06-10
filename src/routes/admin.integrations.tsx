import { createFileRoute } from "@tanstack/react-router";
import { Send, Calendar, MessageCircle, Mail, Instagram, Facebook } from "lucide-react";

export const Route = createFileRoute("/admin/integrations")({
  component: IntegrationsPage,
});

function IntegrationsPage() {
  const items = [
    { name: "Telegram", desc: "Notifications temps réel", icon: Send, status: "Connecté", color: "from-sky-500 to-blue-500" },
    { name: "Google Calendar", desc: "Synchronisation des RDV", icon: Calendar, status: "Connecté", color: "from-emerald-500 to-teal-500" },
    { name: "WhatsApp Business", desc: "Conversations WhatsApp", icon: MessageCircle, status: "Bientôt", color: "from-green-500 to-emerald-500" },
    { name: "Messenger", desc: "Conversations Facebook", icon: Facebook, status: "Bientôt", color: "from-blue-600 to-indigo-600" },
    { name: "Email", desc: "Suivi des emails entrants", icon: Mail, status: "Bientôt", color: "from-rose-500 to-pink-500" },
    { name: "Instagram DM", desc: "Messages Instagram", icon: Instagram, status: "Bientôt", color: "from-fuchsia-500 to-pink-500" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Intégrations</h1>
        <p className="text-sm text-muted-foreground">Connectez Jemassur à votre stack existante.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map(i => (
          <div key={i.name} className="bg-card rounded-2xl border border-border shadow-soft p-5 hover:shadow-elegant transition">
            <div className="flex items-start justify-between mb-4">
              <div className={`size-12 rounded-xl bg-gradient-to-br ${i.color} text-white flex items-center justify-center shadow-soft`}>
                <i.icon className="size-5" />
              </div>
              <span className={`text-[10px] px-2 py-1 rounded-md font-medium ${i.status === "Connecté" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>
                {i.status}
              </span>
            </div>
            <div className="font-semibold">{i.name}</div>
            <p className="text-xs text-muted-foreground mt-1">{i.desc}</p>
            <button className={`mt-4 w-full text-sm py-2 rounded-lg transition ${i.status === "Connecté" ? "bg-secondary hover:bg-accent" : "gradient-primary text-primary-foreground"}`}>
              {i.status === "Connecté" ? "Configurer" : "Notifier moi"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
