import { usePathname } from "next/navigation";

import { defaultLocale, isValidLocale, type Locale } from "@/config/i18n";
import { getTranslation, type TranslationKey } from "@/config/translations";

function useTranslations(): {
  t: (key: TranslationKey) => string;
  locale: Locale;
} {
  const pathname = usePathname();
  const segments = pathname.split("/");
  const localeSegment = segments[1];

  const locale: Locale =
    localeSegment && isValidLocale(localeSegment)
      ? localeSegment
      : defaultLocale;

  const t = (key: TranslationKey): string => {
    return getTranslation(locale, key);
  };

  return { t, locale };
}

export { useTranslations };
