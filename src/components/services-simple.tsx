import { ArrowUpRight, MoveRightIcon, Settings } from "lucide-react";
import Link from "next/link";

export default function Services() {
  const SERVICES = [
    {
      name: "Service One",
      description: "A short description of the service being mentioned.",
      blob: "service-one",
    },
    {
      name: "Service Two",
      description: "A short description of the service being mentioned.",
      blob: "service-one",
    },
    {
      name: "Service Three",
      description: "A short description of the service being mentioned.",
      blob: "service-one",
    },
    {
      name: "Service Four",
      description: "A short description of the service being mentioned.",
      blob: "service-one",
    },
  ];

  return (
    <section
      className="py-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-8 md:gap-5"
      id="services"
    >
      {SERVICES.map((service) => (
        <div key={`${service.name + Math.random() * 4}`}>
          <Link href={service.blob} className="group">
            <div className="mb-3">
              <Settings size={80} className="mb-5" />
              <span className="flex flex-row items-center gap-1">
                <h3 className="text-2xl font-bold">{service.name}</h3>
                <ArrowUpRight className="opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100" />
              </span>

              <p>{service.description}</p>
            </div>
          </Link>
          <Link href={`/services/${service.blob}`} className="text-accent">
            Get an estimate
          </Link>
        </div>
      ))}
    </section>
  );
}
