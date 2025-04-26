"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  useDisclosure,
  Input,
  Kbd,
} from "@heroui/react";
import { File, SearchIcon } from "lucide-react";

const searchMdx = (
  query: string,
  mdxLinks: { path: string; title: string }[]
) => {
  if (!query) return [];

  return mdxLinks.filter((item) => {
    const lowerQuery = query.toLowerCase();
    return item.title.toLowerCase().includes(lowerQuery);
  });
};

type Props = {
  mdxLinks: { title: string; path: string }[];
};

export default function SearchBar({ mdxLinks }: Props) {
  const [query, setQuery] = useState<string>("");
  const [highlightedIndex, setHighlightedIndex] = useState<number>(0);
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
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
    // @ts-expect-error - TS doesn't know about onOpenChange
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
          radius="lg"
          placeholder="Type to search..."
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
        classNames={{
          body: "bg-neutral-darkgrey",
        }}
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
                  placeholder="Search documentation..."
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
                      No results found.
                    </p>
                  )}
                  {results.map((result, index) => (
                    <div key={result.path} className="my-2">
                      <Button
                        as={Link}
                        href={result.path}
                        className={`w-full justify-start ${
                          index === highlightedIndex
                            ? "bg-primary text-white"
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
