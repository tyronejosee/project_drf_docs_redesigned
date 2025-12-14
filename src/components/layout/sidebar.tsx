"use client";

import { Accordion, AccordionItem } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useTranslations } from "@/hooks/use-translations";
import type { ApiGuide, Community, Topic, Tutorial } from "@/types";

type SidebarProps = {
  tutorials: Tutorial[];
  apiGuides: ApiGuide[];
  topics: Topic[];
  communities: Community[];
};

function Sidebar({ tutorials, apiGuides, topics, communities }: SidebarProps) {
  const { t, locale } = useTranslations();
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  const updatePathLocale = (path: string) => {
    const segments = path.split("/");
    if (segments.length >= 2) {
      segments[1] = locale;
    }
    return segments.join("/");
  };

  const localizedTutorials = tutorials.map((item) => ({
    ...item,
    path: updatePathLocale(item.path),
  }));

  const localizedApiGuides = apiGuides.map((item) => ({
    ...item,
    path: updatePathLocale(item.path),
  }));

  const localizedTopics = topics.map((item) => ({
    ...item,
    path: updatePathLocale(item.path),
  }));

  const localizedCommunities = communities.map((item) => ({
    ...item,
    path: updatePathLocale(item.path),
  }));

  return (
    <aside className="sticky top-[84px] hidden h-[calc(100vh-121px)] w-[260px] md:flex md:shrink-0 md:flex-col md:justify-between">
      <div className="overflow-hidden relative">
        <nav className="styled-scrollbar flex h-[calc(100vh-120px)] flex-col overflow-y-scroll pb-4 pr-2 dark:text-white">
          <Accordion
            isCompact
            showDivider={false}
            defaultExpandedKeys={["0", "1", "2", "3"]}
            selectionMode="multiple"
          >
            <AccordionItem
              key="0"
              aria-label={t("tutorial")}
              title={t("tutorial")}
              classNames={{ title: "text-sm" }}
            >
              <ul className="flex flex-col">
                {localizedTutorials.map((tutorial, index) => (
                  <Link
                    key={index}
                    href={tutorial.path}
                    className={`text-sm pl-4 py-1 ${
                      isActive(tutorial.path)
                        ? "text-white border-l border-primary"
                        : "text-neutral-500 border-l border-neutral-800 hover:text-white"
                    }`}
                  >
                    {tutorial.title}
                  </Link>
                ))}
              </ul>
            </AccordionItem>
            <AccordionItem
              key="1"
              aria-label={t("apiGuide")}
              title={t("apiGuide")}
              classNames={{ title: "text-sm" }}
            >
              <ul className="flex flex-col">
                {localizedApiGuides.map((apiGuide, index) => (
                  <Link
                    key={index}
                    href={apiGuide.path}
                    className={`text-sm pl-4 py-1 ${
                      isActive(apiGuide.path)
                        ? "text-white border-l border-primary"
                        : "text-neutral-500 border-l border-neutral-800 hover:text-white"
                    }`}
                  >
                    {apiGuide.title}
                  </Link>
                ))}
              </ul>
            </AccordionItem>
            <AccordionItem
              key="2"
              aria-label={t("topics")}
              title={t("topics")}
              classNames={{ title: "text-sm" }}
            >
              <ul className="flex flex-col">
                {localizedTopics.map((topic, index) => (
                  <Link
                    key={index}
                    href={topic.path}
                    className={`text-sm pl-4 py-1 ${
                      isActive(topic.path)
                        ? "text-white border-l border-primary"
                        : "text-neutral-500 border-l border-neutral-800 hover:text-white"
                    }`}
                  >
                    {topic.title}
                  </Link>
                ))}
              </ul>
            </AccordionItem>
            <AccordionItem
              key="3"
              aria-label={t("community")}
              title={t("community")}
              classNames={{ title: "text-sm" }}
            >
              <ul className="flex flex-col">
                {localizedCommunities.map((community, index) => (
                  <Link
                    key={index}
                    href={community.path}
                    className={`text-sm pl-4 py-1 ${
                      isActive(community.path)
                        ? "text-white border-l border-primary"
                        : "text-neutral-500 border-l border-neutral-800 hover:text-white"
                    }`}
                  >
                    {community.title}
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

export { Sidebar };
