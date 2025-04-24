"use client";

import type { Heading } from "@/types";

import { useEffect } from "react";
import { useHeadingsStore } from "@/stores/headings-store";

type Props = {
  headings: Heading[];
};

export default function HydrateHeadings({ headings }: Props) {
  const setHeadings = useHeadingsStore((s) => s.setHeadings);

  useEffect(() => {
    setHeadings(headings);
  }, [headings, setHeadings]);

  return null;
}
