// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://calseagram.com",
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [mdx()],

  experimental: {
    fonts: [
      {
        provider: "local",
        name: "et-book",
        cssVariable: "--font-et-book",
        variants: [
          {
            weight: 400,
            style: "normal",
            src: ["./src/assets/fonts/et-book-roman-old-style-figures.woff"],
          },
          {
            weight: 700,
            style: "normal",
            src: ["./src/assets/fonts/et-book-bold-line-figures.woff"],
          },
          {
            weight: 400,
            style: "italic",
            src: [
              "./src/assets/fonts/et-book-display-italic-old-style-figures.woff",
            ],
          },
        ],
      },
    ],
  },
});
