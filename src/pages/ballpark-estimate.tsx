import { BallparkEstimator } from "@/components/ballpark/ballpark-estimator";
import { Hero } from "@/components/misc/hero";
import Footer from "@/components/nav/footer";
import { PHOTOS } from "@/lib/images";

export default function BallparkEstimatePage() {
  return (
    <>
      <Hero
        title="Get a ballpark estimate"
        subtitle="A few quick questions, then a price range for planning. No obligation."
        backgroundImageUrl={PHOTOS.stain2}
      />

      <main className="max-w-8xl mx-auto px-4 md:px-8 pt-8 sm:pt-10 pb-16 sm:pb-24">
        <BallparkEstimator />
      </main>

      <Footer />
    </>
  );
}
