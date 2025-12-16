import Link from "next/link";
import Image from "next/image";
import { ContactForm } from "../forms/contact-form";
import ContactNumber from "@/components/misc/contactNumber";
export default function InteriorContact() {
  return (
    <div className="max-w-8xl mx-auto px-4 md:px-8 lg:px-8">
      <div className="absolute -translate-y-52" id="contact"></div>
      <section className="grid p-6 rounded-2xl shadow-md border border-zinc-300 gap-4 my-12 sm:p-8 md:p-10 lg:p-12 md:gap-10 lg:gap-14 lg:grid-cols-2">
        <div className="flex flex-col justify-center space-y-4 md:space-y-6 lg:space-y-8">
          <div className="max-w-[600px]">
            <p className="text-2xl font-bold tracking-tight md:text-3xl xl:text-4xl/none mb-4">
              Transform Your Space — Schedule a Consultation Today.
            </p>

            <p className="text-zinc-800">
              Tell us about your project — our team will reach out within 24
              hours.
            </p>
          </div>

          <div className="space-y-1 text-zinc-600">
            <p>Give us a call:</p>
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
