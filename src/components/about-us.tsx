import React from "react";
import ContactNumber from "./misc/contactNumber";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { MoveRight, Phone } from "lucide-react";

export default function About() {
  return (
    <>
      <div className="absolute -translate-y-52" id="about"></div>
      <section className="max-w-8xl mx-auto py-6 md:py-10 lg:py-14 px-4 md:px-8 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 xl:grid-cols-2">
          {/* Google Maps embed */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d859115.2185226647!2d-97.62291295118169!3d32.74134616817178!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xacd9370584827891%3A0x2ef8c59ff7f32580!2sCastle%20Hills%20Stain%20%26%20Restoration!5e0!3m2!1sen!2sus!4v1725206080160!5m2!1sen!2sus"
            width="600"
            height="380"
            className="flex w-full border border-zinc-200 rounded-xl shadow-sm"
            loading="lazy"
          ></iframe>

          <div className="flex flex-col justify-center space-y-8">
            <span className="space-y-4">
              <h2 className="text-3xl font-bold sm:text-4xl xl:text-5xl/none">
                Design. Protect. Restore.
              </h2>
              <p className="text-zinc-600">
                At Castle Hills Stain & Restoration, we design, build, and
                restore residential and commercial properties across the DFW
                Metroplex with precision and pride. From luxury exteriors and
                custom wood structures to select interior restorations and fine
                finishes, our team delivers craftsmanship that enhances both the
                look and longevity of every property we touch.
              </p>
            </span>

            <div className="flex flex-col md:flex-row gap-4 pb-6">
              <Button
                className="transition-all duration-200 ease-in-out sm:hover:scale-105"
                asChild
              >
                <Link href="/about-us">
                  Learn more about us{" "}
                  <MoveRight className="ml-2" strokeWidth={1.5} />
                </Link>
              </Button>
              <Button
                variant="outline"
                className="transition-all duration-200 ease-in-out sm:hover:scale-105"
                asChild
              >
                <Link href="tel:4692153098">
                  Call Now
                  <Phone size={16} className="ml-2" strokeWidth={1.5} />
                </Link>
              </Button>
            </div>

            {/* Socials */}
            <div className="flex flex-row gap-4 sm:gap-6 md:gap-8">
              <Link href="https://maps.app.goo.gl/RteUFevUMNKuLVkv8">
                <Image
                  src="/gl-badge.png"
                  alt="Rate us on Google"
                  width={200}
                  height={100}
                  loading="lazy"
                />
              </Link>
              <Link href="https://www.facebook.com/CHPW903">
                <Image
                  src="/fb-badge.png"
                  alt="See us on Facebook"
                  width={200}
                  height={100}
                  loading="lazy"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
