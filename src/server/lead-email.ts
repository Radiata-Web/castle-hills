/**
 * Outbound lead notification stub.
 * Prefer a free provider (e.g. Resend) that can deliver to a Porkbun-forwarded
 * or Cloudflare Email Routing inbox. Email Routing itself is inbound-only.
 */

export type LeadPayload = {
  source: "ballpark-estimate" | "contact";
  name: string;
  email: string;
  phone?: string;
  message?: string;
  /** Opaque answers — pricing keys TBD; do not invent required fields. */
  answers?: Record<string, unknown>;
};

export type LeadEmailResult = { ok: true } | { ok: false; reason: string };

export type LeadEmailEnv = {
  LEAD_TO_EMAIL?: string;
  LEAD_FROM_EMAIL?: string;
  RESEND_API_KEY?: string;
};

/**
 * Send a lead notification. Returns a soft failure when mail is not configured
 * so API stubs can still exercise Turnstile + validation locally.
 */
export async function sendLeadEmail(
  lead: LeadPayload,
  env: LeadEmailEnv,
  fetchImpl: typeof fetch = fetch,
): Promise<LeadEmailResult> {
  const to = env.LEAD_TO_EMAIL?.trim();
  if (!to) {
    return { ok: false, reason: "LEAD_TO_EMAIL not configured" };
  }

  const apiKey = env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    // Scaffold: no provider wired — callers treat as non-fatal until cutover.
    return { ok: false, reason: "mail_provider_not_configured" };
  }

  const from = env.LEAD_FROM_EMAIL?.trim() || "noreply@chstainandrestoration.com";
  const subject = `[${lead.source}] Ballpark / contact lead — ${lead.name}`;
  const text = [
    `Source: ${lead.source}`,
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    lead.phone ? `Phone: ${lead.phone}` : null,
    lead.message ? `Message: ${lead.message}` : null,
    lead.answers ? `Answers JSON: ${JSON.stringify(lead.answers)}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const res = await fetchImpl("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to: [to], subject, text }),
  });

  if (!res.ok) {
    return { ok: false, reason: `resend-http-${res.status}` };
  }
  return { ok: true };
}
