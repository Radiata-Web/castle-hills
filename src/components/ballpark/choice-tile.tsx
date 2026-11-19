import { cn } from "@/lib/utils";

type ChoiceTileProps = {
  label: string;
  selected: boolean;
  onSelect: () => void;
  invalid?: boolean;
  name: string;
  value: string;
};

/** Standalone selectable tile (no radio circle). Used when a step has multiple choice groups. */
export function ChoiceTile({
  label,
  selected,
  onSelect,
  invalid = false,
  name,
  value,
}: ChoiceTileProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      data-checked={selected ? "" : undefined}
      data-invalid={invalid ? "" : undefined}
      name={name}
      value={value}
      onClick={onSelect}
      className={cn(
        "min-h-14 w-full rounded-lg border border-zinc-200 bg-white px-4 py-3",
        "flex items-center justify-center text-center cursor-pointer",
        "text-base font-medium text-zinc-900",
        "transition-[background-color,border-color] duration-150 hover:bg-zinc-50",
        "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
        selected && "border-primary bg-accent-light/60",
        invalid && "border-destructive",
      )}
    >
      {label}
    </button>
  );
}
