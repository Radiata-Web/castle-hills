import { Link } from "@tanstack/react-router";
import ServiceDesc from "@/components/misc/serviceDesc";
import StainGallery from "@/components/misc/stain-gallery";
import { Button } from "@/components/ui/button";
import { ServicePageLayout } from "@/components/services/service-page-layout";
import { ctaPrimaryClassName } from "@/lib/cta";
import { PHOTOS } from "@/lib/images";
import { DEFERRED_SERVICE_NOTES } from "@/lib/service-ia";
import { cn } from "@/lib/utils";

export default function FenceStainingPage() {
  return (
    <ServicePageLayout
      title="Fence Staining"
      subtitle="Clean, prep, and premium oil-based stain so your fence looks rich and stands up to North Texas weather."
      backgroundImageUrl={PHOTOS.stain2}
    >
      <section className="mb-10 flex flex-col gap-10 py-6 md:gap-12 md:py-10">
        <ServiceDesc
          imagePosition="right"
          image={PHOTOS.stain2}
          imageAlt="Dark brown stained wooden fence in a residential backyard"
          header="Fence staining & sealing"
          content="Stain and seal lock out moisture, cut UV damage, and keep boards from checking and graying. We help you choose a color that complements your home, then apply premium products so the grain looks rich and the finish lasts."
        />
      </section>

      <section className="mb-16 rounded-2xl border border-zinc-200/90 bg-gradient-to-br from-accent-light/30 via-muted/40 to-zinc-50/80 px-6 py-10 shadow-sm md:px-10 md:py-12">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
          Prep & finish
        </p>
        <h2 className="mb-4 text-2xl font-bold sm:text-3xl xl:text-4xl/none">
          Fence cleaning & restoration
        </h2>
        <ul className="mb-6 max-w-[720px] list-disc space-y-3 pl-6 text-zinc-600">
          <li>
            We remove dirt, mildew, and old buildup, then prep every board so stain takes evenly—not
            blotchy or dry in patches.
          </li>
          <li>
            Premium oil-based stain goes on after the wood is ready, giving a rich finish and
            long-term protection against harsh Texas sun and moisture.
          </li>
          <li>
            If a section needs attention before stain, we can note simple repairs as part of the
            workflow so the finished fence looks intentional.
          </li>
        </ul>
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-zinc-500">
          Our workflow
        </p>
        <p className="mb-0 text-lg font-medium text-zinc-800">
          Restore → Prep → Stain → Long-term protection
        </p>
        <Button
          size="lg"
          className={cn(ctaPrimaryClassName, "mt-5 sm:mt-6")}
          render={<Link to="/contact-us" />}
          nativeButton={false}
        >
          Request a Free Estimate
        </Button>
      </section>

      <StainGallery labels={["Fence"]} />

      <p className="mb-6 max-w-[720px] text-zinc-600">{DEFERRED_SERVICE_NOTES.deck}</p>

      <p className="mb-16 max-w-[720px] text-zinc-600">
        Also staining a{" "}
        <Link
          to="/wood-staining/patio-pergola"
          className="font-medium text-primary underline underline-offset-4 hover:text-primary/90"
        >
          patio cover or pergola
        </Link>
        , or other{" "}
        <Link
          to="/wood-staining/exterior-wood"
          className="font-medium text-primary underline underline-offset-4 hover:text-primary/90"
        >
          exterior wood
        </Link>
        ? Start from the{" "}
        <Link
          to="/wood-staining"
          className="font-medium text-primary underline underline-offset-4 hover:text-primary/90"
        >
          Wood Staining
        </Link>{" "}
        hub.
      </p>
    </ServicePageLayout>
  );
}
