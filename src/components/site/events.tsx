import { Carousel } from "./carousel";

type Event = {
  category: string;
  title: string;
  gradient: string;
  glyph: string;
};

const events: Event[] = [
  {
    category: "Концерты",
    title: "Как прошёл концерт-признание «Муза. Век.»",
    glyph: "♪",
    gradient: "linear-gradient(135deg, #5a0f2c 0%, #aa1d4a 60%, #e94570 100%)",
  },
  {
    category: "Праздники",
    title: "Новогодние ёлки в загородной резиденции",
    glyph: "❄",
    gradient: "linear-gradient(135deg, #1a3270 0%, #4671b8 50%, #c8def8 100%)",
  },
  {
    category: "Корпоративные мероприятия",
    title: "Новогоднее мероприятие для компании «Химик»",
    glyph: "✷",
    gradient: "linear-gradient(135deg, #2a045c 0%, #7826b8 60%, #ee3b9f 100%)",
  },
  {
    category: "Корпоративные мероприятия",
    title: "Новогодний вечер для технологического холдинга",
    glyph: "✦",
    gradient: "linear-gradient(135deg, #042a3a 0%, #11628c 60%, #57c0d6 100%)",
  },
  {
    category: "Тимбилдинги",
    title: "Большой проект — выезд на 220 человек",
    glyph: "▲",
    gradient: "linear-gradient(135deg, #0c4421 0%, #2d6a3e 55%, #80c39a 100%)",
  },
  {
    category: "Шоу-программы",
    title: "Вечер аргентинского танго",
    glyph: "❦",
    gradient: "linear-gradient(135deg, #2c0d0d 0%, #7a1d20 50%, #e7706f 100%)",
  },
];

export function Events() {
  return (
    <section
      id="portfolio"
      className="relative bg-brand text-white overflow-hidden"
      style={{
        backgroundImage:
          "radial-gradient(1000px 600px at 80% 0%, rgba(120,40,200,0.55), transparent 60%), radial-gradient(800px 500px at 0% 100%, rgba(238,59,86,0.25), transparent 60%)",
      }}
    >
      <div className="container-page pt-24 lg:pt-32 pb-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <h2 className="font-heading text-[40px] sm:text-[56px] leading-[1.03] tracking-[-0.025em] text-white">
            Последние мероприятия
          </h2>
          <a
            href="#all"
            className="inline-flex h-12 items-center rounded-full border border-white/25 px-5 text-[14px] font-medium text-white hover:bg-white/10 transition-colors self-start sm:self-auto"
          >
            Все проекты →
          </a>
        </div>
      </div>

      <div className="container-page-left pb-24 lg:pb-32">
        <Carousel
          showCount
          controlsTone="dark"
          bleed="bleed-right"
          itemClassName="w-[80vw] sm:w-[44vw] lg:w-[28vw] max-w-[420px]"
        >
          {events.map((e, i) => (
            <article
              key={i}
              className="bg-white text-ink rounded-[24px] overflow-hidden ring-1 ring-white/10"
            >
              <div
                className="aspect-[4/3] relative"
                style={{ background: e.gradient }}
              >
                <div
                  aria-hidden
                  className="absolute inset-0 mix-blend-overlay opacity-25"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'><filter id='n'><feTurbulence baseFrequency='0.7' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
                  }}
                />
                <span className="absolute top-5 left-5 text-white text-[42px] leading-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]">
                  {e.glyph}
                </span>
                <span className="absolute top-5 right-5 inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur px-2.5 py-1 text-[10px] font-semibold tracking-[0.2em] uppercase text-white">
                  Кейс
                </span>
              </div>
              <div className="p-7">
                <p className="text-[12px] tracking-[0.2em] uppercase text-muted-fg">
                  {e.category}
                </p>
                <h3 className="mt-3 text-[20px] leading-snug font-medium text-ink">
                  {e.title}
                </h3>
                <div className="mt-6 flex items-center justify-between text-[13px] text-muted-fg">
                  <span>2025–2026</span>
                  <span className="text-brand font-medium">Подробнее →</span>
                </div>
              </div>
            </article>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
