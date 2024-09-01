import { cn } from "@/lib/utils";
import { PhoneIcon } from "lucide-react";

interface ContactProps {
  iconSize: number;
  textSize: string;
  className: string;
}

export default function ContactNumber(props: ContactProps) {
  return (
    // Customizable phone number component
    // |icon| (469) 215-3098
    <div className={`flex flex-row gap-2 items-center ${props.className}`}>
      <PhoneIcon size={props.iconSize} />
      <p className={cn(`${props.textSize}`)}>(469) 215-3098</p>
    </div>
  );
}
