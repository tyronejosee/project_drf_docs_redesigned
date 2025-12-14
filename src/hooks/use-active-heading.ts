"use client";

import { useEffect, useState } from "react";

function useActiveHeading(headings: { id: string }[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      let current: { id: string; distance: number } | null = null;

      headings.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const distance = Math.abs(rect.top);

        if (rect.top <= window.innerHeight * 0.3) {
          if (!current || distance < current.distance) {
            current = { id, distance };
          }
        }
      });

      if (current) {
        setActiveId((current as { id: string }).id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [headings]);

  return activeId;
}

export { useActiveHeading };
