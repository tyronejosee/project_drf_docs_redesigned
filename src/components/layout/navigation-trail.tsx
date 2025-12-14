"use client";

import { BreadcrumbItem, Breadcrumbs } from "@heroui/react";
import { usePathname, useRouter } from "next/navigation";

import { useTranslations } from "@/hooks/use-translations";
import { capitalize } from "@/lib/utils";

function NavigationTrail() {
  const { t } = useTranslations();
  const router = useRouter();
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);
  const paths = segments.map(
    (_, idx) => "/" + segments.slice(0, idx + 1).join("/")
  );

  if (pathname === "/") return null;

  return (
    <nav className="flex items-center justify-center px-1 md:px-6 mb-10">
      <Breadcrumbs underline="hover">
        <BreadcrumbItem key="home" onPress={() => router.push("/")}>
          {t("home")}
        </BreadcrumbItem>
        {segments.map((segment, idx) => (
          <BreadcrumbItem
            key={paths[idx]}
            // onPress={() => router.push(paths[idx])}
            isCurrent={idx === segments.length - 1}
          >
            {capitalize(decodeURIComponent(segment).replace(/-/g, " "))}
          </BreadcrumbItem>
        ))}
      </Breadcrumbs>
    </nav>
  );
}

export { NavigationTrail };
