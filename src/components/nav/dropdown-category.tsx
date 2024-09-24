"use client"

import Link from "next/link"
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

export default function DropdownCategory({
  categoryTitle,
  links,
  setIsMenuOpen,
}: DropdownCategoryProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-between font-semibold text-xl"
        >
          {categoryTitle}
          {isOpen ? (
            <ChevronUp className="h-4 w-4 ml-2" />
          ) : (
            <ChevronDown className="h-4 w-4 ml-2" />
          )}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2 space-y-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={`${link.href}`}
            className="block rounded-lg px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            onClick={() => setIsMenuOpen(false)}
          >
            {link.title}
          </Link>
        ))}
      </CollapsibleContent>
    </Collapsible>
  )
}
