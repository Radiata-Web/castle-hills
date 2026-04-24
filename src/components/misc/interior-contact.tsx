import Link from "next/link";
import Image from "next/image";
import { ContactForm } from "../forms/contact-form";
import ContactNumber from "@/components/misc/contactNumber";
export default function InteriorContact() {
  return (
    <div className="max-w-8xl mx-auto px-4 md:px-8 lg:px-8">
      <div className="absolute -translate-y-52" id="contact"></div>
      <section className="grid gap-4 my-12 rounded-2xl border border-zinc-200/90 bg-gradient-to-br from-white via-accent-light/15 to-zinc-50/80 p-6 shadow-md sm:p-8 md:gap-10 md:p-10 lg:grid-cols-2 lg:gap-14 lg:p-12">
        <div className="flex flex-col justify-center space-y-4 md:space-y-6 lg:space-y-8">
          <div className="max-w-[600px]">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent mb-2">
              Next step
            </p>
            <p className="text-2xl font-bold tracking-tight md:text-3xl xl:text-4xl/none mb-4">
              Transform Your Space — Get a Free Estimate Today.
            </p>

            <p className="text-zinc-800">
              Tell us about your project — our team will reach out within 24
              hours.
            </p>
          </div>

          <div className="space-y-1 text-zinc-600">
            <p>Call Now:</p>
            <ContactNumber
              iconSize={24}
              textSize="text-lg"
              className="text-zinc-900"
            />
          </div>

          {/* Socials */}
          <div className="flex flex-row gap-4 sm:gap-6 md:gap-8">
            <Link href="https://maps.app.goo.gl/RteUFevUMNKuLVkv8">
              <Image
                src="/gl-badge.png"
                alt="Rate us on Google"
                width={200}
                height={100}
              />
            </Link>
            <Link href="https://www.facebook.com/CHPW903">
              <Image
                src="/fb-badge.png"
                alt="See us on Facebook"
                width={200}
                height={100}
              />
            </Link>
          </div>
        </div>
        <div>
          <ContactForm showHeader={false} />
        </div>
      </section>
    </div>
  );
}
