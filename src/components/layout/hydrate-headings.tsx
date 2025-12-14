"use client";

import { useEffect } from "react";

import { useHeadingsStore } from "@/stores/headings-store";
import type { Heading } from "@/types";

type HydrateHeadingsProps = {
  headings: Heading[];
};

function HydrateHeadings({ headings }: HydrateHeadingsProps) {
  const setHeadings = useHeadingsStore((s) => s.setHeadings);

  useEffect(() => {
    setHeadings(headings);

    const hash = window.location.hash;
    if (hash) {
      const decodedHash = decodeURIComponent(hash);

      setTimeout(() => {
        const element = document.querySelector(decodedHash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, [headings, setHeadings]);

  return null;
}

export { HydrateHeadings };
