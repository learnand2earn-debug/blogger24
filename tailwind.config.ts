import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#07090D",
        surface: "#11151C",
        card: {
          DEFAULT: "#141822",
          elevated: "#191F2C",
          border: "#1F2633",
          hover: "#262E3E",
        },
        gold: {
          50: "#FFFEEA",
          100: "#FFFBAA",
          200: "#FFF66E",
          300: "#FFE63D",
          400: "#FFD21F", // Primary luminous gold
          500: "#E5B608",
          600: "#B88E00",
          700: "#8A6900",
          glow: "rgba(255, 210, 31, 0.35)",
        },
        electric: {
          blue: "#168CFF",
          glow: "rgba(22, 140, 255, 0.35)",
        },
        foreground: "#F5F7FA",
        secondary: "#A7AFBC",
        muted: "#6B7280",
      },
      boxShadow: {
        "gold-sm": "0 0 15px -3px rgba(255, 210, 31, 0.25)",
        "gold-md": "0 0 25px -5px rgba(255, 210, 31, 0.35)",
        "gold-lg": "0 0 45px -5px rgba(255, 210, 31, 0.45)",
        "blue-glow": "0 0 25px -5px rgba(22, 140, 255, 0.35)",
        "card-hover": "0 10px 30px -10px rgba(0, 0, 0, 0.7), 0 0 15px 0 rgba(255, 210, 31, 0.15)",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #FFE873 0%, #FFD21F 50%, #E5B608 100%)",
        "gold-radial": "radial-gradient(circle at center, rgba(255, 210, 31, 0.15) 0%, transparent 70%)",
        "dark-radial": "radial-gradient(ellipse at top, #161D2B 0%, #07090D 80%)",
        "hero-glow": "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(255, 210, 31, 0.12), transparent)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 5s ease-in-out infinite",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
