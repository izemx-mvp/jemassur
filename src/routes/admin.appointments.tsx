import { createFileRoute } from "@tanstack/react-router";
import { appointments, advisors } from "@/lib/mock-data";
import { Calendar, Clock, User } from "lucide-react";

export const Route = createFileRoute("/admin/appointments")({
  component: AppointmentsPage,
});

const DAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const HOURS = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"];

function AppointmentsPage() {
  // map fake placements
  const slots: Record<string, { client: string; type: string } | null> = {
    "Lun-09:00": { client: "Omar Cherkaoui", type: "Habitation" },
    "Mar-11:00": { client: "Fatima Zahra", type: "Pro" },
    "Mer-15:00": { client: "Anas Belkadi", type: "Voyage" },
    "Jeu-14:00": { client: "Sophie Martin", type: "Auto" },
    "Ven-10:00": { client: "Yasmine Tazi", type: "Santé" },
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Rendez-vous</h1>
          <p className="text-sm text-muted-foreground">Calendrier synchronisé avec Google Calendar.</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-success bg-success/10 px-3 py-1.5 rounded-lg">
          <span className="size-2 rounded-full bg-success animate-pulse" /> Google Calendar synchronisé
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card rounded-2xl border border-border shadow-soft p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Semaine du 9 juin 2026</h2>
            <div className="flex gap-1">
              <button className="px-3 py-1 rounded-md bg-secondary text-xs">‹</button>
              <button className="px-3 py-1 rounded-md gradient-primary text-primary-foreground text-xs">Aujourd'hui</button>
              <button className="px-3 py-1 rounded-md bg-secondary text-xs">›</button>
            </div>
          </div>
          <div className="grid grid-cols-8 gap-1 text-xs">
            <div></div>
            {DAYS.map(d => <div key={d} className="text-center font-semibold py-2 text-muted-foreground">{d}</div>)}
            {HOURS.map(h => (
              <>
                <div key={h} className="text-right pr-2 py-3 text-muted-foreground">{h}</div>
                {DAYS.map(d => {
                  const slot = slots[`${d}-${h}`];
                  return (
                    <div key={`${d}-${h}`} className="border border-border/50 rounded-md min-h-[48px] p-1">
                      {slot && (
                        <div className="h-full rounded-md gradient-primary text-primary-foreground p-1.5 text-[10px] leading-tight">
                          <div className="font-semibold truncate">{slot.client}</div>
                          <div className="opacity-90 truncate">{slot.type}</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border shadow-soft p-5">
          <h2 className="font-semibold mb-4">Conseillers disponibles</h2>
          <div className="space-y-3">
            {advisors.map(a => (
              <div key={a.id} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50">
                <div className="size-10 rounded-full gradient-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                  {a.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">{a.name}</div>
                  <div className="text-xs text-muted-foreground">{a.role}</div>
                </div>
                <span className={`size-2 rounded-full ${a.status === "En ligne" ? "bg-success animate-pulse" : "bg-muted-foreground/40"}`} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border shadow-soft">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <h2 className="font-semibold">Liste des rendez-vous</h2>
        </div>
        <table className="w-full text-sm">
          <thead className="text-xs uppercase tracking-wider text-muted-foreground bg-secondary/50">
            <tr>
              <th className="text-left px-5 py-3">Client</th>
              <th className="text-left px-5 py-3">Conseiller</th>
              <th className="text-left px-5 py-3">Type</th>
              <th className="text-left px-5 py-3">Date</th>
              <th className="text-left px-5 py-3">Statut</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {appointments.map(a => (
              <tr key={a.id} className="hover:bg-secondary/30 transition">
                <td className="px-5 py-3 font-medium flex items-center gap-2"><User className="size-3.5 text-muted-foreground" />{a.client}</td>
                <td className="px-5 py-3 text-muted-foreground">{a.advisor}</td>
                <td className="px-5 py-3">{a.type}</td>
                <td className="px-5 py-3 flex items-center gap-2"><Calendar className="size-3.5 text-primary" />{a.date} <Clock className="size-3.5 text-muted-foreground ml-1" /> {a.time}</td>
                <td className="px-5 py-3"><span className={`text-[10px] px-2 py-1 rounded-md font-medium ${a.status === "Confirmé" ? "bg-success/10 text-success" : "bg-warning/10 text-warning-foreground"}`}>{a.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
