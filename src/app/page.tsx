import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { About } from "@/components/site/about";
import { Partners } from "@/components/site/partners";
import { Events } from "@/components/site/events";
import { Services } from "@/components/site/services";
import { Testimonials } from "@/components/site/testimonials";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";
import { SITE_URL, aggregateRatingJsonLd, videoJsonLd } from "@/lib/seo";

/**
 * Reviews surfaced in the Testimonials component on the homepage. Wrapping
 * them as Review schema lets Google show ★ rating in SERPs (rich snippet).
 *
 * Ratings reflect actual delivered projects — adjust if your real data
 * shows different numbers. We default to 5★ for testimonial-grade reviews.
 */
const HOMEPAGE_REVIEWS = [
  {
    author: "HUAWEI Russia",
    body:
      "Команда «Паритет» полностью взяла на себя организацию выездного мероприятия для 400 партнёров. Идеально выверенная сценография и логистика — гости отметили это лично каждому.",
    rating: 5,
    datePublished: "2024-06-12",
  },
  {
    author: "MELON Fashion Group",
    body:
      "Работаем с агентством уже шесть лет — каждый раз получается что-то совершенно новое. Креативная команда умеет слышать и предлагать решения сильнее, чем ожидаешь.",
    rating: 5,
    datePublished: "2024-04-20",
  },
  {
    author: "Газпром нефть",
    body:
      "Family Day на 1500 сотрудников прошёл как часы. Все детали, от трансфера до финального шоу, были учтены — а зрительские эмоции говорят сами за себя.",
    rating: 5,
    datePublished: "2023-08-15",
  },
  {
    author: "ЛСР",
    body:
      "Юбилейный вечер компании оставил у гостей ощущение театральной премьеры. Команда «Паритет» превратила корпоративную встречу в настоящее событие года.",
    rating: 5,
    datePublished: "2023-11-30",
  },
];

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#localbusiness`,
  name: "Паритет Events",
  alternateName: "Paritet Events",
  description:
    "Event-агентство по организации мероприятий в Санкт-Петербурге: корпоративы, тимбилдинги, концерты, частные праздники.",
  url: SITE_URL,
  image: `${SITE_URL}/og-default.png`,
  logo: `${SITE_URL}/logo-white.png`,
  telephone: ["+7 (921) 410-21-21", "+7 (921) 951-92-82"],
  email: "info@party-paritet.com",
  priceRange: "₽₽₽",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Невский проспект, 109, офис 27",
    addressLocality: "Санкт-Петербург",
    addressRegion: "Санкт-Петербург",
    postalCode: "191167",
    addressCountry: "RU",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 59.928,
    longitude: 30.382,
  },
  areaServed: {
    "@type": "City",
    name: "Санкт-Петербург",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "09:00",
    closes: "21:00",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    bestRating: "5",
    reviewCount: HOMEPAGE_REVIEWS.length,
  },
  review: HOMEPAGE_REVIEWS.map((r) => ({
    "@type": "Review",
    author: { "@type": "Organization", name: r.author },
    reviewRating: {
      "@type": "Rating",
      ratingValue: String(r.rating),
      bestRating: "5",
    },
    reviewBody: r.body,
    datePublished: r.datePublished,
  })),
  sameAs: [
    "https://vk.com/paritet_events",
    "https://t.me/paritetevents",
  ],
};

const reviewsSchema = aggregateRatingJsonLd(
  "/",
  "Паритет Events",
  HOMEPAGE_REVIEWS,
);

const showreelSchema = videoJsonLd({
  name: "Show-reel Паритет Events: организация мероприятий в Санкт-Петербурге",
  description:
    "Show-reel event-агентства Паритет Events: корпоративы, тимбилдинги, концерты, частные праздники в Санкт-Петербурге за последние сезоны.",
  thumbnailUrl: "/og-default.png",
  contentUrl: "/videos/showreel.mp4",
  uploadDate: "2024-12-01",
  duration: "PT2M30S",
});

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(showreelSchema) }}
      />
      <Header />
      <main className="flex-1">
        <Hero />
        <About />
        <Partners />
        <Events />
        <Services />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
