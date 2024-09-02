import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export interface LinkProps {
  name: string;
  path: string;
  onStateChange: Function;
}

export interface DropdownLinkProps {
  name: string;
  subpages: { name: string; path: string }[];
}

export function NavLink(props: LinkProps) {
  return (
    <Link
      href={props.path}
      key={props.name}
      onClick={() => props.onStateChange(false)}
      className="text-zinc-700 hover:bg-zinc-200 hover:text-zinc-900 px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ease-in-out sm:text-sm"
    >
      {props.name}
    </Link>
  );
}

export function DropdownNavLink(props: DropdownLinkProps) {
  return (
    <DropdownMenu modal={false}>
      {/* Trigger */}
      <DropdownMenuTrigger className="justify-between text-zinc-700 hover:bg-zinc-200 hover:text-zinc-900 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-in-out">
        {props.name}{" "}
        <ChevronDown className="inline-block ml-1 h-4 w-4 transition-transform duration-200" />
      </DropdownMenuTrigger>

      {/* Content */}
      <DropdownMenuContent className="animate-in slide-in-from-top-1 duration-200">
        {props.subpages.map((subpage) => (
          <DropdownMenuItem key={subpage.name}>
            <Link
              href={subpage.path}
              className="block px-4 py-2 text-sm transition-colors duration-200 hover:bg-zinc-100"
            >
              {subpage.name}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
