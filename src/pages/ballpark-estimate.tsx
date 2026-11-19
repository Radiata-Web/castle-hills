import { BallparkEstimator } from "@/components/ballpark/ballpark-estimator";
import Footer from "@/components/nav/footer";

export default function BallparkEstimatePage() {
  return (
    <>
      <main className="max-w-8xl mx-auto px-4 md:px-8 pt-8 sm:pt-10 pb-16 sm:pb-24">
        <header className="max-w-xl space-y-1.5 mb-6 sm:mb-7">
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-900 text-balance">
            Get a ballpark estimate
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 text-pretty">
            A few quick questions, then a price range for planning. No obligation.
          </p>
        </header>

        <BallparkEstimator />
      </main>

      <Footer />
    </>
  );
}
