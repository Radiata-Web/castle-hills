import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import Image from "@/components/ui/optimized-image";
import { Button } from "./ui/button";
import {
  ctaGroupClassName,
  ctaPrimaryClassName,
} from "@/lib/cta";
import { cn } from "@/lib/utils";
import { MoveRight, Phone } from "lucide-react";

// Keeps maplibre (~700kB) out of the shared route chunk.
const ServiceMap = lazy(() => import("@/components/misc/service-map"));

export default function About() {
  const mapSlotRef = useRef<HTMLDivElement>(null);
  // Visitors who never scroll this far never download maplibre at all.
  const [mapInView, setMapInView] = useState(false);

  useEffect(() => {
    const slot = mapSlotRef.current;
    if (!slot) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setMapInView(true);
        observer.disconnect();
      },
      // Start fetching just before the slot scrolls in, so the map is
      // usually painted by the time it's on screen.
      { rootMargin: "300px" },
    );
    observer.observe(slot);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="absolute -translate-y-52" id="about"></div>
      <section className="max-w-8xl mx-auto py-6 md:py-10 lg:py-14 px-4 md:px-8 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 xl:grid-cols-2">
          <div
            ref={mapSlotRef}
            role="region"
            aria-label="Map: Castle Hills Stain & Restoration service area in Dallas–Fort Worth"
            className="h-95 w-full overflow-hidden rounded-xl border border-zinc-200 shadow-sm"
          >
            {mapInView && (
              <Suspense fallback={null}>
                <ServiceMap />
              </Suspense>
            )}
          </div>

          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                Castle Hills Stain & Restoration
              </p>
              <h2 className="text-3xl font-bold sm:text-4xl xl:text-5xl/none">
                Restore. Protect. Enhance.
              </h2>
              <p className="text-zinc-600">
                At Castle Hills Stain & Restoration, we design, build, and
                restore residential and commercial properties across the DFW
                Metroplex with precision and pride. From luxury exteriors and
                custom wood structures to select interior restorations and fine
                finishes, our team delivers craftsmanship that enhances both the
                look and longevity of every property we touch.
              </p>
            </div>

            <div className={cn(ctaGroupClassName, "pb-2")}>
              <Button
                size="lg"
                className={ctaPrimaryClassName}
                render={<Link to="/about-us" />}
                nativeButton={false}
              >
                Learn more about us
                <MoveRight className="ml-2 size-5" strokeWidth={1.5} />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className={ctaPrimaryClassName}
                render={<a href="tel:4692153098" />}
                nativeButton={false}
              >
                Call Now
                <Phone className="ml-2 size-5" strokeWidth={1.5} />
              </Button>
            </div>

            {/* Socials */}
            <div className="flex flex-row gap-4 sm:gap-6 md:gap-8">
              <a
                href="https://maps.app.goo.gl/RteUFevUMNKuLVkv8"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Read Castle Hills reviews on Google Maps"
              >
                <Image
                  src="/gl-badge.png"
                  alt=""
                  width={200}
                  height={100}
                  loading="lazy"
                />
              </a>
              <a
                href="https://www.facebook.com/CHPW903"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Castle Hills on Facebook"
              >
                <Image
                  src="/fb-badge.png"
                  alt=""
                  width={200}
                  height={100}
                  loading="lazy"
                />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
