# Cloudflare preview setup (`cf-preview`)

Long-lived **preview-only** branch. Netlify remains production (`main` / `develop`).  
Do **not** merge `cf-preview` into `develop` or `main` until Ryan authorizes the hosting cutover.

| Item | Value |
|------|--------|
| Branch | `cf-preview` |
| Worker name | `castle-hills-preview` |
| Expected durable URL | `https://castle-hills-preview.<your-account-subdomain>.workers.dev` after Ryan connects account auth |
| Custom domain | **None** (keep production on Netlify) |

**Forbidden:** Never use `wrangler deploy --temporary` (or any anonymous/public sandbox account). Preview deploys must use Ryan’s Cloudflare account only.

**Trigger:** Push to `origin/cf-preview` is the signal for Ryan’s Workers Builds / dashboard deploy (his account). Agents do not deploy this Worker without his CF auth.

## What’s wired in-repo

- `@cloudflare/vite-plugin` + TanStack Start SSR
- Custom entry `src/server.ts` (Hono `/api/v1/estimate` → TanStack fallback)
- `wrangler.jsonc` (top-level `vars` + required `previews.vars` for Workers Builds), `pnpm run deploy`, `public/_redirects`
- Turnstile + lead email remain **stubs** until secrets exist (`previews.vars` use non-sending placeholders)

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

## Email (lean path)

**One approach:** Resend free → `LEAD_TO_EMAIL` = Porkbun-forwarded company address. Keep **Porkbun MX** as-is; Cloudflare Email Routing is inbound-only and not used for Worker send.

Preview `previews.vars` use `preview-leads-disabled@example.invalid` — `sendLeadEmail` **logs + skips** (dry-run). To enable real delivery on preview later:

1. Confirm Porkbun forwards e.g. `leads@chstainandrestoration.com` (or your chosen address) to the company inbox.
2. Create a free Resend account; verify `LEAD_FROM_EMAIL` (e.g. `noreply@chstainandrestoration.com`).
3. Set Worker secret `RESEND_API_KEY` and Preview var `LEAD_TO_EMAIL` to that real forwarded address (dashboard or `wrangler secret put` on Ryan’s account).

## Relation to PR #43

PR #43 (`adw/cf-pages-estimator-0187` → `develop`) stays the **plan + scaffold** review PR for develop.  
`cf-preview` is the **deployable CF host branch** and is intentionally **not** merged into develop.
