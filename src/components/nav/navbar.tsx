"use client"

import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  useState,
} from "react"
import Link from "next/link"
import { Menu, MoveRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import NavBanner from "@/components/nav/nav-banner"
import Logo from "@/components/nav/logo"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import {
  FENCING_SERVICES,
  PAGES,
  PAINTING_SERVICES,
  OUTDOOR_LIVING_SERVICES,
} from "@/lib/data"
import Socials from "@/components/ui/socials"
import DropdownCategory from "@/components/nav/dropdown-category"
import * as VisuallyHidden from "@radix-ui/react-visually-hidden"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleMenuOpen = (isOpen: boolean) => {
    setIsMenuOpen(isOpen)
  }

  // Automatically populates desktop menus, remember to manually populate mobile menu at the bottom

  return (
    <nav className="sticky top-0 z-10 bg-background shadow-md">
      {/* Optional top banner for socials, a service area blurb, and a phone number */}
      <NavBanner />

      {/* Navbar */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and text */}
          <Logo />

          {/* Desktop navigation */}
          <NavigationMenu>
            <NavigationMenuList className="hidden lg:flex ml-6">
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
                  <p className="pl-7 pt-5 font-bold">Fence and Gate Services</p>
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
                  <p className="pl-7 pt-5 font-bold">Outdoor Living Services</p>
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

          {/* Contact Me button */}
          <div className="hidden lg:block">
            <Button className="transition-all duration-200 ease-in-out sm:hover:scale-105">
              Get my free estimate
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              {/* Screen reader title */}
              <SheetDescription>
                <VisuallyHidden.Root>Navigation Menu</VisuallyHidden.Root>
              </SheetDescription>

              {/* Hamburger */}
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="w-10 h-10 p-2">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>

              {/* Sheet content */}
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetTitle>
                  <VisuallyHidden.Root>Navigation Links</VisuallyHidden.Root>
                </SheetTitle>
                <span className="flex flex-col items-start gap-4 mt-4">
                  {/* Logo */}
                  <span className="flex flex-row items-center gap-4">
                    <img
                      src="/ch-logo.svg"
                      width={72}
                      alt="Castle Hills Stain & Restoration Logo"
                    />
                    <p className="font-bold leading-none">
                      Castle Hills <br />
                      Stain & Restoration
                    </p>
                  </span>
                </span>
                <hr className="mt-6" />

                {/* Nav links */}
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
                      href="/#about"
                      className="block rounded-lg px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      About
                    </Link>
                  </Button>

                  <div className="flex flex-col gap-2">
                    <DropdownCategory
                      categoryTitle="Fences & Gates"
                      links={FENCING_SERVICES}
                      setIsMenuOpen={setIsMenuOpen}
                    />

                    <DropdownCategory
                      categoryTitle="Outdoor Living"
                      links={OUTDOOR_LIVING_SERVICES}
                      setIsMenuOpen={setIsMenuOpen}
                    />

                    <DropdownCategory
                      categoryTitle="Painting"
                      links={PAINTING_SERVICES}
                      setIsMenuOpen={setIsMenuOpen}
                    />
                  </div>
                </nav>

                {/* Estimate button */}
                <Button className="mt-[8%] w-full" size="lg" asChild>
                  <Link href="#contact" onClick={() => setIsMenuOpen(false)}>
                    Get your estimate
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
  )
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
    )
  }
)
ListItem.displayName = "ListItem"
