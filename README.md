# Castle Hills Stain & Restoration

Marketing site built with [TanStack Start](https://tanstack.com/start) and deployed on [Netlify](https://www.netlify.com/).

This repo uses [Vite+](https://viteplus.dev/) (`vite-plus`) with [pnpm](https://pnpm.io/) only (`package-lock.json` and `bun.lock` are not used). Scripts are the Vite+ CLI (`vp`); run them via pnpm (`pnpm dev`) or `pnpm exec vp …`.

## Development

```bash
pnpm install
pnpm dev
# equivalent: pnpm exec vp install && pnpm exec vp dev
```

Open [http://localhost:3000](http://localhost:3000).

## Checks and build

```bash
pnpm exec vp check   # format, lint, type-check
pnpm types           # tsc --noEmit (also covered by vp check)
pnpm build           # vp build
```

Production output:

- Client assets: `dist/client`
- Netlify SSR handler: `.netlify/v1/functions/server.mjs`

## Deploy (Netlify)

`netlify.toml` configures:

- Build: `pnpm run build`
- Publish: `dist/client`
- Legacy URL redirects (ported from former Next.js config)

Contact form uses Netlify Forms via `public/contact-form.html` and POST to `/contact-form.html`.

Local Netlify Edge Functions emulation is disabled (unused); redirects and other Netlify Vite plugin features remain.

## Project layout

- `src/routes/` — file-based routes (URL + SEO `head`)
- `src/pages/` — page UI components
- `src/components/` — shared UI
- `public/` — static assets, `robots.txt`, `sitemap.xml`
- `docs/MIGRATION_PARITY.md` — route/SEO parity checklist
