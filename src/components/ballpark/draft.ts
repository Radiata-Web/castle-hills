import type { ServiceId } from "@/lib/ballpark";
import type { ProjectAnswers } from "@/lib/ballpark";

/** Mutable questionnaire draft (partial until submit). */
export type BallparkDraft = {
  services: ServiceId[];
  fence_length: string;
  fence_height: "" | "6" | "8";
  deck_sqft: string;
  pergola_sqft: string;
  garage_single: string;
  garage_double: string;
  door_count: string;
  door_sides: "" | "one" | "both";
  shutters_first: string;
  shutters_second: string;
};

export const EMPTY_DRAFT: BallparkDraft = {
  services: [],
  fence_length: "",
  fence_height: "",
  deck_sqft: "",
  pergola_sqft: "",
  garage_single: "0",
  garage_double: "0",
  door_count: "1",
  door_sides: "",
  shutters_first: "0",
  shutters_second: "0",
};

export function draftToProject(draft: BallparkDraft): ProjectAnswers {
  const services = draft.services;
  const project: ProjectAnswers = { services };

  if (services.includes("fence")) {
    project.fence = {
      linearFeet: Number(draft.fence_length),
      height: draft.fence_height as "6" | "8",
    };
  }
  if (services.includes("deck")) {
    project.deck = { sqft: Number(draft.deck_sqft) };
  }
  if (services.includes("pergola")) {
    project.pergola = { sqft: Number(draft.pergola_sqft) };
  }
  if (services.includes("garage")) {
    project.garage = {
      single: Number(draft.garage_single),
      double: Number(draft.garage_double),
    };
  }
  if (services.includes("front_door")) {
    project.frontDoor = {
      count: Number(draft.door_count),
      sides: draft.door_sides as "one" | "both",
    };
  }
  if (services.includes("shutters")) {
    project.shutters = {
      firstFloorPairs: Number(draft.shutters_first),
      secondFloorPairs: Number(draft.shutters_second),
    };
  }

  return project;
}

function doorCountLabel(count: string): string {
  const n = Number(count);
  if (n === 1) return "1 door";
  return `${count} doors`;
}

export function buildProjectSummary(
  draft: BallparkDraft,
): Array<{ label: string; detail: string }> {
  const lines: Array<{ label: string; detail: string }> = [];
  const s = draft.services;

  if (s.includes("fence")) {
    lines.push({
      label: "Fence staining",
      detail: `${draft.fence_length} ft, ${draft.fence_height} ft tall`,
    });
  }
  if (s.includes("deck")) {
    lines.push({
      label: "Deck staining",
      detail: `${Number(draft.deck_sqft).toLocaleString()} sq ft`,
    });
  }
  if (s.includes("pergola")) {
    lines.push({
      label: "Patio cover or pergola",
      detail: `${Number(draft.pergola_sqft).toLocaleString()} sq ft`,
    });
  }
  if (s.includes("garage")) {
    lines.push({
      label: "Garage doors",
      detail: `${draft.garage_single} single, ${draft.garage_double} double`,
    });
  }
  if (s.includes("front_door")) {
    lines.push({
      label: "Front door",
      detail: `${doorCountLabel(draft.door_count)}, ${
        draft.door_sides === "both" ? "inside and outside" : "outside only"
      }`,
    });
  }
  if (s.includes("shutters")) {
    const first = Number(draft.shutters_first);
    const second = Number(draft.shutters_second);
    lines.push({
      label: "Shutters",
      detail: `${first + second} pairs (${first} first floor, ${second} second floor)`,
    });
  }

  return lines;
}
