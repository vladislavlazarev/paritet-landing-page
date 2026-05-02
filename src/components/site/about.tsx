type Card = {
  title: string;
  caption: string;
  gradient: string;
  emoji: string;
};

const cards: Card[] = [
  {
    title: "Тимбилдинги",
    caption: "Большой проект, лес и берёзы",
    emoji: "🌲",
    gradient: "linear-gradient(135deg, #2d6a3e 0%, #4a8f5b 50%, #80c39a 100%)",
  },
  {
    title: "Частные мероприятия",
    caption: "Ужин при свете гирлянд",
    emoji: "🎩",
    gradient: "linear-gradient(135deg, #8b5a2b 0%, #c98e57 50%, #f3c581 100%)",
  },
  {
    title: "Концерты и шоу",
    caption: "Сцена. Свет. Полный зал.",
    emoji: "🎭",
    gradient: "linear-gradient(135deg, #5a0f2c 0%, #aa1d4a 50%, #e94570 100%)",
  },
  {
    title: "Корпоративные ёлки",
    caption: "Зима, олени и северное сияние",
    emoji: "🦌",
    gradient: "linear-gradient(135deg, #1f3a72 0%, #4671b8 50%, #a8c8ed 100%)",
  },
];

export function About() {
  return (
    <section id="about" className="relative bg-white text-ink">
      <h2 className="sr-only">О компании</h2>
      <div className="container-page py-16 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          <div className="lg:col-span-5 flex flex-col">
            <h3 className="font-heading text-[28px] sm:text-[36px] md:text-[44px] lg:text-[52px] leading-[1.1] sm:leading-[1.05] tracking-[-0.025em] text-brand">
              <span className="whitespace-nowrap">«Паритет Events» —</span>
              <br /> организация праздников
            </h3>
            <p className="mt-5 sm:mt-6 text-[15px] sm:text-[16px] leading-relaxed text-body max-w-md">
              Уже более 20 лет нашу команду объединяет стремление дарить людям
              радость. За годы работы мы разработали сотни концепций и
              авторских форматов для частных клиентов и компаний с мировым
              именем.
            </p>

            <div className="mt-6 sm:mt-7 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="inline-flex h-12 items-center rounded-full bg-brand px-6 text-[14px] font-semibold text-white hover:bg-brand-strong transition-colors"
              >
                Обсудить проект
              </a>
              <a
                href="#services"
                className="inline-flex h-12 items-center rounded-full border border-hairline px-6 text-[14px] font-medium text-ink hover:bg-surface-soft transition-colors"
              >
                Все услуги →
              </a>
            </div>

            <dl className="mt-8 lg:mt-auto pt-8 sm:pt-10 grid grid-cols-3 gap-4 sm:gap-6 max-w-md">
              <div>
                <dt className="text-[10px] sm:text-[11px] tracking-[0.18em] sm:tracking-[0.2em] uppercase text-muted-fg">Лет опыта</dt>
                <dd className="mt-2 font-heading text-[24px] sm:text-[30px] tracking-tight text-ink">20+</dd>
              </div>
              <div>
                <dt className="text-[10px] sm:text-[11px] tracking-[0.18em] sm:tracking-[0.2em] uppercase text-muted-fg">Проектов</dt>
                <dd className="mt-2 font-heading text-[24px] sm:text-[30px] tracking-tight text-ink">800+</dd>
              </div>
              <div>
                <dt className="text-[10px] sm:text-[11px] tracking-[0.18em] sm:tracking-[0.2em] uppercase text-muted-fg">Городов</dt>
                <dd className="mt-2 font-heading text-[24px] sm:text-[30px] tracking-tight text-ink">42</dd>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-3 lg:gap-4 h-full min-h-[420px] sm:min-h-[520px] lg:min-h-0">
              {cards.map((c, i) => (
                <a
                  key={i}
                  href="#services"
                  className="group relative overflow-hidden rounded-[20px] ring-1 ring-hairline h-full min-h-[180px] sm:min-h-[240px]"
                  style={{ background: c.gradient }}
                >
                  <div
                    aria-hidden
                    className="absolute inset-0 mix-blend-overlay opacity-30 transition-opacity duration-500 group-hover:opacity-40"
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'><filter id='n'><feTurbulence baseFrequency='0.7' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
                    }}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 to-transparent"
                  />

                  <span className="absolute top-4 right-4 sm:top-5 sm:right-5 text-xl sm:text-2xl drop-shadow-[0_4px_10px_rgba(0,0,0,0.35)]">
                    {c.emoji}
                  </span>

                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 lg:p-6 text-white">
                    <p className="text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.22em] uppercase opacity-85">
                      {c.caption}
                    </p>
                    <h4 className="mt-1.5 sm:mt-2 font-heading text-[16px] sm:text-[20px] lg:text-[22px] leading-tight">
                      {c.title}
                    </h4>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
