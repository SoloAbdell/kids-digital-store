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
        brand: {
          green: {
            DEFAULT: "#16A34A",
            light: "#22C55E",
            dark: "#15803D",
            soft: "#DCFCE7",
            50: "#F0FDF4",
          },
          purple: {
            DEFAULT: "#7C3AED",
            light: "#C084FC",
            dark: "#6D28D9",
            soft: "#F3E8FF",
            50: "#FAF5FF",
          },
          gold: {
            DEFAULT: "#F59E0B",
            light: "#FBBF24",
            dark: "#D97706",
            soft: "#FEF3C7",
            50: "#FFFBEB",
          },
          slate: {
            DEFAULT: "#0F172A",
            dark: "#090D16",
            muted: "#475569",
            light: "#64748B",
          },
          cream: {
            DEFAULT: "#FDFCF8",
            warm: "#FAF9F5",
          }
        },
      },
      fontFamily: {
        sans: ["var(--font-fredoka)", "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        'playful': '0 6px 0px 0px rgba(22, 163, 74, 0.15)',
        'playful-hover': '0 3px 0px 0px rgba(22, 163, 74, 0.2)',
        'playful-purple': '0 6px 0px 0px rgba(124, 58, 237, 0.15)',
        'playful-gold': '0 6px 0px 0px rgba(245, 158, 11, 0.2)',
      }
    },
  },
  plugins: [],
};
export default config;
