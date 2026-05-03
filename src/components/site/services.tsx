import Link from "next/link";
import type { CSSProperties } from "react";
import { SERVICE_GROUPS } from "@/lib/services-home-data";
import type { Dictionary } from "@/lib/i18n/types";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/config";
import ruDict from "@/lib/i18n/dictionaries/ru";
import { p } from "@/lib/i18n/paths";

type ServicesProps = {
  dict?: Dictionary;
  locale?: Locale;
};

export function Services({
  dict = ruDict,
  locale = DEFAULT_LOCALE,
}: ServicesProps = {}) {
  const linkClass =
    "text-brand underline underline-offset-4 hover:text-accent-coral";
  const introNodes = renderIntro(
    dict.servicesHome.intro,
    [
      {
        token: "{nyeLink}",
        href: "/services/korporativnyj-novyj-god",
        label: dict.servicesHome.nyeLinkLabel,
      },
    ],
    locale,
    linkClass,
  );

  return (
    <section id="services" className="relative bg-white text-ink">
      <div className="container-page py-16 sm:py-24 lg:py-32">
        <div className="max-w-3xl mb-10 sm:mb-14">
          <h2 className="font-heading text-[28px] sm:text-[40px] md:text-[56px] leading-[1.08] sm:leading-[1.04] tracking-[-0.025em] text-ink">
            {dict.servicesHome.title}
          </h2>
          <p className="mt-5 sm:mt-6 text-[15px] sm:text-[16px] leading-relaxed text-body">
            {introNodes}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
          {SERVICE_GROUPS.map((g) => (
            <article
              key={g.slug}
              className="group/card relative rounded-[20px] bg-white ring-1 ring-hairline overflow-hidden transition-shadow hover:shadow-[0_18px_50px_-30px_rgba(31,26,85,0.25)]"
              style={{ ["--accent"]: g.accent } as CSSProperties}
            >
              <span
                aria-hidden
                className="absolute inset-y-0 left-0 w-[4px]"
                style={{ background: g.accent }}
              />
              <div className="p-5 sm:p-8 lg:p-10">
                <Link
                  href={p(locale, `/services/${g.slug}`)}
                  className="group/title inline-flex items-center gap-2"
                >
                  <h3 className="font-heading text-[20px] sm:text-[26px] lg:text-[30px] leading-tight tracking-[-0.01em] text-brand transition-colors group-hover/title:text-[color:var(--accent)]">
                    {g.title}
                  </h3>
                  <span
                    aria-hidden
                    className="text-[18px] leading-none translate-y-[1px] text-[color:var(--accent)] transition-transform group-hover/title:translate-x-1"
                  >
                    →
                  </span>
                </Link>

                <ul className="mt-6 sm:mt-7 flex flex-wrap gap-2 sm:gap-2.5">
                  {g.items.map((item, j) => {
                    if (!item.slug) {
                      return (
                        <li key={j}>
                          <span className="inline-flex items-center rounded-full ring-1 ring-hairline bg-surface-soft px-3.5 py-2 text-[14px] leading-none text-muted-fg">
                            {item.label}
                          </span>
                        </li>
                      );
                    }
                    return (
                      <li key={j}>
                        <Link
                          href={p(locale, `/services/${item.slug}`)}
                          className={
                            "group/chip inline-flex items-center gap-1.5 rounded-full ring-1 px-3.5 py-2 text-[14px] leading-none transition-colors " +
                            (item.featured
                              ? "ring-[color:var(--accent)] bg-[color:var(--accent)]/10 text-[color:var(--accent)] font-semibold hover:bg-[color:var(--accent)] hover:text-white"
                              : "ring-hairline text-brand hover:ring-[color:var(--accent)] hover:bg-[color:var(--accent)]/10 hover:text-[color:var(--accent)]")
                          }
                        >
                          <span>{item.label}</span>
                          <span
                            aria-hidden
                            className="opacity-50 transition-all group-hover/chip:translate-x-0.5 group-hover/chip:opacity-100"
                          >
                            →
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

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
