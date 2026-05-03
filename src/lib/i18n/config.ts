/**
 * Supported locales and the default. The default (`ru`) is served at /ru/...
 * because the proxy redirects bare paths (/portfolio) to /ru/portfolio for
 * unambiguous canonical URLs and clean hreflang behavior.
 */
export const LOCALES = ["ru", "en", "zh"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "ru";

/** BCP-47 tag for OpenGraph / hreflang attributes. */
export const LOCALE_BCP47: Record<Locale, string> = {
  ru: "ru-RU",
  en: "en-US",
  zh: "zh-CN",
};

/** Human-readable label shown in the language switcher. */
export const LOCALE_LABEL: Record<Locale, string> = {
  ru: "Ru",
  en: "En",
  zh: "中文",
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/**
 * Build a localized path. Prepends `/ru` etc. to the given site path.
 *  localePath('en', '/portfolio')  → '/en/portfolio'
 *  localePath('ru', '/')            → '/ru'
 */
export function localePath(locale: Locale, path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (clean === "/") return `/${locale}`;
  return `/${locale}${clean}`;
}

/**
 * Strip a leading locale segment from a pathname if present. Returns the
 * "neutral" path that can be re-prefixed with another locale (used by the
 * language switcher to swap locales while preserving the current page).
 */
export function stripLocale(pathname: string): string {
  const match = pathname.match(/^\/(ru|en|zh)(\/.*)?$/);
  if (!match) return pathname;
  return match[2] || "/";
}
