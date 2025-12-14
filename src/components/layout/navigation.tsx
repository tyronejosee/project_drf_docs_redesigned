"use client";

import {
  Accordion,
  AccordionItem,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  useDisclosure,
} from "@heroui/react";
import { Globe, HeartHandshake, Menu, Search, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { GitHubIcon } from "@/components/icons/github-icon";
import { Logo } from "@/components/icons/logo";
import { SearchBar } from "@/components/layout/search-bar";
import { PROJECT_NAME_SHORT } from "@/config/constants";
import {
  defaultLocale,
  localeLabels,
  locales,
  type Locale,
} from "@/config/i18n";
import { headerNavigation } from "@/config/navigation";
import { type TranslationKey } from "@/config/translations";
import { useTranslations } from "@/hooks/use-translations";
import type { ApiGuide, Community, Topic, Tutorial } from "@/types";

type NavigationProps = {
  mdxLinks: { title: string; path: string }[];
  tutorials: Tutorial[];
  apiGuides: ApiGuide[];
  topics: Topic[];
  communities: Community[];
};

type CustomNavMenuProps = {
  isOpen: boolean;
  tutorials: Tutorial[];
  apiGuides: ApiGuide[];
  topics: Topic[];
  communities: Community[];
};

const CustomNavMenu = ({
  isOpen,
  tutorials,
  apiGuides,
  topics,
  communities,
}: CustomNavMenuProps) => {
  const { t } = useTranslations();
  const pathname = usePathname();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  const isActive = (path: string) => pathname === path;

  useEffect(() => {
    if (!isOpen) return;

    const container = containerRef.current;
    const activeLink = linkRefs.current[pathname];

    if (!container || !activeLink) return;

    const containerRect = container.getBoundingClientRect();
    const activeRect = activeLink.getBoundingClientRect();

    const isAbove = activeRect.top < containerRect.top;
    const isBelow = activeRect.bottom > containerRect.bottom;

    if (isAbove || isBelow) {
      const scrollOffset =
        activeLink.offsetTop -
        container.clientHeight / 2 +
        activeLink.clientHeight / 2;

      container.scrollTo({
        top: scrollOffset,
        behavior: "auto",
      });
    }
  }, [pathname, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed top-16 left-0 right-0 bg-black/70 backdrop-blur-xl z-50">
      <div className="h-screen container mx-auto py-4 px-6">
        <nav
          ref={containerRef}
          className="flex h-[calc(100vh-120px)] flex-col overflow-y-scroll pb-4 pr-2"
        >
          <Accordion
            isCompact
            showDivider={false}
            defaultExpandedKeys={["0", "1", "2", "3"]}
            selectionMode="multiple"
          >
            {[
              { title: t("tutorial"), items: tutorials },
              { title: t("apiGuide"), items: apiGuides },
              { title: t("topics"), items: topics },
              { title: t("community"), items: communities },
            ].map((section, idx) => (
              <AccordionItem
                key={String(idx)}
                aria-label={section.title}
                title={section.title}
                classNames={{ title: "text-sm" }}
              >
                <ul className="flex flex-col">
                  {section.items.map((item, index) => (
                    <Link
                      key={index}
                      href={item.path}
                      ref={(el) => {
                        if (el) {
                          linkRefs.current[item.path] = el;
                        }
                      }}
                      className={`text-sm pl-4 py-1 ${
                        isActive(item.path)
                          ? "text-white border-l border-primary"
                          : "text-neutral-500 border-l border-neutral-800"
                      }`}
                    >
                      {item.title}
                    </Link>
                  ))}
                </ul>
              </AccordionItem>
            ))}
          </Accordion>
        </nav>
      </div>
    </div>
  );
};

const LocaleSwitcher = () => {
  const { t } = useTranslations();
  const pathname = usePathname();
  const router = useRouter();

  const currentLocale = pathname.split("/")[1] as Locale;

  const handleLocaleChange = (locale: Locale) => {
    const segments = pathname.split("/");
    segments[1] = locale;
    const newPath = segments.join("/");
    router.push(newPath);
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          isIconOnly
          variant="light"
          size="sm"
          aria-label={t("changeLanguage")}
        >
          <Globe size={20} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Language selection"
        onAction={(key) => handleLocaleChange(key as Locale)}
      >
        {locales.map((locale) => (
          <DropdownItem
            key={locale}
            className={currentLocale === locale ? "text-primary" : ""}
          >
            {localeLabels[locale]}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

function Navigation({
  mdxLinks,
  tutorials,
  apiGuides,
  topics,
  communities,
}: NavigationProps) {
  const { t, locale } = useTranslations();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  return (
    <>
      <Navbar
        isBordered
        isBlurred
        maxWidth="full"
        className="fixed z-50 transition-colors duration-300"
      >
        <NavbarContent>
          <Link href="/">
            <NavbarBrand>
              <Logo />
              <span className="font-bold ml-2">
                {PROJECT_NAME_SHORT.toUpperCase()}
              </span>
            </NavbarBrand>
          </Link>
          {headerNavigation.map((item, idx) => {
            const isActive = pathname.startsWith(
              item.path.split("/").slice(0, 2).join("/")
            );

            const localePrefix = locale === defaultLocale ? "" : `/${locale}`;

            return (
              <Link
                key={idx}
                href={`${localePrefix}${item.path}`}
                className={`hidden md:block text-sm hover:text-white ${
                  isActive ? "text-white font-medium" : "text-neutral-500"
                }`}
              >
                {t(item.title as TranslationKey)}
              </Link>
            );
          })}
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem className="sm:hidden">
            <Button
              isIconOnly
              type="button"
              size="sm"
              variant="light"
              onPress={onOpen}
              aria-label="Search documentation"
            >
              <Search size={20} />
            </Button>
          </NavbarItem>
          <NavbarItem className="hidden sm:flex gap-2">
            <LocaleSwitcher />
            <Button
              as={Link}
              href="https://github.com/tyronejosee/project_drf_docs_redesigned"
              target="_blank"
              rel="noopener noreferrer"
              variant="light"
              size="sm"
              startContent={<HeartHandshake className="w-4 h-4" />}
              isIconOnly
            ></Button>
            <SearchBar
              mdxLinks={mdxLinks}
              isOpen={isOpen}
              onOpen={onOpen}
              onOpenChange={onOpenChange}
            />
          </NavbarItem>
          <NavbarItem className="hidden sm:flex">
            <Button
              as={Link}
              href="https://github.com/encode/django-rest-framework"
              target="_blank"
              rel="noopener noreferrer"
              variant="solid"
              size="sm"
              startContent={<GitHubIcon className="w-4 h-4" />}
              className="bg-white text-neutral-950 font-medium"
            >
              GitHub
            </Button>
          </NavbarItem>
          <Button
            isIconOnly
            data-menu-toggle
            size="sm"
            type="button"
            variant="light"
            onPress={toggleMenu}
            aria-label={isMenuOpen ? t("closeMenu") : t("openMenu")}
            className="sm:hidden"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </NavbarContent>
      </Navbar>

      <CustomNavMenu
        data-menu
        isOpen={isMenuOpen}
        tutorials={tutorials}
        apiGuides={apiGuides}
        communities={communities}
        topics={topics}
      />
    </>
  );
}

export { Navigation };
