import Image from "next/image"

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
      className={`flex flex-col md:flex-row items-center gap-4 ${
        props.imagePosition === "right" ? "md:flex-row-reverse" : ""
      }`}
    >
      <figure className="w-full md:w-1/2">
        <Image
          src={props.image}
          alt={props.imageAlt}
          width={500}
          height={500}
          layout="responsive"
          className="rounded-lg w-full object-cover md:max-w-[300px]"
        />
      </figure>
      <div className="w-full md:w-1/2">
        <h2 className="text-2xl font-bold sm:text-3xl xl:text-4xl/none mb-4">
          {props.header}
        </h2>
        <p className="text-zinc-800">{props.content}</p>
      </div>
    </article>
  )
}
