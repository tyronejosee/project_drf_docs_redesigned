import type { Config } from "tailwindcss";

import { heroui } from "@heroui/theme";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ef4444",
        secondary: "#FF9100",
        neutral: {
          light: "#fafafa",
          lightgray: "#f5f5f5",
          gray: "#737373",
          darkgrey: "#171717",
          dark: "#0a0a0a",
        },
      },
      typography: (theme: (path: string) => string | undefined) => ({
        DEFAULT: {
          css: {
            fontSize: "1rem",
            color: theme("colors.neutral.light"),
            h1: {
              color: theme("colors.white"),
              fontWeight: "900",
            },
            h2: {
              color: theme("colors.white"),
              fontWeight: "800",
            },
            h3: {
              color: theme("colors.white"),
              fontWeight: "700",
            },
            a: {
              color: theme("colors.blue.400"),
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            },
            strong: {
              color: theme("colors.white"),
              fontWeight: "700",
            },
            hr: {
              borderColor: theme("colors.neutral.darkgrey"),
              borderTopStyle: "solid",
              borderTopWidth: "4px",
              borderRadius: "0.5rem",
              marginTop: "2rem",
              marginBottom: "2rem",
              "&:first-child": {
                display: "none",
              },
            },
            blockquote: {
              borderLeft: `4px solid ${theme("colors.primary")}`,
              paddingLeft: "1rem",
              color: theme("colors.neutral.light"),
              fontStyle: "italic",
              quotes: '"“""”"',
              "&::before": {
                content: "open-quote",
                color: theme("colors.primary"),
                fontSize: "2rem",
                lineHeight: "0",
                marginRight: "0.25rem",
                verticalAlign: "-0.4em",
              },
              "&::after": {
                content: "close-quote",
                display: "none",
              },
              cite: {
                display: "block",
                fontSize: "0.875rem",
                fontWeight: "500",
                color: theme("colors.neutral.gray"),
                marginTop: "0.5rem",
                textAlign: "right",
              },
            },
            "code::before": { content: '""' },
            "code::after": { content: '""' },
            code: {
              color: theme("colors.primary"),
              backgroundColor: theme("colors.neutral.darkgrey"),
              borderRadius: "0.4rem",
              padding: "0.1rem 0.3rem",
            },
            pre: {
              backgroundColor: theme("colors.neutral.darkgrey"),
              borderRadius: "0.75rem",
              padding: "1.25rem",
              marginTop: "1.5rem",
              marginBottom: "1.5rem",
              boxShadow: theme("boxShadow.md"),
              overflowX: "auto",
            },
            "pre code": {
              backgroundColor: "transparent",
              padding: "0",
              fontSize: "0.5rem",
              fontFamily: theme("fontFamily.mono"),
              fontWeight: "200",
            },
            ".line-numbers-rows": {
              borderRight: `1px solid ${theme("colors.neutral.gray")}`,
              paddingRight: "0.75rem",
            },
            ".line-numbers-rows > span:before": {
              color: theme("colors.neutral.gray"),
              padding: "0 0.75rem",
            },
            "pre::-webkit-scrollbar": {
              width: "8px",
              height: "8px",
            },
            "pre::-webkit-scrollbar-track": {
              backgroundColor: theme("colors.neutral.darkgrey"),
            },
            "pre::-webkit-scrollbar-thumb": {
              backgroundColor: theme("colors.neutral.gray"),
              borderRadius: "4px",
            },
          },
        },
      }),
    },
  },
  darkMode: ["class"],
  plugins: [typography(), heroui()],
};

export default config;
