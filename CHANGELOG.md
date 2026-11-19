# Changelog

## November 2026

### Added

- Ballpark estimator at `/ballpark-estimate` with questionnaire UI, Turnstile-gated `POST /api/v1/estimate`, and server-side pricing from Worker secret `BALLPARK_PRICING_JSON` (rates never committed)
- Pricing leak check (`pnpm run check:pricing-leak`) and unit tests for schemas / compute / estimate handler

### Changed

- Site-wide primary CTA points to the ballpark estimator; painting pages keep contact CTAs
- Contact page and footer link to the ballpark tool; Privacy Policy notes ballpark data collection
- Bundle discount alert leads with “Did you know we offer bundle discounts?” and tells customers to call and mention it to qualify; fractional `bundleDiscountPercent` values (e.g. `0.1`) display as whole percents (`10%`)
- Pricing config rejects range factors that don’t bracket `1.0` (e.g. `0.1` / `0.15`), which were collapsing estimates to ~10% of the real total
- Ballpark estimator actions use default button size with a 44px (`min-h-11`) floor instead of kit `lg` (48px)

## October 2025

### Added

- Restoration & Remodeling page
- Carousel component(s)

### Changed

- Several images to lazy loading
- Swapped to bun for package management

### Security

- Updated all packages
