import rawPortfolio from "@/data/portfolio.json";

export type PortfolioCategory =
  | "corporate"
  | "concerts"
  | "teambuilding"
  | "private"
  | "business"
  | "holidays";

export const CATEGORY_LABEL: Record<PortfolioCategory, string> = {
  corporate: "Корпоративные мероприятия",
  concerts: "Концерты",
  teambuilding: "Тимбилдинги",
  private: "Частные мероприятия",
  business: "Деловые мероприятия",
  holidays: "Праздники",
};

const CATEGORY_FROM_SLUG: Record<string, PortfolioCategory> = {
  "korporativnye-meropriyatiya": "corporate",
  kontserty: "concerts",
  timbildingi: "teambuilding",
  "chastnye-torzhestva": "private",
  "delovye-meropriyatiya": "business",
  prazdniki: "holidays",
};

const CATEGORY_COVER: Record<
  PortfolioCategory,
  { gradient: string; glyph: string }
> = {
  corporate: {
    glyph: "✷",
    gradient: "linear-gradient(135deg, #2a045c 0%, #7826b8 60%, #ee3b9f 100%)",
  },
  concerts: {
    glyph: "♪",
    gradient: "linear-gradient(135deg, #5a0f2c 0%, #aa1d4a 60%, #e94570 100%)",
  },
  teambuilding: {
    glyph: "▲",
    gradient: "linear-gradient(135deg, #0c4421 0%, #2d6a3e 55%, #80c39a 100%)",
  },
  private: {
    glyph: "❦",
    gradient: "linear-gradient(135deg, #2c0d0d 0%, #7a1d20 50%, #e7706f 100%)",
  },
  business: {
    glyph: "◆",
    gradient: "linear-gradient(135deg, #0d0a3a 0%, #1f1a55 55%, #4a3fbf 100%)",
  },
  holidays: {
    glyph: "❄",
    gradient: "linear-gradient(135deg, #1a3270 0%, #4671b8 50%, #c8def8 100%)",
  },
};

export type PortfolioBlock =
  | { kind: "lead"; label?: string; text: string }
  | { kind: "paragraph"; label?: string; text: string }
  | { kind: "heading"; text: string }
  | { kind: "list"; label?: string; items: string[] };

export type SeoMeta = {
  /** Original <title> from the source page (search-result title). */
  seoTitle?: string;
  /** Original <meta name="description">. */
  metaDescription?: string;
  /** Original og:title — usually richer than the page title. */
  ogTitle?: string;
  /** Original og:description. */
  ogDescription?: string;
  /** Original og:image absolute URL on the source. Image is also mirrored
   *  locally — see PortfolioEvent.coverImage. */
  ogImage?: string;
  /** Original canonical URL on the source — only useful as a sanity check. */
  canonical?: string;
};

export type PortfolioEvent = {
  slug: string;
  title: string;
  category: PortfolioCategory;
  date: string;
  dateLong: string;
  venue?: string;
  cover: { gradient: string; glyph: string };
  coverImage?: string;
  body: PortfolioBlock[];
  images: string[];
  galleryCount: number;
  seo: SeoMeta;
  /** Source URL on the original WP site — used to build redirects. */
  sourceUrl?: string;
};

type RawPortfolioEntry = {
  slug: string;
  title: string;
  description: string;
  category: string;
  categoryLabel: string;
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

function tidyBlocks(
  raw: RawPortfolioEntry["body"] = [],
): PortfolioBlock[] {
  return (raw || [])
    .map<PortfolioBlock | null>((b) => {
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
    .filter((b): b is PortfolioBlock => b !== null);
}

function toEvent(raw: RawPortfolioEntry): PortfolioEvent {
  const category =
    CATEGORY_FROM_SLUG[raw.category] || ("corporate" as PortfolioCategory);
  const images = (raw.images || []).filter(Boolean);
  return {
    slug: raw.slug,
    title: raw.title,
    category,
    date: "",
    dateLong: "",
    cover: CATEGORY_COVER[category],
    coverImage: raw.image || images[0],
    body: tidyBlocks(raw.body),
    images,
    galleryCount: images.length,
    seo: raw.seo || {},
    sourceUrl: raw.sourceUrl,
  };
}

export const PORTFOLIO: PortfolioEvent[] = (rawPortfolio as RawPortfolioEntry[])
  .map(toEvent)
  .sort((a, b) => a.title.localeCompare(b.title, "ru"));

export function getPortfolioBySlug(slug: string): PortfolioEvent | undefined {
  return PORTFOLIO.find((e) => e.slug === slug);
}

export function getNextPortfolio(slug: string): PortfolioEvent {
  const i = PORTFOLIO.findIndex((e) => e.slug === slug);
  return PORTFOLIO[(i + 1) % PORTFOLIO.length];
}

export function getPortfolioByCategory(
  category: PortfolioCategory,
  limit?: number,
): PortfolioEvent[] {
  const list = PORTFOLIO.filter((e) => e.category === category);
  return typeof limit === "number" ? list.slice(0, limit) : list;
}
