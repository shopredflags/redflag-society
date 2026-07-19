import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  component: ComingSoon,
});

const LAUNCH = new Date("2026-08-01T09:00:00-05:00").getTime();

function useCountdown() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, LAUNCH - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff / 3600000) % 24);
  const m = Math.floor((diff / 60000) % 60);
  const s = Math.floor((diff / 1000) % 60);
  return { d, h, m, s };
}

function Flag({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="1.5" height="28" fill="currentColor" />
      <path d="M3.5 3h14l-3 5 3 5h-14V3z" fill="currentColor" />
    </svg>
  );
}

function CountBox({ value, label }: { value: number; label: string }) {
  const str = String(value).padStart(2, "0");
  return (
    <div className="flex flex-col items-center">
      <div className="relative min-w-[72px] sm:min-w-[110px] px-3 sm:px-5 py-3 sm:py-5 bg-card border border-border rounded-md shadow-[var(--shadow-elegant)]">
        <span className="font-display text-4xl sm:text-6xl leading-none tracking-tight">{str}</span>
        <span className="absolute inset-x-0 top-1/2 h-px bg-background/60" />
      </div>
      <span className="mt-2 text-[10px] sm:text-xs uppercase tracking-[0.25em] text-muted-foreground">{label}</span>
    </div>
  );
}

function ComingSoon() {
  const { d, h, m, s } = useCountdown();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "ok">("idle");

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    // TODO: wire to Shopify/Klaviyo when store goes live
    setStatus("ok");
    setEmail("");
  }

  const collections = [
    { name: "Signature Scarves", note: "The red flag print, everywhere" },
    { name: "Statement Apparel", note: "Hoodies, tees, sweats" },
    { name: "The Receipts Journal", note: "Your memory. Your proof." },
    { name: "Red Flag Jewelry", note: "Wear the sign" },
    { name: "Stickers & Keychains", note: "Small flex, loud message" },
    { name: "Pet Line", note: "Ramsey approved" },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Hero background */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="Red Flags — a woman in a red flag scarf at a dim bar"
          width={1600}
          height={1200}
          className="h-full w-full object-cover object-center opacity-70"
        />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <div className="absolute inset-0 flag-pattern opacity-[0.07]" />
      </div>

      <div className="relative z-10">
        {/* Nav */}
        <header className="flex items-center justify-between px-6 sm:px-10 py-6">
          <div className="flex items-center gap-2">
            <Flag className="w-4 h-6 text-primary" style={{ animation: "flag-wave 3s ease-in-out infinite" }} />
            <span className="font-display text-xl tracking-widest">RED FLAGS</span>
          </div>
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground hidden sm:block">
            Est. 2026 — Coming Soon
          </span>
        </header>

        {/* Hero */}
        <section className="px-6 sm:px-10 pt-8 sm:pt-20 pb-16 max-w-5xl mx-auto text-center">
          <p className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.35em] text-primary mb-6" style={{ animation: "pulse-glow 3s ease-in-out infinite" }}>
            <span className="h-px w-8 bg-primary" />
            Launching August 1st
            <span className="h-px w-8 bg-primary" />
          </p>

          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl leading-[0.95] uppercase">
            Turn Hard Lessons
            <br />
            <span className="text-gradient-red">Into Better Instincts.</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
            It started with one red scarf covered in every red flag we ignored. Now it's a movement —
            <span className="text-foreground"> wear the signs, trust your gut, choose better.</span>
          </p>

          {/* Countdown */}
          <div className="mt-12 flex items-center justify-center gap-3 sm:gap-5">
            <CountBox value={d} label="Days" />
            <CountBox value={h} label="Hours" />
            <CountBox value={m} label="Minutes" />
            <CountBox value={s} label="Seconds" />
          </div>

          {/* Email */}
          <form onSubmit={submit} className="mt-12 max-w-lg mx-auto">
            <div className="flex flex-col sm:flex-row gap-3 p-2 sm:p-2 bg-card/80 backdrop-blur border border-border rounded-md">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email — for the first drop"
                className="flex-1 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-primary text-primary-foreground font-semibold uppercase tracking-widest text-xs rounded-sm hover:shadow-[var(--shadow-glow)] transition-shadow"
              >
                Get Early Access
              </button>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              {status === "ok"
                ? "You're on the list. Check your inbox August 1st. 🚩"
                : "New drops weekly. Real talk. No spam. Ever."}
            </p>
          </form>
        </section>

        {/* Collections preview */}
        <section className="px-6 sm:px-10 py-16 border-t border-border bg-background/70 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-xs uppercase tracking-[0.35em] text-primary mb-3">The Drops</p>
              <h2 className="font-display text-3xl sm:text-5xl uppercase">What's Coming</h2>
              <p className="mt-3 text-muted-foreground text-sm">New collection every week starting August 1st</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {collections.map((c, i) => (
                <div
                  key={c.name}
                  className="group relative p-6 border border-border rounded-md bg-card hover:border-primary transition-colors overflow-hidden"
                  style={{ animation: `fade-up 0.6s ease-out ${i * 0.08}s both` }}
                >
                  <Flag className="absolute -right-2 -top-2 w-16 h-20 text-primary/10 group-hover:text-primary/25 transition-colors" />
                  <span className="text-xs text-muted-foreground">0{i + 1}</span>
                  <h3 className="mt-2 font-display text-2xl uppercase">{c.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{c.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Manifesto strip */}
        <section className="px-6 sm:px-10 py-16 border-t border-border">
          <div className="max-w-3xl mx-auto text-center">
            <Flag className="w-8 h-10 text-primary mx-auto mb-6" />
            <p className="font-display text-2xl sm:text-4xl uppercase leading-tight">
              "Some lessons become scars.
              <br />
              <span className="text-gradient-red">Some become style.</span>"
            </p>
            <p className="mt-6 text-sm text-muted-foreground uppercase tracking-[0.3em]">
              Red Flags. Real Talk. Better Choices.
            </p>
          </div>
        </section>

        <footer className="px-6 sm:px-10 py-8 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            © 2026 Red Flags. All rights reserved. — Powered by Shopify & Printify.
          </p>
        </footer>
      </div>
    </main>
  );
}
