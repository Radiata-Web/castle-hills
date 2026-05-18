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
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import Navbar from "@/components/nav/navbar";
import { Button } from "@/components/ui/button";
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

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[700px] bg-background text-foreground">
      <h1 className="text-4xl font-bold mb-4">
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </h1>
      <p className="text-xl mb-8">Error 404</p>
      <Button asChild>
        <Link to="/">Return to Home</Link>
      </Button>
    </div>
  );
}
