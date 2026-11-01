import { Link } from "@tanstack/react-router";
import PaintBeforeAfter from "@/components/misc/paint-before-after";
import ServiceDesc from "@/components/misc/serviceDesc";
import { ServiceChildLinks } from "@/components/services/service-child-links";
import { ServicePageLayout } from "@/components/services/service-page-layout";
import { PHOTOS } from "@/lib/images";
import { DEFERRED_SERVICE_NOTES, SERVICE_NAV_GROUPS } from "@/lib/service-ia";

const paintingGroup = SERVICE_NAV_GROUPS.find((g) => g.id === "painting")!;

export default function PaintingHubPage() {
  return (
    <ServicePageLayout
      title="Interior & Exterior Painting"
      subtitle="Clean lines, durable coatings, and colors chosen to suit your home and how you live in it."
      backgroundImageUrl={PHOTOS.paintExt2}
    >
      <ServiceChildLinks
        heading="Painting services"
        intro="Choose the surface you need refreshed—or start with a free estimate and we’ll walk the property with you."
        links={paintingGroup.children}
      />

      <section className="mb-16 flex flex-col gap-10 md:gap-12">
        <ServiceDesc
          imagePosition="left"
          image={PHOTOS.paintInt1Before}
          imageAlt="Offwhite painted ceiling with grid of gray painted extruded ceiling accent pieces"
          header="Interior Painting"
          content="Fresh interior paint changes how every room feels. We protect floors and furniture, repair minor wall imperfections, and apply consistent coats so corners, trim, and ceilings read sharp."
        />
        <ServiceDesc
          imagePosition="right"
          image={PHOTOS.paintExt4}
          imageAlt="Exterior of a home with professional paint finish"
          header="Exterior Painting"
          content="Exterior paint is your first defense against heat, wind, and moisture. We prep siding and trim properly, use quality coatings suited to the substrate, and pay attention to caulk lines and cut-ins."
        />
      </section>

      <PaintBeforeAfter />

      <section aria-labelledby="drywall-heading" className="mb-12 max-w-[720px]">
        <h2 id="drywall-heading" className="text-2xl font-bold sm:text-3xl">
          Drywall repair & texture
        </h2>
        <p className="mt-3 text-zinc-600">
          Small holes, seams, and texture mismatches show through fresh paint. We patch and blend
          drywall as part of interior prep so the finish looks intentional—not patched. Ask about
          drywall when you{" "}
          <Link
            to="/painting/interior"
            className="font-medium text-primary underline underline-offset-4 hover:text-primary/90"
          >
            plan interior painting
          </Link>{" "}
          or request an estimate.
        </p>
      </section>

      <p className="mb-8 max-w-[720px] text-zinc-600">{DEFERRED_SERVICE_NOTES.cabinets}</p>

      <p className="mb-16 max-w-[720px] text-zinc-600">
        Wood fences, decks, and outdoor structures need stain—not house paint. See our{" "}
        <Link
          to="/wood-staining"
          className="font-medium text-primary underline underline-offset-4 hover:text-primary/90"
        >
          Wood Staining
        </Link>{" "}
        services for cleaning, prep, and premium oil-based finishes built for Texas weather.
      </p>
    </ServicePageLayout>
  );
}
