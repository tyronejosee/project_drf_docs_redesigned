import fs from "fs";
import matter from "gray-matter";
import { bundleMDX } from "mdx-bundler";
import path from "path";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";

import { type Locale, defaultLocale, locales } from "@/config/i18n";
import { extractHeadings } from "@/lib/markdown";
import type { CategoryType, MDXLink } from "@/types";

/**
 * Get MDX content by slug for a given locale and type
 */
async function getMdxBySlug(
  locale: Locale,
  slug: string,
  type?: CategoryType,
  prism?: boolean
) {
  const basePath = path.join(process.cwd(), "src/content", locale);
  const filePath = type
    ? path.join(basePath, type, `${slug}.mdx`)
    : path.join(basePath, `${slug}.mdx`);

  const source = fs.readFileSync(filePath, "utf8");
  const { data: frontmatterData, content } = matter(source);
  const headings = extractHeadings(content);

  const { code, frontmatter } = await bundleMDX({
    source: content,
    mdxOptions(options) {
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeSlug,
      ];

      if (prism) {
        options.rehypePlugins.push([
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
        ]);
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

/**
 * Get all MDX links for a given locale and type
 */
function getMdxLinks(locale: Locale, type?: CategoryType): MDXLink[] {
  const basePath = path.join(process.cwd(), "src/content", locale);
  if (!fs.existsSync(basePath)) {
    throw new Error(`Directory ${basePath} does not exist`);
  }

  const dirPath = type ? path.join(basePath, type) : basePath;
  if (!fs.existsSync(dirPath)) {
    return [];
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
          path: `/${locale}/${type ? `${type}/` : ""}${file.replace(
            ".mdx",
            ""
          )}`,
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

/**
 * Check if a file exists for a given locale and slug
 */
function mdxFileExists(
  locale: Locale,
  type: CategoryType | undefined,
  slug: string
): boolean {
  const basePath = path.join(process.cwd(), "src/content", locale);
  const filePath = type
    ? path.join(basePath, type, `${slug}.mdx`)
    : path.join(basePath, `${slug}.mdx`);

  return fs.existsSync(filePath);
}

/**
 * Get all possible MDX slugs for static params generation
 */
function getAllMdxSlugs(): Array<{
  locale: Locale;
  slug: string[];
}> {
  const contentTypes: CategoryType[] = [
    "api-guide",
    "community",
    "topics",
    "tutorial",
  ];
  const results: Array<{ locale: Locale; slug: string[] }> = [];

  // Use default locale as the source of truth for all content
  const defaultLocalePath = path.join(
    process.cwd(),
    "src/content",
    defaultLocale
  );

  // Get all content for each type
  for (const type of contentTypes) {
    const typePath = path.join(defaultLocalePath, type);

    if (fs.existsSync(typePath)) {
      const files = fs
        .readdirSync(typePath)
        .filter((file) => file.endsWith(".mdx"));

      for (const file of files) {
        const slug = file.replace(".mdx", "");

        // Add for each locale
        for (const locale of locales) {
          results.push({
            locale,
            slug: [type, slug],
          });
        }
      }
    }
  }

  return results;
}

export { getAllMdxSlugs, getMdxBySlug, getMdxLinks, mdxFileExists };
