import type { Metadata } from "next";

import { getMdxBySlug } from "@/lib/mdx";
import { HydrateHeadings } from "@/components/ui";
import { MDXContent } from "@/components/tools";
import { PROJECT_NAME } from "@/config/constants";

export const dynamic = "force-static";
export const revalidate = false;

export const metadata: Metadata = {
  title: `Homepage - ${PROJECT_NAME}`,
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
