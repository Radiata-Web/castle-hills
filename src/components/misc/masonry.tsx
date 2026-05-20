"use client";

import React from "react";
import Image from "@/components/ui/optimized-image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const content: { title: string; image: string }[] = [
  {
    title: "Restoration Project 1",
    image: "/photos/fences/wood/fence-3.webp",
  },
  {
    title: "Restoration Project 2",
    image: "/photos/fences/wood/fence-4.webp",
  },
  {
    title: "Restoration Project 2",
    image: "/photos/restoration/restore-1.webp",
  },
  {
    title: "Restoration Project 2",
    image: "/photos/restoration/restore-4.webp",
  },
  {
    title: "Restoration Project 2",
    image: "/photos/stain/stain-1.webp",
  },
  {
    title: "Restoration Project 2",
    image: "/photos/stain/stain-2.webp",
  },
  {
    title: "Restoration Project 2",
    image: "/photos/stain/stain-4.webp",
  },
  {
    title: "Restoration Project 2",
    image: "/photos/garages/garage-1.webp",
  },
  {
    title: "Restoration Project 2",
    image: "/photos/gates/gate-1.webp",
  },
];

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
        <CarouselContent className="shadow-lg">
          {content.map((item, index) => (
            <CarouselItem key={index}>
              <div className="relative w-full h-[350px] md:h-[700px] rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover w-full h-full"
                  sizes="(max-width: 768px) 100vw, 80vw"
                  loading="lazy"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="mt-6 flex justify-center gap-6">
          <CarouselPrevious className="relative top-0 left-0 -translate-y-0 h-10 w-10" />
          <CarouselNext className="relative top-0 right-0 -translate-y-0 h-10 w-10" />
        </div>
      </Carousel>
    </section>
  );
}
