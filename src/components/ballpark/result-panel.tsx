import { Link } from "@tanstack/react-router";
import { Info, Percent } from "lucide-react";
import { MinimumDialog } from "@/components/ballpark/minimum-dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  BALLPARK_DISCLAIMER,
  formatRange,
  formatUsd,
  type EstimateSuccess,
  type ServiceId,
} from "@/lib/ballpark";
import { ctaGroupClassName, ctaPrimaryClassName } from "@/lib/cta";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";
import { useCountUp } from "@/hooks/use-count-up";
import { cn } from "@/lib/utils";

export type ProjectSummaryLine = {
  label: string;
  detail: string;
};

type ResultPanelProps = {
  result: EstimateSuccess;
  summary: ProjectSummaryLine[];
  minimumOpen: boolean;
  onMinimumOpenChange: (open: boolean) => void;
  onAddService: (service: ServiceId) => void;
  onKeepMinimum: () => void;
  onEdit: () => void;
};

function NoticeIcon({ code }: { code: EstimateSuccess["notices"][number]["code"] }) {
  if (code === "bundle_discount") return <Percent aria-hidden />;
  return <Info aria-hidden />;
}

function RangeFigures({ low, high }: { low: number; high: number }) {
  const lowCount = useCountUp(low);
  const highCount = useCountUp(high);
  const same = low === high;

  return (
    <p
      className="text-4xl sm:text-5xl font-bold tabular-nums text-zinc-900"
      aria-hidden
    >
      {same ? formatUsd(lowCount) : `${formatUsd(lowCount)} – ${formatUsd(highCount)}`}
    </p>
  );
}

export function ResultPanel({
  result,
  summary,
  minimumOpen,
  onMinimumOpenChange,
  onAddService,
  onKeepMinimum,
  onEdit,
}: ResultPanelProps) {
  const minNotice = result.notices.find((n) => n.code === "project_minimum");
  const orderedNotices = [
    ...result.notices.filter((n) => n.code === "bundle_discount"),
    ...result.notices.filter((n) => n.code !== "bundle_discount"),
  ];

  const liveText = `Your ballpark estimate is ${
    result.range.low === result.range.high
      ? formatUsd(result.range.low)
      : `${formatUsd(result.range.low)} to ${formatUsd(result.range.high)}`
  }.`;

  return (
    <div className="max-w-xl space-y-6">
      <h2
        tabIndex={-1}
        className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-900 text-balance outline-none animate-in fade-in-0 slide-in-from-bottom-3 duration-300 ease-out fill-mode-both motion-reduce:slide-in-from-bottom-0"
      >
        Your ballpark estimate
      </h2>

      <div
        className="rounded-xl bg-accent-light/40 px-6 py-6 sm:px-8 sm:py-8 space-y-2 animate-in fade-in-0 slide-in-from-bottom-3 duration-300 ease-out fill-mode-both motion-reduce:slide-in-from-bottom-0"
        style={{ animationDelay: "0ms" }}
      >
        <RangeFigures low={result.range.low} high={result.range.high} />
        <p className="sr-only" aria-live="polite">
          {liveText}
        </p>
        <p className="text-sm text-zinc-600">
          Includes prep: power washing, cleaning and removing old stain or paint.
        </p>
      </div>

      <div
        className="space-y-3 animate-in fade-in-0 slide-in-from-bottom-3 duration-300 ease-out fill-mode-both motion-reduce:slide-in-from-bottom-0"
        style={{ animationDelay: "100ms" }}
      >
        <h3 className="text-base font-semibold text-zinc-900">Your project</h3>
        <dl className="space-y-2 text-sm text-zinc-600">
          {summary.map((line) => (
            <div key={line.label}>
              <dt className="sr-only">{line.label}</dt>
              <dd>
                {line.label} — {line.detail}
              </dd>
            </div>
          ))}
        </dl>

        <div className="space-y-3 pt-2">
          {orderedNotices.map((notice) => (
            <Alert key={notice.code}>
              <NoticeIcon code={notice.code} />
              <AlertDescription>
                {notice.message}
                {notice.code === "bundle_discount" ? (
                  <>
                    {" "}
                    <a
                      href={PHONE_TEL}
                      className="font-medium text-primary underline underline-offset-4"
                    >
                      Call {PHONE_DISPLAY}
                    </a>
                  </>
                ) : null}
              </AlertDescription>
            </Alert>
          ))}
        </div>
      </div>

      <div
        className={cn(
          ctaGroupClassName,
          "animate-in fade-in-0 slide-in-from-bottom-3 duration-300 ease-out fill-mode-both motion-reduce:slide-in-from-bottom-0",
        )}
        style={{ animationDelay: "200ms" }}
      >
        <Button
          className={`min-h-11 ${ctaPrimaryClassName}`}
          nativeButton={false}
          render={<a href={PHONE_TEL} />}
        >
          Call {PHONE_DISPLAY}
        </Button>
        <Button
          variant="outline"
          className="min-h-11"
          nativeButton={false}
          render={<Link to="/contact-us" />}
        >
          Schedule a free in-person estimate
        </Button>
        <Button variant="ghost" className="min-h-11" onClick={onEdit}>
          Edit answers
        </Button>
      </div>

      <p className="text-xs text-zinc-500 text-pretty">{BALLPARK_DISCLAIMER}</p>

      {minNotice ? (
        <MinimumDialog
          open={minimumOpen}
          onOpenChange={onMinimumOpenChange}
          message={minNotice.message}
          suggestedService={minNotice.suggestedService}
          onAddService={onAddService}
          onKeep={onKeepMinimum}
        />
      ) : null}
    </div>
  );
}

export function formatRangeLive(low: number, high: number): string {
  return formatRange(low, high);
}
