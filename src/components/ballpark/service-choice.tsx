import type { LucideIcon } from "lucide-react";
import { QuestionnaireChoice, QuestionnaireChoiceDescription } from "@/components/ui/questionnaire";
import { cn } from "@/lib/utils";

/** Card choice: no radio circle — selected state is border + background only. */
const choiceBaseClassName = cn(
  "min-h-14 w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 cursor-pointer transition-[background-color,border-color] duration-150 hover:bg-zinc-50",
  "data-checked:border-primary data-checked:bg-accent-light/60",
  "data-invalid:border-destructive",
  "has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-ring/50",
  // Hide the built-in radio/checkbox indicator and shortcut badge.
  "[&_[data-slot=questionnaire-choice-indicator]]:hidden",
  "[&_[data-slot=questionnaire-choice-shortcut]]:hidden",
);

const serviceChoiceClassName = cn(
  choiceBaseClassName,
  "items-center text-left",
  // ChoiceLabel defaults to a column; force a horizontal icon + copy row.
  "[&_[data-slot=questionnaire-choice-label]]:flex-row",
  "[&_[data-slot=questionnaire-choice-label]]:items-center",
  "[&_[data-slot=questionnaire-choice-label]]:gap-3",
);

const simpleChoiceClassName = cn(
  choiceBaseClassName,
  "items-center justify-center text-center",
  "[&_[data-slot=questionnaire-choice-label]]:items-center",
  "[&_[data-slot=questionnaire-choice-label]]:justify-center",
  "[&_[data-slot=questionnaire-choice-label]]:text-center",
);

type ServiceChoiceProps = {
  value: string;
  label: string;
  hint?: string;
  icon?: LucideIcon;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function ServiceChoice({
  value,
  label,
  hint,
  icon: Icon,
  checked,
  onChange,
}: ServiceChoiceProps) {
  return (
    <QuestionnaireChoice
      value={value}
      checked={checked}
      onChange={onChange}
      className={serviceChoiceClassName}
    >
      {Icon ? <Icon className="size-5 shrink-0 text-zinc-700" aria-hidden /> : null}
      <span className="min-w-0 flex-1 text-left">
        <span className="block text-base font-medium text-zinc-900">{label}</span>
        {hint ? (
          <QuestionnaireChoiceDescription className="text-sm text-zinc-500">
            {hint}
          </QuestionnaireChoiceDescription>
        ) : null}
      </span>
    </QuestionnaireChoice>
  );
}

export function SimpleChoice({
  value,
  label,
  checked,
  onChange,
}: Omit<ServiceChoiceProps, "hint" | "icon">) {
  return (
    <QuestionnaireChoice
      value={value}
      checked={checked}
      onChange={onChange}
      className={simpleChoiceClassName}
    >
      <span className="text-base font-medium text-zinc-900">{label}</span>
    </QuestionnaireChoice>
  );
}
