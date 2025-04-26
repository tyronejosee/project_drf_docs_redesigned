import fs from "fs";
import path from "path";

export function generateMdxStaticParams(contentType: string) {
  const contentDir = path.join(process.cwd(), `src/content/${contentType}`);

  try {
    const files = fs.readdirSync(contentDir);
    return files
      .filter((filename) => filename.endsWith(".mdx"))
      .map((filename) => ({
        slug: filename.replace(/\.mdx$/, ""),
      }));
  } catch (error) {
    console.error(`Error reading directory for ${contentType}:`, error);
    return [];
  }
}
