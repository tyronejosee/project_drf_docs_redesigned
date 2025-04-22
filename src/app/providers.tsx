"use client";

import { HeroUIProvider } from "@heroui/react";

type Props = {
  children: React.ReactNode;
};

export default function Providers({ children }: Props) {
  return <HeroUIProvider>{children}</HeroUIProvider>;
}
