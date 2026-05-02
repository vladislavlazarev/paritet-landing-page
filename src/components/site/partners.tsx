import Image from "next/image";

type Partner = {
  name: string;
  slug: string;
  ext: "svg" | "png";
};

const partners: Partner[] = [
  { name: "Санкт-Петербург", slug: "spb", ext: "png" },
  { name: "ЛСР", slug: "lsr", ext: "png" },
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
];

export function Partners() {
  return (
    <section className="relative bg-surface-soft text-ink">
      <div className="container-page py-16 sm:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <h2 className="font-heading text-[26px] sm:text-[36px] md:text-[44px] lg:text-[52px] leading-[1.1] sm:leading-[1.05] tracking-[-0.025em] text-brand">
              Партнёры мировых брендов,
              <br /> друзья частных клиентов
            </h2>
            <p className="mt-6 sm:mt-8 text-[15px] sm:text-[16px] leading-relaxed text-body max-w-md">
              «Паритет Events» — Ваш бизнес-партнёр в искусстве мероприятий.
              Благодаря огромному опыту работы в event-индустрии мы понимаем,
              как уложиться в сроки и бюджет, упорядочив хаос логистики и
              переговоров.
            </p>
            <p className="mt-4 sm:mt-5 text-[15px] sm:text-[16px] leading-relaxed text-body max-w-md">
              Мы совмещаем творчество и профессионализм, чтобы вносить в
              корпоративный мир новое и вдохновляющее.
            </p>
            <a
              href="#about"
              className="mt-8 sm:mt-10 inline-flex h-12 items-center rounded-full bg-brand px-5 sm:px-6 text-[14px] sm:text-[15px] font-semibold text-white hover:bg-brand-strong transition-colors"
            >
              О компании
            </a>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-hairline rounded-[20px] overflow-hidden ring-1 ring-hairline">
              {partners.map((p) => (
                <div
                  key={p.slug}
                  className="group relative aspect-[4/3] flex items-center justify-center bg-white p-4 sm:p-8"
                >
                  <div className="relative w-[70%] h-[60%]">
                    <Image
                      src={`/partners/${p.slug}-gray.${p.ext}`}
                      alt={p.name}
                      fill
                      sizes="(min-width: 1024px) 180px, (min-width: 640px) 30vw, 45vw"
                      className="object-contain opacity-80 transition-opacity duration-300 group-hover:opacity-0"
                    />
                    <Image
                      src={`/partners/${p.slug}-color.${p.ext}`}
                      alt=""
                      aria-hidden
                      fill
                      sizes="(min-width: 1024px) 180px, (min-width: 640px) 30vw, 45vw"
                      className="object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
