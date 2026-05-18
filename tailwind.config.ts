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
        espresso: "#160E0A",
        "espresso-2": "#21140D",
        panel: "#2A1A12",
        terracotta: "#C9683E",
        mustard: "#D9A93A",
        champagne: "#F1D999",
        teal: "#345D61",
        sage: "#8A9B67",
        parchment: "#F8F1DE",
      },
      boxShadow: {
        panel: "0 18px 60px rgba(0, 0, 0, 0.34)",
      },
    },
  },
  plugins: [],
};

export default config;
