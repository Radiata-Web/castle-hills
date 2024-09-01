import { ArrowUpRight, MoveRightIcon, Settings } from "lucide-react";
import Link from "next/link";

export default function ServicesCards() {
  const SERVICES = [
    {
      title: "Service Section 1",
      services: [
        {
          name: "Example Service 1",
          description: "A short description of the service being mentioned.",
          blob: "service-one",
          image: "/fence.jpg",
        },
        {
          name: "Example Service 2",
          description: "A short description of the service being mentioned.",
          blob: "service-two",
          image: "/fence.jpg",
        },
        {
          name: "Example Service 3",
          description: "A short description of the service being mentioned.",
          blob: "service-two",
          image: "/fence.jpg",
        },
      ],
    },

    {
      title: "Service Section 2",
      services: [
        {
          name: "Example Service 4",
          description: "A short description of the service being mentioned.",
          blob: "service-three",
          image: "/fence.jpg",
        },
        {
          name: "Example Service 5",
          description: "A short description of the service being mentioned.",
          blob: "service-four",
          image: "/fence.jpg",
        },
      ],
    },
  ];

  // sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 md:gap-5

  return (
    <section className="py-10" id="servicesCards">
      <h2 className="text-4xl font-bold mb-5">Our Services</h2>
      {/* Map each category */}
      {SERVICES.map((category) => (
        <article className="py-4" key={category.title}>
          <h3 className="text-2xl font-semibold mb-2">{category.title}</h3>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Map each service within each category */}
            {category.services.map((service) => (
              <Link
                href={`/services/${service.blob}`}
                className="group"
                key={service.name}
              >
                {/* Image background element */}
                <div
                  key={`${service.name + Math.random() * 4}`}
                  className={`bg-[url("/fence.jpg")] bg-cover bg-center`}
                >
                  {/* Content container */}
                  <div className="container py-20 text-white bg-black bg-opacity-40 transition-all duration-200 ease-in-out group-hover:bg-opacity-60">
                    {/* Content */}
                    <span className="flex flex-row items-center gap-1">
                      <h3 className="text-2xl font-bold">{service.name}</h3>
                      <ArrowUpRight className="sm:opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </article>
      ))}
    </section>
  );
}
