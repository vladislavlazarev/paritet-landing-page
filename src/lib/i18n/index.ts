import "server-only";

import type { Dictionary } from "./types";
import type { Locale } from "./config";

const loaders: Record<Locale, () => Promise<Dictionary>> = {
  ru: () => import("./dictionaries/ru").then((m) => m.default),
  en: () => import("./dictionaries/en").then((m) => m.default),
  zh: () => import("./dictionaries/zh").then((m) => m.default),
};

/** Server-only dictionary loader. Tree-shaken per locale at request time. */
export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return loaders[locale]();
}

export type { Dictionary } from "./types";
export {
  LOCALES,
  DEFAULT_LOCALE,
  LOCALE_BCP47,
  LOCALE_LABEL,
  isLocale,
  localePath,
  stripLocale,
} from "./config";
export type { Locale } from "./config";
