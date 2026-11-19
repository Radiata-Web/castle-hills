import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

function digitsOnly(raw: string, maxDigits = 5): string {
  return raw.replace(/\D/g, "").slice(0, maxDigits);
}

type NumericFieldProps = {
  value: string;
  onChange: (next: string) => void;
  unit: string;
  ariaLabel: string;
  label?: string;
  areaHelper?: boolean;
  invalid?: boolean;
};

/** Plain number field for composite questionnaire steps (not QuestionnaireInput). */
export function NumericField({
  value,
  onChange,
  unit,
  ariaLabel,
  label,
  areaHelper = false,
  invalid = false,
}: NumericFieldProps) {
  const [open, setOpen] = useState(false);
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");

  function applyArea(nextL: string, nextW: string) {
    const l = Number(nextL);
    const w = Number(nextW);
    if (nextL && nextW && Number.isFinite(l) && Number.isFinite(w)) {
      onChange(String(Math.round(l * w)));
    }
  }

  return (
    <div className="space-y-2">
      {label ? <p className="text-sm font-medium text-zinc-900">{label}</p> : null}
      <div className="relative w-full max-w-56">
        <Input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete="off"
          enterKeyHint="next"
          aria-label={ariaLabel}
          aria-invalid={invalid || undefined}
          value={value}
          onChange={(e) => onChange(digitsOnly(e.target.value))}
          className="h-14 text-lg tabular-nums pr-16"
        />
        <span
          className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-zinc-500"
          aria-hidden
        >
          {unit}
        </span>
      </div>

      {areaHelper ? (
        <Collapsible open={open} onOpenChange={setOpen}>
          <CollapsibleTrigger
            type="button"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary"
          >
            Help me calculate
            <ChevronDown
              className={cn("size-4 transition-transform duration-150", open && "rotate-180")}
              aria-hidden
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-3">
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
              <Input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                autoComplete="off"
                aria-label="Length (ft)"
                placeholder="Length (ft)"
                value={length}
                onChange={(e) => {
                  const next = digitsOnly(e.target.value);
                  setLength(next);
                  applyArea(next, width);
                }}
                className="h-12 text-base tabular-nums"
              />
              <span className="text-zinc-500" aria-hidden>
                ×
              </span>
              <Input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                autoComplete="off"
                aria-label="Width (ft)"
                placeholder="Width (ft)"
                value={width}
                onChange={(e) => {
                  const next = digitsOnly(e.target.value);
                  setWidth(next);
                  applyArea(length, next);
                }}
                className="h-12 text-base tabular-nums"
              />
            </div>
          </CollapsibleContent>
        </Collapsible>
      ) : null}
    </div>
  );
}
