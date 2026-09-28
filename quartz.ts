import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import { componentRegistry } from "./quartz/components/registry"
import { PersonalFooter, PersonalHome, PersonalNav } from "./quartz/components/personal-public"
import { PageTypeDispatcher } from "./quartz/plugins/pageTypes/dispatcher"

// 首页只展示文章，排除 404、首页和关于页等系统页面。
componentRegistry.setOptionOverrides("@quartz-community/recent-notes", {
  filter: (page: { slug?: string }) => page.slug?.startsWith("posts/") === true && page.slug !== "posts/index",
})

const config = await loadQuartzConfig()
export default config
export const layout = await loadQuartzLayout()

// 把公开站点导航和页脚放入 Quartz 布局；首页列表直接使用构建时的文章数据。
for (const pageLayout of [layout.defaults, ...Object.values(layout.byPageType)]) {
  pageLayout.left = [PersonalNav, ...(pageLayout.left ?? [])]
  pageLayout.footer = [PersonalFooter]
}
layout.byPageType.content ??= {}
layout.byPageType.content.afterBody = [...(layout.byPageType.content.afterBody ?? []), PersonalHome]

// YAML 加载器会先创建自己的页面分发器；用调整后的布局替换它。
config.plugins.emitters = [
  ...config.plugins.emitters.filter((emitter) => emitter.name !== "PageTypeDispatcher"),
  PageTypeDispatcher({ defaults: layout.defaults, byPageType: layout.byPageType }),
]

