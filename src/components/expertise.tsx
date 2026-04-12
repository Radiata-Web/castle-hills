import { ArrowRight, CheckCircle, MoveRight } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Expertise() {
  return (
    <>
      <div className="absolute -translate-y-52" id="about"></div>
      <section className="max-w-8xl mx-auto py-12 md:py-16 lg:py-20 px-4 md:px-8 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
          <div className="flex flex-col gap-8 justify-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl xl:text-5xl/none">
              Our Expertise
            </h2>

            <div>
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                Custom Wood & Outdoor Design
                <CheckCircle className="inline text-accent" size={18} />
              </h3>
              <p className="text-gray-600">
                Custom pergolas, patio covers, fences, and outdoor kitchens
                built with precision and premium materials.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                Luxury Finishes & Coatings
                <CheckCircle className="inline text-accent" size={18} />
              </h3>
              <p className="text-gray-600">
                High-performance painting and limewash systems using
                Sherwin-Williams Emerald&reg;, Sherwin-Williams Duration&reg;
                and Romabio Classico Limewash&reg;.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                Interior & Exterior Restoration
                <CheckCircle className="inline text-accent" size={18} />
              </h3>
              <p className="text-gray-600">
                Restoration and rebuild services combining craftsmanship,
                design, and structural care.
              </p>
            </div>

            <div className="mt-4 flex flex-col md:flex-row gap-4">
              <Button
                className="transition-all duration-200 ease-in-out sm:hover:scale-105"
                asChild
              >
                <Link href="/our-expertise">
                  Learn more about our expertise{" "}
                  <MoveRight className="ml-2" strokeWidth={1.5} />
                </Link>
              </Button>
              <Button
                variant="outline"
                className="transition-all duration-200 ease-in-out sm:hover:scale-105"
                asChild
              >
                <Link href="/contact-us">
                  Get a Free Estimate
                  <MoveRight size={16} className="ml-2" strokeWidth={1.5} />
                </Link>
              </Button>
            </div>
          </div>

          <div className="flex justify-center">
            <Image
              src="/photos/pergolas/pergola-6.webp"
              alt="Expertise"
              width={700}
              height={500}
              className="rounded-lg shadow-sm border border-gray-200"
            />
          </div>
        </div>
      </section>
    </>
  );
}
