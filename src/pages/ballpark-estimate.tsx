import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Hero } from "@/components/misc/hero";
import Footer from "@/components/nav/footer";
import { TurnstileField } from "@/components/turnstile-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ctaPrimaryClassName } from "@/lib/cta";
import { BALLPARK_DISCLAIMER } from "@/lib/ballpark";
import { PHOTOS } from "@/lib/images";
import { TURNSTILE_ACTIONS } from "@/lib/turnstile-sitekey";

/**
 * Ballpark estimate UI — Turnstile-gated POST /api/v1/estimate.
 * Pricing fields stay deferred (API returns pricing_not_configured).
 */
export default function BallparkEstimatePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileReset, setTurnstileReset] = useState(0);
  const [turnstileHint, setTurnstileHint] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "pending" | "ok" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [apiMessage, setApiMessage] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("pending");
    setError(null);
    setApiMessage(null);

    if (!turnstileToken) {
      setStatus("error");
      setError("Please complete the human verification challenge.");
      return;
    }

    try {
      const res = await fetch("/api/v1/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          turnstileToken,
          contact: { name, email, message },
          answers: {},
        }),
      });
      const payload = (await res.json().catch(() => ({}))) as {
        status?: string;
        message?: string;
        disclaimer?: string;
        error?: string;
        reason?: string;
        codes?: string[];
      };

      setTurnstileToken(null);
      setTurnstileReset((n) => n + 1);

      // 501 pricing_not_configured still means Turnstile + lead path ran.
      if (res.ok || res.status === 501) {
        setStatus("ok");
        setApiMessage(payload.message || payload.disclaimer || "Request received.");
        return;
      }

      setStatus("error");
      setError(payload.reason || payload.error || `${res.status} ${res.statusText}`);
    } catch (err) {
      setTurnstileToken(null);
      setTurnstileReset((n) => n + 1);
      setStatus("error");
      setError(`${err}`);
    }
  }

  return (
    <>
      <Hero
        title="Ballpark estimate"
        subtitle="A quick, non-binding planning number for painting and wood staining—not a quote."
        backgroundImageUrl={PHOTOS.stain2}
      />

      <div className="max-w-8xl mx-auto px-4 md:px-8 lg:px-8 py-12 md:py-16">
        <article className="mx-auto max-w-2xl space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
              Request a ballpark estimate
            </h2>
            <p className="text-zinc-600 leading-relaxed">
              Pricing inputs are not live yet. This form verifies you are human and stores your
              contact for follow-up — it does{" "}
              <strong className="font-semibold text-zinc-800">not</strong> return a dollar amount.
            </p>
            <p className="rounded-lg border border-amber-200/80 bg-amber-50/60 px-4 py-3 text-sm leading-relaxed text-zinc-700">
              {BALLPARK_DISCLAIMER}
            </p>
          </div>

          <form
            onSubmit={onSubmit}
            className="space-y-4 rounded-xl border border-zinc-200 bg-zinc-50/50 p-6"
          >
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-800" htmlFor="ballpark-name">
                Name
              </label>
              <Input
                id="ballpark-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                minLength={2}
                disabled={status === "pending"}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-800" htmlFor="ballpark-email">
                Email
              </label>
              <Input
                id="ballpark-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={status === "pending"}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-800" htmlFor="ballpark-message">
                Project notes
              </label>
              <Textarea
                id="ballpark-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Rough scope, surfaces, timeline — optional until pricing fields land."
                disabled={status === "pending"}
              />
            </div>

            <TurnstileField
              action={TURNSTILE_ACTIONS.ballparkEstimate}
              resetSignal={turnstileReset}
              onToken={(token) => {
                setTurnstileToken(token);
                if (token) setTurnstileHint(null);
              }}
              onWidgetError={setTurnstileHint}
            />
            {turnstileHint ? (
              <p className="text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-md px-3 py-2">
                {turnstileHint}
              </p>
            ) : null}

            <Button
              type="submit"
              size="lg"
              className={ctaPrimaryClassName}
              disabled={status === "pending" || !turnstileToken}
            >
              Get a ballpark estimate
            </Button>

            {status === "ok" && apiMessage ? (
              <p className="text-sm text-green-700">{apiMessage}</p>
            ) : null}
            {status === "error" && error ? (
              <p className="text-sm text-red-600">Request failed: {error}</p>
            ) : null}
          </form>

          <p className="text-zinc-600">
            Prefer a call?{" "}
            <Link
              to="/contact-us"
              className="font-medium text-primary underline underline-offset-4 hover:text-primary/90"
            >
              Contact us
            </Link>
            .
          </p>
        </article>
      </div>

      <Footer />
    </>
  );
}
