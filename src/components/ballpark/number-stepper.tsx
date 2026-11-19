import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

function digitsOnly(raw: string, maxDigits: number): string {
  return raw.replace(/\D/g, "").slice(0, maxDigits);
}

type NumberStepperProps = {
  value: string;
  onChange: (next: string) => void;
  min: number;
  max: number;
  ariaLabel: string;
  label?: string;
  unit?: string;
  invalid?: boolean;
};

/** Count control with − / + and an optional typed value. */
export function NumberStepper({
  value,
  onChange,
  min,
  max,
  ariaLabel,
  label,
  unit,
  invalid = false,
}: NumberStepperProps) {
  const maxDigits = String(max).length;
  const parsed = value === "" ? null : Number(value);
  const atMin = parsed === null || parsed <= min;
  const atMax = parsed !== null && parsed >= max;

  function step(delta: 1 | -1) {
    // Empty + starts at 1 when min is 0, otherwise at min.
    const base = parsed === null ? 0 : parsed;
    const next = Math.min(max, Math.max(min, base + delta));
    if (parsed === null && delta < 0) return;
    onChange(String(next));
  }

  return (
    <div className="space-y-2">
      {label ? <p className="text-sm font-medium text-zinc-900">{label}</p> : null}
      <div className="flex w-full max-w-56 items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="icon-lg"
          aria-label={`Decrease ${ariaLabel}`}
          disabled={atMin}
          className="shrink-0 border-zinc-200"
          onClick={() => step(-1)}
        >
          <Minus aria-hidden />
        </Button>
        <div className="relative min-w-0 flex-1">
          <Input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            autoComplete="off"
            enterKeyHint="next"
            aria-label={ariaLabel}
            aria-invalid={invalid || undefined}
            placeholder="0"
            value={value}
            onChange={(e) => {
              const next = digitsOnly(e.target.value, maxDigits);
              if (next === "") {
                onChange("");
                return;
              }
              const n = Number(next);
              if (!Number.isFinite(n)) return;
              onChange(String(Math.min(max, n)));
            }}
            className={cn("h-14 text-center text-lg tabular-nums", unit && "pr-16")}
          />
          {unit ? (
            <span
              className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-zinc-500"
              aria-hidden
            >
              {unit}
            </span>
          ) : null}
        </div>
        <Button
          type="button"
          variant="outline"
          size="icon-lg"
          aria-label={`Increase ${ariaLabel}`}
          disabled={atMax}
          className="shrink-0 border-zinc-200"
          onClick={() => step(1)}
        >
          <Plus aria-hidden />
        </Button>
      </div>
    </div>
  );
}
