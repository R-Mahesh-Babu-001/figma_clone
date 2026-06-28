"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Lock,
  Mail,
  User,
  Eye,
  EyeOff,
  ArrowLeft,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

interface AuthPageProps {
  onSuccess: (username: string) => void;
  onBack: () => void;
}

/* ─── Reusable Input ─────────────────────────────────────── */
const Field = ({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  icon: Icon,
  suffix,
}: {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  icon: React.ElementType;
  suffix?: React.ReactNode;
}) => (
  <div>
    <label
      htmlFor={id}
      className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.1em] text-zinc-400"
    >
      {label}
    </label>
    <div className="relative flex items-center">
      <Icon className="pointer-events-none absolute left-4 h-[15px] w-[15px] text-zinc-500" />
      <input
        id={id}
        type={type}
        autoComplete={type === "password" ? "current-password" : type === "email" ? "email" : "username"}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          h-11 w-full rounded-lg border border-zinc-800 bg-zinc-900
          pl-11 pr-11 text-[13px] text-white
          placeholder:text-zinc-600
          outline-none
          transition-all duration-200
          focus:border-[#e60000]/60
          focus:bg-[#0f0f11]
          focus:ring-2 focus:ring-[#e60000]/15
          hover:border-zinc-700
        "
      />
      {suffix && (
        <div className="absolute right-3.5 flex items-center">{suffix}</div>
      )}
    </div>
  </div>
);

/* ─── Social Button ─────────────────────────────────────── */
/* ─── Bullet ─────────────────────────────────────────────── */
const Bullet = ({ text }: { text: string }) => (
  <div className="flex items-center gap-3">
    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e60000]/15">
      <CheckCircle2 className="h-3 w-3 text-[#e60000]" />
    </div>
    <span className="text-[13px] text-zinc-400">{text}</span>
  </div>
);

/* ─── Main Component ─────────────────────────────────────── */
export const AuthPage: React.FC<AuthPageProps> = ({ onSuccess, onBack }) => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isLogin = mode === "login";

  const reset = (next: "login" | "signup") => {
    setMode(next);
    setError("");
    setEmail("");
    setPassword("");
    setUsername("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) return setError("Email address is required.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return setError("Please enter a valid email address.");
    if (!password) return setError("Password is required.");
    if (password.length < 6)
      return setError("Password must be at least 6 characters long.");
    if (!isLogin && !username.trim())
      return setError("Please choose a username.");

    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);

    const name = isLogin ? email.split("@")[0] || "Designer" : username.trim();
    onSuccess(name);
  };

  return (
    <div
      className="relative flex min-h-screen select-none overflow-hidden font-sans"
      style={{ background: "#09090b" }}
    >
      {/* ══════════════════════════════════════
          LEFT PANEL — Branding
      ══════════════════════════════════════ */}
      <div className="relative hidden w-[52%] flex-col lg:flex" style={{ background: "#0d0d0f" }}>

        {/* Subtle grid */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(230,0,0,0.04) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(230,0,0,0.04) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        {/* Glow orbs */}
        <div className="pointer-events-none absolute -top-60 left-0 h-[700px] w-[700px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(230,0,0,0.08) 0%, transparent 70%)" }} />
        <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(230,0,0,0.05) 0%, transparent 70%)" }} />
        {/* Right edge separator */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-px bg-zinc-800" />

        {/* Content */}
        <div className="relative z-10 flex flex-1 flex-col justify-between p-12 xl:p-16">

          {/* Logo */}
          <div>
            <Image src="/logo.svg" alt="FigPro" width={72} height={24} className="object-contain" />
          </div>

          {/* Hero text */}
          <div className="space-y-10">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#e60000] animate-pulse" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#e60000]">
                  Real-time collaboration
                </span>
              </div>
              <h1 className="text-4xl font-black leading-[1.1] tracking-tight text-white xl:text-5xl">
                Design together,
                <br />
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(135deg, #ffffff 0%, #e60000 100%)" }}
                >
                  ship faster.
                </span>
              </h1>
              <p className="max-w-sm text-[14px] leading-relaxed text-zinc-400">
                A professional Figma-inspired canvas for teams. Draw, comment, and export together — with zero friction.
              </p>
            </div>

            {/* Feature list */}
            <div className="space-y-3">
              <Bullet text="Live cursors & real-time canvas sync" />
              <Bullet text="Shapes, freehand, text & image layers" />
              <Bullet text="Threaded comments pinned to elements" />
              <Bullet text="One-click PDF export" />
              <Bullet text="Secure, session-based collaboration" />
            </div>
          </div>

          {/* Bottom quote */}
          <div className="border-t border-zinc-800/60 pt-6">
            <p className="text-[13px] italic text-zinc-500">
              "The fastest way to go from idea to shipped design."
            </p>
            <p className="mt-1.5 text-[12px] font-semibold text-zinc-600">
              — Mahesh, Lead Designer
            </p>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          RIGHT PANEL — Form
      ══════════════════════════════════════ */}
      <div className="relative flex flex-1 flex-col items-center justify-center px-6 py-16">

        {/* Ambient glow */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, rgba(230,0,0,0.12) 0%, transparent 70%)" }}
        />

        {/* Back button */}
        <button
          onClick={onBack}
          className="absolute left-6 top-6 flex items-center gap-1.5 text-[13px] font-medium text-zinc-500 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </button>

        {/* Mobile logo */}
        <div className="mb-8 lg:hidden">
          <Image src="/logo.svg" alt="FigPro" width={72} height={24} className="object-contain" />
        </div>

        {/* ── Auth Card ── */}
        <div className="relative z-10 w-full max-w-[400px]">

          {/* Top accent line */}
          <div
            className="absolute -top-px inset-x-8 h-[2px] rounded-full"
            style={{ background: "linear-gradient(90deg, transparent, #e60000, transparent)" }}
          />

          <div
            className="rounded-2xl border border-zinc-800 p-8"
            style={{
              background: "linear-gradient(180deg, #111113 0%, #0d0d0f 100%)",
              boxShadow: "0 0 0 1px rgba(255,255,255,0.03), 0 32px 64px rgba(0,0,0,0.6)",
            }}
          >
            {/* Header */}
            <div className="mb-7 text-center">
              <div className="mb-4 flex justify-center lg:hidden">
                {/* mobile — no duplicate logo, already shown above */}
              </div>
              <h2 className="text-[22px] font-bold tracking-tight text-white">
                {isLogin ? "Log in to FigPro" : "Create your account"}
              </h2>
              <p className="mt-1.5 text-[13px] text-zinc-500">
                {isLogin
                  ? "Welcome back! Enter your details below."
                  : "Start designing for free. No credit card needed."}
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-5 flex items-start gap-2.5 rounded-lg border border-[#e60000]/25 bg-[#e60000]/8 px-3.5 py-3 text-[13px] text-red-300">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#e60000]" />
                {error}
              </div>
            )}

            {/* Form fields */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <Field
                  id="username"
                  label="Username"
                  type="text"
                  placeholder="DesignPro"
                  value={username}
                  onChange={setUsername}
                  icon={User}
                />
              )}

              <Field
                id="email"
                label="Email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={setEmail}
                icon={Mail}
              />

              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-[11px] font-semibold uppercase tracking-[0.1em] text-zinc-400"
                  >
                    Password
                  </label>
                  {isLogin && (
                    <button
                      type="button"
                      className="text-[12px] text-zinc-500 transition-colors hover:text-[#e60000]"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <Field
                  id="password"
                  label=""
                  type={showPw ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={setPassword}
                  icon={Lock}
                  suffix={
                    <button
                      type="button"
                      onClick={() => setShowPw((p) => !p)}
                      className="text-zinc-500 transition-colors hover:text-zinc-300"
                    >
                      {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  }
                />
              </div>

              {/* Submit */}
              <button
                id="auth-submit-btn"
                type="submit"
                disabled={loading}
                className="group relative mt-1 flex h-11 w-full items-center justify-center gap-2 overflow-hidden rounded-lg text-[13px] font-semibold text-white transition-all duration-200 disabled:opacity-60"
                style={{
                  background: loading ? "#b30000" : "#e60000",
                  boxShadow: loading ? "none" : "0 0 20px rgba(230,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)",
                }}
                onMouseEnter={(e) => {
                  if (!loading) e.currentTarget.style.background = "#cc0000";
                }}
                onMouseLeave={(e) => {
                  if (!loading) e.currentTarget.style.background = "#e60000";
                }}
              >
                {/* Shimmer */}
                {!loading && (
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                )}

                {loading ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                    {isLogin ? "Signing in…" : "Creating account…"}
                  </>
                ) : (
                  <>
                    {isLogin ? "Log in" : "Create account"}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </form>

            {/* Guest */}
            <button
              type="button"
              onClick={() => onSuccess("Guest")}
              className="mt-3 flex h-11 w-full items-center justify-center rounded-lg border border-zinc-800 bg-transparent text-[13px] font-medium text-zinc-400 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900/60 hover:text-zinc-300"
            >
              Continue as Guest
            </button>

            {/* Mode toggle */}
            <p className="mt-5 text-center text-[13px] text-zinc-500">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => reset(isLogin ? "signup" : "login")}
                className="font-semibold text-white transition-colors hover:text-[#e60000]"
              >
                {isLogin ? "Sign up" : "Log in"}
              </button>
            </p>
          </div>

          {/* Legal */}
          <p className="mt-6 text-center text-[11px] leading-relaxed text-zinc-600">
            By continuing, you agree to our{" "}
            <a href="#" className="underline underline-offset-2 transition-colors hover:text-zinc-400">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="underline underline-offset-2 transition-colors hover:text-zinc-400">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};
