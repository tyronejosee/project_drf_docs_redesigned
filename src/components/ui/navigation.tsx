"use client";

import type { ApiGuide, Topic, Tutorial } from "@/types";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Accordion,
  AccordionItem,
} from "@heroui/react";
import { Circle, Menu, X } from "lucide-react";
import { GitHubIcon } from "@/components/icons";
import { PROJECT_NAME_SHORT } from "@/config/constants";

type NavigationProps = {
  tutorials: Tutorial[];
  apiGuides: ApiGuide[];
  topics: Topic[];
};

type CustomNavMenuProps = {
  isOpen: boolean;
  tutorials: Tutorial[];
  apiGuides: ApiGuide[];
  topics: Topic[];
};

const CustomNavMenu = ({
  isOpen,
  tutorials,
  apiGuides,
  topics,
}: CustomNavMenuProps) => {
  if (!isOpen) return null;

  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <div className="fixed top-12 left-0 right-0 bg-black/60 backdrop-blur-md z-50">
      <div className="h-screen container mx-auto py-4 px-6">
        <nav className="flex h-[calc(100vh-120px)] flex-col overflow-y-scroll pb-4 pr-2">
          <Accordion
            isCompact
            showDivider={false}
            defaultExpandedKeys={["0", "1"]}
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
    </div>
  );
};

export default function Navigation({
  tutorials,
  apiGuides,
  topics,
}: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

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
        className="fixed z-50 transition-colors duration-300 h-12 text-sm"
      >
        <NavbarContent>
          <Link href="/">
            <NavbarBrand>
              <Circle />
              <span className="font-bold ml-2">
                {PROJECT_NAME_SHORT.toUpperCase()}
              </span>
            </NavbarBrand>
          </Link>
        </NavbarContent>

        <NavbarContent justify="end">
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
          <button
            type="button"
            onClick={toggleMenu}
            data-menu-toggle
            className="sm:hidden p-2 ml-2 bg-transparent rounded-md hover:bg-default-100"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </NavbarContent>
      </Navbar>

      <CustomNavMenu
        data-menu
        isOpen={isMenuOpen}
        tutorials={tutorials}
        apiGuides={apiGuides}
        topics={topics}
      />
    </>
  );
}
