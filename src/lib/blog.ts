import rawBlog from "@/data/blog.json";
import type { ServiceBlock } from "@/lib/services";
import type { SeoMeta } from "@/lib/services";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  body: ServiceBlock[];
  image?: string;
  images: string[];
  seo: SeoMeta;
  sourceUrl?: string;
};

type RawBlogEntry = {
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

function tidyBlocks(raw: RawBlogEntry["body"] = []): ServiceBlock[] {
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

function adapt(raw: RawBlogEntry): BlogPost {
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

export const BLOG: BlogPost[] = (rawBlog as RawBlogEntry[]).map(adapt);

/** Slugs the catch-all root route should statically generate. */
export const BLOG_SLUGS = new Set(BLOG.map((p) => p.slug));

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG.find((p) => p.slug === slug);
}
