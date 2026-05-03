import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { LongRead } from "@/components/site/long-read";
import { LocaleProvider } from "@/lib/i18n/locale-context";
import { HtmlLangEffect } from "@/components/site/html-lang-effect";
import { BLOG, getBlogPostBySlug } from "@/lib/blog";
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
    BLOG.map((post) => ({ slug, item: post.slug })),
  );
}

export const dynamicParams = false;

function isLoc(s: string): s is Locale {
  return s === "en" || s === "zh";
}

export async function generateMetadata(
  props: PageProps<"/[slug]/[item]">,
): Promise<Metadata> {
  const { slug, item } = await props.params;
  if (!isLoc(slug)) return {};
  const post = getBlogPostBySlug(item);
  if (!post) return {};
  const dict = await getDictionary(slug);
  const title = post.seo?.seoTitle?.trim() || post.title;
  const description =
    post.seo?.metaDescription?.trim() ||
    post.seo?.ogDescription?.trim() ||
    post.description;
  return buildMeta({
    path: `/${post.slug}`,
    locale: slug,
    title: `${title} — ${dict.blogPage.title}`,
    description,
    image: post.image,
    type: "article",
  });
}

export default async function LocaleBlogPostPage(
  props: PageProps<"/[slug]/[item]">,
) {
  const { slug, item } = await props.params;
  if (!isLoc(slug)) notFound();
  const post = getBlogPostBySlug(item);
  if (!post) notFound();
  const locale = slug;
  const dict = await getDictionary(locale);

  const articleSchema = articleJsonLd({
    url: `/${locale}/${post.slug}`,
    title: post.title,
    description: post.seo?.metaDescription?.trim() || post.description,
    image: post.image,
    inLanguage: "ru-RU",
  });
  const breadcrumbs = breadcrumbJsonLd([
    { name: dict.longRead.breadcrumbHome, url: localizedAbsoluteUrl(locale, "/") },
    { name: dict.longRead.breadcrumbBlog, url: localizedAbsoluteUrl(locale, "/stati") },
    { name: post.title, url: localizedAbsoluteUrl(locale, `/${post.slug}`) },
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
          title={post.title}
          eyebrow={`${dict.blogPage.title} · Paritet Events`}
          description={post.description}
          heroImage={post.image}
          body={post.body}
          contentLang="ru"
          notice={dict.longRead.contentLanguageNotice}
        />
      </main>
      <Footer dict={dict} locale={locale} />
    </LocaleProvider>
  );
}
