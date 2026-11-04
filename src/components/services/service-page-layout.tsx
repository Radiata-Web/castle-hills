import type { ReactNode } from "react";
import ChooseUs from "@/components/misc/choose-us";
import { Hero } from "@/components/misc/hero";
import Footer from "@/components/nav/footer";

type ServicePageLayoutProps = {
  title: string;
  subtitle: string;
  backgroundImageUrl: string;
  children: ReactNode;
  /** When false, omit the shared ChooseUs block (rare). Default true. */
  showChooseUs?: boolean;
};

/**
 * Shared shell for new Painting / Wood Staining pages.
 * Footer stays per-page (matches existing marketing pages; not in __root).
 */
export function ServicePageLayout({
  title,
  subtitle,
  backgroundImageUrl,
  children,
  showChooseUs = true,
}: ServicePageLayoutProps) {
  return (
    <>
      <Hero title={title} subtitle={subtitle} backgroundImageUrl={backgroundImageUrl} />
      <div className="mx-auto mb-12 mt-12 max-w-8xl px-4 md:mt-12 md:px-8 lg:px-8">
        {children}
        {showChooseUs ? <ChooseUs /> : null}
      </div>
      <Footer />
    </>
  );
}
