# 官网域名

[web.bookkin.net](https://web.bookkin.net/) 属于 Bookkin 官方 Cloudflare 账户的 `bookkin.net` 区域。官网由 `bookkin-website` Worker 提供服务。[网页版应用](https://www.bookkin.net/) 使用自己的地址。

在 Worker 的 **Domains** 中查看 `web.bookkin.net` 的绑定。`wrangler.jsonc` 中的 `custom_domain` 配置由 Cloudflare 管理对应的 DNS 记录和 HTTPS 证书。[Cloudflare 自定义域名说明](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/)

发布后访问首页、[/robots.txt](https://web.bookkin.net/robots.txt) 和 [sitemap](https://web.bookkin.net/sitemap-index.xml)。下载二维码应指向 `https://web.bookkin.net/#download`。
