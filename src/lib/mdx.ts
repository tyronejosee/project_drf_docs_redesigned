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

export function getMdxLinks(type?: string): { path: string; title: string }[] {
  const basePath = path.join(process.cwd(), "src/content");
  if (!fs.existsSync(basePath)) {
    throw new Error(`Directory ${basePath} does not exist`);
  }

  const dirPath = type ? path.join(basePath, type) : basePath;
  if (!fs.existsSync(dirPath)) {
    throw new Error(`Directory ${dirPath} does not exist`);
  }

  try {
    const files = fs.readdirSync(dirPath);
    const mdxFiles = files
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => {
        const filePath = path.join(dirPath, file);
        const source = fs.readFileSync(filePath, "utf8");
        const { data: frontmatterData } = matter(source);

        return {
          title: frontmatterData.title || file.replace(".mdx", ""),
          path: `/${type ? `${type}/` : ""}${file.replace(".mdx", "")}`,
        };
      });

    return mdxFiles;
  } catch (error) {
    throw new Error(`Error reading files from ${dirPath}: ${error}`);
  }
}
