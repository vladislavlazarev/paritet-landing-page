import Image from "next/image";
import Link from "next/link";

type Card = {
  title: string;
  caption: string;
  image: string;
  emoji: string;
  href: string;
};

const cards: Card[] = [
  {
    title: "Корпоративные мероприятия",
    caption: "Сцена, гости, полный зал",
    emoji: "🎉",
    image: "/home/about/korporativnye.webp",
    href: "/services/korporativnye-meroprijatija",
  },
  {
    title: "Концерты",
    caption: "Сцена. Свет. Звук.",
    emoji: "🎤",
    image: "/home/about/kontserty.webp",
    href: "/services/kontserty",
  },
  {
    title: "Тимбилдинги",
    caption: "Большой проект, лес и берёзы",
    emoji: "🌲",
    image: "/home/about/timbilding.webp",
    href: "/services/timbilding",
  },
  {
    title: "Частные мероприятия",
    caption: "Ужин при свете гирлянд",
    emoji: "🎩",
    image: "/home/about/chastnye.webp",
    href: "/services/chastnye-meropriyatiya",
  },
  {
    title: "Деловые мероприятия",
    caption: "Конференции и форумы",
    emoji: "🏛️",
    image: "/home/about/delovye.webp",
    href: "/services/delovye-meropriyatiya",
  },
  {
    title: "Праздники",
    caption: "Дворовые и городские",
    emoji: "🎈",
    image: "/home/about/prazdniki.webp",
    href: "/services",
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
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 lg:gap-4">
              {cards.map((c, i) => (
                <Link
                  key={i}
                  href={c.href}
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
                    <p className="text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.22em] uppercase opacity-85">
                      {c.caption}
                    </p>
                    <h4 className="mt-1.5 sm:mt-2 font-heading text-[16px] sm:text-[20px] lg:text-[22px] leading-tight">
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
