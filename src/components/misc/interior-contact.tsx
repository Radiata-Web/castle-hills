import Link from "next/link"
import Image from "next/image"
import { ContactForm } from "../forms/contact-form"
import ContactNumber from "@/components/misc/contactNumber"
export default function InteriorContact() {
  return (
    <>
      <div className="absolute -translate-y-52" id="contact"></div>
      <section className="grid p-6 rounded-lg shadow-lg border border-zinc-200 gap-4 my-12 sm:p-8 md:p-10 lg:p-12 md:gap-10 lg:gap-14 lg:grid-cols-2">
        <div className="flex flex-col space-y-4 md:space-y-6 lg:space-y-8">
          <div className="max-w-[600px]">
            <p className="text-3xl font-bold tracking-tighter md:text-4xl xl:text-5xl/none mb-4">
              Request a free estimate from us today!
            </p>

            <p className="text-zinc-800">
              Castle Hills Stain & Restoration is dedicated to bringing your
              property dreams to life! Give us a call or fill out the form and
              we will get back to you ASAP!
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
    </>
  )
}
