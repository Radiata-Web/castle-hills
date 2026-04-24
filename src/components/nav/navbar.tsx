"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import NavBanner from "@/components/nav/nav-banner";
import Logo from "@/components/nav/logo";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { PAGES, HOMEPAGE_FEATURED_SERVICES } from "@/lib/data";
import Socials from "@/components/ui/socials";
import DropdownCategory from "@/components/nav/dropdown-category";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-10 bg-background shadow-md">
      <NavBanner />

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo />

          <div className="hidden lg:flex ml-6 items-center gap-1">
            {PAGES.map((page) => (
              <Link
                key={page.title}
                href={page.href}
                className={navigationMenuTriggerStyle()}
              >
                {page.title}
              </Link>
            ))}

            <DropdownMenu>
              <DropdownMenuTrigger
                className={cn(
                  navigationMenuTriggerStyle(),
                  "group gap-0 border-0 bg-transparent font-medium shadow-none data-[state=open]:shadow-none",
                )}
              >
                Services
                <ChevronDown
                  className="relative top-[1px] ml-1 h-3 w-3 opacity-60 transition duration-200 group-data-[state=open]:rotate-180"
                  aria-hidden
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="min-w-[14rem]">
                {HOMEPAGE_FEATURED_SERVICES.map((service) => (
                  <DropdownMenuItem key={service.href} asChild>
                    <Link href={service.href}>{service.title}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="hidden lg:block">
            <Button
              className="transition-all duration-200 ease-in-out sm:hover:scale-105"
              asChild
            >
              <Link href="/contact-us">
                Get a Free Estimate{" "}
                <MoveRight className="ml-2" strokeWidth={1.5} />
              </Link>
            </Button>
          </div>

          <div className="lg:hidden">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetDescription>
                <VisuallyHidden.Root>Navigation Menu</VisuallyHidden.Root>
              </SheetDescription>

              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="w-10 h-10 p-2">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetTitle>
                  <VisuallyHidden.Root>Navigation Links</VisuallyHidden.Root>
                </SheetTitle>
                <Logo />
                <hr className="mt-6" />

                <nav className="flex flex-col gap-2 mt-6">
                  <Button
                    variant="ghost"
                    className="w-full justify-start font-semibold text-xl"
                    onClick={() => setIsMenuOpen(false)}
                    asChild
                  >
                    <Link
                      href="/"
                      className="block rounded-lg px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Home
                    </Link>
                  </Button>

                  <Button
                    variant="ghost"
                    className="w-full justify-start font-semibold text-xl"
                    onClick={() => setIsMenuOpen(false)}
                    asChild
                  >
                    <Link
                      href="/about-us"
                      className="block rounded-lg px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      About Us
                    </Link>
                  </Button>

                  <Button
                    variant="ghost"
                    className="w-full justify-start font-semibold text-xl"
                    onClick={() => setIsMenuOpen(false)}
                    asChild
                  >
                    <Link
                      href="/our-expertise"
                      className="block rounded-lg px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Our Expertise
                    </Link>
                  </Button>

                  <div className="flex flex-col gap-2">
                    <DropdownCategory
                      categoryTitle="Our Services"
                      links={HOMEPAGE_FEATURED_SERVICES}
                      setIsMenuOpen={setIsMenuOpen}
                    />
                  </div>
                </nav>

                <Button className="mt-[8%] w-full" size="lg" asChild>
                  <Link href="/contact-us" onClick={() => setIsMenuOpen(false)}>
                    Get a Free Estimate
                    <MoveRight className="ml-2" strokeWidth={1.5} />
                  </Link>
                </Button>

                <hr className="my-6" />

                <Socials />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
