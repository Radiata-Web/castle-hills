// Hero.tsx
import * as React from "react";
import { Button } from "@/components/ui/button"; // shadcn button (optional)
import { cn } from "@/lib/utils";

type HeroProps = {
  title: string;
  subtitle?: string;
  backgroundImageUrl: string;
  // Optional CTA
  ctaLabel?: string;
  onCtaClick?: () => void;
  ctaHref?: string;
  // Layout / style options
  minHeightClass?: string; // e.g. "min-h-[60vh]" or "min-h-screen"
  overlayOpacityClass?: string; // e.g. "bg-black/60" or "bg-neutral-900/70"
  useShadcnButton?: boolean;
};

export function Hero({
  title,
  subtitle,
  backgroundImageUrl,
  ctaLabel,
  onCtaClick,
  ctaHref,
  minHeightClass = "min-h-[20vh]",
  overlayOpacityClass = "bg-black/60",
  useShadcnButton = true,
}: HeroProps) {
  const hasCta = Boolean(ctaLabel && (onCtaClick || ctaHref));

  const content = (
    <div
      className={[
        "inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-medium",
        "bg-primary text-primary-foreground shadow",
        "hover:bg-primary/90 transition-colors",
      ].join(" ")}
    >
      {ctaLabel}
    </div>
  );

  const CtaButton = () => {
    if (!hasCta) return null;

    if (useShadcnButton) {
      // shadcn Button variant
      if (ctaHref) {
        return (
          <Button asChild className="ml-auto" onClick={onCtaClick}>
            <a href={ctaHref}>{ctaLabel}</a>
          </Button>
        );
      }

      return (
        <Button className="ml-auto" onClick={onCtaClick}>
          {ctaLabel}
        </Button>
      );
    }

    // fallback plain button styled with Tailwind
    if (ctaHref) {
      return (
        <a href={ctaHref} className="ml-auto">
          {content}
        </a>
      );
    }

    return (
      <button
        type="button"
        onClick={onCtaClick}
        className="ml-auto inline-flex items-center justify-center rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
      >
        {ctaLabel}
      </button>
    );
  };

  return (
    <section
      className={[
        "relative w-full overflow-hidden h-full",
        "bg-cover bg-center bg-no-repeat",
        minHeightClass,
      ].join(" ")}
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      aria-label="Hero section"
    >
      {/* Dark overlay */}
      <div className={`absolute inset-0 h-full ${overlayOpacityClass}`} />

      {/* Content */}
      <div
        className={cn(
          "relative z-1 flex h-full items-center max-w-6xl",
          minHeightClass
        )}
      >
        <div className="mx-auto flex w-full flex-col gap-4 px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:max-w-4xl max-w-6xl">
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm text-zinc-200 sm:text-base md:text-lg">
                {subtitle}
              </p>
            )}
          </div>

          {hasCta && (
            <div className="mt-4 flex items-center justify-start">
              {/* Spacer ensures button aligns to right within the hero width */}
              <div className="flex w-full items-center gap-3">
                <div className="flex-1" />
                <CtaButton />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
