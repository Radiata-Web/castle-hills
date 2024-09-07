import { ALL_SERVICES } from "@/lib/data"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

interface ServiceProps {
  service: {
    title: string
    href: string
    image: string
  }
}

export default function ServicesCards() {
  return (
    <>
      {/* Map each service */}
      <article className="py-6 md:py-10 lg:py-14">
        <div className="space-y-4 mb-8">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl xl:text-5xl/none">
            What can we do for you?
          </h2>
          <p className="text-zinc-600">
            Our comprehensive services cover all your needs—whether it's giving
            your fence a fresh, protective stain, expertly installing a stunning
            gazebo, or rejuvenating your home's interior and exterior with
            professional painting. We use only top-quality materials to ensure
            your property not only looks amazing but also stands the test of
            time.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {ALL_SERVICES.map((service) => (
            <ServiceCard service={service} key={service.title} />
          ))}
        </div>
      </article>
    </>
  )
}

function ServiceCard(props: ServiceProps) {
  return (
    <Link
      href={`/services/${props.service.href}`}
      className="group"
      key={props.service.title}
    >
      {/* Image background element */}
      <div
        key={`${props.service.title + Math.random() * 4}`}
        className={`bg-cover bg-center rounded-lg`}
        style={{ backgroundImage: `url(${props.service.image})` }}
      >
        {/* Content container */}
        <div className="container py-20 text-white bg-black bg-opacity-40 transition-all duration-200 ease-in-out group-hover:bg-opacity-60 rounded-lg">
          {/* Content */}
          <span className="flex flex-row items-center gap-1">
            <h3 className="text-2xl font-bold">{props.service.title}</h3>
            <ArrowUpRight className="hidden sm:opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100" />
          </span>
        </div>
      </div>
    </Link>
  )
}
