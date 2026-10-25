import path from "node:path";
import netlify from "@netlify/vite-plugin-tanstack-start";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig, lazyPlugins } from "vite-plus";

export default defineConfig({
  fmt: {
    // TanStack regenerates this on build/dev; keep oxfmt off it.
    ignorePatterns: ["src/routeTree.gen.ts"],
  },
  lint: {
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
    rules: { "vite-plus/prefer-vite-plus-imports": "error" },
    options: { typeAware: true, typeCheck: true },
  },
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  // maplibre starts its worker with `{ type: "module" }`, so the chunk Vite
  // emits for it has to be an ES module rather than the default IIFE.
  worker: {
    format: "es",
  },
  plugins: lazyPlugins(() => [
    tanstackStart(),
    viteReact(),
    tailwindcss(),
    // Keep Netlify redirects/forms/SSR; this site does not use Edge
    // Functions. The local Deno edge emulator crashes under Deno 2.9+
    // (`deno eval --allow-scripts`) and is unused here.
    netlify({
      dev: {
        edgeFunctions: {
          enabled: false,
        },
      },
    }),
  ]),
});
