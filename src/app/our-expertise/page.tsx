import ChooseUs from "@/components/misc/choose-us";
import { GlossyPhotoFrame } from "@/components/misc/glossy-photo-frame";
import { Hero } from "@/components/misc/hero";
import Footer from "@/components/nav/footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Fence,
  Hammer,
  Paintbrush,
  PaintBucket,
  Pencil,
  Search,
} from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Expertise | Castle Hills Stain & Restoration",
  description: "Get a free estimate for your next home improvement project.",
};

export default function OurExpertise() {
  return (
    <>
      <Hero
        title="Our Expertise"
        subtitle="Our team of experts is here to help you with any home improvement project."
        backgroundImageUrl="/photos/stain/stain-2.webp"
      />

      <div className="max-w-8xl mx-auto px-4 md:px-8 lg:px-8 mb-12 mt-8 md:mt-12">
        <section className="grid grid-cols-1 items-center gap-10 pb-12 md:gap-12 lg:grid-cols-2 lg:gap-x-12 lg:gap-y-8 lg:pb-16">
          <div className="order-2 flex w-full justify-center lg:order-1 lg:justify-end">
            <div className="w-full max-w-xl text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent mb-2">
                On the job
              </p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl xl:text-5xl/none mb-4">
                Craft you can see in the details
              </h2>
              <p className="text-lg leading-relaxed text-zinc-600">
                From outdoor wood and fences to interior paint and full
                restoration, we bring the same mindset: prep done right,
                materials chosen for Texas conditions, and finishes built to look
                sharp for years—not weeks.
              </p>
            </div>
          </div>
          <div className="order-1 flex w-full justify-center lg:order-2 lg:justify-start">
            <GlossyPhotoFrame
              figureClassName="w-full max-w-md sm:max-w-lg lg:max-w-xl xl:max-w-2xl"
              src="/photos/pergolas/pergola-6.webp"
              alt="Stained wooden pergola in a backyard, representing custom outdoor structure work"
              width={800}
              height={560}
              sizes="(max-width: 1024px) 90vw, 44vw"
            />
          </div>
        </section>

        <section className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
          <Card className="border-none shadow-none">
            <CardHeader className="text-2xl font-bold sm:text-3xl">
              <span className="flex justify-center items-center bg-accent w-16 h-16 rounded-lg mb-4">
                <Fence size={36} className="text-white" strokeWidth={1} />
              </span>
              Fence Staining & Wood Protection
            </CardHeader>

            <CardContent>
              Protect and enhance your fence with premium oil-based stains
              designed to withstand the Texas sun and weather. Our process
              ensures even coverage, deep penetration, and long-lasting results.
            </CardContent>
          </Card>

          <Card className="border-none shadow-none">
            <CardHeader className="text-2xl font-bold sm:text-3xl">
              <span className="flex justify-center items-center bg-accent w-16 h-16 rounded-lg mb-4">
                <PaintBucket size={36} className="text-white" strokeWidth={1} />
              </span>
              Exterior & Interior Painting
            </CardHeader>

            <CardContent>
              Professional painting services using high-quality materials and
              clean application methods to deliver a durable, consistent finish
              inside and out.
            </CardContent>
          </Card>

          <Card className="border-none shadow-none">
            <CardHeader className="text-2xl font-bold sm:text-3xl">
              <span className="flex justify-center items-center bg-accent w-16 h-16 rounded-lg mb-4">
                <Hammer size={36} className="text-white" strokeWidth={1} />
              </span>
              Home Maintenance & Restoration
            </CardHeader>

            <CardContent>
              From wood repairs to exterior touch-ups, we help keep your home
              looking its best with ongoing maintenance and restoration
              services.
            </CardContent>
          </Card>
        </section>

        <section className="flex flex-col gap-4 md:gap-8 py-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Our Process
          </h2>

          <ul className="grid items-stretch grid-flow-row gap-6 px-4">
            <li className="list-none pb-4 flex items-center gap-9 md:gap-11 border-b">
              <span className="text-6xl font-bold text-accent/80">1.</span>
              <div className="flex flex-col">
                <h3 className="text-2xl font-semibold mb-2 flex items-center gap-2">
                  On-Site Consultation
                  <Search className="inline opacity-50" size={18} />
                </h3>
                <p className="leading-relaxed text-muted-foreground">
                  We assess your project, provide recommendations, and answer
                  any questions.
                </p>
              </div>
            </li>

            <li className="list-none pb-4 flex items-center gap-6 md:gap-8 border-b">
              <span className="text-6xl font-bold text-accent/80">2.</span>
              <div className="flex flex-col">
                <h3 className="text-2xl font-semibold mb-2 flex items-center gap-2">
                  Clear Proposal{" "}
                  <Pencil className="inline opacity-50" size={18} />
                </h3>
                <p className="leading-relaxed text-muted-foreground">
                  You’ll receive a detailed estimate with options based on your
                  goals and budget.
                </p>
              </div>
            </li>

            <li className="list-none pb-4 flex items-center gap-6 md:gap-8 border-b">
              <span className="text-6xl font-bold text-accent/80">3.</span>
              <div className="flex flex-col">
                <h3 className="text-2xl font-semibold mb-2 flex items-center gap-2">
                  Professional Execution{" "}
                  <Hammer className="inline opacity-50" size={18} />
                </h3>
                <p className="leading-relaxed text-muted-foreground">
                  Our team completes the work with clean job sites, proper prep,
                  and attention to detail.
                </p>
              </div>
            </li>

            <li className="list-none pb-4 flex items-center gap-6 md:gap-8">
              <span className="text-6xl font-bold text-accent/80">4.</span>
              <div className="flex flex-col">
                <h3 className="text-2xl font-semibold mb-2 flex items-center gap-2">
                  Final Walkthrough{" "}
                  <Paintbrush className="inline opacity-50" size={18} />
                </h3>
                <p className="leading-relaxed text-muted-foreground">
                  We ensure everything meets our standards and yours before
                  closing out the project.
                </p>
              </div>
            </li>
          </ul>
        </section>

        <ChooseUs />
      </div>

      <Footer />
    </>
  );
}
