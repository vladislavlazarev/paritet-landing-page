import { DEFAULT_LOCALE, type Locale } from "./config";

/**
 * Build a navigation href for the given locale. The Russian (default) locale
 * uses the unprefixed paths the site has used historically — keeps existing
 * inbound links and SEO authority intact. Other locales get a /<locale>/...
 * prefix.
 *
 *   p('ru', '/portfolio') → '/portfolio'
 *   p('en', '/portfolio') → '/en/portfolio'
 *   p('zh', '/')          → '/zh'
 *   p('en', '/#contact')  → '/en#contact'
 */
export function p(locale: Locale, path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === DEFAULT_LOCALE) return clean;
  // Anchor on the homepage: /en plus the hash, no extra slash.
  if (clean.startsWith("/#")) return `/${locale}${clean.slice(1)}`;
  if (clean === "/") return `/${locale}`;
  return `/${locale}${clean}`;
}

/**
 * Strip the locale prefix from a pathname. Returns the neutral path that can
 * be re-prefixed with `p(otherLocale, ...)` — used by the language switcher.
 */
export function neutralPath(pathname: string): string {
  const m = pathname.match(/^\/(en|zh)(\/.*)?$/);
  if (!m) return pathname;
  return m[2] || "/";
}

/**
 * Detect the current locale from a pathname. Default (`ru`) for any unprefixed
 * path. Use this in client components that read window.location.
 */
export function localeFromPath(pathname: string): Locale {
  if (pathname === "/en" || pathname.startsWith("/en/")) return "en";
  if (pathname === "/zh" || pathname.startsWith("/zh/")) return "zh";
  return DEFAULT_LOCALE;
}
