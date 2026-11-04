import { Link } from "@tanstack/react-router";
import ServiceDesc from "@/components/misc/serviceDesc";
import StainGallery from "@/components/misc/stain-gallery";
import { ServiceChildLinks } from "@/components/services/service-child-links";
import { ServicePageLayout } from "@/components/services/service-page-layout";
import { PHOTOS } from "@/lib/images";
import { DEFERRED_SERVICE_NOTES, SERVICE_NAV_GROUPS } from "@/lib/service-ia";

const stainGroup = SERVICE_NAV_GROUPS.find((g) => g.id === "wood-staining")!;

export default function WoodStainingHubPage() {
  return (
    <ServicePageLayout
      title="Wood Staining"
      subtitle="Fence, patio, pergola, and exterior wood staining—cleaned, prepped, and finished for Texas weather."
      backgroundImageUrl={PHOTOS.stain2}
    >
      <ServiceChildLinks
        heading="Staining services"
        intro="Pick the wood you want protected, or request an estimate and we’ll recommend the right prep and product."
        links={stainGroup.children}
      />

      <section className="mb-12 flex flex-col gap-10 md:gap-12">
        <ServiceDesc
          imagePosition="left"
          image={PHOTOS.stain2}
          imageAlt="Dark brown stained wooden fence in a residential backyard"
          header="Fence staining & sealing"
          content="Stain and seal lock out moisture, cut UV damage, and keep boards from checking and graying. We help you choose a color that complements your home, then apply premium products so the grain looks rich and the finish lasts."
        />
        <ServiceDesc
          imagePosition="right"
          image={PHOTOS.stain3}
          imageAlt="Dark brown stained wooden pergola in a home's backyard alcove"
          header="Patio covers & pergolas"
          content="Sun and rain fade exposed beams fast. Our staining service evens out color, highlights the grain, and adds a protective coat so your pergola or patio cover keeps looking intentional."
        />
      </section>

      <StainGallery />

      <p className="mb-6 max-w-[720px] text-zinc-600">{DEFERRED_SERVICE_NOTES.deck}</p>

      <p className="mb-16 max-w-[720px] text-zinc-600">
        House siding and trim usually need paint, not stain—see{" "}
        <Link
          to="/painting"
          className="font-medium text-primary underline underline-offset-4 hover:text-primary/90"
        >
          Interior & Exterior Painting
        </Link>
        .
      </p>
    </ServicePageLayout>
  );
}
