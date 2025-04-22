import type { Metadata } from "next";

import { Geist, Geist_Mono } from "next/font/google";
import { Navigation } from "@/components/ui";
import { PROJECT_NAME } from "@/config/constants";
import Providers from "./providers";

import "prismjs/themes/prism-tomorrow.css";
import "./globals.css";

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
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Navigation />
          {children}
        </Providers>
      </body>
    </html>
  );
}
