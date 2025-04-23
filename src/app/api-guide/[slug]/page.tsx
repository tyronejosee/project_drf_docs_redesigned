import type { Metadata } from "next";

import { getMdxBySlug } from "@/lib/mdx";
import { MDXContent } from "@/components/tools";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { frontmatter } = await getMdxBySlug({ type: "api-guide", slug });

  return {
    title: frontmatter ? frontmatter.title : "",
    keywords: [frontmatter.keywords.join(", ")],
    openGraph: {
      title: frontmatter ? frontmatter.title : "",
      type: "article",
    },
  };
}

export default async function ApiGuideDetailPage({ params }: Props) {
  const { slug } = await params;
  const { code } = await getMdxBySlug({ type: "api-guide", slug });

  return (
    <main className="prose dark:prose-invert">
      <MDXContent code={code} />
    </main>
  );
}
