import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { LongRead } from "@/components/site/long-read";
import {
  PARTNER_PAGES,
  getPartnerPageBySlug,
  partnerMentionRegex,
} from "@/lib/partner-pages";
import { CATEGORY_LABEL, PORTFOLIO } from "@/lib/portfolio";
import { articleJsonLd, breadcrumbJsonLd, buildMeta } from "@/lib/seo";

export function generateStaticParams() {
  return PARTNER_PAGES.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata(
  props: PageProps<"/partners/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const partner = getPartnerPageBySlug(slug);
  if (!partner) return { title: "Партнёры — Паритет Events" };
  const title =
    partner.seo?.seoTitle?.trim() || `${partner.title} — Паритет Events`;
  const description =
    partner.seo?.metaDescription?.trim() ||
    partner.seo?.ogDescription?.trim() ||
    partner.description;
  return buildMeta({
    path: `/partners/${partner.slug}`,
    title,
    description,
    image: partner.image,
    type: "article",
  });
}

export default async function PartnerPage(
  props: PageProps<"/partners/[slug]">,
) {
  const { slug } = await props.params;
  const partner = getPartnerPageBySlug(slug);
  if (!partner) notFound();

  const articleSchema = articleJsonLd({
    url: `/partners/${partner.slug}`,
    title: partner.title,
    description: partner.seo?.metaDescription?.trim() || partner.description,
    image: partner.image,
  });
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Главная", url: "/" },
    { name: "Партнёры", url: "/partners" },
    { name: partner.title, url: `/partners/${partner.slug}` },
  ]);

  // Find cases mentioning this partner anywhere in title or body — used as
  // "Реализованные проекты с этим клиентом" block.
  const re = partnerMentionRegex(partner.title);
  const relatedCases = re
    ? PORTFOLIO.filter((c) => {
        const haystack =
          c.title +
          " " +
          c.body
            .map((b) => {
              if (b.kind === "paragraph" || b.kind === "heading") return b.text;
              if (b.kind === "list") return b.items.join(" ");
              return "";
            })
            .join(" ");
        return re.test(haystack);
      }).slice(0, 6)
    : [];

  return (
    <>
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
        <LongRead
          title={partner.title}
          eyebrow="Партнёр Паритет Events"
          description={partner.description}
          heroImage={partner.image}
          body={partner.body}
        />

        {relatedCases.length > 0 && (
          <section className="bg-surface-soft">
            <div className="container-page py-14 sm:py-20 lg:py-24">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8 sm:mb-12">
                <div className="max-w-xl">
                  <p className="text-[11px] sm:text-[12px] tracking-[0.28em] uppercase text-muted-fg">
                    Совместные проекты
                  </p>
                  <h2 className="mt-3 font-heading text-[26px] sm:text-[36px] md:text-[44px] leading-[1.05] tracking-[-0.025em] text-ink">
                    Что мы сделали вместе
                  </h2>
                </div>
                <Link
                  href="/portfolio"
                  className="inline-flex h-12 items-center rounded-full border border-hairline bg-white px-5 text-[14px] font-medium text-ink hover:bg-surface-strong transition-colors self-start sm:self-auto"
                >
                  Все проекты →
                </Link>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {relatedCases.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/portfolio/${c.slug}`}
                      className="group block rounded-[20px] overflow-hidden ring-1 ring-hairline bg-white transition-shadow hover:shadow-[0_18px_50px_-30px_rgba(31,26,85,0.35)]"
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
                            sizes="(min-width:1024px) 380px, (min-width:640px) 50vw, 100vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                          />
                        )}
                      </div>
                      <div className="px-6 sm:px-7 py-5 sm:py-6">
                        <p className="text-[12px] tracking-[0.18em] uppercase text-muted-fg">
                          {CATEGORY_LABEL[c.category]}
                        </p>
                        <h3 className="mt-2 text-[17px] sm:text-[19px] leading-snug text-ink">
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
      </main>
      <Footer />
    </>
  );
}
