"use client";

import { getMDXComponent } from "mdx-bundler/client";
import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { useMemo } from "react";

import { CodeBlock } from "@/components/tools/code-block";

type MDXContentProps = {
  code: string;
  components?: MDXComponents;
};

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

function MDXContent({ code, components = mdxComponents }: MDXContentProps) {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  return <Component components={components} />;
}

export { MDXContent };
