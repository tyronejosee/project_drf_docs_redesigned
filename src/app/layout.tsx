import type { Metadata } from "next";

import { Geist, Geist_Mono } from "next/font/google";
import { getMdxLinks } from "@/lib/mdx";
import { Navigation, Sidebar, TableContents } from "@/components/ui";
import { PROJECT_NAME } from "@/config/constants";
import Providers from "./providers";

import "./globals.css";
import "prismjs/themes/prism-tomorrow.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: `%s - ${PROJECT_NAME}`,
    default: `${PROJECT_NAME}`,
  },
  description: "Documentation for Django Rest Framework",
  keywords: ["django", "rest", "framework"],
  openGraph: {},
  twitter: {},
  robots: {},
};

type Props = {
  children: Readonly<React.ReactNode>;
};

export default function RootLayout({ children }: Props) {
  const tutorials = getMdxLinks("tutorial");
  const apiGuides = getMdxLinks("api-guide");
  const topics = getMdxLinks("topics");
  const communities = getMdxLinks("community");

  const allMdxLinks = [...tutorials, ...apiGuides, ...topics, ...communities];

  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Navigation
            mdxLinks={allMdxLinks}
            tutorials={tutorials}
            apiGuides={apiGuides}
            topics={topics}
            communities={communities}
          />
          <div className="relative mx-auto max-w-screen-xl px-4 py-10 md:flex md:flex-row md:py-10">
            <Sidebar
              tutorials={tutorials}
              apiGuides={apiGuides}
              topics={topics}
              communities={communities}
            />
            <div className="mt-6 w-full max-w-screen-md min-w-0 px-1 md:px-6">
              {children}
            </div>
            <TableContents />
          </div>
        </Providers>
      </body>
    </html>
  );
}
