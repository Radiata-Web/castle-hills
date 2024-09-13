import { cn } from "@/lib/utils"
import { PhoneIcon } from "lucide-react"

interface ContactProps {
  iconSize: number
  textSize: string
  className: string
}

export default function ContactNumber(props: ContactProps) {
  return (
    // Customizable phone number component
    // |icon| (469) 215-3098
    <div className={`flex flex-row gap-2 items-center ${props.className}`}>
      <PhoneIcon size={props.iconSize} />
      <a
        href="tel:4692153098"
        className={cn(
          `${props.textSize}`,
          "transition-all duration-200 ease-in-out hover:text-accent"
        )}
      >
        (469) 215-3098
      </a>
    </div>
  )
}
