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
            "code::before": { content: '""' },
            "code::after": { content: '""' },
            code: {
              color: theme("colors.white"),
              backgroundColor: theme("colors.neutral.darkgrey"),
              border: '0.4px solid theme("colors.neutral.gray")',
              borderRadius: "0.4rem",
              padding: "0.1rem 0.3rem",
              fontWeight: "500",
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
