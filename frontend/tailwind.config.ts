import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        primary: {
          black: "#09090b",
          green: "#e60000",
          red: "#e60000",
          darkRed: "#2e0808",
          grey: {
            100: "#18181b",
            200: "#121212",
            300: "#a1a1aa",
          },
        },
        /* Unified design tokens */
        brand: {
          red: "#e60000",
          "red-hover": "#cc0000",
          "red-dim": "#2e0808",
          "red-glow": "rgba(230,0,0,0.35)",
          bg: "#09090b",
          surface: "#111113",
          "surface-2": "#18181b",
          border: "#27272a",
          "border-hover": "#3f3f46",
          text: "#ffffff",
          muted: "#71717a",
          subtle: "#52525b",
        },
      },
      fontFamily: {
        sans: ["var(--font-work-sans)", "Inter", "system-ui", "sans-serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "slide-in-right": {
          from: { opacity: "0", transform: "translateX(20px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        "pulse-red": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(230,0,0,0.4)" },
          "50%": { boxShadow: "0 0 0 8px rgba(230,0,0,0)" },
        },
        spin: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-up": "fade-up 0.5s ease-out both",
        "fade-in": "fade-in 0.4s ease-out both",
        float: "float 4s ease-in-out infinite",
        "slide-in-right": "slide-in-right 0.4s ease-out both",
        shimmer: "shimmer 1.5s ease-in-out infinite",
        "pulse-red": "pulse-red 2s ease-in-out infinite",
        spin: "spin 0.7s linear infinite",
      },
      boxShadow: {
        "red-sm": "0 0 12px rgba(230,0,0,0.25)",
        "red-md": "0 0 24px rgba(230,0,0,0.35)",
        "red-lg": "0 0 48px rgba(230,0,0,0.4)",
        "card": "0 1px 3px rgba(0,0,0,0.4), 0 8px 24px rgba(0,0,0,0.3)",
        "card-hover": "0 4px 12px rgba(0,0,0,0.5), 0 24px 48px rgba(0,0,0,0.4)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
