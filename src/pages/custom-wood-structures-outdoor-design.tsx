import ChooseUs from "@/components/misc/choose-us";
import { Hero } from "@/components/misc/hero";
import ServiceDesc from "@/components/misc/serviceDesc";
import Footer from "@/components/nav/footer";


export default function WoodAndOutdoorDesign() {
  return (
    <>
      <Hero
        title="Outdoor Structures"
        subtitle="Custom builds and professional staining for pergolas, patio covers, and other outdoor wood structures."
        backgroundImageUrl="/photos/gates/gate-1.webp"
      />

      <div className="max-w-8xl mx-auto px-4 md:px-8 lg:px-8 mb-12 mt-12">
        <section className="flex flex-col gap-10 py-10 md:gap-12 md:py-16">
          <ServiceDesc
            imagePosition="left"
            image="pergolas/pergola-1"
            imageAlt="Dark brown stained wooden pergola in a home's backyard alcove, with lights strung across it and greenery beneath it"
            header="Custom Outdoor Structure Installation"
            content="Need shade, shelter, or a focal point in the yard? We install custom outdoor structures—including pergolas, patio covers, and related carpentry—with layout and details matched to your home, so the finished piece feels built-in, not bolted on."
          />
          <ServiceDesc
            imagePosition="right"
            image="patio-cover"
            imageAlt="Bright acacia-colored patio cover attached to the back of a brick house"
            header="Pergola & Patio Cover Staining"
            content="Sun and rain fade exposed beams fast. Our staining service evens out color, highlights the grain, and adds a protective coat so your pergola or patio cover keeps looking intentional. We work with premium stains and prep every surface for adhesion and longevity."
          />
        </section>

        <ChooseUs />
      </div>

      <Footer />
    </>
  );
}
