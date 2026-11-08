/** Public Turnstile sitekey (safe for client bundles). */
export const TURNSTILE_SITE_KEY =
  (import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined)?.trim() ||
  "0x4AAAAAAF5ChtHZn6ut0JFm";

/** Stable data-action values (1–32 chars: letters, numbers, underscore, hyphen). */
export const TURNSTILE_ACTIONS = {
  contact: "contact",
  ballparkEstimate: "ballpark-estimate",
} as const;
