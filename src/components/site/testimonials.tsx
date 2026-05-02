import { Carousel } from "./carousel";

type Review = {
  brand: string;
  brandColor: string;
  badge: string;
  author: string;
  role: string;
  quote: string;
};

const reviews: Review[] = [
  {
    brand: "HUAWEI",
    brandColor: "#cf202f",
    badge: "HW",
    author: "Анна Соколова",
    role: "Бренд-менеджер, Huawei Russia",
    quote:
      "Команда «Паритет» полностью взяла на себя организацию выездного мероприятия для 400 партнёров. Идеально выверенная сценография и логистика — гости отметили это лично каждому.",
  },
  {
    brand: "MELON",
    brandColor: "#0a0b0d",
    badge: "MF",
    author: "Дарья Кузнецова",
    role: "Head of Events, Melon Fashion Group",
    quote:
      "Работаем с агентством уже шесть лет — каждый раз получается что-то совершенно новое. Креативная команда умеет слышать и предлагать решения сильнее, чем ожидаешь.",
  },
  {
    brand: "Газпром нефть",
    brandColor: "#11628c",
    badge: "ГН",
    author: "Игорь Прохоров",
    role: "Директор по внутренним коммуникациям",
    quote:
      "Family day на 1500 сотрудников прошёл как часы. Все детали, от трансфера до финального шоу, были учтены — а зрительские эмоции говорят сами за себя.",
  },
  {
    brand: "ЛСР",
    brandColor: "#5b616e",
    badge: "ЛСР",
    author: "Екатерина Ленская",
    role: "PR-директор",
    quote:
      "Юбилейный вечер компании оставил у гостей ощущение театральной премьеры. Команда «Паритет» превратила корпоративную встречу в настоящее событие года.",
  },
];

export function Testimonials() {
  return (
    <section className="relative bg-white text-ink">
      <div className="container-page py-16 sm:py-24 lg:py-32">
        <div className="max-w-2xl mb-8 sm:mb-12">
          <h2 className="font-heading text-[32px] sm:text-[44px] md:text-[52px] leading-[1.08] sm:leading-[1.04] tracking-[-0.025em] text-ink">
            Отзывы клиентов
          </h2>
        </div>

        <Carousel
          showCount
          itemClassName="w-[88%] sm:w-[64%] lg:w-[48%]"
        >
          {reviews.map((r, i) => (
            <article
              key={i}
              className="rounded-[24px] bg-surface-soft p-6 sm:p-8 lg:p-10 ring-1 ring-hairline h-full"
            >
              <div className="flex items-center gap-4 mb-6 sm:mb-8">
                <span
                  className="grid h-12 w-12 sm:h-14 sm:w-14 place-items-center rounded-[14px] text-white text-[13px] sm:text-[14px] font-bold tracking-wider shrink-0"
                  style={{ background: r.brandColor }}
                >
                  {r.badge}
                </span>
                <div className="min-w-0">
                  <p className="text-[13px] sm:text-[14px] font-semibold tracking-[0.16em] sm:tracking-[0.18em] uppercase text-ink">
                    {r.brand}
                  </p>
                  <p className="text-[12px] sm:text-[13px] text-muted-fg mt-1">{r.role}</p>
                </div>
              </div>
              <p className="text-[16px] sm:text-[18px] leading-relaxed text-ink">
                «{r.quote}»
              </p>
              <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-hairline flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <span className="text-[14px] font-medium text-ink">{r.author}</span>
                <a
                  href="#"
                  className="text-[14px] font-medium text-brand hover:underline underline-offset-4"
                >
                  Читать полностью →
                </a>
              </div>
            </article>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
