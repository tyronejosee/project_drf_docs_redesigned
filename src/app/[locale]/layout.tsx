import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { BackToTop } from "@/components/layout/back-to-top";
import { DocumentNavigation } from "@/components/layout/document-navigation";
import { Navigation } from "@/components/layout/navigation";
import { NavigationTrail } from "@/components/layout/navigation-trail";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { Sidebar } from "@/components/layout/sidebar";
import { TableContents } from "@/components/layout/table-contents";
import { isValidLocale, type Locale, localeDirections } from "@/config/i18n";
import { getMdxLinks } from "@/lib/mdx";

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const direction = localeDirections[locale as Locale];
  const tutorials = getMdxLinks(locale as Locale, "tutorial");
  const apiGuides = getMdxLinks(locale as Locale, "api-guide");
  const topics = getMdxLinks(locale as Locale, "topics");
  const communities = getMdxLinks(locale as Locale, "community");
  const allMdxLinks = [...tutorials, ...apiGuides, ...topics, ...communities];

  return (
    <div lang={locale} dir={direction} className="min-h-screen">
      <Navigation
        mdxLinks={allMdxLinks}
        tutorials={tutorials}
        apiGuides={apiGuides}
        topics={topics}
        communities={communities}
      />
      <div className="relative mx-auto max-w-screen-xl px-4 pt-20 py-10 md:flex md:flex-row md:py-10">
        <Sidebar
          tutorials={tutorials}
          apiGuides={apiGuides}
          topics={topics}
          communities={communities}
        />
        <div className="mt-16 w-full max-w-screen-md min-w-0 px-1 md:px-6">
          <NavigationTrail />
          {children}
          <DocumentNavigation
            tutorials={tutorials}
            apiGuides={apiGuides}
            topics={topics}
            communities={communities}
            locale={locale}
          />
          <ScrollProgress />
          <BackToTop />
        </div>
        <TableContents />
      </div>
    </div>
  );
}
