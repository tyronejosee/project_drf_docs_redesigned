import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { HydrateHeadings } from "@/components/layout/hydrate-headings";
import { MDXContent } from "@/components/tools/mdx-content";
import { PROJECT_NAME } from "@/config/constants";
import { defaultLocale, isValidLocale, locales } from "@/config/i18n";
import { getMdxBySlug, mdxFileExists } from "@/lib/mdx";

export const dynamic = "force-static";
export const revalidate = false;

type LocaleHomePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LocaleHomePageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return { title: PROJECT_NAME };
  }

  try {
    const { frontmatter } = await getMdxBySlug(locale, "index");
    return {
      title: `${frontmatter.title || "Homepage"} - ${PROJECT_NAME}`,
    };
  } catch {
    return { title: PROJECT_NAME };
  }
}

export default async function LocaleHomePage({ params }: LocaleHomePageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  if (!mdxFileExists(locale, undefined, "index")) {
    redirect(`/${defaultLocale}/`);
  }

  const { code, headings } = await getMdxBySlug(locale, "index");

  return (
    <main className="prose dark:prose-invert break-words mx-auto sm:pb-56">
      <MDXContent code={code} />
      <HydrateHeadings headings={headings} />
    </main>
  );
}
