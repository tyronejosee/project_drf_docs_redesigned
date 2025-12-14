"use client";

import { HeroUIProvider } from "@heroui/react";

type ProvidersProps = {
  children: React.ReactNode;
};

function Providers({ children }: ProvidersProps) {
  return <HeroUIProvider>{children}</HeroUIProvider>;
}

export { Providers };
