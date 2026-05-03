"use client";

import { useEffect } from "react";
import type { Locale } from "@/lib/i18n/config";
import { LOCALE_BCP47 } from "@/lib/i18n/config";

/**
 * Updates `<html lang>` to match the current locale on the client. The root
 * layout sets a static `lang="ru"`, which is correct for unprefixed pages
 * but stale for /en and /zh routes; this effect patches it on hydration so
 * screen readers get the right language signal.
 *
 * Search engines rely on the per-page `alternates.languages` (hreflang) and
 * `og:locale` metadata — both already correct on every page — so SEO doesn't
 * depend on the runtime patch.
 */
export function HtmlLangEffect({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = LOCALE_BCP47[locale];
  }, [locale]);
  return null;
}
