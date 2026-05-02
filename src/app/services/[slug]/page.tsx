import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { Carousel } from "@/components/site/carousel";
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
} from "@/lib/seo";
import { getFaq } from "@/data/service-faq";
import { FaqAccordion } from "@/components/site/faq";

const SERVICE_TO_PORTFOLIO_CATEGORY: Record<string, string> = {
  "korporativnye-meroprijatija": "corporate",
  timbilding: "teambuilding",
  kontserty: "concerts",
  "chastnye-meropriyatiya": "private",
  "delovye-meropriyatiya": "business",
};

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(
  props: PageProps<"/services/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const svc = getServiceBySlug(slug);
  if (!svc) return { title: "Услуги — Паритет Events" };
  const title =
    svc.seo?.seoTitle?.trim() || `${svc.title} — Паритет Events`;
  const description =
    svc.seo?.metaDescription?.trim() ||
    svc.seo?.ogDescription?.trim() ||
    svc.description?.slice(0, 200);
  return buildMeta({
    path: `/services/${svc.slug}`,
    title,
    description,
    image: svc.image,
    type: "website",
  });
}

type Section =
  | { kind: "content"; heading?: string; items: ServiceBlock[] }
  | { kind: "steps"; title: string; items: { title: string; body: string }[] };

/** Group blocks by their preceding heading. Steps blocks become standalone sections. */
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

export default async function ServiceDetailPage(
  props: PageProps<"/services/[slug]">,
) {
  const { slug } = await props.params;
  const svc = getServiceBySlug(slug);
  if (!svc) notFound();

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

  // Use first image as hero. Remaining images feed the bento gallery.
  const heroImage = svc.image || svc.images[0];
  const galleryImages = svc.images.slice(1);
  const sections = buildSections(svc.body).filter(
    (g, idx) =>
      // Drop a leading heading that just duplicates the page title.
      !(
        idx === 0 &&
        g.kind === "content" &&
        g.heading &&
        g.heading.trim() === svc.title.trim()
      ),
  );

  const serviceSchema = serviceJsonLd({
    url: `/services/${svc.slug}`,
    title: svc.title,
    description:
      svc.seo?.metaDescription?.trim() || svc.description?.slice(0, 300),
    image: heroImage,
  });
  const faq = getFaq(svc.slug);
  const faqSchema = faq && faq.length > 0 ? faqJsonLd(faq) : null;
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Главная", url: "/" },
    { name: "Услуги", url: "/services" },
    ...(isCategory
      ? [{ name: svc.title, url: `/services/${svc.slug}` }]
      : [
          ...(categoryTitle
            ? [{ name: categoryTitle, url: `/services/${svc.category}` }]
            : []),
          { name: svc.title, url: `/services/${svc.slug}` },
        ]),
  ]);

  return (
    <>
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
        {/* HERO — full-bleed image + dark overlay; targets ~100svh, grows for long content */}
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
          {/* Base darken — guarantees contrast regardless of source image */}
          <div aria-hidden className="absolute inset-0 -z-10 bg-black/55" />
          {/* Brand colour wash + bottom fade — atmosphere, not a flat tint */}
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
                  href={`/services/${svc.category}`}
                  className="inline-block text-[12px] sm:text-[13px] tracking-[0.28em] uppercase text-white/65 hover:text-accent-coral transition-colors mb-4 sm:mb-5"
                >
                  ← {categoryTitle}
                </Link>
              )}
              {isCategory && (
                <span className="inline-block text-[12px] sm:text-[13px] tracking-[0.28em] uppercase text-white/55 mb-4 sm:mb-5">
                  Услуги
                </span>
              )}

              <h1 className="font-heading text-[32px] sm:text-[44px] md:text-[56px] lg:text-[72px] leading-[1.05] tracking-[-0.025em] text-white">
                {isCategory ? getCategoryH1(svc.slug) || svc.title : svc.title}
              </h1>

              {(svc.leadIntro || svc.description) && (
                <p className="mt-4 sm:mt-5 max-w-3xl text-[15px] sm:text-[16px] lg:text-[17px] leading-relaxed text-white/85">
                  {svc.leadIntro || svc.description}
                </p>
              )}

              <div className="mt-6 sm:mt-7 flex flex-wrap items-center gap-3">
                <a
                  href="tel:+79214102121"
                  className="inline-flex h-11 sm:h-12 items-center gap-2 rounded-full bg-accent-coral px-5 sm:px-6 text-[14px] font-semibold text-white hover:bg-accent-coral-strong transition-colors"
                >
                  Позвонить
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      d="M5 12h14M13 6l6 6-6 6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
                <a
                  href="tel:+79214102121"
                  className="inline-flex h-11 sm:h-12 items-center rounded-full border border-white/25 hover:bg-white/10 transition-colors px-5 sm:px-6 text-[14px] font-medium text-white"
                >
                  +7 (921) 410-21-21
                </a>

                {/* Inline facts on md+ — shares the row with CTAs to save vertical space */}
                {svc.leadFacts.length > 0 && (
                  <ul className="hidden md:flex flex-wrap items-center gap-x-7 lg:gap-x-9 ml-2 lg:ml-3 pl-5 lg:pl-7 border-l border-white/20">
                    {svc.leadFacts.map((f, i) => (
                      <li key={i} className="flex flex-col leading-tight">
                        <span className="font-heading text-[15px] lg:text-[16px] tracking-[-0.01em] text-white whitespace-nowrap">
                          {f.title}
                        </span>
                        <span className="mt-0.5 text-[11px] lg:text-[12px] tracking-[0.04em] text-white/55 whitespace-nowrap">
                          {f.subtitle}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Stacked facts on mobile only */}
              {svc.leadFacts.length > 0 && (
                <ul className="md:hidden mt-5 flex flex-wrap gap-x-6 gap-y-3 pt-4 border-t border-white/15">
                  {svc.leadFacts.map((f, i) => (
                    <li key={i} className="flex flex-col leading-tight">
                      <span className="font-heading text-[15px] tracking-[-0.01em] text-white">
                        {f.title}
                      </span>
                      <span className="mt-0.5 text-[11px] tracking-[0.04em] text-white/55">
                        {f.subtitle}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>

        {/* BODY — text sections + steps rendered as cards */}
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
                              Этапы работы
                            </p>
                            <h2 className="mt-4 font-heading text-[28px] sm:text-[40px] md:text-[52px] leading-[1.05] tracking-[-0.025em] text-ink">
                              {g.title}
                            </h2>
                          </div>
                          <p className="max-w-sm text-[14px] sm:text-[15px] leading-relaxed text-body">
                            От первого брифа до получения обратной связи — берём на себя всю организацию.
                          </p>
                        </div>
                        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
                          {g.items.map((s, i) => (
                            <li
                              key={i}
                              className="rounded-[20px] bg-surface-soft p-6 sm:p-8 ring-1 ring-hairline flex flex-col"
                            >
                              <span className="font-heading text-[36px] sm:text-[52px] lg:text-[64px] leading-none tracking-[-0.03em] text-brand">
                                {String(i + 1).padStart(2, "0")}
                              </span>
                              <h3 className="mt-5 sm:mt-6 text-[18px] sm:text-[20px] leading-snug font-medium text-ink">
                                {s.title}
                              </h3>
                              <p className="mt-3 text-[14px] sm:text-[15px] leading-relaxed text-body">
                                {s.body}
                              </p>
                            </li>
                          ))}
                        </ol>
                      </div>
                    );
                  }
                  return (
                    <div key={idx} className="max-w-[920px] mx-auto w-full">
                      {g.heading && (
                        <h2 className="font-heading text-[22px] sm:text-[30px] lg:text-[36px] leading-[1.15] tracking-[-0.02em] text-ink">
                          {g.heading}
                        </h2>
                      )}
                      <div
                        className={`${g.heading ? "mt-5 sm:mt-7" : ""} space-y-5 text-body`}
                      >
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

        {/* SUB-SERVICES — only for category pages */}
        {isCategory && subServices.length > 0 && (
          <section className="relative bg-surface-soft text-ink">
            <div className="container-page py-16 sm:py-24 lg:py-32">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-14 lg:mb-16">
                <div className="max-w-xl">
                  <p className="text-[11px] sm:text-[12px] tracking-[0.28em] uppercase text-muted-fg">
                    Форматы
                  </p>
                  <h2 className="mt-4 font-heading text-[28px] sm:text-[40px] md:text-[52px] leading-[1.05] tracking-[-0.025em] text-ink">
                    Что входит в&nbsp;категорию
                  </h2>
                </div>
                <p className="max-w-sm text-[14px] sm:text-[15px] leading-relaxed text-body">
                  {subServices.length} формат
                  {getRussianSuffix(subServices.length)} — выберите тот, что
                  подходит вашей задаче, или соберём свой под ключ.
                </p>
              </div>

              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
                {subServices.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${s.slug}`}
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
                        <h3 className="text-[18px] sm:text-[20px] leading-snug text-ink">
                          {s.title}
                        </h3>
                        <div className="mt-5 flex items-center justify-end text-[13px]">
                          <span className="text-brand font-medium group-hover:text-accent-coral transition-colors">
                            Подробнее →
                          </span>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* GALLERY — bento photo grid when we have images */}
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
                  Фотографии
                </p>
                <h2 className="mt-4 font-heading text-[28px] sm:text-[40px] md:text-[52px] leading-[1.05] tracking-[-0.025em] text-white">
                  Как это выглядит вживую
                </h2>
              </div>
              <BentoGrid images={galleryImages} />
            </div>
          </section>
        )}

        {/* FAQ — visible block + FAQPage schema (top-5 services only) */}
        {faq && faq.length > 0 && (
          <section className="bg-surface-soft">
            <div className="container-page py-14 sm:py-20 lg:py-24">
              <div className="max-w-4xl">
                <p className="text-[11px] sm:text-[12px] tracking-[0.28em] uppercase text-muted-fg">
                  Часто задаваемые вопросы
                </p>
                <h2 className="mt-4 font-heading text-[26px] sm:text-[36px] lg:text-[44px] leading-[1.05] tracking-[-0.025em] text-ink">
                  Что нужно знать перед заказом
                </h2>
                <div className="mt-8 sm:mt-10">
                  <FaqAccordion items={faq} />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* RELATED CASES — bleed-right carousel */}
        {relatedCases.length > 0 && (
          <section className="relative bg-white text-ink overflow-hidden">
            <div className="container-page pt-16 sm:pt-24 lg:pt-32 pb-8 sm:pb-12">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 sm:gap-6">
                <div className="max-w-xl">
                  <p className="text-[11px] sm:text-[12px] tracking-[0.28em] uppercase text-muted-fg">
                    Реализованные проекты
                  </p>
                  <h2 className="mt-4 font-heading text-[28px] sm:text-[40px] md:text-[52px] leading-[1.05] tracking-[-0.025em] text-ink">
                    Как это было
                  </h2>
                </div>
                <Link
                  href="/portfolio"
                  className="inline-flex h-12 items-center rounded-full border border-hairline px-5 text-[14px] font-medium text-ink hover:bg-surface-soft transition-colors self-start sm:self-auto"
                >
                  Все проекты →
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
                    href={`/portfolio/${c.slug}`}
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
                      <h3 className="mt-2 text-[18px] sm:text-[20px] leading-snug font-medium text-ink">
                        {c.title}
                      </h3>
                      <div className="mt-6 flex items-center justify-end text-[13px]">
                        <span className="text-brand font-medium">
                          Подробнее →
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </Carousel>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="bg-white">
          <div className="container-page pb-16 sm:pb-20 lg:pb-24">
            <div
              className="rounded-[20px] sm:rounded-[28px] px-5 sm:px-12 lg:px-20 py-10 sm:py-16 lg:py-24 text-white relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, #1f1a55 0%, #2a1a78 60%, #3a107a 100%)",
              }}
            >
              <div
                aria-hidden
                className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(600px 400px at 80% 0%, rgba(238,59,86,0.45), transparent 60%), radial-gradient(500px 350px at 0% 100%, rgba(120,40,200,0.5), transparent 60%)",
                }}
              />

              <div className="relative max-w-3xl">
                <h2 className="font-heading text-[32px] sm:text-[48px] md:text-[64px] leading-[1.04] tracking-[-0.025em]">
                  Начнём планировать?
                </h2>
                <p className="mt-5 sm:mt-7 text-[15px] sm:text-[16px] leading-relaxed text-white/80 max-w-lg">
                  Позвоните нам или напишите в&nbsp;Telegram:
                </p>

                <div className="mt-8 sm:mt-10 space-y-2 sm:space-y-3">
                  <a
                    href="tel:+79214102121"
                    className="block font-heading text-[24px] sm:text-[40px] md:text-[52px] leading-none tracking-[-0.02em] hover:text-accent-coral transition-colors"
                  >
                    +7 (921) 410-21-21
                  </a>
                  <a
                    href="tel:+79219519282"
                    className="block font-heading text-[24px] sm:text-[40px] md:text-[52px] leading-none tracking-[-0.02em] hover:text-accent-coral transition-colors"
                  >
                    +7 (921) 951-92-82
                  </a>
                </div>

                <div className="mt-8 sm:mt-10 flex flex-wrap gap-3">
                  <a
                    href="tel:+79214102121"
                    className="inline-flex h-11 items-center gap-2 rounded-full bg-white/10 hover:bg-white/15 transition-colors px-5 text-[14px] font-medium text-white"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.5 0 1 .4 1 1V20c0 .5-.5 1-1 1-9.4 0-17-7.6-17-17 0-.5.5-1 1-1h3.4c.6 0 1 .5 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1z" />
                    </svg>
                    Позвонить
                  </a>
                  <a
                    href="https://t.me/paritetevents"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center gap-2 rounded-full bg-white/10 hover:bg-white/15 transition-colors px-5 text-[14px] font-medium text-white"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M22 3 2 11l6 2 2 7 4-5 6 5 2-17z" />
                    </svg>
                    Telegram
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function getRussianSuffix(n: number): string {
  const lastTwo = n % 100;
  const last = n % 10;
  if (lastTwo >= 11 && lastTwo <= 14) return "ов";
  if (last === 1) return "";
  if (last >= 2 && last <= 4) return "а";
  return "ов";
}

function BentoGrid({ images }: { images: string[] }) {
  // 5+ images: full bento. 4 images: 2x2 grid. <4: simple grid.
  if (images.length >= 5) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 sm:grid-rows-2 gap-2 sm:gap-3 sm:h-[440px] lg:h-[560px]">
        <div className="col-span-2 sm:row-span-2 relative aspect-[16/10] sm:aspect-auto rounded-[16px] overflow-hidden ring-1 ring-white/10 group">
          <Image
            src={images[0]}
            alt=""
            fill
            sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        </div>
        {images.slice(1, 5).map((src, i) => (
          <div
            key={i}
            className="relative aspect-square sm:aspect-auto rounded-[14px] overflow-hidden ring-1 ring-white/10 group"
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="(min-width: 640px) 25vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
            />
          </div>
        ))}
      </div>
    );
  }
  if (images.length === 4) {
    return (
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        {images.map((src, i) => (
          <div
            key={i}
            className="relative aspect-[4/3] rounded-[14px] overflow-hidden ring-1 ring-white/10 group"
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
      {images.map((src, i) => (
        <div
          key={i}
          className="relative aspect-[4/3] rounded-[14px] overflow-hidden ring-1 ring-white/10 group"
        >
          <Image
            src={src}
            alt=""
            fill
            sizes="(min-width: 640px) 33vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        </div>
      ))}
    </div>
  );
}
