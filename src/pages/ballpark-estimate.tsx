import { Link } from "@tanstack/react-router";
import { Hero } from "@/components/misc/hero";
import Footer from "@/components/nav/footer";
import { Button } from "@/components/ui/button";
import { ctaPrimaryClassName } from "@/lib/cta";
import { PHOTOS } from "@/lib/images";
import { BALLPARK_DISCLAIMER } from "@/lib/ballpark";

/**
 * Placeholder ballpark estimate UI — no pricing math and no fabricated ranges.
 * Wire Turnstile + POST /api/v1/estimate after Cloudflare cutover (Phase B).
 */
export default function BallparkEstimatePage() {
  return (
    <>
      <Hero
        title="Ballpark estimate"
        subtitle="A quick, non-binding planning number for painting and wood staining—not a quote."
        backgroundImageUrl={PHOTOS.stain2}
      />

      <div className="max-w-8xl mx-auto px-4 md:px-8 lg:px-8 py-12 md:py-16">
        <article className="mx-auto max-w-2xl space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
              Coming soon on Cloudflare
            </h2>
            <p className="text-zinc-600 leading-relaxed">
              We are moving hosting to Cloudflare and adding a Turnstile-protected ballpark
              estimate tool. Pricing inputs are not published here yet—when they are, this page will
              collect project details, verify you are human, and return a{" "}
              <strong className="font-semibold text-zinc-800">ballpark estimate</strong> only.
            </p>
            <p className="rounded-lg border border-amber-200/80 bg-amber-50/60 px-4 py-3 text-sm leading-relaxed text-zinc-700">
              {BALLPARK_DISCLAIMER}
            </p>
          </div>

          <div className="space-y-3 rounded-xl border border-zinc-200 bg-zinc-50/50 p-6">
            <p className="text-sm font-medium text-zinc-800">Questionnaire</p>
            <p className="text-sm text-zinc-600">
              Project questions and rates will appear here after Ryan supplies the pricing model.
              No placeholder prices are shown on purpose.
            </p>
            <Button type="button" size="lg" className={ctaPrimaryClassName} disabled>
              Get a ballpark estimate
            </Button>
            <p className="text-xs text-zinc-500">
              API stub: <code className="font-mono">POST /api/v1/estimate</code> (Turnstile required;
              returns pricing_not_configured until rates land).
            </p>
          </div>

          <p className="text-zinc-600">
            Need a walkthrough sooner?{" "}
            <Link
              to="/contact-us"
              className="font-medium text-primary underline underline-offset-4 hover:text-primary/90"
            >
              Contact us
            </Link>{" "}
            for a free consultation.
          </p>
        </article>
      </div>

      <Footer />
    </>
  );
}
