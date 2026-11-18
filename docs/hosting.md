# 官网发布

Cloudflare Workers Builds 从 GitHub 仓库 `bookkin-official/bookkin-website` 的 `main` 分支发布官网。Worker 名为 `bookkin-website`，访问地址为 [web.bookkin.net](https://web.bookkin.net/)。

| 设置 | 值 |
| --- | --- |
| 工作目录 | 仓库根目录 |
| Node.js | 24，见 `.nvmrc` |
| 构建命令 | `npm run verify` |
| 发布命令 | `npx wrangler@4.164.0 deploy` |
| 静态文件目录 | `dist/` |

`wrangler.jsonc` 定义静态文件目录、404 页面和自定义域名。构建会检查 Astro 类型、资源路径、站点地图和二维码。Cloudflare 控制台中可从该 Worker 的 **Deployments** 查看发布版本。

GitHub Actions 也会构建 [GitHub Pages 镜像](https://bookkin-official.github.io/bookkin-website/)。镜像使用包含仓库路径的 `SITE_URL`。
