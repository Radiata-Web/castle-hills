# Castle Hills Stain & Restoration

Marketing site built with [TanStack Start](https://tanstack.com/start) and deployed on [Netlify](https://www.netlify.com/).

This repo uses [pnpm](https://pnpm.io/) only (`package-lock.json` and `bun.lock` are not used).

## Development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
pnpm build
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

## Project layout

- `src/routes/` — file-based routes (URL + SEO `head`)
- `src/pages/` — page UI components
- `src/components/` — shared UI
- `public/` — static assets, `robots.txt`, `sitemap.xml`
- `docs/MIGRATION_PARITY.md` — route/SEO parity checklist
