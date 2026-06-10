import { createFileRoute, Link } from "@tanstack/react-router";
import { ChatWidget } from "@/components/ChatWidget";
import { Logo } from "@/components/Logo";
import {
  Sparkles, Bot, Users, Bell, Calendar, Shield, ArrowRight, Check,
  MessageSquare, Zap, BarChart3, Globe, Cpu, HeartHandshake,
} from "lucide-react";
import { insuranceProducts } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jemassur – Assistant IA pour l'assurance" },
      { name: "description", content: "Plateforme conversationnelle IA + supervision humaine pour qualifier vos leads et automatiser la prise de rendez-vous." },
      { property: "og:title", content: "Jemassur – Assistant IA pour l'assurance" },
      { property: "og:description", content: "IA conversationnelle, notifications temps réel et prise de RDV pour les assureurs modernes." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen gradient-hero text-foreground">
      <Header />
      <Hero />
      <Trust />
      <AIPresentation />
      <Workflow />
      <Benefits />
      <Features />
      <ChatPreview />
      <Pricing />
      <CTA />
      <Footer />
      <ChatWidget />
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 glass border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Logo className="h-9" />
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition">Fonctionnalités</a>
          <a href="#workflow" className="hover:text-foreground transition">Workflow</a>
          <a href="#pricing" className="hover:text-foreground transition">Tarifs</a>
          <Link to="/admin" className="hover:text-foreground transition">Admin</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/admin" className="hidden sm:inline-flex text-sm px-4 py-2 rounded-lg border border-border hover:bg-secondary transition">
            Espace Admin
          </Link>
          <a href="#cta" className="text-sm px-4 py-2 rounded-lg gradient-primary text-primary-foreground shadow-soft hover:shadow-glow transition">
            Demander une démo
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 -left-20 size-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute top-40 right-0 size-96 rounded-full bg-primary-glow/20 blur-3xl" />
      </div>
      <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium text-primary mb-6">
            <Sparkles className="size-3.5" /> Nouvelle génération d'assurance conversationnelle
          </div>
          <h1 className="text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight">
            L'assistant <span className="gradient-text">IA</span> qui transforme vos visiteurs en clients.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl">
            Jemassur combine intelligence artificielle et supervision humaine pour qualifier vos leads,
            réserver des rendez-vous et notifier vos conseillers en temps réel — 24h/24.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#cta" className="px-6 py-3 rounded-xl gradient-primary text-primary-foreground font-medium shadow-elegant hover:shadow-glow transition inline-flex items-center gap-2">
              Demander une démo <ArrowRight className="size-4" />
            </a>
            <Link to="/admin" className="px-6 py-3 rounded-xl glass border border-border font-medium hover:bg-secondary transition">
              Voir la plateforme admin
            </Link>
          </div>
          <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2"><Check className="size-4 text-success" /> Sans engagement</div>
            <div className="flex items-center gap-2"><Check className="size-4 text-success" /> Installation rapide</div>
            <div className="flex items-center gap-2"><Check className="size-4 text-success" /> Support inclus</div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 gradient-primary opacity-20 blur-3xl rounded-full" />
          <div className="relative glass rounded-3xl shadow-elegant p-6 animate-float">
            <div className="flex items-center gap-3 mb-4">
              <div className="size-10 rounded-full gradient-primary flex items-center justify-center text-white">
                <Bot className="size-5" />
              </div>
              <div>
                <div className="font-semibold text-sm">Jemma — Assistant IA</div>
                <div className="text-xs text-success flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-success animate-pulse" /> En ligne</div>
              </div>
            </div>
            <div className="space-y-3">
              <Bubble from="ai">Bonjour 👋 Je suis Jemma. Quel type d'assurance recherchez-vous ?</Bubble>
              <Bubble from="user">Une assurance auto tous risques pour ma Peugeot.</Bubble>
              <Bubble from="ai">Parfait ! Pouvez-vous me donner votre prénom et nom ?</Bubble>
              <Bubble from="user">Sophie Martin</Bubble>
              <Bubble from="ai">Merci Sophie ✨ Un conseiller peut vous appeler. Votre numéro ?</Bubble>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <span className="px-2 py-1 rounded-md bg-success/10 text-success font-medium">Lead qualifié</span>
              <span className="px-2 py-1 rounded-md bg-primary/10 text-primary font-medium">RDV proposé</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Bubble({ from, children }: { from: "ai" | "user"; children: React.ReactNode }) {
  return (
    <div className={`flex ${from === "user" ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${from === "user" ? "gradient-primary text-primary-foreground rounded-br-sm" : "bg-card rounded-bl-sm shadow-soft"}`}>
        {children}
      </div>
    </div>
  );
}

function Trust() {
  return (
    <section className="border-y border-border/50 bg-white/40 backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {[
          { v: "+48%", l: "Taux de conversion" },
          { v: "24/7", l: "Disponibilité IA" },
          { v: "<2s", l: "Temps de réponse" },
          { v: "FR/AR", l: "Multilingue" },
        ].map((s) => (
          <div key={s.l}>
            <div className="text-3xl font-bold gradient-text">{s.v}</div>
            <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function AIPresentation() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">Assistant IA Jemma</div>
        <h2 className="text-4xl font-bold">Une IA pensée pour l'assurance</h2>
        <p className="mt-4 text-muted-foreground">Jemma comprend les besoins de vos visiteurs, qualifie les leads et oriente vers le bon conseiller, automatiquement.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { icon: Bot, title: "Réponses automatiques", desc: "Répond aux questions fréquentes 24h/24 dans un français naturel." },
          { icon: HeartHandshake, title: "Qualification intelligente", desc: "Collecte les informations clés : nom, téléphone, type d'assurance." },
          { icon: Calendar, title: "Prise de RDV automatique", desc: "Propose des créneaux et synchronise avec Google Calendar." },
        ].map((f) => (
          <div key={f.title} className="glass rounded-2xl p-6 shadow-soft hover:shadow-elegant transition group">
            <div className="size-12 rounded-xl gradient-primary text-primary-foreground flex items-center justify-center mb-4 group-hover:scale-110 transition">
              <f.icon className="size-6" />
            </div>
            <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Workflow() {
  const steps = [
    { icon: Globe, title: "Visiteur", desc: "Arrive sur votre site" },
    { icon: Bot, title: "IA Jemma", desc: "Engage la conversation" },
    { icon: Sparkles, title: "Qualification", desc: "Collecte les infos" },
    { icon: Bell, title: "Notification Telegram", desc: "Alerte instantanée" },
    { icon: Users, title: "Conseiller", desc: "Reprend si besoin" },
  ];
  return (
    <section id="workflow" className="max-w-7xl mx-auto px-6 py-24">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">Workflow Hybride</div>
        <h2 className="text-4xl font-bold">IA + Humain, le meilleur des deux mondes</h2>
        <p className="mt-4 text-muted-foreground">Un parcours fluide où vos conseillers reprennent la main au moment opportun.</p>
      </div>
      <div className="glass rounded-3xl p-8 shadow-elegant">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {steps.map((s, i) => (
            <div key={s.title} className="relative text-center">
              <div className="mx-auto size-14 rounded-2xl gradient-primary text-primary-foreground flex items-center justify-center shadow-soft mb-3">
                <s.icon className="size-6" />
              </div>
              <div className="font-semibold text-sm">{s.title}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.desc}</div>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-7 -right-2 text-primary/40">→</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl font-bold mb-6">Des résultats concrets pour votre cabinet</h2>
          <ul className="space-y-4">
            {[
              "Captez 3× plus de leads qualifiés grâce à un assistant disponible 24h/24",
              "Réduisez le temps de réponse moyen à moins de 2 secondes",
              "Augmentez votre taux de conversion jusqu'à +48%",
              "Libérez vos conseillers des tâches répétitives",
              "Centralisez toutes vos conversations dans un seul tableau de bord",
            ].map((b) => (
              <li key={b} className="flex gap-3">
                <div className="shrink-0 size-6 rounded-full gradient-primary text-primary-foreground flex items-center justify-center">
                  <Check className="size-3.5" />
                </div>
                <span className="text-foreground/90">{b}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {insuranceProducts.slice(0, 4).map((p) => (
            <div key={p.name} className="glass rounded-2xl p-5 shadow-soft hover:-translate-y-1 transition">
              <div className="text-3xl mb-3">{p.icon}</div>
              <div className="font-semibold">{p.name}</div>
              <div className="text-xs text-muted-foreground mt-1">{p.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const items = [
    { icon: MessageSquare, title: "Conversations centralisées", desc: "Toutes vos conversations IA + humaines au même endroit." },
    { icon: Bell, title: "Notifications temps réel", desc: "Alertes Telegram instantanées pour chaque lead." },
    { icon: Calendar, title: "Réservation intégrée", desc: "Synchronisation Google Calendar automatique." },
    { icon: BarChart3, title: "Analytics avancés", desc: "Mesurez vos performances en un coup d'œil." },
    { icon: Cpu, title: "IA configurable", desc: "Personnalisez prompts, scénarios et règles." },
    { icon: Shield, title: "Sécurité entreprise", desc: "Données chiffrées, RGPD compliant." },
  ];
  return (
    <section id="features" className="max-w-7xl mx-auto px-6 py-24">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <h2 className="text-4xl font-bold">Une plateforme complète</h2>
        <p className="mt-4 text-muted-foreground">Tout ce dont votre équipe a besoin pour piloter la relation client.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((f) => (
          <div key={f.title} className="glass rounded-2xl p-6 shadow-soft hover:shadow-elegant transition">
            <f.icon className="size-7 text-primary mb-4" />
            <h3 className="font-semibold mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ChatPreview() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <div className="glass rounded-3xl p-10 md:p-14 shadow-elegant relative overflow-hidden">
        <div className="absolute -top-10 -right-10 size-60 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">Essai interactif</div>
            <h2 className="text-4xl font-bold mb-4">Discutez avec Jemma maintenant</h2>
            <p className="text-muted-foreground mb-6">Cliquez sur la bulle en bas à droite et découvrez une démo interactive de notre IA conversationnelle.</p>
            <div className="flex items-center gap-3">
              <Zap className="size-5 text-primary" />
              <span className="text-sm">Réponse instantanée — animations fluides — collecte automatique</span>
            </div>
          </div>
          <div className="rounded-2xl bg-card p-6 shadow-soft">
            <div className="space-y-3">
              <Bubble from="ai">Bonjour 👋 Comment puis-je vous aider ?</Bubble>
              <Bubble from="user">Je cherche une mutuelle famille.</Bubble>
              <Bubble from="ai">Combien de personnes souhaitez-vous assurer ?</Bubble>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="max-w-5xl mx-auto px-6 py-24">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold">Tarifs transparents</h2>
        <p className="mt-3 text-muted-foreground">Sans surprise, sans engagement.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { name: "Installation", price: "9 000", unit: "MAD HT", desc: "Setup complet, formation incluse" },
          { name: "Abonnement", price: "500", unit: "MAD HT / mois", desc: "Hébergement OFFERT à vie en MVP", highlight: true },
          { name: "Landing Page", price: "1 200", unit: "MAD HT", desc: "Page sur-mesure pour votre marque" },
        ].map((p) => (
          <div key={p.name} className={`rounded-2xl p-8 shadow-soft transition ${p.highlight ? "gradient-primary text-primary-foreground shadow-elegant scale-105" : "glass"}`}>
            <div className={`text-sm font-medium ${p.highlight ? "opacity-90" : "text-muted-foreground"}`}>{p.name}</div>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-4xl font-bold">{p.price}</span>
              <span className={`text-sm ${p.highlight ? "opacity-90" : "text-muted-foreground"}`}>{p.unit}</span>
            </div>
            <p className={`mt-3 text-sm ${p.highlight ? "opacity-90" : "text-muted-foreground"}`}>{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="cta" className="max-w-5xl mx-auto px-6 py-20">
      <div className="rounded-3xl gradient-primary text-primary-foreground p-12 md:p-16 text-center shadow-elegant relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,white,transparent_60%)]" />
        <div className="relative">
          <h2 className="text-4xl font-bold mb-4">Prêt à transformer vos visiteurs en clients ?</h2>
          <p className="opacity-90 max-w-xl mx-auto mb-8">Demandez une démonstration personnalisée et découvrez comment Jemassur peut booster votre cabinet.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="mailto:demo@jemassur.ma" className="px-6 py-3 rounded-xl bg-white text-primary font-medium hover:shadow-glow transition">Demander une démo</a>
            <Link to="/admin" className="px-6 py-3 rounded-xl border border-white/30 hover:bg-white/10 transition">Explorer la plateforme</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/50 bg-white/40 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">
        <div>
          <Logo className="h-8 mb-3" />
          <p className="text-xs text-muted-foreground">Toujours à vos côtés. L'IA au service de l'assurance.</p>
        </div>
        <div>
          <div className="font-semibold text-sm mb-3">Produit</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#features">Fonctionnalités</a></li>
            <li><a href="#pricing">Tarifs</a></li>
            <li><Link to="/admin">Admin</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-sm mb-3">Entreprise</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>À propos</li><li>Contact</li><li>Carrières</li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-sm mb-3">Contact</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>contact@jemassur.ma</li><li>Casablanca, Maroc</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/50 py-4 text-center text-xs text-muted-foreground">
        © 2026 Jemassur — Prototype de démonstration. Version non contractuelle.
      </div>
    </footer>
  );
}
