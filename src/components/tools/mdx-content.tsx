"use client";

import type { MDXComponents } from "mdx/types";

import { useMemo } from "react";
import { getMDXComponent } from "mdx-bundler/client";

export default function MDXContent({
  code,
  components = {},
}: {
  code: string;
  components?: MDXComponents;
}) {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  return <Component components={components} />;
}
