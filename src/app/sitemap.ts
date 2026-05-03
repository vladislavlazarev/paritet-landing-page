import type { MetadataRoute } from "next";
import { PORTFOLIO } from "@/lib/portfolio";
import { SERVICES } from "@/lib/services";
import { BLOG } from "@/lib/blog";
import { PARTNER_PAGES } from "@/lib/partner-pages";
import { localizedAbsoluteUrl } from "@/lib/seo";
import { LOCALES, LOCALE_BCP47, type Locale } from "@/lib/i18n/config";

type Entry = {
  path: string;
  priority: number;
  changeFrequency: "monthly" | "yearly";
};

const STATIC_PATHS: Entry[] = [
  { path: "/", priority: 1.0, changeFrequency: "monthly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/portfolio", priority: 0.9, changeFrequency: "monthly" },
  { path: "/partners", priority: 0.8, changeFrequency: "monthly" },
  { path: "/stati", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contacts", priority: 0.7, changeFrequency: "monthly" },
];

/** hreflang alternates map for a given locale-neutral path. */
function alternates(path: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const loc of LOCALES) {
    out[LOCALE_BCP47[loc]] = localizedAbsoluteUrl(loc, path);
  }
  return out;
}

function entryFor(locale: Locale, e: Entry, lastModified: Date): MetadataRoute.Sitemap[number] {
  return {
    url: localizedAbsoluteUrl(locale, e.path),
    lastModified,
    changeFrequency: e.changeFrequency,
    priority: e.priority,
    alternates: { languages: alternates(e.path) },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const dynamicEntries: Entry[] = [
    ...SERVICES.map((s) => ({
      path: `/services/${s.slug}`,
      priority: s.kind === "category" ? 0.85 : 0.75,
      changeFrequency: "monthly" as const,
    })),
    ...PORTFOLIO.map((p) => ({
      path: `/portfolio/${p.slug}`,
      priority: 0.7,
      changeFrequency: "yearly" as const,
    })),
    ...PARTNER_PAGES.map((p) => ({
      path: `/partners/${p.slug}`,
      priority: 0.6,
      changeFrequency: "yearly" as const,
    })),
    ...BLOG.map((p) => ({
      path: `/${p.slug}`,
      priority: 0.65,
      changeFrequency: "yearly" as const,
    })),
  ];
  const allEntries = [...STATIC_PATHS, ...dynamicEntries];
  return LOCALES.flatMap((loc) =>
    allEntries.map((e) => entryFor(loc, e, now)),
  );
}
