"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Sparkles,
  Layers,
  MessageSquare,
  Download,
  Play,
  Users,
  ArrowRight,
  Zap,
  Shield,
  Cpu,
  MousePointer2,
  Globe,
  Code2,
  CheckCircle2,
} from "lucide-react";

interface LandingPageProps {
  onStartDesigning: () => void;
  isLoggedIn: boolean;
  onGoToWorkspace: () => void;
}

/* ── Design tokens (mirrors tailwind.config brand.*) ─────── */
const C = {
  bg: "#09090b",
  surface: "#111113",
  border: "#27272a",
  red: "#e60000",
  redDim: "rgba(230,0,0,0.12)",
  redGlow: "rgba(230,0,0,0.35)",
  muted: "#71717a",
  subtle: "#52525b",
};

/* ── Grid Background ─────────────────────────────────────── */
const GridBg = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `linear-gradient(rgba(230,0,0,0.035) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(230,0,0,0.035) 1px, transparent 1px)`,
        backgroundSize: "56px 56px",
      }}
    />
    <div
      className="absolute inset-0"
      style={{
        background: "radial-gradient(ellipse 80% 50% at 50% -10%, transparent 60%, #09090b 100%)",
      }}
    />
    <div
      className="absolute -left-40 -top-40 h-[700px] w-[700px] rounded-full"
      style={{ background: "radial-gradient(circle, rgba(230,0,0,0.1) 0%, transparent 70%)" }}
    />
    <div
      className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full"
      style={{ background: "radial-gradient(circle, rgba(230,0,0,0.07) 0%, transparent 70%)" }}
    />
  </div>
);

/* ── Section label ───────────────────────────────────────── */
const SectionTag = ({ icon: Icon, label }: { icon: React.ElementType; label: string }) => (
  <div className="mb-4 flex justify-center">
    <span
      className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.1em]"
      style={{ borderColor: "rgba(230,0,0,0.25)", background: "rgba(230,0,0,0.07)", color: C.red }}
    >
      <Icon className="h-3 w-3" />
      {label}
    </span>
  </div>
);

/* ── Feature card ─────────────────────────────────────────── */
const FeatureCard = ({
  icon: Icon,
  title,
  desc,
  primary,
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
  primary?: boolean;
}) => (
  <div
    className="group relative overflow-hidden rounded-2xl border p-6 transition-all duration-400 hover:-translate-y-1"
    style={{
      borderColor: primary ? "rgba(230,0,0,0.4)" : C.border,
      background: primary
        ? "linear-gradient(135deg, rgba(230,0,0,0.08) 0%, #0d0d0f 100%)"
        : C.surface,
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = "rgba(230,0,0,0.35)";
      e.currentTarget.style.boxShadow = "0 0 30px rgba(230,0,0,0.08)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = primary ? "rgba(230,0,0,0.4)" : C.border;
      e.currentTarget.style.boxShadow = "none";
    }}
  >
    {/* top shimmer */}
    <div
      className="absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      style={{ background: "linear-gradient(90deg, transparent, #e60000, transparent)" }}
    />
    <div
      className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl transition-colors duration-300"
      style={{
        background: primary ? C.red : "rgba(255,255,255,0.05)",
        color: primary ? "#fff" : C.red,
      }}
    >
      <Icon className="h-5 w-5" />
    </div>
    <h3 className="mb-2 text-[15px] font-bold text-white">{title}</h3>
    <p className="text-[13px] leading-relaxed" style={{ color: C.muted }}>
      {desc}
    </p>
  </div>
);

/* ── Step ────────────────────────────────────────────────── */
const Step = ({ num, title, desc }: { num: string; title: string; desc: string }) => (
  <div className="group flex gap-4">
    <div className="flex flex-col items-center">
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm font-bold transition-all duration-300 group-hover:text-white"
        style={{ borderColor: C.red, color: C.red, background: "rgba(230,0,0,0.08)" }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = C.red;
          e.currentTarget.style.color = "#fff";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(230,0,0,0.08)";
          e.currentTarget.style.color = C.red;
        }}
      >
        {num}
      </div>
      <div
        className="mt-2 w-px flex-1"
        style={{ background: "linear-gradient(to bottom, rgba(230,0,0,0.3), transparent)" }}
      />
    </div>
    <div className="pb-8 pt-1">
      <p className="mb-1 text-[15px] font-bold text-white">{title}</p>
      <p className="text-[13px] leading-relaxed" style={{ color: C.muted }}>
        {desc}
      </p>
    </div>
  </div>
);

/* ── Counter ─────────────────────────────────────────────── */
const Stat = ({ val, label }: { val: string; label: string }) => (
  <div className="flex flex-col items-center gap-1">
    <span className="text-4xl font-black text-white">{val}</span>
    <span className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: C.muted }}>
      {label}
    </span>
  </div>
);

/* ── Main ────────────────────────────────────────────────── */
export const LandingPage: React.FC<LandingPageProps> = ({
  onStartDesigning,
  isLoggedIn,
  onGoToWorkspace,
}) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const cta = isLoggedIn ? onGoToWorkspace : onStartDesigning;
  const ctaLabel = isLoggedIn ? "Go to Workspace" : "Start Designing";

  return (
    <div
      className="min-h-screen overflow-x-hidden font-sans text-white selection:text-white"
      style={{ background: C.bg, WebkitFontSmoothing: "antialiased" }}
    >
      {/* ── NAVBAR ── */}
      <header
        className="sticky top-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(9,9,11,0.92)" : "transparent",
          borderBottom: scrolled ? `1px solid ${C.border}` : "1px solid transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          boxShadow: scrolled ? "0 1px 0 rgba(255,255,255,0.03)" : "none",
        }}
      >
        <div className="mx-auto flex h-[60px] max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Image src="/logo.svg" alt="FigPro" width={72} height={24} className="object-contain" />
            <span
              className="rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
              style={{ borderColor: "rgba(230,0,0,0.3)", background: "rgba(230,0,0,0.07)", color: C.red }}
            >
              v1.0
            </span>
          </div>

          {/* Nav */}
          <nav className="hidden items-center gap-7 text-[13px] font-medium md:flex" style={{ color: C.muted }}>
            {["Features", "How it works", "Export"].map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase().replace(/ /g, "-")}`}
                className="transition-colors hover:text-white"
              >
                {l}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <button
            onClick={cta}
            className="group flex items-center gap-2 rounded-lg px-4 py-2 text-[13px] font-semibold text-white transition-all duration-200"
            style={{ background: C.red, boxShadow: `0 0 16px ${C.redGlow}` }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#cc0000";
              e.currentTarget.style.boxShadow = `0 0 24px ${C.redGlow}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = C.red;
              e.currentTarget.style.boxShadow = `0 0 16px ${C.redGlow}`;
            }}
          >
            {ctaLabel}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
        <GridBg />

        {/* Badge */}
        <div
          className="relative mb-7 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[12px] font-medium"
          style={{
            borderColor: "rgba(230,0,0,0.2)",
            background: "rgba(230,0,0,0.06)",
            color: "rgba(255,255,255,0.7)",
            backdropFilter: "blur(8px)",
          }}
        >
          <Sparkles className="h-3.5 w-3.5 animate-pulse" style={{ color: C.red }} />
          Real-time collaborative canvas &nbsp;·&nbsp; Powered by Liveblocks
          <span
            className="absolute -right-1 -top-1 h-2 w-2 rounded-full animate-ping"
            style={{ background: C.red }}
          />
        </div>

        {/* Headline */}
        <h1 className="relative max-w-5xl text-5xl font-black leading-[1.05] tracking-[-0.03em] lg:text-7xl xl:text-[82px]">
          Design,{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: `linear-gradient(135deg, #fff 0%, #ffaaaa 50%, ${C.red} 100%)` }}
          >
            collaborate
          </span>
          ,
          <br />
          and ship — together.
        </h1>

        {/* Sub */}
        <p
          className="relative mt-7 max-w-2xl text-[17px] leading-relaxed"
          style={{ color: C.muted }}
        >
          A minimalist, blazing-fast Figma clone built with{" "}
          <span className="font-semibold text-white">Next.js 16</span>,{" "}
          <span className="font-semibold text-white">Fabric.js</span> &amp;{" "}
          <span className="font-semibold text-white">Liveblocks</span>. Draw, annotate,
          and export — in real time with your entire team.
        </p>

        {/* CTAs */}
        <div className="relative mt-9 flex flex-col items-center gap-3 sm:flex-row">
          <button
            id="hero-primary-cta"
            onClick={cta}
            className="group flex items-center gap-2.5 rounded-xl px-8 py-3.5 text-[15px] font-bold text-white transition-all duration-200"
            style={{
              background: C.red,
              boxShadow: `0 0 28px rgba(230,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#cc0000";
              e.currentTarget.style.transform = "scale(1.02)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = C.red;
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <Play className="h-4 w-4 fill-white" />
            {ctaLabel} — It's Free
          </button>
        </div>

        {/* Social proof */}
        <div className="relative mt-10 flex items-center gap-3 text-[13px]" style={{ color: C.subtle }}>
          <div className="flex -space-x-2">
            {["#e60000", "#f97316", "#eab308", "#22c55e"].map((c, i) => (
              <div
                key={i}
                className="h-7 w-7 rounded-full border-2"
                style={{ background: c, borderColor: C.bg, opacity: 0.85 }}
              />
            ))}
          </div>
          <span>
            <span className="font-semibold text-white">2,400+</span> designers collaborating now
          </span>
          <span className="flex items-center gap-1.5" style={{ color: "#4ade80" }}>
            <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
            Live
          </span>
        </div>

        {/* Canvas preview */}
        <div className="relative mt-20 w-full max-w-5xl">
          <div
            className="absolute -inset-6 rounded-3xl"
            style={{ background: "radial-gradient(ellipse at center, rgba(230,0,0,0.12) 0%, transparent 70%)" }}
          />
          <div
            className="relative overflow-hidden rounded-2xl border"
            style={{
              borderColor: C.border,
              background: C.surface,
              boxShadow: `0 0 0 1px rgba(255,255,255,0.04), 0 40px 80px rgba(0,0,0,0.8)`,
            }}
          >
            {/* Fake browser bar */}
            <div
              className="flex items-center gap-2 border-b px-4 py-2.5"
              style={{ borderColor: C.border, background: "rgba(9,9,11,0.8)" }}
            >
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
              </div>
              <div
                className="ml-3 flex-1 rounded-md px-3 py-1 text-[11px]"
                style={{ background: "rgba(255,255,255,0.05)", color: C.subtle }}
              >
                figpro.design/canvas/main · 4 collaborators
              </div>
            </div>
            <Image
              src="/images/img3.png"
              alt="FigPro workspace preview"
              width={1200}
              height={675}
              className="w-full object-cover"
              style={{ opacity: 0.85 }}
            />
            {/* Live badge */}
            <div
              className="absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border px-5 py-2 text-[12px] backdrop-blur-md flex items-center gap-2"
              style={{
                borderColor: C.border,
                background: "rgba(9,9,11,0.85)",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              <Users className="h-3.5 w-3.5" style={{ color: C.red }} />
              Mahesh and 3 others are editing · synced
              <span className="h-1.5 w-1.5 rounded-full animate-ping" style={{ background: C.red }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, background: "#0d0d0f" }} className="py-14">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-10 px-6 sm:grid-cols-4">
          <Stat val="2.4K+" label="Active Users" />
          <Stat val="50ms" label="Sync Latency" />
          <Stat val="∞" label="Canvas Size" />
          <Stat val="99.9%" label="Uptime" />
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="relative overflow-hidden px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <SectionTag icon={Zap} label="Features" />
          <h2 className="mb-4 text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
            Everything you need to{" "}
            <span style={{ color: C.red }}>create &amp; ship</span>
          </h2>
          <p className="mx-auto mb-16 max-w-lg text-center text-[14px]" style={{ color: C.muted }}>
            Built from the ground up for speed, real-time collaboration, and a zero-friction design experience.
          </p>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={Users}
              title="Real-Time Presence"
              desc="See every collaborator's cursor, selection, and edits as they happen — zero lag, fully synced via Liveblocks."
              primary
            />
            <FeatureCard
              icon={Layers}
              title="Layer Management"
              desc="Shapes, freehand paths, text, and imported images all live in a powerful layered canvas."
            />
            <FeatureCard
              icon={MessageSquare}
              title="Threaded Comments"
              desc="Pin comments directly on canvas elements. Review, resolve, and iterate without leaving the app."
            />
            <FeatureCard
              icon={Download}
              title="PDF Export"
              desc="One-click export of your entire canvas to a crisp, print-ready PDF document."
            />
            <FeatureCard
              icon={Shield}
              title="Secure by Default"
              desc="All sessions are encrypted. Room access is scoped per-user with Liveblocks auth tokens."
            />
            <FeatureCard
              icon={Cpu}
              title="GPU-Accelerated"
              desc="Fabric.js renders on HTML5 canvas with smooth 60fps performance — no matter the complexity."
              primary
            />
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section
        id="how-it-works"
        className="px-6 py-28"
        style={{ borderTop: `1px solid ${C.border}`, background: "#0d0d0f" }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            {/* Steps */}
            <div>
              <SectionTag icon={Code2} label="Workflow" />
              <h2 className="mb-10 text-4xl font-extrabold tracking-tight lg:text-5xl">
                From idea to canvas{" "}
                <span style={{ color: C.red }}>in seconds</span>
              </h2>
              <Step num="01" title="Sign In" desc="Authenticate with your credentials. Your session persists securely." />
              <Step num="02" title="Open Canvas" desc="Instantly load a shared workspace — no setup, no configuration." />
              <Step num="03" title="Design Together" desc="Draw, type, upload images, and comment with teammates in real time." />
              <Step num="04" title="Export & Share" desc="Export to PDF or share a link. Auto-saved, always up to date." />
            </div>

            {/* Code preview */}
            <div className="flex items-center justify-center">
              <div
                className="w-full max-w-md overflow-hidden rounded-2xl border"
                style={{
                  borderColor: C.border,
                  background: C.surface,
                  boxShadow: "0 0 60px rgba(0,0,0,0.5)",
                }}
              >
                <div
                  className="flex items-center gap-2 border-b px-4 py-3"
                  style={{ borderColor: C.border, background: "rgba(9,9,11,0.6)" }}
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                  <span className="ml-2 text-[11px]" style={{ color: C.subtle }}>sync.ts</span>
                </div>
                <pre className="overflow-x-auto p-5 text-[12px] leading-[1.9]" style={{ color: "#d4d4d8" }}>
                  <code>
                    <span style={{ color: C.subtle }}>{"// Real-time shape sync"}</span>{"\n"}
                    <span style={{ color: C.red }}>const</span>{" "}
                    <span style={{ color: "#93c5fd" }}>syncShape</span>{" = "}
                    <span style={{ color: C.red }}>useMutation</span>
                    {"(({"}{"\n"}
                    {"  storage"}
                    {"\n"}{" "}{" "}{" "}{" "}{"}, shape) => {"}{"\n"}
                    {"  storage"}{"\n"}
                    {"    .get("}
                    <span style={{ color: "#86efac" }}>'canvasObjects'</span>
                    {")"}{"\n"}
                    {"    .set(shape.id, shape);"}{"\n"}
                    {"}, []);"}{"\n\n"}
                    <span style={{ color: C.subtle }}>{"// 🔴 Broadcast to all clients"}</span>
                  </code>
                </pre>
                <div
                  className="flex items-center justify-between border-t px-4 py-2 text-[11px]"
                  style={{ borderColor: C.border, background: "rgba(9,9,11,0.4)", color: C.subtle }}
                >
                  <span>TypeScript · Next.js 16</span>
                  <span className="flex items-center gap-1.5 text-green-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                    Connected
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section className="px-6 py-16" style={{ borderTop: `1px solid ${C.border}` }}>
        <div className="mx-auto max-w-5xl text-center">
          <p className="mb-8 text-[11px] font-semibold uppercase tracking-[0.15em]" style={{ color: C.subtle }}>
            Built with industry-grade technologies
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { label: "Next.js 16", color: "#fff" },
              { label: "Fabric.js", color: "#93c5fd" },
              { label: "Liveblocks", color: C.red },
              { label: "TypeScript", color: "#7dd3fc" },
              { label: "Tailwind CSS", color: "#67e8f9" },
              { label: "jsPDF", color: "#fb923c" },
            ].map((t) => (
              <span
                key={t.label}
                className="rounded-lg border px-4 py-2 text-[13px] font-semibold transition-all duration-200"
                style={{ borderColor: C.border, background: C.surface, color: t.color }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#3f3f46";
                  e.currentTarget.style.background = "#18181b";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = C.border;
                  e.currentTarget.style.background = C.surface;
                }}
              >
                {t.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="px-6 py-20">
        <div
          className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border p-14 text-center"
          style={{
            borderColor: "rgba(230,0,0,0.2)",
            background: "linear-gradient(135deg, rgba(230,0,0,0.08) 0%, #0d0d0f 60%, #0d0d0f 100%)",
            boxShadow: "0 0 80px rgba(230,0,0,0.08), 0 0 0 1px rgba(255,255,255,0.03)",
          }}
        >
          <div
            className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(230,0,0,0.15) 0%, transparent 70%)" }}
          />
          <Globe className="mx-auto mb-4 h-10 w-10" style={{ color: C.red }} />
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Ready to collaborate?
          </h2>
          <p className="mb-8 text-[15px]" style={{ color: C.muted }}>
            Jump into the canvas. No credit card. No setup. Just pure design.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <button
              onClick={cta}
              className="group flex items-center gap-2 rounded-xl px-8 py-3.5 text-[15px] font-bold text-white transition-all duration-200"
              style={{
                background: C.red,
                boxShadow: `0 0 28px rgba(230,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#cc0000";
                e.currentTarget.style.transform = "scale(1.03)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = C.red;
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              {isLoggedIn ? "Open Workspace" : "Get Started Free"}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        className="px-6 py-10"
        style={{ borderTop: `1px solid ${C.border}`, background: C.surface }}
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 sm:flex-row">
          <div className="flex items-center gap-3">
            <Image src="/logo.svg" alt="FigPro" width={64} height={22} className="object-contain" />
            <span className="text-[12px]" style={{ color: C.subtle }}>© 2026 · MIT License</span>
          </div>
          <div className="flex items-center gap-7 text-[13px]" style={{ color: C.subtle }}>
            {["Terms", "Privacy", "Real-time Collab"].map((l) => (
              <a
                key={l}
                href="#"
                className="transition-colors"
                onMouseEnter={(e) => (e.currentTarget.style.color = C.red)}
                onMouseLeave={(e) => (e.currentTarget.style.color = C.subtle)}
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};
