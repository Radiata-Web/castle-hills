import path from "node:path";
import netlify from "@netlify/vite-plugin-tanstack-start";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // The dep optimizer doesn't emit maplibre's worker chunk, so tiles never load.
  optimizeDeps: {
    exclude: ["maplibre-gl"],
  },
  plugins: [tanstackStart(), viteReact(), tailwindcss(), netlify()],
});
