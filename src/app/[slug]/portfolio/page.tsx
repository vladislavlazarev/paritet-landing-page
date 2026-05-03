import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { PortfolioGrid } from "@/components/site/portfolio-grid";
import { PORTFOLIO } from "@/lib/portfolio";
import { LocaleProvider } from "@/lib/i18n/locale-context";
import { HtmlLangEffect } from "@/components/site/html-lang-effect";
import { buildMeta, breadcrumbJsonLd, localizedAbsoluteUrl } from "@/lib/seo";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/config";

const LOCALES_HERE: Locale[] = ["en", "zh"];

export function generateStaticParams() {
  return LOCALES_HERE.map((slug) => ({ slug }));
}

export const dynamicParams = false;

function isLoc(s: string): s is Locale {
  return s === "en" || s === "zh";
}

export async function generateMetadata(
  props: PageProps<"/[slug]/portfolio">,
): Promise<Metadata> {
  const { slug } = await props.params;
  if (!isLoc(slug)) return {};
  const dict = await getDictionary(slug);
  return buildMeta({
    path: "/portfolio",
    locale: slug,
    title: dict.portfolioPage.metaTitle,
    description: dict.portfolioPage.metaDescription,
  });
}

export default async function LocalePortfolioPage(
  props: PageProps<"/[slug]/portfolio">,
) {
  const { slug } = await props.params;
  if (!isLoc(slug)) notFound();
  const locale = slug;
  const dict = await getDictionary(locale);

  const breadcrumbs = breadcrumbJsonLd([
    { name: dict.portfolioPage.breadcrumbHome, url: localizedAbsoluteUrl(locale, "/") },
    {
      name: dict.portfolioPage.breadcrumbPortfolio,
      url: localizedAbsoluteUrl(locale, "/portfolio"),
    },
  ]);

  return (
    <LocaleProvider locale={locale} dict={dict}>
      <HtmlLangEffect locale={locale} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <Header active="/portfolio" />
      <main className="flex-1">
        <section
          className="relative bg-brand text-white overflow-hidden"
          style={{
            backgroundImage:
              "radial-gradient(1000px 600px at 80% 0%, rgba(120,40,200,0.55), transparent 60%), radial-gradient(800px 500px at 0% 100%, rgba(238,59,86,0.25), transparent 60%)",
          }}
        >
          <div className="container-page pt-24 sm:pt-36 lg:pt-48 pb-10 sm:pb-16 lg:pb-20">
            <h1 className="font-heading text-[52px] sm:text-[88px] md:text-[120px] lg:text-[160px] leading-[0.92] tracking-[-0.03em] text-white">
              {dict.portfolioPage.title}
            </h1>
          </div>

          <PortfolioGrid events={PORTFOLIO} />
        </section>
      </main>
      <Footer dict={dict} locale={locale} />
    </LocaleProvider>
  );
}
