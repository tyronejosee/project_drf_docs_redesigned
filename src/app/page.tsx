import type { Metadata } from "next";

import { getMdxBySlug } from "@/lib/mdx";
import { MDXContent } from "@/components/tools";

export const metadata: Metadata = {
  title: "Homepage",
};

export default async function TutorialPage() {
  const { code } = await getMdxBySlug({ slug: "index" });

  return (
    <main className="prose dark:prose-invert">
      <MDXContent code={code} />
    </main>
  );
}
