import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AdminSidebar } from "@/components/AdminSidebar";
import { Bell, Search } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Jemassur Admin" }, { name: "description", content: "Plateforme de supervision Jemassur" }] }),
  component: AdminLayout,
});

function AdminLayout() {
  return (
    <div className="min-h-screen flex bg-secondary/30">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-border bg-card/80 backdrop-blur flex items-center px-6 gap-4 sticky top-0 z-20">
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input placeholder="Rechercher conversation, client…" className="w-full pl-9 pr-3 py-2 rounded-lg bg-secondary text-sm outline-none focus:ring-2 ring-primary/30" />
          </div>
          <button className="relative size-9 rounded-lg bg-secondary hover:bg-accent flex items-center justify-center">
            <Bell className="size-4" />
            <span className="absolute top-1 right-1 size-2 rounded-full bg-destructive" />
          </button>
          <div className="flex items-center gap-2 pl-4 border-l border-border">
            <div className="size-9 rounded-full gradient-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">SB</div>
            <div className="hidden sm:block text-sm leading-tight">
              <div className="font-semibold">Salma Berrada</div>
              <div className="text-xs text-muted-foreground">Administratrice</div>
            </div>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
