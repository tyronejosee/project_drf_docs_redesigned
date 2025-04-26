import type { Metadata } from "next";

import { getMdxBySlug } from "@/lib/mdx";
import { HydrateHeadings } from "@/components/ui";
import { MDXContent } from "@/components/tools";

export const dynamic = "force-static";
export const revalidate = false;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { frontmatter } = await getMdxBySlug({ type: "topics", slug });

  return {
    title: frontmatter ? frontmatter.title : slug,
    keywords: [frontmatter.keywords.join(", ")],
    openGraph: {
      title: frontmatter ? frontmatter.title : slug,
      type: "article",
    },
  };
}

export default async function TopicsDetailPage({ params }: Props) {
  const { slug } = await params;
  const { code, headings } = await getMdxBySlug({ type: "topics", slug });

  return (
    <main className="prose dark:prose-invert break-words mx-auto sm:pb-56">
      <MDXContent code={code} />
      <HydrateHeadings headings={headings} />
    </main>
  );
}
