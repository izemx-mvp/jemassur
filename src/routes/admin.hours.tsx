import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/admin/hours")({
  component: HoursPage,
});

const DAYS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

function HoursPage() {
  const [hours, setHours] = useState(
    DAYS.map((d, i) => ({ day: d, open: "09:00", close: "18:00", active: i < 6 }))
  );

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold">Heures d'ouverture</h1>
        <p className="text-sm text-muted-foreground">Configurez la disponibilité de votre équipe. En dehors, l'IA propose un rendez-vous.</p>
      </div>

      <div className="bg-card rounded-2xl border border-border shadow-soft p-6">
        <div className="space-y-3">
          {hours.map((h, i) => (
            <div key={h.day} className="flex items-center gap-4 p-3 rounded-xl border border-border">
              <label className="flex items-center gap-3 w-32">
                <input type="checkbox" checked={h.active} onChange={() => setHours(hs => hs.map((x, j) => j === i ? { ...x, active: !x.active } : x))} className="accent-primary" />
                <span className="font-medium text-sm">{h.day}</span>
              </label>
              {h.active ? (
                <div className="flex items-center gap-2 text-sm">
                  <input type="time" value={h.open} onChange={e => setHours(hs => hs.map((x, j) => j === i ? { ...x, open: e.target.value } : x))} className="px-3 py-1.5 rounded-md bg-secondary outline-none" />
                  <span className="text-muted-foreground">à</span>
                  <input type="time" value={h.close} onChange={e => setHours(hs => hs.map((x, j) => j === i ? { ...x, close: e.target.value } : x))} className="px-3 py-1.5 rounded-md bg-secondary outline-none" />
                </div>
              ) : (
                <span className="text-sm text-muted-foreground">Fermé</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border shadow-soft p-6">
        <h2 className="font-semibold mb-4">Comportement hors horaires</h2>
        <div className="space-y-4">
          <label className="flex gap-3 p-3 rounded-xl border-2 border-primary bg-primary/5">
            <input type="radio" name="off" defaultChecked className="mt-1 accent-primary" />
            <div>
              <div className="font-medium text-sm">Proposer un rendez-vous automatiquement</div>
              <div className="text-xs text-muted-foreground">L'IA propose le prochain créneau disponible</div>
            </div>
          </label>
          <label className="flex gap-3 p-3 rounded-xl border border-border">
            <input type="radio" name="off" className="mt-1 accent-primary" />
            <div>
              <div className="font-medium text-sm">Collecter le numéro pour rappel</div>
              <div className="text-xs text-muted-foreground">Un conseiller rappelle dès l'ouverture</div>
            </div>
          </label>
          <label className="flex gap-3 p-3 rounded-xl border border-border">
            <input type="radio" name="off" className="mt-1 accent-primary" />
            <div>
              <div className="font-medium text-sm">Message d'absence simple</div>
              <div className="text-xs text-muted-foreground">L'IA informe du retour à l'ouverture</div>
            </div>
          </label>
        </div>
      </div>

      <button className="px-5 py-2.5 rounded-xl gradient-primary text-primary-foreground font-medium shadow-soft hover:shadow-glow transition">Enregistrer</button>
    </div>
  );
}
