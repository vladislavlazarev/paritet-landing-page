import type { Metadata } from "next";

/**
 * Production canonical origin. Override locally with NEXT_PUBLIC_SITE_URL
 * when developing against a different host.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://party-paritet.com";

export const SITE_NAME = "Паритет Events";

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

type BuildMetaInput = {
  /** Path on the new site (e.g. /portfolio/abc) — NOT including the origin. */
  path: string;
  /** Page title shown in search results / browser tab. */
  title: string;
  description?: string;
  /** Optional og:image — usually the page's hero photo. */
  image?: string;
  /** OpenGraph type — "article" for cases/posts, "website" otherwise. */
  type?: "website" | "article";
  /** Set to true to no-index this URL. */
  noIndex?: boolean;
};

/**
 * Builds a complete metadata object: title, description, canonical, OG, Twitter.
 * Use this in every page's `generateMetadata`.
 */
export function buildMeta({
  path,
  title,
  description,
  image,
  type = "website",
  noIndex,
}: BuildMetaInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image
    ? image.startsWith("http")
      ? image
      : absoluteUrl(image)
    : `${SITE_URL}/og-default.png`;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: SITE_NAME,
      locale: "ru_RU",
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
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
};

export function articleJsonLd(input: ArticleJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
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
};

export function serviceJsonLd(input: ServiceJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.title,
    description: input.description,
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
