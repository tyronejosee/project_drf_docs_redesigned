import type { Heading, Text, InlineCode } from "mdast";

import { unified } from "unified";
import { visit } from "unist-util-visit";
import remarkParse from "remark-parse";
import remarkMdx from "remark-mdx";
import Slugger from "github-slugger";

export function extractHeadings(markdown: string) {
  const tree = unified().use(remarkParse).use(remarkMdx).parse(markdown);
  const headings: { depth: number; text: string; id: string }[] = [];
  const slugger = new Slugger();

  visit(tree, "heading", (node: Heading) => {
    const text = node.children
      .filter(
        (child): child is Text | InlineCode =>
          child.type === "text" || child.type === "inlineCode"
      )
      .map((child) => child.value)
      .join(" ");

    if (node.depth === 1 || node.depth === 2) {
      const id = slugger.slug(text);
      headings.push({ depth: node.depth, text, id });
    }
  });

  return headings;
}
