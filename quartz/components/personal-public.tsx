import { FullSlug, resolveRelative } from "../util/path"
import { QuartzPluginData } from "../plugins/vfile"
import { QuartzComponent, QuartzComponentProps } from "./types"

const linkFrom = (current: FullSlug, target: string) =>
  resolveRelative(current, target as FullSlug)

const publishedTime = (page: QuartzPluginData) => {
  const value = page.dates?.published ?? page.frontmatter?.published
  const time = value ? new Date(value).getTime() : 0
  return Number.isFinite(time) ? time : 0
}

// 输入为 Quartz 已处理的页面；只渲染公开文章，输出首页文章列表。
export const PersonalHome: QuartzComponent = ({ fileData, allFiles }: QuartzComponentProps) => {
  if (fileData.slug !== "index") return null

  const current = fileData.slug as FullSlug
  const posts = allFiles
    .filter(
      (page) =>
        page.slug?.startsWith("posts/") &&
        page.slug !== "posts/index" &&
        page.frontmatter?.publish === true &&
        page.unlisted !== true,
    )
    .sort((a, b) => publishedTime(b) - publishedTime(a))
  const tags = [...new Set(posts.flatMap((page) => page.frontmatter?.tags ?? []))]

  return (
    <section class="personal-home-feed" aria-labelledby="personal-posts-title">
      <div class="personal-feed-head">
        <div>
          <p class="personal-eyebrow">PUBLIC NOTES</p>
          <h2 id="personal-posts-title">最近写下</h2>
        </div>
        <a class="personal-more" href={linkFrom(current, "posts/index")}>
          浏览全部文章 <span aria-hidden="true">↗</span>
        </a>
      </div>
      <div class="personal-feed-layout">
        <div>
          <nav class="personal-filters" aria-label="按标签阅读">
            <span>按标签阅读</span>
            <a class="is-current" href={linkFrom(current, "posts/index")}>全部</a>
            {tags.map((tag) => (
              <a href={linkFrom(current, `tags/${tag}`)}>{tag}</a>
            ))}
          </nav>
          <div class="personal-post-list">
            {posts.length === 0 ? (
              <p class="personal-empty">还没有已发布文章。第一篇写好后会出现在这里。</p>
            ) : (
              posts.map((post) => {
                const date = publishedTime(post)
                const description = String(post.description ?? "").replace(/\s+/g, " ").trim()
                return (
                  <article class="personal-post-row">
                    <time datetime={date ? new Date(date).toISOString() : undefined}>
                      {date ? new Intl.DateTimeFormat("zh-CN", { year: "numeric", month: "2-digit", day: "2-digit" }).format(date) : ""}
                    </time>
                    <div>
                      <h3>
                        <a href={linkFrom(current, post.slug!)}>{post.frontmatter?.title ?? "未命名文章"}</a>
                      </h3>
                      {description && <p class="personal-excerpt">{description.slice(0, 116)}</p>}
                      <div class="personal-tags">
                        {(post.frontmatter?.tags ?? []).map((tag) => (
                          <a href={linkFrom(current, `tags/${tag}`)}>{tag}</a>
                        ))}
                      </div>
                    </div>
                  </article>
                )
              })
            )}
          </div>
        </div>
        <aside class="personal-about-aside">
          <span class="personal-aside-rule" aria-hidden="true" />
          <h2>关于这里</h2>
          <p>这是一个以笔名发布的长期写作空间。先从记录开始，分类以后再慢慢形成。</p>
          <a href={linkFrom(current, "about")}>了解写作计划 →</a>
        </aside>
      </div>
    </section>
  )
}

export const PersonalNav: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  const current = fileData.slug as FullSlug
  const active = current === "index" ? "home" : current?.startsWith("posts/") ? "posts" : current === "about" ? "about" : ""
  const admin = linkFrom(current, "admin/index")

  return (
    <nav class="personal-nav" aria-label="主导航">
      <a class="personal-brand" href={linkFrom(current, "index")}>
        <span class="personal-brand-mark" aria-hidden="true">字</span>
        <span><strong>Hearttttt1</strong><small>写下值得留下的东西</small></span>
      </a>
      <div class="personal-nav-links">
        <a href={linkFrom(current, "index")} aria-current={active === "home" ? "page" : undefined}>阅读博客</a>
        <a href={linkFrom(current, "posts/index")} aria-current={active === "posts" ? "page" : undefined}>全部文章</a>
        <a href={linkFrom(current, "about")} aria-current={active === "about" ? "page" : undefined}>关于</a>
        <a href={admin}>创作后台</a>
      </div>
    </nav>
  )
}

export const PersonalFooter: QuartzComponent = ({ fileData }: QuartzComponentProps) => (
  <footer class="personal-footer">
    <span>把日常经验，慢慢写成自己的资料库。</span>
    <span>
      Markdown · Git 内容源 · <a href={linkFrom(fileData.slug as FullSlug, "posts/index")}>全部文章</a>
    </span>
  </footer>
)

