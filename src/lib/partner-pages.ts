import rawPartners from "@/data/partner-pages.json";
import type { ServiceBlock, SeoMeta } from "@/lib/services";

export type PartnerPage = {
  slug: string;
  title: string;
  description: string;
  body: ServiceBlock[];
  image?: string;
  images: string[];
  seo: SeoMeta;
  sourceUrl?: string;
};

type RawPartnerEntry = {
  slug: string;
  title: string;
  description: string;
  sourceUrl: string;
  body?: Array<
    | { kind: "heading"; text: string }
    | { kind: "paragraph"; text: string }
    | { kind: "list"; items: string[] }
  >;
  images?: string[];
  image?: string;
  seo?: SeoMeta;
};

function tidyBlocks(raw: RawPartnerEntry["body"] = []): ServiceBlock[] {
  return (raw || [])
    .map<ServiceBlock | null>((b) => {
      if (b.kind === "heading") {
        const text = b.text.replace(/[:：]\s*$/, "").trim();
        return text ? { kind: "heading", text } : null;
      }
      if (b.kind === "paragraph") {
        const text = b.text.trim();
        return text.length > 1 ? { kind: "paragraph", text } : null;
      }
      if (b.kind === "list") {
        const items = b.items.map((s) => s.trim()).filter(Boolean);
        return items.length ? { kind: "list", items } : null;
      }
      return null;
    })
    .filter((b): b is ServiceBlock => b !== null);
}

function adapt(raw: RawPartnerEntry): PartnerPage {
  const images = (raw.images || []).filter(Boolean);
  return {
    slug: raw.slug,
    title: raw.title,
    description: raw.description,
    body: tidyBlocks(raw.body),
    images,
    image: raw.image || images[0],
    seo: raw.seo || {},
    sourceUrl: raw.sourceUrl,
  };
}

export const PARTNER_PAGES: PartnerPage[] = (rawPartners as RawPartnerEntry[])
  .map(adapt)
  .sort((a, b) => a.title.localeCompare(b.title, "ru"));

export function getPartnerPageBySlug(slug: string): PartnerPage | undefined {
  return PARTNER_PAGES.find((p) => p.slug === slug);
}
