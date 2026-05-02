import type { MetadataRoute } from "next";
import { PORTFOLIO } from "@/lib/portfolio";
import { SERVICES } from "@/lib/services";
import { BLOG } from "@/lib/blog";
import { PARTNER_PAGES } from "@/lib/partner-pages";
import { SITE_URL } from "@/lib/seo";

const STATIC_PATHS: { path: string; priority: number }[] = [
  { path: "/", priority: 1.0 },
  { path: "/services", priority: 0.9 },
  { path: "/portfolio", priority: 0.9 },
  { path: "/partners", priority: 0.8 },
  { path: "/stati", priority: 0.7 },
  { path: "/about", priority: 0.7 },
  { path: "/contacts", priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    ...STATIC_PATHS.map(({ path, priority }) => ({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority,
    })),
    ...SERVICES.map((s) => ({
      url: `${SITE_URL}/services/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: s.kind === "category" ? 0.85 : 0.75,
    })),
    ...PORTFOLIO.map((p) => ({
      url: `${SITE_URL}/portfolio/${p.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    ...PARTNER_PAGES.map((p) => ({
      url: `${SITE_URL}/partners/${p.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    ...BLOG.map((p) => ({
      url: `${SITE_URL}/${p.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.65,
    })),
  ];
}
