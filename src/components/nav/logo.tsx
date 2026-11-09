import { Link } from "@tanstack/react-router";
import Image from "@/components/ui/optimized-image";
import { cn } from "@/lib/utils";

/**
 * Mark height must be set in CSS — ch-logo.svg ships with width/height="100%",
 * so unconstrained imgs can inflate to the viewBox (~708px) and crowd the nav.
 */
const SIZE = {
  sm: {
    markClass: "h-7 w-auto",
    markPx: 28,
    wordmark: "text-xs leading-[1.15] sm:text-sm",
  },
  md: {
    markClass: "h-9 w-auto",
    markPx: 36,
    wordmark: "text-sm leading-[1.15] sm:text-base",
  },
  lg: {
    markClass: "h-11 w-auto",
    markPx: 44,
    wordmark: "text-base leading-[1.15] sm:text-lg",
  },
} as const;

export default function Logo({
  className,
  size = "sm",
  priority = true,
}: {
  className?: string;
  /** Visual scale — navbar uses sm; footer / callouts can bump up. */
  size?: keyof typeof SIZE;
  /** Eager-load the mark (navbar / above-fold). Footer should pass false. */
  priority?: boolean;
}) {
  const { markClass, markPx, wordmark } = SIZE[size];

  return (
    <Link
      to="/"
      className={cn(
        "flex max-w-full shrink-0 items-center gap-2 text-foreground",
        className,
      )}
    >
      {/*
        Mark is decorative beside the HTML wordmark.
        Empty alt + aria-hidden so SR announces the brand text once.
      */}
      <Image
        src="/logos/ch-logo.svg"
        width={markPx}
        height={Math.round(markPx * (572 / 708))}
        alt=""
        priority={priority}
        className={cn("shrink-0 object-contain", markClass)}
        aria-hidden
      />
      <span
        className={cn(
          "min-w-0 font-sans font-bold tracking-tight",
          wordmark,
        )}
      >
        <span className="block whitespace-nowrap">Castle Hills</span>
        <span className="block whitespace-nowrap">Stain & Restoration</span>
      </span>
    </Link>
  );
}
