import { Link } from "@tanstack/react-router";
import Image from "@/components/ui/optimized-image";
import { cn } from "@/lib/utils";

/** Shared mark height — used in navbar, footer, and choose-us. */
export const LOGO_MARK_HEIGHT_PX = 40;
const MARK_WIDTH_PX = Math.round(LOGO_MARK_HEIGHT_PX * (708 / 572));

const wordmarkClassName =
  "min-w-0 font-sans text-[14px] font-bold leading-[0.95] tracking-tight sm:text-base sm:leading-[0.95]";

function Wordmark({ lines }: { lines: [string, string] }) {
  return (
    <span className={wordmarkClassName}>
      <span className="block whitespace-nowrap">{lines[0]}</span>
      <span className="block whitespace-nowrap">{lines[1]}</span>
    </span>
  );
}

export default function Logo({
  className,
  priority = true,
}: {
  className?: string;
  /** Eager-load the mark (navbar / above-fold). Footer should pass false. */
  priority?: boolean;
}) {
  return (
    <Link
      to="/"
      className={cn(
        "flex max-w-full shrink-0 items-center gap-2.5 text-foreground",
        className,
      )}
    >
      {/*
        Mark is decorative beside the HTML wordmarks.
        Empty alt + aria-hidden so SR announces the brand text once each.
        Height is CSS-locked — ch-logo.svg ships with width/height="100%".
      */}
      <Image
        src="/logos/ch-logo.svg"
        width={MARK_WIDTH_PX}
        height={LOGO_MARK_HEIGHT_PX}
        alt=""
        priority={priority}
        className="h-10 w-auto shrink-0 object-contain"
        aria-hidden
      />
      <Wordmark lines={["Castle Hills", "Stain & Restoration"]} />
      <span
        className="mx-0.5 h-8 w-px shrink-0 bg-foreground/20"
        aria-hidden
      />
      <Wordmark lines={["Castle Hills", "Painting"]} />
    </Link>
  );
}
