import { CheckCircle, MoveRight } from "lucide-react";
import { GlossyPhotoFrame } from "@/components/misc/glossy-photo-frame";
import { Button } from "./ui/button";
import { Link } from "@tanstack/react-router";

const PILLARS = [
  {
    title: "Outdoor Structures",
    href: "/custom-wood-structures-outdoor-design",
    body: "Custom outdoor structure installation and staining for pergolas, patio covers, and related woodwork.",
  },
  {
    title: "Fence Services",
    href: "/fence-services",
    body: "Fence install, stain and seal, repair, custom gates, and cleaning and prep for long-lasting oil-based finishes.",
  },
  {
    title: "Interior & Exterior Painting",
    href: "/luxury-finishes-coatings",
    body: "Interior and exterior painting with high-performance coatings, including Sherwin-Williams Emerald® and Sherwin-Williams Duration®, plus Romabio Classico Limewash® where it fits your design.",
  },
  {
    title: "Interior & Exterior Restoration",
    href: "/interior-exterior-restoration-renovation",
    body: "Restoration and rebuild services combining craftsmanship, design, and structural care.",
  },
] as const;

export default function Expertise() {
  return (
    <section
      id="expertise"
      className="scroll-mt-24 max-w-8xl mx-auto px-4 py-10 md:px-8 md:py-14 lg:px-8 lg:py-16"
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-x-12 lg:gap-y-6">
        <div className="lg:col-span-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent mb-2">
            What we do best
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl xl:text-5xl/none">
            Our Expertise
          </h2>
          <p className="mt-3 max-w-3xl text-zinc-600">
            Four pillars of work we take from estimate to finish—tap any line to
            see how we approach it.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-4 lg:min-w-0">
          {PILLARS.map(({ title, href, body }) => (
            <div
              key={href}
              className="flex flex-col rounded-xl border border-zinc-200/90 bg-zinc-50/40 p-4 shadow-sm sm:p-5"
            >
              <h3 className="mb-2 flex items-center gap-2 text-lg font-bold leading-snug text-zinc-900">
                <span className="min-w-0">{title}</span>
                <CheckCircle
                  className="shrink-0 text-accent"
                  size={18}
                  aria-hidden
                />
              </h3>
              <p className="flex-1 text-sm leading-relaxed text-zinc-600">
                {body}
              </p>
              <Link
                to={href}
                className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-accent underline-offset-4 hover:underline"
              >
                Read more
                <MoveRight className="h-4 w-4" strokeWidth={2} aria-hidden />
              </Link>
            </div>
          ))}
        </div>

        <div className="flex w-full justify-center lg:sticky lg:top-24 lg:justify-end lg:self-start">
          <GlossyPhotoFrame
            figureClassName="w-full max-w-xl lg:max-w-none"
            src="/photos/stain/stain-4.webp"
            alt="Residential home exterior with a clean professional paint finish"
            width={700}
            height={500}
            sizes="(max-width: 1024px) 100vw, 42vw"
          />
        </div>

        <div className="flex flex-col gap-4 sm:flex-row lg:col-span-2">
          <Button
            className="transition-all duration-200 ease-in-out sm:hover:scale-105"
            asChild
          >
            <Link to="/our-expertise">
              Full expertise overview
              <MoveRight className="ml-2" strokeWidth={1.5} />
            </Link>
          </Button>
          <Button
            variant="outline"
            className="transition-all duration-200 ease-in-out sm:hover:scale-105"
            asChild
          >
            <Link to="/contact-us">
              Get a Free Estimate
              <MoveRight size={16} className="ml-2" strokeWidth={1.5} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
