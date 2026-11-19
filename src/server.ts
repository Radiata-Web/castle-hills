/**
 * Cloudflare Workers entry for `cf-preview`.
 * Hono handles `/api/v1/*`; everything else falls through to TanStack Start SSR.
 */
import handler from "@tanstack/react-start/server-entry";
import { Hono } from "hono";
import { bodyLimit } from "hono/body-limit";
import { handleContactRequest, type ContactRequestBody } from "@/server/contact";
import {
  handleEstimateRequest,
  type EstimateHandlerEnv,
  type RateLimitBinding,
} from "@/server/estimate";
import type { SendEmailBinding } from "@/server/lead-email";

type WorkerEnv = EstimateHandlerEnv & {
  TURNSTILE_SECRET?: string;
  TURNSTILE_HOSTNAMES?: string;
  TURNSTILE_ALLOW_LOCAL_BYPASS?: string;
  LEAD_TO_EMAIL?: string;
  LEAD_FROM_EMAIL?: string;
  LEAD_EMAIL?: SendEmailBinding;
  BALLPARK_PRICING_JSON?: string;
  ESTIMATE_LIMITER?: RateLimitBinding;
};

const NO_STORE = { "Cache-Control": "no-store", "Content-Type": "application/json" };

const api = new Hono<{ Bindings: WorkerEnv }>();

function clientIp(c: { req: { header(name: string): string | undefined } }): string | undefined {
  return (
    c.req.header("CF-Connecting-IP") ??
    c.req.header("X-Forwarded-For")?.split(",")[0]?.trim() ??
    undefined
  );
}

function jsonResponse(
  body: Record<string, unknown>,
  status: number,
  extraHeaders?: Record<string, string>,
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...NO_STORE, ...extraHeaders },
  });
}

api.post("/api/v1/contact", async (c) => {
  let body: ContactRequestBody;
  try {
    body = (await c.req.json()) as ContactRequestBody;
  } catch {
    return jsonResponse({ error: "invalid_json" }, 400);
  }

  try {
    const result = await handleContactRequest(body, c.env, { remoteip: clientIp(c) });
    return jsonResponse(result.body, result.status);
  } catch (err) {
    console.error("[api/contact] uncaught", err);
    return jsonResponse({ error: "internal_error" }, 500);
  }
});

api.all("/api/v1/contact", () =>
  jsonResponse({ error: "method_not_allowed", hint: "POST /api/v1/contact" }, 405),
);

api.post(
  "/api/v1/estimate",
  bodyLimit({
    maxSize: 8 * 1024,
    onError: () => jsonResponse({ error: "payload_too_large" }, 413),
  }),
  async (c) => {
    let body: unknown;
    try {
      body = await c.req.json();
    } catch {
      return jsonResponse({ error: "invalid_json" }, 400);
    }

    try {
      const result = await handleEstimateRequest(body, c.env, {
        remoteip: clientIp(c),
      });
      return jsonResponse(result.body, result.status, result.headers);
    } catch (err) {
      console.error("[api/estimate] uncaught", err);
      return jsonResponse({ error: "internal_error" }, 500);
    }
  },
);

api.all("/api/v1/estimate", () =>
  jsonResponse(
    { error: "method_not_allowed", hint: "POST /api/v1/estimate with Turnstile token" },
    405,
  ),
);

api.notFound(() => jsonResponse({ error: "not_found" }, 404));

export default {
  async fetch(request: Request, env: WorkerEnv, _ctx: unknown): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname.startsWith("/api/")) {
      return api.fetch(request, env);
    }
    return handler.fetch(request);
  },
};
