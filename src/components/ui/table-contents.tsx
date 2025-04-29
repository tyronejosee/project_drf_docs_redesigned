"use client";

import Link from "next/link";

import { useEffect, useRef } from "react";
import { Skeleton } from "@heroui/react";
import { useActiveHeading } from "@/hooks";
import { useHeadingsStore } from "@/stores/headings-store";

export default function TableContents() {
  const headings = useHeadingsStore((s) => s.headings);

  const isLoading = headings.length === 0;
  const activeId = useActiveHeading(headings);

  const containerRef = useRef<HTMLUListElement | null>(null);
  const activeRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (activeRef.current && containerRef.current) {
      const container = containerRef.current;
      const activeElement = activeRef.current;

      const containerRect = container.getBoundingClientRect();
      const activeRect = activeElement.getBoundingClientRect();

      const isAbove = activeRect.top < containerRect.top;
      const isBelow = activeRect.bottom > containerRect.bottom;

      if (isAbove || isBelow) {
        const scrollOffset =
          activeElement.offsetTop -
          container.clientHeight / 2 +
          activeElement.clientHeight / 2;
        container.scrollTo({
          top: scrollOffset,
          behavior: "smooth",
        });
      }
    }
  }, [activeId]);

  return (
    <nav className="order-last hidden w-56 shrink-0 lg:block">
      <ul
        ref={containerRef}
        className="sticky top-[84px] h-[calc(100vh-121px)] overflow-y-auto"
      >
        <h2 className="mb-2 text-sm font-semibold text-white">On this page</h2>
        {isLoading
          ? Array.from({ length: 9 }).map((_, idx) => (
              <li key={idx}>
                <Skeleton className="h-4 w-20 rounded-lg mt-2 mb-3" />
              </li>
            ))
          : headings.map((heading) => (
              <li
                key={heading.id}
                className={`pl-4 border-l ${
                  activeId === heading.id
                    ? "border-l-primary"
                    : "border-l-neutral-darkgrey"
                }`}
              >
                <Link
                  ref={activeId === heading.id ? activeRef : null}
                  href={`#${heading.id}`}
                  className={`text-sm ${
                    activeId === heading.id
                      ? "text-white"
                      : "text-neutral-gray hover:text-white"
                  }`}
                >
                  {heading.text}
                </Link>
              </li>
            ))}
      </ul>
    </nav>
  );
}
