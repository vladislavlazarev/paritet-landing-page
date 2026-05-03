import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { Hero } from "@/components/site/hero";
import { About } from "@/components/site/about";
import { Partners } from "@/components/site/partners";
import { Events } from "@/components/site/events";
import { Services } from "@/components/site/services";
import { Testimonials } from "@/components/site/testimonials";
import { Contact } from "@/components/site/contact";
import { LongRead } from "@/components/site/long-read";
import { LocaleProvider } from "@/lib/i18n/locale-context";
import { HtmlLangEffect } from "@/components/site/html-lang-effect";
import { BLOG, getBlogPostBySlug } from "@/lib/blog";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  buildMeta,
  SITE_URL,
  aggregateRatingJsonLd,
  videoJsonLd,
} from "@/lib/seo";
import { getDictionary } from "@/lib/i18n";
import { LOCALE_BCP47, type Locale } from "@/lib/i18n/config";

const NON_RU_LOCALES: Locale[] = ["en", "zh"];

/**
 * Catch-all root route shared between two responsibilities:
 *  1. Legacy blog posts at `/<slug>/` (e.g. /korporativ-leningradskaya-oblast).
 *     Original WordPress URLs were single-segment so we preserve that exact
 *     structure to retain indexed positions.
 *  2. Localised homepages — `/en` and `/zh`. The Russian homepage stays at
 *     the unprefixed root.
 *
 * Static segments (`/about`, `/portfolio`, etc.) take precedence over this
 * dynamic route in Next.js routing. Both responsibilities co-exist via
 * `generateStaticParams` + a runtime branch.
 */
export function generateStaticParams() {
  return [
    ...BLOG.map((p) => ({ slug: p.slug })),
    ...NON_RU_LOCALES.map((l) => ({ slug: l })),
  ];
}

export const dynamicParams = false;

const HOMEPAGE_REVIEWS = [
  {
    author: "HUAWEI Russia",
    body:
      "Команда «Паритет» полностью взяла на себя организацию выездного мероприятия для 400 партнёров.",
    rating: 5,
    datePublished: "2024-06-12",
  },
  {
    author: "MELON Fashion Group",
    body:
      "Работаем с агентством уже шесть лет — каждый раз получается что-то совершенно новое.",
    rating: 5,
    datePublished: "2024-04-20",
  },
  {
    author: "Газпром нефть",
    body:
      "Family Day на 1500 сотрудников прошёл как часы.",
    rating: 5,
    datePublished: "2023-08-15",
  },
  {
    author: "ЛСР",
    body:
      "Юбилейный вечер компании оставил у гостей ощущение театральной премьеры.",
    rating: 5,
    datePublished: "2023-11-30",
  },
];

function isNonRuLocale(slug: string): slug is "en" | "zh" {
  return slug === "en" || slug === "zh";
}

export async function generateMetadata(
  props: PageProps<"/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  if (isNonRuLocale(slug)) {
    const dict = await getDictionary(slug);
    return buildMeta({
      path: "/",
      locale: slug,
      title: dict.meta.siteTitle,
      description: dict.meta.siteDescription,
    });
  }
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "Паритет Events" };
  const title = post.seo?.seoTitle?.trim() || `${post.title} — Паритет Events`;
  const description =
    post.seo?.metaDescription?.trim() ||
    post.seo?.ogDescription?.trim() ||
    post.description;
  return buildMeta({
    path: `/${post.slug}`,
    title,
    description,
    image: post.image,
    type: "article",
  });
}

export default async function CatchAllPage(props: PageProps<"/[slug]">) {
  const { slug } = await props.params;

  if (isNonRuLocale(slug)) {
    const locale = slug;
    const dict = await getDictionary(locale);

    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#localbusiness`,
      name: "Паритет Events",
      alternateName: "Paritet Events",
      description: dict.meta.siteDescription,
      url: `${SITE_URL}/${locale}`,
      image: `${SITE_URL}/og-default.png`,
      logo: `${SITE_URL}/logo-white.png`,
      telephone: ["+7 (921) 410-21-21", "+7 (921) 951-92-82"],
      email: "info@party-paritet.com",
      priceRange: "₽₽₽",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Невский проспект, 109, офис 27",
        addressLocality: "Санкт-Петербург",
        addressRegion: "Санкт-Петербург",
        postalCode: "191167",
        addressCountry: "RU",
      },
      geo: { "@type": "GeoCoordinates", latitude: 59.928, longitude: 30.382 },
      areaServed: { "@type": "City", name: "Saint Petersburg" },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5.0",
        bestRating: "5",
        reviewCount: HOMEPAGE_REVIEWS.length,
      },
    };

    const reviewsSchema = aggregateRatingJsonLd(
      `/${locale}`,
      "Paritet Events",
      HOMEPAGE_REVIEWS,
    );

    const showreelSchema = videoJsonLd({
      name: dict.hero.showreelAria,
      description: dict.meta.siteDescription,
      thumbnailUrl: "/og-default.png",
      contentUrl: "/videos/showreel.mp4",
      uploadDate: "2024-12-01",
      duration: "PT2M30S",
      inLanguage: LOCALE_BCP47[locale],
    });

    return (
      <LocaleProvider locale={locale} dict={dict}>
        <HtmlLangEffect locale={locale} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(showreelSchema) }}
        />
        <Header />
        <main className="flex-1">
          <Hero dict={dict} locale={locale} />
          <About dict={dict} locale={locale} />
          <Partners dict={dict} />
          <Events dict={dict} locale={locale} />
          <Services dict={dict} locale={locale} />
          <Testimonials eyebrow={dict.testimonials.eyebrow} />
          <Contact dict={dict} locale={locale} />
        </main>
        <Footer dict={dict} locale={locale} />
      </LocaleProvider>
    );
  }

  // Blog post path (Russian, root)
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const articleSchema = articleJsonLd({
    url: `/${post.slug}`,
    title: post.title,
    description: post.seo?.metaDescription?.trim() || post.description,
    image: post.image,
    inLanguage: "ru-RU",
  });
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Главная", url: "/" },
    { name: "Статьи", url: "/stati" },
    { name: post.title, url: `/${post.slug}` },
  ]);

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
          title={post.title}
          eyebrow="Статьи · Паритет Events"
          description={post.description}
          heroImage={post.image}
          body={post.body}
        />
      </main>
      <Footer />
    </>
  );
}
