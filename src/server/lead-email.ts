/**
 * Lean lead notification: Worker → Resend (free) → company inbox.
 * Destination should be an address Porkbun already forwards (or will forward)
 * to the company mailbox. Cloudflare Email Routing is inbound-only and is
 * not used for Worker outbound.
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

export type LeadEmailResult =
  | { ok: true }
  | { ok: false; reason: string; dryRun?: boolean };

export type LeadEmailEnv = {
  LEAD_TO_EMAIL?: string;
  LEAD_FROM_EMAIL?: string;
  RESEND_API_KEY?: string;
};

/** Preview / unset destinations — never attempt a real send. */
function isDryRunDestination(to: string | undefined): boolean {
  if (!to?.trim()) return true;
  const normalized = to.trim().toLowerCase();
  if (normalized.endsWith(".invalid")) return true;
  if (normalized.startsWith("preview-leads-disabled@")) return true;
  if (normalized === "replace_me" || normalized.includes("<replace")) return true;
  return false;
}

/**
 * Send a lead notification to the company inbox via Resend.
 * Preview / unset config → log + skip (dry-run), soft-ok for callers.
 */
export async function sendLeadEmail(
  lead: LeadPayload,
  env: LeadEmailEnv,
  fetchImpl: typeof fetch = fetch,
): Promise<LeadEmailResult> {
  const to = env.LEAD_TO_EMAIL?.trim();

  if (isDryRunDestination(to)) {
    console.info("[lead-email] dry-run skip", {
      source: lead.source,
      name: lead.name,
      email: lead.email,
      reason: to ? "preview_placeholder_to" : "LEAD_TO_EMAIL unset",
    });
    return { ok: false, reason: "dry_run_skip", dryRun: true };
  }

  const apiKey = env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    console.info("[lead-email] skip — RESEND_API_KEY not configured", {
      source: lead.source,
      to,
    });
    return { ok: false, reason: "mail_provider_not_configured", dryRun: true };
  }

  const from = env.LEAD_FROM_EMAIL?.trim() || "noreply@chstainandrestoration.com";
  const subject = `[${lead.source}] Lead — ${lead.name}`;
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
    body: JSON.stringify({ from, to: [to!], subject, text }),
  });

  if (!res.ok) {
    return { ok: false, reason: `resend-http-${res.status}` };
  }
  return { ok: true };
}
