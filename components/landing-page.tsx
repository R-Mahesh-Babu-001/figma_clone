"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, Layers, MessageSquare, Download, Play, Users, ArrowRight } from "lucide-react";

interface LandingPageProps {
  onStartDesigning: () => void;
  isLoggedIn: boolean;
  onGoToWorkspace: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartDesigning,
  isLoggedIn,
  onGoToWorkspace,
}) => {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden flex flex-col font-sans select-none selection:bg-primary-green selection:text-white">
      {/* Glow effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-primary-green/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-primary-darkRed/20 blur-[180px] pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md border-b border-primary-grey-100/50 bg-black/60 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/logo.svg" alt="FigPro Logo" width={58} height={20} className="object-contain" />
            <span className="text-xs tracking-wider bg-primary-darkRed border border-primary-green/20 text-primary-green px-2 py-0.5 rounded-full uppercase font-semibold">
              v1.0
            </span>
          </div>

          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <button
                onClick={onGoToWorkspace}
                className="group flex items-center gap-2 bg-primary-green text-black font-semibold px-5 py-2.5 rounded-md hover:bg-red-500 transition-all duration-300 shadow-[0_0_15px_rgba(230,0,0,0.3)] hover:shadow-[0_0_25px_rgba(230,0,0,0.5)]"
              >
                Go to Workspace
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
              <button
                onClick={onStartDesigning}
                className="group flex items-center gap-2 bg-primary-green text-black font-semibold px-5 py-2.5 rounded-md hover:bg-red-500 transition-all duration-300 shadow-[0_0_15px_rgba(230,0,0,0.3)] hover:shadow-[0_0_25px_rgba(230,0,0,0.5)]"
              >
                Start Designing
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative flex-1 max-w-7xl mx-auto px-6 py-20 lg:py-32 flex flex-col items-center justify-center text-center z-10">
        <div className="inline-flex items-center gap-2 bg-primary-grey-200 border border-primary-grey-100 px-4 py-1.5 rounded-full text-sm text-primary-grey-300 mb-6 hover:border-primary-green/30 transition-colors">
          <Sparkles className="w-4 h-4 text-primary-green animate-pulse" />
          <span>Real-time collaborative canvas</span>
        </div>

        <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight max-w-4xl leading-tight">
          Where ideas shape into <br />
          <span className="bg-gradient-to-r from-white via-red-500 to-primary-green bg-clip-text text-transparent">
            Beautiful Realities
          </span>
        </h1>

        <p className="text-lg lg:text-xl text-primary-grey-300 max-w-2xl mt-6 leading-relaxed">
          Create, draw, and collaborate in real-time with an advanced, minimalist Figma clone designed for modern designers and developers.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mt-10">
          <button
            onClick={isLoggedIn ? onGoToWorkspace : onStartDesigning}
            className="flex items-center justify-center gap-2 bg-primary-green text-black text-lg font-bold px-8 py-4 rounded-md hover:bg-red-500 transition-all duration-300 shadow-[0_0_20px_rgba(230,0,0,0.4)] hover:shadow-[0_0_35px_rgba(230,0,0,0.6)] w-full sm:w-auto"
          >
            <Play className="w-5 h-5 fill-current" />
            Launch App
          </button>
        </div>

        {/* Floating elements showcase (Mock Canvas UI) */}
        <div className="relative mt-20 w-full max-w-5xl rounded-xl border border-primary-grey-100 bg-primary-grey-200/40 backdrop-blur-md p-2 shadow-2xl overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
          <div className="absolute inset-x-0 bottom-10 z-20 flex justify-center">
            <div className="bg-black/80 backdrop-blur-md border border-primary-green/30 rounded-full px-6 py-3 text-sm text-white flex items-center gap-2 shadow-[0_0_20px_rgba(230,0,0,0.2)]">
              <Users className="w-4 h-4 text-primary-green" />
              <span>Mahesh and 3 others are currently editing</span>
            </div>
          </div>
          <Image
            src="/images/img3.png"
            alt="Figma Workspace UI Preview"
            width={1200}
            height={675}
            className="rounded-lg object-cover opacity-90 group-hover:scale-[1.01] transition-transform duration-700"
          />
        </div>
      </section>

      {/* Feature Grid */}
      <section className="bg-primary-grey-200/30 border-y border-primary-grey-100/50 py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-center tracking-tight mb-16">
            Engineered for <span className="text-primary-green">Seamless Collaboration</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 rounded-xl border border-primary-grey-100 bg-black/40 hover:border-primary-green/30 transition-all duration-300 hover:translate-y-[-4px]">
              <div className="w-12 h-12 rounded-lg bg-primary-darkRed flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-primary-green" />
              </div>
              <h3 className="text-xl font-bold mb-3">Multi-User Presence</h3>
              <p className="text-primary-grey-300 text-sm leading-relaxed">
                See cursors, selections, and drawing paths of other collaborators instantly with real-time state synchronization.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-xl border border-primary-grey-100 bg-black/40 hover:border-primary-green/30 transition-all duration-300 hover:translate-y-[-4px]">
              <div className="w-12 h-12 rounded-lg bg-primary-darkRed flex items-center justify-center mb-6">
                <Layers className="w-6 h-6 text-primary-green" />
              </div>
              <h3 className="text-xl font-bold mb-3">Canvas Layer Management</h3>
              <p className="text-primary-grey-300 text-sm leading-relaxed">
                Create shapes, draw freeform, add text, import images, and customize fills, strokes, and layouts on the fly.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-xl border border-primary-grey-100 bg-black/40 hover:border-primary-green/30 transition-all duration-300 hover:translate-y-[-4px]">
              <div className="w-12 h-12 rounded-lg bg-primary-darkRed flex items-center justify-center mb-6">
                <Download className="w-6 h-6 text-primary-green" />
              </div>
              <h3 className="text-xl font-bold mb-3">Export to Document</h3>
              <p className="text-primary-grey-300 text-sm leading-relaxed">
                Finished designing? Instantly compile and export your dynamic drawing board to vector PDF formats.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-primary-grey-100/50 bg-black/80 py-10 text-center text-sm text-primary-grey-300 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Image src="/logo.svg" alt="FigPro Logo" width={58} height={20} className="object-contain" />
            <span className="text-xs text-primary-grey-300">© 2026 FigPro. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-primary-green transition-colors cursor-pointer">Terms</span>
            <span className="hover:text-primary-green transition-colors cursor-pointer">Privacy</span>
            <span className="hover:text-primary-green transition-colors cursor-pointer text-primary-green">Real-time Collab</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
