import { sendLeadEmail, type LeadEmailEnv } from "@/server/lead-email";
import { gateTurnstile } from "@/server/turnstile-gate";

export type ContactRequestBody = {
  turnstileToken?: string;
  contact?: {
    name?: string;
    email?: string;
    phone?: string;
    message?: string;
    serviceType?: string;
  };
};

export type ContactHandlerEnv = LeadEmailEnv & {
  TURNSTILE_SECRET_KEY?: string;
};

export type ContactHandlerResult = {
  status: number;
  body: Record<string, unknown>;
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

/**
 * Contact lead handler — Turnstile (when configured) then CF send_email
 * to the verified destination (LEAD_TO_EMAIL).
 */
export async function handleContactRequest(
  raw: ContactRequestBody,
  env: ContactHandlerEnv,
  options: { remoteip?: string; fetchImpl?: typeof fetch } = {},
): Promise<ContactHandlerResult> {
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

  const serviceType = raw.contact?.serviceType?.trim();
  const details = raw.contact?.message?.trim();
  const message = [serviceType ? `Project type: ${serviceType}` : null, details]
    .filter(Boolean)
    .join("\n\n");

  console.info("[contact] submitting lead", { name, email, to: env.LEAD_TO_EMAIL });

  const mail = await sendLeadEmail(
    {
      source: "contact",
      name,
      email,
      phone: raw.contact?.phone?.trim() || undefined,
      message: message || undefined,
    },
    env,
  );

  if (!mail.ok) {
    if (mail.dryRun) {
      console.warn("[contact] mail dry-run", mail.reason);
      return {
        status: 503,
        body: {
          error: "mail_not_configured",
          reason: mail.reason,
          message: "Lead email is not configured on this Worker yet.",
        },
      };
    }
    console.error("[contact] mail_send_failed", mail.reason);
    return {
      status: 502,
      body: { error: "mail_send_failed", reason: mail.reason },
    };
  }

  console.info("[contact] mail_ok", mail.messageId);
  return { status: 200, body: { status: "ok", messageId: mail.messageId } };
}
