// 为较旧的公司浏览器补齐 CMS 保存 Markdown 所需的 Base64 方法。
// 输入是字节数组或 Base64 文本；输出与浏览器原生方法一致。
if (typeof Uint8Array.prototype.toBase64 !== "function") {
  Object.defineProperty(Uint8Array.prototype, "toBase64", {
    configurable: true,
    writable: true,
    value({ alphabet = "base64", omitPadding = false } = {}) {
      if (alphabet !== "base64" && alphabet !== "base64url") {
        throw new TypeError("不支持的 Base64 字母表")
      }

      const chunks = []
      const chunkSize = 24_576 // 3 的倍数，分块编码后可直接拼接。
      for (let offset = 0; offset < this.length; offset += chunkSize) {
        const bytes = this.subarray(offset, offset + chunkSize)
        chunks.push(btoa(String.fromCharCode(...bytes)))
      }

      let encoded = chunks.join("")
      if (alphabet === "base64url") encoded = encoded.replace(/\+/g, "-").replace(/\//g, "_")
      if (omitPadding) encoded = encoded.replace(/=+$/, "")
      return encoded
    },
  })
}

if (typeof Uint8Array.fromBase64 !== "function") {
  Object.defineProperty(Uint8Array, "fromBase64", {
    configurable: true,
    writable: true,
    value(base64, { alphabet = "base64" } = {}) {
      if (alphabet !== "base64" && alphabet !== "base64url") {
        throw new TypeError("不支持的 Base64 字母表")
      }

      const normalized = alphabet === "base64url" ? base64.replace(/-/g, "+").replace(/_/g, "/") : base64
      const binary = atob(normalized.replace(/\s/g, ""))
      const bytes = new Uint8Array(binary.length)
      for (let index = 0; index < binary.length; index += 1) {
        bytes[index] = binary.charCodeAt(index)
      }
      return bytes
    },
  })
}
