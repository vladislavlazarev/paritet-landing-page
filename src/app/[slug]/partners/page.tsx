import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { LocaleProvider } from "@/lib/i18n/locale-context";
import { HtmlLangEffect } from "@/components/site/html-lang-effect";
import { PARTNER_PAGES } from "@/lib/partner-pages";
import { breadcrumbJsonLd, buildMeta, localizedAbsoluteUrl } from "@/lib/seo";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/config";
import { p } from "@/lib/i18n/paths";

const LOCALES_HERE: Locale[] = ["en", "zh"];

export function generateStaticParams() {
  return LOCALES_HERE.map((slug) => ({ slug }));
}

export const dynamicParams = false;

function isLoc(s: string): s is Locale {
  return s === "en" || s === "zh";
}

export async function generateMetadata(
  props: PageProps<"/[slug]/partners">,
): Promise<Metadata> {
  const { slug } = await props.params;
  if (!isLoc(slug)) return {};
  const dict = await getDictionary(slug);
  return buildMeta({
    path: "/partners",
    locale: slug,
    title: dict.partnersPage.metaTitle,
    description: dict.partnersPage.metaDescription,
  });
}

export default async function LocalePartnersIndexPage(
  props: PageProps<"/[slug]/partners">,
) {
  const { slug } = await props.params;
  if (!isLoc(slug)) notFound();
  const locale = slug;
  const dict = await getDictionary(locale);

  const breadcrumbs = breadcrumbJsonLd([
    { name: dict.partnersPage.breadcrumbHome, url: localizedAbsoluteUrl(locale, "/") },
    { name: dict.partnersPage.breadcrumbPartners, url: localizedAbsoluteUrl(locale, "/partners") },
  ]);

  return (
    <LocaleProvider locale={locale} dict={dict}>
      <HtmlLangEffect locale={locale} />
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
            <h1 className="font-heading text-[44px] sm:text-[80px] md:text-[112px] lg:text-[140px] leading-[0.95] tracking-[-0.03em] text-white">
              {dict.partnersPage.title}
            </h1>
            <p className="mt-6 max-w-2xl text-[15px] sm:text-[17px] leading-relaxed text-white/85">
              {dict.partnersPage.intro}
            </p>
          </div>
        </section>

        <section className="bg-white">
          <div className="container-page py-12 sm:py-16 lg:py-20">
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
              {PARTNER_PAGES.map((pp) => (
                <li key={pp.slug}>
                  <Link
                    href={p(locale, `/partners/${pp.slug}`)}
                    className="group block bg-white rounded-[20px] overflow-hidden ring-1 ring-hairline hover:shadow-[0_12px_40px_-20px_rgba(31,26,85,0.45)] transition-shadow"
                  >
                    <div className="aspect-[4/3] relative overflow-hidden bg-surface-soft">
                      {pp.image && (
                        <Image
                          src={pp.image}
                          alt={pp.title}
                          fill
                          sizes="(min-width:1024px) 380px, (min-width:640px) 50vw, 100vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      )}
                    </div>
                    <div className="px-6 sm:px-7 py-5 sm:py-6">
                      <h3 lang="ru" className="text-[18px] sm:text-[20px] leading-snug text-ink">
                        {pp.title}
                      </h3>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer dict={dict} locale={locale} />
    </LocaleProvider>
  );
}
