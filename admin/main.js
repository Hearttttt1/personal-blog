import CMS from "@sveltia/cms"

// 保存前写入时间：首次发布保留原时间，每次保存更新修改时间。
CMS.registerEventListener({
  name: "preSave",
  handler: ({ entry }) => {
    let data = entry.get("data")
    const now = new Date().toISOString()
    if (data.get("publish") === true && !data.get("published")) {
      data = data.set("published", now)
    }
    return data.set("modified", now)
  },
})

CMS.init()
