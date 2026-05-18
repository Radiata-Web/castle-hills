import { ContactForm } from "@/components/forms/contact-form";
import ChooseUs from "@/components/misc/choose-us";
import Footer from "@/components/nav/footer";
import Image from "@/components/ui/optimized-image";


export default function Page() {
  return (
    <>
      <div className="max-w-8xl mx-auto px-4 md:px-8 lg:px-8 mb-12">
        <header className="space-y-4 mb-12 mt-12">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl xl:text-5xl/none">
            Request a Free Estimate
          </h1>
          <p className="text-zinc-600">
            Tell us about your project — our team will reach out within 24
            hours.
          </p>
        </header>

        <article className="flex flex-col rounded-lg md:flex-row items-center gap-4 shadow-lg border border-zinc-100 md:gap-10 lg:gap-14">
          <section className="w-full md:w-1/2 p-6 md:p-8 md:px-12">
            <ContactForm showHeader={false} />
          </section>
          {/* Service Image */}
          <figure className="max-h-[475px] w-full md:w-1/2 overflow-hidden items-center rounded-lg md:rounded-l-none md:rounded-r-lg">
            <Image
              src={`/photos/stain/stain-2.webp`}
              alt="Dark brown stained wooden fence in a residential backyard"
              width={1000}
              height={1000}
              className="min-w-full md:max-w-[250px]"
            />
          </figure>
        </article>

        <ChooseUs />
      </div>

      <Footer />
    </>
  );
}
