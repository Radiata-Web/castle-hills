import { Link } from "@tanstack/react-router";
import Image from "@/components/ui/optimized-image";
import { cn } from "@/lib/utils";

/** Shared mark height — used in navbar, footer, and choose-us. */
export const LOGO_MARK_HEIGHT_PX = 44;
const MARK_WIDTH_PX = Math.round(LOGO_MARK_HEIGHT_PX * (708 / 572));

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
        Mark is decorative beside the HTML wordmark.
        Empty alt + aria-hidden so SR announces the brand text once.
        Height is CSS-locked — ch-logo.svg ships with width/height="100%".
      */}
      <Image
        src="/logos/ch-logo.svg"
        width={MARK_WIDTH_PX}
        height={LOGO_MARK_HEIGHT_PX}
        alt=""
        priority={priority}
        className="h-[44px] w-auto shrink-0 object-contain"
        aria-hidden
      />
      <span className="min-w-0 font-sans text-base font-bold leading-[0.95] tracking-tight sm:text-lg sm:leading-[0.95]">
        <span className="block whitespace-nowrap">Castle Hills</span>
        <span className="block whitespace-nowrap">Stain & Restoration</span>
      </span>
    </Link>
  );
}
