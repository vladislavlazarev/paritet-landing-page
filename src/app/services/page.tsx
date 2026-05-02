import Link from "next/link";
import type { CSSProperties } from "react";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { SERVICE_GROUPS } from "@/lib/services-home-data";
import { buildMeta, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = buildMeta({
  path: "/services",
  title: "Услуги Паритет Events: организация мероприятий в Санкт-Петербурге",
  description:
    "Форматы мероприятий и услуг Paritet Events: корпоративы, тимбилдинги, концерты, частные праздники, деловые и онлайн-мероприятия в Санкт-Петербурге.",
});

const breadcrumbs = breadcrumbJsonLd([
  { name: "Главная", url: "/" },
  { name: "Услуги", url: "/services" },
]);

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <Header />
      <main className="flex-1">
        <section className="relative bg-brand text-white overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-[60%] sm:w-[48%] lg:w-[42%]"
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

          <div className="container-page relative pt-24 sm:pt-36 lg:pt-44 pb-14 sm:pb-20 lg:pb-28">
            <p className="text-[12px] sm:text-[13px] tracking-[0.28em] uppercase text-white/55">
              Что мы делаем
            </p>
            <h1 className="mt-5 sm:mt-6 font-heading text-[52px] sm:text-[88px] md:text-[120px] lg:text-[160px] leading-[0.92] tracking-[-0.03em] text-white">
              Услуги
            </h1>
            <p className="mt-7 sm:mt-9 lg:mt-10 max-w-2xl text-[15px] sm:text-[16px] lg:text-[17px] leading-relaxed text-white/85">
              Здесь собраны форматы мероприятий и перечень оказываемых услуг.
              Событие не должно вписываться в существующие рамки — вместе мы
              можем создать новый неповторимый формат исходя из ваших задач
              и пожеланий.
            </p>
          </div>
        </section>

        <section className="bg-surface-soft">
          <div className="container-page py-14 sm:py-20 lg:py-28">
            <div className="flex flex-col gap-5 sm:gap-6">
              {SERVICE_GROUPS.map((g) => (
                <article
                  key={g.slug}
                  id={g.slug}
                  className="group/card relative rounded-[20px] bg-white ring-1 ring-hairline overflow-hidden scroll-mt-28 shadow-[0_1px_2px_rgba(15,17,23,0.04)] transition-shadow hover:shadow-[0_18px_50px_-30px_rgba(31,26,85,0.25)]"
                  style={{ ["--accent"]: g.accent } as CSSProperties}
                >
                  <span
                    aria-hidden
                    className="absolute inset-y-0 left-0 w-[6px]"
                    style={{ background: g.accent }}
                  />

                  <div className="px-5 sm:px-10 lg:px-14 py-7 sm:py-11 lg:py-14">
                    <Link
                      href={`/services/${g.slug}`}
                      className="group/title inline-flex items-center gap-2.5"
                    >
                      <h2 className="font-heading text-[22px] sm:text-[30px] lg:text-[40px] leading-[1.05] tracking-[-0.02em] text-brand transition-colors group-hover/title:text-[color:var(--accent)]">
                        {g.title}
                      </h2>
                      <span
                        aria-hidden
                        className="text-[20px] leading-none translate-y-[1px] text-[color:var(--accent)] transition-transform group-hover/title:translate-x-1"
                      >
                        →
                      </span>
                    </Link>

                    <ul className="mt-7 sm:mt-8 flex flex-wrap gap-2.5 sm:gap-3">
                      {g.items.map((item, j) => {
                        if (!item.slug) {
                          return (
                            <li key={j}>
                              <span className="inline-flex items-center rounded-full ring-1 ring-hairline bg-surface-soft px-4 py-2.5 text-[14px] sm:text-[15px] leading-none text-muted-fg">
                                {item.label}
                              </span>
                            </li>
                          );
                        }
                        return (
                          <li key={j}>
                            <Link
                              href={`/services/${item.slug}`}
                              className={
                                "group/chip inline-flex items-center gap-1.5 rounded-full ring-1 px-4 py-2.5 text-[14px] sm:text-[15px] leading-none transition-colors " +
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
      </main>
      <Footer />
    </>
  );
}
