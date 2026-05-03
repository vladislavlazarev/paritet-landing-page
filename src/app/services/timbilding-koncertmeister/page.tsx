import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { Carousel } from "@/components/site/carousel";

export const metadata: Metadata = {
  title:
    "Музыкальный тимбилдинг «Концертмейстер» — Паритет Events",
  description:
    "Уникальный тимбилдинг через музыку: ваша команда от 50 до 450 человек собирается в настоящий оркестр и исполняет известный хит на скрипках под руководством профессионального дирижёра.",
};

const ASSETS = "/services/koncertmeister";

const LEAD_FACTS = [
  { title: "от 3 000 ₽", subtitle: "с человека" },
  { title: "50–450", subtitle: "участников" },
  { title: "1–3 часа", subtitle: "монтаж" },
  { title: "Свой продакшн", subtitle: "звук, свет, инструменты" },
];

const STEPS = [
  {
    title: "Дата и площадка",
    body:
      "Выбираете дату и площадку — мы подсказываем, какие залы подходят под формат и количество гостей.",
  },
  {
    title: "Монтаж под ключ",
    body:
      "Привозим инструменты, свет, звук и общаемся с техническим персоналом площадки. Время монтажа — от 1 до 3 часов.",
  },
  {
    title: "Концерт команды",
    body:
      "Ваши коллеги впервые берут в руки скрипку — и через час выходят на финальный концерт перед всей компанией.",
  },
];

const VIDEO_FEATURE = {
  poster: `${ASSETS}/ivn_2210.webp`,
  title: "Финальный концерт «Газпром нефть»",
  meta: "350 человек · полный зал ДК Ленсовета",
  duration: "2:10",
};

const VIDEO_SECONDARY = [
  {
    poster: `${ASSETS}/dsc_3367.webp`,
    title: "Репетиция за час до выхода",
    meta: "Скрипки, дирижёр, разбор партии",
    duration: "1:24",
  },
  {
    poster: `${ASSETS}/ivn_2547.webp`,
    title: "Реакция команды на собственный звук",
    meta: "Закулисье, бэкстейдж концерта",
    duration: "0:48",
  },
];

const SOUNDTRACKS = [
  { title: "Игра престолов", composer: "Ramin Djawadi", duration: "4:12" },
  { title: "Интерстеллар", composer: "Hans Zimmer", duration: "3:08" },
  { title: "Пираты Карибского моря", composer: "Klaus Badelt", duration: "3:42" },
  { title: "Гравитация", composer: "Steven Price", duration: "2:54" },
  { title: "Властелин колец", composer: "Howard Shore", duration: "4:30" },
  { title: "Список Шиндлера", composer: "John Williams", duration: "3:18" },
];

const RELATED = [
  {
    title: "Корпоративный новый год",
    caption: "Большой формат с шоу и хедлайнером",
    href: "/services/korporativnyj-novyj-god",
    image: `${ASSETS}/related-novyj-god.jpg`,
  },
  {
    title: "Выездной тимбилдинг",
    caption: "Природа, активности, гала-ужин",
    href: "/services/vyezdnoj-timbilding",
    image: `${ASSETS}/related-vyezdnoj.jpg`,
  },
  {
    title: "Юбилей компании",
    caption: "Торжественный вечер со сценой",
    href: "/services/yubilej-kompanii",
    image: `${ASSETS}/related-yubilej.jpg`,
  },
  {
    title: "Family day",
    caption: "Семейный праздник для сотрудников",
    href: "/services/family-day",
    image: `${ASSETS}/photo-0263.webp`,
  },
];

export default function KoncertmeisterPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* HERO — full-bleed image + dark overlay; targets ~100svh, grows for long content */}
        <section className="relative isolate overflow-hidden bg-[#0a0b0d] text-white min-h-[100svh] flex items-end pt-28 sm:pt-32 lg:pt-36 pb-10 sm:pb-12 lg:pb-16">
          <Image
            src={`${ASSETS}/ivn_2567.webp`}
            alt=""
            fill
            priority
            quality={90}
            sizes="100vw"
            className="absolute inset-0 -z-20 object-cover"
          />
          <div aria-hidden className="absolute inset-0 -z-10 bg-black/55" />
          <div
            aria-hidden
            className="absolute inset-0 -z-10"
            style={{
              backgroundImage:
                "radial-gradient(900px 600px at 80% 25%, rgba(120,40,200,0.38), transparent 60%), linear-gradient(180deg, transparent 0%, rgba(10,11,13,0.55) 55%, rgba(10,11,13,0.92) 100%)",
            }}
          />

          <div className="container-page w-full">
            <div className="max-w-4xl">
              <Link
                href="/services/timbilding"
                className="inline-block text-[12px] sm:text-[13px] tracking-[0.28em] uppercase text-white/65 hover:text-accent-coral transition-colors mb-4 sm:mb-5"
              >
                ← Тимбилдинги
              </Link>

              <h1 className="font-heading text-[32px] sm:text-[44px] md:text-[56px] lg:text-[72px] leading-[1.05] tracking-[-0.025em] text-white">
                Музыкальный тимбилдинг «Концертмейстер»
              </h1>

              <p className="mt-4 sm:mt-5 max-w-3xl text-[15px] sm:text-[16px] lg:text-[17px] leading-relaxed text-white/85">
                Под руководством профессионального дирижёра ваш коллектив за
                один вечер становится настоящим оркестром и исполняет
                известный хит на скрипках. Программа собирается под формат
                от 50 до 450 человек.
              </p>

              <div className="mt-6 sm:mt-7 flex flex-wrap items-center gap-3">
                <a
                  href="tel:+79214102121"
                  className="inline-flex h-11 sm:h-12 items-center gap-2 rounded-full bg-accent-coral px-5 sm:px-6 text-[14px] font-semibold text-white hover:bg-accent-coral-strong transition-colors"
                >
                  Позвонить
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      d="M5 12h14M13 6l6 6-6 6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
                <a
                  href="tel:+79214102121"
                  className="inline-flex h-11 sm:h-12 items-center rounded-full border border-white/25 hover:bg-white/10 transition-colors px-5 sm:px-6 text-[14px] font-medium text-white"
                >
                  +7 (921) 410-21-21
                </a>

                <ul className="hidden md:flex flex-wrap items-center gap-x-7 lg:gap-x-9 ml-2 lg:ml-3 pl-5 lg:pl-7 border-l border-white/20">
                  {LEAD_FACTS.map((f, i) => (
                    <li key={i} className="flex flex-col leading-tight">
                      <span className="font-heading text-[15px] lg:text-[16px] tracking-[-0.01em] text-white whitespace-nowrap">
                        {f.title}
                      </span>
                      <span className="mt-0.5 text-[11px] lg:text-[12px] tracking-[0.04em] text-white/55 whitespace-nowrap">
                        {f.subtitle}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <ul className="md:hidden mt-5 flex flex-wrap gap-x-6 gap-y-3 pt-4 border-t border-white/15">
                {LEAD_FACTS.map((f, i) => (
                  <li key={i} className="flex flex-col leading-tight">
                    <span className="font-heading text-[15px] tracking-[-0.01em] text-white">
                      {f.title}
                    </span>
                    <span className="mt-0.5 text-[11px] tracking-[0.04em] text-white/55">
                      {f.subtitle}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS — three step cards, then videos */}
        <section className="relative bg-white text-ink">
          <div className="container-page py-16 sm:py-24 lg:py-32">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 sm:gap-10 mb-10 sm:mb-14 lg:mb-16">
              <div className="max-w-xl">
                <p className="text-[11px] sm:text-[12px] tracking-[0.28em] uppercase text-muted-fg">
                  Как это работает
                </p>
                <h2 className="mt-4 font-heading text-[28px] sm:text-[40px] md:text-[52px] leading-[1.05] tracking-[-0.025em] text-ink">
                  Три шага от заявки до&nbsp;концерта
                </h2>
              </div>
              <p className="max-w-sm text-[14px] sm:text-[15px] leading-relaxed text-body">
                Программа собирается под ваш формат — мы берём на себя всю
                техническую и творческую часть, вы только выбираете дату.
              </p>
            </div>

            <ol className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
              {STEPS.map((s, i) => (
                <li
                  key={i}
                  className="rounded-[20px] bg-surface-soft p-6 sm:p-8 lg:p-10 ring-1 ring-hairline flex flex-col"
                >
                  <span className="font-heading text-[36px] sm:text-[56px] lg:text-[72px] leading-none tracking-[-0.03em] text-brand">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 sm:mt-6 text-[18px] sm:text-[20px] leading-snug font-medium text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-[14px] sm:text-[15px] leading-relaxed text-body">
                    {s.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* VIDEOS — featured + 2 secondary, asymmetric */}
        <section className="relative bg-surface-soft text-ink">
          <div className="container-page py-16 sm:py-24 lg:py-28">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-12">
              <div className="max-w-xl">
                <p className="text-[11px] sm:text-[12px] tracking-[0.28em] uppercase text-muted-fg">
                  Видео
                </p>
                <h2 className="mt-4 font-heading text-[28px] sm:text-[40px] md:text-[52px] leading-[1.05] tracking-[-0.025em] text-ink">
                  Как это звучит вживую
                </h2>
              </div>
              <Link
                href="/portfolio?filter=teambuilding"
                className="inline-flex h-12 items-center rounded-full border border-hairline px-5 text-[14px] font-medium text-ink hover:bg-white transition-colors self-start sm:self-auto"
              >
                Все тимбилдинги →
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 lg:gap-6">
              <div className="lg:col-span-8">
                <VideoCard {...VIDEO_FEATURE} variant="feature" />
              </div>
              <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-5 lg:gap-6">
                {VIDEO_SECONDARY.map((v, i) => (
                  <VideoCard key={i} {...v} variant="compact" />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* MUSIC EXPLAINER — dark brand band, single feature photo */}
        <section
          className="relative bg-brand text-white overflow-hidden"
          style={{
            backgroundImage:
              "radial-gradient(1000px 600px at 85% 10%, rgba(120,40,200,0.5), transparent 60%), radial-gradient(800px 500px at 0% 90%, rgba(238,59,86,0.22), transparent 60%)",
          }}
        >
          <div className="container-page py-16 sm:py-24 lg:py-32">
            <div className="max-w-3xl mb-10 sm:mb-14">
              <p className="text-[11px] sm:text-[12px] tracking-[0.28em] uppercase text-white/55">
                Программа
              </p>
              <h2 className="mt-4 font-heading text-[28px] sm:text-[40px] md:text-[52px] leading-[1.05] tracking-[-0.025em] text-white">
                Какую музыку гарантировано исполнит ваша команда?
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              <div className="lg:col-span-5 space-y-5">
                <p className="text-[15px] sm:text-[17px] leading-relaxed text-white/85">
                  Музыкальный тимбилдинг создан для групп от 50 до 450 человек —
                  участники впервые играют на скрипке под руководством
                  профессионального музыканта. Ваш коллектив становится
                  настоящим оркестром и исполняет известный хит.
                </p>
                <p className="text-[15px] sm:text-[17px] leading-relaxed text-white/70">
                  Самые торжественные, эпические и драматические моменты в
                  фильмах идут под неоклассику. Сыграйте их вместе — и
                  атмосфера зала встанет в полный рост.
                </p>

                <div className="pt-4">
                  <a
                    href="tel:+79214102121"
                    className="inline-flex items-center gap-2 text-[14px] sm:text-[15px] font-medium text-white border-b border-white/30 hover:border-accent-coral hover:text-accent-coral transition-colors pb-1"
                  >
                    Позвонить и&nbsp;уточнить, какой хит подойдёт вашей команде
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="rounded-[20px] sm:rounded-[24px] bg-white/[0.04] ring-1 ring-white/10 backdrop-blur-sm p-5 sm:p-8 lg:p-10">
                  <div className="flex items-end justify-between mb-6 sm:mb-8 pb-5 sm:pb-6 border-b border-white/10">
                    <div>
                      <p className="text-[10px] sm:text-[11px] tracking-[0.28em] uppercase text-white/55">
                        Сетлист
                      </p>
                      <p className="mt-2 font-heading text-[20px] sm:text-[24px] tracking-tight text-white">
                        Что играет ваша команда
                      </p>
                    </div>
                    <p className="text-[12px] sm:text-[13px] tracking-[0.06em] text-white/45 tabular-nums">
                      6 композиций
                    </p>
                  </div>

                  <ol className="space-y-0">
                    {SOUNDTRACKS.map((s, i) => (
                      <li
                        key={s.title}
                        className="group flex items-center gap-3 sm:gap-6 py-3 sm:py-4 border-b border-white/[0.06] last:border-0 transition-colors hover:bg-white/[0.02] -mx-2 sm:-mx-3 px-2 sm:px-3 rounded-lg"
                      >
                        <span className="font-mono text-[11px] sm:text-[12px] text-white/40 tabular-nums w-7 sm:w-8 group-hover:text-accent-coral transition-colors">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div className="grow min-w-0">
                          <p className="font-heading text-[16px] sm:text-[22px] lg:text-[24px] leading-tight tracking-[-0.015em] text-white truncate">
                            {s.title}
                          </p>
                          <p className="mt-0.5 text-[12px] sm:text-[13px] text-white/50">
                            {s.composer}
                          </p>
                        </div>
                        <span className="font-mono text-[12px] sm:text-[13px] text-white/45 tabular-nums shrink-0">
                          {s.duration}
                        </span>
                        <span
                          aria-hidden
                          className="ml-1 sm:ml-2 grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-full bg-white/5 ring-1 ring-white/10 text-white/60 group-hover:bg-accent-coral group-hover:ring-accent-coral group-hover:text-white transition-all shrink-0"
                        >
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* Bento grid — 5 photos, no gaps, fills space */}
          <div className="container-page pb-16 sm:pb-24 lg:pb-32">
            <div className="grid grid-cols-2 sm:grid-cols-4 sm:grid-rows-2 gap-2 sm:gap-3 sm:h-[440px] lg:h-[560px]">
              <div className="col-span-2 sm:row-span-2 relative aspect-[16/10] sm:aspect-auto rounded-[16px] overflow-hidden ring-1 ring-white/10 group">
                <Image
                  src={`${ASSETS}/skolkovo0102_on1.jpg`}
                  alt="Дирижёр перед оркестром на корпоративном вечере"
                  fill
                  sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <div className="relative aspect-square sm:aspect-auto rounded-[14px] overflow-hidden ring-1 ring-white/10 group">
                <Image
                  src={`${ASSETS}/ivn_0912.webp`}
                  alt="Финальный концерт под световой партитурой"
                  fill
                  sizes="(min-width: 640px) 25vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
              </div>
              <div className="relative aspect-square sm:aspect-auto rounded-[14px] overflow-hidden ring-1 ring-white/10 group">
                <Image
                  src={`${ASSETS}/ivn_4756.webp`}
                  alt="Скрипачка на сцене"
                  fill
                  sizes="(min-width: 640px) 25vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
              </div>
              <div className="relative aspect-square sm:aspect-auto rounded-[14px] overflow-hidden ring-1 ring-white/10 group">
                <Image
                  src={`${ASSETS}/dsc_3182-615x410.webp`}
                  alt="Команда участников на скрипках"
                  fill
                  sizes="(min-width: 640px) 25vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
              </div>
              <div className="relative aspect-square sm:aspect-auto rounded-[14px] overflow-hidden ring-1 ring-white/10 group">
                <Image
                  src={`${ASSETS}/photo-0057_on1.jpg`}
                  alt="Оркестр на корпоративном вечере"
                  fill
                  sizes="(min-width: 640px) 25vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* RELATED SERVICES — bleed-right carousel matching events.tsx */}
        <section className="relative bg-white text-ink overflow-hidden">
          <div className="container-page pt-16 sm:pt-24 lg:pt-32 pb-8 sm:pb-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 sm:gap-6">
              <div className="max-w-xl">
                <p className="text-[11px] sm:text-[12px] tracking-[0.28em] uppercase text-muted-fg">
                  Другие услуги
                </p>
                <h2 className="mt-4 font-heading text-[28px] sm:text-[40px] md:text-[52px] leading-[1.05] tracking-[-0.025em] text-ink">
                  Под ваш формат и&nbsp;масштаб
                </h2>
              </div>
              <Link
                href="/services"
                className="inline-flex h-12 items-center rounded-full border border-hairline px-5 text-[14px] font-medium text-ink hover:bg-surface-soft transition-colors self-start sm:self-auto"
              >
                Все услуги →
              </Link>
            </div>
          </div>

          <div className="container-page-left pb-16 sm:pb-24 lg:pb-32">
            <Carousel
              showCount
              controlsTone="light"
              bleed="bleed-right"
              itemClassName="w-[80vw] sm:w-[44vw] lg:w-[28vw] max-w-[420px]"
            >
              {RELATED.map((r) => (
                <Link
                  key={r.href}
                  href={r.href}
                  className="block bg-white text-ink rounded-[24px] overflow-hidden ring-1 ring-hairline transition-transform hover:-translate-y-1"
                >
                  <div className="aspect-[4/3] relative overflow-hidden bg-surface-soft">
                    <Image
                      src={r.image}
                      alt={r.title}
                      fill
                      sizes="(min-width:1024px) 380px, (min-width:640px) 44vw, 80vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-7">
                    <p className="text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-muted-fg">
                      {r.caption}
                    </p>
                    <h3 className="mt-2 text-[18px] sm:text-[20px] leading-snug font-medium text-ink">
                      {r.title}
                    </h3>
                    <div className="mt-6 flex items-center justify-end text-[13px]">
                      <span className="text-brand font-medium">Подробнее →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </Carousel>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-white">
          <div className="container-page pb-16 sm:pb-20 lg:pb-24">
            <div
              className="rounded-[20px] sm:rounded-[28px] px-5 sm:px-12 lg:px-20 py-10 sm:py-16 lg:py-24 text-white relative overflow-hidden"
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

              <div className="relative max-w-3xl">
                <h2 className="font-heading text-[32px] sm:text-[48px] md:text-[64px] leading-[1.04] tracking-[-0.025em]">
                  Начнём планировать?
                </h2>
                <p className="mt-5 sm:mt-7 text-[15px] sm:text-[16px] leading-relaxed text-white/80 max-w-lg">
                  Позвоните нам или напишите в&nbsp;Telegram:
                </p>

                <div className="mt-8 sm:mt-10 space-y-2 sm:space-y-3">
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

                <div className="mt-8 sm:mt-10 flex flex-wrap gap-3">
                  <a
                    href="tel:+79214102121"
                    className="inline-flex h-11 items-center gap-2 rounded-full bg-white/10 hover:bg-white/15 transition-colors px-5 text-[14px] font-medium text-white"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.5 0 1 .4 1 1V20c0 .5-.5 1-1 1-9.4 0-17-7.6-17-17 0-.5.5-1 1-1h3.4c.6 0 1 .5 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1z" /></svg>
                    Позвонить
                  </a>
                  <a
                    href="https://t.me/paritetevents"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center gap-2 rounded-full bg-white/10 hover:bg-white/15 transition-colors px-5 text-[14px] font-medium text-white"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22 3 2 11l6 2 2 7 4-5 6 5 2-17z" /></svg>
                    Telegram
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

type VideoCardProps = {
  poster: string;
  title: string;
  meta?: string;
  duration: string;
  variant?: "feature" | "compact";
};

function VideoCard({
  poster,
  title,
  meta,
  duration,
  variant = "compact",
}: VideoCardProps) {
  const isFeature = variant === "feature";

  const aspect = isFeature
    ? "aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[480px]"
    : "aspect-[16/10] lg:aspect-[16/11]";

  const playSize = isFeature
    ? "h-16 w-16 sm:h-20 sm:w-20"
    : "h-12 w-12 sm:h-14 sm:w-14";

  const playIconSize = isFeature ? 24 : 18;

  const titleSize = isFeature
    ? "font-heading text-[22px] sm:text-[28px] md:text-[32px] lg:text-[40px] leading-tight tracking-[-0.02em]"
    : "font-heading text-[16px] sm:text-[18px] leading-tight tracking-[-0.015em]";

  return (
    <button
      type="button"
      aria-label={`Смотреть видео — ${title}`}
      className={`group relative w-full ${aspect} rounded-[18px] overflow-hidden ring-1 ring-hairline cursor-pointer bg-ink text-left`}
    >
      <Image
        src={poster}
        alt={title}
        fill
        sizes={
          isFeature
            ? "(min-width: 1024px) 65vw, 100vw"
            : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        }
        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity group-hover:from-black/85" />

      <span className="absolute top-4 sm:top-5 left-4 sm:left-5 inline-flex items-center gap-1.5 rounded-full bg-black/45 backdrop-blur-sm px-2.5 py-1 text-[10px] sm:text-[11px] font-medium tracking-[0.18em] uppercase text-white/85">
        <span className="h-1.5 w-1.5 rounded-full bg-accent-coral" />
        Видео
      </span>

      <span className="absolute top-4 sm:top-5 right-4 sm:right-5 rounded-md bg-black/55 backdrop-blur-sm px-2 py-1 text-[11px] sm:text-[12px] font-medium text-white tabular-nums">
        {duration}
      </span>

      <span
        aria-hidden
        className={`absolute ${
          isFeature
            ? "left-1/2 top-1/2 -translate-x-1/2 -translate-y-[calc(50%+24px)] sm:-translate-y-[calc(50%+32px)]"
            : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        } pointer-events-none`}
      >
        <span className={`relative grid ${playSize} place-items-center rounded-full bg-white/95 text-brand shadow-[0_12px_30px_-8px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:scale-105`}>
          <span
            aria-hidden
            className="absolute inset-0 rounded-full ring-2 ring-white/40 scale-100 opacity-0 group-hover:opacity-100 group-hover:scale-[1.4] transition-all duration-500"
          />
          <svg width={playIconSize} height={playIconSize} viewBox="0 0 24 24" fill="currentColor" className="ml-0.5">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>

      <div
        className={`absolute inset-x-0 bottom-0 ${
          isFeature ? "p-5 sm:p-7 lg:p-8" : "p-4 sm:p-5"
        } text-white`}
      >
        <h3 className={`${titleSize} text-white`}>{title}</h3>
        {meta && (
          <p className={`mt-1.5 sm:mt-2 ${isFeature ? "text-[13px] sm:text-[14px]" : "text-[12px] sm:text-[13px]"} text-white/70`}>
            {meta}
          </p>
        )}
      </div>
    </button>
  );
}
