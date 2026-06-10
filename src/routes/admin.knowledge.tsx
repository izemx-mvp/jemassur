import { createFileRoute } from "@tanstack/react-router";
import { insuranceProducts, faqs } from "@/lib/mock-data";
import { BookOpen, Plus, FileText, MessageSquare, Building2 } from "lucide-react";

export const Route = createFileRoute("/admin/knowledge")({
  component: KnowledgePage,
});

function KnowledgePage() {
  const cats = [
    { name: "Produits d'assurance", count: 6, icon: BookOpen },
    { name: "FAQs", count: 24, icon: MessageSquare },
    { name: "Procédures internes", count: 12, icon: FileText },
    { name: "Informations société", count: 8, icon: Building2 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Base de connaissances</h1>
          <p className="text-sm text-muted-foreground">Tout ce que Jemma sait sur Jemassur.</p>
        </div>
        <button className="px-4 py-2 rounded-lg gradient-primary text-primary-foreground text-sm inline-flex items-center gap-2 shadow-soft hover:shadow-glow transition">
          <Plus className="size-4" /> Nouveau document
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cats.map(c => (
          <div key={c.name} className="bg-card rounded-2xl border border-border shadow-soft p-5">
            <div className="size-10 rounded-xl gradient-primary text-primary-foreground flex items-center justify-center mb-3">
              <c.icon className="size-5" />
            </div>
            <div className="text-2xl font-bold">{c.count}</div>
            <div className="text-xs text-muted-foreground">{c.name}</div>
          </div>
        ))}
      </div>

      <div className="bg-card rounded-2xl border border-border shadow-soft p-6">
        <h2 className="font-semibold mb-4">Produits d'assurance</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {insuranceProducts.map(p => (
            <div key={p.name} className="p-4 rounded-xl border border-border hover:border-primary/40 transition">
              <div className="text-2xl mb-2">{p.icon}</div>
              <div className="font-medium text-sm">{p.name}</div>
              <div className="text-xs text-muted-foreground mt-1">{p.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border shadow-soft p-6">
        <h2 className="font-semibold mb-4">FAQ utilisées par l'IA</h2>
        <div className="space-y-2">
          {faqs.map((f, i) => (
            <details key={i} className="rounded-xl border border-border p-4 group">
              <summary className="cursor-pointer font-medium text-sm flex items-center justify-between">
                {f.q}
                <span className="text-muted-foreground group-open:rotate-180 transition">⌄</span>
              </summary>
              <p className="text-sm text-muted-foreground mt-3">{f.a}</p>
            </details>
          ))}
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border shadow-soft p-6">
        <h2 className="font-semibold mb-4">Réponses prédéfinies</h2>
        <div className="grid md:grid-cols-2 gap-3">
          {[
            { t: "Demande de devis", a: "Pour un devis personnalisé, j'ai besoin de quelques informations…" },
            { t: "Délai de réponse", a: "Nos conseillers vous recontactent sous 24h ouvrées." },
            { t: "Documents requis", a: "CIN, carte grise et permis de conduire suffisent." },
            { t: "Mode de paiement", a: "Virement, carte bancaire ou prélèvement mensuel." },
          ].map(r => (
            <div key={r.t} className="p-4 rounded-xl bg-secondary/40">
              <div className="text-xs uppercase tracking-wider text-primary font-semibold mb-2">{r.t}</div>
              <div className="text-sm">{r.a}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
