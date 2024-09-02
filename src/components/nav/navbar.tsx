"use client";

import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  useState,
} from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import NavBanner from "@/components/nav/nav-banner";
import Logo from "@/components/nav/logo";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  FENCING_SERVICES,
  PAGES,
  PAINTING_SERVICES,
  OUTDOOR_LIVING_SERVICES,
} from "@/lib/data";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Automatically populates desktop menus, remember to manually populate mobile menu at the bottom

  return (
    <nav className="sticky top-0 z-10 bg-background shadow-md">
      {/* Optional top banner for socials, a service area blurb, and a phone number */}
      <NavBanner />

      {/* Navbar */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex flex-row">
            {/* Logo and text */}
            <Logo />

            {/* Desktop navigation */}
            <NavigationMenu>
              <NavigationMenuList className="hidden lg:flex ml-4">
                {/* Single pages */}
                {PAGES.map((page) => (
                  <NavigationMenuItem key={page.title}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={page.href}
                        className={navigationMenuTriggerStyle()}
                      >
                        {page.title}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}

                {/* Fences and Gates */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Fences & Gates</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <p className="pl-7 pt-5 font-bold">
                      Fence and Gate Services
                    </p>
                    <ul className="grid w-[400px] gap-3 p-4 md:grid-cols-2 md:w-[500px] lg:w-[600px]">
                      {FENCING_SERVICES.map((service) => (
                        <ListItem
                          key={service.title}
                          title={service.title}
                          href={`/services/${service.href}`}
                        />
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Outdoor Living */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Outdoor Living</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <p className="pl-7 pt-5 font-bold">
                      Outdoor Living Services
                    </p>
                    <ul className="grid w-[400px] gap-3 p-4 md:grid-cols-2 md:w-[500px] lg:w-[600px]">
                      {OUTDOOR_LIVING_SERVICES.map((service) => (
                        <ListItem
                          key={service.title}
                          title={service.title}
                          href={`/services/${service.href}`}
                        />
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Painting */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Painting</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <p className="pl-7 pt-5 font-bold">Painting Services</p>
                    <ul className="grid w-[400px] gap-3 p-4 md:grid-cols-2 md:w-[500px] lg:w-[600px]">
                      {PAINTING_SERVICES.map((service) => (
                        <ListItem
                          key={service.title}
                          title={service.title}
                          href={`/services/${service.href}`}
                        />
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Contact Me button */}
          <div className="hidden lg:block">
            <Button className="transition-all duration-200 ease-in-out sm:hover:scale-105">
              Get my free estimate
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="w-10 h-10 p-2">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <Image
                  src="/ch-logo.svg"
                  width={100}
                  height={100}
                  alt="Castle Hills Stain & Restoration Logo"
                />
                <p className="text-xl font-bold mt-5">
                  Castle Hills <br /> Stain & Restoration
                </p>
                <hr className="mt-6" />

                <nav className="flex flex-col gap-4 mt-6">
                  <Link
                    href="/"
                    className="text-xl font-semibold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    href="/#about"
                    className="text-xl font-semibold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    About
                  </Link>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-xl font-semibold">Fences & Gates</h2>
                    {FENCING_SERVICES.map((service) => (
                      <Link
                        key={service.title}
                        href={`/services/${service.href}`}
                        className="ml-4 text-zinc-700 hover:underline"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {service.title}
                      </Link>
                    ))}

                    <h2 className="text-xl font-semibold">Outdoor Living</h2>
                    {OUTDOOR_LIVING_SERVICES.map((service) => (
                      <Link
                        key={service.title}
                        href={`/services/${service.href}`}
                        className="ml-4 text-zinc-700 hover:underline"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {service.title}
                      </Link>
                    ))}

                    <h2 className="text-xl font-semibold">Painting</h2>
                    {PAINTING_SERVICES.map((service) => (
                      <Link
                        key={service.title}
                        href={`/services/${service.href}`}
                        className="ml-4 text-zinc-700 hover:underline"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {service.title}
                      </Link>
                    ))}
                  </div>
                </nav>
                <Button className="mt-[15%] w-full">
                  Get your free estimate
                </Button>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}

const ListItem = forwardRef<ElementRef<"a">, ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-zinc-100 hover:text-accent-foreground focus:bg-zinc-100 focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";
