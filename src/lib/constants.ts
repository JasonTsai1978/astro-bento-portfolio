export const LINKS = {
  github: "https://github.com/JasonTsai1978",
  linkedin: "https://www.linkedin.com/in/jason-tsai-7a926769/",
  email: "ealong.tsai@gmail.com",
};

// 部落格分類：每篇文章 frontmatter 的 category 必須是其中之一
export const BLOG_CATEGORIES = [
  "Enterprise IT",
  "AI Engineering & Governance",
  "Personal Lab",
] as const;

export const loaderAnimation = [
  ".loader",
  { opacity: [1, 0], pointerEvents: "none" },
  { easing: "ease-out" },
];
