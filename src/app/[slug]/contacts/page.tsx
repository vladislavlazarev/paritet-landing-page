import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { LocaleProvider } from "@/lib/i18n/locale-context";
import { HtmlLangEffect } from "@/components/site/html-lang-effect";
import { buildMeta } from "@/lib/seo";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/config";

const LOCALES_HERE: Locale[] = ["en", "zh"];

export function generateStaticParams() {
  return LOCALES_HERE.map((slug) => ({ slug }));
}

export const dynamicParams = false;

const MAP_SRC =
  "https://yandex.com/map-widget/v1/?ll=30.369569%2C59.929011&z=17&mode=search&text=%D0%BF%D0%B0%D1%80%D0%B8%D1%82%D0%B5%D1%82%20%D0%BD%D0%B5%D0%B2%D1%81%D0%BA%D0%B8%D0%B9%20109&pt=30.369569%2C59.929011%2Cpm2rdm";
const NOISE_SVG =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'><filter id='n'><feTurbulence baseFrequency='0.7' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")";

function isLoc(s: string): s is Locale {
  return s === "en" || s === "zh";
}

export async function generateMetadata(
  props: PageProps<"/[slug]/contacts">,
): Promise<Metadata> {
  const { slug } = await props.params;
  if (!isLoc(slug)) return {};
  const dict = await getDictionary(slug);
  return buildMeta({
    path: "/contacts",
    locale: slug,
    title: dict.contactsPage.metaTitle,
    description: dict.contactsPage.metaDescription,
  });
}

export default async function LocaleContactsPage(
  props: PageProps<"/[slug]/contacts">,
) {
  const { slug } = await props.params;
  if (!isLoc(slug)) notFound();
  const locale = slug;
  const dict = await getDictionary(locale);

  return (
    <LocaleProvider locale={locale} dict={dict}>
      <HtmlLangEffect locale={locale} />
      <Header active="/contacts" />
      <main className="flex-1">
        <section className="relative bg-brand text-white overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-[55%] sm:w-[45%] lg:w-[40%]"
            style={{
              background: "var(--accent-coral)",
              clipPath: "polygon(100% 0%, 100% 100%, 0% 100%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(900px 500px at 12% 18%, rgba(120,40,200,0.45), transparent 60%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-25"
            style={{ backgroundImage: NOISE_SVG }}
          />

          <div className="container-page relative pt-24 sm:pt-36 lg:pt-44 pb-14 sm:pb-20 lg:pb-28">
            <p className="text-[12px] sm:text-[13px] tracking-[0.28em] uppercase text-white/55">
              {dict.contactsPage.eyebrow}
            </p>
            <h1 className="mt-5 sm:mt-6 font-heading text-[52px] sm:text-[88px] md:text-[120px] lg:text-[160px] leading-[0.92] tracking-[-0.03em] text-white">
              {dict.contactsPage.title}
            </h1>
            <p className="mt-7 sm:mt-9 lg:mt-10 max-w-2xl text-[15px] sm:text-[16px] lg:text-[17px] leading-relaxed text-white/85">
              {dict.contactsPage.intro}
            </p>
          </div>
        </section>

        <section className="bg-white">
          <div className="container-page py-12 sm:py-16 lg:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20">
              <div className="lg:col-span-5">
                <address className="not-italic text-[15px] sm:text-[17px] leading-[1.7] text-ink">
                  <p className="font-medium">{dict.contactsPage.addressFirst}</p>
                  <p>{dict.contactsPage.addressSecond}</p>
                </address>

                <div className="mt-7 sm:mt-9 space-y-2.5">
                  <a
                    href="tel:+79214102121"
                    className="block text-[22px] sm:text-[24px] font-medium tracking-[-0.01em] text-brand hover:text-accent-coral transition-colors"
                  >
                    +7 (921) 410-21-21
                  </a>
                  <a
                    href="tel:+79219519282"
                    className="block text-[22px] sm:text-[24px] font-medium tracking-[-0.01em] text-brand hover:text-accent-coral transition-colors"
                  >
                    +7 (921) 951-92-82
                  </a>
                </div>

                <div className="mt-7 sm:mt-9">
                  <a
                    href="mailto:info@party-paritet.com"
                    className="text-[16px] sm:text-[18px] text-brand underline underline-offset-[6px] decoration-brand/30 hover:decoration-accent-coral hover:text-accent-coral transition-colors"
                  >
                    info@party-paritet.com
                  </a>
                </div>

                <div className="mt-9 sm:mt-12 flex flex-wrap items-center gap-3">
                  <a
                    href="tel:+79214102121"
                    className="inline-flex h-12 items-center gap-2.5 rounded-full bg-accent-coral px-5 text-[15px] font-medium text-white hover:bg-accent-coral-strong transition-colors"
                  >
                    {dict.contactsPage.callBtn}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                  <a
                    href="https://t.me/paritetevents"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 items-center gap-2.5 rounded-full ring-1 ring-hairline bg-white px-5 text-[15px] font-medium text-brand hover:bg-surface-soft transition-colors"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M22 3 2 11l6 2 2 7 4-5 6 5 2-17z" />
                    </svg>
                    {dict.contactsPage.telegramBtn}
                  </a>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="rounded-[20px] overflow-hidden ring-1 ring-hairline bg-surface-soft aspect-[4/3] sm:aspect-[16/11] lg:aspect-auto lg:h-[640px]">
                  <iframe
                    src={MAP_SRC}
                    title={dict.contactsPage.mapTitle}
                    loading="lazy"
                    allow="fullscreen"
                    className="block h-full w-full border-0"
                  />
                </div>
                <a
                  href="https://yandex.com/maps/-/CPS~6IK4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 text-[14px] text-muted-fg hover:text-brand transition-colors"
                >
                  {dict.contactsPage.openInMaps}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer dict={dict} locale={locale} />
    </LocaleProvider>
  );
}
