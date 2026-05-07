import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#08080f",
        "void-1": "#0d0d1a",
        "void-2": "#111122",
        violet: {
          glow: "#a78bfa",
          mid: "#7c3aed",
          dim: "#4c1d95",
          muted: "rgba(167,139,250,0.15)",
          border: "rgba(167,139,250,0.25)",
          "border-hover": "rgba(167,139,250,0.6)",
        },
        plasma: "#c4b5fd",
        "text-primary": "#e2e8f0",
        "text-muted": "#94a3b8",
        "text-dim": "#475569",
      },
      fontFamily: {
        mono: ["'JetBrains Mono'", "'Fira Code'", "monospace"],
        sans: ["Inter", "sans-serif"],
      },
      animation: {
        "scan": "scan 4s linear infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "flicker": "flicker 0.15s infinite",
        "typewriter": "typewriter 0.05s steps(1) forwards",
        "border-flow": "borderFlow 3s linear infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 10px rgba(167,139,250,0.3), 0 0 20px rgba(167,139,250,0.1)" },
          "50%": { boxShadow: "0 0 20px rgba(167,139,250,0.6), 0 0 40px rgba(167,139,250,0.2)" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.92" },
        },
        borderFlow: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      backgroundImage: {
        "grid-void": `
          linear-gradient(rgba(167,139,250,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(167,139,250,0.04) 1px, transparent 1px)
        `,
      },
      backgroundSize: {
        "grid-void": "40px 40px",
      },
      boxShadow: {
        "glow-sm": "0 0 10px rgba(167,139,250,0.2)",
        "glow-md": "0 0 20px rgba(167,139,250,0.35), 0 0 40px rgba(167,139,250,0.1)",
        "glow-lg": "0 0 30px rgba(167,139,250,0.5), 0 0 60px rgba(167,139,250,0.15)",
        "inner-glow": "inset 0 0 20px rgba(167,139,250,0.05)",
      },
    },
  },
  plugins: [],
};

export default config;
