type Group = {
  title: string;
  accent: string;
  items: { label: string; featured?: boolean }[];
};

const groups: Group[] = [
  {
    title: "Корпоративные мероприятия",
    accent: "#1f1a55",
    items: [
      { label: "Новый год", featured: true },
      { label: "Выездное мероприятие" },
      { label: "Юбилей компании" },
      { label: "Корпоративные игры" },
      { label: "Профессиональный праздник" },
      { label: "Family day" },
      { label: "Общественное или благотворительное мероприятие" },
    ],
  },
  {
    title: "Услуги онлайн",
    accent: "#ee3b56",
    items: [
      { label: "онлайн игры" },
      { label: "онлайн квизы" },
      { label: "онлайн радио" },
      { label: "онлайн праздники" },
      { label: "иносфера" },
    ],
  },
  {
    title: "Частные мероприятия",
    accent: "#7826b8",
    items: [
      { label: "Свадьбы" },
      { label: "Дни рождения и юбилеи" },
      { label: "Семейные праздники" },
      { label: "Камерные ужины" },
    ],
  },
  {
    title: "Шоу-программы и продакшн",
    accent: "#11628c",
    items: [
      { label: "Концерты и шоу" },
      { label: "Постановочные церемонии" },
      { label: "Видео и лайв-стрим" },
      { label: "Световые и сценические решения" },
    ],
  },
];

export function Services() {
  return (
    <section id="services" className="relative bg-white text-ink">
      <div className="container-page py-24 lg:py-32">
        <div className="max-w-2xl mb-14">
          <h2 className="font-heading text-[40px] sm:text-[56px] leading-[1.04] tracking-[-0.025em] text-ink">
            Услуги
          </h2>
          <p className="mt-6 text-[16px] leading-relaxed text-body">
            Для Вашего удобства мы создали данный раздел, где можно
            ознакомиться с форматами мероприятий и перечнем оказываемых услуг.
            Событие не должно обязательно вписываться в существующие рамки —
            вместе мы можем создать новый неповторимый формат исходя из Ваших
            задач и особых пожеланий.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
          {groups.map((g, i) => (
            <div
              key={i}
              className="rounded-[20px] ring-1 ring-hairline bg-white p-8 lg:p-10 flex flex-col"
              style={{ borderLeft: `3px solid ${g.accent}` }}
            >
              <h3 className="font-heading text-[24px] lg:text-[28px] leading-tight tracking-[-0.01em] text-brand">
                {g.title}
              </h3>
              <ul className="mt-6 grid gap-y-3 text-[16px]">
                {g.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3 text-body">
                    <span
                      className="mt-2 inline-block h-1.5 w-1.5 rounded-full shrink-0"
                      style={{ background: g.accent }}
                    />
                    <span
                      className={
                        item.featured ? "text-brand font-semibold" : ""
                      }
                    >
                      {item.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
