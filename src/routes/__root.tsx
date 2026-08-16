import "@fontsource/instrument-sans/400.css";
import "@fontsource/instrument-sans/500.css";
import "@fontsource/instrument-sans/600.css";
import "@fontsource/instrument-sans/700.css";
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRoute,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import Navbar from "@/components/nav/navbar";
import { RouteError } from "@/components/misc/route-error";
import { Button } from "@/components/ui/button";
import { ctaPrimaryClassName } from "@/lib/cta";
import { GA_ID } from "@/lib/site";
import { pageHead, rootMeta } from "@/lib/seo";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";

export const Route = createRootRoute({
  head: () => ({
    ...pageHead(rootMeta),
    links: [{ rel: "icon", href: "/favicon.svg", type: "image/svg+xml" }],
  }),
  component: RootComponent,
  errorComponent: RootErrorPage,
  notFoundComponent: NotFoundPage,
});

function RootComponent() {
  return (
    <RootDocument>
      <Navbar />
      <main className="mx-auto">
        <Outlet />
      </main>
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <GoogleAnalyticsScript />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          "[--font-sans:'Instrument_Sans',ui-sans-serif,system-ui,sans-serif]",
        )}
      >
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function GoogleAnalyticsScript() {
  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `,
        }}
      />
    </>
  );
}

function RootErrorPage(props: ErrorComponentProps) {
  // ponytail: TanStack's default error UI is "Something went wrong! Show Error".
  // Google indexed that as the homepage title+snippet. Keep real company copy
  // here so a failed render still crawls as the business, not a stack-trace toggle.
  return (
    <RootDocument>
      <RouteError {...props} />
    </RootDocument>
  );
}

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[700px] bg-background text-foreground">
      <h1 className="text-4xl font-bold mb-4">
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </h1>
      <p className="text-xl mb-8">Error 404</p>
      <Button
        size="lg"
        className={ctaPrimaryClassName}
        render={<Link to="/" />}
        nativeButton={false}
      >
        Return to Home
      </Button>
    </div>
  );
}
