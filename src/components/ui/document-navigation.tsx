"use client";

import type {
  Tutorial,
  ApiGuide,
  Topic,
  Community,
  DocumentType,
  CategoryType,
} from "@/types";

import { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  tutorials: Tutorial[];
  apiGuides: ApiGuide[];
  topics: Topic[];
  communities: Community[];
};

export default function DocumentNavigation({
  tutorials,
  apiGuides,
  topics,
  communities,
}: Props) {
  const pathname = usePathname();

  const { prevLink, nextLink } = useMemo(() => {
    const categories: {
      type: CategoryType;
      pathPrefix: string;
      items: DocumentType[];
      next?: CategoryType;
      prev?: CategoryType;
    }[] = [
      {
        type: "tutorial",
        pathPrefix: "/tutorial",
        items: tutorials,
        next: "api-guide",
      },
      {
        type: "api-guide",
        pathPrefix: "/api-guide",
        items: apiGuides,
        prev: "tutorial",
        next: "topics",
      },
      {
        type: "topics",
        pathPrefix: "/topics",
        items: topics,
        prev: "api-guide",
        next: "community",
      },
      {
        type: "community",
        pathPrefix: "/community",
        items: communities,
        prev: "topics",
      },
    ];

    const currentCategory = categories.find((category) =>
      pathname.startsWith(category.pathPrefix)
    );

    if (!currentCategory) {
      return { prevLink: null, nextLink: null };
    }

    const currentIndex = currentCategory.items.findIndex(
      (item) => item.path === pathname
    );

    if (currentIndex === -1) {
      return { prevLink: null, nextLink: null };
    }

    let prevLink: DocumentType | null = null;
    let nextLink: DocumentType | null = null;

    if (currentIndex > 0) {
      prevLink = currentCategory.items[currentIndex - 1];
    } else if (currentCategory.prev) {
      const prevCategory = categories.find(
        (cat) => cat.type === currentCategory.prev
      );
      if (prevCategory && prevCategory.items.length > 0) {
        prevLink = prevCategory.items[prevCategory.items.length - 1];
      }
    }

    if (currentIndex < currentCategory.items.length - 1) {
      nextLink = currentCategory.items[currentIndex + 1];
    } else if (currentCategory.next) {
      const nextCategory = categories.find(
        (cat) => cat.type === currentCategory.next
      );
      if (nextCategory && nextCategory.items.length > 0) {
        nextLink = nextCategory.items[0];
      }
    }

    return { prevLink, nextLink };
  }, [tutorials, apiGuides, topics, communities, pathname]);

  if (pathname === "/") return null;

  return (
    <div className="mt-14 flex justify-between items-center gap-10 w-full border-t border-neutral-darkgrey pt-6">
      {prevLink ? (
        <div className="group">
          <span className="text-sm text-neutral-gray group-hover:text-white">
            Previous
          </span>
          <Link href={prevLink.path} className="flex items-center">
            <ChevronLeft className="mr-1 size-8 text-neutral-gray group-hover:text-white" />
            <span className="text-md text-white line-clamp-1">
              {prevLink.title}
            </span>
          </Link>
        </div>
      ) : (
        <div></div>
      )}

      {nextLink && (
        <div className="group">
          <span className="text-sm text-neutral-gray group-hover:text-white">
            Next
          </span>
          <Link href={nextLink.path} className="flex items-center justify-end">
            <span className="text-md text-white line-clamp-1">
              {nextLink.title}
            </span>
            <ChevronRight className="ml-1 size-8 text-neutral-gray group-hover:text-white" />
          </Link>
        </div>
      )}
    </div>
  );
}
