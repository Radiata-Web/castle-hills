import { ContactForm } from "@/components/forms/contact-form";
import ChooseUs from "@/components/misc/choose-us";
import { Hero } from "@/components/misc/hero";
import Footer from "@/components/nav/footer";
import { ServiceCard } from "@/components/service-card";
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
  const services = [
    {
      id: 1,
      icon: <Fence size={48} strokeWidth={1.25} />,
      title: "Custom Wood Structures & Outdoor Design",
      description:
        "Custom pergolas, patio covers, fences, and outdoor kitchens built with precision and premium materials.",
      href: "/services/digital-strategy",
      imageSrc:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
      imageAlt: "Digital strategy workspace with charts and analytics",
    },
    {
      id: 2,
      icon: <PaintBucket size={48} strokeWidth={1.25} />,
      title: "Luxury Finishes & Coatings",
      description:
        "High-performance painting and limewash systems using Sherwin-Williams Emerald®, Sherwin-Williams Duration® and Romabio Classico Limewash®.",
      href: "/services/brand-development",
      imageSrc:
        "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800",
      imageAlt: "Creative brand design workspace",
    },
    {
      id: 3,
      icon: <Hammer size={48} strokeWidth={1.25} />,
      title: "Interior & Exterior Restoration",
      description:
        "Restoration and rebuild services combining craftsmanship, design, and structural care.",
      href: "/services/growth-marketing",
      imageSrc:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
      imageAlt: "Marketing analytics dashboard",
    },
  ];

  return (
    <>
      <Hero
        title="Our Expertise"
        subtitle="Our team of experts is here to help you with any home improvement project."
        backgroundImageUrl="/photos/stain/stain-2.webp"
      />

      {/* <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))}
        </div>
      </section> */}

      <div className="max-w-8xl mx-auto px-4 md:px-8 lg:px-8 mb-12 mt-12">
        <section className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
          <Card className="border-none shadow-none">
            <CardHeader className="text-2xl font-bold sm:text-3xl">
              <span className="flex justify-center items-center bg-accent w-16 h-16 rounded-lg mb-4">
                <Fence size={36} className="text-white" strokeWidth={1} />
              </span>
              Custom Wood Structures <br /> & Outdoor Design
            </CardHeader>

            <CardContent>
              Custom pergolas, patio covers, fences, and outdoor kitchens built
              with precision and premium materials.
            </CardContent>
          </Card>

          <Card className="border-none shadow-none">
            <CardHeader className="text-2xl font-bold sm:text-3xl">
              <span className="flex justify-center items-center bg-accent w-16 h-16 rounded-lg mb-4">
                <PaintBucket size={36} className="text-white" strokeWidth={1} />
              </span>
              Luxury Finishes <br /> & Coatings
            </CardHeader>

            <CardContent>
              High-performance painting and limewash systems using
              Sherwin-Williams Emerald&reg;, Sherwin-Williams Duration&reg; and
              Romabio Classico Limewash&reg;.
            </CardContent>
          </Card>

          <Card className="border-none shadow-none">
            <CardHeader className="text-2xl font-bold sm:text-3xl">
              <span className="flex justify-center items-center bg-accent w-16 h-16 rounded-lg mb-4">
                <Hammer size={36} className="text-white" strokeWidth={1} />
              </span>
              Interior & Exterior <br /> Restoration
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
