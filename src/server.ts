/**
 * Cloudflare Workers entry for `cf-preview`.
 * Hono handles `/api/v1/*`; everything else falls through to TanStack Start SSR.
 */
import handler from "@tanstack/react-start/server-entry";
import { Hono } from "hono";
import { handleContactRequest, type ContactRequestBody } from "@/server/contact";
import { handleEstimateRequest, type EstimateRequestBody } from "@/server/estimate";
import type { SendEmailBinding } from "@/server/lead-email";

type WorkerEnv = {
  TURNSTILE_SECRET?: string;
  TURNSTILE_HOSTNAMES?: string;
  TURNSTILE_ALLOW_LOCAL_BYPASS?: string;
  LEAD_TO_EMAIL?: string;
  LEAD_FROM_EMAIL?: string;
  LEAD_EMAIL?: SendEmailBinding;
};

const api = new Hono<{ Bindings: WorkerEnv }>();

function clientIp(c: { req: { header(name: string): string | undefined } }): string | undefined {
  return (
    c.req.header("CF-Connecting-IP") ??
    c.req.header("X-Forwarded-For")?.split(",")[0]?.trim() ??
    undefined
  );
}

api.post("/api/v1/contact", async (c) => {
  let body: ContactRequestBody;
  try {
    body = (await c.req.json()) as ContactRequestBody;
  } catch {
    return c.json({ error: "invalid_json" }, 400);
  }

  const result = await handleContactRequest(body, c.env, { remoteip: clientIp(c) });
  return new Response(JSON.stringify(result.body), {
    status: result.status,
    headers: { "Content-Type": "application/json" },
  });
});

api.all("/api/v1/contact", (c) =>
  c.json({ error: "method_not_allowed", hint: "POST /api/v1/contact" }, 405),
);

api.post("/api/v1/estimate", async (c) => {
  let body: EstimateRequestBody;
  try {
    body = (await c.req.json()) as EstimateRequestBody;
  } catch {
    return c.json({ error: "invalid_json" }, 400);
  }

  const result = await handleEstimateRequest(body, c.env, { remoteip: clientIp(c) });
  return new Response(JSON.stringify(result.body), {
    status: result.status,
    headers: { "Content-Type": "application/json" },
  });
});

api.all("/api/v1/estimate", (c) =>
  c.json(
    { error: "method_not_allowed", hint: "POST /api/v1/estimate with Turnstile token" },
    405,
  ),
);

api.notFound((c) => c.json({ error: "not_found" }, 404));

export default {
  async fetch(request: Request, env: WorkerEnv, _ctx: unknown): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname.startsWith("/api/")) {
      return api.fetch(request, env);
    }
    return handler.fetch(request);
  },
};
