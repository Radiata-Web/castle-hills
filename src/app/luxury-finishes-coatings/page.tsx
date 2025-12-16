import ChooseUs from "@/components/misc/choose-us";
import { Hero } from "@/components/misc/hero";
import ServiceDesc from "@/components/misc/serviceDesc";
import Footer from "@/components/nav/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Luxury Finishes & Coatings | Castle Hills Stain & Restoration",
  description: "Get a free estimate for your next home improvement project.",
};

export default function LuxuryFinishesCoatings() {
  return (
    <>
      <Hero
        title="Luxury Finishes & Coatings"
        subtitle="Our team of experts is here to help you with any home improvement project."
        backgroundImageUrl="/photos/stain/stain-2.webp"
      />

      <div className="max-w-8xl mx-auto px-4 md:px-8 lg:px-8 mb-12 mt-12">
        <section className="flex flex-col gap-4 md:gap-8 py-16">
          <ServiceDesc
            imagePosition="right"
            image="garages/garage-1"
            imageAlt="Dark gray stained wooden garage door on brick house"
            header="Garage Door Stain & Seal"
            content="A fresh stain and seal can restore its beauty and protect it from harsh elements. Our garage door stain & seal service enhances the natural grain of your wood, adding richness and depth while creating a protective barrier against moisture, UV rays, and wear. Imagine pulling up to your home and seeing a garage door that looks brand new, adding curb appeal and lasting durability."
          />
          <ServiceDesc
            imagePosition="left"
            image="paint/ex-paint-2"
            imageAlt="Offwhite painted ceiling with grid of gray painted extruded ceiling accent pieces"
            header="Exterior Painting"
            content="A professional exterior paint job can completely transform your home's appearance, boosting curb appeal and protecting it from the elements. Our exterior painting services use top-quality paints and expert techniques to ensure a long-lasting, beautiful finish that enhances your home’s character. Imagine pulling up to a house that looks vibrant and refreshed, with a paint job that stands up to the harshest weather."
          />

          <ServiceDesc
            imagePosition="right"
            image="paint/in-paint-2"
            imageAlt="Offwhite painted ceiling with grid of gray painted extruded ceiling accent pieces"
            header="Interior Painting"
            content="A professionally done interior paint job can instantly transform any room, adding color, warmth, and personality. Our expert interior painting services offer precision, high-quality paints, and a flawless finish, giving your home the makeover it deserves. Imagine walking into a space that feels brighter, fresher, and more inviting—reflecting your style perfectly."
          />

          <ServiceDesc
            imagePosition="left"
            image="stain/stain-2"
            imageAlt="Dark brown stained wooden fence in a residential backyard"
            header="Fence Staining"
            content="Fence staining protects the fence from moisture, UV rays, and temperature changes, preventing damage and extending the fence's lifespan. It also enhances curb appeal by providing a polished look and offering various color options to complement the property’s exterior."
          />
        </section>

        <ChooseUs />
      </div>

      <Footer />
    </>
  );
}
