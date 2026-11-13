import { getCollection, type CollectionEntry } from "astro:content";

type Post = CollectionEntry<"blog">;

export interface PostPair {
  post: Post;
  zh?: Post;
}

// 同一篇文章的中英文版合併成一筆：英文為主，中文版（檔名 -zh 結尾）掛在 zh。
// 只有中文版的文章自己成一筆。依發佈日期新到舊排序。
export async function getPostPairs(): Promise<PostPair[]> {
  const all = await getCollection("blog");
  const byId = new Map(all.map((p) => [p.id, p]));
  const time = (p: Post) => (p.data.pubDate || new Date()).getTime();
  return all
    .filter((p) => !p.id.endsWith("-zh") || !byId.has(p.id.slice(0, -3)))
    .map((p) => ({ post: p, zh: p.id.endsWith("-zh") ? undefined : byId.get(`${p.id}-zh`) }))
    .sort((a, b) => time(b.post) - time(a.post));
}

export const shortDate = (d: Date) =>
  d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

// 分類名稱轉成網址錨點，例如 "AI Engineering & Governance" → "ai-engineering-governance"
export const categorySlug = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

// 連載標記：目前只有養龍蝦系列，從檔名判斷集數（"Ep 1"、"Extra"），不是連載回傳 undefined
export function seriesEpisode(id: string) {
  const ep = id.match(/^lobster-ep(\d+)/);
  if (ep) return `Ep ${ep[1]}`;
  if (id.startsWith("lobster-extra")) return "Extra";
  return undefined;
}
