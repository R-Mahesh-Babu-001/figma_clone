"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Lock, Mail, User, Eye, EyeOff, Sparkles, ArrowLeft } from "lucide-react";

interface AuthPageProps {
  onSuccess: (username: string) => void;
  onBack: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onSuccess, onBack }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Email is required.");
      return;
    }
    if (!password) {
      setError("Password is required.");
      return;
    }
    if (!isLogin && !username) {
      setError("Username is required.");
      return;
    }

    // Mock successful auth
    const finalName = isLogin ? (email.split("@")[0] || "Designer") : username;
    onSuccess(finalName);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center font-sans p-6 select-none relative selection:bg-primary-green selection:text-white">
      {/* Background glow */}
      <div className="absolute w-[40vw] h-[40vw] rounded-full bg-primary-green/10 blur-[120px] pointer-events-none" />

      {/* Back button */}
      <button
        onClick={onBack}
        className="absolute top-8 left-8 flex items-center gap-2 text-primary-grey-300 hover:text-primary-green transition-colors text-sm font-semibold"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </button>

      <div className="w-full max-w-md bg-primary-grey-200 border border-primary-grey-100 rounded-xl p-8 shadow-2xl relative overflow-hidden">
        {/* Subtle decorative bar */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary-green to-primary-darkRed" />

        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <Image src="/logo.svg" alt="FigPro Logo" width={80} height={28} className="object-contain mb-4" />
          <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            {isLogin ? "Welcome Back" : "Create Account"}
            <Sparkles className="w-4 h-4 text-primary-green" />
          </h2>
          <p className="text-primary-grey-300 text-sm mt-1.5 text-center">
            {isLogin
              ? "Sign in to access your collaborative design workspaces."
              : "Register to start designing and drawing in real-time."}
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3 rounded-md bg-primary-darkRed border border-primary-green/20 text-primary-green text-xs font-semibold">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-primary-grey-300 font-semibold">Username</label>
              <div className="relative flex items-center">
                <User className="absolute left-3 w-4 h-4 text-primary-grey-300 pointer-events-none" />
                <input
                  type="text"
                  placeholder="DesignPro"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full h-11 pl-10 pr-4 rounded-md border border-primary-grey-100 bg-black/60 outline-none text-white text-sm focus:border-primary-green transition-all placeholder:text-zinc-600 focus:ring-1 focus:ring-primary-green"
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-primary-grey-300 font-semibold">Email Address</label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3 w-4 h-4 text-primary-grey-300 pointer-events-none" />
              <input
                type="email"
                placeholder="you@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 pl-10 pr-4 rounded-md border border-primary-grey-100 bg-black/60 outline-none text-white text-sm focus:border-primary-green transition-all placeholder:text-zinc-600 focus:ring-1 focus:ring-primary-green"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-primary-grey-300 font-semibold">Password</label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3 w-4 h-4 text-primary-grey-300 pointer-events-none" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-11 pl-10 pr-10 rounded-md border border-primary-grey-100 bg-black/60 outline-none text-white text-sm focus:border-primary-green transition-all placeholder:text-zinc-600 focus:ring-1 focus:ring-primary-green"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-primary-grey-300 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-11 bg-primary-green text-black font-bold rounded-md hover:bg-red-500 transition-all duration-300 shadow-[0_0_15px_rgba(230,0,0,0.2)] hover:shadow-[0_0_25px_rgba(230,0,0,0.4)] mt-6"
          >
            {isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>

        {/* Footer Toggle */}
        <div className="mt-6 text-center text-xs text-primary-grey-300">
          {isLogin ? (
            <span>
              Don't have an account?{" "}
              <button
                onClick={() => setIsLogin(false)}
                className="text-primary-green font-bold hover:underline"
              >
                Sign Up
              </button>
            </span>
          ) : (
            <span>
              Already have an account?{" "}
              <button
                onClick={() => setIsLogin(true)}
                className="text-primary-green font-bold hover:underline"
              >
                Sign In
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
