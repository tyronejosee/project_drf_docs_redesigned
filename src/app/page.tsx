import type { Metadata } from "next";

import { getMdxBySlug } from "@/lib/mdx";
import { HydrateHeadings } from "@/components/ui";
import { MDXContent } from "@/components/tools";

export const metadata: Metadata = {
  title: "Homepage",
};

export default async function TutorialPage() {
  const { code, headings } = await getMdxBySlug({ slug: "index" });

  return (
    <main className="prose dark:prose-invert break-words mx-auto sm:pb-56">
      <MDXContent code={code} />
      <HydrateHeadings headings={headings} />
    </main>
  );
}
