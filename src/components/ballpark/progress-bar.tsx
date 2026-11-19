type ProgressBarProps = {
  current: number;
  total: number;
};

export function ProgressBar({ current, total }: ProgressBarProps) {
  const pct = total > 0 ? Math.min(100, Math.round((current / total) * 100)) : 0;
  const label = `${current} of ${total}`;

  return (
    <div className="flex items-center gap-4">
      <div
        role="progressbar"
        aria-label="Ballpark estimate progress"
        aria-valuemin={1}
        aria-valuemax={total || undefined}
        aria-valuenow={total ? current : undefined}
        aria-valuetext={total ? label : undefined}
        className="h-1 min-w-0 flex-1 rounded-full bg-zinc-100"
      >
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-300 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="shrink-0 text-sm text-zinc-500 tabular-nums" aria-hidden>
        {label}
      </p>
    </div>
  );
}
