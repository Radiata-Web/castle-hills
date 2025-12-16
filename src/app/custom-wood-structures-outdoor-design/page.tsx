import ChooseUs from "@/components/misc/choose-us";
import { Hero } from "@/components/misc/hero";
import ServiceDesc from "@/components/misc/serviceDesc";
import Footer from "@/components/nav/footer";
import { Hammer, Paintbrush, Pencil, Search } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Expertise | Castle Hills Stain & Restoration",
  description: "Get a free estimate for your next home improvement project.",
};

export default function WoodAndOutdoorDesign() {
  return (
    <>
      <Hero
        title="Custom Wood Structures & Outdoor Design"
        subtitle="Custom pergolas, patio covers, fences, and outdoor kitchens built with precision and premium materials."
        backgroundImageUrl="/photos/stain/stain-2.webp"
      />

      <div className="max-w-8xl mx-auto px-4 md:px-8 lg:px-8 mb-12 mt-12">
        <section className="flex flex-col gap-4 md:gap-8 py-16">
          <ServiceDesc
            imagePosition="left"
            image="pergolas/pergola-6"
            imageAlt="Dark brown stained wooden pergola in a home's backyard alcove, with lights strung across it and greenery beneath it"
            header="Pergola Installation & Staining"
            content="Dreaming of a stylish, shaded retreat in your backyard? A custom pergola can transform your outdoor space into the perfect spot for relaxation and entertaining. Our expert pergola installation and staining services deliver both beauty and durability, with high-quality craftsmanship and a rich stain that protects and enhances the wood’s natural charm."
          />
          <ServiceDesc
            imagePosition="right"
            image="patio-cover"
            imageAlt="Bright acacia-colored patio cover attached to the back of a brick house"
            header="Patio Cover Installation"
            content="A custom patio cover can provide the perfect shelter, allowing you to enjoy your outdoor space year-round. Our patio cover installation service offers stylish, durable designs that not only provide shade and weather protection but also enhance your home's curb appeal. Imagine relaxing under your patio cover, shielded from the elements while still enjoying the fresh air."
          />
          <ServiceDesc
            imagePosition="left"
            image="fences/wood/fence-3"
            imageAlt="Unstained wooden fence in a residential backyard from the sidewalk"
            header="Wood Fence Installation"
            content="A beautifully installed wood fence adds both charm and security to your home. Our wood fence installation service uses top-quality materials and skilled craftsmanship to create a durable, aesthetically pleasing barrier that stands up to the elements. Imagine your yard framed by a stunning wood fence that complements your landscape and boosts your home’s value."
          />
          <ServiceDesc
            imagePosition="right"
            image="gates/gate-1"
            imageAlt="Deep brown stained wooden automatic gate along a brown wooden fence on a driveway"
            header="Automatic Wooden Gates"
            content="Tired of manually opening your gate every time you come home? An automatic gate can provide both convenience and enhanced security for your property. Our automatic gate installation service offers seamless operation, durable materials, and customizable designs to fit your style. Imagine pulling up to your home, pressing a button, and watching your gate glide open effortlessly—adding both ease and sophistication to your daily routine."
          />
        </section>

        <ChooseUs />
      </div>

      <Footer />
    </>
  );
}
