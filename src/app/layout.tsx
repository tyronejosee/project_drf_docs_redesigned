import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { PROJECT_NAME } from "@/config/constants";
import { defaultLocale } from "@/config/i18n";

import "prismjs/themes/prism-tomorrow.css";
import "./globals.css";
import { Providers } from "./providers";

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

type RootLayoutProps = {
  children: Readonly<React.ReactNode>;
  params: Promise<{ locale?: string }>;
};

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam || defaultLocale;

  return (
    <html lang={locale} className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
