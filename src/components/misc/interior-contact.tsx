import { ContactForm } from "../forms/contact-form"
import ContactNumber from "@/components/misc/contactNumber"
export default function InteriorContact() {
  return (
    <>
      <div className="absolute -translate-y-52" id="contact"></div>
      <section className="grid p-6 rounded-lg shadow-xl border border-zinc-200 gap-4 md:gap-10 lg:gap-14 lg:grid-cols-2 mt-20">
        <div>
          <p className="text-2xl font-bold sm:text-3xl xl:text-4xl/none mb-4">
            Get your free estimate today!
          </p>
          <p className="text-zinc-800">
            Castle Hills Stain & Restoration is dedicated to bringing your
            property dreams to life!
          </p>
          <span className="mt-8 text-sm">
            Give us a call:
            <ContactNumber iconSize={25} textSize="text-xl" className="mt-2" />
          </span>
        </div>
        <div>
          <ContactForm showHeader={false} />
        </div>
      </section>
    </>
  )
}
