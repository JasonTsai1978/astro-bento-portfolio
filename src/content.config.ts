import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { rssSchema } from "@astrojs/rss";
import { BLOG_CATEGORIES } from "./lib/constants";

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/data/blog" }),
  // 在 RSS 欄位外加上必填的分類，漏填或拼錯會讓 build 失敗
  schema: rssSchema.extend({
    category: z.enum(BLOG_CATEGORIES),
  }),
});

export const collections = { blog };
