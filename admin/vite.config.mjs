import { fileURLToPath } from "node:url"
import { defineConfig } from "vite"

export default defineConfig({
  root: fileURLToPath(new URL(".", import.meta.url)),
  base: "/personal-blog/admin/",
  build: {
    outDir: "../public/admin",
    emptyOutDir: false,
  },
})
