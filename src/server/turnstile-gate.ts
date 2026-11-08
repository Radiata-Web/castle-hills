import { parseHostnameAllowlist, verifyTurnstileToken } from "@/lib/turnstile";

export type TurnstileGateEnv = {
  /** Spin canonical secret name */
  TURNSTILE_SECRET?: string;
  /** Comma-separated frontend hostnames approved for this deployment */
  TURNSTILE_HOSTNAMES?: string;
  /**
   * Local `vp dev` only. Never set on Workers preview/production.
   * When "true" and TURNSTILE_SECRET is unset, skip siteverify.
   */
  TURNSTILE_ALLOW_LOCAL_BYPASS?: string;
};

/**
 * Gate a mutating handler on canonical Turnstile siteverify.
 */
export async function gateTurnstile(
  token: string | undefined | null,
  env: TurnstileGateEnv,
  options: {
    expectedAction: string;
    remoteip?: string;
    fetchImpl?: typeof fetch;
  },
): Promise<{ ok: true } | { ok: false; status: 403; body: Record<string, unknown> }> {
  const secret = env.TURNSTILE_SECRET?.trim() ?? "";
  const expectedHostnames = parseHostnameAllowlist(env.TURNSTILE_HOSTNAMES);

  if (!secret) {
    if (env.TURNSTILE_ALLOW_LOCAL_BYPASS === "true") {
      console.warn("[turnstile] local bypass — TURNSTILE_SECRET unset");
      return { ok: true };
    }
    console.info("[turnstile] forbidden — secret unset");
    return {
      ok: false,
      status: 403,
      body: { error: "forbidden", reason: "turnstile_secret_unset" },
    };
  }

  const challenge = await verifyTurnstileToken(token, {
    secret,
    expectedAction: options.expectedAction,
    expectedHostnames,
    remoteip: options.remoteip,
    fetchImpl: options.fetchImpl,
  });

  if (!challenge.ok) {
    console.info("[turnstile] challenge_failed", challenge.errorCodes);
    return {
      ok: false,
      status: 403,
      body: { error: "forbidden", codes: challenge.errorCodes },
    };
  }
  return { ok: true };
}
