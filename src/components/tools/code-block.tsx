"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { Check, Copy } from "lucide-react";

type ReactNodeWithProps = {
  props: {
    children?: React.ReactNode;
    [key: string]: unknown;
  };
};

type CodeBlockProps = {
  children: React.ReactNode;
  language?: string;
};

function CodeBlock({ children, language }: CodeBlockProps) {
  const [copied, setCopied] = useState<boolean>(false);

  const extractText = (node: React.ReactNode): string => {
    if (typeof node === "string" || typeof node === "number") {
      return node.toString();
    }
    if (Array.isArray(node)) {
      return node.map(extractText).join("");
    }
    if (typeof node === "object" && node !== null && "props" in node) {
      const nodeWithProps = node as ReactNodeWithProps;
      return extractText(nodeWithProps.props.children);
    }
    return "";
  };

  const code = extractText(children);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      {language && (
        <Button
          isIconOnly
          size="sm"
          onPress={handleCopy}
          className="absolute bg-neutral-darkgrey group-hover:bg-neutral-darkgrey top-2 right-2 text-white transition px-0.5 py-0.5"
        >
          {copied ? <Check size={10} /> : <Copy size={10} />}
        </Button>
      )}
      <pre>{children}</pre>
    </div>
  );
}

export { CodeBlock };
