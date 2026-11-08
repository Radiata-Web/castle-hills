import { BALLPARK_DISCLAIMER } from "@/lib/ballpark";
import { sendLeadEmail, type LeadEmailEnv } from "@/server/lead-email";
import { gateTurnstile } from "@/server/turnstile-gate";

export { BALLPARK_DISCLAIMER };

export type EstimateRequestBody = {
  turnstileToken?: string;
  contact?: {
    name?: string;
    email?: string;
    phone?: string;
    message?: string;
  };
  /**
   * Opaque questionnaire payload. Pricing keys are deferred — do not invent
   * required fields here until Ryan supplies them.
   */
  answers?: Record<string, unknown>;
};

export type EstimateHandlerEnv = LeadEmailEnv & {
  TURNSTILE_SECRET_KEY?: string;
};

export type EstimateHandlerResult = {
  status: number;
  body: Record<string, unknown>;
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

/**
 * Shared ballpark estimate handler (Turnstile first, then validation).
 * Pricing math is intentionally absent until product defines fields.
 */
export async function handleEstimateRequest(
  raw: EstimateRequestBody,
  env: EstimateHandlerEnv,
  options: { remoteip?: string; fetchImpl?: typeof fetch } = {},
): Promise<EstimateHandlerResult> {
  const gate = await gateTurnstile(raw.turnstileToken, env.TURNSTILE_SECRET_KEY, options);
  if (!gate.ok) return gate;

  const name = raw.contact?.name?.trim();
  const email = raw.contact?.email?.trim();
  if (!isNonEmptyString(name) || !isNonEmptyString(email)) {
    return {
      status: 400,
      body: { error: "invalid_contact", message: "Name and email are required." },
    };
  }

  // Notify the inbox when send_email + verified destination are configured; dry-run otherwise.
  await sendLeadEmail(
    {
      source: "ballpark-estimate",
      name,
      email,
      phone: raw.contact?.phone?.trim() || undefined,
      message: raw.contact?.message?.trim() || undefined,
      answers: raw.answers,
    },
    env,
  );

  return {
    status: 501,
    body: {
      status: "pricing_not_configured",
      disclaimer: BALLPARK_DISCLAIMER,
      message:
        "Ballpark pricing logic is not configured yet. Your details were accepted for follow-up when mail is enabled.",
    },
  };
}
