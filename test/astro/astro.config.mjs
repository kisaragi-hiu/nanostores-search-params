// @ts-check
import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
export default defineConfig({
  vite: { clearScreen: true },
  integrations: [svelte()],
});
