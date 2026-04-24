import {
  ChevronDown,
  DoorOpen,
  Fence,
  Paintbrush,
  Sparkles,
  Wrench,
} from "lucide-react";

const SUMMARIES = [
  {
    title: "Fence installation",
    blurb: "Posts, rails, and pickets built for clean lines and North Texas weather.",
    icon: Fence,
  },
  {
    title: "Staining & sealing",
    blurb: "Premium finishes that lock out moisture and keep grain looking rich.",
    icon: Paintbrush,
  },
  {
    title: "Repair & restoration",
    blurb: "Save solid sections—rebuild framing, blend repairs, skip full tear-out when it makes sense.",
    icon: Wrench,
  },
  {
    title: "Custom gates",
    blurb: "Walk or driveway gates—manual or automated—with hardware dialed for smooth operation.",
    icon: DoorOpen,
  },
  {
    title: "Cleaning & prep",
    blurb: "Strip grime and mildew so stain takes evenly—full restore → prep → protect workflow.",
    icon: Sparkles,
  },
] as const;

export function FenceServicesSummary() {
  return (
    <section
      aria-labelledby="fence-services-summary-heading"
      className="relative overflow-hidden rounded-2xl border border-zinc-200/90 bg-gradient-to-br from-accent-light/40 via-white to-zinc-50/80 px-5 py-10 shadow-sm sm:px-8 md:py-12"
    >
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent/5 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-accent/8 blur-2xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          At a glance
        </p>
        <h2
          id="fence-services-summary-heading"
          className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl"
        >
          Every fence service we offer
        </h2>
        <p className="mt-3 text-base text-zinc-600 sm:text-lg">
          Quick overview below—scroll for photos, process detail, and how we
          work on your property.
        </p>
        <a
          href="#fence-details"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent underline-offset-4 hover:underline"
        >
          <ChevronDown className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
          Jump to full breakdown
        </a>
      </div>

      <ul className="relative mx-auto mt-10 grid max-w-6xl list-none gap-4 sm:grid-cols-2 xl:grid-cols-5 xl:gap-3 p-0">
        {SUMMARIES.map(({ title, blurb, icon: Icon }) => (
          <li key={title}>
            <div className="group flex h-full flex-col rounded-xl border border-zinc-200/80 bg-white/90 p-5 shadow-sm ring-1 ring-transparent transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/35 hover:shadow-md hover:ring-accent/10">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-accent/12 text-accent transition-colors group-hover:bg-accent/18">
                <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
              </div>
              <h3 className="text-lg font-bold leading-snug text-zinc-900">
                {title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600">
                {blurb}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
