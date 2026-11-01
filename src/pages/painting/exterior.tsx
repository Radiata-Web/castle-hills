import { Link } from "@tanstack/react-router";
import PaintBeforeAfter from "@/components/misc/paint-before-after";
import ServiceDesc from "@/components/misc/serviceDesc";
import { ServicePageLayout } from "@/components/services/service-page-layout";
import { PHOTOS } from "@/lib/images";

export default function ExteriorPaintingPage() {
  return (
    <ServicePageLayout
      title="Exterior Painting"
      subtitle="Prep and coatings that protect siding and trim from North Texas heat, wind, and moisture."
      backgroundImageUrl={PHOTOS.paintExt2}
    >
      <section className="mb-12 flex flex-col gap-10 py-6 md:gap-12 md:py-10">
        <ServiceDesc
          imagePosition="right"
          image={PHOTOS.paintExt4}
          imageAlt="Exterior of a home with professional paint finish"
          header="Curb appeal that lasts"
          content="Exterior paint is your first defense against heat, wind, and moisture. We prep siding and trim properly, use quality coatings suited to the substrate, and pay attention to details like caulk lines and cut-ins so your curb appeal looks crisp and stays protected. High-performance options include Sherwin-Williams Emerald® and Duration®, plus Romabio Classico Limewash® where it fits your design."
        />
      </section>

      <PaintBeforeAfter variant="exterior" />

      <p className="mb-16 max-w-[720px] text-zinc-600">
        Fences, pergolas, and other outdoor wood need stain—not siding paint. Visit{" "}
        <Link
          to="/wood-staining"
          className="font-medium text-primary underline underline-offset-4 hover:text-primary/90"
        >
          Wood Staining
        </Link>{" "}
        or compare with{" "}
        <Link
          to="/painting/interior"
          className="font-medium text-primary underline underline-offset-4 hover:text-primary/90"
        >
          Interior Painting
        </Link>
        .
      </p>
    </ServicePageLayout>
  );
}
