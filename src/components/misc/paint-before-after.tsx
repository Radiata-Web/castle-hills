import Image from "@/components/ui/optimized-image";
import { PAINT_GALLERY, type BeforeAfterPair } from "@/lib/images";

function Pair(props: {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  delayMs: number;
}) {
  return (
    <div
      className="motion-safe:animate-paint-rise grid gap-0 overflow-hidden rounded-xl ring-1 ring-zinc-900/10 sm:grid-cols-[1fr_auto_1fr]"
      style={{ animationDelay: `${props.delayMs}ms` }}
    >
      <figure className="relative aspect-[4/3] min-h-0 w-full bg-zinc-100 sm:rounded-l-xl sm:rounded-r-none">
        <Image
          src={props.beforeSrc}
          alt={props.beforeAlt}
          fill
          variant="gallery"
          sizes="(max-width: 640px) 100vw, 45vw"
          className="object-cover"
        />
        <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-zinc-950/85 via-zinc-950/40 to-transparent px-4 pb-4 pt-14">
          <span className="font-sans text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-white/95">
            Before
          </span>
        </figcaption>
      </figure>

      <div
        className="hidden h-full min-h-[12rem] w-[3px] shrink-0 self-stretch bg-gradient-to-b from-accent/10 via-accent to-accent/10 sm:block"
        aria-hidden
      />
      <div
        className="h-px w-full shrink-0 bg-gradient-to-r from-transparent via-accent/40 to-transparent sm:hidden"
        aria-hidden
      />

      <figure className="relative aspect-[4/3] min-h-0 w-full bg-zinc-100 sm:rounded-r-xl sm:rounded-l-none">
        <Image
          src={props.afterSrc}
          alt={props.afterAlt}
          fill
          variant="gallery"
          sizes="(max-width: 640px) 100vw, 45vw"
          className="object-cover"
        />
        <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0c4a7a]/90 via-[#0c4a7a]/35 to-transparent px-4 pb-4 pt-14">
          <span className="font-sans text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-white">
            After
          </span>
        </figcaption>
      </figure>
    </div>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-4 motion-safe:animate-paint-rise motion-safe:[animation-delay:80ms]">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-zinc-300 to-zinc-200" />
      <h3 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
        {children}
      </h3>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent via-zinc-300 to-zinc-200" />
    </div>
  );
}

function PairList({ pairs, startDelayMs }: { pairs: BeforeAfterPair[]; startDelayMs: number }) {
  return (
    <div className="space-y-10 md:space-y-12">
      {pairs.map((pair, index) => (
        <Pair
          key={`${pair.before}-${pair.after}`}
          beforeSrc={pair.before}
          afterSrc={pair.after}
          beforeAlt={pair.beforeAlt}
          afterAlt={pair.afterAlt}
          delayMs={startDelayMs + index * 40}
        />
      ))}
    </div>
  );
}

export type PaintBeforeAfterVariant = "hub" | "exterior" | "interior";

type PaintBeforeAfterProps = {
  /** Which curated set to show. Default hub (interior + 2 exterior). */
  variant?: PaintBeforeAfterVariant;
};

export default function PaintBeforeAfter({ variant = "hub" }: PaintBeforeAfterProps) {
  const showInterior = variant === "hub" || variant === "interior";
  const exteriorPairs =
    variant === "exterior"
      ? PAINT_GALLERY.exteriorFull
      : variant === "hub"
        ? PAINT_GALLERY.exteriorHub
        : [];

  const subtitle =
    variant === "interior"
      ? "Prep, color, and finish in the same room so the change reads clearly on the walls and trim."
      : variant === "exterior"
        ? "Curb-side transformations from the current photo pack—same home, before and after."
        : "Same space—prep, color, and finish brought together so the change reads clearly in the room and from the curb.";

  return (
    <section
      className="relative mb-16 overflow-hidden rounded-2xl border border-zinc-200/80 bg-gradient-to-br from-slate-50/90 via-white to-sky-50/40 px-5 py-10 shadow-[0_1px_0_0_rgba(15,23,42,0.05)] sm:px-8 sm:py-12 md:px-12 md:py-14"
      aria-labelledby="paint-before-after-heading"
    >
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent/[0.06] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-sky-200/25 blur-3xl"
        aria-hidden
      />

      <header className="relative max-w-2xl space-y-3 motion-safe:animate-paint-rise">
        <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.38em] text-accent">
          Real projects
        </p>
        <h2
          id="paint-before-after-heading"
          className="text-[2rem] font-bold leading-[1.15] tracking-tight text-zinc-900 sm:text-4xl md:text-[2.75rem]"
        >
          Before{" "}
          <span className="text-zinc-300" aria-hidden>
            /
          </span>{" "}
          after
        </h2>
        <p className="font-sans text-sm leading-relaxed text-zinc-600 md:text-base">{subtitle}</p>
      </header>

      <div className="relative mt-12 space-y-14 md:mt-14 md:space-y-16">
        {showInterior ? (
          <article className="space-y-5">
            <SectionLabel>Interior</SectionLabel>
            <PairList pairs={PAINT_GALLERY.interior} startDelayMs={120} />
          </article>
        ) : null}

        {exteriorPairs.length > 0 ? (
          <article className="space-y-5">
            <SectionLabel>Exterior</SectionLabel>
            <PairList pairs={[...exteriorPairs]} startDelayMs={160} />
          </article>
        ) : null}
      </div>
    </section>
  );
}
