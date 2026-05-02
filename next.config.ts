import type { NextConfig } from "next";

/**
 * Permanent redirects from the legacy WordPress URL structure to the new
 * Next.js routes. Each entry preserves an indexed URL so we don't lose its
 * SEO weight after migration.
 *
 * Categories of redirects:
 *  1. 28 individual sub-services that lived at the WP root → /services/<slug>
 *  2. Misc top-level pages whose path changed (about/contacts)
 *  3. Old WP infrastructure URLs that no longer apply on Next.js
 */
const ROOT_SERVICE_SLUGS = [
  "prikljuchencheskij-kvest",
  "vyezdnoj-timbilding",
  "tvorcheskij-timbilding",
  "muzykalnyj-timbilding-kontsertmejster",
  "korporativnoe-onlajn-radio",
  "onlajn-kvizy",
  "onlajn-igry",
  "onlajn-prazdniki",
  "korporativnyj-novyj-god",
  "vyezdnoe-meroprijatie",
  "jubilej-kompanii",
  "korporativnye-igry",
  "professionalnyj-prazdnik",
  "obshhestvennoe-ili-blagotvoritelnoe-meroprijatie",
  "family-day",
  "organizacija-konferencij",
  "delovoj-turizm",
  "delovye-igry",
  "prezentacija-novogo-produkta",
  "gorodskie-meroprijatija",
  "dilerskie-centry",
  "organizacija-delovyh-igr",
  "organizacija-gorodskih-koncertov-i-festivalej",
  "sponsorskie-i-marketingovye-koncerty",
  "buking-artistov",
  "dni-rozhdenija-i-jubilei",
  "detskie-prazdniki",
  "svadby",
] as const;

/**
 * Map from /portfolio-types/<slug>/ taxonomy slug → /services/<slug>.
 * The taxonomy slugs differ slightly from the service category slugs because
 * WP indexed them with the YA-transliteration ("meropriyatiya") whereas the
 * service categories use the JA-transliteration ("meroprijatija").
 */
const PORTFOLIO_TYPE_REDIRECTS: Record<string, string> = {
  "korporativnye-meropriyatiya": "korporativnye-meroprijatija",
  kontserty: "kontserty",
  timbildingi: "timbilding",
  "chastnye-torzhestva": "chastnye-meropriyatiya",
  "delovye-meropriyatiya": "delovye-meropriyatiya",
  prazdniki: "korporativnye-meroprijatija",
};

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // 1. Legacy root-level service URLs → /services/<slug>
      ...ROOT_SERVICE_SLUGS.map((slug) => ({
        source: `/${slug}`,
        destination: `/services/${slug}`,
        permanent: true,
      })),
      ...ROOT_SERVICE_SLUGS.map((slug) => ({
        source: `/${slug}/`,
        destination: `/services/${slug}`,
        permanent: true,
      })),

      // 2. /portfolio-types/<slug>/ → /services/<service-category>
      // Google has these archives indexed; without these we'd lose 6 ranked URLs.
      ...Object.entries(PORTFOLIO_TYPE_REDIRECTS).flatMap(([from, to]) => [
        {
          source: `/portfolio-types/${from}`,
          destination: `/services/${to}`,
          permanent: true,
        },
        {
          source: `/portfolio-types/${from}/`,
          destination: `/services/${to}`,
          permanent: true,
        },
        {
          source: `/portfolio-types/${from}/page/:n`,
          destination: `/services/${to}`,
          permanent: true,
        },
      ]),
      // Catch-all for unknown portfolio-types pages (paginated archives, etc.)
      {
        source: "/portfolio-types/:path*",
        destination: "/portfolio",
        permanent: true,
      },

      // 3. EN-version pages — site has no EN counterpart yet; redirect to RU
      // root and let visitors navigate. When an EN version ships, replace
      // these with proper /en/* routes.
      {
        source: "/en/:path*",
        destination: "/",
        permanent: false, // 307 — temporary, swap to true once /en/ exists
      },

      // 4. Renamed top-level pages
      { source: "/o-kompanii", destination: "/about", permanent: true },
      { source: "/o-kompanii/", destination: "/about", permanent: true },
      { source: "/kontakty", destination: "/contacts", permanent: true },
      { source: "/kontakty/", destination: "/contacts", permanent: true },

      // 5. Online services hub on the legacy site → online category
      {
        source: "/services-online",
        destination: "/services/uslugi-onlajn",
        permanent: true,
      },
      {
        source: "/services-online/",
        destination: "/services/uslugi-onlajn",
        permanent: true,
      },

      // 6. Quote-form & thank-you → contact
      { source: "/zayavka", destination: "/contacts", permanent: true },
      { source: "/zayavka/", destination: "/contacts", permanent: true },
      { source: "/thanks", destination: "/contacts", permanent: true },
      { source: "/thanks/", destination: "/contacts", permanent: true },

      // 7. Reviews custom post type — site has no reviews-by-id pages anymore;
      // route to homepage (testimonials carousel lives on the front page).
      {
        source: "/reviews/:path*",
        destination: "/#testimonials",
        permanent: true,
      },

      // 8. WP plumbing — never expose on Next.js
      {
        source: "/wp-admin/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/wp-login.php",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
