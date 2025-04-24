import type { Heading, Text, InlineCode } from "mdast";

import { unified } from "unified";
import { visit } from "unist-util-visit";
import remarkParse from "remark-parse";
import remarkMdx from "remark-mdx";
import slugify from "slugify";

export function extractHeadings(
  markdown: string
): { depth: number; text: string; id: string }[] {
  const tree = unified().use(remarkParse).use(remarkMdx).parse(markdown);
  const headings: { depth: number; text: string; id: string }[] = [];

  visit(tree, "heading", (node: Heading) => {
    const text = node.children
      .filter(
        (child): child is Text | InlineCode =>
          child.type === "text" || child.type === "inlineCode"
      )
      .map((child) => child.value)
      .join(" ");

    if (node.depth === 1 || node.depth === 2) {
      const id = slugify(text, { lower: true, strict: true });
      headings.push({ depth: node.depth, text, id });
    }
  });

  return headings;
}
