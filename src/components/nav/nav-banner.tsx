import Socials from "@/components/ui/socials"
import { MapPin, Phone } from "lucide-react"

export default function NavBanner() {
  return (
    <div className="bg-background border-b md:block">
      <div className="max-w-8xl mx-auto flex items-center justify-between h-14 px-4 sm:px-6 lg:px-8">
        <Socials />

        <div className="flex flex-row text-sm">
          {/* Service area */}
          <div className="flex-row items-center gap-1 pr-5 border-r-2 border-r-accent-light hidden sm:flex">
            <MapPin size={15} />
            {/* Link to Google Maps page */}
            <a href="https://maps.app.goo.gl/MNGT76dBbYbfbzRK8">
              Serving the DFW Metroplex.
            </a>
          </div>

          {/* Contact phone number */}
          <span className="flex flex-row items-center gap-1 pl-5">
            <Phone size={15} />
            <a
              href="tel:4692153098"
              className="transition-all duration-200 ease-in-out hover:text-accent"
            >
              (469) 215-3098
            </a>
          </span>
        </div>
      </div>
    </div>
  )
}
