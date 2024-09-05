import { ContactForm } from "../forms/contact-form"

export default function InteriorContact() {
  return (
    <section className="p-8 rounded-lg grid gap-4 shadow-xl border border-zinc-200 lg:grid-cols-2 my-8">
      <div>
        <h2 className="text-2xl font-bold sm:text-3xl xl:text-4xl/none mb-4">
          Request a Free Estimate
        </h2>
        <p className="text-zinc-800">
          Castle Hills Stain & Restoration is dedicated to bringing your
          property dreams to life!
        </p>
      </div>
      <div>
        <ContactForm showHeader={false} />
      </div>
    </section>
  )
}
