import Image from "next/image"
import { Button } from "../ui/button"
import Link from "next/link"

interface ServiceDescProps {
  imagePosition: "left" | "right"
  image: string
  imageAlt: string
  header: string
  content: string
}

export default function ServiceDesc(props: ServiceDescProps) {
  return (
    <article
      className={`flex flex-col md:flex-row items-center gap-4 md:gap-10 lg:gap-14 ${
        props.imagePosition === "right" ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Service Image */}
      <figure className="max-h-[350px] w-full md:w-1/2 overflow-hidden items-center rounded-lg">
        <Image
          src={props.image}
          alt={props.imageAlt}
          width={500}
          height={500}
          className="aspect-square min-w-full object-cover md:max-w-[250px] object-right"
        />
      </figure>

      {/* Service Description */}
      <section className="w-full md:w-1/2 space-y-8">
        <span className="space-y-4">
          <h2 className="text-2xl font-bold sm:text-3xl xl:text-4xl/none mb-4">
            {props.header}
          </h2>
          <p className="text-zinc-600">{props.content}</p>
        </span>
        <Button size="lg" asChild>
          <Link href="#contact">Get an Estimate</Link>
        </Button>
      </section>
    </article>
  )
}
