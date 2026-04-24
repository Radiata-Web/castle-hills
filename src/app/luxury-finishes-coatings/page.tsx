import ChooseUs from "@/components/misc/choose-us";
import { Hero } from "@/components/misc/hero";
import ServiceDesc from "@/components/misc/serviceDesc";
import Footer from "@/components/nav/footer";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interior & Exterior Painting | Castle Hills Stain & Restoration",
  description:
    "Professional interior and exterior painting in the Dallas–Fort Worth area.",
};

export default function LuxuryFinishesCoatings() {
  return (
    <>
      <Hero
        title="Interior & Exterior Painting"
        subtitle="Clean lines, durable coatings, and colors chosen to suit your home and how you live in it."
        backgroundImageUrl="/photos/paint/ex-paint-2.webp"
      />

      <div className="max-w-8xl mx-auto px-4 md:px-8 lg:px-8 mb-12 mt-12">
        <section className="flex flex-col gap-4 md:gap-8 py-16">
          <ServiceDesc
            imagePosition="left"
            image="paint/in-paint-2"
            imageAlt="Offwhite painted ceiling with grid of gray painted extruded ceiling accent pieces"
            header="Interior Painting"
            content="Fresh interior paint changes how every room feels. We protect floors and furniture, repair minor wall imperfections, and apply consistent coats so corners, trim, and ceilings read sharp. You get a livable schedule, clear communication, and a finish that holds up to daily use."
          />
          <ServiceDesc
            imagePosition="right"
            image="paint/ex-paint-2"
            imageAlt="Exterior of a home with professional paint finish"
            header="Exterior Painting"
            content="Exterior paint is your first defense against heat, wind, and moisture. We prep siding and trim properly, use quality coatings suited to the substrate, and pay attention to details like caulk lines and cut-ins so your curb appeal looks crisp and stays protected."
          />
        </section>

        <p className="text-zinc-600 max-w-[720px] -mt-8 mb-16">
          Wood fences and gates need a different process than siding and
          trim—see our{" "}
          <Link
            href="/fence-services"
            className="font-medium text-primary underline underline-offset-4 hover:text-primary/90"
          >
            Fence Services
          </Link>{" "}
          page for fence cleaning, restoration, and premium oil-based staining
          tailored to Texas weather.
        </p>

        <ChooseUs />
      </div>

      <Footer />
    </>
  );
}
