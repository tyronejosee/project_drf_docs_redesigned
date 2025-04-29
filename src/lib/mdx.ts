import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { bundleMDX } from "mdx-bundler";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import { extractHeadings } from "@/lib/markdown";

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
  const headings = extractHeadings(content);

  const { code, frontmatter } = await bundleMDX({
    source: content,
    mdxOptions(options) {
      if (prism) {
        options.rehypePlugins = [
          ...(options.rehypePlugins ?? []),
          rehypeSlug,
          [
            rehypePrism,
            {
              showLineNumbers: true,
              defaultLanguage: "python",
              languageAliases: {
                python: "python",
                js: "javascript",
                bash: "bash",
                text: "text",
                html: "html",
                http: "http",
                json: "json",
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
    headings,
  };
}

export function getMdxLinks(type?: string) {
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
          order: frontmatterData.order ?? Infinity,
        };
      })
      .sort((a, b) => a.order - b.order)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .map(({ order, ...rest }) => rest);

    return mdxFiles;
  } catch (error) {
    throw new Error(`Error reading files from ${dirPath}: ${error}`);
  }
}
