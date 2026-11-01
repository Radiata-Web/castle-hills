import { Link } from "@tanstack/react-router";
import ServiceDesc from "@/components/misc/serviceDesc";
import StainGallery from "@/components/misc/stain-gallery";
import { ServicePageLayout } from "@/components/services/service-page-layout";
import { PHOTOS } from "@/lib/images";

export default function ExteriorWoodStainingPage() {
  return (
    <ServicePageLayout
      title="Exterior Wood Staining"
      subtitle="Stain and seal exposed exterior wood so it stays rich, even, and protected from Texas weather."
      backgroundImageUrl={PHOTOS.stain4}
    >
      <section className="mb-12 flex flex-col gap-10 py-6 md:gap-12 md:py-10">
        <ServiceDesc
          imagePosition="left"
          image={PHOTOS.stain4}
          imageAlt="Residential home exterior with a clean professional wood stain finish"
          header="Protect the wood you already have"
          content="From fascia and trim accents to gates, rails, and other outdoor wood, we clean, prep, and stain so color stays even and UV protection lasts. Premium products and careful prep matter more than a quick coat—especially under North Texas sun."
        />
      </section>

      <StainGallery labels={["Exterior wood", "Outdoor wood", "Patio cover"]} />

      <p className="mb-16 max-w-[720px] text-zinc-600">
        Focused on a fence or a patio cover? Jump to{" "}
        <Link
          to="/wood-staining/fence"
          className="font-medium text-primary underline underline-offset-4 hover:text-primary/90"
        >
          Fence Staining
        </Link>{" "}
        or{" "}
        <Link
          to="/wood-staining/patio-pergola"
          className="font-medium text-primary underline underline-offset-4 hover:text-primary/90"
        >
          Patio Cover & Pergola Staining
        </Link>
        . Soft note: if a structure itself needs work beyond finish, mention it on your estimate
        request—we keep the public focus on staining and protection.
      </p>
    </ServicePageLayout>
  );
}
