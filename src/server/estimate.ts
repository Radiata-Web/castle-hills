import { estimateRequestSchema } from "@/lib/ballpark";
import { TURNSTILE_ACTIONS } from "@/lib/turnstile-sitekey";
import { computeBallpark } from "@/server/ballpark/compute.server";
import { buildLeadDetails, buildLeadSubjectSuffix } from "@/server/ballpark/lead-summary.server";
import { loadPricingConfig, type PricingConfigEnv } from "@/server/ballpark/pricing-config.server";
import { toPublicResult } from "@/server/ballpark/public-result";
import { sendLeadEmail, type LeadEmailEnv } from "@/server/lead-email";
import { gateTurnstile, type TurnstileGateEnv } from "@/server/turnstile-gate";

export type RateLimitBinding = {
  limit(options: { key: string }): Promise<{ success: boolean }>;
};

export type EstimateHandlerEnv = LeadEmailEnv &
  TurnstileGateEnv &
  PricingConfigEnv & {
    ESTIMATE_LIMITER?: RateLimitBinding;
  };

export type EstimateHandlerResult = {
  status: number;
  body: Record<string, unknown>;
  headers?: Record<string, string>;
};

function fieldErrorsFromZod(error: {
  issues: Array<{ path: PropertyKey[]; message: string }>;
}): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const path = issue.path.map(String).join(".");
    if (path && !out[path]) out[path] = issue.message;
  }
  return out;
}

/**
 * Shared ballpark estimate handler.
 * Order: rate limit → honeypot → Turnstile → schema → pricing → email → public result.
 */
export async function handleEstimateRequest(
  raw: unknown,
  env: EstimateHandlerEnv,
  options: {
    remoteip?: string;
    fetchImpl?: typeof fetch;
    /** Skip rate limiting (unit tests). */
    skipRateLimit?: boolean;
  } = {},
): Promise<EstimateHandlerResult> {
  const ip = options.remoteip?.trim() || "unknown";

  if (!options.skipRateLimit) {
    const limiter = env.ESTIMATE_LIMITER;
    if (limiter?.limit) {
      try {
        const decision = await limiter.limit({ key: `estimate:${ip}` });
        if (!decision.success) {
          return {
            status: 429,
            body: { error: "rate_limited" },
            headers: { "Retry-After": "60" },
          };
        }
      } catch (err) {
        console.warn("[estimate] rate limiter error — allowing request", err);
      }
    } else {
      console.warn("[estimate] ESTIMATE_LIMITER binding absent — skipping rate limit");
    }
  }

  if (
    raw &&
    typeof raw === "object" &&
    "website" in raw &&
    (raw as { website?: unknown }).website
  ) {
    console.info("[estimate] bot_honeypot", { ip });
    return { status: 400, body: { error: "invalid_request" } };
  }

  const token =
    raw && typeof raw === "object" && "turnstileToken" in raw
      ? (raw as { turnstileToken?: string }).turnstileToken
      : undefined;

  const gate = await gateTurnstile(token, env, {
    ...options,
    expectedAction: TURNSTILE_ACTIONS.ballparkEstimate,
  });
  if (!gate.ok) return gate;

  const parsed = estimateRequestSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      status: 400,
      body: {
        error: "invalid_request",
        fieldErrors: fieldErrorsFromZod(parsed.error),
      },
    };
  }

  const cfg = loadPricingConfig(env);
  if (!cfg) {
    return { status: 503, body: { error: "pricing_unavailable" } };
  }

  const computation = computeBallpark(parsed.data.project, cfg);
  const publicResult = toPublicResult(parsed.data.leadId, computation);

  const mail = await sendLeadEmail(
    {
      source: "ballpark-estimate",
      name: parsed.data.contact.name,
      email: parsed.data.contact.email,
      phone: parsed.data.contact.phone,
      zip: parsed.data.contact.zip,
      message: parsed.data.contact.notes,
      leadId: parsed.data.leadId,
      details: buildLeadDetails(parsed.data, computation),
      subjectSuffix: buildLeadSubjectSuffix(computation),
    },
    env,
  );

  if (!mail.ok && !mail.dryRun) {
    console.error("[estimate] lead email failed after pricing", mail.reason, {
      leadId: parsed.data.leadId,
    });
  }

  return { status: 200, body: publicResult };
}
