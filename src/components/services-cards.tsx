import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function ServicesCards() {
  const SERVICES: {
    title: string;
    services: { title: string; href: string; image: string }[];
  }[] = [
    {
      title: "Staining Services",
      services: [
        {
          title: "Fence Staining",
          href: "fence-staining",
          image: "/fence.jpg",
        },
        {
          title: "Patio Cover Staining",
          href: "patio-cover-staining",
          image: "/fence.jpg",
        },
        {
          title: "Pergola Staining",
          href: "pergola-staining",
          image: "/fence.jpg",
        },
      ],
    },
    {
      title: "Installation Services",
      services: [
        {
          title: "Fence Installation",
          href: "fence-installation",
          image: "/fence.jpg",
        },
        {
          title: "Patio Cover Installation",
          href: "patio-cover-installation",
          image: "/fence.jpg",
        },
        {
          title: "Pergola Installation",
          href: "pergola-installation",
          image: "/fence.jpg",
        },
      ],
    },
    {
      title: "Painting Services",
      services: [
        {
          title: "Interior Painting",
          href: "interior-painting",
          image: "/fence.jpg",
        },
        {
          title: "Exterior Painting",
          href: "exterior-painting",
          image: "/fence.jpg",
        },
      ],
    },
  ];
  // const SERVICES = [
  //   {
  //     title: "Staining Services",
  //     services: [
  //       {
  //         name: "Fence Staining",
  //         blob: "service-one",
  //         image: "/fence.jpg",
  //       },
  //       {
  //         name: "Patio Cover Staining",
  //         blob: "service-two",
  //         image: "/fence.jpg",
  //       },
  //       {
  //         name: "Pergola Staining",
  //         blob: "service-two",
  //         image: "/fence.jpg",
  //       },
  //     ],
  //   },

  //   {
  //     title: "Installation Services",
  //     services: [
  //       {
  //         name: "Fence Installation",
  //         blob: "service-three",
  //         image: "/fence.jpg",
  //       },
  //       {
  //         name: "Patio Cover Installation",
  //         blob: "service-four",
  //         image: "/fence.jpg",
  //       },
  //       {
  //         name: "Pergola Installation",
  //         blob: "service-four",
  //         image: "/fence.jpg",
  //       },
  //     ],
  //   },

  //   {
  //     title: "Painting Services",
  //     services: [
  //       {
  //         name: "Exterior Painting",
  //         blob: "service-three",
  //         image: "/fence.jpg",
  //       },
  //       {
  //         name: "Interior Painting",
  //         blob: "service-four",
  //         image: "/fence.jpg",
  //       },
  //     ],
  //   },
  // ];

  return (
    <>
      <div className="absolute -translate-y-52" id="services"></div>
      <section className="py-10" id="servicesCards">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl xl:text-5xl/none">
          Services We Offer
        </h2>
        {/* Map each category */}
        {SERVICES.map((category) => (
          <article className="py-4" key={category.title}>
            <h3 className="text-2xl font-semibold mb-2">{category.title}</h3>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {/* Map each service within each category */}
              {category.services.map((service) => (
                <Link
                  href={`/services/${service.href}`}
                  className="group"
                  key={service.title}
                >
                  {/* Image background element */}
                  <div
                    key={`${service.title + Math.random() * 4}`}
                    className={`bg-[url("/fence.jpg")] bg-cover bg-center rounded-lg`}
                  >
                    {/* Content container */}
                    <div className="container py-20 text-white bg-black bg-opacity-40 transition-all duration-200 ease-in-out group-hover:bg-opacity-60 rounded-lg">
                      {/* Content */}
                      <span className="flex flex-row items-center gap-1">
                        <h3 className="text-2xl font-bold">{service.title}</h3>
                        <ArrowUpRight className="hidden sm:opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
