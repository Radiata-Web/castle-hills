import { Link } from "@tanstack/react-router";
import ServiceDesc from "@/components/misc/serviceDesc";
import { ServicePageLayout } from "@/components/services/service-page-layout";
import { PHOTOS } from "@/lib/images";
import { DEFERRED_SERVICE_NOTES } from "@/lib/service-ia";

export default function InteriorPaintingPage() {
  return (
    <ServicePageLayout
      title="Interior Painting"
      subtitle="Protected floors, sharp cut-ins, and finishes that hold up to daily life in your home."
      backgroundImageUrl={PHOTOS.paintInt1Before}
    >
      <section className="mb-12 flex flex-col gap-10 py-6 md:gap-12 md:py-10">
        <ServiceDesc
          imagePosition="left"
          image={PHOTOS.paintInt1Before}
          imageAlt="Offwhite painted ceiling with grid of gray painted extruded ceiling accent pieces"
          header="Rooms, trim, and ceilings done right"
          content="Fresh interior paint changes how every room feels. We protect floors and furniture, repair minor wall imperfections, and apply consistent coats so corners, trim, and ceilings read sharp. You get a livable schedule, clear communication, and a finish that holds up to daily use."
        />
      </section>

      <section aria-labelledby="interior-drywall-heading" className="mb-12 max-w-[720px]">
        <h2 id="interior-drywall-heading" className="text-2xl font-bold sm:text-3xl">
          Drywall repair & texture
        </h2>
        <p className="mt-3 text-zinc-600">
          Paint only looks as good as the surface underneath. We repair nail pops, patch holes, and
          blend texture so new coats lay flat—without turning the job into a remodel project. Tell
          us what needs attention when you request your estimate.
        </p>
      </section>

      <p className="mb-6 max-w-[720px] text-zinc-600">{DEFERRED_SERVICE_NOTES.cabinets}</p>

      <p className="mb-16 max-w-[720px] text-zinc-600">
        Also exploring curb appeal? See{" "}
        <Link
          to="/painting/exterior"
          className="font-medium text-primary underline underline-offset-4 hover:text-primary/90"
        >
          Exterior Painting
        </Link>{" "}
        or the full{" "}
        <Link
          to="/painting"
          className="font-medium text-primary underline underline-offset-4 hover:text-primary/90"
        >
          Painting
        </Link>{" "}
        overview.
      </p>
    </ServicePageLayout>
  );
}
