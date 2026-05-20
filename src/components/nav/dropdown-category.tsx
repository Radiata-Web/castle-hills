"use client"

import { Link } from "@tanstack/react-router"
import { ChevronDown, ChevronUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { useState } from "react"

interface LinkItem {
  title: string
  href: string
}

interface DropdownCategoryProps {
  categoryTitle: string
  links: LinkItem[]
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const serviceLinkClass =
  "flex min-h-11 w-full items-center rounded-lg px-4 py-3 text-base leading-snug text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-900"

export default function DropdownCategory({
  categoryTitle,
  links,
  setIsMenuOpen,
}: DropdownCategoryProps) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      <CollapsibleTrigger
        render={
          <Button
            variant="ghost"
            className="min-h-12 w-full justify-between rounded-lg px-4 py-3 text-lg font-semibold leading-snug hover:bg-zinc-100"
          />
        }
      >
        {categoryTitle}
        {isOpen ? (
          <ChevronUp className="size-5 shrink-0 opacity-70" />
        ) : (
          <ChevronDown className="size-5 shrink-0 opacity-70" />
        )}
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2 space-y-1.5 border-l border-zinc-200 pl-3 ml-2">
        {links.map((link) => (
          <Link
            key={link.href}
            to={`${link.href}`}
            className={serviceLinkClass}
            onClick={() => setIsMenuOpen(false)}
          >
            {link.title}
          </Link>
        ))}
      </CollapsibleContent>
    </Collapsible>
  )
}
