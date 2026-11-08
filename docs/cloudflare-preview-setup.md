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

**Contact form:** posts JSON to `POST /api/v1/contact` (Worker `send_email` → verified destination). Not Netlify Forms.

**Workers Logs:** After redeploy, open Worker `castle-hills-preview` → **Observability / Logs**. On a failed submit look for `[contact]`, `[lead-email]`, or `[turnstile]` lines (`mail_send_failed`, `dry-run`, `challenge_failed`).

## What’s wired in-repo

- `@cloudflare/vite-plugin` + TanStack Start SSR
- Custom entry `src/server.ts` (Hono `/api/v1/contact` + `/api/v1/estimate` → TanStack fallback)
- `wrangler.jsonc` (top-level `vars` + required `previews.vars` for Workers Builds), `pnpm run deploy`, `public/_redirects`
- Turnstile existing-widget: sitekey embedded, `TURNSTILE_SECRET` written, canonical siteverify (success + action + hostname)
- Privacy policy references Cloudflare Turnstile Privacy Addendum

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
6. Optional: under **Settings → Variables / Secrets**, set `TURNSTILE_SECRET` (secret), `LEAD_TO_EMAIL`, `LEAD_FROM_EMAIL`, and extend `TURNSTILE_HOSTNAMES` with the exact preview hostname.

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

## Spin warning: “Siteverify isn't being called for chstainandrestoration.com”

**Not a missing call on `cf-preview`.** Both `POST /api/v1/contact` and `POST /api/v1/estimate` run canonical siteverify (`gateTurnstile` → `https://challenges.cloudflare.com/turnstile/v0/siteverify`).

Spin warns **per hostname on the widget**. Production `chstainandrestoration.com` is still **Netlify** (no Worker Turnstile gate). Preview siteverify only counts for the **preview hostname**. To clear the warning for `chstainandrestoration.com` specifically: that domain must serve the gated forms **and** a real submit must siteverify a token minted there (after hosting cutover / custom domain on this Worker). Fixing Domains + submitting on `*.workers.dev` clears preview activity, not necessarily the production-hostname warning.

## Turnstile on preview (existing widget)

- **Sitekey (public):** `0x4AAAAAAF5ChtHZn6ut0JFm` (`VITE_TURNSTILE_SITE_KEY` / wrangler vars).
- **Secret:** Worker secret `TURNSTILE_SECRET` only (never in git). Written by Ryan (2026-11-08).
- **Actions:** `contact` (contact form), `ballpark-estimate` (estimator).
- **Hostname allowlist (`TURNSTILE_HOSTNAMES`):** server-side only after a token exists.  
  Current vars: `chstainandrestoration.com`, `www.chstainandrestoration.com`, `localhost`, `127.0.0.1`, `castle-hills-preview.workers.dev`
- **Widget Domains (dashboard — required for the checkbox to load):**  
  Cloudflare Dashboard → **Turnstile** → widget for sitekey `0x4AAAAAAF5ChtHZn6ut0JFm` → **Domains**.  
  Add the **exact** hostname from the address bar (no `https://`). Preview is usually  
  `castle-hills-preview.<account>.workers.dev` — **not** bare `castle-hills-preview.workers.dev`.  
  Symptom if missing: widget shows **“Unable to connect to website”** / console `110200`.  
  Then also add that same host to `TURNSTILE_HOSTNAMES` (wrangler vars) so siteverify accepts it.
- Local `vp dev`: set `TURNSTILE_ALLOW_LOCAL_BYPASS=true` in `.dev.vars` only when secret is unset. Never on Workers.

## Email (lean path — Cloudflare only)

**One approach:** Worker `send_email` (`LEAD_EMAIL`) → **Verified Destination Address** (free). No Resend.

1. Cloudflare zone for `chstainandrestoration.com` (DNS on CF).
2. **Email Routing → Destination Addresses** → add company inbox → verify email.
3. Enable Email Routing / onboard domain → **MX moves to Cloudflare** (remove Porkbun MX for this domain; recreate inbound forwards as CF routing rules if needed).
4. Set Preview/production var `LEAD_TO_EMAIL` to that verified address; `LEAD_FROM_EMAIL` = e.g. `noreply@chstainandrestoration.com` on the onboarded domain.
5. Optional: set `send_email.destination_address` in `wrangler.jsonc` to lock the binding to that inbox.

Preview defaults use `preview-leads-disabled@example.invalid` → **log + skip** until a verified destination is configured. Never `wrangler --temporary`.

## Relation to PR #43

PR #43 (`adw/cf-pages-estimator-0187` → `develop`) stays the **plan + scaffold** review PR for develop.  
`cf-preview` is the **deployable CF host branch** and is intentionally **not** merged into develop.
