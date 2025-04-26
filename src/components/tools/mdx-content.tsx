"use client";

import type { MDXComponents } from "mdx/types";

import { useMemo } from "react";
import Link from "next/link";
import { getMDXComponent } from "mdx-bundler/client";
import { CodeBlock } from "@/components/tools";

const mdxComponents: MDXComponents = {
  a: ({ href = "", children, ...props }) =>
    href.startsWith("/") || href.startsWith("#") ? (
      <Link href={href} {...props}>
        {children}
      </Link>
    ) : (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    ),
  pre: ({ children }) => {
    const className = children.props?.className || "";
    const language = className.replace("language-", "");
    return <CodeBlock language={language}>{children}</CodeBlock>;
  },
};

export default function MDXContent({
  code,
  components = mdxComponents,
}: {
  code: string;
  components?: MDXComponents;
}) {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  return <Component components={components} />;
}
