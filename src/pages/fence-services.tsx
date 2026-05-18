import ChooseUs from "@/components/misc/choose-us";
import { FenceServicesSummary } from "@/components/misc/fence-services-summary";
import { Hero } from "@/components/misc/hero";
import ServiceDesc from "@/components/misc/serviceDesc";
import Footer from "@/components/nav/footer";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";


export default function FenceServices() {
  return (
    <>
      <Hero
        title="Fence Services"
        subtitle="Installation, staining, repair, and custom gates—built and finished to stand up to North Texas weather."
        backgroundImageUrl="/photos/stain/stain-2.webp"
      />

      <div className="max-w-8xl mx-auto px-4 md:px-8 lg:px-8 mb-12 mt-8 md:mt-12">
        <FenceServicesSummary />

        <section
          id="fence-details"
          className="flex flex-col gap-4 md:gap-8 py-12 md:py-16 scroll-mt-24"
        >
          <ServiceDesc
            imagePosition="left"
            image="fences/wood/fence-3"
            imageAlt="Unstained wooden fence in a residential backyard from the sidewalk"
            header="Fence Installation"
            content="A well-built wood fence adds privacy, security, and curb appeal. We install with solid posts, clean lines, and materials selected for durability so your boundary looks sharp and holds up season after season."
          />
          <ServiceDesc
            imagePosition="right"
            image="stain/stain-2"
            imageAlt="Dark brown stained wooden fence in a residential backyard"
            header="Fence Staining & Sealing"
            content="Stain and seal lock out moisture, cut UV damage, and keep boards from checking and graying. We help you choose a color that complements your home, then apply premium products so the grain looks rich and the finish lasts."
          />
          <ServiceDesc
            imagePosition="left"
            image="fences/wood/fence-1"
            imageAlt="Wooden fence along a residential property line"
            header="Fence Repair & Restoration"
            content="Leaning sections, rotted posts, and storm damage do not have to mean a full replacement. We assess what can be saved, rebuild or sister framing where needed, and blend repairs so your fence looks intentional—not patched."
          />
          <ServiceDesc
            imagePosition="right"
            image="gates/gate-1"
            imageAlt="Deep brown stained wooden automatic gate along a brown wooden fence on a driveway"
            header="Custom Gate Installation"
            content="Driveway or walk gates set the tone for your property. We design and build custom wood gates—manual or automated—with hardware and clearances dialed in for smooth operation and a finish that matches your fence."
          />
        </section>

        <section className="rounded-2xl border border-zinc-200/90 bg-gradient-to-br from-accent-light/30 via-muted/40 to-zinc-50/80 px-6 py-10 md:px-10 md:py-12 mb-16 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent mb-2">
            Prep & finish
          </p>
          <h2 className="text-2xl font-bold sm:text-3xl xl:text-4xl/none mb-4">
            Fence Cleaning & Restoration
          </h2>
          <ul className="list-disc pl-6 text-zinc-600 max-w-[720px] space-y-3 mb-6">
            <li>
              We remove dirt, mildew, and old buildup, then prep every board so
              stain takes evenly—not blotchy or dry in patches.
            </li>
            <li>
              Premium oil-based stain goes on after the wood is ready, giving a
              rich finish and long-term protection against harsh Texas sun and
              moisture.
            </li>
          </ul>
          <p className="text-sm font-semibold uppercase tracking-wide text-zinc-500 mb-2">
            Our workflow
          </p>
          <p className="text-lg font-medium text-zinc-800 mb-8">
            Restore → Prep → Stain → Long-term protection
          </p>
          <Button
            size="lg"
            className="transition-all duration-200 ease-in-out sm:hover:scale-105"
            asChild
          >
            <Link to="/contact-us">Request a Free Estimate</Link>
          </Button>
        </section>

        <ChooseUs />
      </div>

      <Footer />
    </>
  );
}
