import ChooseUs from "@/components/misc/choose-us";
import { Hero } from "@/components/misc/hero";
import Footer from "@/components/nav/footer";
import ServicesCards from "@/components/services-cards";
import { Button } from "@/components/ui/button";
import { MoveRight, Phone } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | Castle Hills Stain & Restoration",
  description: "Get a free estimate for your next home improvement project.",
};

export default function OurExpertise() {
  return (
    <>
      <Hero
        title="About Castle Hills Stain & Restoration"
        subtitle=""
        backgroundImageUrl="/photos/garages/garage-1.webp"
      />

      <div className="max-w-8xl mx-auto px-4 md:px-8 lg:px-8 mb-12">
        <section className="space-y-4 mb-12 mt-12 gap-8 grid md:grid-cols-2 ">
          <div className="w-full flex flex-col gap-4 justify-center">
            <h2 className="text-3xl font-bold tracking-tight mb-2 sm:text-4xl xl:text-5xl/none">
              Design. Build. Restore.
            </h2>
            <p className="text-zinc-600 max-w-2xl">
              Founded by AJ Cruz, Castle Hills Stain & Restoration has evolved
              from a local staining service into a full-service construction and
              restoration firm serving luxury residential and commercial clients
              across the DFW Metroplex.
            </p>
            <p className="text-zinc-600 max-w-2xl">
              We specialize in custom outdoor structures, fine finishes, and
              both exterior and select interior restorations — offering a
              refined blend of design, craftsmanship, and professional
              execution.
            </p>

            <div className="flex flex-col gap-2 md:flex-row md:gap-4 mt-8">
              <Button
                className="transition-all duration-200 ease-in-out sm:hover:scale-105"
                asChild
              >
                <Link href="/#contact">
                  Schedule a Consultation
                  <MoveRight className="ml-2" strokeWidth={1.5} />
                </Link>
              </Button>
              <Button
                variant="outline"
                className="transition-all duration-200 ease-in-out sm:hover:scale-105"
                asChild
              >
                <Link href="tel:4692153098">
                  Give us a call
                  <Phone size={16} className="ml-2" strokeWidth={1.5} />
                </Link>
              </Button>
            </div>
          </div>

          <div className="flex justify-center">
            {/* Google Maps embed */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d859115.2185226647!2d-97.62291295118169!3d32.74134616817178!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xacd9370584827891%3A0x2ef8c59ff7f32580!2sCastle%20Hills%20Stain%20%26%20Restoration!5e0!3m2!1sen!2sus!4v1725206080160!5m2!1sen!2sus"
              width="600"
              height="380"
              className="flex w-full border border-zinc-200 rounded-xl shadow-sm margin-0"
              loading="lazy"
            ></iframe>
          </div>
        </section>

        <section className="flex flex-col md:flex-row gap-4 md:gap-8"></section>
      </div>

      <ServicesCards heading="Our Services" />

      <section className="max-w-8xl mx-auto px-4 md:px-8 lg:px-8 mb-12">
        <ChooseUs />
      </section>

      <Footer />
    </>
  );
}
