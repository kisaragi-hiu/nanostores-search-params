import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{html,js,svelte,ts,astro}", "../shared/*"],
  theme: {
    fontFamily: {
      sans: ["Roboto", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
} satisfies Config;
