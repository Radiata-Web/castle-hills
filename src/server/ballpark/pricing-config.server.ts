/**
 * Ballpark pricing config loader. Rates live only in Worker secret
 * `BALLPARK_PRICING_JSON` — never in source or the client bundle.
 */

import { z } from "zod";

export const __CH_SERVER_ONLY__ = "ch-ballpark-server-only";

const positiveNumber = z.number().finite().nonnegative();

export const pricingConfigSchema = z.strictObject({
  version: z.literal(1),
  fencePerSqft: positiveNumber,
  deckPerSqft: positiveNumber,
  pergolaPerSqft: positiveNumber,
  garageSingleEach: positiveNumber,
  garageDoubleEach: positiveNumber,
  frontDoorOneSideEach: positiveNumber,
  frontDoorBothSidesEach: positiveNumber,
  shutterFirstFloorPair: positiveNumber,
  shutterSecondFloorPair: positiveNumber,
  projectMinimum: positiveNumber,
  bundleDiscountPercent: positiveNumber,
  rangeLowFactor: positiveNumber,
  rangeHighFactor: positiveNumber,
  roundTo: z.number().finite().positive(),
});

export type PricingConfig = z.infer<typeof pricingConfigSchema>;

export type PricingConfigEnv = {
  BALLPARK_PRICING_JSON?: string;
};

let cachedRaw: string | undefined;
let cachedConfig: PricingConfig | undefined;

/**
 * Parse and memoize pricing config for this isolate.
 * Returns null when the secret is missing or invalid.
 */
export function loadPricingConfig(env: PricingConfigEnv): PricingConfig | null {
  const raw = env.BALLPARK_PRICING_JSON?.trim();
  if (!raw) return null;

  if (cachedConfig && cachedRaw === raw) return cachedConfig;

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    console.error("[ballpark] BALLPARK_PRICING_JSON is not valid JSON");
    return null;
  }

  const result = pricingConfigSchema.safeParse(parsed);
  if (!result.success) {
    console.error("[ballpark] BALLPARK_PRICING_JSON failed schema validation", result.error.issues);
    return null;
  }

  if (result.data.rangeLowFactor > result.data.rangeHighFactor) {
    console.error("[ballpark] rangeLowFactor must be ≤ rangeHighFactor");
    return null;
  }

  // Multipliers around the subtotal (e.g. 0.9 / 1.15). Reject percent-like
  // values such as 0.1 / 0.15 that would show ~10% of the real estimate.
  if (result.data.rangeLowFactor > 1 || result.data.rangeHighFactor < 1) {
    console.error(
      "[ballpark] range factors must bracket 1.0 (e.g. 0.9 and 1.15); got",
      result.data.rangeLowFactor,
      result.data.rangeHighFactor,
    );
    return null;
  }

  cachedRaw = raw;
  cachedConfig = result.data;

  return result.data;
}

/** Test helper — clear the isolate memo. */
export function __resetPricingConfigCacheForTests(): void {
  cachedRaw = undefined;
  cachedConfig = undefined;
}
