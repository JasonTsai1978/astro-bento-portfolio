# jasontsai.dev 個人網站

Jason Tsai 的個人網站與部落格。Astro 5 + UnoCSS，改自 Ladvace 的 astro-bento-portfolio 模板。
網址：https://jasontsai.dev/ （舊網址 jasontsai-portfolio.pages.dev 仍可用，不轉址）

> 本 repo 是**公開**的。任何寫進這個檔案、commit、文章、`claude-progress.txt` 的內容都會公開。

## 部署

- Cloudflare Pages 連 GitHub，push `master` 自動部署（`pnpm build` → `dist`，Node 版本由 `.node-version` 固定）。
- 其他分支會產生預覽網址：`<branch>.jasontsai-portfolio.pages.dev`。分支名會轉小寫、`/` 等符號轉成 `-`、過長會截斷，例如 `claude/fix-typo` → `claude-fix-typo.jasontsai-portfolio.pages.dev`。實際網址以 Cloudflare 回報為準。
- repo 內 `@astrojs/netlify`、README 的 netlify 網址是模板作者的，不是這個站。

## 工作流程（必遵守）

1. 開工先讀 `claude-progress.txt`，從最新的 `master` 開新分支。
2. 改完 push 分支，**不要直接推 `master`**。
3. 驗證：環境有 Node 就跑 `pnpm install && pnpm build` 確認可建置；沒有就以 Cloudflare 預覽的建置結果為準，不要宣稱「已 build 通過」。
4. 把預覽網址給 Jason，請他用手機與桌機瀏覽器實看。等他確認。
5. 確認後才合併 `master`。合併由 Jason 或在他明確同意後進行。
6. 收工前在 `claude-progress.txt` 末尾加一筆：日期、改了什麼、分支名、是否已合併、遺留事項。這是不同環境之間交接狀態的唯一管道。

## 作業環境

這個 repo 可能從三個地方被修改，彼此不共享記憶，只靠 git 與 `claude-progress.txt` 同步：

- **PC（主力）**：Claude Code 本機，有截圖驗證工具與 Obsidian。開工前必須 `git pull`。
- **claude.ai/code（備援）**：雲端，GitHub App 僅授權本 repo。無法存取 Obsidian；需同步到 Obsidian 的事項記進 `claude-progress.txt`，回到 PC 再補。
- **GitHub 網頁 / github.dev（緊急）**：無 AI，只做改字、下架文章等小修。

## 部落格

- 文章放 `src/data/blog/*.md`，frontmatter：`title`、`description`、`pubDate`。
- 英文版與中文版各一篇、互相連結；中文版檔名以 `-zh` 結尾（輸出 `html lang=zh-Hant`）。
- 圖片放 `public/blog/`，**上傳前必須去除 EXIF／GPS**。
- 中文版語氣：結論先行、句子短、技術名詞留英文，不要書面腔。

## 公開內容禁放

適用於文章、commit 訊息、`claude-progress.txt`、本檔案：
IP、MAC、帳號、密碼、SSID、bot 名稱、任何金鑰或 token；公司與客戶名稱；家人姓名；家中位置。
不確定就先問 Jason。

## 換網域時

同步修改 `astro.config.mjs` 的 `site`，以及 `robots.txt` 的 sitemap 網址。
