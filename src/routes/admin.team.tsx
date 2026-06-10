import { createFileRoute } from "@tanstack/react-router";
import { advisors } from "@/lib/mock-data";
import { Plus, Shield, Mail } from "lucide-react";

export const Route = createFileRoute("/admin/team")({
  component: TeamPage,
});

function TeamPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Équipe & accès</h1>
          <p className="text-sm text-muted-foreground">Gérez vos conseillers, administrateurs et permissions.</p>
        </div>
        <button className="px-4 py-2 rounded-lg gradient-primary text-primary-foreground text-sm inline-flex items-center gap-2 shadow-soft hover:shadow-glow transition">
          <Plus className="size-4" /> Inviter un membre
        </button>
      </div>

      <div className="bg-card rounded-2xl border border-border shadow-soft overflow-hidden">
        <table className="w-full text-sm">
          <thead className="text-xs uppercase tracking-wider text-muted-foreground bg-secondary/50">
            <tr>
              <th className="text-left px-5 py-3">Membre</th>
              <th className="text-left px-5 py-3">Email</th>
              <th className="text-left px-5 py-3">Rôle</th>
              <th className="text-left px-5 py-3">Conversations</th>
              <th className="text-left px-5 py-3">Statut</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {advisors.map(a => (
              <tr key={a.id} className="hover:bg-secondary/30 transition">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="size-9 rounded-full gradient-primary text-primary-foreground flex items-center justify-center text-xs font-semibold">
                      {a.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <span className="font-medium">{a.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3 text-muted-foreground flex items-center gap-1.5 pt-5"><Mail className="size-3.5" /> {a.email}</td>
                <td className="px-5 py-3">{a.role}</td>
                <td className="px-5 py-3 font-medium">{a.conversations}</td>
                <td className="px-5 py-3">
                  <span className={`inline-flex items-center gap-1.5 text-xs ${a.status === "En ligne" ? "text-success" : "text-muted-foreground"}`}>
                    <span className={`size-2 rounded-full ${a.status === "En ligne" ? "bg-success animate-pulse" : "bg-muted-foreground/40"}`} />
                    {a.status}
                  </span>
                </td>
                <td className="px-5 py-3 text-right">
                  <button className="text-xs text-primary hover:underline">Modifier</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-card rounded-2xl border border-border shadow-soft p-6">
        <h2 className="font-semibold mb-4 flex items-center gap-2"><Shield className="size-4 text-primary" /> Permissions par rôle</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { role: "Administrateur", perms: ["Tout configurer", "Gérer l'équipe", "Voir toutes les conversations", "Configurer l'IA"] },
            { role: "Conseiller Senior", perms: ["Reprendre conversations", "Modifier RDV", "Voir analytics"] },
            { role: "Conseiller", perms: ["Reprendre conversations", "Répondre aux clients"] },
          ].map(r => (
            <div key={r.role} className="p-4 rounded-xl border border-border">
              <div className="font-medium mb-3">{r.role}</div>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                {r.perms.map(p => <li key={p} className="flex gap-2"><span className="text-success">✓</span> {p}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
