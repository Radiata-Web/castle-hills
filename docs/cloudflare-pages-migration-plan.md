# Castle Hills — Cloudflare migration + ballpark estimator plan

**Repo:** Radiata-Web/castle-hills  
**Source of truth:** `develop`  
**Brief:** `/cursor/stores/self/internal/cf-pages-estimator-brief.md`  
**Scaffolding branch:** `adw/cf-pages-estimator-0187` (PR #43 → develop — plan/stubs only)  
**CF preview branch (do not merge to develop/main):** `cf-preview` — Workers-wired, deployable; see `docs/cloudflare-preview-setup.md`  
**Status:** Architecture + stubs + preview host wiring. **No pricing fields or math** until Ryan supplies them.

This plan covers hosting cutover (Netlify → Cloudflare), Turnstile, lead email, and the ballpark estimator API/UI shape. It does **not** invent final pricing inputs.

---

## 0. Vocabulary (legal / UI)

| Do say | Do not say (UI, emails, legal, meta) |
|--------|--------------------------------------|
| **Ballpark estimate** | Estimate, quote, bid, proposal, fixed price |

Always frame the tool as a **non-binding ballpark estimate** that helps homeowners plan—not a contractual price. Final numbers come from an on-site or scheduled consultation. Copy in the scaffolded `/ballpark-estimate` page and API responses follows this wording.

---

## 1. Recommendation: Workers (Static Assets) + Hono API — not classic Pages Functions alone

### Decision

**Primary:** Deploy TanStack Start on **Cloudflare Workers with Static Assets**, using the official `@cloudflare/vite-plugin` + `@tanstack/react-start/server-entry`, and mount a small **Hono** app for `POST /api/v1/*` in a custom server entry.

**Not primary:** Standalone classic **Pages Functions** (`functions/` only) as the long-term SSR host.

### Why this is most efficient

1. **Official path for this stack.** Cloudflare’s TanStack Start guide targets Workers (auto `wrangler` config, Vite Cloudflare plugin). Netlify’s current adapter (`@netlify/vite-plugin-tanstack-start`) would be replaced once, not twice.
2. **One deploy unit.** SSR pages, static assets, Turnstile-gated API, and lead mail share one Worker, one secrets surface, one rollback.
3. **Hono for `/api/v1`.** Clear REST surface (`POST /api/v1/estimate`, later contact), typed middleware (Turnstile first), no inventing a second framework. TanStack `createServerFn` remains available for app-internal server logic if needed.
4. **Pages Functions alone** still work and are supported, but CF’s investment and TanStack docs point at Workers; Pages Functions also share the Workers request quota once added, without the cleaner Static Assets routing defaults.
5. **Split “Pages frontend + separate API Worker”** doubles deploys, CORS, and secrets for little gain on a marketing site this size.

### How this maps to the brief’s “CF Pages”

Treat **“Cloudflare edge hosting”** as the goal. In 2025–2026 Cloudflare steers new projects to **Workers**; marketing often still says “Pages.” This plan uses Workers Static Assets (the current first-class home for TanStack Start). If Ryan requires a literal **Pages** project for DNS/UI familiarity, we can still attach the same Worker or use Pages Advanced Mode `_worker.js`—but the scaffold and cutover steps below assume **Workers + Wrangler**.

### DNS / Porkbun note

Workers custom domains expect an **active Cloudflare zone** (nameservers on Cloudflare). Castle Hills already uses Cloudflare for `img.chstainandrestoration.com` (R2 + Transformations), so a CF zone is already in play or easy to complete. **Porkbun can keep domain registration**; DNS for the apex/www should live in Cloudflare for the cleanest Worker + Email Routing setup. See §3.

---

## 2. What stays unchanged

| Asset | Action |
|-------|--------|
| **R2 bucket + `img.chstainandrestoration.com`** | Keep. App continues to use `VITE_IMAGE_CDN_BASE` / `photoSrc()`; WAF Referer rules unchanged. |
| **Service IA URLs** (`/painting/*`, `/wood-staining/*`) | Keep. Move 301s from `netlify.toml` → Cloudflare `_redirects` or Bulk Redirects / Worker redirects (§5). |
| **GA, phone, content** | Keep unless copy tasks say otherwise. |
| **Local photo fallbacks** | Keep for `vp dev` without CDN. |

---

## 3. DNS, Porkbun, Email Routing

### 3.1 Target DNS shape

1. **Registrar:** Porkbun (unchanged).
2. **Authoritative DNS:** Cloudflare zone for `chstainandrestoration.com` (recommended).
3. **Records (illustrative):**
   - Apex / `www` → Worker custom domain (or CNAME to `*.workers.dev` / Workers route per CF UI).
   - `img` → existing R2 / Transform custom domain (already working).
   - MX → **Cloudflare Email Routing** (free inbound) **or** keep Porkbun forwarding MX if Email Routing is deferred.

### 3.2 Free lead-mail path (compatible with Porkbun)

**Inbound (company receives mail):** Prefer **Cloudflare Email Routing** → forward `leads@…` / `contact@…` to the company inbox (Gmail or whatever is coming). Porkbun’s existing forwarding remains valid if MX stays on Porkbun; do not run both MX configs at once.

**Outbound (Worker sends the lead notification):** Email Routing does **not** send outbound. Free-compatible options:

| Option | Cost | Notes |
|--------|------|--------|
| **A. Resend (or similar) free tier** | Free allowance | Worker `fetch` to API; `to:` = Porkbun-forwarded or CF-routed company address. Recommended default. |
| **B. Web3Forms / similar form→email** | Free tier | Worker posts after Turnstile; destination can be any inbox Porkbun already forwards. |
| **C. Wait for CF transactional send** | TBD | Revisit if CF shipping fits free plan later. |

**Do not** depend on Netlify Forms after cutover. Scaffold: `src/server/lead-email.ts` with a pluggable `sendLeadEmail()` and env-driven provider.

**Contact form path after cutover:** Same Turnstile + Worker endpoint pattern as the ballpark tool (e.g. `POST /api/v1/contact`), replacing `public/contact-form.html` / Netlify Forms. Can ship in the same cutover or immediately after estimator API is live.

---

## 4. Turnstile (site-wide + API)

1. Create a Turnstile widget (managed challenge) for `chstainandrestoration.com` + preview hostnames.
2. **Frontend:** load Turnstile on contact + ballpark forms (and optionally a lightweight site-wide check later).
3. **Backend:** every mutating API verifies the token **first** via `siteverify`; **drop** failures with `403` and no pricing / no email.
4. Secrets: `TURNSTILE_SECRET_KEY` (Worker secret). Public: `VITE_TURNSTILE_SITE_KEY`.
5. Helper stub: `src/lib/turnstile.ts` → `verifyTurnstileToken(token, ip?)`.

---

## 5. Migration steps (Netlify → Cloudflare Workers)

### Phase A — Prep (this PR / develop)

- [x] Plan (this doc).
- [x] Scaffold: Turnstile helper, estimate handler stub, Pages Function-shaped `cloudflare/functions/api/v1/estimate.ts` (shared core), wrangler draft, `/ballpark-estimate` placeholder UI, `.env.example`, redirect inventory notes.
- [ ] Ryan: Turnstile keys, lead inbox address, confirm CF zone / Email Routing vs Porkbun MX.
- [ ] Ryan: pricing questionnaire + rates (**do not invent**).

### Phase B — Wire Workers build

**Done on `cf-preview` (preview-only, not merged):** Cloudflare Vite plugin, `src/server.ts` (Hono `/api/v1/*` + TanStack), `wrangler.jsonc` (`castle-hills-preview`), `public/_redirects`, `pnpm run deploy`, GitHub workflow `.github/workflows/cf-preview.yml` (needs secrets).  
**Redeploy:** `git checkout cf-preview && pnpm run deploy` (needs CF API token) **or** Workers Builds / Actions watching `cf-preview` — details in `docs/cloudflare-preview-setup.md`.  
**Auth:** durable preview needs Ryan’s CF account (token or Git link). **Do not** use `wrangler deploy --temporary` / anonymous sandboxes.

Still open before cutover:

1. Ryan: connect Git or provide API token (Cursor/GitHub secrets — not chat); first `workers.dev` URL.
2. Allowlist preview hostname in Turnstile when keys exist.
3. Port remaining contact form off Netlify Forms onto `/api/v1/contact`.
4. When ready for develop: cherry-pick / PR CF host wiring from `cf-preview` → `develop` (separate authorization).

### Phase C — Cutover

1. Attach custom domain on the Worker; lower DNS TTLs ahead of time.
2. Set Worker secrets / vars (Turnstile, mail provider, `LEAD_TO_EMAIL`, image CDN already public).
3. Flip DNS apex/`www` to Cloudflare Worker.
4. Verify: homepage SSR, redirects 16/16, CDN images, Turnstile challenge, ballpark POST (stub until pricing), contact lead email.
5. Disable Netlify production deploys (keep project as rollback artifact for a short window).

### Phase D — Rollback

1. Point DNS back to Netlify.
2. Re-enable Netlify production.
3. Leave Worker deploy intact for a fast re-flip.
4. R2/img CDN unaffected either direction.

---

## 6. API: `POST /api/v1/estimate`

### Behavior

1. Parse JSON body.
2. **Verify Turnstile** (`turnstileToken`). On failure → `403` `{ "error": "challenge_failed" }` (drop; no email).
3. Validate contact + **opaque** answers object (shape locked later).
4. Until pricing lands → `501` or `200` with `{ "status": "pricing_not_configured" }` and **no dollar amounts**. Prefer explicit `501` in stubs so clients don’t fake success.
5. When pricing exists → compute **ballpark** ranges only; send lead email; return ballpark payload + disclaimer.

### Request shape (scaffold — fields TBD)

```ts
type EstimateRequest = {
  turnstileToken: string;
  contact: {
    name: string;
    email: string;
    phone?: string;
    message?: string;
  };
  /** Opaque until Ryan defines pricing inputs. Do not invent required keys. */
  answers?: Record<string, unknown>;
};
```

### Response shape (scaffold)

```ts
type EstimateResponse =
  | {
      status: "pricing_not_configured";
      disclaimer: string; // ballpark / non-binding language
    }
  | {
      status: "ballpark";
      // ranges TBD — no fake numbers in stubs
      disclaimer: string;
    };
```

### Errors

| Status | When |
|--------|------|
| 403 | Turnstile failed |
| 400 | Invalid / validation |
| 501 | Pricing not configured (current stub) |
| 502 | Mail provider failure after successful ballpark (if email is required) |

Shared implementation: `src/server/estimate.ts`. Edge entry: `cloudflare/functions/api/v1/estimate.ts` (Pages-shaped) → will move behind Hono in the Workers entry during Phase B.

---

## 7. UI: `/ballpark-estimate`

- Placeholder page: explains the tool, disclaimer, disabled or “coming soon” submit until pricing + Turnstile keys exist.
- No fabricated prices, ranges, or sq‑ft rates in UI copy.
- Nav: optional soft link from Contact / footer later; not required for scaffold review.
- Meta title/description use **ballpark estimate** wording only.

---

## 8. Env / secrets checklist

| Name | Where | Purpose |
|------|--------|---------|
| `VITE_TURNSTILE_SITE_KEY` | Build / public | Widget |
| `TURNSTILE_SECRET_KEY` | Worker secret | `siteverify` |
| `LEAD_TO_EMAIL` | Worker var/secret | Destination (Porkbun-forwarded or CF-routed inbox) |
| `LEAD_FROM_EMAIL` | Worker var | Verified sender for provider |
| `RESEND_API_KEY` (or alt) | Worker secret | Outbound mail |
| `VITE_IMAGE_CDN_BASE` | Build | Existing R2 CDN |
| `VITE_IMAGE_CDN_FORCE` | Optional | Local CDN testing |

Netlify-specific form env goes away after contact migration.

---

## 9. Scaffolding map (this branch)

| Path | Role |
|------|------|
| `docs/cloudflare-pages-migration-plan.md` | Repo copy of this plan |
| `wrangler.jsonc` | Draft Workers config (not live cutover) |
| `src/lib/turnstile.ts` | Turnstile verify helper |
| `src/server/estimate.ts` | Shared estimate handler (no pricing) |
| `src/server/lead-email.ts` | Pluggable lead email stub |
| `cloudflare/functions/api/v1/estimate.ts` | Pages Functions–shaped stub (not root `functions/` — avoids Netlify clash) |
| `src/routes/ballpark-estimate.tsx` | Route + SEO |
| `src/pages/ballpark-estimate.tsx` | Placeholder UI |
| `.env.example` | Documented keys |
| `public/_redirects.cf.example` | Redirect port checklist from `netlify.toml` |

**Still on Netlify for develop/main** until Phase B lands. Scaffold must not break `pnpm build` on Netlify.

---

## 10. Out of scope (deferred)

- Final pricing fields, rates, multipliers, material lists.
- Ads / GSC changes beyond existing Phase 4 playbook.
- Deleting the Netlify project on day one.
- Inventing company legal entity text beyond the ballpark disclaimer.

---

## 11. Success criteria for cutover

- Custom domain serves TanStack SSR from Cloudflare Worker.
- Existing marketing URLs + 301s behave (probe script green).
- R2 images still 200 with site Referer.
- Turnstile blocks bad `POST /api/v1/estimate`.
- Contact + ballpark leads arrive in the company inbox via free-compatible path.
- Rollback DNS → Netlify restores previous prod within TTL.
