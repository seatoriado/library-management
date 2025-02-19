import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        slideup: {
         "0%": {
          transform: "translateY(100%)",
          opacity: "0"
         },
         "100%": {
          transform: "translateY(0)",
          opacity: "1"
         },
       },
      },
      animation: {
        slideup: "slideup 300ms ease-in-out",
      }
    },
  },
  plugins: [],
} satisfies Config;
