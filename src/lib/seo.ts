import type { Metadata } from "next";
import {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_BCP47,
  type Locale,
} from "@/lib/i18n/config";

/**
 * Production canonical origin. Override locally with NEXT_PUBLIC_SITE_URL
 * when developing against a different host.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://party-paritet.com";

export const SITE_NAME = "Паритет Events";
export const SITE_NAME_LATIN = "Paritet Events";

export const ORG_LEGAL_NAME = "Paritet Events";
export const ORG_PHONE_PRIMARY = "+7 (921) 410-21-21";
export const ORG_PHONE_SECONDARY = "+7 (921) 951-92-82";
export const ORG_EMAIL = "info@party-paritet.com";

/** Build a fully-qualified URL on the canonical origin. */
export function absoluteUrl(pathname: string): string {
  if (!pathname) return SITE_URL;
  if (/^https?:\/\//i.test(pathname)) return pathname;
  return `${SITE_URL}${pathname.startsWith("/") ? "" : "/"}${pathname}`;
}

/**
 * Locale-aware path builder. Russian (the default locale) keeps the historic
 * unprefixed URLs; other locales get a /<locale>/ prefix. Existing search
 * authority on /portfolio etc. stays put.
 */
export function localizedPath(locale: Locale, neutralPath: string): string {
  const clean = neutralPath.startsWith("/") ? neutralPath : `/${neutralPath}`;
  if (locale === DEFAULT_LOCALE) return clean;
  if (clean === "/") return `/${locale}`;
  return `/${locale}${clean}`;
}

/** Localized absolute URL for a locale-neutral path. */
export function localizedAbsoluteUrl(
  locale: Locale,
  neutralPath: string,
): string {
  return absoluteUrl(localizedPath(locale, neutralPath));
}

/**
 * Build the hreflang `alternates.languages` map for a locale-neutral path.
 * Includes a `x-default` pointing at the default locale, which signals to
 * Google which version to show when the user's language is unsupported.
 */
export function buildLanguageAlternates(
  neutralPath: string,
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const loc of LOCALES) {
    out[LOCALE_BCP47[loc]] = localizedAbsoluteUrl(loc, neutralPath);
  }
  out["x-default"] = localizedAbsoluteUrl(DEFAULT_LOCALE, neutralPath);
  return out;
}

type BuildMetaInput = {
  /** Locale-neutral path (e.g. /portfolio, /portfolio/abc). NOT prefixed. */
  path: string;
  /** Defaults to the site default locale (ru). */
  locale?: Locale;
  /** Page title shown in search results / browser tab. */
  title: string;
  description?: string;
  /** Optional og:image — usually the page's hero photo. */
  image?: string;
  /** OpenGraph type — "article" for cases/posts, "website" otherwise. */
  type?: "website" | "article";
  /** Set to true to no-index this URL. */
  noIndex?: boolean;
  /** Override the brand suffix appended to the title. */
  siteName?: string;
};

const TITLE_MAX = 65;

/**
 * Most scraped titles already end with "— Паритет Events" / "от Paritet Events".
 * The layout-level template would otherwise tack on a second " — Паритет Events"
 * suffix. Detect that case and use the title as-is.
 *
 * Also enforces the search-snippet length budget (~60 chars). When a title is
 * longer, we trim at a word boundary so it stays readable in SERPs.
 */
function normaliseTitle(raw: string): string {
  let t = raw.trim().replace(/\s+—\s+«?Паритет.*$/i, "").trim();
  t = t.replace(/\s+\|\s+Paritet\s*Events?$/i, "").trim();
  t = t.replace(/\s+от\s+«?Паритет\s*events?»?$/i, "").trim();
  t = t.replace(/\s+—\s+Paritet\s*Events?$/i, "").trim();
  if (t.length > TITLE_MAX) {
    const cut = t.slice(0, TITLE_MAX);
    const lastSpace = cut.lastIndexOf(" ");
    t = (lastSpace > 30 ? cut.slice(0, lastSpace) : cut).replace(/[,;:]$/, "");
  }
  return t;
}

/**
 * Builds a complete metadata object: title, description, canonical, hreflang,
 * OG, Twitter. Use this in every page's `generateMetadata`.
 */
export function buildMeta({
  path,
  locale = DEFAULT_LOCALE,
  title,
  description,
  image,
  type = "website",
  noIndex,
  siteName,
}: BuildMetaInput): Metadata {
  const url = localizedAbsoluteUrl(locale, path);
  const ogImage = image
    ? image.startsWith("http")
      ? image
      : absoluteUrl(image)
    : `${SITE_URL}/og-default.png`;

  const niceTitle = normaliseTitle(title);
  const brand = siteName || (locale === "ru" ? SITE_NAME : SITE_NAME_LATIN);
  const titleField = `${niceTitle} — ${brand}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: { absolute: titleField },
    description,
    alternates: {
      canonical: url,
      languages: buildLanguageAlternates(path),
    },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      type,
      url,
      title: titleField,
      description,
      siteName: brand,
      locale: LOCALE_BCP47[locale].replace("-", "_"),
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) =>
        LOCALE_BCP47[l].replace("-", "_"),
      ),
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: titleField,
      description,
      images: [ogImage],
    },
  };
}

/* ------------------------------------------------------------------ */
/*  Structured data (JSON-LD)                                          */
/* ------------------------------------------------------------------ */

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    legalName: ORG_LEGAL_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo-white.png`,
    description:
      "Event-агентство по организации мероприятий в Санкт-Петербурге. Корпоративы, тимбилдинги, концерты, частные праздники.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Невский проспект, 109, офис 27",
      addressLocality: "Санкт-Петербург",
      addressCountry: "RU",
    },
    telephone: ORG_PHONE_PRIMARY,
    email: ORG_EMAIL,
    sameAs: [
      "https://vk.com/paritet_events",
      "https://t.me/paritetevents",
    ],
  };
}

export function breadcrumbJsonLd(
  items: { name: string; url: string }[],
): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.url),
    })),
  };
}

type ArticleJsonLdInput = {
  url: string;
  title: string;
  description?: string;
  image?: string;
  inLanguage?: string;
  datePublished?: string;
  dateModified?: string;
};

export function articleJsonLd(input: ArticleJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    inLanguage: input.inLanguage,
    datePublished: input.datePublished,
    dateModified: input.dateModified || input.datePublished,
    image: input.image
      ? input.image.startsWith("http")
        ? input.image
        : absoluteUrl(input.image)
      : undefined,
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(input.url) },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo-white.png`,
      },
    },
  };
}

type ServiceJsonLdInput = {
  url: string;
  title: string;
  description?: string;
  image?: string;
  area?: string;
  inLanguage?: string;
};

export function serviceJsonLd(input: ServiceJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.title,
    description: input.description,
    inLanguage: input.inLanguage,
    image: input.image
      ? input.image.startsWith("http")
        ? input.image
        : absoluteUrl(input.image)
      : undefined,
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    areaServed: input.area || "Санкт-Петербург",
    url: absoluteUrl(input.url),
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: it.answer,
      },
    })),
  };
}

type ReviewItem = {
  author: string;
  body: string;
  rating?: number;
  datePublished?: string;
};

export function aggregateRatingJsonLd(
  url: string,
  name: string,
  reviews: ReviewItem[],
) {
  const ratings = reviews
    .map((r) => r.rating ?? 5)
    .filter((n): n is number => typeof n === "number");
  const avg =
    ratings.reduce((a, b) => a + b, 0) / Math.max(ratings.length, 1);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": absoluteUrl(url) + "#org-rating",
    name,
    url: absoluteUrl(url),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: avg.toFixed(1),
      bestRating: "5",
      worstRating: "1",
      reviewCount: reviews.length,
    },
    review: reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Organization", name: r.author },
      reviewRating: {
        "@type": "Rating",
        ratingValue: String(r.rating ?? 5),
        bestRating: "5",
      },
      reviewBody: r.body,
      datePublished: r.datePublished,
    })),
  };
}

type VideoJsonLdInput = {
  name: string;
  description: string;
  thumbnailUrl: string;
  contentUrl: string;
  uploadDate: string;
  duration?: string; // ISO 8601, e.g. PT3M42S
  inLanguage?: string;
};

export function videoJsonLd(input: VideoJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: input.name,
    description: input.description,
    inLanguage: input.inLanguage,
    thumbnailUrl: input.thumbnailUrl.startsWith("http")
      ? input.thumbnailUrl
      : absoluteUrl(input.thumbnailUrl),
    contentUrl: input.contentUrl.startsWith("http")
      ? input.contentUrl
      : absoluteUrl(input.contentUrl),
    uploadDate: input.uploadDate,
    duration: input.duration,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo-white.png`,
      },
    },
  };
}

/**
 * Tiny component-shaped helper. Inline JSON-LD scripts must use the
 * `application/ld+json` type — keep this consistent everywhere.
 */
export function jsonLdScriptProps(data: object) {
  return {
    type: "application/ld+json" as const,
    // dangerouslySetInnerHTML is acceptable here — Next renders it server-side.
    dangerouslySetInnerHTML: { __html: JSON.stringify(data) },
  };
}
