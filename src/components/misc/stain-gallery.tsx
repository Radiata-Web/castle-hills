import Image from "@/components/ui/optimized-image";
import { STAIN_GALLERY, type StainGalleryShot } from "@/lib/images";

type StainGalleryProps = {
  /** Limit which shots appear (by label). Default: all. */
  labels?: StainGalleryShot["label"][];
};

export default function StainGallery({ labels }: StainGalleryProps) {
  const shots = labels?.length
    ? STAIN_GALLERY.filter((shot) => labels.includes(shot.label))
    : STAIN_GALLERY;

  if (!shots.length) return null;

  return (
    <section
      className="relative mb-16 overflow-hidden rounded-2xl border border-zinc-200/80 bg-gradient-to-br from-amber-50/50 via-white to-stone-50/80 px-5 py-10 shadow-[0_1px_0_0_rgba(15,23,42,0.05)] sm:px-8 sm:py-12 md:px-12 md:py-14"
      aria-labelledby="stain-gallery-heading"
    >
      <div
        className="pointer-events-none absolute -left-20 -top-24 h-64 w-64 rounded-full bg-accent/[0.05] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-24 -right-16 h-56 w-56 rounded-full bg-amber-200/20 blur-3xl"
        aria-hidden
      />

      <header className="relative max-w-2xl space-y-3 motion-safe:animate-paint-rise">
        <h2
          id="stain-gallery-heading"
          className="text-[2rem] font-bold leading-[1.15] tracking-tight text-zinc-900 sm:text-4xl md:text-[2.75rem]"
        >
          Stain work in the field
        </h2>
        <p className="font-sans text-sm leading-relaxed text-zinc-600 md:text-base">
          Fence, pergola, patio cover, and exterior wood—cleaned, prepped, and finished for Texas
          sun.
        </p>
      </header>

      <ul className="relative mt-10 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5 md:mt-12">
        {shots.map((shot, index) => (
          <li
            key={shot.src}
            className="motion-safe:animate-paint-rise group overflow-hidden rounded-xl ring-1 ring-zinc-900/10"
            style={{ animationDelay: `${100 + index * 50}ms` }}
          >
            <figure className="relative aspect-[4/3] bg-zinc-100">
              <Image
                src={shot.src}
                alt={shot.alt}
                fill
                variant="gallery"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/35 to-transparent px-4 pb-4 pt-12">
                <span className="font-sans text-sm font-medium text-white/95">{shot.label}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
