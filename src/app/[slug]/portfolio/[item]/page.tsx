import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { LocaleProvider } from "@/lib/i18n/locale-context";
import { HtmlLangEffect } from "@/components/site/html-lang-effect";
import {
  CATEGORY_LABEL,
  PORTFOLIO,
  PORTFOLIO_TO_SERVICE_CATEGORY,
  type PortfolioBlock,
  getNextPortfolio,
  getPortfolioBySlug,
  getRelatedPortfolio,
} from "@/lib/portfolio";
import {
  buildMeta,
  articleJsonLd,
  breadcrumbJsonLd,
  localizedAbsoluteUrl,
} from "@/lib/seo";
import { SERVICE_CATEGORIES } from "@/lib/services";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/config";
import { p } from "@/lib/i18n/paths";

const LOCALES_HERE: Locale[] = ["en", "zh"];

export function generateStaticParams() {
  return LOCALES_HERE.flatMap((slug) =>
    PORTFOLIO.map((e) => ({ slug, item: e.slug })),
  );
}

export const dynamicParams = false;

function isLoc(s: string): s is Locale {
  return s === "en" || s === "zh";
}

export async function generateMetadata(
  props: PageProps<"/[slug]/portfolio/[item]">,
): Promise<Metadata> {
  const { slug, item } = await props.params;
  if (!isLoc(slug)) return {};
  const event = getPortfolioBySlug(item);
  if (!event) return {};
  const dict = await getDictionary(slug);
  const firstParagraph = event.body.find((b) => b.kind === "paragraph");
  const title = event.seo?.seoTitle?.trim() || event.title;
  const description =
    event.seo?.metaDescription?.trim() ||
    event.seo?.ogDescription?.trim() ||
    (firstParagraph ? firstParagraph.text.slice(0, 200) : undefined);
  return buildMeta({
    path: `/portfolio/${event.slug}`,
    locale: slug,
    title: `${title} — ${dict.portfolioPage.title}`,
    description,
    image: event.coverImage,
    type: "article",
  });
}

function BlockView({ block }: { block: PortfolioBlock }) {
  if (block.kind === "heading") {
    return (
      <h2 className="font-heading text-[22px] sm:text-[30px] lg:text-[36px] leading-[1.15] tracking-[-0.02em] text-brand mt-8 sm:mt-12">
        {block.text}
      </h2>
    );
  }
  if (block.kind === "paragraph" || block.kind === "lead") {
    return (
      <p className="text-[15px] sm:text-[17px] leading-relaxed text-body">
        {block.text}
      </p>
    );
  }
  return (
    <ul className="space-y-2 text-[15px] sm:text-[17px] leading-relaxed text-body">
      {block.items.map((it, j) => (
        <li key={j} className="flex gap-3">
          <span aria-hidden className="text-accent-coral mt-2 inline-block h-1.5 w-1.5 rounded-full shrink-0" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

const RELATED_HEADING: Record<Locale, string> = {
  ru: "Похожие проекты",
  en: "Related projects",
  zh: "相关项目",
};

const NEXT_LABEL: Record<Locale, string> = {
  ru: "Следующее мероприятие",
  en: "Next event",
  zh: "下一个活动",
};

const ALL_CASES: Record<Locale, string> = {
  ru: "Все услуги",
  en: "All services",
  zh: "全部服务",
};

export default async function LocalePortfolioEventPage(
  props: PageProps<"/[slug]/portfolio/[item]">,
) {
  const { slug, item } = await props.params;
  if (!isLoc(slug)) notFound();
  const event = getPortfolioBySlug(item);
  if (!event) notFound();
  const locale = slug;
  const dict = await getDictionary(locale);

  const next = getNextPortfolio(item);
  const heroImage = event.images[0];
  const heroSmall = event.images.slice(1, 5);
  const restImages = event.images.slice(5);
  const serviceSlug = PORTFOLIO_TO_SERVICE_CATEGORY[event.category];
  const serviceTitle = SERVICE_CATEGORIES.find((c) => c.slug === serviceSlug)
    ?.title;
  const related = getRelatedPortfolio(item, event.category, 4);

  const firstParagraph = event.body.find((b) => b.kind === "paragraph");
  const articleSchema = articleJsonLd({
    url: `/${locale}/portfolio/${event.slug}`,
    title: event.title,
    description:
      event.seo?.metaDescription?.trim() ||
      (firstParagraph ? firstParagraph.text.slice(0, 200) : undefined),
    image: heroImage,
    inLanguage: "ru-RU",
  });
  const breadcrumbs = breadcrumbJsonLd([
    { name: dict.longRead.breadcrumbHome, url: localizedAbsoluteUrl(locale, "/") },
    { name: dict.longRead.breadcrumbPortfolio, url: localizedAbsoluteUrl(locale, "/portfolio") },
    { name: event.title, url: localizedAbsoluteUrl(locale, `/portfolio/${event.slug}`) },
  ]);

  return (
    <LocaleProvider locale={locale} dict={dict}>
      <HtmlLangEffect locale={locale} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <Header />
      <main className="flex-1">
        <section
          className="relative bg-brand text-white overflow-hidden"
          style={{
            backgroundImage:
              "radial-gradient(1000px 600px at 80% 0%, rgba(120,40,200,0.55), transparent 60%), radial-gradient(800px 500px at 0% 100%, rgba(238,59,86,0.25), transparent 60%)",
          }}
        >
          <div className="container-page pt-24 sm:pt-36 lg:pt-48 pb-10 sm:pb-16 lg:pb-20">
            <div className="grid grid-cols-[auto,1fr] gap-x-4 sm:gap-x-10 lg:gap-x-14 items-start">
              <Link
                href={p(locale, "/portfolio")}
                aria-label={dict.longRead.backToPortfolio}
                className="mt-3 sm:mt-5 grid h-12 w-12 sm:h-14 sm:w-14 place-items-center rounded-full text-white hover:bg-white/10 transition-colors"
              >
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 8L10 18l12 10" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M10 18h22" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <div>
                {serviceSlug ? (
                  <Link
                    href={p(locale, `/services/${serviceSlug}`)}
                    className="text-[12px] sm:text-[13px] tracking-[0.28em] uppercase text-white/65 hover:text-accent-coral transition-colors"
                  >
                    ← {CATEGORY_LABEL[event.category]}
                  </Link>
                ) : (
                  <p className="text-[12px] sm:text-[13px] tracking-[0.28em] uppercase text-white/55">
                    {CATEGORY_LABEL[event.category]}
                  </p>
                )}
                <h1
                  lang="ru"
                  className="mt-3 font-heading text-[32px] sm:text-[44px] md:text-[56px] lg:text-[72px] leading-[1.05] tracking-[-0.025em] text-white"
                >
                  {event.title}
                </h1>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="container-page pt-10 sm:pt-14 lg:pt-16 pb-10 sm:pb-14">
            {heroImage && (
              <div
                className="relative w-full overflow-hidden rounded-[20px] sm:rounded-[24px]"
                style={{ aspectRatio: "16 / 7" }}
              >
                <Image
                  src={heroImage}
                  alt={event.title}
                  fill
                  priority
                  sizes="(min-width: 1240px) 1240px, 100vw"
                  className="object-cover"
                />
              </div>
            )}

            {heroSmall.length > 0 && (
              <div
                className={`mt-4 sm:mt-5 lg:mt-6 grid ${
                  heroSmall.length === 1
                    ? "grid-cols-1"
                    : heroSmall.length === 2
                      ? "grid-cols-2"
                      : heroSmall.length === 3
                        ? "grid-cols-2 sm:grid-cols-3"
                        : "grid-cols-2 lg:grid-cols-4"
                } gap-3 sm:gap-4 lg:gap-5`}
              >
                {heroSmall.map((src, i) => (
                  <div
                    key={src}
                    className="relative overflow-hidden rounded-[14px] sm:rounded-[18px] ring-1 ring-hairline aspect-square"
                  >
                    <Image
                      src={src}
                      alt={`${event.title} — ${i + 2}`}
                      fill
                      priority={i < 2}
                      sizes="(min-width:1024px) 25vw, (min-width:640px) 33vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="container-page pb-12 sm:pb-16 lg:pb-20">
            <div className="max-w-[760px] mx-auto space-y-5 sm:space-y-6">
              <p className="not-prose mb-2 text-[14px] leading-relaxed text-muted-fg border-l-2 border-accent-coral/40 pl-4">
                {dict.longRead.contentLanguageNotice}
              </p>
              <div lang="ru" className="space-y-5 sm:space-y-6">
                {event.body.map((block, i) => (
                  <BlockView key={i} block={block} />
                ))}
              </div>
            </div>
          </div>

          {restImages.length > 0 && (
            <div className="container-page pb-12 sm:pb-16 lg:pb-20">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
                {restImages.map((src, i) => (
                  <div
                    key={src}
                    className="relative overflow-hidden rounded-[16px] sm:rounded-[20px] ring-1 ring-hairline aspect-[4/3]"
                  >
                    <Image
                      src={src}
                      alt={`${event.title} — ${1 + heroSmall.length + i + 1}`}
                      fill
                      sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {related.length > 0 && (
          <section className="bg-surface-soft">
            <div className="container-page py-12 sm:py-16 lg:py-20">
              <div className="flex flex-wrap items-end justify-between gap-4 mb-8 sm:mb-10">
                <h2 className="font-heading text-[24px] sm:text-[32px] lg:text-[40px] tracking-[-0.02em] text-ink">
                  {RELATED_HEADING[locale]}
                </h2>
                {serviceSlug && serviceTitle && (
                  <Link
                    href={p(locale, `/services/${serviceSlug}`)}
                    className="inline-flex h-12 items-center rounded-full bg-white border border-hairline px-5 text-[14px] font-medium text-ink hover:bg-surface-strong transition-colors"
                  >
                    {ALL_CASES[locale]}: {serviceTitle.toLowerCase()} →
                  </Link>
                )}
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
                {related.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={p(locale, `/portfolio/${c.slug}`)}
                      className="group block bg-white rounded-[18px] overflow-hidden ring-1 ring-hairline hover:shadow-[0_12px_40px_-20px_rgba(31,26,85,0.45)] transition-shadow"
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
                            sizes="(min-width:1024px) 280px, (min-width:640px) 50vw, 100vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          />
                        )}
                      </div>
                      <div className="px-5 py-4 sm:px-6 sm:py-5">
                        <p className="text-[12px] tracking-[0.18em] uppercase text-muted-fg">
                          {CATEGORY_LABEL[c.category]}
                        </p>
                        <h3 lang="ru" className="mt-2 text-[16px] sm:text-[17px] leading-snug text-ink">
                          {c.title}
                        </h3>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <section className="bg-white">
          <div className="container-page py-8 sm:py-12">
            <Link
              href={p(locale, `/portfolio/${next.slug}`)}
              className="group relative block overflow-hidden rounded-[20px] text-white"
              style={{
                background:
                  "linear-gradient(95deg, #0d0a3a 0%, #1f1a55 40%, #2d2683 100%)",
              }}
            >
              <div
                aria-hidden
                className="absolute inset-y-0 left-0 w-1/3"
                style={{
                  backgroundImage:
                    "radial-gradient(420px 240px at 20% 50%, rgba(120,80,210,0.45), transparent 70%)",
                }}
              />
              <div className="relative grid grid-cols-1 sm:grid-cols-[1fr,auto] gap-6 sm:gap-10 items-center px-5 sm:px-10 lg:px-14 py-8 sm:py-14 lg:py-16">
                <div>
                  <p className="text-[14px] text-white/60">
                    {NEXT_LABEL[locale]}
                  </p>
                  <p lang="ru" className="mt-2 font-heading text-[22px] sm:text-[30px] lg:text-[36px] leading-[1.15] tracking-[-0.02em] text-white max-w-[560px]">
                    {next.title}
                  </p>
                </div>
                <span className="inline-flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full ring-1 ring-white/30 transition-transform group-hover:translate-x-1">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </Link>
          </div>
        </section>
      </main>
      <Footer dict={dict} locale={locale} />
    </LocaleProvider>
  );
}
