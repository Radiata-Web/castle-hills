import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import {
  HOMEPAGE_FEATURED_SERVICES,
  type Service,
} from "@/lib/data";

export type { Service };

interface ServicesCardsProps {
  heading: string;
  paragraph?: string;
}

export default function ServicesCards({
  heading,
  paragraph,
}: ServicesCardsProps) {
  return (
    <>
      <div className="absolute -translate-y-52" id="services"></div>
      <article className="max-w-8xl mx-auto py-6 md:py-10 lg:py-14 px-4 md:px-8 lg:px-8">
        <div className="space-y-4 mb-8 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Services
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl xl:text-5xl/none">
            {heading}
          </h2>
          {paragraph && <p className="text-zinc-600 text-lg leading-relaxed">{paragraph}</p>}
          <p className="text-sm text-zinc-500">
            Each card opens a dedicated page with scope, photos, and how we work.
          </p>
        </div>
        <div className="grid gap-4 items-stretch justify-stretch grid-cols-1 md:grid-cols-2">
          {HOMEPAGE_FEATURED_SERVICES.map((service: Service) => (
            <ServiceCard service={service} key={service.title} />
          ))}

          {/* Contact Us */}
          <div className="group min-h-[225px] w-full md:col-span-2">
            <div className="flex h-full min-h-[225px] border border-dashed border-accent/60 rounded-2xl bg-accent-light/20 transition-all duration-200 ease-out group-hover:border-accent group-hover:bg-accent-light/35">
              <div className="flex flex-col items-center text-center md:items-center md:text-center lg:items-start lg:text-left justify-center p-10 gap-2 w-full">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                  Still deciding?
                </p>
                <h3 className="text-2xl font-bold leading-tight">
                  Not sure what you need?
                </h3>
                <p className="text-zinc-600 max-w-md">
                  We'll find the perfect solution to your needs.
                </p>

                <Button
                  className="transition-all duration-200 ease-in-out sm:hover:scale-105 w-fit mt-4"
                  asChild
                  variant="outline"
                >
                  <Link href="#contact">
                    Get a Free Estimate
                    <MoveRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}

function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={service.href}
      className="group relative isolate min-h-[260px] overflow-hidden rounded-2xl ring-1 ring-black/10 shadow-sm transition-[transform,box-shadow,ring-color] duration-500 ease-out hover:-translate-y-1 hover:shadow-xl hover:ring-accent/22 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      key={service.title}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.02]"
        style={{ backgroundImage: `url(/photos${service.cardImg}.webp)` }}
        aria-hidden
      />
      {/* Light wash + gradient — readable type without crushing the photo */}
      <div
        className="absolute inset-0 bg-black/45 transition-colors duration-500 ease-out group-hover:bg-black/26"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/44 to-black/18 transition-opacity duration-500 ease-out group-hover:from-black/78 group-hover:via-black/48 group-hover:to-black/22"
        aria-hidden
      />
      <div className="relative flex h-full min-h-[260px] flex-col justify-end gap-2 p-8 pt-24 text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.35)]">
        <h3 className="text-2xl font-bold leading-tight sm:text-3xl">
          {service.title}
        </h3>
        <p className="max-w-md text-sm leading-relaxed text-white/95">
          {service.teaser}
        </p>
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-white">
          Read more
          <MoveRight
            className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
            aria-hidden
          />
        </span>
      </div>
    </Link>
  );
}
