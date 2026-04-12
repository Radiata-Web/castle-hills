import ChooseUs from "@/components/misc/choose-us";
import ServiceDesc from "@/components/misc/serviceDesc";
import Suppliers from "@/components/misc/suppliers";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fence Staining | Castle Hills Stain & Restoration",
  description:
    "Professional fence staining and wood protection in the Dallas–Fort Worth Metroplex.",
};

export default function Page() {
  return (
    <>
      <header className="space-y-4 mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl xl:text-5xl/none">
          Fence Staining
        </h1>
        <p className="text-zinc-600">
          Professional fence staining and wood protection for homes across the
          Dallas–Fort Worth Metroplex.
        </p>
      </header>
      <section className="space-y-12 md:space-y-20">
        <ServiceDesc
          imagePosition="left"
          image="stain/stain-2"
          imageAlt="Dark brown stained wooden fence in a residential backyard"
          header="Protect and Refresh Your Fence"
          content="Fence staining shields wood from moisture, UV rays, and temperature swings—helping prevent warping, splitting, and graying while extending the life of your fence. It also boosts curb appeal with rich, even color and finish options that complement your home’s exterior."
        />
        <ServiceDesc
          imagePosition="right"
          image="fences/wood/fence-4"
          imageAlt="Brown stained wooden fence in a residential alleyway"
          header="Clean Application, Lasting Results"
          content="We focus on thorough prep, quality coatings suited to Texas weather, and careful application so stain penetrates evenly and looks sharp from every angle. Whether you’re refreshing an older fence or finishing new wood, we deliver a durable, polished result you can be proud of."
        />

        <Suppliers />
      </section>

      <ChooseUs />
    </>
  );
}
