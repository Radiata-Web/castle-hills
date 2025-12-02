import ChooseUs from "@/components/misc/choose-us";
import Footer from "@/components/nav/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Castle Hills Stain & Restoration",
  description: "Get a free estimate for your next home improvement project.",
};

export default function OurExpertise() {
  return (
    <>
      <div className="max-w-8xl mx-auto px-4 md:px-8 lg:px-8 mb-12">
        <header className="space-y-4 mb-12 mt-12">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl xl:text-5xl/none">
            About Us
          </h1>
          <p className="text-zinc-600">
            Founded by AJ Cruz, Castle Hills Stain & Restoration has evolved
            from a local staining service into a full-service construction and
            restoration firm serving luxury residential and commercial clients
            across the DFW Metroplex.
          </p>
        </header>

        <section className="flex flex-col md:flex-row gap-4 md:gap-8"></section>

        <ChooseUs />
      </div>

      <Footer />
    </>
  );
}
