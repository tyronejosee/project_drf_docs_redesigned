"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  useDisclosure,
  Input,
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
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const results = searchMdx(query, mdxLinks);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCloseModal = () => {
    if (inputRef.current) inputRef.current.blur();
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) handleCloseModal();
    // @ts-expect-error ! TODO: Fix this error
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
        // onOpenChange={(open) => {
        //   if (!open) {
        //     handleCloseModal();
        //     onOpenChange(open);
        //   }
        // }}
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
                  classNames={{
                    input: [
                      "bg-transparent",
                      "text-black/90 dark:text-white/90",
                      "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                    ],
                    innerWrapper: "bg-transparent",
                  }}
                />
                <section className="h-60 overflow-y-auto">
                  {results.length === 0 && (
                    <p className="text-center text-neutral-gray py-24">
                      No results found.
                    </p>
                  )}
                  {results.map((result) => (
                    <div key={result.path} className="my-2">
                      <Button
                        as={Link}
                        href={result.path}
                        className="w-full justify-start"
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
