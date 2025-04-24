import type { Heading } from "@/types";

import { create } from "zustand";

type HeadingsState = {
  headings: Heading[];
  setHeadings: (headings: Heading[]) => void;
  clearHeadings: () => void;
};

export const useHeadingsStore = create<HeadingsState>((set) => ({
  headings: [],
  setHeadings: (headings) => set({ headings }),
  clearHeadings: () => set({ headings: [] }),
}));
