import Link from "next/link"
import { Facebook, Twitter, Instagram } from "lucide-react"

export default function Socials() {
  const SOCIALS = [
    {
      name: "Facebook",
      url: "#",
      icon: <Facebook size={18} strokeWidth={1.5} />,
    },
    {
      name: "Twitter",
      url: "#",
      icon: <Twitter size={18} strokeWidth={1.5} />,
    },
    {
      name: "Instagram",
      url: "#",
      icon: <Instagram size={18} strokeWidth={1.5} />,
    },
  ]

  return (
    <div className="flex space-x-2">
      {SOCIALS.map((social) => (
        <Link
          key={social.name}
          href={social.url}
          className="text-muted-foreground bg-accent-light rounded-lg p-2 items-center hover:text-primary"
          aria-label={social.name}
        >
          {social.icon}
        </Link>
      ))}
    </div>
  )
}
