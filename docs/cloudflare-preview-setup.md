# Cloudflare preview setup (`cf-preview`)

Long-lived **preview-only** branch. Netlify remains production (`main` / `develop`).  
Do **not** merge `cf-preview` into `develop` or `main` until Ryan authorizes the hosting cutover.

| Item | Value |
|------|--------|
| Branch | `cf-preview` |
| Worker name | `castle-hills-preview` |
| Expected durable URL | `https://castle-hills-preview.<your-account-subdomain>.workers.dev` after Ryan connects account auth |
| Agent smoke deploy | `https://castle-hills-preview.prairie-pullover.workers.dev` via `wrangler deploy --temporary` (ephemeral sandbox — not Ryan’s account; may show CF interstitial / expire) |
| Custom domain | **None** (keep production on Netlify) |

## What’s wired in-repo

- `@cloudflare/vite-plugin` + TanStack Start SSR
- Custom entry `src/server.ts` (Hono `/api/v1/estimate` → TanStack fallback)
- `wrangler.jsonc`, `pnpm run deploy`, `public/_redirects`
- Turnstile + lead email remain **stubs** until secrets exist

## Redeploy from this machine / CI

```bash
git checkout cf-preview
pnpm install
pnpm run deploy   # build + wrangler deploy
```

Requires Cloudflare auth (see below). Local check without deploy:

```bash
pnpm run build && pnpm run preview
```

## Auth blocker (current agent environment)

No `CLOUDFLARE_API_TOKEN` / account credentials are available in Cursor secrets or the VM env.  
**Do not paste tokens in chat.** Add them via Cursor Secrets, GitHub Actions secrets, or `wrangler login` on a trusted machine.

### Option A — Dashboard Git integration (recommended for “every push”)

1. Open [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → **Import a repository** (Workers / Workers Builds).
2. Authorize **GitHub** → select **Radiata-Web/castle-hills**.
3. Configure:
   - **Project / Worker name:** `castle-hills-preview`
   - **Production branch:** leave unused OR set to a non-public branch; prefer configuring **`cf-preview` as the branch that builds**
   - **Build command:** `pnpm run build`
   - **Deploy command / root:** repo root (Wrangler reads `wrangler.jsonc`)
   - **Root directory:** `/`
4. **Do not** add a custom domain (`chstainandrestoration.com` / `www`).
5. Save → push to `cf-preview` triggers a preview deploy → copy the `*.workers.dev` URL.
6. Optional: under **Settings → Variables**, add later: `TURNSTILE_SECRET_KEY`, `RESEND_API_KEY`, `LEAD_TO_EMAIL` (secrets).

### Option B — API token + `wrangler deploy` / GitHub Action

1. Cloudflare Dashboard → **My Profile** → **API Tokens** → **Create Token**.
2. Use template **Edit Cloudflare Workers** (or custom: Account → Workers Scripts → Edit; Account → Account Settings → Read).
3. Store the token as:
   - GitHub repo secret `CLOUDFLARE_API_TOKEN`, plus `CLOUDFLARE_ACCOUNT_ID` (Account ID from Workers overview right rail), **or**
   - Cursor / local secret — never commit.
4. From `cf-preview`: `pnpm run deploy`.
5. Note the printed `workers.dev` URL.

### Option C — `wrangler login` (interactive, local only)

```bash
pnpm exec wrangler login
pnpm run deploy
```

## Turnstile on preview

Until keys exist, `POST /api/v1/estimate` fails closed (challenge / pricing stubs).

When creating the Turnstile widget:

1. Cloudflare Dashboard → **Turnstile** → Add widget.
2. Hostnames: production domain **and** the preview hostname  
   `castle-hills-preview.<subdomain>.workers.dev` (and any `*.workers.dev` / preview URLs CF assigns).
3. Put site key in build env `VITE_TURNSTILE_SITE_KEY`; secret via `wrangler secret put TURNSTILE_SECRET_KEY`.

## Email

Leave stubbed. When ready: set `LEAD_TO_EMAIL` + `RESEND_API_KEY` (or chosen free provider). Destination may be Porkbun-forwarded or CF Email Routing inbox.

## Relation to PR #43

PR #43 (`adw/cf-pages-estimator-0187` → `develop`) stays the **plan + scaffold** review PR for develop.  
`cf-preview` is the **deployable CF host branch** and is intentionally **not** merged into develop.
