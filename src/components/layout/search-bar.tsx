"use client";

import {
  Button,
  Input,
  Kbd,
  Modal,
  ModalBody,
  ModalContent,
} from "@heroui/react";
import { File, SearchIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { useTranslations } from "@/hooks/use-translations";
import type { MDXLink } from "@/types";

const searchMdx = (query: string, mdxLinks: MDXLink[]) => {
  if (!query) return [];

  return mdxLinks.filter((item) => {
    const lowerQuery = query.toLowerCase();
    return item.title.toLowerCase().includes(lowerQuery);
  });
};

type SearchBarProps = {
  mdxLinks: MDXLink[];
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onOpen: () => void;
};

function SearchBar({ mdxLinks, isOpen, onOpenChange, onOpen }: SearchBarProps) {
  const { t } = useTranslations();
  const router = useRouter();

  const [query, setQuery] = useState<string>("");
  const [highlightedIndex, setHighlightedIndex] = useState<number>(0);

  const results = searchMdx(query, mdxLinks);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        onOpen();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onOpen]);

  const handleCloseModal = () => {
    if (inputRef.current) inputRef.current.blur();
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) handleCloseModal();
    onOpenChange(open);
  };

  return (
    <>
      <div onClick={onOpen} className="cursor-pointer">
        <Input
          readOnly
          ref={inputRef}
          type="text"
          size="sm"
          radius="sm"
          placeholder={t("search")}
          startContent={
            <SearchIcon
              size={16}
              className="text-white pointer-events-none flex-shrink-0"
            />
          }
          endContent={<Kbd keys={["command"]}>K</Kbd>}
          classNames={{
            innerWrapper: "bg-transparent",
            input: [
              "bg-transparent",
              "text-black/90 dark:text-white/90",
              "placeholder:text-default-700/50 dark:placeholder:text-white/60",
              "!outline-none focus:!outline-none focus-visible:!outline-none outline-transparent",
            ],
          }}
        />
      </div>
      <Modal
        isOpen={isOpen}
        hideCloseButton
        radius="lg"
        placement="center"
        backdrop="blur"
        onOpenChange={handleOpenChange}
        classNames={{ body: "bg-neutral-darkgrey" }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <Input
                  autoFocus
                  type="text"
                  size="lg"
                  radius="lg"
                  variant="underlined"
                  value={query}
                  placeholder={t("searchPlaceholder")}
                  onChange={(e) => setQuery(e.target.value)}
                  startContent={
                    <SearchIcon
                      size={16}
                      className="text-white pointer-events-none flex-shrink-0"
                    />
                  }
                  endContent={<Kbd keys={["escape"]}>esc</Kbd>}
                  classNames={{
                    input: [
                      "bg-transparent",
                      "text-black/90 dark:text-white/90",
                      "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                      "!outline-none focus:!outline-none focus-visible:!outline-none outline-transparent",
                    ],
                    innerWrapper: "bg-transparent",
                  }}
                  onKeyDown={(e) => {
                    switch (e.key) {
                      case "ArrowDown":
                        e.preventDefault();
                        setHighlightedIndex((prev) =>
                          Math.min(prev + 1, results.length - 1)
                        );
                        break;
                      case "ArrowUp":
                        e.preventDefault();
                        setHighlightedIndex((prev) => Math.max(prev - 1, 0));
                        break;
                      case "Enter":
                        e.preventDefault();
                        const selected = results[highlightedIndex];
                        if (selected) {
                          router.push(selected.path);
                          handleCloseModal();
                          onClose();
                        }
                        break;
                      case "Escape":
                        handleCloseModal();
                        onClose();
                        break;
                      default:
                        break;
                    }
                  }}
                />
                <section className="h-60 overflow-y-auto">
                  {results.length === 0 && (
                    <p className="text-center text-neutral-gray py-24">
                      {t("noResults")}
                    </p>
                  )}
                  {results.map((result, index) => (
                    <div key={result.path} className="my-2 pr-2">
                      <Button
                        as={Link}
                        variant="light"
                        href={result.path}
                        className={`w-full justify-start ${
                          index === highlightedIndex
                            ? "bg-white text-neutral-dark"
                            : ""
                        }`}
                        onPress={() => {
                          handleCloseModal();
                          onClose();
                        }}
                        startContent={
                          <File className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                        }
                      >
                        {result.title}
                      </Button>
                    </div>
                  ))}
                </section>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export { SearchBar };
