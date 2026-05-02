import rawServices from "@/data/services.json";

export type ServiceKind = "category" | "service";

export type ServiceBlock =
  | { kind: "heading"; text: string }
  | { kind: "paragraph"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "steps"; title: string; items: { title: string; body: string }[] };

export type ServiceFact = { title: string; subtitle: string };

export type SeoMeta = {
  seoTitle?: string;
  metaDescription?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonical?: string;
};

export type Service = {
  kind: ServiceKind;
  slug: string;
  title: string;
  description: string;
  /** Slug of the parent category. For categories, equals their own slug. */
  category: string;
  body: ServiceBlock[];
  images: string[];
  /** Convenience alias for images[0]. */
  image?: string;
  /** Hero lead paragraph from the source site (replaces SEO description above the fold). */
  leadIntro?: string;
  /** Short hero facts (e.g. "длительность · от 2 до 8 часов"). */
  leadFacts: ServiceFact[];
  seo: SeoMeta;
  sourceUrl?: string;
};

type RawServiceEntry = {
  kind: ServiceKind;
  slug: string;
  title: string;
  description: string;
  category: string;
  sourceUrl: string;
  body?: Array<
    | { kind: "heading"; text: string }
    | { kind: "paragraph"; text: string }
    | { kind: "list"; items: string[] }
  >;
  images?: string[];
  image?: string;
  leadIntro?: string;
  leadFacts?: ServiceFact[];
  seo?: SeoMeta;
};

/** Canonical 4-step process used across all services on the source site.
 * The scraper lost the per-step descriptions, so we restore them here. */
const PROCESS_STEPS: { title: string; body: string }[] = [
  {
    title: "Бриф",
    body:
      "Позволяет систематизировать все мысли и пожелания относительно грядущего мероприятия.",
  },
  {
    title: "Уточнение деталей",
    body:
      "Составление общего коммерческого предложения, уточнение всех деталей предстоящего мероприятия для окончательного расчёта, заключение договора.",
  },
  {
    title: "Организация",
    body:
      "Согласование окончательной программы и сметы, предварительная подготовка, решение организационных вопросов.",
  },
  {
    title: "Торжество",
    body:
      "Проведение мероприятия в указанные сроки. Оценка эффективности и получение обратной связи.",
  },
];

function looksLikeSubheading(text: string) {
  const t = text.trim();
  if (t.length < 8 || t.length > 80) return false;
  if (/[.!?…;]\s*$/.test(t)) return false;
  if (!/^[А-ЯЁA-Z]/.test(t)) return false;
  // Avoid converting all-caps interjections or single words.
  return t.split(/\s+/).length >= 2;
}

function tidyBlocks(raw: RawServiceEntry["body"] = []): ServiceBlock[] {
  const cleaned = (raw || [])
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

  // Reclassify mistyped subheadings: a short, title-cased paragraph immediately
  // followed by a long descriptive paragraph is almost certainly an H3 the
  // scraper misread as <p>.
  for (let i = 0; i < cleaned.length - 1; i++) {
    const cur = cleaned[i];
    const next = cleaned[i + 1];
    if (
      cur.kind === "paragraph" &&
      next.kind === "paragraph" &&
      looksLikeSubheading(cur.text) &&
      next.text.length > 100
    ) {
      cleaned[i] = { kind: "heading", text: cur.text };
    }
  }

  // Detect the broken "Организация → Бриф/Уточнение деталей/Организация/<finale>"
  // sequence and collapse it into a steps block. Two finale variants in the data:
  //   A: …/Организация/Торжество              (5 headings total)
  //   B: …/Организация/Проведение/Итоги       (6 headings total — corporate page)
  // Both render as the same canonical 4-step process.
  const headingText = (b: ServiceBlock) =>
    b.kind === "heading" ? b.text.trim() : null;
  const out: ServiceBlock[] = [];
  for (let i = 0; i < cleaned.length; i++) {
    const w = (n: number) => headingText(cleaned[i + n] ?? ({} as ServiceBlock));
    const prefixOk =
      w(0) === "Организация" &&
      w(1) === "Бриф" &&
      w(2) === "Уточнение деталей" &&
      w(3) === "Организация";
    let consumed = 0;
    if (prefixOk && w(4) === "Торжество") consumed = 5;
    else if (prefixOk && w(4) === "Проведение" && w(5) === "Итоги") consumed = 6;
    if (consumed > 0) {
      out.push({ kind: "steps", title: "Организация", items: PROCESS_STEPS });
      i += consumed - 1;
      continue;
    }
    out.push(cleaned[i]);
  }
  return out;
}

function adapt(raw: RawServiceEntry): Service {
  const images = (raw.images || []).filter(Boolean);
  const leadFacts = (raw.leadFacts || []).filter(
    (f) => f && (f.title || f.subtitle),
  );
  return {
    kind: raw.kind,
    slug: raw.slug,
    title: raw.title,
    description: raw.description,
    category: raw.category,
    body: tidyBlocks(raw.body),
    images,
    image: raw.image || images[0],
    leadIntro: raw.leadIntro?.trim() || undefined,
    leadFacts,
    seo: raw.seo || {},
    sourceUrl: raw.sourceUrl,
  };
}

export const SERVICE_CATEGORIES: { slug: string; title: string }[] = [
  { slug: "korporativnye-meroprijatija", title: "Корпоративные мероприятия" },
  { slug: "timbilding", title: "Тимбилдинги" },
  { slug: "kontserty", title: "Концерты" },
  { slug: "chastnye-meropriyatiya", title: "Частные мероприятия" },
  { slug: "delovye-meropriyatiya", title: "Деловые мероприятия" },
  { slug: "uslugi-onlajn", title: "Услуги онлайн" },
];

const CATEGORY_VISUALS: Record<string, { emoji: string; gradient: string }> = {
  "korporativnye-meroprijatija": {
    emoji: "🥂",
    gradient: "linear-gradient(135deg, #1f1a55 0%, #2a1a78 55%, #3a107a 100%)",
  },
  timbilding: {
    emoji: "🌲",
    gradient: "linear-gradient(135deg, #0c4421 0%, #2d6a3e 55%, #80c39a 100%)",
  },
  kontserty: {
    emoji: "♪",
    gradient: "linear-gradient(135deg, #5a0f2c 0%, #aa1d4a 60%, #e94570 100%)",
  },
  "chastnye-meropriyatiya": {
    emoji: "🎩",
    gradient: "linear-gradient(135deg, #4a1574 0%, #7826b8 55%, #a256e0 100%)",
  },
  "delovye-meropriyatiya": {
    emoji: "◆",
    gradient: "linear-gradient(135deg, #0d0a3a 0%, #1f1a55 55%, #4a3fbf 100%)",
  },
  "uslugi-onlajn": {
    emoji: "📡",
    gradient: "linear-gradient(135deg, #a01030 0%, #d2243f 50%, #ee3b56 100%)",
  },
};

export function getCategoryVisual(slug: string) {
  return (
    CATEGORY_VISUALS[slug] ?? {
      emoji: "✦",
      gradient: "linear-gradient(135deg, #1f1a55 0%, #2a1a78 55%, #3a107a 100%)",
    }
  );
}

export const SERVICES: Service[] = (rawServices as RawServiceEntry[]).map(
  adapt,
);

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function getCategoryServices(categorySlug: string): Service[] {
  return SERVICES.filter(
    (s) => s.kind === "service" && s.category === categorySlug,
  );
}

export function getCategory(slug: string): Service | undefined {
  return SERVICES.find((s) => s.kind === "category" && s.slug === slug);
}
