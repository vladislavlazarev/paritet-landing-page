import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { Carousel } from "@/components/site/carousel";
import { LocaleProvider } from "@/lib/i18n/locale-context";
import { HtmlLangEffect } from "@/components/site/html-lang-effect";
import {
  SERVICES,
  type ServiceBlock,
  getCategoryH1,
  getCategoryServices,
  getCategoryVisual,
  getServiceBySlug,
  SERVICE_CATEGORIES,
} from "@/lib/services";
import { CATEGORY_LABEL, getPortfolioByCategory } from "@/lib/portfolio";
import {
  buildMeta,
  breadcrumbJsonLd,
  faqJsonLd,
  serviceJsonLd,
  localizedAbsoluteUrl,
} from "@/lib/seo";
import { getFaq } from "@/data/service-faq";
import { FaqAccordion } from "@/components/site/faq";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/config";
import { p } from "@/lib/i18n/paths";

const LOCALES_HERE: Locale[] = ["en", "zh"];

const SERVICE_TO_PORTFOLIO_CATEGORY: Record<string, string> = {
  "korporativnye-meroprijatija": "corporate",
  timbilding: "teambuilding",
  kontserty: "concerts",
  "chastnye-meropriyatiya": "private",
  "delovye-meropriyatiya": "business",
};

const SECTION_LABELS: Record<Locale, {
  steps: string;
  formats: string;
  whatsIn: string;
  photos: string;
  liveLook: string;
  faq: string;
  faqHeading: string;
  delivered: string;
  asItHappened: string;
  allProjects: string;
  fromBrief: string;
  servicesEyebrow: string;
}> = {
  ru: {
    steps: "Этапы работы",
    formats: "Форматы",
    whatsIn: "Что входит в категорию",
    photos: "Фотографии",
    liveLook: "Как это выглядит вживую",
    faq: "Часто задаваемые вопросы",
    faqHeading: "Что нужно знать перед заказом",
    delivered: "Реализованные проекты",
    asItHappened: "Как это было",
    allProjects: "Все проекты →",
    fromBrief: "От первого брифа до получения обратной связи — берём на себя всю организацию.",
    servicesEyebrow: "Услуги",
  },
  en: {
    steps: "How we work",
    formats: "Formats",
    whatsIn: "What's included in this category",
    photos: "Photos",
    liveLook: "How it looks live",
    faq: "Frequently asked questions",
    faqHeading: "What to know before booking",
    delivered: "Delivered projects",
    asItHappened: "How it went",
    allProjects: "All projects →",
    fromBrief: "From the first brief to post-event feedback — we handle the entire production.",
    servicesEyebrow: "Services",
  },
  zh: {
    steps: "工作流程",
    formats: "形式",
    whatsIn: "本分类包含的内容",
    photos: "照片",
    liveLook: "现场实景",
    faq: "常见问题",
    faqHeading: "下单前需要了解的事项",
    delivered: "已完成项目",
    asItHappened: "活动回顾",
    allProjects: "全部项目 →",
    fromBrief: "从首次需求沟通到活动后反馈,我们承担全部组织工作。",
    servicesEyebrow: "服务",
  },
};

const PHONE_LABEL: Record<Locale, string> = { ru: "Позвонить", en: "Call us", zh: "致电" };

export function generateStaticParams() {
  return LOCALES_HERE.flatMap((slug) =>
    SERVICES.map((s) => ({ slug, item: s.slug })),
  );
}

export const dynamicParams = false;

function isLoc(s: string): s is Locale {
  return s === "en" || s === "zh";
}

export async function generateMetadata(
  props: PageProps<"/[slug]/services/[item]">,
): Promise<Metadata> {
  const { slug, item } = await props.params;
  if (!isLoc(slug)) return {};
  const svc = getServiceBySlug(item);
  if (!svc) return {};
  const dict = await getDictionary(slug);
  const title = svc.seo?.seoTitle?.trim() || svc.title;
  const description =
    svc.seo?.metaDescription?.trim() ||
    svc.seo?.ogDescription?.trim() ||
    svc.description?.slice(0, 200);
  return buildMeta({
    path: `/services/${svc.slug}`,
    locale: slug,
    title: `${title} — ${dict.servicesPage.title}`,
    description,
    image: svc.image,
    type: "website",
  });
}

type Section =
  | { kind: "content"; heading?: string; items: ServiceBlock[] }
  | { kind: "steps"; title: string; items: { title: string; body: string }[] };

function buildSections(blocks: ServiceBlock[]): Section[] {
  const out: Section[] = [];
  let current: { kind: "content"; heading?: string; items: ServiceBlock[] } = {
    kind: "content",
    items: [],
  };
  const flush = () => {
    if (current.items.length || current.heading) out.push(current);
    current = { kind: "content", items: [] };
  };
  for (const b of blocks) {
    if (b.kind === "steps") {
      flush();
      out.push({ kind: "steps", title: b.title, items: b.items });
      continue;
    }
    if (b.kind === "heading") {
      flush();
      current.heading = b.text;
    } else {
      current.items.push(b);
    }
  }
  flush();
  return out;
}

function BlockBody({ block }: { block: ServiceBlock }) {
  if (block.kind === "paragraph") {
    return (
      <p className="text-[15px] sm:text-[17px] leading-relaxed">
        {block.text}
      </p>
    );
  }
  if (block.kind === "list") {
    return (
      <ul className="space-y-3 text-[15px] sm:text-[17px] leading-relaxed">
        {block.items.map((it, j) => (
          <li key={j} className="flex gap-3">
            <span
              aria-hidden
              className="mt-[0.7em] inline-block h-1.5 w-1.5 rounded-full bg-accent-coral shrink-0"
            />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    );
  }
  return null;
}

export default async function LocaleServiceDetailPage(
  props: PageProps<"/[slug]/services/[item]">,
) {
  const { slug, item } = await props.params;
  if (!isLoc(slug)) notFound();
  const svc = getServiceBySlug(item);
  if (!svc) notFound();
  const locale = slug;
  const dict = await getDictionary(locale);
  const T = SECTION_LABELS[locale];

  const visual = getCategoryVisual(svc.category);
  const isCategory = svc.kind === "category";
  const categoryTitle = SERVICE_CATEGORIES.find(
    (c) => c.slug === svc.category,
  )?.title;
  const subServices = isCategory ? getCategoryServices(svc.slug) : [];

  const portfolioCategory = SERVICE_TO_PORTFOLIO_CATEGORY[svc.category];
  const relatedCases = portfolioCategory
    ? getPortfolioByCategory(
        portfolioCategory as Parameters<typeof getPortfolioByCategory>[0],
        6,
      )
    : [];

  const heroImage = svc.image || svc.images[0];
  const galleryImages = svc.images.slice(1);
  const sections = buildSections(svc.body).filter(
    (g, idx) =>
      !(
        idx === 0 &&
        g.kind === "content" &&
        g.heading &&
        g.heading.trim() === svc.title.trim()
      ),
  );

  const serviceSchema = serviceJsonLd({
    url: `/${locale}/services/${svc.slug}`,
    title: svc.title,
    description:
      svc.seo?.metaDescription?.trim() || svc.description?.slice(0, 300),
    image: heroImage,
    inLanguage: "ru-RU",
  });
  const faq = getFaq(svc.slug);
  const faqSchema = faq && faq.length > 0 ? faqJsonLd(faq) : null;
  const breadcrumbs = breadcrumbJsonLd([
    { name: dict.longRead.breadcrumbHome, url: localizedAbsoluteUrl(locale, "/") },
    { name: dict.longRead.breadcrumbServices, url: localizedAbsoluteUrl(locale, "/services") },
    ...(isCategory
      ? [{ name: svc.title, url: localizedAbsoluteUrl(locale, `/services/${svc.slug}`) }]
      : [
          ...(categoryTitle
            ? [{ name: categoryTitle, url: localizedAbsoluteUrl(locale, `/services/${svc.category}`) }]
            : []),
          { name: svc.title, url: localizedAbsoluteUrl(locale, `/services/${svc.slug}`) },
        ]),
  ]);

  return (
    <LocaleProvider locale={locale} dict={dict}>
      <HtmlLangEffect locale={locale} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <Header />
      <main className="flex-1">
        <section className="relative isolate overflow-hidden bg-[#0a0b0d] text-white min-h-[100svh] flex items-end pt-28 sm:pt-32 lg:pt-36 pb-10 sm:pb-12 lg:pb-16">
          {heroImage && (
            <Image
              src={heroImage}
              alt=""
              fill
              priority
              sizes="100vw"
              className="absolute inset-0 -z-20 object-cover"
            />
          )}
          <div aria-hidden className="absolute inset-0 -z-10 bg-black/55" />
          <div
            aria-hidden
            className="absolute inset-0 -z-10"
            style={{
              backgroundImage:
                "radial-gradient(900px 600px at 80% 25%, rgba(120,40,200,0.38), transparent 60%), linear-gradient(180deg, transparent 0%, rgba(10,11,13,0.55) 55%, rgba(10,11,13,0.92) 100%)",
            }}
          />

          <div className="container-page w-full">
            <div className="max-w-4xl">
              {!isCategory && categoryTitle && (
                <Link
                  href={p(locale, `/services/${svc.category}`)}
                  className="inline-block text-[12px] sm:text-[13px] tracking-[0.28em] uppercase text-white/65 hover:text-accent-coral transition-colors mb-4 sm:mb-5"
                >
                  ← {categoryTitle}
                </Link>
              )}
              {isCategory && (
                <span className="inline-block text-[12px] sm:text-[13px] tracking-[0.28em] uppercase text-white/55 mb-4 sm:mb-5">
                  {T.servicesEyebrow}
                </span>
              )}

              <h1 lang="ru" className="font-heading text-[32px] sm:text-[44px] md:text-[56px] lg:text-[72px] leading-[1.05] tracking-[-0.025em] text-white">
                {isCategory ? getCategoryH1(svc.slug) || svc.title : svc.title}
              </h1>

              {(svc.leadIntro || svc.description) && (
                <p lang="ru" className="mt-4 sm:mt-5 max-w-3xl text-[15px] sm:text-[16px] lg:text-[17px] leading-relaxed text-white/85">
                  {svc.leadIntro || svc.description}
                </p>
              )}

              <p className="mt-5 max-w-3xl text-[13px] leading-relaxed text-white/65 border-l-2 border-accent-coral/50 pl-4">
                {dict.longRead.contentLanguageNotice}
              </p>

              <div className="mt-6 sm:mt-7 flex flex-wrap items-center gap-3">
                <a
                  href="tel:+79214102121"
                  className="inline-flex h-11 sm:h-12 items-center gap-2 rounded-full bg-accent-coral px-5 sm:px-6 text-[14px] font-semibold text-white hover:bg-accent-coral-strong transition-colors"
                >
                  {PHONE_LABEL[locale]}
                </a>
                <a
                  href="tel:+79214102121"
                  className="inline-flex h-11 sm:h-12 items-center rounded-full border border-white/25 hover:bg-white/10 transition-colors px-5 sm:px-6 text-[14px] font-medium text-white"
                >
                  +7 (921) 410-21-21
                </a>
              </div>
            </div>
          </div>
        </section>

        {sections.length > 0 && (
          <section className="relative bg-white text-ink">
            <div className="container-page py-16 sm:py-24 lg:py-32">
              <div className="flex flex-col gap-14 sm:gap-20 lg:gap-24">
                {sections.map((g, idx) => {
                  if (g.kind === "steps") {
                    return (
                      <div key={idx} className="max-w-[1200px] mx-auto w-full">
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 sm:gap-10 mb-10 sm:mb-14 lg:mb-16">
                          <div className="max-w-xl">
                            <p className="text-[11px] sm:text-[12px] tracking-[0.28em] uppercase text-muted-fg">
                              {T.steps}
                            </p>
                            <h2 lang="ru" className="mt-4 font-heading text-[28px] sm:text-[40px] md:text-[52px] leading-[1.05] tracking-[-0.025em] text-ink">
                              {g.title}
                            </h2>
                          </div>
                          <p className="max-w-sm text-[14px] sm:text-[15px] leading-relaxed text-body">
                            {T.fromBrief}
                          </p>
                        </div>
                        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
                          {g.items.map((s, i) => (
                            <li key={i} className="rounded-[20px] bg-surface-soft p-6 sm:p-8 ring-1 ring-hairline flex flex-col">
                              <span className="font-heading text-[36px] sm:text-[52px] lg:text-[64px] leading-none tracking-[-0.03em] text-brand">
                                {String(i + 1).padStart(2, "0")}
                              </span>
                              <h3 lang="ru" className="mt-5 sm:mt-6 text-[18px] sm:text-[20px] leading-snug font-medium text-ink">
                                {s.title}
                              </h3>
                              <p lang="ru" className="mt-3 text-[14px] sm:text-[15px] leading-relaxed text-body">
                                {s.body}
                              </p>
                            </li>
                          ))}
                        </ol>
                      </div>
                    );
                  }
                  return (
                    <div key={idx} className="max-w-[920px] mx-auto w-full" lang="ru">
                      {g.heading && (
                        <h2 className="font-heading text-[22px] sm:text-[30px] lg:text-[36px] leading-[1.15] tracking-[-0.02em] text-ink">
                          {g.heading}
                        </h2>
                      )}
                      <div className={`${g.heading ? "mt-5 sm:mt-7" : ""} space-y-5 text-body`}>
                        {g.items.map((b, j) => (
                          <BlockBody key={j} block={b} />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {isCategory && subServices.length > 0 && (
          <section className="relative bg-surface-soft text-ink">
            <div className="container-page py-16 sm:py-24 lg:py-32">
              <div className="max-w-xl mb-10 sm:mb-14 lg:mb-16">
                <p className="text-[11px] sm:text-[12px] tracking-[0.28em] uppercase text-muted-fg">
                  {T.formats}
                </p>
                <h2 className="mt-4 font-heading text-[28px] sm:text-[40px] md:text-[52px] leading-[1.05] tracking-[-0.025em] text-ink">
                  {T.whatsIn}
                </h2>
              </div>

              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
                {subServices.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={p(locale, `/services/${s.slug}`)}
                      className="group block rounded-[20px] overflow-hidden ring-1 ring-hairline bg-white transition-shadow hover:shadow-[0_18px_50px_-30px_rgba(31,26,85,0.35)]"
                    >
                      <div
                        className="aspect-[4/3] relative overflow-hidden"
                        style={{ background: visual.gradient }}
                      >
                        {s.image && (
                          <Image
                            src={s.image}
                            alt={s.title}
                            fill
                            sizes="(min-width:1024px) 380px, (min-width:640px) 50vw, 100vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                          />
                        )}
                      </div>
                      <div className="px-6 sm:px-7 py-5 sm:py-6">
                        <h3 lang="ru" className="text-[18px] sm:text-[20px] leading-snug text-ink">
                          {s.title}
                        </h3>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {galleryImages.length > 0 && (
          <section
            className="relative bg-brand text-white overflow-hidden"
            style={{
              backgroundImage:
                "radial-gradient(1000px 600px at 85% 10%, rgba(120,40,200,0.45), transparent 60%), radial-gradient(800px 500px at 0% 90%, rgba(238,59,86,0.22), transparent 60%)",
            }}
          >
            <div className="container-page py-16 sm:py-24 lg:py-32">
              <div className="max-w-3xl mb-10 sm:mb-14">
                <p className="text-[11px] sm:text-[12px] tracking-[0.28em] uppercase text-white/55">
                  {T.photos}
                </p>
                <h2 className="mt-4 font-heading text-[28px] sm:text-[40px] md:text-[52px] leading-[1.05] tracking-[-0.025em] text-white">
                  {T.liveLook}
                </h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                {galleryImages.slice(0, 8).map((src, i) => (
                  <div
                    key={i}
                    className="relative aspect-[4/3] rounded-[14px] overflow-hidden ring-1 ring-white/10"
                  >
                    <Image src={src} alt="" fill sizes="(min-width: 640px) 25vw, 50vw" className="object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {faq && faq.length > 0 && (
          <section className="bg-surface-soft">
            <div className="container-page py-14 sm:py-20 lg:py-24">
              <div className="max-w-4xl">
                <p className="text-[11px] sm:text-[12px] tracking-[0.28em] uppercase text-muted-fg">
                  {T.faq}
                </p>
                <h2 className="mt-4 font-heading text-[26px] sm:text-[36px] lg:text-[44px] leading-[1.05] tracking-[-0.025em] text-ink">
                  {T.faqHeading}
                </h2>
                <div className="mt-8 sm:mt-10" lang="ru">
                  <FaqAccordion items={faq} />
                </div>
              </div>
            </div>
          </section>
        )}

        {relatedCases.length > 0 && (
          <section className="relative bg-white text-ink overflow-hidden">
            <div className="container-page pt-16 sm:pt-24 lg:pt-32 pb-8 sm:pb-12">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 sm:gap-6">
                <div className="max-w-xl">
                  <p className="text-[11px] sm:text-[12px] tracking-[0.28em] uppercase text-muted-fg">
                    {T.delivered}
                  </p>
                  <h2 className="mt-4 font-heading text-[28px] sm:text-[40px] md:text-[52px] leading-[1.05] tracking-[-0.025em] text-ink">
                    {T.asItHappened}
                  </h2>
                </div>
                <Link
                  href={p(locale, "/portfolio")}
                  className="inline-flex h-12 items-center rounded-full border border-hairline px-5 text-[14px] font-medium text-ink hover:bg-surface-soft transition-colors self-start sm:self-auto"
                >
                  {T.allProjects}
                </Link>
              </div>
            </div>

            <div className="container-page-left pb-16 sm:pb-24 lg:pb-32">
              <Carousel
                showCount
                controlsTone="light"
                bleed="bleed-right"
                itemClassName="w-[80vw] sm:w-[44vw] lg:w-[28vw] max-w-[420px]"
              >
                {relatedCases.map((c) => (
                  <Link
                    key={c.slug}
                    href={p(locale, `/portfolio/${c.slug}`)}
                    className="block bg-white text-ink rounded-[24px] overflow-hidden ring-1 ring-hairline transition-transform hover:-translate-y-1"
                  >
                    <div
                      className="aspect-[4/3] relative overflow-hidden"
                      style={{ background: c.cover.gradient }}
                    >
                      {c.coverImage && (
                        <Image
                          src={c.coverImage}
                          alt={c.title}
                          fill
                          sizes="(min-width:1024px) 380px, (min-width:640px) 44vw, 80vw"
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="p-7">
                      <p className="text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-muted-fg">
                        {CATEGORY_LABEL[c.category]}
                      </p>
                      <h3 lang="ru" className="mt-2 text-[18px] sm:text-[20px] leading-snug font-medium text-ink">
                        {c.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </Carousel>
            </div>
          </section>
        )}

        <section className="bg-white">
          <div className="container-page pb-16 sm:pb-20 lg:pb-24">
            <div
              className="rounded-[20px] sm:rounded-[28px] px-5 sm:px-12 lg:px-20 py-10 sm:py-16 lg:py-24 text-white relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, #1f1a55 0%, #2a1a78 60%, #3a107a 100%)",
              }}
            >
              <div className="relative max-w-3xl">
                <h2 className="font-heading text-[32px] sm:text-[48px] md:text-[64px] leading-[1.04] tracking-[-0.025em]">
                  {dict.contact.title}
                </h2>
                <p className="mt-5 sm:mt-7 text-[15px] sm:text-[16px] leading-relaxed text-white/80 max-w-lg">
                  {dict.contact.sub}
                </p>

                <div className="mt-8 sm:mt-10 space-y-2 sm:space-y-3">
                  <a href="tel:+79214102121" className="block font-heading text-[24px] sm:text-[40px] md:text-[52px] leading-none tracking-[-0.02em] hover:text-accent-coral transition-colors">
                    +7 (921) 410-21-21
                  </a>
                  <a href="tel:+79219519282" className="block font-heading text-[24px] sm:text-[40px] md:text-[52px] leading-none tracking-[-0.02em] hover:text-accent-coral transition-colors">
                    +7 (921) 951-92-82
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer dict={dict} locale={locale} />
    </LocaleProvider>
  );
}
