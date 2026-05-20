// Hero.tsx
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  ctaAfterCopyClassName,
  ctaGroupClassName,
  ctaPrimaryClassName,
} from "@/lib/cta";
import { cn } from "@/lib/utils";

type HeroProps = {
  title: string;
  subtitle?: string;
  backgroundImageUrl: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
  ctaHref?: string;
  minHeightClass?: string;
  overlayOpacityClass?: string;
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

  const CtaButton = () => {
    if (!hasCta) return null;

    if (useShadcnButton) {
      if (ctaHref) {
        return (
          <Button
            size="lg"
            className={ctaPrimaryClassName}
            render={<a href={ctaHref} />}
            nativeButton={false}
            onClick={onCtaClick}
          >
            {ctaLabel}
          </Button>
        );
      }

      return (
        <Button size="lg" className={ctaPrimaryClassName} onClick={onCtaClick}>
          {ctaLabel}
        </Button>
      );
    }

    if (ctaHref) {
      return (
        <a
          href={ctaHref}
          className="inline-flex min-h-12 items-center justify-center rounded-md bg-accent px-6 text-base font-semibold text-white shadow-sm transition-colors hover:bg-accent/90"
        >
          {ctaLabel}
        </a>
      );
    }

    return (
      <button
        type="button"
        onClick={onCtaClick}
        className="inline-flex min-h-12 items-center justify-center rounded-md bg-accent px-6 text-base font-semibold text-white shadow-sm transition-colors hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      >
        {ctaLabel}
      </button>
    );
  };

  return (
    <section
      className={cn(
        "relative w-full overflow-hidden bg-cover bg-center bg-no-repeat",
        minHeightClass,
      )}
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      aria-label="Hero section"
    >
      <div className={cn("absolute inset-0 h-full", overlayOpacityClass)} />

      <div
        className={cn(
          "relative z-1 flex h-full w-full max-w-full items-center justify-center",
          minHeightClass,
        )}
      >
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-6 px-4 py-14 text-center sm:px-6 sm:py-16 lg:px-8">
          <div className="flex flex-col gap-4">
            <h1 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              {title}
            </h1>
            {subtitle && (
              <p className="text-pretty text-sm leading-relaxed text-zinc-100 sm:text-base md:text-lg">
                {subtitle}
              </p>
            )}
          </div>

          {hasCta && (
            <div className={cn(ctaGroupClassName, ctaAfterCopyClassName, "w-full justify-center")}>
              <CtaButton />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
