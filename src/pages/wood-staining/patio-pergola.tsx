import { Link } from "@tanstack/react-router";
import ServiceDesc from "@/components/misc/serviceDesc";
import { ServicePageLayout } from "@/components/services/service-page-layout";

export default function PatioPergolaStainingPage() {
  return (
    <ServicePageLayout
      title="Patio Cover & Pergola Staining"
      subtitle="Even color and lasting protection for beams, covers, and outdoor wood that lives in the sun."
      backgroundImageUrl="/photos/pergolas/pergola-1.webp"
    >
      <section className="mb-12 flex flex-col gap-10 py-6 md:gap-12 md:py-10">
        <ServiceDesc
          imagePosition="right"
          image="pergolas/pergola-1"
          imageAlt="Dark brown stained wooden pergola in a home's backyard alcove, with lights strung across it and greenery beneath it"
          header="Pergola & patio cover staining"
          content="Sun and rain fade exposed beams fast. Our staining service evens out color, highlights the grain, and adds a protective coat so your pergola or patio cover keeps looking intentional. We work with premium stains and prep every surface for adhesion and longevity."
        />
        <ServiceDesc
          imagePosition="left"
          image="patio-cover"
          imageAlt="Bright acacia-colored patio cover attached to the back of a brick house"
          header="Finish that matches your outdoor living space"
          content="Whether the cover is attached to the house or freestanding, we stain for consistent tone and weather protection so the structure reads as part of the home—not an afterthought."
        />
      </section>

      <p className="mb-16 max-w-[720px] text-zinc-600">
        Looking for broader exterior wood care? See{" "}
        <Link
          to="/wood-staining/exterior-wood"
          className="font-medium text-primary underline underline-offset-4 hover:text-primary/90"
        >
          Exterior Wood Staining
        </Link>{" "}
        or{" "}
        <Link
          to="/wood-staining/fence"
          className="font-medium text-primary underline underline-offset-4 hover:text-primary/90"
        >
          Fence Staining
        </Link>
        . House paint for siding lives under{" "}
        <Link
          to="/painting/exterior"
          className="font-medium text-primary underline underline-offset-4 hover:text-primary/90"
        >
          Exterior Painting
        </Link>
        .
      </p>
    </ServicePageLayout>
  );
}
