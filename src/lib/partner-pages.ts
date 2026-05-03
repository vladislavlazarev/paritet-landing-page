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

const STOPWORD = new Set([
  "банк",
  "банка",
  "компании",
  "компания",
  "холдинг",
  "групп",
  "group",
  "ltd",
]);

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Возвращает значимые слова из названия партнёра (≥4 символа, не стоп-слова),
 * по которым можно искать упоминания в title/body кейсов портфолио.
 */
export function partnerSearchTokens(title: string): string[] {
  return title
    .replace(/[«»".,]/g, "")
    .split(/\s+/)
    .map((t) => t.trim())
    .filter(
      (t) => t.length >= 4 && !STOPWORD.has(t.toLowerCase()),
    );
}

/**
 * Возвращает регулярку, матчащую любое из ключевых слов партнёра целиком
 * (с word-boundary), без ложных совпадений по подстроке. Возвращает null,
 * если ни одного значимого слова нет (ставим тогда блок не показывается).
 */
export function partnerMentionRegex(title: string): RegExp | null {
  const tokens = partnerSearchTokens(title);
  if (!tokens.length) return null;
  return new RegExp(
    `(?:^|[^а-яёa-z0-9])(${tokens.map(escapeRe).join("|")})(?=[^а-яёa-z0-9]|$)`,
    "i",
  );
}
