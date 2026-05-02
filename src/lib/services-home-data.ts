export type ServiceItem = {
  label: string;
  slug?: string;
  featured?: boolean;
};

export type ServiceGroup = {
  title: string;
  slug: string;
  accent: string;
  cover: string;
  items: ServiceItem[];
};

export const SERVICE_GROUPS: ServiceGroup[] = [
  {
    title: "Корпоративные мероприятия",
    slug: "korporativnye-meroprijatija",
    accent: "#2a1a78",
    cover: "/services/korporativnye-meroprijatija-1.jpg",
    items: [
      { label: "Новый год", slug: "korporativnyj-novyj-god", featured: true },
      { label: "Выездное мероприятие", slug: "vyezdnoe-meroprijatie" },
      { label: "Юбилей компании", slug: "jubilej-kompanii" },
      { label: "Корпоративные игры", slug: "korporativnye-igry" },
      { label: "Профессиональный праздник", slug: "professionalnyj-prazdnik" },
      { label: "Family day", slug: "family-day" },
      {
        label: "Общественное или благотворительное мероприятие",
        slug: "obshhestvennoe-ili-blagotvoritelnoe-meroprijatie",
      },
    ],
  },
  {
    title: "Услуги онлайн",
    slug: "uslugi-onlajn",
    accent: "#d2243f",
    cover: "/services/uslugi-onlajn-1.jpg",
    items: [
      { label: "Онлайн игры", slug: "onlajn-igry" },
      { label: "Онлайн квизы", slug: "onlajn-kvizy" },
      { label: "Онлайн радио", slug: "korporativnoe-onlajn-radio" },
      { label: "Онлайн праздники", slug: "onlajn-prazdniki" },
      { label: "Иносфера" },
    ],
  },
  {
    title: "Тимбилдинг",
    slug: "timbilding",
    accent: "#2d6a3e",
    cover: "/services/timbilding-1.jpg",
    items: [
      { label: "Творческий тимбилдинг", slug: "tvorcheskij-timbilding" },
      { label: "Выездной тимбилдинг", slug: "vyezdnoj-timbilding" },
      { label: "Приключенческий квест", slug: "prikljuchencheskij-kvest" },
    ],
  },
  {
    title: "Деловые мероприятия",
    slug: "delovye-meropriyatiya",
    accent: "#1f1a55",
    cover: "/services/delovye-meropriyatiya-1.jpg",
    items: [
      { label: "Конференции", slug: "organizacija-konferencij" },
      { label: "Деловой туризм", slug: "delovoj-turizm" },
      { label: "Организация деловых игр", slug: "organizacija-delovyh-igr" },
      {
        label: "Презентация нового продукта",
        slug: "prezentacija-novogo-produkta",
      },
      {
        label: "Организация городских мероприятий",
        slug: "gorodskie-meroprijatija",
      },
      { label: "Открытие дилерских центров", slug: "dilerskie-centry" },
    ],
  },
  {
    title: "Концерты",
    slug: "kontserty",
    accent: "#aa1d4a",
    cover: "/services/kontserty-1.jpg",
    items: [
      {
        label: "Городские концерты и фестивали",
        slug: "organizacija-gorodskih-koncertov-i-festivalej",
        featured: true,
      },
      {
        label: "Спонсорские и маркетинговые концерты",
        slug: "sponsorskie-i-marketingovye-koncerty",
      },
      { label: "Техническое сопровождение" },
      {
        label: "Букинг артистов",
        slug: "buking-artistov",
      },
    ],
  },
  {
    title: "Частные мероприятия",
    slug: "chastnye-meropriyatiya",
    accent: "#7826b8",
    cover: "/services/chastnye-meropriyatiya-1.jpg",
    items: [
      { label: "Юбилеи и дни рождения", slug: "dni-rozhdenija-i-jubilei" },
      { label: "Детские праздники", slug: "detskie-prazdniki" },
      { label: "Свадьбы", slug: "svadby", featured: true },
    ],
  },
];

export function itemImage(slug?: string) {
  if (!slug) return null;
  return `/services/${slug}-1.jpg`;
}
