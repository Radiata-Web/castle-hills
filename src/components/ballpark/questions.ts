import {
  DoorOpen,
  Fence,
  Layers,
  PanelsLeftRight,
  Tent,
  Warehouse,
  type LucideIcon,
} from "lucide-react";
import type { ServiceId } from "@/lib/ballpark";

export type ServiceChoiceDef = {
  value: ServiceId;
  label: string;
  hint: string;
  icon: LucideIcon;
};

export const SERVICE_CHOICES: ServiceChoiceDef[] = [
  { value: "fence", label: "Fence staining", hint: "Wood privacy or picket fence", icon: Fence },
  { value: "deck", label: "Deck staining", hint: "Decking, railings and stairs", icon: Layers },
  {
    value: "pergola",
    label: "Patio cover or pergola",
    hint: "Stained wood overhead structures",
    icon: Tent,
  },
  { value: "garage", label: "Garage doors", hint: "Single or double doors", icon: Warehouse },
  {
    value: "front_door",
    label: "Front door",
    hint: "Entry doors, one or both sides",
    icon: DoorOpen,
  },
  {
    value: "shutters",
    label: "Shutters",
    hint: "Counted by window pair",
    icon: PanelsLeftRight,
  },
];

/** Questionnaire navigation steps (related fields may share one step). */
export type QuestionnaireStepId =
  | "services"
  | "fence"
  | "deck_sqft"
  | "pergola_sqft"
  | "garage"
  | "front_door"
  | "shutters";

export type QuestionKind =
  | "services"
  | "single"
  | "number"
  | "fence"
  | "garage"
  | "front_door"
  | "shutters";

export type QuestionChoice = {
  value: string;
  label: string;
};

export type QuestionDef = {
  name: QuestionnaireStepId;
  title: string;
  description?: string;
  kind: QuestionKind;
  enabledWhen: (services: ServiceId[]) => boolean;
  choices?: QuestionChoice[];
  unit?: string;
  ariaUnitLabel?: string;
  areaHelper?: boolean;
  choiceLayout?: "services" | "short" | "pair";
};

export const QUESTIONS: QuestionDef[] = [
  {
    name: "services",
    title: "What would you like a ballpark estimate for?",
    description: "Pick everything you're considering. You can change this later.",
    kind: "services",
    enabledWhen: () => true,
    choiceLayout: "services",
  },
  {
    name: "fence",
    title: "Tell us about your fence",
    description:
      "Measure along the fence line—round numbers are fine. Then pick the closest height.",
    kind: "fence",
    enabledWhen: (s) => s.includes("fence"),
  },
  {
    name: "deck_sqft",
    title: "About how many square feet is the deck?",
    description: "Length × width is close enough. Railings and stairs are included.",
    kind: "number",
    unit: "sq ft",
    ariaUnitLabel: "Deck area in square feet",
    areaHelper: true,
    enabledWhen: (s) => s.includes("deck"),
  },
  {
    name: "pergola_sqft",
    title: "How big is the area under the patio cover or pergola?",
    description: "Measure the ground beneath it, length × width.",
    kind: "number",
    unit: "sq ft",
    ariaUnitLabel: "Patio cover area in square feet",
    areaHelper: true,
    enabledWhen: (s) => s.includes("pergola"),
  },
  {
    name: "garage",
    title: "How many garage doors?",
    description: "Count single-car and double-car doors separately. Choose at least one.",
    kind: "garage",
    enabledWhen: (s) => s.includes("garage"),
  },
  {
    name: "front_door",
    title: "Tell us about your entry doors",
    description: "A double front door counts as two doors.",
    kind: "front_door",
    enabledWhen: (s) => s.includes("front_door"),
  },
  {
    name: "shutters",
    title: "How many pairs of shutters?",
    description: "One pair covers one window. Enter 0 for a floor with none.",
    kind: "shutters",
    enabledWhen: (s) => s.includes("shutters"),
  },
];

export const FENCE_HEIGHT_CHOICES: QuestionChoice[] = [
  { value: "6", label: "6 ft" },
  { value: "8", label: "8 ft" },
];

export const DOOR_SIDES_CHOICES: QuestionChoice[] = [
  { value: "one", label: "Outside only" },
  { value: "both", label: "Inside and outside" },
];

export const FIRST_ITEM_BY_SERVICE: Record<ServiceId, QuestionnaireStepId> = {
  fence: "fence",
  deck: "deck_sqft",
  pergola: "pergola_sqft",
  garage: "garage",
  front_door: "front_door",
  shutters: "shutters",
};

export function enabledQuestions(services: ServiceId[]): QuestionDef[] {
  return QUESTIONS.filter((q) => q.enabledWhen(services));
}
