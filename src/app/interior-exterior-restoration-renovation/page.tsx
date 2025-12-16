import { Hero } from "@/components/misc/hero";
import Footer from "@/components/nav/footer";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import RemodelCarousel from "@/components/misc/remodel-carousel";
import ChooseUs from "@/components/misc/choose-us";

export const metadata: Metadata = {
  title: "Interior & Exterior Restoration | Castle Hills Stain & Restoration",
  description:
    "Restoration and rebuild services combining craftsmanship, design, and structural care.",
};

export default function InteriorExteriorRestoration() {
  return (
    <>
      <Hero
        title="Interior & Exterior Restoration"
        subtitle="Restoration and rebuild services combining craftsmanship, design, and structural care."
        backgroundImageUrl="/photos/stain/stain-2.webp"
      />
      <div className="max-w-8xl mx-auto px-4 md:px-8 lg:px-8 mb-12 mt-12">
        <section className="space-y-12 md:space-y-20">
          <article
            className={`flex flex-col rounded-lg md:flex-row-reverse items-center gap-4 md:gap-10 lg:gap-14 `}
          >
            {/* Service Image */}
            <figure className="max-h-[475px] w-full md:w-1/2 overflow-hidden items-center rounded-lg shadow-md">
              <Image
                src={`/photos/${"restoration/restore-4"}.webp`}
                alt="Brightly lit modern kitchen with granite countertops, beautifully painted white cabinets, and a large island with dark painted wood paneling."
                width={1000}
                height={1000}
                className="min-w-full md:max-w-[250px] bg-accent-light"
              />
            </figure>

            {/* Service Description */}
            <section className="w-full md:w-1/2 space-y-8">
              <span className="space-y-4">
                <h2 className="text-2xl font-bold sm:text-3xl xl:text-4xl/none mb-4">
                  Home Restoration
                </h2>

                <h3 className="text-xl font-bold mb-4">What We Do</h3>
                <p className="text-zinc-600 max-w-[600px]">
                  When the unexpected happens, our team restores your home to
                  pre‑damage condition with a proven process that covers
                  assessment, mitigation, cleanup, repairs, and finishing. From
                  the first inspection to the final walkthrough, we use
                  top‑quality materials and detail‑focused craftsmanship to
                  protect your investment and bring back comfort and safety.
                  Serving the Dallas–Fort Worth area since 2015, we act quickly,
                  communicate clearly, and work with care around your property
                  from start to finish.
                </p>

                <h4 className="font-bold">Full Interior Remodeling</h4>
                <ul className="list-disc ml-6 text-zinc-600">
                  <li>
                    <span className="font-bold">Kitchens</span> – custom
                    cabinetry, countertops, backsplash, layout changes
                  </li>
                  <li>
                    <span className="font-bold">Bathrooms</span> – tile,
                    showers, vanities, walk-in showers, tub-to-shower
                    conversions
                  </li>
                  <li>
                    <span className="font-bold">Living Spaces</span> – flooring,
                    trim, drywall, painting, custom woodwork, fireplace
                    redesigns
                  </li>
                  <li>
                    <span className="font-bold">
                      Additions & Layout Changes
                    </span>{" "}
                    – framing, open-concept conversions, wall removal (with
                    structural reinforcement)
                  </li>
                </ul>

                <p className="text-zinc-600 max-w-[600px]">
                  Request a free estimate to get expert guidance and a prompt,
                  professional plan for recovery.
                </p>
              </span>
              <Button
                size="lg"
                className="transition-all duration-200 ease-in-out sm:hover:scale-105"
                asChild
              >
                <Link href="#contact">Get an Estimate</Link>
              </Button>
            </section>
          </article>

          <article className="flex flex-col rounded-lg lg:flex-row-reverse items-center justify-between gap-4 md:gap-10 lg:gap-18">
            {/* Service Description */}
            <section className="w-full lg:w-1/2 space-y-8">
              <span className="space-y-4">
                <h2 className="text-2xl font-bold sm:text-3xl xl:text-4xl/none mb-4">
                  Home Remodeling
                </h2>

                <h3 className="text-xl font-bold mb-4">What We Do</h3>
                <p className="text-zinc-600 max-w-[600px]">
                  Transform your home with interior and exterior updates that
                  elevate function, style, and long‑term durability. From
                  planning and prep to build and finish, our crews focus on
                  clean job sites, protected surroundings, and craftsmanship
                  that brings your vision together with stunning, cohesive
                  finishes. Projects can include interior upgrades, exterior
                  improvements, professional painting, and custom outdoor
                  features to create a beautiful centerpiece for your home.
                </p>

                <ul className="list-disc ml-6 text-zinc-600">
                  <li>Roofing (composition, metal, tile)</li>
                  <li>
                    Interior updates and finishing tailored to your space and
                    style.
                  </li>
                  <li>
                    Exterior improvements that unify curb appeal and durability,
                    like{" "}
                    <Link
                      href="/wood-fences"
                      className="underline text-accent-primary"
                    >
                      fencing
                    </Link>{" "}
                    &{" "}
                    <Link
                      href="/pergolas-and-patio-covers"
                      className="underline text-accent-primary"
                    >
                      pergolas
                    </Link>{" "}
                    - including building, staining, repair, and restoration.
                  </li>
                  <li>
                    Professional{" "}
                    <Link
                      href="/interior-painting"
                      className="underline text-accent-primary"
                    >
                      indoor
                    </Link>
                    /
                    <Link
                      href="/exterior-painting"
                      className="underline text-accent-primary"
                    >
                      outdoor painting
                    </Link>{" "}
                    integration for seamless color and finish selection.
                  </li>
                  <li>Siding replacement & trim repair</li>
                </ul>

                <p className="text-zinc-600 max-w-[600px]">
                  Request a free estimate to discuss timeline, materials, and
                  options that fit your goals in the Dallas–Fort Worth area.
                </p>
              </span>
              <Button
                size="lg"
                className="transition-all duration-200 ease-in-out sm:hover:scale-105"
                asChild
              >
                <Link href="#contact">Get an Estimate</Link>
              </Button>
            </section>

            <RemodelCarousel />
          </article>
        </section>

        <section className="py-4 my-24">
          <h2 className="text-2xl font-bold sm:text-3xl xl:text-4xl/none mb-4">
            More Home Restoration & Remodeling Photos
          </h2>
          {/* Photo Grid (portrait only) */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Image
              src="/photos/restoration/restore-1.webp"
              alt="Large blue pool set in a large concrete-covered backyard against a blue sky taken from a diagonal angle"
              className="rounded-lg hover:shadow-lg hover:translate-y-[-5px] hover:scale-105 transition-all duration-200 ease-out"
              width={720}
              height={1280}
              loading="lazy"
            />
            <Image
              src="/photos/restoration/restore-2.webp"
              alt="Large blue pool in a concrete backyard against a blue sky taken from a straight, symmetrical angle"
              className="rounded-lg hover:shadow-lg hover:translate-y-[-5px] hover:scale-105 transition-all duration-200 ease-out"
              width={720}
              height={1280}
              loading="lazy"
            />
            <Image
              src="/photos/restoration/restore-3.webp"
              alt="Circular inset hot tub next to a larger pool set in concrete taken from just above looking down"
              className="rounded-lg hover:shadow-lg hover:translate-y-[-5px] hover:scale-105 transition-all duration-200 ease-out"
              width={720}
              height={1280}
              loading="lazy"
            />
            <Image
              src="/photos/restoration/restore-5.webp"
              alt="Modern angular shower with seamless marble tiles, wood accents, a dark floor and shelf, and a black stainless steel rain shower head in the ceiling"
              className="rounded-lg hover:shadow-lg hover:translate-y-[-5px] hover:scale-105 transition-all duration-200 ease-out"
              width={720}
              height={1280}
              loading="lazy"
            />
            <Image
              src="/photos/restoration/restore-10.webp"
              alt="A brightly and warmly lit shower with a borderless glass door, with small cream-colored tiles and matte bronze colored shower head, handles, hinges, and handles with a bench inside"
              className="rounded-lg hover:shadow-lg hover:translate-y-[-5px] hover:scale-105 transition-all duration-200 ease-out"
              width={720}
              height={1280}
              loading="lazy"
            />
          </div>
        </section>

        <ChooseUs />
      </div>

      <Footer />
    </>
  );
}
