"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "@/components/ui/optimized-image";
import React from "react";

export default function remodelCarousel() {
  return (
    <Carousel
      className="w-full max-w-[425px]"
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
        <CarouselItem>
          <figure className="max-h-[768px] flex flex-col items-center gap-2">
            <p className="text-xl font-bold">Before</p>
            <Image
              src={`/photos/${"restoration/restore-8"}.webp`}
              alt="Beige painted corner wall with a stone fireplace, large and rounded tiled base, and large white accent piece on top"
              width={1200}
              height={1200}
              className="md:max-w-[424px] bg-accent-light rounded-lg shadow-md"
            />
          </figure>
        </CarouselItem>
        <CarouselItem>
          <figure className="max-h-[768px] flex flex-col items-center gap-2">
            <p className="text-xl font-bold">After</p>
            <Image
              src={`/photos/${"restoration/restore-9"}.webp`}
              alt="The same offwhite painted corner with a remodeled fireplace made of larger stones, a larger base of the same stone, and a cleaner, more squared design."
              width={1200}
              height={1200}
              className="md:max-w-[424px] bg-accent-light rounded-lg shadow-md"
            />
          </figure>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
}
