type Locale = (typeof locales)[number];

const locales = ["en", "es"] as const;

const defaultLocale: Locale = "en";

const localeLabels: Record<Locale, string> = {
  en: "English",
  es: "Español",
};

const localeDirections: Record<Locale, "ltr" | "rtl"> = {
  en: "ltr",
  es: "ltr",
};

function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export {
  locales,
  defaultLocale,
  localeLabels,
  localeDirections,
  isValidLocale,
};
export type { Locale };
