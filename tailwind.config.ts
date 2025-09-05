import type { Config } from "tailwindcss";

export default {
  darkMode: "class",   // <--- habilita modo escuro via classe
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
