import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/types";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/config";
import ruDict from "@/lib/i18n/dictionaries/ru";
import { p } from "@/lib/i18n/paths";

type AboutProps = {
  dict?: Dictionary;
  locale?: Locale;
};

export function About({
  dict = ruDict,
  locale = DEFAULT_LOCALE,
}: AboutProps = {}) {
  const cards = [
    {
      title: dict.about.cardsCorp,
      caption: dict.about.cardsCorpCaption,
      emoji: "🎉",
      image: "/home/about/korporativnye.webp",
      href: "/services/korporativnye-meroprijatija",
    },
    {
      title: dict.about.cardsConcerts,
      caption: dict.about.cardsConcertsCaption,
      emoji: "🎤",
      image: "/home/about/kontserty.webp",
      href: "/services/kontserty",
    },
    {
      title: dict.about.cardsTeam,
      caption: dict.about.cardsTeamCaption,
      emoji: "🌲",
      image: "/home/about/timbilding.webp",
      href: "/services/timbilding",
    },
    {
      title: dict.about.cardsPrivate,
      caption: dict.about.cardsPrivateCaption,
      emoji: "🎩",
      image: "/home/about/chastnye.webp",
      href: "/services/chastnye-meropriyatiya",
    },
    {
      title: dict.about.cardsBusiness,
      caption: dict.about.cardsBusinessCaption,
      emoji: "🏛️",
      image: "/home/about/delovye.webp",
      href: "/services/delovye-meropriyatiya",
    },
    {
      title: dict.about.cardsHolidays,
      caption: dict.about.cardsHolidaysCaption,
      emoji: "🎈",
      image: "/home/about/prazdniki.webp",
      href: "/services",
    },
  ];

  // Render the intro template with inline links — splits on the placeholders
  // and weaves localized link text without breaking the structure.
  const linkClass =
    "text-brand underline underline-offset-4 hover:text-accent-coral";
  const introNodes = renderIntro(dict.about.intro, [
    { token: "{corp}", href: "/services/korporativnye-meroprijatija", label: dict.about.introCorp },
    { token: "{team}", href: "/services/timbilding", label: dict.about.introTeam },
    { token: "{concert}", href: "/services/kontserty", label: dict.about.introConcert },
    { token: "{nye}", href: "/services/korporativnyj-novyj-god", label: dict.about.introNye },
  ], locale, linkClass);

  return (
    <section id="about" className="relative bg-white text-ink">
      <h2 className="sr-only">{dict.about.sectionAriaTitle}</h2>
      <div className="container-page py-16 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          <div className="lg:col-span-5 flex flex-col">
            <h3 className="font-heading text-[26px] sm:text-[36px] md:text-[44px] lg:text-[52px] leading-[1.1] sm:leading-[1.05] tracking-[-0.025em] text-brand">
              <span className="sm:whitespace-nowrap">{dict.about.headlineLineA}</span>
              <br /> {dict.about.headlineLineB}
              <br /> {dict.about.headlineLineC}
            </h3>
            <p className="mt-5 sm:mt-6 text-[15px] sm:text-[16px] leading-relaxed text-body max-w-md">
              {introNodes}
            </p>

            <div className="mt-6 sm:mt-7 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="inline-flex h-12 items-center rounded-full bg-brand px-6 text-[14px] font-semibold text-white hover:bg-brand-strong transition-colors"
              >
                {dict.about.ctaDiscuss}
              </a>
              <a
                href="#services"
                className="inline-flex h-12 items-center rounded-full border border-hairline px-6 text-[14px] font-medium text-ink hover:bg-surface-soft transition-colors"
              >
                {dict.about.ctaAllServices}
              </a>
            </div>

            <dl className="mt-8 lg:mt-auto pt-8 sm:pt-10 grid grid-cols-3 gap-4 sm:gap-6 max-w-md">
              <div>
                <dt className="text-[10px] sm:text-[11px] tracking-[0.18em] sm:tracking-[0.2em] uppercase text-muted-fg">{dict.about.statYears}</dt>
                <dd className="mt-2 font-heading text-[24px] sm:text-[30px] tracking-tight text-ink">20+</dd>
              </div>
              <div>
                <dt className="text-[10px] sm:text-[11px] tracking-[0.18em] sm:tracking-[0.2em] uppercase text-muted-fg">{dict.about.statProjects}</dt>
                <dd className="mt-2 font-heading text-[24px] sm:text-[30px] tracking-tight text-ink">800+</dd>
              </div>
              <div>
                <dt className="text-[10px] sm:text-[11px] tracking-[0.18em] sm:tracking-[0.2em] uppercase text-muted-fg">{dict.about.statCities}</dt>
                <dd className="mt-2 font-heading text-[24px] sm:text-[30px] tracking-tight text-ink">42</dd>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 lg:gap-4">
              {cards.map((c, i) => (
                <Link
                  key={i}
                  href={p(locale, c.href)}
                  className="group relative overflow-hidden rounded-[20px] ring-1 ring-hairline aspect-[3/4] bg-ink"
                >
                  <Image
                    src={c.image}
                    alt={c.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 30vw, 19vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent"
                  />

                  <span className="absolute top-4 right-4 sm:top-5 sm:right-5 text-xl sm:text-2xl drop-shadow-[0_4px_10px_rgba(0,0,0,0.45)]">
                    {c.emoji}
                  </span>

                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 lg:p-6 text-white">
                    <p className="hidden sm:block text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.22em] uppercase opacity-85">
                      {c.caption}
                    </p>
                    <h4 className="sm:mt-2 font-heading text-[16px] sm:text-[20px] lg:text-[22px] leading-tight">
                      {c.title}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Replace `{token}` placeholders inside a sentence with localized <Link>s. */
function renderIntro(
  template: string,
  refs: { token: string; href: string; label: string }[],
  locale: Locale,
  className: string,
): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let rest = template;
  let key = 0;
  while (rest.length > 0) {
    let earliest: { idx: number; ref: typeof refs[number] } | null = null;
    for (const r of refs) {
      const i = rest.indexOf(r.token);
      if (i !== -1 && (earliest === null || i < earliest.idx)) {
        earliest = { idx: i, ref: r };
      }
    }
    if (!earliest) {
      nodes.push(rest);
      break;
    }
    if (earliest.idx > 0) nodes.push(rest.slice(0, earliest.idx));
    nodes.push(
      <Link
        key={`l${key++}`}
        href={p(locale, earliest.ref.href)}
        className={className}
      >
        {earliest.ref.label}
      </Link>,
    );
    rest = rest.slice(earliest.idx + earliest.ref.token.length);
  }
  return nodes;
}
