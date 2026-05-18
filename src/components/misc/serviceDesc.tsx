import Image from "@/components/ui/optimized-image";
import { Button } from "../ui/button";
import { ctaPrimaryClassName } from "@/lib/cta";
import { Link } from "@tanstack/react-router";

interface ServiceDescProps {
  imagePosition: "left" | "right";
  image: string;
  imageAlt: string;
  header: string;
  content: string;
  /** Defaults to contact page; use `/#contact` only when embedded on the homepage. */
  estimateHref?: string;
}

export default function ServiceDesc(props: ServiceDescProps) {
  const estimateHref = props.estimateHref ?? "/contact-us";

  return (
    <article
      className={`flex flex-col rounded-lg md:flex-row items-center gap-4 md:gap-10 lg:gap-14 ${
        props.imagePosition === "right" ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Service Image */}
      <figure className="relative aspect-[4/3] w-full overflow-hidden rounded-lg shadow-md md:aspect-auto md:h-[min(475px,70vh)] md:w-1/2 md:max-h-[475px]">
        <Image
          src={`/photos/${props.image}.webp`}
          alt={props.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover bg-accent-light"
        />
      </figure>

      {/* Service Description */}
      <section className="w-full space-y-5 md:w-1/2 md:space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold sm:text-3xl xl:text-4xl/none mb-4">
            {props.header}
          </h2>
          <p className="text-zinc-600 max-w-[600px]">{props.content}</p>
        </div>
        <Button
          size="lg"
          className={ctaPrimaryClassName}
          render={<Link to={estimateHref} />}
          nativeButton={false}
        >
          Request a Free Estimate
        </Button>
      </section>
    </article>
  );
}
