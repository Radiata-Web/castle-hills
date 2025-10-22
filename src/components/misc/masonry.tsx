"use client";

import React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function masonry() {
  return (
    <section className="max-w-8xl mx-auto py-6 md:py-10 lg:py-14 px-4 md:px-8 lg:px-8">
      <Carousel
        className="w-full"
        plugins={[
          Autoplay({
            delay: 4000,
          }),
        ]}
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {/* Image 1 */}
          <CarouselItem>
            <div className="relative w-full h-[350px] md:h-[600px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/photos/restoration/restore-1.webp"
                alt="Restoration Project 1"
                fill
                className="object-cover w-full h-full"
                sizes="(max-width: 768px) 100vw, 80vw"
                priority
              />
            </div>
          </CarouselItem>

          {/* Image 2 */}
          <CarouselItem>
            <div className="relative w-full h-[350px] md:h-[600px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/photos/restoration/restore-2.webp"
                alt="Restoration Project 2"
                fill
                className="object-cover w-full h-full"
                sizes="(max-width: 768px) 100vw, 80vw"
              />
            </div>
          </CarouselItem>

          {/* Image 3 */}
          <CarouselItem>
            <div className="relative w-full h-[350px] md:h-[600px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/photos/restoration/restore-3.webp"
                alt="Restoration Project 3"
                fill
                className="object-cover w-full h-full"
                sizes="(max-width: 768px) 100vw, 80vw"
              />
            </div>
          </CarouselItem>

          {/* Image 4 */}
          <CarouselItem>
            <div className="relative w-full h-[350px] md:h-[600px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/photos/restoration/restore-4.webp"
                alt="Restoration Project 4"
                fill
                className="object-cover w-full h-full"
                sizes="(max-width: 768px) 100vw, 80vw"
              />
            </div>
          </CarouselItem>

          {/* Image 5 */}
          <CarouselItem>
            <div className="relative w-full h-[350px] md:h-[600px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/photos/restoration/restore-5.webp"
                alt="Restoration Project 5"
                fill
                className="object-cover w-full h-full"
                sizes="(max-width: 768px) 100vw, 80vw"
              />
            </div>
          </CarouselItem>

          {/* Image 6 */}
          <CarouselItem>
            <div className="relative w-full h-[350px] md:h-[600px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/photos/paint/in-paint-2.webp"
                alt="Interior Painting Project"
                fill
                className="object-cover w-full h-full"
                sizes="(max-width: 768px) 100vw, 80vw"
              />
            </div>
          </CarouselItem>

          {/* Image 7 */}
          <CarouselItem>
            <div className="relative w-full h-[350px] md:h-[600px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/photos/fences/wood/fence-1.webp"
                alt="Wood Fence Project"
                fill
                className="object-cover w-full h-full"
                sizes="(max-width: 768px) 100vw, 80vw"
              />
            </div>
          </CarouselItem>

          {/* Image 8 */}
          <CarouselItem>
            <div className="relative w-full h-[350px] md:h-[600px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/photos/garages/garage-1.webp"
                alt="Garage Project"
                fill
                className="object-cover w-full h-full"
                sizes="(max-width: 768px) 100vw, 80vw"
              />
            </div>
          </CarouselItem>

          {/* Image 9 */}
          <CarouselItem>
            <div className="relative w-full h-[350px] md:h-[600px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/photos/stain/stain-3.webp"
                alt="Staining Project 1"
                fill
                className="object-cover w-full h-full"
                sizes="(max-width: 768px) 100vw, 80vw"
              />
            </div>
          </CarouselItem>

          {/* Image 10 */}
          <CarouselItem>
            <div className="relative w-full h-[350px] md:h-[600px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/photos/stain/stain-4.webp"
                alt="Staining Project 2"
                fill
                className="object-cover w-full h-full"
                sizes="(max-width: 768px) 100vw, 80vw"
              />
            </div>
          </CarouselItem>

          {/* Image 11 */}
          <CarouselItem>
            <div className="relative w-full h-[350px] md:h-[600px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/photos/paint/ex-paint-2.webp"
                alt="Exterior Painting Project"
                fill
                className="object-cover w-full h-full"
                sizes="(max-width: 768px) 100vw, 80vw"
              />
            </div>
          </CarouselItem>

          {/* Image 12 */}
          <CarouselItem>
            <div className="relative w-full h-[350px] md:h-[600px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/photos/restoration/restore-7.webp"
                alt="Pergola Project"
                fill
                className="object-cover w-full h-full"
                sizes="(max-width: 768px) 100vw, 80vw"
              />
            </div>
          </CarouselItem>
        </CarouselContent>
        <div className="mt-6 flex justify-center gap-6">
          <CarouselPrevious className="relative top-0 left-0 -translate-y-0 h-10 w-10" />
          <CarouselNext className="relative top-0 right-0 -translate-y-0 h-10 w-10" />
        </div>
      </Carousel>
    </section>
  );
}
