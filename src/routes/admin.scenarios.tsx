import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Bot, Sparkles, Workflow, Shield } from "lucide-react";

export const Route = createFileRoute("/admin/scenarios")({
  component: ScenariosPage,
});

const DEFAULT_PROMPT = `Tu es Jemma, l'assistante IA de Jemassur, compagnie d'assurance marocaine.

🎯 Ton rôle :
- Accueillir chaleureusement les visiteurs en français.
- Identifier le type d'assurance recherché (auto, habitation, santé, voyage, pro).
- Collecter : prénom, nom, numéro de téléphone, ville.
- Proposer un rendez-vous avec un conseiller.
- Transférer à un humain dès qu'une demande est complexe.

🗣️ Ton ton :
Professionnel, rassurant, bienveillant. Tu tutoies si l'utilisateur tutoie.

🚦 Règles d'escalade :
- Demande de devis personnalisé > transférer
- Sinistre en cours > transférer immédiatement
- Plus de 3 questions sans réponse > transférer`;

function ScenariosPage() {
  const [prompt, setPrompt] = useState(DEFAULT_PROMPT);
  const [tab, setTab] = useState<"prompt" | "workflow" | "qual" | "esca">("prompt");

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2"><Bot className="text-primary" /> Scénarios & instructions IA</h1>
        <p className="text-sm text-muted-foreground">Personnalisez le comportement de Jemma sans toucher au code.</p>
      </div>

      <div className="flex gap-2 border-b border-border">
        {[
          { id: "prompt", label: "Prompt principal", icon: Sparkles },
          { id: "workflow", label: "Workflows", icon: Workflow },
          { id: "qual", label: "Qualification", icon: Bot },
          { id: "esca", label: "Escalade", icon: Shield },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id as typeof tab)} className={`px-4 py-2.5 text-sm flex items-center gap-2 border-b-2 transition ${tab === t.id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
            <t.icon className="size-4" /> {t.label}
          </button>
        ))}
      </div>

      {tab === "prompt" && (
        <div className="bg-card rounded-2xl border border-border shadow-soft p-6">
          <label className="text-sm font-medium mb-2 block">Prompt système</label>
          <textarea value={prompt} onChange={e => setPrompt(e.target.value)} rows={18} className="w-full px-4 py-3 rounded-xl bg-secondary text-sm font-mono outline-none focus:ring-2 ring-primary/30 resize-none" />
          <div className="flex items-center justify-between mt-4">
            <div className="text-xs text-muted-foreground">{prompt.length} caractères</div>
            <button className="px-4 py-2 rounded-lg gradient-primary text-primary-foreground text-sm">Publier le prompt</button>
          </div>
        </div>
      )}

      {tab === "workflow" && (
        <div className="space-y-4">
          {[
            { name: "Qualification standard", steps: ["Accueil", "Type d'assurance", "Coordonnées", "Proposition RDV", "Confirmation"] },
            { name: "Hors horaires", steps: ["Accueil", "Détection besoin", "Proposition créneau", "Réservation auto"] },
            { name: "Demande complexe", steps: ["Accueil", "Analyse", "Notification Telegram", "Transfert humain"] },
          ].map(w => (
            <div key={w.name} className="bg-card rounded-2xl border border-border shadow-soft p-5">
              <div className="font-semibold mb-3">{w.name}</div>
              <div className="flex flex-wrap items-center gap-2">
                {w.steps.map((s, i) => (
                  <div key={s} className="flex items-center gap-2">
                    <span className="text-xs px-3 py-1.5 rounded-lg bg-secondary">{s}</span>
                    {i < w.steps.length - 1 && <span className="text-primary/40">→</span>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "qual" && (
        <div className="bg-card rounded-2xl border border-border shadow-soft p-6 space-y-3">
          <h3 className="font-semibold">Règles de qualification</h3>
          {[
            "Considérer comme qualifié si : nom + téléphone + type d'assurance",
            "Demander la ville pour orienter vers le bon conseiller",
            "Demander la date de naissance pour les assurances santé",
            "Si CA > 500K MAD, marquer comme prospect PRO",
          ].map((r, i) => (
            <label key={i} className="flex items-start gap-3 p-3 rounded-lg border border-border">
              <input type="checkbox" defaultChecked className="mt-1 accent-primary" />
              <span className="text-sm">{r}</span>
            </label>
          ))}
        </div>
      )}

      {tab === "esca" && (
        <div className="bg-card rounded-2xl border border-border shadow-soft p-6 space-y-3">
          <h3 className="font-semibold">Règles d'escalade vers conseiller</h3>
          {[
            { t: "Sinistre déclaré", c: "Urgence — transfert immédiat" },
            { t: "Demande de devis complexe", c: "Transfert sous 1 minute" },
            { t: "Insatisfaction détectée", c: "Notification + transfert" },
            { t: "Demande explicite \"parler à un humain\"", c: "Transfert immédiat" },
          ].map(r => (
            <div key={r.t} className="flex items-center justify-between p-3 rounded-lg border border-border">
              <div>
                <div className="font-medium text-sm">{r.t}</div>
                <div className="text-xs text-muted-foreground">{r.c}</div>
              </div>
              <span className="text-xs px-2 py-1 rounded-md bg-success/10 text-success">Actif</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
