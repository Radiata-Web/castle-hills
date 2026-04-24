import React from "react";
import Image from "next/image";

export default function CertificationBanner() {
  return (
    <section className="max-w-8xl mx-auto py-6 md:py-10 lg:py-14 px-4 md:px-8 lg:px-8">
      <div className="rounded-2xl border border-zinc-200/90 bg-gradient-to-br from-accent-light/25 via-white to-zinc-50/90 px-6 py-10 shadow-sm sm:px-10 md:py-12">
        <div className="mb-8 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent mb-2">
            Trust & training
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl xl:text-5xl/none mb-4">
            Certified for Excellence
          </h2>
          <p className="text-zinc-600 text-lg leading-relaxed">
            Professional certifications and advanced training back our
            craftsmanship. We&apos;re PCA certified and carry a proud BBB A+
            rating—so you know the work meets serious standards.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 sm:gap-6 md:gap-8 w-full items-center">
          <div className="justify-self-center md:justify-self-start">
            <Image
              src="/logos/bbb-rating.jpg"
              alt="BBB A+ Rating"
              width={300}
              height={200}
              className="h-auto"
            />
          </div>
          <div className="justify-self-center md:justify-self-center">
            <Image
              src="/logos/pca-contractor.png"
              alt="Painting contractors association - accredited contractor"
              width={100}
              height={100}
              className="h-auto"
            />
          </div>
          <div className="justify-self-center md:justify-self-end">
            <Image
              src="/logos/afa.png"
              alt="ABC Accredited Company"
              width={300}
              height={100}
              className="h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
