import React from "react";
import ContactNumber from "./misc/contactNumber";
import Link from "next/link";
import Image from "next/image";

export default function About() {
  return (
    <>
      <div className="absolute -translate-y-52" id="about"></div>
      <section className="mb-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 xl:grid-cols-2">
          <div className="flex flex-col justify-center space-y-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl xl:text-5xl/none">
              Who are we?
            </h2>
            <p className="text-zinc-600">
              Serving the community since 2015, Castle Hills Stain & Restoration
              enables you to keep your property looking beautiful, without the
              stress of managing it yourself.
            </p>

            <span className="space-y-1 text-zinc-600">
              Give us a call:
              <ContactNumber
                iconSize={24}
                textSize="text-lg"
                className="pb-6"
              />
            </span>

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

          {/* Google Maps embed */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d859115.2185226647!2d-97.62291295118169!3d32.74134616817178!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xacd9370584827891%3A0x2ef8c59ff7f32580!2sCastle%20Hills%20Stain%20%26%20Restoration!5e0!3m2!1sen!2sus!4v1725206080160!5m2!1sen!2sus"
            width="600"
            height="380"
            className="flex w-full border-none rounded-xl"
            loading="lazy"
          ></iframe>
        </div>
      </section>
    </>
  );
}
