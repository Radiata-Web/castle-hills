import { CheckCircle, MoveRight } from "lucide-react";
import { GlossyPhotoFrame } from "@/components/misc/glossy-photo-frame";
import { Button } from "./ui/button";
import { ctaAfterCopyClassName, ctaGroupClassName, ctaPrimaryClassName } from "@/lib/cta";
import { PHOTOS } from "@/lib/images";
import { SERVICE_NAV_GROUPS } from "@/lib/service-ia";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";

const PILLARS = SERVICE_NAV_GROUPS.map((group) => ({
  title: group.title,
  href: group.href,
  body: group.description,
}));

export default function Expertise() {
  return (
    <section
      id="expertise"
      className="scroll-mt-24 max-w-8xl mx-auto px-4 py-10 md:px-8 md:py-14 lg:px-8 lg:py-16"
    >
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-x-12 lg:gap-y-8">
        <div className="min-w-0">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl xl:text-5xl/none">
            Our Expertise
          </h2>
          <p className="mt-3 max-w-xl text-zinc-600">
            Two focuses we take from estimate to finish—painting and wood staining for North Texas
            homes.
          </p>

          <ul className="mt-8 flex list-none flex-col gap-4 p-0">
            {PILLARS.map(({ title, href, body }) => (
              <li key={href}>
                <Link
                  to={href}
                  className="group flex flex-col rounded-xl border border-zinc-200/90 bg-zinc-50/40 p-5 shadow-sm transition-colors hover:border-accent/40 hover:bg-white"
                >
                  <h3 className="mb-2 flex items-center gap-2 text-lg font-bold leading-snug text-zinc-900">
                    <span className="min-w-0">{title}</span>
                    <CheckCircle className="shrink-0 text-accent" size={18} aria-hidden />
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-600">{body}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-accent underline-offset-4 group-hover:underline">
                    Read more
                    <MoveRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                      strokeWidth={2}
                      aria-hidden
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex w-full justify-center lg:justify-end">
          <GlossyPhotoFrame
            figureClassName="w-full max-w-xl lg:max-w-none"
            src={PHOTOS.stain4}
            alt="Residential home exterior with a clean professional paint finish"
            width={700}
            height={500}
            sizes="(max-width: 1024px) 100vw, 42vw"
            variant="gallery"
          />
        </div>

        <div className={cn(ctaGroupClassName, ctaAfterCopyClassName, "lg:col-span-2")}>
          <Button
            size="lg"
            className={ctaPrimaryClassName}
            render={<Link to="/our-expertise" />}
            nativeButton={false}
          >
            Full expertise overview
            <MoveRight className="ml-2 size-5" strokeWidth={1.5} />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className={ctaPrimaryClassName}
            render={<Link to="/contact-us" />}
            nativeButton={false}
          >
            Get a Free Estimate
            <MoveRight className="ml-2 size-5" strokeWidth={1.5} />
          </Button>
        </div>
      </div>
    </section>
  );
}
