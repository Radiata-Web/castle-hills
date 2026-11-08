/**
 * Cloudflare Turnstile server-side siteverify (canonical Spin contract).
 * Browser never calls siteverify — only the Worker does.
 */

export type TurnstileVerifyResult =
  | { ok: true; hostname: string; action: string }
  | { ok: false; errorCodes: string[] };

type SiteverifyResponse = {
  success?: boolean;
  hostname?: string;
  action?: string;
  "error-codes"?: string[];
};

export function parseHostnameAllowlist(raw: string | undefined): Set<string> {
  return new Set(
    (raw ?? "")
      .split(",")
      .map((hostname) => hostname.trim().toLowerCase())
      .filter(Boolean),
  );
}

/**
 * Canonical siteverify: success === true, expected action, hostname allowlist.
 */
export async function verifyTurnstileToken(
  token: string | undefined | null,
  options: {
    secret: string;
    expectedAction: string;
    expectedHostnames: Set<string>;
    remoteip?: string;
    fetchImpl?: typeof fetch;
  },
): Promise<TurnstileVerifyResult> {
  if (
    typeof token !== "string" ||
    token.length === 0 ||
    token.length > 2048 ||
    options.expectedHostnames.size === 0 ||
    !options.secret
  ) {
    return { ok: false, errorCodes: ["forbidden_precheck"] };
  }

  const body = new URLSearchParams();
  body.set("secret", options.secret);
  body.set("response", token);
  if (options.remoteip) body.set("remoteip", options.remoteip);

  const fetchImpl = options.fetchImpl ?? fetch;
  let result: SiteverifyResponse;
  try {
    const res = await fetchImpl("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      signal: AbortSignal.timeout(10_000),
      body,
    });
    if (!res.ok) {
      return { ok: false, errorCodes: [`siteverify-http-${res.status}`] };
    }
    result = (await res.json()) as SiteverifyResponse;
  } catch {
    return { ok: false, errorCodes: ["siteverify_unreachable"] };
  }

  const hostname = (result.hostname ?? "").toLowerCase();
  const action = result.action ?? "";

  if (
    !result.success ||
    action !== options.expectedAction ||
    !options.expectedHostnames.has(hostname)
  ) {
    return {
      ok: false,
      errorCodes: result["error-codes"]?.length
        ? result["error-codes"]
        : ["challenge_failed", `action=${action}`, `hostname=${hostname}`],
    };
  }

  return { ok: true, hostname, action };
}
