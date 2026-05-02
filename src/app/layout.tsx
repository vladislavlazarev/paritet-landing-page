import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import { AnchorSmoothScroll } from "@/components/site/anchor-smooth-scroll";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["300", "400", "500"],
});

const SITE_DESCRIPTION =
  "Event-агентство Паритет Events в Санкт-Петербурге: организация и проведение корпоративных мероприятий, тимбилдингов, концертов, частных праздников. Опыт 20+ лет. Полное техническое обеспечение под ключ.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — организация праздников в Санкт-Петербурге`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — организация праздников в Санкт-Петербурге`,
    description: SITE_DESCRIPTION,
    images: [{ url: "/og-default.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — организация праздников в Санкт-Петербурге`,
    description: SITE_DESCRIPTION,
    images: ["/og-default.png"],
  },
  robots: { index: true, follow: true, "max-image-preview": "large" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${inter.variable} ${manrope.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">
        <AnchorSmoothScroll />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: SITE_NAME,
              url: SITE_URL,
              logo: `${SITE_URL}/logo-white.png`,
              description: SITE_DESCRIPTION,
              address: {
                "@type": "PostalAddress",
                streetAddress: "Невский проспект, 109, офис 27",
                addressLocality: "Санкт-Петербург",
                addressCountry: "RU",
              },
              telephone: "+7 (921) 410-21-21",
              email: "info@party-paritet.com",
              sameAs: [
                "https://vk.com/paritet_events",
                "https://t.me/paritetevents",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
