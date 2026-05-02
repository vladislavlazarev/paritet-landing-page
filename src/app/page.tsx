import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { About } from "@/components/site/about";
import { Partners } from "@/components/site/partners";
import { Events } from "@/components/site/events";
import { Services } from "@/components/site/services";
import { Testimonials } from "@/components/site/testimonials";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";
import { SITE_URL } from "@/lib/seo";

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
  sameAs: [
    "https://vk.com/paritet_events",
    "https://t.me/paritetevents",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
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
