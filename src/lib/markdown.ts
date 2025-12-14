import Slugger from "github-slugger";
import type { Heading as HeadingMdast } from "mdast";
import remarkMdx from "remark-mdx";
import remarkParse from "remark-parse";
import { unified } from "unified";
import { visit } from "unist-util-visit";

import type { Heading } from "@/types";

function getNodeText(node: any): string {
  if (node.type === "text" || node.type === "inlineCode") {
    return node.value;
  }
  if (node.children) {
    return node.children.map(getNodeText).join("");
  }
  return "";
}

function extractHeadings(markdown: string): Heading[] {
  const tree = unified().use(remarkParse).use(remarkMdx).parse(markdown);
  const headings: Heading[] = [];
  const slugger = new Slugger();

  visit(tree, "heading", (node: HeadingMdast) => {
    const rawText = getNodeText(node);
    const text = rawText.trim();

    if (node.depth === 1 || node.depth === 2) {
      const id = slugger.slug(text);
      headings.push({ depth: node.depth, text, id } as Heading);
    }
  });

  return headings;
}

export { extractHeadings };
