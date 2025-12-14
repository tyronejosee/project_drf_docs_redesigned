import type { Locale } from "./i18n";

const translations = {
  en: {
    // Navigation
    tutorial: "Tutorial",
    apiGuide: "API Guide",
    topics: "Topics",
    community: "Community",

    // Actions
    search: "Search",
    searchDocs: "Search documentation",
    github: "GitHub",
    changeLanguage: "Change language",
    openMenu: "Open menu",
    closeMenu: "Close menu",

    // Navigation
    previous: "Previous",
    next: "Next",
    backToTop: "Back to top",
    onThisPage: "On this page",
    home: "Home",

    // Placeholders
    searchPlaceholder: "Search documentation...",
    noResults: "No results found",
  },
  es: {
    // Navegación
    tutorial: "Tutorial",
    apiGuide: "Guía de API",
    topics: "Tópicos",
    community: "Comunidad",

    // Acciones
    search: "Buscar",
    searchDocs: "Buscar en la documentación",
    github: "GitHub",
    changeLanguage: "Cambiar idioma",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",

    // Navegación
    previous: "Anterior",
    next: "Siguiente",
    backToTop: "Volver arriba",
    onThisPage: "En esta página",
    home: "Inicio",

    // Placeholders
    searchPlaceholder: "Buscar en la documentación...",
    noResults: "No se encontraron resultados",
  },
} as const;

type TranslationKey = keyof typeof translations.en;

function getTranslation(locale: Locale, key: TranslationKey): string {
  return translations[locale][key] || translations.en[key];
}

export { translations, getTranslation };
export type { TranslationKey };
