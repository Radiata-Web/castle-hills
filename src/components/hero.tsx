import { Button } from "@/components/ui/button";
import {
  ctaGroupClassName,
  ctaPrimaryClassName,
} from "@/lib/cta";
import { ArrowDown, MoveRight } from "lucide-react";
import { ContactForm } from "./forms/contact-form";
import Image from "@/components/ui/optimized-image";

export default function Hero() {
  return (
    <section id="hero" className="relative isolate overflow-hidden bg-zinc-900">
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image
          src="/photos/gates/gate-1.webp"
          alt=""
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={80}
          className="object-cover object-center"
          aria-hidden
        />
      </div>
      <div
        className="absolute inset-0 z-[1] bg-gradient-to-r from-black/80 to-black/20"
        aria-hidden
      />
      <div className="relative z-10">
        <div className="max-w-8xl mx-auto grid gap-12 px-4 md:px-8 lg:px-8 py-12 md:py-24 lg:py-32 xl:py-38 lg:grid-cols-2 lg:gap-20">
          {/* Left column */}
          <div className="flex flex-col justify-center space-y-10">
            <div className="space-y-6">
              <Image
                src="/logos/slogan-white.svg"
                width={260}
                height={100}
                alt="Our slogan: Design, Protect, Restore"
                priority
              />
              <h1 className="text-4xl text-white font-bold tracking-tight sm:text-5xl xl:text-6xl/none">
                DFW Fence Staining, Installation & Exterior Painting Experts
              </h1>
              <p className="max-w-[600px] text-zinc-100 md:text-lg leading-relaxed">
                Trusted by homeowners across DFW for clean, professional exterior
                work—fences, outdoor structures, painting, and restoration built
                for long-term durability. Scroll to explore each service in
                depth, or request an estimate with the form.
              </p>
            </div>

            {/* CTA buttons */}
            <div className={ctaGroupClassName}>
              <Button
                size="lg"
                className={ctaPrimaryClassName}
                render={<a href="/#contact" />}
                nativeButton={false}
              >
                Get a Free Estimate
                <MoveRight className="ml-2 size-5" strokeWidth={1.5} />
              </Button>
              <Button
                variant="heroOutline"
                size="lg"
                className={ctaPrimaryClassName}
                render={<a href="/#services" />}
                nativeButton={false}
              >
                View Our Services
                <ArrowDown className="ml-2 size-5" strokeWidth={1.5} />
              </Button>
            </div>
          </div>

          {/* Right column */}
          <div className="flex justify-center lg:justify-end">
            <article className="w-full bg-white border border-zinc-200 p-6 md:p-8 rounded-xl shadow-xl lg:max-w-[600px]">
              <ContactForm showHeader={true} />
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
