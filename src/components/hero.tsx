import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowDown, Check, MoveRight } from "lucide-react";
import { ContactForm } from "./forms/contact-form";
import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative bg-cover bg-center bg-no-repeat bg-opacity-80 bg-black"
      style={{
        backgroundImage:
          "url('https://raw.githubusercontent.com/Radiata-Web/castle-hills/refs/heads/main/public/photos/gates/gate-1.webp')",
      }}
    >
      <div className="bg-gradient-to-r from-black/80 to-black/20">
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
                Elevate Your Space with Luxury Design & Full Property Remodel
                Services.
              </h1>
              <p className="max-w-[600px] text-zinc-100 md:text-lg">
                From custom woodwork to refined remodels, Castle Hills Stain &
                Restoration brings craftsmanship and lasting quality to homes
                and businesses across the DFW Metroplex.
              </p>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col gap-2 md:flex-row md:gap-4">
              <Button
                size="lg"
                className="transition-all duration-200 ease-in-out sm:hover:scale-105"
                asChild
              >
                <Link href="/#contact">
                  Schedule a Consultation
                  <MoveRight className="ml-2" strokeWidth={1.5} />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="transition-all duration-200 ease-in-out sm:hover:scale-105"
                asChild
              >
                <Link href="/#services">
                  View Our Services <ArrowDown size={16} className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right column */}
          <div className="flex justify-center lg:justify-end">
            <article className="w-full bg-white border border-zinc-200 p-6 rounded-xl shadow-xl lg:max-w-[600px]">
              <ContactForm showHeader={true} />
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
