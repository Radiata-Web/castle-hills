# Ballpark estimator: implementation plan

Base branch: `cf-preview` (Cloudflare Workers, Hono on `/api/v1/*`, TanStack Start, React 19, Tailwind 4, shadcn `base-vega` style on Base UI).
Route: **`/ballpark-estimate`** (it already exists on `cf-preview` as a stub; this plan replaces the stub).
Pricing source: Ryan's staining pricing rules, shared privately. **Never commit them, or any real rate, to this repo.**

> **The repo is public** (`Radiata-Web/castle-hills`, visibility `PUBLIC`). Any rate written in source code is public on GitHub. So the rates, minimum, bundle percentage and range spread live in a **Worker secret** (`BALLPARK_PRICING_JSON`). Source code holds only the shape of the formulas, and tests use made-up numbers.

---

## 0. Decisions from Ryan (2026-11-10) and remaining questions

### Decided

| # | Topic | Decision | Where it lands in the plan |
| --- | --- | --- | --- |
| 1 | Range width | **Approved:** a low and high factor around the total, rounded to a fixed step (the values live in the secret config) | Section 6 config |
| 2 | Fence | **Use the rules' fence rate per sq ft as-is for one face. Don't offer "both sides" yet.** Ask for fence length plus a height choice of **6 ft or 8 ft**. Area = length × height | Table 4.5 items 2–3, sections 5 and 6 |
| 3 | Below the project minimum | **Approved:** raise both ends of the range to at least the minimum, and open the upsell prompt on top of the result | Sections 4.5 and 6 |
| 4 | House trim | **Price it online from the home's square footage, using a placeholder rate** until Ryan confirms the real one. Trim is part of the customer's range | Table 4.5 item 12, section 6 (`houseTrimPerHomeSqft`, `houseTrimRateIsPlaceholder`) |
| 5 | Bundling | **Approved:** the range is never discounted. **Every result shows the bundling notice**, even with one service selected. The copy changes depending on how many services were picked | Section 6 notice copy |
| 6 | Doors and shutters | **Approved:** same price whether stained or painted, so labels don't name a method. A double front door counts as 2 doors | Table 4.5 items 8–9 |
| 7 | Nav and CTAs | **The ballpark estimator is the default CTA site-wide.** The contact page stays, reached from a "Contact" nav link and secondary links | Section 3 |

Unchanged defaults Ryan didn't object to:
- If the lead email fails, the customer still sees the range and the lead is logged.
- The minimum and bundle-percentage copy comes from the server.
- ZIP is collected but doesn't block anyone.
- Painting services are out of scope.

### Still open (implementation isn't blocked)

1. **Real house-trim rate** per home square foot. The placeholder is set in the preview secret only (section 6). Replace it before production.
2. **Trim visit wording.** Should trim still say "confirmed at a free in-person visit" next to the range? **Default:** yes, as an info notice.
3. **Fence "both sides" option.** It can come back later as one choice item and one config factor. It's not in v1.
4. **Painting-page CTAs.** **Default:** they stay on the contact page, since the estimator can't price painting. The nav button goes to the estimator everywhere.

## 1. What already exists (cf-preview) and what happens to PR #43

### On `cf-preview` today

| File | State | Action |
| --- | --- | --- |
| `src/routes/ballpark-estimate.tsx` | Route plus `pageHead` SEO | **Reuse**; update the description copy only |
| `src/pages/ballpark-estimate.tsx` | One-page name/email/notes form; treats the 501 response as success | **Replace** entirely |
| `src/server/estimate.ts` | Turnstile check (`gateTurnstile`, action `ballpark-estimate`), name and email check, `sendLeadEmail`, then always **501** `pricing_not_configured` | **Rewrite** (keep the gate-first order) |
| `src/server.ts` | Hono routes `POST /api/v1/estimate` and 405 | **Reuse**; add body limit, rate limit and `no-store` |
| `src/server/turnstile-gate.ts`, `src/lib/turnstile.ts` | Server-side siteverify with action and hostname allowlist | **Reuse unchanged** |
| `src/components/turnstile-field.tsx` | Explicit widget, `interaction-only`, reset by `resetSignal` | **Reuse unchanged** |
| `src/lib/turnstile-sitekey.ts` | `TURNSTILE_ACTIONS.ballparkEstimate = "ballpark-estimate"` | **Reuse** |
| `src/server/lead-email.ts` | CF `send_email` to a verified destination; dry-run on preview | **Extend** (details lines, subject) |
| `src/lib/ballpark.ts` | `BALLPARK_DISCLAIMER` | **Extend** with client-safe service IDs, limits and schemas |
| `cloudflare/functions/api/v1/estimate.ts` | Old Pages Functions stub, not wired up on Workers | **Delete** |
| `src/components/forms/contact-form.tsx` | React Hook Form, zod, libphonenumber and Turnstile pattern | **Copy the pattern** for the contact step; leave the contact page alone |

### PR #43 (`adw/cf-pages-estimator-0187`, base `develop`, open)

PR #43 is an **older version of the same scaffold** (commit `94c10e4`, which landed on `cf-preview` as `7f90c9e`). `cf-preview` has moved past it:

- PR #43's `estimate.ts` calls `verifyTurnstileToken` with `TURNSTILE_SECRET_KEY` and checks **no action and no hostname**. `cf-preview` uses `gateTurnstile` (secret `TURNSTILE_SECRET`, expected action, hostname allowlist).
- PR #43 has no Hono Worker (`src/server.ts`), no `turnstile-gate.ts`, no `contact.ts` and no `TurnstileField`.
- PR #43 also re-adds the mobile drawer logo, which `cf-preview` removed on purpose (#55).

**Reuse nothing from PR #43.** Build on `cf-preview` only. Suggest Ryan close #43 as superseded; this worker doesn't close it.

### UI kit already in the repo

`src/components/ui/`: `button`, `card`, `carousel`, `collapsible`, `dropdown-menu`, `form` (React Hook Form), `input`, `label`, `navigation-menu`, `select`, `sheet`, `textarea`, plus `optimized-image`, `map` and `socials`. Base UI is `@base-ui/react@1.9`. Icons come from `lucide-react`. Animation comes from `tw-animate-css`. There's no motion library, and **none should be added**.

**To add with the shadcn CLI** (style `base-vega`, from `components.json`):

```bash
pnpm dlx shadcn@latest add questionnaire dialog alert spinner
```

- `questionnaire` (shadcn, August 2026) pulls in `@shadcn/react`. It renders a native `<form>`, one `<fieldset>` per question, native radios and checkboxes, a progressbar, validation, and a Base UI flavour. Docs: https://ui.shadcn.com/docs/react/questionnaire
- `dialog` is for the minimum-upsell prompt. `alert` is for notices on the result screen. `spinner` is for pending buttons.
- After adding, run `pnpm vp fmt` (oxfmt) and `pnpm types`.

---

## 2. Non-negotiable constraints

1. **No price data on the client.** Nothing under `src/routes`, `src/pages`, `src/components` or `src/lib` may import from `src/server/ballpark/*`. The client bundle and API responses never contain rates, per-item prices, subtotals, multipliers, spreads or formulas. The only number the API returns is `range.low` and `range.high`. The exception is the notice **text** (the project minimum and bundling percentage), which the server builds from config.
2. **No rates in git.** Rates live only in the `BALLPARK_PRICING_JSON` Worker secret: `wrangler secret put BALLPARK_PRICING_JSON`, plus a gitignored `.dev.vars` for local dev. If the secret is missing or invalid, the API returns `503 pricing_unavailable` and the UI shows "call us" (no range).
3. **Contact info comes before the range.** The range only exists in the response to the request that carries contact details and a valid Turnstile token.
4. **Turnstile is checked on the server** through the existing `gateTurnstile` (siteverify with action and hostname allowlist), before any pricing work.
5. **Copy rules.**
   - In the UI, call it "ballpark estimate" (the earlier brief says never "quote"; "estimate" alone is only for the in-person "free estimate").
   - **No eyebrow or kicker labels**: no small uppercase text above headings, and no decorative step labels such as "STEP 2 · DETAILS".
   - Phone number: `PHONE_DISPLAY` and `PHONE_TEL` from `src/lib/site.ts`, never hard-coded.

---

## 3. Page, navigation and calls to action

- **Route:** keep `/ballpark-estimate`. Keep `/contact-us` exactly as it is apart from one added line (below).
The **ballpark estimator is the default CTA** everywhere a "free estimate" button exists today (Ryan, decision 7). The contact page stays live and reachable.

- **Desktop navbar** (`src/components/nav/navbar.tsx`):
  - Change the primary button to **"Get a Ballpark Estimate"** linking to `/ballpark-estimate`. Keep its classes, `MoveRight` icon and `size="lg"`.
  - Add `{ title: "Contact", href: "/contact-us" }` as the last entry of `PAGES` in `src/lib/data.ts`, so the contact page is a plain nav link after "Expertise" and before the Services dropdown. Check that it fits at the `lg` breakpoint; if it crowds, show it from `xl:` up and rely on the footer link.
- **Mobile drawer:**
  - Change the primary full-width button to **"Get a Ballpark Estimate"** linking to `/ballpark-estimate`.
  - Add a `MobileNavLink to="/contact-us"` labelled "Contact" after "Our Expertise".
  - Keep the logo hidden in the drawer (pref, #55).
- **Other CTAs switch to the estimator**, with the label "Get a Ballpark Estimate" unless noted:
  - `src/components/misc/serviceDesc.tsx`: default `estimateHref` becomes `/ballpark-estimate`.
  - `src/components/misc/choose-us.tsx`
  - `src/components/expertise.tsx`
  - `src/pages/wood-staining/fence.tsx`
  - Any other `to="/contact-us"` button found with `rg '"/contact-us"' src`.
  - **Exception: CTAs on the painting pages** (`src/pages/painting/*`) stay on `/contact-us`, because the estimator doesn't price painting. A painting visitor sent to it would hit a dead end. The global nav button still goes to the estimator. (Open question 4.)
- **Footer** (`src/components/nav/footer.tsx`): keep the existing contact link and add "Ballpark estimate" before it, in the same list style.
- **Contact page** (`src/pages/contact-us.tsx`): under the header subtitle, add one line: `Want a rough number first? <Link>Get a ballpark estimate</Link>.` Style it `text-zinc-600` with the link `font-medium text-primary underline underline-offset-4`. Leave the form untouched.
- **Estimator page to contact:** the aside's phone block gets a second line, "Prefer to write it out? <Link to="/contact-us">Send us a message</Link>."
- **SEO** (`src/routes/ballpark-estimate.tsx`): title stays "Ballpark Estimate | Castle Hills Stain & Restoration". New description: "Get a free ballpark estimate for fence, deck, pergola, door and shutter staining in Dallas–Fort Worth in about two minutes. Not a quote—final pricing follows a free in-person visit."

---

## 4. UX design

This section was designed with the ui-skills.com skills **frontend-design** (anthropics, already in this repo at `.claude/skills/frontend-design`) and **better-ui** (jakubkrehel). Their exact values are used below: press scale 0.96, 100ms stagger, 300ms enter and 150ms exit, `text-balance` and `text-pretty`, `tabular-nums`, 44px touch targets, hover only on hover-capable pointers, and motion gated by reduced-motion. The implementer should read both skills before starting.

### 4.1 Layout

```
<main> max-w-8xl mx-auto px-4 md:px-8, pt-10 sm:pt-14, pb-16 sm:pb-24
  <header> max-w-2xl, space-y-3, mb-8 sm:mb-10
    h1  "Ballpark estimate"
    p   "Answer a few quick questions and see a price range for your project. No obligation."
  <div> grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-12 items-start
    <section aria-label="Ballpark estimate questions">  ← BallparkEstimator card
    <aside> lg:sticky lg:top-28  ← EstimatorAside
<Footer />
```

- **No full-height photo hero.** The tool is the hero. The current `Hero` with the `stain2` background is dropped from this page.
- **Card:** `rounded-2xl bg-card border border-transparent shadow-[0_1px_2px_oklch(0_0_0/0.06),0_8px_24px_-8px_oklch(0_0_0/0.12)]`. This is better-ui's rule: shadows for elevation, with a transparent border kept so forced-colors mode still draws an edge. Padding `p-5 sm:p-8`. Max content width inside the card is `max-w-xl`.
- **Aside, desktop:**
  1. "Every price includes prep" with a bullet list: "Power washing", "Cleaning", "Removing old stain or paint". Use the lucide `Check` icon at 16px in `text-primary`.
  2. A separator.
  3. "Rather talk it through?" with an outline button linking to `PHONE_TEL`, labelled `PHONE_DISPLAY`, with the `Phone` icon.
  4. A small note: "Ballpark ranges are for planning only. Final pricing follows a free in-person visit."

  Typography: `text-sm text-zinc-600`, headings `text-base font-semibold text-zinc-900`.
- **Aside, mobile:** it moves below the card and is not sticky.

### 4.2 Design tokens (use only what `globals.css` defines)

| Use | Classes |
| --- | --- |
| Font | `font-sans` (Instrument Sans). No new fonts. |
| H1 | `text-3xl sm:text-4xl xl:text-5xl/none font-bold tracking-tight text-balance` (same as the contact page) |
| Intro | `text-base sm:text-lg text-zinc-600 text-pretty` |
| Question title (`QuestionnaireTitle`) | `text-xl sm:text-2xl font-semibold tracking-tight text-zinc-900 text-balance` |
| Question description | `mt-2 text-sm sm:text-base text-zinc-600 text-pretty` |
| Choice label | `text-base font-medium text-zinc-900`; hint line `text-sm text-zinc-500` |
| Input value | `text-lg tabular-nums` |
| Progress count | `text-sm text-zinc-500 tabular-nums` |
| Range figure | `text-4xl sm:text-5xl font-bold tracking-tight tabular-nums text-zinc-900` |
| Primary colour | `bg-primary` (#0071bd), `text-primary-foreground` |
| Selected choice | `border-primary bg-accent-light/60`, with the check icon in `text-primary` |
| Error | `text-sm text-destructive`, with `aria-invalid` borders from the UI kit |
| Radii | card `rounded-2xl`, choices and inputs `rounded-lg`, buttons use the kit default |
| Spacing rhythm | question title to choices `gap-6`; between choices `gap-3`; above the action bar `mt-8` |

### 4.3 Progress and action bar (inside the card)

- **Top of card:** a 4px-tall progress track (`h-1 rounded-full bg-zinc-100`) with a fill (`bg-primary`) whose width is `(current / total) * 100%`. It animates `transition-[width] duration-300 ease-out`.
  - Build it from `QuestionnaireProgress` with a `render` function so the native progressbar semantics stay.
  - Next to it, right-aligned, a `text-sm text-zinc-500 tabular-nums` count: "2 of 7". **Not uppercase and not a kicker.**
  - `total` includes the contact step: show `current` of `questionnaireTotal + 1`.
- **Bottom of card (action bar):** `flex items-center justify-between gap-3 mt-8 pt-6 border-t border-zinc-100`.
  - Left: `QuestionnairePrevious` rendered as `<Button variant="ghost" size="lg">` with `ChevronLeft`, labelled "Back".
  - Right: `QuestionnaireNext` or `QuestionnaireSubmit` rendered as `<Button size="lg" className={ctaPrimaryClassName}>`, labelled "Continue" with `ChevronRight`. On the last project question the label is "Continue to your details".
  - All buttons are at least 44px tall (`size="lg"` is 40px in base-vega, so add `min-h-11`).
  - Press feedback: `enabled:active:scale-[0.96] transition-[scale] duration-150 ease-out`. Don't add it to disabled buttons.
- **Mobile (< 640px):** the action bar becomes `sticky bottom-0 -mx-5 px-5 py-4 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 pb-[max(1rem,env(safe-area-inset-bottom))]` so Continue stays reachable above the keyboard. Back becomes icon plus text at `size="lg"`.
- **No Skip button.** Every enabled question is required, and conditional questions use `disabled`.

### 4.4 Motion (all gated)

- **Question enter.** On the `QuestionnaireItem` className:

  ```
  data-active:animate-in data-active:fade-in-0 data-active:slide-in-from-bottom-3 data-active:duration-300 data-active:ease-out motion-reduce:data-active:slide-in-from-bottom-0
  ```

  That's 12px of rise (better-ui). Under reduced motion it's an opacity fade only. Inactive items hide instantly, as the Questionnaire handles it, so there's no exit animation.
- **Choice hover:** `transition-[background-color,border-color] duration-150`. Tailwind 4's `hover:` already compiles behind `(hover: hover)`.
- **Phase change** (questions → details → result): the incoming panel uses the same enter classes. Focus moves to the panel heading (`tabIndex={-1}`, `ref.focus()`).
- **Result reveal:** three parts fade in 100ms apart (range block, notices, actions), using `animate-in fade-in-0 slide-in-from-bottom-3 duration-300 ease-out` with `style={{animationDelay: '0ms' | '100ms' | '200ms'}}` and `fill-mode-both`.
  - The range figures count up from 0 over 700ms with ease-out cubic (`useCountUp`, `requestAnimationFrame`).
  - Under `prefers-reduced-motion: reduce`, show the final numbers immediately.
  - `aria-live` announces only the final text, never the counting frames (see 4.8).
- **No `transition-all`.** Always name the properties.

### 4.5 Phases and the full question list

The estimator is a small state machine in `ballpark-estimator.tsx`:

```
phase: "project" | "contact" | "submitting" | "result" | "error"
answers: ProjectAnswers   (React state; mirrored to sessionStorage "ch-ballpark-draft")
contact: ContactValues | null
leadId: string            (crypto.randomUUID() on first mount)
result: EstimateSuccess | null
```

**Phase A, "project"**, uses one `<Questionnaire>`. `item` and `onItemChange` are controlled, and so is every `Choice` (`checked`/`onChange`) and `Input` (`value`/`onChange`). Item order and the conditions that enable each item:

| # | Item `name` | Enabled when | Type | Title (exact) | Description (exact) | Answers / validation | Maps to request |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `services` | always | multiple (checkbox) | What would you like a ballpark estimate for? | Pick everything you're considering. You can change this later. | At least one of the 7 choices below | `project.services[]` |
| 2 | `fence_length` | fence | number input, suffix "ft" | About how many feet of fence? | Measure along the fence line. Your property survey or a quick pace count works—round numbers are fine. | Integer 10–5000 | `fence.linearFeet` |
| 3 | `fence_height` | fence | single | How tall is the fence? | Pick the closest height. | `6` "6 ft", `8` "8 ft" | `fence.height` |
| 4 | `deck_sqft` | deck | number input, suffix "sq ft", plus a length × width helper | About how many square feet is the deck? | Length × width is close enough. Railings and stairs are included. | Integer 20–5000 | `deck.sqft` |
| 5 | `pergola_sqft` | pergola | number input, suffix "sq ft", plus the helper | How big is the area under the patio cover or pergola? | Measure the ground beneath it, length × width. | Integer 20–3000 | `pergola.sqft` |
| 6 | `garage_single` | garage | single | How many single-car garage doors? | | `0` "None", `1`, `2`, `3` | `garage.single` |
| 7 | `garage_double` | garage | single | How many double-car garage doors? | | `0` "None", `1`, `2`. Cross-check: single + double ≥ 1, error "Choose at least one garage door." | `garage.double` |
| 8 | `door_count` | front_door | single | How many entry doors? | | `1` "One door", `2` "Two doors, or a double door" | `frontDoor.count` |
| 9 | `door_sides` | front_door | single | Which sides should we refinish? | | `one` "Outside only", `both` "Inside and outside" | `frontDoor.sides` |
| 10 | `shutters_first` | shutters | number input, suffix "pairs" | How many pairs of shutters on the first floor? | One pair covers one window. Enter 0 if none. | Integer 0–50 | `shutters.firstFloorPairs` |
| 11 | `shutters_second` | shutters | number input, suffix "pairs" | And on the second floor? | Enter 0 if your home is single-story. | Integer 0–50. Cross-check: first + second ≥ 1, error "Add at least one pair of shutters." | `shutters.secondFloorPairs` |
| 12 | `trim_home_sqft` | house_trim | number input, suffix "sq ft" | About how many square feet is your home? | Your appraisal district listing has it. Living area is fine. | Integer 500–15000 | `houseTrim.homeSqft` |

**Service choices** (item 1). Each is a full-width card choice with a lucide icon at 20px, a label, and a hint:

| value | Label | Hint | Icon |
| --- | --- | --- | --- |
| `fence` | Fence staining | Wood privacy or picket fence | `Fence` |
| `deck` | Deck staining | Decking, railings and stairs | `Layers` |
| `pergola` | Patio cover or pergola | Stained wood overhead structures | `Tent` |
| `garage` | Garage doors | Single or double doors | `Warehouse` |
| `front_door` | Front door | Entry doors, one or both sides | `DoorOpen` |
| `shutters` | Shutters | Counted by window pair | `PanelsLeftRight` |
| `house_trim` | House trim | Based on your home's size | `Home` |

**Choice styling** (styled `QuestionnaireChoice`, overriding its className):
- Base: `min-h-14 w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 flex items-center gap-3 text-left cursor-pointer transition-[background-color,border-color] duration-150 hover:bg-zinc-50`
- Checked: `data-checked:border-primary data-checked:bg-accent-light/60`
- Invalid: `data-invalid:border-destructive`
- Focus: `has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-ring/50`
- Layout: service cards are `grid gap-3 sm:grid-cols-2`. Short answers (counts, sides) are `grid gap-3 grid-cols-2 sm:grid-cols-4`, and two-option answers use `sm:grid-cols-2`.
- Don't render `ChoiceShortcut` (no keyboard-shortcut badges; they look like developer UI to homeowners).

**Number answers** (`numeric-answer.tsx`):
- Use `QuestionnaireInput` with `render` set to the kit `Input`, `type="text"`, `inputMode="numeric"`, `pattern="[0-9]*"`, `autoComplete="off"`, `enterKeyHint="next"`. Classes `h-14 text-lg tabular-nums pr-16`.
- The unit suffix is absolutely positioned on the right, `text-zinc-500`, and `aria-hidden`. The input's `aria-label` repeats the unit, for example "Fence length in feet".
- Strip non-digits on change and cap at 5 digits.
- **Length × width helper** (deck and pergola only): a `Collapsible` with a trigger link-button "Help me calculate" (`text-sm font-medium text-primary`, `ChevronDown` rotating 180° while open). Inside are two inputs, "Length (ft)" and "Width (ft)", in a `grid grid-cols-[1fr_auto_1fr] items-center gap-2` with a "×" between them. Each change sets the main answer to `round(L × W)`. Area maths isn't pricing, so it's allowed on the client.
- Below it: `Questionnaire.Error` showing the zod message.

**Validation** (`src/lib/ballpark.ts` exports `projectStepSchemas`, one zod schema per item):
- Wire `onItemChange(next)` like this. If `next` is later than the current item, run the current item's schema. On failure, set `errors[item]`, pass `invalid` to the item, and **don't** call `setItem`. On success, clear the error and set `item = next`.
- When `services` changes, set `disabled` on the dependent items. Answers for deselected services stay in state (so re-selecting restores them) but are left out of the request.
- Error copy:
  - "Choose at least one service."
  - "Enter a number between {min} and {max}."
  - "Choose an option."
  - plus the two cross-checks in the table above.

**Questionnaire `onSubmit`** (last project item): `preventDefault()`. If `contact` is null, go to `phase = "contact"`. Otherwise (the customer came back to add a service from the minimum dialog) go to `submit()` directly with the stored contact.

**Phase B, "contact"** uses a regular kit `Form` (React Hook Form and zod), copying the `contact-form.tsx` pattern. It is **not** inside the Questionnaire form.

- Heading (focus target): **"Where should we reach you?"**
- Sub: "Your ballpark range appears on the next screen. A Castle Hills team member may follow up to answer questions—no obligation."
- Fields, in a `grid gap-4 sm:grid-cols-2`. Labels come from the kit `FormLabel`, and every field has a visible label:

| Field | Label | Input | Validation (client and server, same zod) |
| --- | --- | --- | --- |
| `name` | Full name | text, `autoComplete="name"` | trim, 2–80 chars: "Enter your name." |
| `email` | Email | email, `autoComplete="email"`, `inputMode="email"` | `z.email()`, ≤ 254: "Enter a valid email." |
| `phone` | Phone | tel, `autoComplete="tel"`, `inputMode="tel"`, placeholder "(214) 555-0123" | libphonenumber `isValidPhoneNumber(v,"US")`, sent as E.164: "Enter a valid US phone number." |
| `zip` | ZIP code | text, `autoComplete="postal-code"`, `inputMode="numeric"`, maxLength 5 | `/^\d{5}$/`: "Enter a 5-digit ZIP code." |
| `notes` (spans both columns) | Anything else we should know? (optional) | Textarea, 3 rows | ≤ 1000 chars |

- A hidden honeypot: `<input name="website" tabIndex={-1} autoComplete="off" className="sr-only" aria-hidden>`.
- `TurnstileField action={TURNSTILE_ACTIONS.ballparkEstimate}`. It's mounted **at estimator level** (outside the phase switch) so a fresh token exists for re-submits. Show the hint under it exactly like `contact-form.tsx` does.
- Consent line (`text-sm text-zinc-500`): "By continuing you agree we may contact you about this project. See our <Link to="/privacy">Privacy Policy</Link>."
- Action bar: the same layout as Phase A. "Back" returns to the last project item. Primary: **"See my ballpark"**. It's disabled while `!turnstileToken` or while submitting, and while pending it shows a `Spinner` plus "Calculating…". The button keeps its width (`min-w-[12rem]`).

**Phase C, "result".** The heading (focus target) is "Your ballpark estimate".

- **Range block:** `rounded-xl bg-accent-light/40 px-6 py-6 sm:px-8 sm:py-8`.
  - The range is formatted with `Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:0})`, rendered as "$2,400 – $2,900" with a thin space around an en dash. If `low === high`, render a single figure.
  - Below it, `text-sm text-zinc-600`: "Includes prep: power washing, cleaning and removing old stain or paint."
- **Your project:** a `dl` summary built **from the customer's own answers** (no prices). For example:
  - "Fence staining — 180 ft, 6 ft tall"
  - "Shutters — 6 pairs (4 first floor, 2 second floor)"
  - "House trim — 2,400 sq ft home"
- **Notices:** each `notices[]` item from the server renders as a kit `Alert`, using the server's `message` text verbatim.
  - `bundle_discount` is **always present** (decision 5). It uses the `Percent` icon, renders first in the list, and is followed by a "Call {PHONE_DISPLAY}" link (`PHONE_TEL`).
  - `trim_in_person` (house trim selected) uses the `Home` icon.
  - `project_minimum` uses `Info`.
- **Minimum dialog:** if `project_minimum` is present, open `Dialog` once, 400ms after the reveal.
  - Title: "Small project?"
  - Body: the server message (Ryan's copy, built from config, e.g. "We have a {min} project minimum—have you thought about having your fence restained?").
  - Buttons: primary **"Add {label of suggestedService}"**, outline **"Keep my ballpark"**.
  - "Add…" checks `suggestedService` in `answers.services`, sets `phase="project"` and `item` to that service's first item, and keeps `contact`.
- **Actions:** `ctaGroupClassName`.
  - Primary: `<a href={PHONE_TEL}>` "Call {PHONE_DISPLAY}".
  - Outline: `<Link to="/contact-us">` "Schedule a free in-person estimate".
  - Ghost: "Edit answers" (returns to Phase A, item 1, answers kept).
- **Disclaimer:** `BALLPARK_DISCLAIMER` in `text-xs text-zinc-500 text-pretty`.
- A range is always returned: every service, including house trim, is priced (decision 4), so there's no "no range" variant.

**Phase "error"** (non-200 response, network failure, or 503 `pricing_unavailable`):
- Inline `Alert variant="destructive"` above the action bar. The form stays filled.

| Response | Message |
| --- | --- |
| 403 | "We couldn't verify this request. Please try again." (the Turnstile widget is reset) |
| 429 | "Too many tries in a short time. Please wait a minute and try again." |
| 400 | Map `fieldErrors` back onto the fields and return to the relevant step |
| 503 / 500 / network | "Something went wrong on our end. Call {PHONE_DISPLAY} and we'll help right away." |

### 4.6 Draft persistence

Save `answers` (never `contact`) to `sessionStorage["ch-ballpark-draft"]` on change, read it on mount, and clear it after a successful result. All of this is guarded with `typeof window` because the page is server-rendered.

### 4.7 Mobile behaviour

- One column. The card is edge-to-edge friendly (`p-5`), and the action bar is sticky with safe-area padding (4.3).
- Service choices become one column under 640px.
- Number inputs open the numeric keypad.
- `scrollIntoView({block:"start"})` on the card when the item changes, but only if the card top is off-screen, so the page doesn't jump.

### 4.8 Accessibility

- The Questionnaire supplies a fieldset and legend per item, `aria-describedby`, `aria-invalid`, a progressbar, inert hidden items, and focus on navigation. Don't override `Title` rendering, so the legend semantics stay.
- Every input has a visible label or `aria-label` (placeholders aren't labels).
- Contrast: zinc-600 on white and primary #0071bd on white both pass AA for body text. Choice borders are zinc-200 at rest; the selected state is carried by **border, background and a check icon**, never colour alone.
- One `aria-live="polite"` region holds the final result sentence: "Your ballpark estimate is $2,400 to $2,900." The count-up animation is `aria-hidden`.
- The dialog uses Base UI focus trapping. Escape or "Keep my ballpark" closes it.
- Touch targets are at least 44px (`min-h-11` on buttons, `min-h-14` on choices).
- Under reduced motion there's no slide or count-up, only opacity.

---

## 5. API contract: `POST /api/v1/estimate`

The schema is shared in `src/lib/ballpark.ts` (client-safe: service IDs, limits and zod schemas only; no prices). The server imports the same schema.

### Request (JSON, ≤ 8 KB)

```ts
type ServiceId = "fence" | "deck" | "pergola" | "garage" | "front_door" | "shutters" | "house_trim";

type EstimateRequest = {
  turnstileToken: string;                 // 1–2048 chars
  leadId: string;                         // uuid v4, client-generated; same id on re-submit
  website?: "";                           // honeypot: must be empty/absent
  contact: {
    name: string;                         // 2–80
    email: string;                        // RFC email, ≤254
    phone: string;                        // valid US; server normalises to E.164
    zip: string;                          // /^\d{5}$/
    notes?: string;                       // ≤1000
  };
  project: {
    services: ServiceId[];                // 1–7, unique
    fence?:     { linearFeet: number; height: "6" | "8" };   // linearFeet int 10–5000
    deck?:      { sqft: number };         // int 20–5000
    pergola?:   { sqft: number };         // int 20–3000
    garage?:    { single: 0|1|2|3; double: 0|1|2 };         // sum ≥ 1
    frontDoor?: { count: 1|2; sides: "one" | "both" };
    shutters?:  { firstFloorPairs: number; secondFloorPairs: number }; // ints 0–50, sum ≥ 1
    houseTrim?: { homeSqft: number };     // int 500–15000
  };
};
```

The schema uses `z.strictObject` everywhere (unknown keys are rejected). A `superRefine` makes every selected service have its block, and **rejects** blocks for services that aren't selected.

### Success: `200`

```ts
type EstimateSuccess = {
  status: "ok";
  estimateId: string;                     // echoes leadId
  range: { low: number; high: number; currency: "USD" };       // always present
  notices: Array<{
    code: "bundle_discount" | "project_minimum" | "trim_in_person";  // bundle_discount always included
    message: string;                      // server-built customer copy
    suggestedService?: ServiceId;         // project_minimum only
  }>;
  disclaimer: string;                     // BALLPARK_DISCLAIMER
};
```

**Never in the response:** line items, subtotal, rates, the minimum as a number, the spread, `fieldErrors` that reveal pricing, or whether the minimum clamp was applied (other than the notice).

### Errors

All errors carry `Cache-Control: no-store` and `Content-Type: application/json`.

| Status | Body | When |
| --- | --- | --- |
| 400 | `{ error: "invalid_json" }` | Body doesn't parse |
| 400 | `{ error: "invalid_request", fieldErrors: Record<string,string> }` | zod failure (dot-paths, e.g. `"project.fence.linearFeet"`) |
| 400 | `{ error: "invalid_request" }` | Honeypot filled (no detail; logged as `bot_honeypot`) |
| 403 | `{ error: "forbidden", codes?: string[] }` | Existing `gateTurnstile` result |
| 405 | `{ error: "method_not_allowed" }` | Non-POST (existing) |
| 413 | `{ error: "payload_too_large" }` | > 8 KB (`hono/body-limit`) |
| 429 | `{ error: "rate_limited" }` with `Retry-After: 60` | Rate limiter |
| 503 | `{ error: "pricing_unavailable" }` | `BALLPARK_PRICING_JSON` missing or invalid |
| 500 | `{ error: "internal_error" }` | Uncaught (logged) |

### Handler order (in `handleEstimateRequest`)

1. Body limit (Hono middleware) and method check (existing).
2. **Rate limit** by `CF-Connecting-IP` (falling back to `"unknown"`). The binding allows 5 requests per 60 seconds per IP.
3. JSON parse.
4. Honeypot.
5. **Turnstile**: `gateTurnstile(token, env, { expectedAction: "ballpark-estimate", remoteip })`. This step is unchanged, keeps the existing local bypass, and runs before any pricing.
6. zod `estimateRequestSchema.safeParse`.
7. `loadPricingConfig(env)`. It's memoised per isolate, and on failure returns 503.
8. `computeBallpark(project, config)` returns `{ lineItems, subtotal, range, notices }` (internal).
9. `sendLeadEmail(...)` with the **internal** breakdown. The result is logged; a failure doesn't block (unchanged default in section 0).
10. Respond with the public projection only: a `toPublicResult()` that whitelists fields.

### Abuse and rate limiting

- **Workers Rate Limiting binding** in `wrangler.jsonc`, both top-level and in `previews`:

  ```jsonc
  "ratelimits": [{ "name": "ESTIMATE_LIMITER", "namespace_id": "1101", "simple": { "limit": 5, "period": 60 } }]
  ```

  Call it with `await env.ESTIMATE_LIMITER.limit({ key: \`estimate:${ip}\` })`. If the binding is absent (unit tests, plain `vp dev` without the binding), skip the check with a `console.warn`.
- Turnstile is single-use and checked against the action and hostname (existing).
- 8 KB body cap. Strict schema and integer caps stop "price oracle" payloads with huge numbers.
- Honeypot.
- `leadId` repeats: keep it stateless. The client sends the same `leadId` on a re-submit, and the server prints it in the email subject and body, so Ryan sees updates grouped by ID in his inbox. No storage is needed.
- Optional, in Ryan's dashboard and not in code: a WAF rate-limiting rule on `/api/v1/*` as defence in depth.

---

## 6. Server pricing design (no numbers in git)

### `BALLPARK_PRICING_JSON` (Worker secret) shape

This shape is validated by `pricingConfigSchema` in `src/server/ballpark/pricing-config.server.ts`. The **values** come from Ryan's rules and are entered by Ryan or the coordinator with `wrangler secret put`. They are never written into the repo.

```jsonc
{
  "version": 1,
  "fencePerSqft": 0,              // from rules; one face, no "both sides" in v1
  "deckPerSqft": 0,
  "pergolaPerSqft": 0,
  "garageSingleEach": 0,
  "garageDoubleEach": 0,
  "frontDoorOneSideEach": 0,
  "frontDoorBothSidesEach": 0,
  "shutterFirstFloorPair": 0,
  "shutterSecondFloorPair": 0,
  "houseTrimPerHomeSqft": 0,      // PLACEHOLDER until Ryan confirms (decision 4)
  "houseTrimRateIsPlaceholder": true,
  "projectMinimum": 0,
  "bundleDiscountPercent": 0,     // used in notice copy only, never applied to the range
  "rangeLowFactor": 0,            // decision 1
  "rangeHighFactor": 0,
  "roundTo": 0
}
```

- For local dev, `.dev.vars` (gitignored by `.dev.vars*`) holds `BALLPARK_PRICING_JSON='{"version":1,...}'`. `.env.example` documents the key name only.
- **House trim placeholder:** whoever sets the preview secret picks a clearly temporary `houseTrimPerHomeSqft` and sets `houseTrimRateIsPlaceholder: true`. Ryan replaces it with `wrangler secret put` once he confirms the rate, and sets the flag to `false`. No code change is needed. While the flag is `true`:
  - the lead email marks the trim line "PLACEHOLDER RATE"
  - the server logs a `console.warn` once per isolate
  - the customer sees nothing different

### `computeBallpark(project, cfg)`

A pure function in `src/server/ballpark/compute.server.ts`.

- fence: `area = linearFeet × Number(height)` (height is 6 or 8), then `area × cfg.fencePerSqft`
- deck: `sqft × cfg.deckPerSqft`
- pergola: `sqft × cfg.pergolaPerSqft`
- garage: `single × cfg.garageSingleEach + double × cfg.garageDoubleEach`
- frontDoor: `count × (sides === "both" ? cfg.frontDoorBothSidesEach : cfg.frontDoorOneSideEach)`. A double door is sent as `count: 2` (decision 6).
- shutters: `first × cfg.shutterFirstFloorPair + second × cfg.shutterSecondFloorPair`
- house_trim: `homeSqft × cfg.houseTrimPerHomeSqft`. This is a normal priced line inside the range. Also push a `trim_in_person` notice (open question 2).

Then:

- `subtotal` is the sum of all lines. It's always above 0, because the schema requires at least one service with a non-zero quantity.
- `low = floor(subtotal × lowFactor / roundTo) × roundTo`, and `high = ceil(subtotal × highFactor / roundTo) × roundTo`.
- If `subtotal < projectMinimum`:
  - set `low = max(low, min)` and `high = max(high, min)`
  - push `project_minimum` with `suggestedService` set to the first of `["fence","deck","shutters","pergola"]` that isn't selected (or none if all are)
  - the message is built from `cfg.projectMinimum`
- **Always** push `bundle_discount` (decision 5), first in the array. Its wording depends on `services.length` (below). The message is built from `cfg.bundleDiscountPercent`. Trim counts as a service.

### Notice copy

`src/server/ballpark/notices.server.ts`, using `Intl.NumberFormat` for the dollar amount. `PHONE_DISPLAY` is imported from `src/lib/site.ts`; that import is fine on the server.

- **bundle_discount**, when one service is selected: "Save {pct}% when you bundle more than one service. Call {PHONE_DISPLAY} to schedule and ask about our bundling discount."
- **bundle_discount**, when two or more services are selected: "You picked more than one service—call {PHONE_DISPLAY} to schedule and ask about our {pct}% bundling discount."
- **project_minimum:** "We have a {min} project minimum—have you thought about having your {phrase}?" The phrase depends on `suggestedService`:
  - fence: "fence restained"
  - deck: "deck restained"
  - shutters: "shutters refinished"
  - pergola: "pergola restained"

  With no suggestion: "We have a {min} project minimum. Call us and we'll help you round out the project."
- **trim_in_person:** "Your house trim number is a starting point—we'll confirm it at a free in-person visit. Call {PHONE_DISPLAY} to schedule."

### Lead email

Extend `LeadPayload` with `details?: string[]` and `subjectSuffix?: string`. The body includes:
- Contact, ZIP and notes
- `leadId`
- Each service's inputs and its **internal** line subtotal
- The subtotal, and the range shown to the customer
- "PLACEHOLDER RATE" next to the house trim line while `houseTrimRateIsPlaceholder` is true
- Notice codes
- Trim home square footage

Subject: `[ballpark-estimate] Lead — {name} — {range or "in-person"}`. Drop the old `answers` JSON dump for this source.

### Keeping pricing out of the client bundle

- All pricing code lives in `src/server/ballpark/*.server.ts` (`compute.server.ts`, `pricing-config.server.ts`, `notices.server.ts`). TanStack Start's import protection blocks `*.server.*` imports from the client environment. If it doesn't fire in this version, the check below still catches leaks.
- Each server file exports `export const __CH_SERVER_ONLY__ = "ch-ballpark-server-only";`.
- New script `scripts/check-pricing-leak.mjs` runs after `pnpm build`. It walks the **client** output directory (`dist/client` with the Cloudflare plugin; confirm the path after the first build) and fails if any asset contains:
  - `ch-ballpark-server-only`
  - `computeBallpark`
  - `BALLPARK_PRICING_JSON`
  - `fencePerSqft`
- Add `"check:pricing-leak": "node scripts/check-pricing-leak.mjs"` and run it in CI.

---

## 7. File-by-file changes

**New**
- `src/components/ui/questionnaire.tsx`, `dialog.tsx`, `alert.tsx`, `spinner.tsx`: generated by the shadcn CLI (base-vega). Don't hand-edit beyond formatting.
- `src/components/ballpark/ballpark-estimator.tsx`: state machine, Turnstile mount, `submit()`, error mapping, live region.
- `src/components/ballpark/project-questionnaire.tsx`: Phase A (items from `questions.ts`, controlled navigation, per-item zod).
- `src/components/ballpark/questions.ts`: the item definitions from table 4.5 (name, title, description, kind, choices, unit, min/max, `enabledWhen(services)`, `toRequest`). Client-safe, with **no prices**.
- `src/components/ballpark/service-choice.tsx`: styled choice card (icon, label, hint).
- `src/components/ballpark/numeric-answer.tsx`: number input with suffix and the optional length × width helper.
- `src/components/ballpark/contact-step.tsx`: Phase B form.
- `src/components/ballpark/result-panel.tsx`: Phase C.
- `src/components/ballpark/minimum-dialog.tsx`
- `src/components/ballpark/estimator-aside.tsx`
- `src/components/ballpark/progress-bar.tsx`: `QuestionnaireProgress` render target.
- `src/hooks/use-count-up.ts`: count-up hook aware of reduced motion.
- `src/server/ballpark/pricing-config.server.ts`: zod config schema and memoised `loadPricingConfig(env)`.
- `src/server/ballpark/compute.server.ts`: `computeBallpark` (pure).
- `src/server/ballpark/notices.server.ts`
- `src/server/ballpark/lead-summary.server.ts`: email detail lines.
- `src/server/ballpark/public-result.ts`: `toPublicResult()` whitelist.
- `scripts/check-pricing-leak.mjs`
- Tests: `src/lib/ballpark.test.ts`, `src/server/ballpark/compute.server.test.ts`, `src/server/estimate.test.ts`.

**Modified**
- `src/lib/ballpark.ts`: add `SERVICE_IDS`, `SERVICE_LABELS`, `LIMITS`, `contactSchema`, `projectSchema`, `estimateRequestSchema`, `projectStepSchemas`, and the response types. Keep `BALLPARK_DISCLAIMER`.
- `src/server/estimate.ts`: rewrite per section 5. Env type = `LeadEmailEnv & TurnstileGateEnv & { BALLPARK_PRICING_JSON?: string; ESTIMATE_LIMITER?: RateLimit }`.
- `src/server.ts`:
  - `bodyLimit({ maxSize: 8 * 1024, onError: c => c.json({error:"payload_too_large"},413) })` on `/api/v1/estimate`.
  - Pass the rate limiter through.
  - Set `Cache-Control: no-store` on API responses.
  - Wrap the handler in try/catch, returning 500 `internal_error`.
  - Extend `WorkerEnv`.
- `src/server/lead-email.ts`: `details` and `subjectSuffix` support.
- `src/pages/ballpark-estimate.tsx`: replace with the header, the `BallparkEstimator` and aside grid (4.1), and `Footer`.
- `src/routes/ballpark-estimate.tsx`: new meta description (section 3).
- `src/components/nav/navbar.tsx`, `src/lib/data.ts` (`PAGES` gains Contact), `src/components/nav/footer.tsx`, `src/components/misc/serviceDesc.tsx`, `src/components/misc/choose-us.tsx`, `src/components/expertise.tsx`, `src/pages/wood-staining/*.tsx`, `src/pages/contact-us.tsx`: CTAs switch to the estimator (section 3). The painting pages keep `/contact-us`.
- `src/pages/privacy.tsx`: in the forms section, add a sentence saying the ballpark estimate tool collects name, email, phone, ZIP and project details to prepare the range and follow up.
- `wrangler.jsonc`: `ratelimits` (top-level and `previews`), plus a comment that `BALLPARK_PRICING_JSON` is a Worker secret.
- `.env.example`: document `BALLPARK_PRICING_JSON` (name only, with a pointer to `.dev.vars`).
- `package.json`: scripts `"test": "vp test"` and `"check:pricing-leak"`. `@shadcn/react` is added by the CLI.
- `.github/workflows/cf-preview.yml`: after `pnpm run build`, add `pnpm test` and `pnpm run check:pricing-leak` steps before deploying.
- `CHANGELOG.md`: an entry.

**Deleted**
- `cloudflare/functions/api/v1/estimate.ts`, the dead Pages Functions stub. Remove the now-empty `cloudflare/` directory if nothing else is in it.

**Never committed:** the pricing rules file and any real rate values.

---

## 8. Test plan

**Unit tests** (`vp test`, with imports from `vite-plus/test` to satisfy the `prefer-vite-plus-imports` lint rule). Use a **fake config** with round numbers (e.g. 1, 10, 100) so the real rates never appear.

- `compute`:
  - each service formula
  - fence area = length × height (6 and 8 only)
  - house trim uses `houseTrimPerHomeSqft`, and the placeholder flag adds "PLACEHOLDER RATE" to the email only
  - rounding direction (low rounds down, high rounds up)
  - minimum clamp and `suggestedService` choice
  - `bundle_discount` is present on **every** result, with the single-service wording for one service and the multi-service wording for two or more (trim counts)
  - trim selected → `trim_in_person` notice; trim-only still returns a range
  - deselected service blocks are ignored or rejected
- `schema`:
  - limit edges (9/10 and 5000/5001 for fence)
  - integers only
  - missing block for a selected service
  - extra block for an unselected service
  - unknown keys
  - garage and shutter sum ≥ 1
  - phone normalisation to E.164
  - ZIP format
- `estimate handler` (fake `fetchImpl` for siteverify, fake `LEAD_EMAIL`, fake limiter):
  - 403 when Turnstile fails, with **no** pricing work done (assert `computeBallpark` isn't called, via spy or config-load counter)
  - 429 from the limiter
  - 400 honeypot
  - 400 `fieldErrors`
  - 503 for missing or invalid config
  - 200 shape: deep-check that the keys are exactly `status, estimateId, range, notices, disclaimer`, and that no number other than `range.low`/`range.high` appears in the JSON (walk the object)
  - the email body contains the internal subtotal
  - a mail failure still returns 200

**Build checks**
- `pnpm types`, `pnpm vp lint`, `pnpm vp fmt --check`, `pnpm build`, `pnpm run check:pricing-leak`.
- Manually: `grep -r "fencePerSqft\|computeBallpark" dist/client` returns nothing.

**Manual and preview tests** (on the `cf-preview` Worker with the secret set)
1. Fence only, 150 ft, 6 ft, inside only. The range shows after the contact step, and the lead email arrives with the breakdown.
2. A small shutters-only job → the minimum dialog → "Add fence staining" → jumps to the fence questions with contact kept → re-submit (new Turnstile token) → updated range, and a second email with the same `leadId`.
3. Fence and deck → the multi-service bundle notice with the phone number. Fence alone → the single-service bundle notice.
4. Trim only, 2,400 sq ft home → a range built from the placeholder rate, the trim notice, and "PLACEHOLDER RATE" in the email.
5. Validation: empty, 0 and 99999 inputs; garage 0 + 0; shutters 0 + 0.
6. Keyboard only: Tab, arrows, Enter and Ctrl+Enter through the whole flow. Check focus moves to each new question and each phase heading. VoiceOver/NVDA should announce progress and the final result sentence once.
7. Mobile (375×812): the sticky action bar clears the keyboard, the numeric keypad appears, and there's no horizontal scroll.
8. Reduced motion on: no slides and no count-up, opacity only.
9. DevTools: the network response contains only the documented fields. Search the loaded JS for the sentinel and config keys and find nothing.
10. Abuse: six quick submits from one IP → 429, a 9 KB body → 413, a hand-made request with no token → 403.
11. Regression: `/contact-us` submits as before and is reachable from the new "Contact" nav link (desktop and drawer). The primary nav button, the service CTAs and the home CTAs open `/ballpark-estimate`, and the painting-page CTAs still open `/contact-us`.

(Ryan prefers to test the UI himself, so the implementer should list these steps in the PR instead of recording a video unless asked.)

---

## 9. Phased tasks

**Phase 1: server foundation** (no UI change; can merge on its own)
1. Shared schemas and types in `src/lib/ballpark.ts`.
2. `pricing-config.server.ts`, `compute.server.ts`, `notices.server.ts`, `public-result.ts` and `lead-summary.server.ts`, with unit tests.
3. Rewrite `handleEstimateRequest`. Changes to `server.ts`: body limit, rate limiter, `no-store`, try/catch.
4. `wrangler.jsonc` rate limits, `.env.example`, `lead-email.ts` extension, and deleting the Pages stub.
5. `check-pricing-leak.mjs`, the package scripts and the CI steps.
6. Ask Ryan or the coordinator to run `wrangler secret put BALLPARK_PRICING_JSON` for the preview Worker, using values from the rules file, the approved range factors and rounding step, and a placeholder house-trim rate with `houseTrimRateIsPlaceholder: true`.

**Phase 2: estimator UI**
1. `shadcn add questionnaire dialog alert spinner`, then format and run type checks.
2. `questions.ts`, `service-choice.tsx`, `numeric-answer.tsx`, `progress-bar.tsx`, `project-questionnaire.tsx`.
3. `contact-step.tsx`, then `ballpark-estimator.tsx` (state machine, Turnstile, submit, errors, draft persistence).
4. `result-panel.tsx`, `minimum-dialog.tsx`, `use-count-up.ts`, `estimator-aside.tsx`.
5. Replace `src/pages/ballpark-estimate.tsx` and update the route meta.

**Phase 3: entry points and polish**
1. Make the estimator the default CTA: the navbar primary button (desktop and drawer), the `PAGES` Contact link, `serviceDesc` default, choose-us, expertise, wood-staining pages, the footer, and the contact-page line. The painting pages keep contact.
2. Privacy copy.
3. better-ui "Before you finish" checklist pass: no `transition-all`, press scale 0.96 excluded on disabled buttons, reduced-motion gates, touch targets, `text-balance`/`text-pretty`, `tabular-nums`.
4. Run the manual test plan on the preview Worker. Fill in the PR checklist and CHANGELOG.

**Out of scope for v1:** painting services, storing leads in KV or D1, CRM, analytics events (ask Ryan whether to send GA4 `ballpark_step` and `ballpark_result` events **without** amounts), customer copy-by-email (CF `send_email` can only send to verified destinations).
