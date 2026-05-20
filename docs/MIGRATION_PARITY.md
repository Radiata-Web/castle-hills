# Migration Parity Checklist

Canonical host: `https://chstainandrestoration.com`

## Routes (must return 200 with same content)

| Path | Title | Notes |
|------|-------|-------|
| `/` | Castle Hills Stain & Restoration \| DFW | Home |
| `/about-us` | About Us \| Castle Hills Stain & Restoration | |
| `/contact-us` | Request a Free Estimate \| Castle Hills Stain & Restoration | Netlify form POST `/contact-form.html` |
| `/our-expertise` | Our Expertise \| Castle Hills Stain & Restoration | |
| `/privacy` | Privacy Policy \| Castle Hills Stain & Restoration | |
| `/fence-services` | Fence Services \| Castle Hills Stain & Restoration | |
| `/custom-wood-structures-outdoor-design` | Outdoor Structures \| ... | |
| `/luxury-finishes-coatings` | Interior & Exterior Painting \| ... | |
| `/interior-exterior-restoration-renovation` | Interior & Exterior Restoration \| ... | |

## Redirects (301 permanent)

From `next.config.ts` — ported to `netlify.toml`.

## SEO artifacts

- `/robots.txt` — allow `/`, disallow `/private/`, sitemap URL
- `/sitemap.xml` — preserve existing URL list from Next sitemap.ts

## Static assets

- `public/` served at root (`/photos/*`, `/logos/*`, `/contact-form.html`, badges)
- GA ID: `G-N53ZFX5V5H`

## Resolved Next conflict

`(services)/page.tsx` duplicated `/` with home — canonical `/` is home only; services index not linked in nav.
