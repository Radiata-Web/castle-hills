import { cn } from "@/lib/utils";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";
import { PhoneIcon } from "lucide-react";

interface ContactProps {
  iconSize: number;
  textSize: string;
  className: string;
}

export default function ContactNumber(props: ContactProps) {
  return (
    <div className={`flex flex-row gap-2 items-center ${props.className}`}>
      <PhoneIcon size={props.iconSize} />
      <a
        href={PHONE_TEL}
        className={cn(
          `${props.textSize}`,
          "transition-all duration-200 ease-in-out hover:text-accent",
        )}
      >
        {PHONE_DISPLAY}
      </a>
    </div>
  );
}
