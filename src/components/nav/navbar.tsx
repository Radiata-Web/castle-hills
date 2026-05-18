"use client";

import { useState } from "react";
import { Link } from "@tanstack/react-router";
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
import { ctaPrimaryClassName } from "@/lib/cta";
import { cn } from "@/lib/utils";
import { PAGES, HOMEPAGE_FEATURED_SERVICES } from "@/lib/data";
import Socials from "@/components/ui/socials";
import DropdownCategory from "@/components/nav/dropdown-category";

const mobileNavLinkClass =
  "flex min-h-12 w-full items-center rounded-lg px-4 py-3 text-lg font-semibold leading-snug text-foreground transition-colors hover:bg-zinc-100 hover:text-zinc-900";

function MobileNavLink({
  to,
  children,
  onNavigate,
}: {
  to: string;
  children: React.ReactNode;
  onNavigate: () => void;
}) {
  return (
    <Link to={to} className={mobileNavLinkClass} onClick={onNavigate}>
      {children}
    </Link>
  );
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

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
                to={page.href}
                className={navigationMenuTriggerStyle()}
              >
                {page.title}
              </Link>
            ))}

            <DropdownMenu>
              <DropdownMenuTrigger
                className={cn(
                  navigationMenuTriggerStyle(),
                  "group gap-0 border-0 bg-transparent font-medium shadow-none data-popup-open:shadow-none",
                )}
              >
                Services
                <ChevronDown
                  className="relative top-px ml-1 size-3 opacity-60 transition duration-200 group-data-popup-open:rotate-180"
                  aria-hidden
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="min-w-56">
                {HOMEPAGE_FEATURED_SERVICES.map((service) => (
                  <DropdownMenuItem
                    key={service.href}
                    render={<Link to={service.href} />}
                  >
                    {service.title}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="hidden lg:block">
            <Button
              size="lg"
              className={ctaPrimaryClassName}
              render={<Link to="/contact-us" />}
              nativeButton={false}
            >
              Get a Free Estimate{" "}
              <MoveRight className="ml-2" strokeWidth={1.5} />
            </Button>
          </div>

          <div className="lg:hidden">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetDescription className="sr-only">
                Navigation Menu
              </SheetDescription>

              <SheetTrigger
                render={
                  <Button variant="ghost" size="icon" className="size-11" />
                }
              >
                <Menu className="size-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-[min(100vw-2rem,400px)] gap-0 sm:w-[400px]"
              >
                <SheetTitle className="sr-only">Navigation Links</SheetTitle>

                <div className="pr-12">
                  <Logo />
                </div>

                <hr className="my-8 border-zinc-200" />

                <nav className="flex flex-col gap-2">
                  <MobileNavLink to="/" onNavigate={closeMenu}>
                    Home
                  </MobileNavLink>
                  <MobileNavLink to="/about-us" onNavigate={closeMenu}>
                    About Us
                  </MobileNavLink>
                  <MobileNavLink to="/our-expertise" onNavigate={closeMenu}>
                    Our Expertise
                  </MobileNavLink>

                  <div className="pt-1">
                    <DropdownCategory
                      categoryTitle="Our Services"
                      links={HOMEPAGE_FEATURED_SERVICES}
                      setIsMenuOpen={setIsMenuOpen}
                    />
                  </div>
                </nav>

                <Button
                  className={cn(ctaPrimaryClassName, "mt-8 w-full")}
                  size="lg"
                  render={
                    <Link
                      to="/contact-us"
                      className="flex w-full items-center justify-center gap-2"
                      onClick={closeMenu}
                    />
                  }
                  nativeButton={false}
                >
                  Get a Free Estimate
                  <MoveRight className="size-5" strokeWidth={1.5} />
                </Button>

                <hr className="my-8 border-zinc-200" />

                <div className="pt-1">
                  <Socials />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
