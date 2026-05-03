"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Dictionary } from "./types";
import type { Locale } from "./config";
import ruDict from "./dictionaries/ru";

type LocaleContextValue = {
  locale: Locale;
  dict: Dictionary;
};

const LocaleContext = createContext<LocaleContextValue>({
  locale: "ru",
  dict: ruDict,
});

/**
 * Provides locale + dictionary to client components further down the tree.
 * Place once in the layout for each locale segment.
 */
export function LocaleProvider({
  locale,
  dict,
  children,
}: {
  locale: Locale;
  dict: Dictionary;
  children: ReactNode;
}) {
  return (
    <LocaleContext.Provider value={{ locale, dict }}>
      {children}
    </LocaleContext.Provider>
  );
}

/** Hook used by client components to read the current locale + dict. */
export function useLocale(): LocaleContextValue {
  return useContext(LocaleContext);
}
