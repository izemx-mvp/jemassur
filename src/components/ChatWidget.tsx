import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";

type Msg = { from: "ai" | "user"; text: string };

const SCRIPT: { ai: string; quick?: string[] }[] = [
  { ai: "Bonjour 👋 Je suis Jemma, votre assistante Jemassur. Comment puis-je vous aider aujourd'hui ?", quick: ["Assurance Auto", "Assurance Santé", "Assurance Habitation"] },
  { ai: "Excellent choix ! Pour bien vous orienter, puis-je avoir votre prénom et nom ?" },
  { ai: "Merci ! Pouvez-vous me communiquer votre numéro afin qu'un conseiller vous contacte rapidement ?" },
  { ai: "Parfait ✨ Je vous propose un rendez-vous demain à 14h avec M. Bennani, notre conseiller expert. Cela vous convient ?", quick: ["Oui, parfait", "Un autre créneau"] },
  { ai: "Rendez-vous confirmé ✅ Vous recevrez une confirmation par SMS. Un conseiller Jemassur vous accompagnera à chaque étape. À très vite !" },
];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [messages, setMessages] = useState<Msg[]>([{ from: "ai", text: SCRIPT[0].ai }]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { from: "user", text }]);
    setInput("");
    const next = step + 1;
    if (next < SCRIPT.length) {
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        setMessages((m) => [...m, { from: "ai", text: SCRIPT[next].ai }]);
        setStep(next);
      }, 1200);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 size-16 rounded-full gradient-primary text-primary-foreground shadow-glow flex items-center justify-center hover:scale-110 transition-transform animate-pulse-ring"
        aria-label="Ouvrir le chat"
      >
        {open ? <X className="size-6" /> : <MessageCircle className="size-7" />}
      </button>

      {open && (
        <div className="fixed bottom-26 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[560px] max-h-[calc(100vh-8rem)] rounded-2xl glass shadow-elegant flex flex-col overflow-hidden animate-slide-up">
          <div className="gradient-primary text-primary-foreground p-4 flex items-center gap-3">
            <div className="size-10 rounded-full bg-white/20 flex items-center justify-center">
              <Sparkles className="size-5" />
            </div>
            <div className="flex-1">
              <div className="font-semibold flex items-center gap-2">Jemma <span className="text-xs font-normal opacity-80">Assistant IA</span></div>
              <div className="text-xs flex items-center gap-1.5 opacity-90">
                <span className="size-2 rounded-full bg-green-400 animate-pulse" /> En ligne
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-transparent to-secondary/40">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"} animate-slide-up`}>
                <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${m.from === "user" ? "gradient-primary text-primary-foreground rounded-br-sm" : "bg-card text-card-foreground rounded-bl-sm shadow-soft"}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="bg-card rounded-2xl rounded-bl-sm px-4 py-3 shadow-soft flex gap-1">
                  <span className="size-2 rounded-full bg-primary/60" style={{ animation: "typing 1.2s infinite", animationDelay: "0s" }} />
                  <span className="size-2 rounded-full bg-primary/60" style={{ animation: "typing 1.2s infinite", animationDelay: "0.2s" }} />
                  <span className="size-2 rounded-full bg-primary/60" style={{ animation: "typing 1.2s infinite", animationDelay: "0.4s" }} />
                </div>
              </div>
            )}
            {SCRIPT[step]?.quick && !typing && (
              <div className="flex flex-wrap gap-2 pt-1">
                {SCRIPT[step].quick!.map((q) => (
                  <button key={q} onClick={() => send(q)} className="text-xs px-3 py-1.5 rounded-full bg-card border border-border hover:border-primary hover:text-primary transition">
                    {q}
                  </button>
                ))}
              </div>
            )}
            <div ref={endRef} />
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); send(input); }}
            className="p-3 border-t border-border bg-card flex gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Écrivez votre message…"
              className="flex-1 px-4 py-2 rounded-full bg-secondary text-sm outline-none focus:ring-2 ring-primary/40"
            />
            <button type="submit" className="size-10 rounded-full gradient-primary text-primary-foreground flex items-center justify-center hover:scale-105 transition">
              <Send className="size-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
