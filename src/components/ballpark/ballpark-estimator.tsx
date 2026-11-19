"use client";

import { useEffect, useRef, useState } from "react";
import { ContactStep, type ContactFormOutput } from "@/components/ballpark/contact-step";
import {
  EMPTY_DRAFT,
  buildProjectSummary,
  draftToProject,
  type BallparkDraft,
} from "@/components/ballpark/draft";
import { EstimatorAside } from "@/components/ballpark/estimator-aside";
import {
  FIRST_ITEM_BY_SERVICE,
  enabledQuestions,
  type QuestionnaireStepId,
} from "@/components/ballpark/questions";
import { ProjectQuestionnaire } from "@/components/ballpark/project-questionnaire";
import { ProgressBar } from "@/components/ballpark/progress-bar";
import { ResultPanel } from "@/components/ballpark/result-panel";
import { TurnstileField } from "@/components/turnstile-field";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { EstimateSuccess, ServiceId } from "@/lib/ballpark";
import { PHONE_DISPLAY } from "@/lib/site";
import { TURNSTILE_ACTIONS } from "@/lib/turnstile-sitekey";

type Phase = "project" | "contact" | "submitting" | "result" | "error";

function newLeadId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return "00000000-0000-4000-8000-000000000000";
}

export function BallparkEstimator() {
  const [phase, setPhase] = useState<Phase>("project");
  const [draft, setDraft] = useState<BallparkDraft>(EMPTY_DRAFT);
  const [item, setItem] = useState<QuestionnaireStepId>("services");
  const [errors, setErrors] = useState<Partial<Record<QuestionnaireStepId, string>>>({});
  const [contact, setContact] = useState<ContactFormOutput | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const [leadId] = useState(newLeadId);
  const [result, setResult] = useState<EstimateSuccess | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileReset, setTurnstileReset] = useState(0);
  const [turnstileHint, setTurnstileHint] = useState<string | null>(null);
  const [minimumOpen, setMinimumOpen] = useState(false);

  const cardRef = useRef<HTMLElement>(null);
  const contactHeadingSynced = useRef(false);
  const resultHeadingSynced = useRef(false);

  useEffect(() => {
    // Drop any leftover draft from the previous persistence behavior.
    try {
      sessionStorage.removeItem("ch-ballpark-draft");
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (!cardRef.current) return;
    const top = cardRef.current.getBoundingClientRect().top;
    if (top < 0) {
      cardRef.current.scrollIntoView({ block: "start" });
    }
  }, [item, phase]);

  useEffect(() => {
    if (phase === "contact" && !contactHeadingSynced.current) {
      contactHeadingSynced.current = true;
      const el = cardRef.current?.querySelector<HTMLElement>("h2");
      el?.focus();
    }
    if (phase !== "contact") contactHeadingSynced.current = false;
  }, [phase]);

  useEffect(() => {
    if (phase === "result" && result && !resultHeadingSynced.current) {
      resultHeadingSynced.current = true;
      const el = cardRef.current?.querySelector<HTMLElement>("h2");
      el?.focus();
      if (result.notices.some((n) => n.code === "project_minimum")) {
        const timer = window.setTimeout(() => setMinimumOpen(true), 400);
        return () => window.clearTimeout(timer);
      }
    }
    if (phase !== "result") {
      resultHeadingSynced.current = false;
      setMinimumOpen(false);
    }
  }, [phase, result]);

  async function submit(contactValues: ContactFormOutput, token: string) {
    setPhase("submitting");
    setErrorMessage(null);
    setFieldErrors({});

    try {
      const project = draftToProject(draft);
      const res = await fetch("/api/v1/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          turnstileToken: token,
          leadId,
          website: honeypot || undefined,
          contact: {
            name: contactValues.name,
            email: contactValues.email,
            phone: contactValues.phone,
            zip: contactValues.zip,
            notes: contactValues.notes || undefined,
          },
          project,
        }),
      });

      const payload = (await res.json().catch(() => ({}))) as EstimateSuccess & {
        error?: string;
        fieldErrors?: Record<string, string>;
      };

      setTurnstileToken(null);
      setTurnstileReset((n) => n + 1);

      if (res.ok && payload.status === "ok") {
        setResult(payload);
        setPhase("result");
        return;
      }

      if (res.status === 403) {
        setErrorMessage("We couldn't verify this request. Please try again.");
        setPhase("contact");
        return;
      }
      if (res.status === 429) {
        setErrorMessage("Too many tries in a short time. Please wait a minute and try again.");
        setPhase("contact");
        return;
      }
      if (res.status === 400 && payload.fieldErrors) {
        setFieldErrors(payload.fieldErrors);
        const projectError = Object.keys(payload.fieldErrors).some((k) => k.startsWith("project."));
        setPhase(projectError ? "project" : "contact");
        setErrorMessage("Please check the highlighted fields and try again.");
        return;
      }
      if (res.status === 503 && payload.error === "pricing_unavailable") {
        setErrorMessage(
          `Online pricing isn't available right now. Call ${PHONE_DISPLAY} and we'll help right away.`,
        );
        setPhase("error");
        return;
      }

      setErrorMessage(
        `Something went wrong on our end. Call ${PHONE_DISPLAY} and we'll help right away.`,
      );
      setPhase("error");
    } catch {
      setTurnstileToken(null);
      setTurnstileReset((n) => n + 1);
      setErrorMessage(
        `Something went wrong on our end. Call ${PHONE_DISPLAY} and we'll help right away.`,
      );
      setPhase("error");
    }
  }

  function handleContactSubmit(values: ContactFormOutput) {
    setContact(values);
    if (!turnstileToken) {
      setErrorMessage("Please complete the human verification challenge.");
      return;
    }
    void submit(values, turnstileToken);
  }

  function handleProjectComplete() {
    if (contact) {
      if (!turnstileToken) {
        setPhase("contact");
        setErrorMessage("Please complete the human verification challenge.");
        return;
      }
      void submit(contact, turnstileToken);
      return;
    }
    setPhase("contact");
  }

  function handleAddService(service: ServiceId) {
    const nextServices = draft.services.includes(service)
      ? draft.services
      : [...draft.services, service];
    setDraft({ ...draft, services: nextServices });
    setItem(FIRST_ITEM_BY_SERVICE[service]);
    setPhase("project");
    setMinimumOpen(false);
  }

  const enabledCount = enabledQuestions(draft.services).length;
  const contactProgressCurrent = enabledCount + 1;
  const contactProgressTotal = enabledCount + 1;

  return (
    <div className="space-y-6">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-12 items-start">
        <section
          ref={cardRef}
          aria-label="Ballpark estimate questions"
          className="rounded-2xl bg-card border border-transparent shadow-[0_1px_2px_oklch(0_0_0/0.06),0_8px_24px_-8px_oklch(0_0_0/0.12)] p-5 sm:p-8"
        >
          {/* Turnstile stays mounted so tokens survive phase changes / re-submits */}
          <div className={phase === "contact" || phase === "submitting" ? "mb-4" : "hidden"}>
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
              <p className="mt-3 text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-md px-3 py-2">
                {turnstileHint}
              </p>
            ) : null}
          </div>

          {phase === "project" ? (
            <ProjectQuestionnaire
              draft={draft}
              onDraftChange={setDraft}
              item={item}
              onItemChange={setItem}
              errors={errors}
              onErrorsChange={setErrors}
              onComplete={handleProjectComplete}
            />
          ) : null}

          {phase === "contact" || phase === "submitting" ? (
            <div className="space-y-4">
              <ProgressBar current={contactProgressCurrent} total={contactProgressTotal} />
              {errorMessage ? (
                <Alert variant="destructive">
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              ) : null}
              {Object.keys(fieldErrors).length > 0 ? (
                <Alert variant="destructive">
                  <AlertDescription>{Object.values(fieldErrors).join(" ")}</AlertDescription>
                </Alert>
              ) : null}
              <ContactStep
                defaultValues={contact ?? undefined}
                honeypot={honeypot}
                onHoneypotChange={setHoneypot}
                submitting={phase === "submitting"}
                canSubmit={Boolean(turnstileToken)}
                onBack={() => {
                  const enabled = enabledQuestions(draft.services);
                  setItem(enabled[enabled.length - 1]?.name ?? "services");
                  setPhase("project");
                }}
                onSubmit={handleContactSubmit}
              />
            </div>
          ) : null}

          {phase === "result" && result ? (
            <ResultPanel
              result={result}
              summary={buildProjectSummary(draft)}
              minimumOpen={minimumOpen}
              onMinimumOpenChange={setMinimumOpen}
              onAddService={handleAddService}
              onKeepMinimum={() => setMinimumOpen(false)}
              onEdit={() => {
                setItem("services");
                setPhase("project");
              }}
            />
          ) : null}

          {phase === "error" ? (
            <div className="space-y-4">
              <Alert variant="destructive">
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
              <button
                type="button"
                className="text-sm font-medium text-primary underline underline-offset-4"
                onClick={() => setPhase(contact ? "contact" : "project")}
              >
                Try again
              </button>
            </div>
          ) : null}
        </section>

        <EstimatorAside />
      </div>

      <p className="text-sm text-zinc-500 text-pretty">
        Ballpark ranges are for planning only. Final pricing follows a free in-person visit.
      </p>
    </div>
  );
}
