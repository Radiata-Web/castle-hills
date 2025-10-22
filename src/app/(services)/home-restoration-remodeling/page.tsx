import ServiceDesc from "@/components/misc/serviceDesc";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Home Restoration & Remodeling in DFW | Castle Hills Stain & Restoration",
  description:
    "Fast, professional home restoration across DFW—assessment, mitigation, cleanup, and repairs for water, fire, smoke, and mold to return your property to pre‑damage condition",
};

export default function Page() {
  return (
    <>
      <header className="space-y-4 mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl xl:text-5xl/none">
          Home Restoration & Remodeling
        </h1>
        <p className="text-zinc-600">
          Fast, professional home restoration across DFW—assessment, mitigation,
          cleanup, and repairs for weather damage, paint damage, and more to
          return your property to pre‑damage condition.
        </p>
      </header>

      <section className="space-y-12 md:space-y-20">
        <ServiceDesc
          imagePosition="right"
          image="restoration/restore-4"
          imageAlt="Brightly lit modern kitchen with granite countertops, beautifully painted white cabinets, and a large island with dark painted wood paneling."
          header="Home Restoration"
          content="When the unexpected happens, our team restores your home to pre‑damage
          condition with a proven process that covers assessment, mitigation,
          cleanup, repairs, and finishing. From the first inspection to the
          final walkthrough, we use top‑quality materials and detail‑focused
          craftsmanship to protect your investment and bring back comfort and
          safety. Serving the Dallas–Fort Worth area since 2015, we act quickly,
          communicate clearly, and work with care around your property from
          start to finish. Request a free estimate to get expert guidance and a
          prompt, professional plan for recovery."
        />
        <ServiceDesc
          imagePosition="left"
          image="restoration/restore-6"
          imageAlt="Offwhite painted ceiling with grid of gray painted extruded ceiling accent pieces"
          header="Interior Painting"
          content="A professionally done interior paint job can instantly transform any room, adding color, warmth, and personality. Our expert interior painting services offer precision, high-quality paints, and a flawless finish, giving your home the makeover it deserves. Imagine walking into a space that feels brighter, fresher, and more inviting—reflecting your style perfectly."
        />
        <ServiceDesc
          imagePosition="right"
          image="restoration/restore-10"
          imageAlt="Offwhite painted ceiling with grid of gray painted extruded ceiling accent pieces"
          header="Interior Painting"
          content="A professionally done interior paint job can instantly transform any room, adding color, warmth, and personality. Our expert interior painting services offer precision, high-quality paints, and a flawless finish, giving your home the makeover it deserves. Imagine walking into a space that feels brighter, fresher, and more inviting—reflecting your style perfectly."
        />
      </section>
    </>
  );
}
