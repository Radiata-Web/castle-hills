import { ContactForm } from "@/components/forms/contact-form";
import ChooseUs from "@/components/misc/choose-us";
import { Hero } from "@/components/misc/hero";
import Footer from "@/components/nav/footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Hammer, Paintbrush, Pencil, Search } from "lucide-react";
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
      <div className="max-w-8xl mx-auto px-4 md:px-8 lg:px-8 mb-12 mt-12">
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
          <Card className="border-none shadow-none">
            <CardHeader className="text-2xl font-bold tracking-tight sm:text-3xl">
              Custom Wood Structures & Outdoor Design
            </CardHeader>

            <CardContent>
              Custom pergolas, patio covers, fences, and outdoor kitchens built
              with precision and premium materials.
            </CardContent>
          </Card>

          <Card className="border-none shadow-none">
            <CardHeader className="text-2xl font-bold tracking-tight sm:text-3xl">
              Luxury Finishes & Coatings
            </CardHeader>

            <CardContent>
              High-performance painting and limewash systems using
              Sherwin-Williams Emerald&reg;, Sherwin-Williams Duration&reg; and
              Romabio Classico Limewash&reg;.
            </CardContent>
          </Card>

          <Card className="border-none shadow-none">
            <CardHeader className="text-2xl font-bold tracking-tight sm:text-3xl">
              Interior & Exterior Restoration
            </CardHeader>

            <CardContent>
              Restoration and rebuild services combining craftsmanship, design,
              and structural care.
            </CardContent>
          </Card>
        </section>

        {/* <article className="flex flex-col rounded-lg md:flex-row items-center gap-4 shadow-lg border border-zinc-100 md:gap-10 lg:gap-14">
          <section className="w-full md:w-1/2 p-6 md:p-8 md:px-12">
            <ContactForm showHeader={false} />
          </section>
          <figure className="max-h-[475px] w-full md:w-1/2 overflow-hidden items-center rounded-lg md:rounded-l-none md:rounded-r-lg">
            <Image
              src={`/photos/stain/stain-2.webp`}
              alt="Dark brown stained wooden fence in a residential backyard"
              width={1000}
              height={1000}
              className="min-w-full md:max-w-[250px]"
            />
          </figure>
        </article> */}

        <section className="flex flex-col gap-4 md:gap-8 py-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Our Process
          </h2>

          <ul className="grid items-stretch grid-flow-row gap-6 px-4">
            <li className="list-none pb-4 flex items-center gap-9 md:gap-11 border-b">
              <span className="text-6xl font-bold text-accent/80">1.</span>
              <div className="flex flex-col">
                <h3 className="text-2xl font-semibold mb-2 flex items-center gap-2">
                  Consultation{" "}
                  <Search className="inline opacity-50" size={18} />
                </h3>
                <p className="leading-relaxed text-muted-foreground">
                  We meet on-site to understand your goals, evaluate your
                  property, and provide recommendations.
                </p>
              </div>
            </li>

            <li className="list-none pb-4 flex items-center gap-6 md:gap-8 border-b">
              <span className="text-6xl font-bold text-accent/80">2.</span>
              <div className="flex flex-col">
                <h3 className="text-2xl font-semibold mb-2 flex items-center gap-2">
                  Design <Pencil className="inline opacity-50" size={18} />
                </h3>
                <p className="leading-relaxed text-muted-foreground">
                  Our design team refines your vision with detailed drawings and
                  renderings.
                </p>
              </div>
            </li>

            <li className="list-none pb-4 flex items-center gap-6 md:gap-8 border-b">
              <span className="text-6xl font-bold text-accent/80">3.</span>
              <div className="flex flex-col">
                <h3 className="text-2xl font-semibold mb-2 flex items-center gap-2">
                  Build <Hammer className="inline opacity-50" size={18} />
                </h3>
                <p className="leading-relaxed text-muted-foreground">
                  Our in-house craftsmen execute every project with supervision,
                  precision, and care.
                </p>
              </div>
            </li>

            <li className="list-none pb-4 flex items-center gap-6 md:gap-8">
              <span className="text-6xl font-bold text-accent/80">4.</span>
              <div className="flex flex-col">
                <h3 className="text-2xl font-semibold mb-2 flex items-center gap-2">
                  Maintain{" "}
                  <Paintbrush className="inline opacity-50" size={18} />
                </h3>
                <p className="leading-relaxed text-muted-foreground">
                  Follow-up services, maintenance, and protection plans keep
                  your investment looking exceptional.
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
