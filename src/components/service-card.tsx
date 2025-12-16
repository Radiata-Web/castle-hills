import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  imageSrc: string;
  imageAlt?: string;
  className?: string;
}

export const ServiceCard = ({
  icon,
  title,
  description,
  href,
  imageSrc,
  imageAlt = "",
  className,
}: ServiceCardProps) => {
  return (
    <a
      href={href}
      className={cn(
        "group relative block overflow-hidden rounded-lg transition-all duration-200 ease-in-out shadow-lg border",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "h-80 w-full",
        className
      )}
      aria-label={`Learn more about ${title}`}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0" role="img" aria-label={imageAlt}>
        <img
          src={imageSrc}
          alt={imageAlt}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Default State Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-white/10 via-white/100 to-white transition-opacity duration-200 ease-in-out group-hover:opacity-0" />

      {/* Hover State Overlay */}
      <div className="absolute inset-0 z-10 bg-accent/90 opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100" />

      {/* Content Container */}
      <div className="relative z-20 flex h-full flex-col items-center justify-center px-6 py-8 text-center">
        {/* Icon - Always Visible */}
        <div className="mb-4 transition-opacity duration-200 ease-in-out group-hover:opacity-0">
          <div className="text-5xl">{icon}</div>
        </div>

        {/* Title - Always Visible */}
        <h3 className="mb-3 text-2xl font-bold text-foreground transition-colors duration-200 ease-in-out group-hover:text-accent-foreground">
          {title}
        </h3>

        {/* Description - Visible in Default State Only */}
        <p className="text-sm text-muted-foreground opacity-100 transition-opacity duration-200 ease-in-out group-hover:opacity-0">
          {description}
        </p>

        {/* Learn More Button - Visible in Hover State Only */}
        <div className="mt-6 opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100">
          <Button
            variant="default"
            size="lg"
            className="pointer-events-none"
            tabIndex={-1}
            aria-hidden="true"
          >
            Learn More
          </Button>
        </div>
      </div>
    </a>
  );
};
