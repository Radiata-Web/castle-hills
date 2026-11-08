import { useEffect, useRef, useState } from "react";
import { TURNSTILE_SITE_KEY } from "@/lib/turnstile-sitekey";

type TurnstileApi = {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      action?: string;
      appearance?: "always" | "execute" | "interaction-only";
      callback?: (token: string) => void;
      "error-callback"?: (errorCode?: string | number) => void;
      "expired-callback"?: () => void;
      "before-interactive-callback"?: () => void;
      "after-interactive-callback"?: () => void;
    },
  ) => string;
  reset: (widgetId?: string) => void;
  remove: (widgetId?: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

let scriptPromise: Promise<void> | null = null;

function loadTurnstileScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.turnstile) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>('script[data-cf-turnstile="1"]');
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("turnstile_script_failed")));
      return;
    }
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.defer = true;
    script.dataset.cfTurnstile = "1";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("turnstile_script_failed"));
    document.head.appendChild(script);
  });

  return scriptPromise;
}

type TurnstileFieldProps = {
  action: string;
  /** Bump after each submit attempt → turnstile.reset(widgetId) for a fresh token. */
  resetSignal?: number;
  onToken: (token: string | null) => void;
  onWidgetError?: (message: string) => void;
  className?: string;
};

function explainTurnstileError(code: string | number | undefined): string {
  const c = String(code ?? "");
  if (c === "110200") {
    return `Turnstile domain not authorized for “${typeof window !== "undefined" ? window.location.hostname : "this host"}”. Add that exact hostname under Cloudflare → Turnstile → this widget → Domains.`;
  }
  if (c === "110100" || c === "400020") {
    return "Turnstile sitekey is invalid or unknown for this widget.";
  }
  return c
    ? `Turnstile widget error ${c}. Check the browser console and widget domains.`
    : "Turnstile widget failed to load.";
}

/**
 * Explicit Turnstile widget (Spin contract): retain widget id; reset after submit.
 * Collapses layout when Invisible / non-interactive so forms don’t keep a blank gap.
 * Expands only if Cloudflare requires an interactive challenge.
 */
export function TurnstileField({
  action,
  resetSignal = 0,
  onToken,
  onWidgetError,
  className,
}: TurnstileFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const lastResetRef = useRef(resetSignal);
  const onTokenRef = useRef(onToken);
  const onWidgetErrorRef = useRef(onWidgetError);
  const [interactive, setInteractive] = useState(false);
  onTokenRef.current = onToken;
  onWidgetErrorRef.current = onWidgetError;

  // Mount once per action; remove only on unmount / action change.
  useEffect(() => {
    let cancelled = false;
    onTokenRef.current(null);
    setInteractive(false);

    loadTurnstileScript()
      .then(() => {
        if (cancelled || !containerRef.current || !window.turnstile) return;
        if (widgetIdRef.current) {
          window.turnstile.remove(widgetIdRef.current);
          widgetIdRef.current = null;
        }
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          action,
          // Hide chrome unless a challenge needs a click/checkbox.
          appearance: "interaction-only",
          callback: (token) => {
            setInteractive(false);
            onTokenRef.current(token);
          },
          "before-interactive-callback": () => setInteractive(true),
          "after-interactive-callback": () => setInteractive(false),
          "error-callback": (errorCode) => {
            setInteractive(false);
            onTokenRef.current(null);
            onWidgetErrorRef.current?.(explainTurnstileError(errorCode));
          },
          "expired-callback": () => {
            setInteractive(false);
            onTokenRef.current(null);
          },
        });
        lastResetRef.current = resetSignal;
      })
      .catch(() => {
        if (!cancelled) {
          setInteractive(false);
          onTokenRef.current(null);
          onWidgetErrorRef.current?.(explainTurnstileError(undefined));
        }
      });

    return () => {
      cancelled = true;
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [action]);

  // Spin: after submit, reset the retained widget id (tokens are single-use).
  useEffect(() => {
    if (resetSignal === lastResetRef.current) return;
    lastResetRef.current = resetSignal;
    setInteractive(false);
    onTokenRef.current(null);
    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
    }
  }, [resetSignal]);

  // Clip the host when invisible / non-interactive so the form has no empty gap.
  // Do not use size:"invisible" — Turnstile rejects that render param.
  const hostClass = interactive
    ? ["min-h-[65px] w-full max-w-[300px]", className].filter(Boolean).join(" ")
    : "m-0 h-0 w-0 max-h-0 overflow-hidden p-0 opacity-0 pointer-events-none [&>iframe]:!m-0";

  return (
    <div className={hostClass} aria-hidden={!interactive}>
      <div ref={containerRef} />
    </div>
  );
}
