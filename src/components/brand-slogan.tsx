import { cn } from "@/lib/utils";

const WORDS = ["DESIGN", "PROTECT", "RESTORE"] as const;

type BrandSloganProps = {
  className?: string;
};

/**
 * Homepage brand line. Prefer HTML text over slogan-white.svg:
 * external <img> SVGs cannot use page @fontsource fonts, so SVG <text>
 * fell back to a serif default on production.
 */
export default function BrandSlogan({ className }: BrandSloganProps) {
  return (
    <p
      className={cn(
        "font-sans text-[0.7rem] font-normal uppercase tracking-[0.22em] text-zinc-50 sm:text-xs sm:tracking-[0.28em]",
        className,
      )}
      aria-label="Design, Protect, Restore"
    >
      {WORDS.map((word, index) => (
        <span key={word} className="inline-flex items-center">
          {index > 0 ? (
            <span
              className="mx-2.5 inline-block size-1.5 shrink-0 rounded-full bg-accent sm:mx-3"
              aria-hidden
            />
          ) : null}
          <span>{word}</span>
        </span>
      ))}
    </p>
  );
}
