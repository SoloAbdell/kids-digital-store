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
          yellow: "#FEF08A",
          peach: "#FED7AA",
          coral: "#F87171",
          pink: "#FBCFE8",
          purple: "#DDD6FE",
          sky: "#BAE6FD",
          mint: "#A7F3D0",
          navy: "#1E293B",
        },
      },
      fontFamily: {
        sans: ["var(--font-fredoka)", "sans-serif"],
      },
      boxShadow: {
        'playful': '0 8px 0px 0px rgba(0, 0, 0, 0.08)',
        'playful-hover': '0 4px 0px 0px rgba(0, 0, 0, 0.08)',
      }
    },
  },
  plugins: [],
};
export default config;
