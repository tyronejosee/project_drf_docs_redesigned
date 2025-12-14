import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { HydrateHeadings } from "@/components/layout/hydrate-headings";
import { MDXContent } from "@/components/tools/mdx-content";
import { isValidLocale } from "@/config/i18n";
import { getAllMdxSlugs, getMdxBySlug, mdxFileExists } from "@/lib/mdx";
import { CategoryType } from "@/types";

export const dynamic = "force-static";
export const revalidate = false;

type ContentPageProps = {
  params: Promise<{ locale: string; slug: string[] }>;
};

export async function generateStaticParams() {
  return getAllMdxSlugs();
}

export async function generateMetadata({
  params,
}: ContentPageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isValidLocale(locale)) {
    return { title: "" };
  }

  try {
    const [type, pageSlug] = slug;
    const { frontmatter } = await getMdxBySlug(
      locale,
      pageSlug,
      type as CategoryType
    );

    return {
      title: frontmatter.title || "",
      keywords: frontmatter.keywords ? [frontmatter.keywords.join(", ")] : [],
      openGraph: {
        title: frontmatter.title || "",
        type: "article",
      },
    };
  } catch {
    return { title: "" };
  }
}

export default async function ContentPage({ params }: ContentPageProps) {
  const { locale, slug } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const [type, pageSlug] = slug;
  const contentType = type as CategoryType;

  if (!mdxFileExists(locale, contentType, pageSlug)) {
    notFound();
  }

  try {
    const { code, headings } = await getMdxBySlug(
      locale,
      pageSlug,
      contentType
    );
    return (
      <main className="prose dark:prose-invert break-words scroll-mt-60 mx-auto sm:pb-56">
        <MDXContent code={code} />
        <HydrateHeadings headings={headings} />
      </main>
    );
  } catch (error) {
    console.error("Error loading MDX:", error);
    notFound();
  }
}
