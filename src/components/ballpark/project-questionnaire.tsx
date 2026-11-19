"use client";

import { useMemo } from "react";
import { ChevronLeft, ChevronRight, Home } from "lucide-react";
import { ChoiceTile } from "@/components/ballpark/choice-tile";
import type { BallparkDraft } from "@/components/ballpark/draft";
import { NumberStepper } from "@/components/ballpark/number-stepper";
import { NumericField } from "@/components/ballpark/numeric-field";
import { ProgressBar } from "@/components/ballpark/progress-bar";
import {
  DOOR_SIDES_CHOICES,
  FENCE_HEIGHT_CHOICES,
  QUESTIONS,
  SERVICE_CHOICES,
  enabledQuestions,
  type QuestionDef,
  type QuestionnaireStepId,
} from "@/components/ballpark/questions";
import { ServiceChoice } from "@/components/ballpark/service-choice";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Questionnaire,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireItem,
  QuestionnaireTitle,
} from "@/components/ui/questionnaire";
import { LIMITS, projectStepSchemas } from "@/lib/ballpark";
import type { ServiceId } from "@/lib/ballpark";
import { ctaPrimaryClassName } from "@/lib/cta";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";
import { cn } from "@/lib/utils";

function choiceGridClass(layout: QuestionDef["choiceLayout"]): string {
  if (layout === "services") return "grid gap-3 sm:grid-cols-2";
  if (layout === "pair") return "grid gap-3 grid-cols-1 sm:grid-cols-2";
  return "grid gap-3 grid-cols-2 sm:grid-cols-4";
}

function validateStep(draft: BallparkDraft, name: QuestionnaireStepId): string | null {
  switch (name) {
    case "services": {
      const result = projectStepSchemas.services.safeParse(draft.services);
      return result.success
        ? null
        : (result.error.issues[0]?.message ?? "Choose at least one service.");
    }
    case "fence": {
      const result = projectStepSchemas.fence.safeParse({
        linearFeet: draft.fence_length === "" ? undefined : Number(draft.fence_length),
        height: draft.fence_height || undefined,
      });
      return result.success ? null : (result.error.issues[0]?.message ?? "Choose an option.");
    }
    case "deck_sqft": {
      const result = projectStepSchemas.deck_sqft.safeParse(
        draft.deck_sqft === "" ? undefined : Number(draft.deck_sqft),
      );
      return result.success
        ? null
        : (result.error.issues[0]?.message ?? "Enter a number between 20 and 5000.");
    }
    case "pergola_sqft": {
      const result = projectStepSchemas.pergola_sqft.safeParse(
        draft.pergola_sqft === "" ? undefined : Number(draft.pergola_sqft),
      );
      return result.success
        ? null
        : (result.error.issues[0]?.message ?? "Enter a number between 20 and 3000.");
    }
    case "garage": {
      const result = projectStepSchemas.garage.safeParse({
        single: draft.garage_single === "" ? undefined : Number(draft.garage_single),
        double: draft.garage_double === "" ? undefined : Number(draft.garage_double),
      });
      return result.success
        ? null
        : (result.error.issues[0]?.message ?? "Choose at least one garage door.");
    }
    case "front_door": {
      const result = projectStepSchemas.front_door.safeParse({
        count: draft.door_count === "" ? undefined : Number(draft.door_count),
        sides: draft.door_sides || undefined,
      });
      return result.success ? null : (result.error.issues[0]?.message ?? "Choose an option.");
    }
    case "shutters": {
      const result = projectStepSchemas.shutters.safeParse({
        firstFloorPairs: draft.shutters_first === "" ? undefined : Number(draft.shutters_first),
        secondFloorPairs: draft.shutters_second === "" ? undefined : Number(draft.shutters_second),
      });
      return result.success
        ? null
        : (result.error.issues[0]?.message ?? "Add at least one pair of shutters.");
    }
  }
}

type ProjectQuestionnaireProps = {
  draft: BallparkDraft;
  onDraftChange: (next: BallparkDraft) => void;
  item: QuestionnaireStepId;
  onItemChange: (next: QuestionnaireStepId) => void;
  errors: Partial<Record<QuestionnaireStepId, string>>;
  onErrorsChange: (next: Partial<Record<QuestionnaireStepId, string>>) => void;
  onComplete: () => void;
};

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-sm font-medium text-zinc-900">{children}</p>;
}

export function ProjectQuestionnaire({
  draft,
  onDraftChange,
  item,
  onItemChange,
  errors,
  onErrorsChange,
  onComplete,
}: ProjectQuestionnaireProps) {
  const enabled = useMemo(() => enabledQuestions(draft.services), [draft.services]);
  const enabledNames = enabled.map((q) => q.name);
  const currentIndex = Math.max(0, enabledNames.indexOf(item));
  const progressCurrent = currentIndex + 1;
  const progressTotal = enabled.length + 1;

  const itemsMeta = QUESTIONS.map((q) => ({
    name: q.name,
    disabled: !q.enabledWhen(draft.services),
    // Not used for navigation — Continue is type="button" + zod (see goNext).
    required: false,
  }));

  function clearStepError(name: QuestionnaireStepId) {
    if (!errors[name]) return;
    const cleared = { ...errors };
    delete cleared[name];
    onErrorsChange(cleared);
  }

  /** Advance only after our zod gate. Do not use form submit / Questionnaire.Next:
   * Root validates registered Choice/Input answers first, and combined steps
   * (ChoiceTile / NumericField) never register those. */
  function goNext() {
    const message = validateStep(draft, item);
    if (message) {
      onErrorsChange({ ...errors, [item]: message });
      return;
    }
    clearStepError(item);
    if (currentIndex >= enabledNames.length - 1) {
      onComplete();
      return;
    }
    onItemChange(enabledNames[currentIndex + 1]!);
  }

  function goBack() {
    if (currentIndex <= 0) return;
    clearStepError(item);
    onItemChange(enabledNames[currentIndex - 1]!);
  }

  function toggleService(value: ServiceId, checked: boolean) {
    const services = checked
      ? [...draft.services, value]
      : draft.services.filter((s) => s !== value);
    onDraftChange({ ...draft, services });
  }

  function renderStepBody(question: QuestionDef, invalid: boolean) {
    if (question.kind === "services") {
      return (
        <div className="space-y-4">
          <QuestionnaireChoices className={choiceGridClass("services")}>
            {SERVICE_CHOICES.map((choice) => (
              <ServiceChoice
                key={choice.value}
                value={choice.value}
                label={choice.label}
                hint={choice.hint}
                icon={choice.icon}
                checked={draft.services.includes(choice.value)}
                onChange={(e) => toggleService(choice.value, e.target.checked)}
              />
            ))}
          </QuestionnaireChoices>
          <Alert className="border-zinc-200 bg-zinc-50 text-zinc-800">
            <Home aria-hidden />
            <AlertTitle className="text-zinc-900">Need house trim?</AlertTitle>
            <AlertDescription className="text-zinc-600">
              We stain and restore house trim too. Online pricing isn&apos;t available for trim—it
              needs a free in-person consultation.{" "}
              <a
                href={PHONE_TEL}
                className="font-medium text-primary underline underline-offset-4"
              >
                Call {PHONE_DISPLAY}
              </a>{" "}
              to schedule.
            </AlertDescription>
          </Alert>
        </div>
      );
    }

    if (question.kind === "fence") {
      return (
        <div className="space-y-6" role="group" aria-label="Fence details">
          <NumericField
            label="Fence length"
            value={draft.fence_length}
            onChange={(next) => onDraftChange({ ...draft, fence_length: next })}
            unit="ft"
            ariaLabel="Fence length in feet"
            invalid={invalid}
          />
          <div className="space-y-3">
            <FieldLabel>Fence height</FieldLabel>
            <div role="radiogroup" aria-label="Fence height" className={choiceGridClass("pair")}>
              {FENCE_HEIGHT_CHOICES.map((choice) => (
                <ChoiceTile
                  key={choice.value}
                  name="fence_height"
                  value={choice.value}
                  label={choice.label}
                  selected={draft.fence_height === choice.value}
                  invalid={invalid}
                  onSelect={() =>
                    onDraftChange({
                      ...draft,
                      fence_height: choice.value as BallparkDraft["fence_height"],
                    })
                  }
                />
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (question.kind === "garage") {
      return (
        <div className="space-y-6" role="group" aria-label="Garage doors">
          <NumberStepper
            label="Single-car doors"
            value={draft.garage_single}
            onChange={(next) => onDraftChange({ ...draft, garage_single: next })}
            min={LIMITS.garageSingle.min}
            max={LIMITS.garageSingle.max}
            ariaLabel="Single-car garage doors"
            invalid={invalid}
          />
          <NumberStepper
            label="Double-car doors"
            value={draft.garage_double}
            onChange={(next) => onDraftChange({ ...draft, garage_double: next })}
            min={LIMITS.garageDouble.min}
            max={LIMITS.garageDouble.max}
            ariaLabel="Double-car garage doors"
            invalid={invalid}
          />
        </div>
      );
    }

    if (question.kind === "front_door") {
      return (
        <div className="space-y-6" role="group" aria-label="Entry doors">
          <NumberStepper
            label="How many entry doors?"
            value={draft.door_count}
            onChange={(next) => onDraftChange({ ...draft, door_count: next })}
            min={LIMITS.frontDoorCount.min}
            max={LIMITS.frontDoorCount.max}
            unit="doors"
            ariaLabel="Entry door count"
            invalid={invalid}
          />
          <div className="space-y-3">
            <FieldLabel>Which sides should we refinish?</FieldLabel>
            <div role="radiogroup" aria-label="Door sides" className={choiceGridClass("pair")}>
              {DOOR_SIDES_CHOICES.map((choice) => (
                <ChoiceTile
                  key={choice.value}
                  name="door_sides"
                  value={choice.value}
                  label={choice.label}
                  selected={draft.door_sides === choice.value}
                  invalid={invalid}
                  onSelect={() =>
                    onDraftChange({
                      ...draft,
                      door_sides: choice.value as BallparkDraft["door_sides"],
                    })
                  }
                />
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (question.kind === "shutters") {
      return (
        <div className="space-y-6" role="group" aria-label="Shutter pairs">
          <NumberStepper
            label="First floor"
            value={draft.shutters_first}
            onChange={(next) => onDraftChange({ ...draft, shutters_first: next })}
            min={LIMITS.shutterPairs.min}
            max={LIMITS.shutterPairs.max}
            unit="pairs"
            ariaLabel="First-floor shutter pairs"
            invalid={invalid}
          />
          <NumberStepper
            label="Second floor"
            value={draft.shutters_second}
            onChange={(next) => onDraftChange({ ...draft, shutters_second: next })}
            min={LIMITS.shutterPairs.min}
            max={LIMITS.shutterPairs.max}
            unit="pairs"
            ariaLabel="Second-floor shutter pairs"
            invalid={invalid}
          />
        </div>
      );
    }

    if (question.kind === "number" && question.unit && question.ariaUnitLabel) {
      return (
        <NumericField
          value={String(draft[question.name as "deck_sqft" | "pergola_sqft"] ?? "")}
          onChange={(next) =>
            onDraftChange({
              ...draft,
              [question.name]: next,
            } as BallparkDraft)
          }
          unit={question.unit}
          ariaLabel={question.ariaUnitLabel}
          areaHelper={question.areaHelper}
          invalid={invalid}
        />
      );
    }

    return null;
  }

  const isFirst = currentIndex <= 0;
  const isLast = currentIndex >= enabledNames.length - 1;

  return (
    <Questionnaire
      item={item}
      onItemChange={(next) => onItemChange(next as QuestionnaireStepId)}
      items={itemsMeta}
      className="gap-6"
      // Root runs its own "answered via Choice/Input" gate before calling
      // onSubmit. Combined steps use ChoiceTile/NumericField, so submit always
      // fails that gate — navigate with buttons instead.
      onSubmit={(e) => e.preventDefault()}
      onKeyDown={(e) => {
        if (e.key !== "Enter" || e.defaultPrevented || e.nativeEvent.isComposing) return;
        if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey || e.repeat) return;
        const target = e.target;
        if (!(target instanceof HTMLInputElement) && !(target instanceof HTMLTextAreaElement)) {
          return;
        }
        // Plain inputs are outside the primitive's answer model; Enter would
        // implicit-submit and trip the Root gate. Advance via our zod path.
        if (target.closest("[data-slot=questionnaire-choice]")) return;
        e.preventDefault();
        goNext();
      }}
    >
      <ProgressBar current={progressCurrent} total={progressTotal} />

      {QUESTIONS.map((question) => {
        const disabled = !question.enabledWhen(draft.services);
        const invalid = Boolean(errors[question.name]);
        const errorMessage = errors[question.name];

        return (
          <QuestionnaireItem
            key={question.name}
            name={question.name}
            multiple={question.kind === "services"}
            required={false}
            disabled={disabled}
            invalid={invalid}
            className="gap-6 data-active:animate-in data-active:fade-in-0 data-active:slide-in-from-bottom-3 data-active:duration-300 data-active:ease-out motion-reduce:data-active:slide-in-from-bottom-0"
          >
            <div>
              <QuestionnaireTitle className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-900 text-balance">
                {question.title}
              </QuestionnaireTitle>
              {question.description ? (
                <QuestionnaireDescription className="mt-2 text-sm sm:text-base text-zinc-600 text-pretty">
                  {question.description}
                </QuestionnaireDescription>
              ) : null}
            </div>

            {renderStepBody(question, invalid)}

            {errorMessage ? (
              <p role="alert" className="text-sm text-destructive">
                {errorMessage}
              </p>
            ) : null}

            <div className="mt-8 flex items-center justify-between gap-3 border-t border-zinc-100 pt-6 max-sm:sticky max-sm:bottom-0 max-sm:-mx-5 max-sm:bg-card/95 max-sm:px-5 max-sm:py-4 max-sm:pb-[max(1rem,env(safe-area-inset-bottom))] max-sm:backdrop-blur max-sm:supports-[backdrop-filter]:bg-card/80">
              <Button
                type="button"
                variant="ghost"
                disabled={isFirst}
                className="min-h-11 enabled:active:scale-[0.96] transition-[scale] duration-150 ease-out"
                onClick={goBack}
              >
                <ChevronLeft className="size-4" aria-hidden />
                Back
              </Button>

              <Button
                type="button"
                className={cn(
                  ctaPrimaryClassName,
                  "min-h-11 enabled:active:scale-[0.96] transition-[scale] duration-150 ease-out",
                )}
                onClick={goNext}
              >
                {isLast ? "Continue to your details" : "Continue"}
                <ChevronRight className="size-4" aria-hidden />
              </Button>
            </div>
          </QuestionnaireItem>
        );
      })}
    </Questionnaire>
  );
}
