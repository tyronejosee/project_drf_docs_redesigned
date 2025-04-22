import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { bundleMDX } from "mdx-bundler";
import rehypePrism from "rehype-prism-plus";

type Props = {
  type?: "api-guide" | "community" | "topics" | "tutorial";
  slug: string;
  prism?: boolean;
};

export async function getMdxBySlug({ type, slug, prism = true }: Props) {
  const basePath = path.join(process.cwd(), "src/content");
  const filePath = type
    ? path.join(basePath, type, `${slug}.mdx`)
    : path.join(basePath, `${slug}.mdx`);

  const source = fs.readFileSync(filePath, "utf8");
  const { data: frontmatterData, content } = matter(source);

  const { code, frontmatter } = await bundleMDX({
    source: content,
    mdxOptions(options) {
      if (prism) {
        options.rehypePlugins = [
          ...(options.rehypePlugins ?? []),
          [
            rehypePrism,
            {
              showLineNumbers: true,
              ignoreMissing: true,
              defaultLanguage: "javascript",
              languageAliases: {
                py: "python",
                sh: "bash",
                js: "javascript",
                ts: "typescript",
              },
            },
          ],
        ];
      }
      return options;
    },
  });

  return {
    code,
    frontmatter: {
      ...frontmatter,
      ...frontmatterData,
    },
  };
}
