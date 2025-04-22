import type { Metadata } from "next";

import { getMdxBySlug } from "@/lib/mdx";
import { MDXContent } from "@/components/tools";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { frontmatter } = await getMdxBySlug({ type: "tutorial", slug });

  return {
    title: frontmatter ? frontmatter.title : "",
    keywords: [frontmatter.keywords.join(", ")],
    openGraph: {
      title: frontmatter ? frontmatter.title : "",
      type: "article",
    },
  };
}

export default async function TutorialPage({ params }: Props) {
  const { slug } = await params;
  const { code } = await getMdxBySlug({ type: "tutorial", slug });

  return (
    <main className="max-w-screen-md mx-auto my-20 px-4 xl:px-0 z-0 prose dark:prose-invert">
      <MDXContent code={code} />
    </main>
  );
}
