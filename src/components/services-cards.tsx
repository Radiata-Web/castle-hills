import { ALL_SERVICES } from "@/lib/data";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";

interface ServicesCardsProps {
  heading: string;
  paragraph?: string;
}

export interface Service {
  title: string;
  href: string;
  cardImg: string;
}

export default function ServicesCards({
  heading,
  paragraph,
}: ServicesCardsProps) {
  return (
    <>
      <div className="absolute -translate-y-52" id="services"></div>
      <article className="max-w-8xl mx-auto py-6 md:py-10 lg:py-14 px-4 md:px-8 lg:px-8">
        <div className="space-y-4 mb-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl xl:text-5xl/none">
            {heading}
          </h2>
          {paragraph && <p className="text-zinc-600">{paragraph}</p>}
        </div>
        <div className="grid gap-4 items-stretch justify-stretch grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {ALL_SERVICES.map((service: Service) => (
            <ServiceCard service={service} key={service.title} />
          ))}

          {/* Contact Us */}
          <div className={`group h-[225px] w-full md:col-span-2 lg:col-span-1`}>
            <div className="flex h-full border border-dashed border-accent rounded-lg transition-all duration-200 ease-out">
              <div className="flex flex-col items-center text-center md:items-center md:text-center lg:items-start lg:text-left justify-center p-10 gap-2 w-full">
                <h3 className="text-2xl font-bold leading-tight">
                  Not sure what you need?
                </h3>
                <p className="text-zinc-600 max-w-md">
                  We'll find the perfect solution to your needs.
                </p>

                <Button
                  className="transition-all duration-200 ease-in-out sm:hover:scale-105 w-fit mt-4"
                  asChild
                  variant="outline"
                >
                  <Link href="#contact">
                    Schedule a consultation
                    <MoveRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}

function ServiceCard({ service }: { service: Service }) {
  return (
    <Link href={service.href} className={`group h-[225px]`} key={service.title}>
      {/* Image background element */}
      <div
        key={`${service.title}-${service.href}`}
        className={`flex h-full bg-cover bg-center rounded-xl`}
        style={{ backgroundImage: `url(/photos${service.cardImg}.webp)` }}
      >
        {/* Content container */}
        <div className="flex w-full items-center p-10 text-white bg-black bg-opacity-40 transition-all duration-200 ease-in-out group-hover:bg-opacity-60 rounded-xl">
          {/* Content */}
          <h3 className="text-3xl font-bold leading-tight">{service.title}</h3>
        </div>
      </div>
    </Link>
  );
}
