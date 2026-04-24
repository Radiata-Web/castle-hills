import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

type GlossyPhotoFrameProps = ImageProps & {
  figureClassName?: string;
};

/**
 * Full-width photo with border, soft shadow, and light gloss overlays
 * (matches landing “Our Expertise” treatment).
 */
export function GlossyPhotoFrame({
  className,
  figureClassName,
  alt,
  ...imageProps
}: GlossyPhotoFrameProps) {
  return (
    <figure
      className={cn(
        "relative h-fit w-full max-w-full shrink-0 overflow-hidden rounded-2xl border border-zinc-200/90 shadow-md ring-1 ring-black/[0.04]",
        figureClassName,
      )}
    >
      <Image
        alt={alt}
        className={cn("h-auto w-full max-w-full align-middle", className)}
        {...imageProps}
      />
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/35 via-white/[0.07] to-transparent mix-blend-soft-light"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.55),inset_0_0_80px_rgba(255,255,255,0.06)]"
        aria-hidden
      />
    </figure>
  );
}
