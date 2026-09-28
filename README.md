# Personal Blog

公开个人博客与在线 Markdown 编辑器。文章和草稿保存在 GitHub 仓库，由 Quartz 生成静态网页，Sveltia CMS 提供浏览器编辑界面。

## 地址

- 博客：`https://hearttttt1.github.io/personal-blog/`
- 在线编辑：`https://hearttttt1.github.io/personal-blog/admin/`

首次部署前，在仓库 Settings → Pages 中把 Build and deployment 的 Source 设为 **GitHub Actions**。自有域名暂未配置。

## 写作与发布

1. 打开在线编辑页面，选择 **Sign In with Token**。按页面引导生成只限本仓库的 GitHub fine-grained token，授予 **Contents: Read and write**；不要把 token 写入仓库或发给他人。
2. 在“文章”中创建或修改内容。正文默认显示 Markdown 原文，也可切换富文本和预览。编辑过程中的临时备份由浏览器保存；点击“保存”后，Markdown 写入仓库但不触发网站部署。
3. 打开“发布”开关，再选择“保存并发布”。首次发布时自动写入 `published`，以后修改保留原发布时间；每次保存会更新 `modified`。也可以在后台顶部选择“发布更改”。

文章源文件在 `content/posts/`，附件在 `content/assets/`。博客首页按首次发布时间倒序展示文章，`/posts/` 显示全部文章。`publish: false` 的文章不会生成公开网页。

**仓库本身公开**：草稿、附件和历史版本仍可通过 GitHub 读取。请勿写入私人资料、密码、密钥或未获授权公开的内容。用于登录的 token 会保存在当前浏览器本地存储中；在共用设备上使用后应退出并清除站点数据。

## 技术结构

- `content/`：标准 Markdown 与 YAML frontmatter。
- `admin/`：Sveltia CMS 编辑入口和字段配置。
- `quartz.config.yaml`、`quartz.ts`：博客外观、发布日期、文章列表与静态页面规则。
- `.github/workflows/deploy-pages.yml`：GitHub Actions 构建和 Pages 部署。

本地需要 Node.js 22 及以上版本和 npm 10.9.2 及以上版本。运行 `npm ci` 后用 `npx quartz build --serve` 预览。

逐篇选择是否导出或同步到 Obsidian 仍是后续功能；首期可以直接从仓库下载 `.md` 文件导入 Obsidian。
