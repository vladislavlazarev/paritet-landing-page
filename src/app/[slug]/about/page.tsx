import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { Showreel } from "@/components/site/showreel";
import { Testimonials } from "@/components/site/testimonials";
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

const NOISE_SVG =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'><filter id='n'><feTurbulence baseFrequency='0.7' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")";

const TEAM = [
  { name: "Diana Lazareva", roleKey: "teamRoleCEO", photo: "/team/diana.png" },
  { name: "Yuliana Ryannel", roleKey: "teamRoleEvent", photo: "/team/yuliana.png" },
  { name: "Pavel Kolmykov", roleKey: "teamRoleArtists", photo: "/team/pavel.png" },
] as const;

const PARTNERS_LIST = [
  { name: "АШАН", slug: "auchan", ext: "svg" },
  { name: "БФА Банк", slug: "bfa", ext: "png" },
  { name: "HUAWEI", slug: "huawei", ext: "svg" },
  { name: "MELON", slug: "melon", ext: "svg" },
  { name: "IKEA", slug: "ikea", ext: "svg" },
  { name: "Газпром нефть", slug: "gazprom", ext: "svg" },
  { name: "Петербургская Недвижимость", slug: "pn", ext: "svg" },
  { name: "Leroy Merlin", slug: "leroy", ext: "svg" },
  { name: "ОБИТ", slug: "obit", ext: "png" },
  { name: "РЖД", slug: "rzhd", ext: "png" },
  { name: "Санкт-Петербург", slug: "spb", ext: "png" },
  { name: "ЛСР", slug: "lsr", ext: "png" },
] as const;

function isLoc(s: string): s is Locale {
  return s === "en" || s === "zh";
}

export async function generateMetadata(
  props: PageProps<"/[slug]/about">,
): Promise<Metadata> {
  const { slug } = await props.params;
  if (!isLoc(slug)) return {};
  const dict = await getDictionary(slug);
  return buildMeta({
    path: "/about",
    locale: slug,
    title: dict.aboutPage.metaTitle,
    description: dict.aboutPage.metaDescription,
  });
}

export default async function LocaleAboutPage(props: PageProps<"/[slug]/about">) {
  const { slug } = await props.params;
  if (!isLoc(slug)) notFound();
  const locale = slug;
  const dict = await getDictionary(locale);

  return (
    <LocaleProvider locale={locale} dict={dict}>
      <HtmlLangEffect locale={locale} />
      <Header active="/about" />
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
              {dict.aboutPage.eyebrow}
            </p>
            <h1 className="mt-5 sm:mt-6 font-heading text-[52px] sm:text-[88px] md:text-[120px] lg:text-[160px] leading-[0.92] tracking-[-0.03em] text-white">
              {dict.aboutPage.title}
            </h1>
            <p className="mt-7 sm:mt-9 lg:mt-10 max-w-2xl text-[15px] sm:text-[16px] lg:text-[17px] leading-relaxed text-white/85">
              {dict.aboutPage.intro}
            </p>
          </div>
        </section>

        <section className="bg-white text-ink">
          <div className="container-page py-16 sm:py-24 lg:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              <div className="lg:col-span-7">
                <h2 className="font-heading text-[28px] sm:text-[40px] md:text-[52px] leading-[1.05] tracking-[-0.025em] text-brand whitespace-pre-line">
                  {dict.aboutPage.leadHeadline}
                </h2>
                <div className="mt-7 sm:mt-9 space-y-5 sm:space-y-6 text-[15px] sm:text-[17px] leading-relaxed text-body max-w-xl">
                  <p>{dict.aboutPage.leadPara1}</p>
                  <p>{dict.aboutPage.leadPara2}</p>
                  <p>{dict.aboutPage.leadPara3}</p>
                </div>
              </div>

              <aside className="lg:col-span-5 lg:pl-8">
                <div className="space-y-10 sm:space-y-12 lg:sticky lg:top-32">
                  <Stat label={dict.aboutPage.statFounded} value="2000" />
                  <Stat label={dict.aboutPage.statEvents} value="1147" />
                  <Stat label={dict.aboutPage.statCities} value="42" />
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="relative bg-brand-strong text-white overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-25 mix-blend-overlay"
            style={{ backgroundImage: NOISE_SVG }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(700px 400px at 80% 20%, rgba(238,59,86,0.30), transparent 60%), radial-gradient(800px 500px at 10% 90%, rgba(120,40,200,0.35), transparent 60%)",
            }}
          />

          <div className="container-page relative py-16 sm:py-24 lg:py-28">
            <div className="max-w-2xl mb-8 sm:mb-12">
              <p className="text-[11px] sm:text-[12px] tracking-[0.28em] uppercase text-white/50">
                {dict.aboutPage.promoEyebrow}
              </p>
              <h2 className="mt-4 font-heading text-[28px] sm:text-[40px] md:text-[52px] leading-[1.05] tracking-[-0.025em]">
                {dict.aboutPage.promoTitle}
              </h2>
            </div>
            <Showreel />
          </div>
        </section>

        <section className="bg-brand text-white">
          <div className="container-page py-16 sm:py-24 lg:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12 sm:mb-16">
              <div className="lg:col-span-5">
                <h2 className="font-heading text-[32px] sm:text-[48px] md:text-[64px] leading-[1.04] tracking-[-0.025em]">
                  {dict.aboutPage.teamTitle}
                </h2>
              </div>
              <div className="lg:col-span-7">
                <p className="text-[15px] sm:text-[17px] leading-relaxed text-white/80 max-w-xl">
                  {dict.aboutPage.teamPara1}
                </p>
                <p className="mt-4 sm:mt-5 text-[15px] sm:text-[17px] leading-relaxed text-white/70 max-w-xl">
                  {dict.aboutPage.teamPara2}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
              {TEAM.map((person) => (
                <article key={person.name} className="group">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] bg-white ring-1 ring-white/10">
                    <Image
                      src={person.photo}
                      alt={person.name}
                      fill
                      sizes="(min-width: 1024px) 360px, (min-width: 640px) 30vw, 90vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="mt-4 sm:mt-5">
                    <h3 className="font-heading text-[20px] sm:text-[24px] tracking-[-0.01em]">
                      {person.name}
                    </h3>
                    <p className="mt-1 text-[13px] sm:text-[14px] text-white/65">
                      {dict.aboutPage[person.roleKey]}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-brand-strong text-white">
          <div className="container-page py-16 sm:py-24 lg:py-28">
            <div className="max-w-2xl mb-10 sm:mb-14">
              <p className="text-[11px] sm:text-[12px] tracking-[0.28em] uppercase text-white/50">
                {dict.aboutPage.partnersEyebrow}
              </p>
              <h2 className="mt-4 font-heading text-[28px] sm:text-[40px] md:text-[52px] leading-[1.05] tracking-[-0.025em] whitespace-pre-line">
                {dict.aboutPage.partnersTitle}
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-white/10 rounded-[20px] overflow-hidden ring-1 ring-white/10">
              {PARTNERS_LIST.map((pp) => (
                <div
                  key={pp.slug}
                  className="relative aspect-[4/3] flex items-center justify-center bg-brand-strong p-6 sm:p-8 transition-colors duration-300 hover:bg-brand"
                >
                  <div className="relative w-[70%] h-[60%]">
                    <Image
                      src={`/partners/${pp.slug}-color.${pp.ext}`}
                      alt={pp.name}
                      fill
                      sizes="(min-width: 1024px) 200px, (min-width: 640px) 30vw, 45vw"
                      className="object-contain brightness-0 invert opacity-75"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Testimonials eyebrow={dict.testimonials.eyebrow} />

        <section className="bg-white">
          <div className="container-page pb-16 sm:pb-24 lg:pb-28">
            <div
              className="relative overflow-hidden rounded-[24px] sm:rounded-[28px] px-7 sm:px-12 lg:px-16 py-12 sm:py-16 lg:py-20 text-white"
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

              <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
                <div className="lg:col-span-7">
                  <p className="text-[11px] sm:text-[12px] tracking-[0.28em] uppercase text-white/55">
                    {dict.aboutPage.ctaEyebrow}
                  </p>
                  <h2 className="mt-4 font-heading text-[32px] sm:text-[48px] md:text-[64px] leading-[1.04] tracking-[-0.025em]">
                    {dict.aboutPage.ctaTitle}
                  </h2>
                  <p className="mt-5 sm:mt-6 text-[15px] sm:text-[16px] leading-relaxed text-white/80 max-w-xl">
                    {dict.aboutPage.ctaIntro}
                  </p>
                </div>

                <div className="lg:col-span-5 lg:justify-self-end w-full lg:max-w-md">
                  <div className="space-y-1.5 sm:space-y-2">
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

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-hairline pt-6">
      <p className="text-[12px] sm:text-[13px] tracking-[0.22em] uppercase text-muted-fg">
        {label}
      </p>
      <p className="mt-3 font-heading text-[44px] sm:text-[64px] lg:text-[88px] leading-none tracking-[-0.03em] text-brand">
        {value}
      </p>
    </div>
  );
}
