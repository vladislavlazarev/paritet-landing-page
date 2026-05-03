import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { LongRead } from "@/components/site/long-read";
import { LocaleProvider } from "@/lib/i18n/locale-context";
import { HtmlLangEffect } from "@/components/site/html-lang-effect";
import {
  PARTNER_PAGES,
  getPartnerPageBySlug,
} from "@/lib/partner-pages";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  buildMeta,
  localizedAbsoluteUrl,
} from "@/lib/seo";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/config";

const LOCALES_HERE: Locale[] = ["en", "zh"];

export function generateStaticParams() {
  return LOCALES_HERE.flatMap((slug) =>
    PARTNER_PAGES.map((p) => ({ slug, item: p.slug })),
  );
}

export const dynamicParams = false;

function isLoc(s: string): s is Locale {
  return s === "en" || s === "zh";
}

export async function generateMetadata(
  props: PageProps<"/[slug]/partners/[item]">,
): Promise<Metadata> {
  const { slug, item } = await props.params;
  if (!isLoc(slug)) return {};
  const partner = getPartnerPageBySlug(item);
  if (!partner) return {};
  const dict = await getDictionary(slug);
  const title = partner.seo?.seoTitle?.trim() || partner.title;
  const description =
    partner.seo?.metaDescription?.trim() ||
    partner.seo?.ogDescription?.trim() ||
    partner.description;
  return buildMeta({
    path: `/partners/${partner.slug}`,
    locale: slug,
    title: `${title} — ${dict.partnersPage.title}`,
    description,
    image: partner.image,
    type: "article",
  });
}

export default async function LocalePartnerPage(
  props: PageProps<"/[slug]/partners/[item]">,
) {
  const { slug, item } = await props.params;
  if (!isLoc(slug)) notFound();
  const partner = getPartnerPageBySlug(item);
  if (!partner) notFound();
  const locale = slug;
  const dict = await getDictionary(locale);

  const articleSchema = articleJsonLd({
    url: `/${locale}/partners/${partner.slug}`,
    title: partner.title,
    description: partner.seo?.metaDescription?.trim() || partner.description,
    image: partner.image,
    inLanguage: "ru-RU",
  });
  const breadcrumbs = breadcrumbJsonLd([
    { name: dict.longRead.breadcrumbHome, url: localizedAbsoluteUrl(locale, "/") },
    { name: dict.longRead.breadcrumbPartners, url: localizedAbsoluteUrl(locale, "/partners") },
    { name: partner.title, url: localizedAbsoluteUrl(locale, `/partners/${partner.slug}`) },
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
        <LongRead
          title={partner.title}
          eyebrow={`${dict.partnersPage.title} · Paritet Events`}
          description={partner.description}
          heroImage={partner.image}
          body={partner.body}
          contentLang="ru"
          notice={dict.longRead.contentLanguageNotice}
        />
      </main>
      <Footer dict={dict} locale={locale} />
    </LocaleProvider>
  );
}
