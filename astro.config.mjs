import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";
import UnoCSS from "@unocss/astro";
import icon from "astro-icon";
import solidJs from "@astrojs/solid-js";
import { remarkReadingTime } from "./src/lib/remark-reading-time.mjs";
import svelte from "@astrojs/svelte";
import { readdirSync, readFileSync } from "node:fs";

// sitemap 的 lastmod：文章用 frontmatter 的 pubDate，/blog/ 用最新一篇的日期
const postDates = Object.fromEntries(
  readdirSync("./src/data/blog")
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
    .map((f) => {
      const date = readFileSync(`./src/data/blog/${f}`, "utf8").match(/^pubDate:\s*(\S+)/m)?.[1];
      return [`/blog/${f.replace(/\.md$/, "")}/`, date];
    })
    .filter(([, date]) => date)
);
const latestPost = Object.values(postDates).sort().at(-1);

export default defineConfig({
  site: "https://jasontsai.dev/",
  integrations: [
    sitemap({
      serialize(item) {
        const path = new URL(item.url).pathname;
        const date = path === "/blog/" ? latestPost : postDates[path];
        if (date) item.lastmod = new Date(date).toISOString();
        return item;
      },
    }),
    robotsTxt({
      sitemap: [
        "https://jasontsai.dev/sitemap-index.xml",
        "https://jasontsai.dev/sitemap-0.xml",
      ],
    }),
    solidJs(),
    UnoCSS({ injectReset: true }),
    icon(),
    svelte(),
  ],
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
  output: "static",
  vite: {
    assetsInclude: "**/*.riv",
  },
});
