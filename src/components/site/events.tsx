import Image from "next/image";
import Link from "next/link";
import { Carousel } from "./carousel";
import { CATEGORY_LABEL, PORTFOLIO } from "@/lib/portfolio";
import type { Dictionary } from "@/lib/i18n/types";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/config";
import ruDict from "@/lib/i18n/dictionaries/ru";
import { p } from "@/lib/i18n/paths";

type EventsProps = {
  dict?: Dictionary;
  locale?: Locale;
};

export function Events({
  dict = ruDict,
  locale = DEFAULT_LOCALE,
}: EventsProps = {}) {
  const events = PORTFOLIO.filter((e) => e.coverImage).slice(0, 8);

  return (
    <section
      id="portfolio"
      className="relative bg-brand text-white overflow-hidden"
      style={{
        backgroundImage:
          "radial-gradient(1000px 600px at 80% 0%, rgba(120,40,200,0.55), transparent 60%), radial-gradient(800px 500px at 0% 100%, rgba(238,59,86,0.25), transparent 60%)",
      }}
    >
      <div className="container-page pt-16 sm:pt-24 lg:pt-32 pb-8 sm:pb-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 sm:gap-6">
          <h2 className="font-heading text-[28px] sm:text-[40px] md:text-[56px] leading-[1.08] sm:leading-[1.03] tracking-[-0.025em] text-white">
            {dict.events.title}
          </h2>
          <Link
            href={p(locale, "/portfolio")}
            className="inline-flex h-12 items-center rounded-full border border-white/25 px-5 text-[14px] font-medium text-white hover:bg-white/10 transition-colors self-start sm:self-auto"
          >
            {dict.events.allLink}
          </Link>
        </div>
      </div>

      <div className="container-page-left pb-16 sm:pb-24 lg:pb-32">
        <Carousel
          showCount
          controlsTone="dark"
          bleed="bleed-right"
          itemClassName="w-[80vw] sm:w-[44vw] lg:w-[28vw] max-w-[420px]"
          persistKey="home-events"
        >
          {events.map((e) => (
            <Link
              key={e.slug}
              href={p(locale, `/portfolio/${e.slug}`)}
              className="flex h-full flex-col bg-white text-ink rounded-[24px] overflow-hidden ring-1 ring-white/10 transition-transform hover:-translate-y-1"
            >
              <div
                className="aspect-[4/3] relative overflow-hidden"
                style={{ background: e.cover.gradient }}
              >
                {e.coverImage && (
                  <Image
                    src={e.coverImage}
                    alt={e.title}
                    fill
                    sizes="(min-width:1024px) 380px, (min-width:640px) 50vw, 80vw"
                    className="object-cover"
                  />
                )}
                <span className="absolute top-5 right-5 inline-flex items-center gap-1.5 rounded-full bg-black/35 backdrop-blur px-2.5 py-1 text-[10px] font-semibold tracking-[0.2em] uppercase text-white">
                  {CATEGORY_LABEL[e.category]}
                </span>
              </div>
              <div className="p-7 flex grow flex-col">
                <h3 className="text-[20px] leading-snug font-medium text-ink">
                  {e.title}
                </h3>
                <div className="mt-auto pt-6 flex items-center justify-end text-[13px] text-muted-fg">
                  <span className="text-brand font-medium">{dict.events.moreLink}</span>
                </div>
              </div>
            </Link>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
