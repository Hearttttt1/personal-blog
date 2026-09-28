import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import { componentRegistry } from "./quartz/components/registry"

// 首页只展示文章，排除 404、首页和关于页等系统页面。
componentRegistry.setOptionOverrides("@quartz-community/recent-notes", {
  filter: (page: { slug?: string }) => page.slug?.startsWith("posts/") === true && page.slug !== "posts/index",
})

const config = await loadQuartzConfig()
export default config
export const layout = await loadQuartzLayout()
