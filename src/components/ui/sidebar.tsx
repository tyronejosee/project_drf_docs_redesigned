"use client";

import type { ApiGuide, Topic, Tutorial } from "@/types";
import { Accordion, AccordionItem } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  tutorials: Tutorial[];
  apiGuides: ApiGuide[];
  topics: Topic[];
};

export default function Sidebar({ tutorials, apiGuides, topics }: Props) {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <aside className="sticky top-[84px] hidden h-[calc(100vh-121px)] w-[260px] md:flex md:shrink-0 md:flex-col md:justify-between">
      <div className="overflow-hidden relative">
        <nav className="styled-scrollbar flex h-[calc(100vh-120px)] flex-col overflow-y-scroll pb-4 pr-2 dark:text-white">
          <Accordion
            isCompact
            showDivider={false}
            defaultExpandedKeys={["0"]}
            selectionMode="multiple"
          >
            <AccordionItem
              key="0"
              aria-label="Tutorial"
              title="Tutorial"
              classNames={{ title: "text-sm" }}
            >
              <ul className="flex flex-col">
                {tutorials.map((tutorial, index) => (
                  <Link
                    key={index}
                    href={tutorial.path}
                    className={`text-sm pl-4 py-1 ${
                      isActive(tutorial.path)
                        ? "text-white border-l border-primary"
                        : "text-neutral-500 border-l border-neutral-800"
                    }`}
                  >
                    {tutorial.title}
                  </Link>
                ))}
              </ul>
            </AccordionItem>
            <AccordionItem
              key="1"
              aria-label="API Guide"
              title="API Guide"
              classNames={{ title: "text-sm" }}
            >
              <ul className="flex flex-col">
                {apiGuides.map((apiGuide, index) => (
                  <Link
                    key={index}
                    href={apiGuide.path}
                    className={`text-sm pl-4 py-1 ${
                      isActive(apiGuide.path)
                        ? "text-white border-l border-primary"
                        : "text-neutral-500 border-l border-neutral-800"
                    }`}
                  >
                    {apiGuide.title}
                  </Link>
                ))}
              </ul>
            </AccordionItem>
            <AccordionItem
              key="2"
              aria-label="Topics"
              title="Topics"
              classNames={{ title: "text-sm" }}
            >
              <ul className="flex flex-col">
                {topics.map((topic, index) => (
                  <Link
                    key={index}
                    href={topic.path}
                    className={`text-sm pl-4 py-1 ${
                      isActive(topic.path)
                        ? "text-white border-l border-primary"
                        : "text-neutral-500 border-l border-neutral-800"
                    }`}
                  >
                    {topic.title}
                  </Link>
                ))}
              </ul>
            </AccordionItem>
          </Accordion>
        </nav>
      </div>
    </aside>
  );
}
