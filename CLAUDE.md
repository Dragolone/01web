@AGENTS.md

# 零一唯创官网（01web）

零一唯创（Zero-One Innovation）公司官方网站，Next.js 16 静态站，目标是给中国 + 海外用户展示公司产品和技术能力。

> 写代码前先读 `node_modules/next/dist/docs/`。Next.js 16 与训练数据有破坏性变更（详见下方）。

## 公司与品牌

- **公司名**：零一唯创 / Zero-One Innovation
- **业务**：智能移动机器人 + 智能充电站 + VTOL 无人飞行器（VTOL 现占位「敬请期待」）
- **Slogan**：向前·创新，持续突破边界
- **官方简介**（在所有页面都对得上）：
  > 零一唯创是一家专注于智能机器人与物联网技术的创新型科技企业。致力于为机器人提供高效、智能的充电管理解决方案，通过自主研发的远程监控平台帮助用户实时掌握设备运行状态。
- **联系邮箱**：810170966qq@gmail.com
- **完整 VI 资料**：`static_style/` 目录（mood board + VI 规范图，已 commit 进仓库以备重裁）
- **官方设计稿参考**：`public/products/_design-reference.jpg`（公司 mood board 里截出来的目标 layout，不要上线）

### 公司当前阶段（事实，会变 —— 触发"信任凭证/客户案例"类提议前先看）

| 项 | 状态 | 含义 |
|---|---|---|
| 公司主体 | **尚未注册** | Footer 文案是「公司主体注册中 · ICP 备案准备中」；联系页**不能**加假地址/电话 |
| 付费/试用客户 | **0** | **不要**做客户 logo 墙、案例区、"已部署 X 台"数字 —— 全是假的 |
| 专利 | 已有但未公开授权号 | 只能用「多项发明专利申请中」占位（zh.json `pages.about.patents`），不写数字 |
| 域名 | 未定 | SEO 资源用占位 `https://www.zeroone-innovation.com`，由 `NEXT_PUBLIC_SITE_URL` 覆盖 |
| 企业邮箱 | 未启用 | 全站用 gmail。联系页用「商务合作 / 技术支持」两栏分流卡片伪装专业感 |

## 用户偏好（本项目特定）

- **沟通语言**：中文
- **设计风格**：极简、留白、苹果风。**不要过度设计** —— 用户原话「ui 可以优化一下 但是不要过度优化 要保证整体的简约以及风格」
- **动效要求**：鼠标悬停渐变 + 滚动揭示（类 Apple iPhone 介绍页那种「往下滑视觉打开」）
- **默认语言**：简体中文 —— `proxy.ts` 强制把根路径重定向到 `/zh`，**不做** 浏览器语言协商
- **改 UI 前先问** —— 用户反复强调"简约"，不要自作主张加内容/区块

## 技术栈

| 类别 | 选择 | 备注 |
|---|---|---|
| 框架 | Next.js 16.2.6 (App Router + Turbopack) | |
| React | 19.2.4 | |
| 样式 | Tailwind CSS v4 | `@import "tailwindcss"` + `@theme inline` 注入品牌 token |
| 动效 | framer-motion 12 | client components only |
| i18n | Next.js 16 原生 i18n routing | 不依赖 next-intl 等第三方库 |
| 语言 | TypeScript | strict |
| 字体 | Geist Sans / Mono + PingFang SC 备用 | |
| 部署 | 待定 | 备案中 → 计划腾讯云轻量 + Cloudflare CDN |

## ⚠️ Next.js 16 破坏性变更

`AGENTS.md` 已警告："This is NOT the Next.js you know". 已知关键差异：

1. **`params` 是 Promise** —— `const { lang } = await params`，不能同步解构
2. **`middleware.js` 已弃用 → 改名 `proxy.js`** —— 我们的在 `src/proxy.ts`
3. **全局 `PageProps<'/[lang]'>` 和 `LayoutProps<'/[lang]'>`** 类型自动可用，直接当类型注解
4. **`hasLocale()`** 模式：先验证 locale 合法再走逻辑，不合法 `notFound()`
5. **`unstable_instant`** 可以导出加速 client 导航（暂未用到，但 `node_modules/next/dist/docs/01-app/01-getting-started/index.md` 里提到过）
6. **`opengraph-image.tsx` 放在根级（`app/opengraph-image.tsx`）不会被 `[lang]/layout.tsx` 自动注入 `og:image` meta** —— 必须在 layout 的 `generateMetadata` 里显式写 `openGraph.images: [{ url: \`${SITE_URL}/opengraph-image\`, ... }]` + `twitter.images`。文档未提，dev 不报错，社交分享时才发现没图。
7. **Satori (`next/og` 的 `ImageResponse`) 严格约束**：① `height={数字}` 不能字符串 ② 任何有多个 children 的 `<div>` 必须显式 `style={{ display: "flex", ... }}` ③ 不能用 `<br/>` 在 multi-child 容器里，要拆成两个 `<span>` ④ dev/lint 都不报错，**build 时** prerender 阶段才抛
8. **`proxy.ts` 的 `matcher` 必须排除根级 metadata 路由**：当前是 `"/((?!_next|api|opengraph-image|twitter-image|sitemap.xml|robots.txt|.*\\..*).*)"`。漏掉的话，`/opengraph-image` 会被重定向到不存在的 `/zh/opengraph-image`，社交平台 fetch 失败。新增任何根级路由（manifest、ads.txt 等）都要加进来。

## 目录结构

```
src/
├── app/
│   ├── [lang]/                    ← 所有页面都在这里
│   │   ├── layout.tsx             ← 根布局（async params + 完整 generateMetadata：OG/twitter/alternates/icons）
│   │   ├── page.tsx               ← 首页（4 个 section 组合）
│   │   ├── dictionaries.ts        ← i18n 字典加载器 + locale 常量
│   │   ├── products/page.tsx
│   │   ├── products/[key]/page.tsx ← 产品详情动态路由（key: robot|station|vtol）
│   │   ├── technology/page.tsx
│   │   ├── about/page.tsx
│   │   └── contact/page.tsx
│   ├── site.ts                    ← SITE_URL 常量（读 NEXT_PUBLIC_SITE_URL）
│   ├── sitemap.ts                 ← 15 URL × hreflang 互链
│   ├── robots.ts                  ← User-agent * / Sitemap
│   ├── opengraph-image.tsx        ← ImageResponse 1200×630（全英文，跨 locale 共享）
│   └── globals.css                ← Tailwind + 品牌 CSS 变量
├── components/
│   ├── Navbar.tsx (client)        ← 含 3 段语言切换 + 移动端汉堡 + 滚动毛玻璃
│   ├── Footer.tsx (server)
│   ├── HomeHero.tsx (client)      ← 首页 Hero + 浮动产品图 + feature 小条
│   ├── HomeCTA.tsx (client)
│   ├── ProductMatrix.tsx (client) ← 产品卡片（首页 + 产品页复用，卡片可点击进 [key]）
│   ├── SolutionScenarios.tsx (client) ← /technology 4 场景区（浅底斜条纹占位块）
│   ├── TechCapabilities.tsx (client) ← 暗色技术能力区（technology 页底部）
│   └── PageHero.tsx (client)      ← 内页通用 hero
├── dictionaries/
│   ├── zh.json                    ← 简体（默认，最权威，新增 key 先加这里）
│   ├── zh-Hant.json               ← 繁体（路由是 /tw，台湾倾向：智慧/即時/聯絡/信箱/硬體/使用者）
│   └── en.json                    ← 英文
└── proxy.ts                       ← 根路径 → /zh 强制重定向（matcher 已排除根级 metadata 路由）

public/
├── brand/
│   ├── logo.png                   ← 透明背景（万能用，1710×439）
│   ├── logo-white.png             ← 白底
│   └── logo-512.png               ← header/favicon 用（512×131）
└── products/
    ├── robot-hero.jpg             ← 移动机器人产品图
    ├── drone-hero.jpg             ← VTOL 无人机
    ├── delivery-robot-office.jpg  ← 机器人办公场景（关于页用）
    └── _design-reference.jpg      ← ⚠️ 公司目标设计参考，不要上线

static_style/                       ← 原始 VI 素材，重裁图时回这里找
```

## 关键设计决策

### i18n 路由

- 三个 locale：`zh`（简体，默认）、`tw`（繁体）、`en`（英文）
- `proxy.ts` 总是把无 locale 路径重定向到 `/zh`（**不**协商浏览器语言）
- 切换语言：Navbar 中 3 段药丸控件 `[简] [繁] [EN]`，当前语言深底白字高亮
- 路径切换：用 `stripLocale()` 移除当前 locale 前缀，再拼新 locale
- 新增翻译 key 必须 **3 个 JSON 同步加**，否则 TypeScript 会报类型不匹配（`Dictionary` 类型来自 `zh.json`）

### `dictionaries.ts` 不能加 `server-only`

历史教训：曾加过 `import 'server-only'`，但 Navbar（client）要从这个文件 import `locales` / `localeLabels` 常量，编译报 500。已移除。字典是纯数据无敏感信息，移除无副作用。

### 品牌色 token（`globals.css`）

```css
--brand: #1849dc;                      /* Zero-One 蓝 */
--brand-strong: #0e3bcb;               /* hover 状态 */
--brand-soft: rgba(24,73,220,0.08);    /* 浅蓝标签底 */
--foreground: #0a0a0a;
--surface: #f5f6f8;
--muted: #6b7280;
```

Tailwind class 直接用：`bg-brand` / `text-brand` / `bg-brand-soft` / `text-muted`。

### 动效约定

- **入场动画**：`initial={{ opacity: 0, y: 12-28 }}` → `animate={{ opacity: 1, y: 0 }}`
- **缓动曲线**：`[0.16, 1, 0.3, 1]`（custom ease-out，所有组件统一）
- **滚动揭示**：`whileInView` + `viewport={{ once: true, margin: "-100px" }}`
- **悬停**：按钮 `hover:bg-brand-strong + shadow-lg shadow-brand/30`；卡片 `hover:-translate-y-1 + group-hover:scale-105` 图片放大
- **浮动**：drone/robot 用 `animate={{ y: [0, -12, 0] }}` 6-7s 循环

### 内容来源

- 公司简介 / 技术能力文案从 `/Users/dravenzhong/Documents/HBuilderProjects/Robot Charging Station Mini Program/pages/settings/about.vue` 提取
- 那个项目是公司的另一个产品（机器人管理小程序，uni-app/Vue 3），**别把它当作本项目代码改**

## Git / GitHub

- **远程**：https://github.com/Dragolone/01web.git（main 分支已推过）
- **作者必须用 `--author="Dragolone <810170966qq@gmail.com>"`** —— 用户 global config 里的邮箱有 typo（`810170966@qq@gmail.com`，多了一个 `@`），不纠正会导致 GitHub 不关联账号
- **不要修改 global git config**（用户没明确同意）
- **commit message 中文 + 不带 Claude 任何痕迹** —— 用户明确说过「不要有 claude」，**不要加** Co-Authored-By 行
- **只在用户明确要求时 commit**，不要主动提交

## 待办 / 当前状态

- ✅ 首版完成（hero + 产品矩阵 + 技术能力 + CTA + 4 个内页）
- ✅ 三语支持（zh/tw/en）已全部 200
- ✅ 已推 GitHub（首个 commit: `feat: 零一唯创官网首版`）
- ✅ P0 升级完成（SEO 全套 + OG image + sitemap + robots + 产品详情动态路由 + 解决方案页 4 场景化 + 关于页专利占位 + 联系页商务/技术分流）
- ⏸ **域名 + 备案**：未启动。用户决定先开发。备案需要 2-3 周，越早启动越好（但不是 Claude 该推动的事，提醒用户即可）
- ⏸ Vercel 预览部署：未启动
- ⏸ 国内服务器 + Cloudflare CDN：备案后做
- ⏸ **上线前必做**：设 `NEXT_PUBLIC_SITE_URL=https://<真实域名>`，否则 OG 图 / sitemap / canonical 全部用占位 `https://www.zeroone-innovation.com`
- ⏸ 真客户/数字/资质 → 出现后再做信任凭证区，**不要造假**（见「公司当前阶段（事实）」表格）
- ⏸ 产品详情页 specs：当前是 TBD 占位，等用户给真实参数后填 `productDetail.items.{key}` 字典

## 反模式 / 禁止

| 禁止 | 原因 |
|---|---|
| 不要给字典文件加 `import 'server-only'` | Navbar 等 client component 需要 import 其常量，加了会编译报 500 |
| 不要主动 commit | 用户要求 commit 时才 commit |
| 不要在 commit message 加 Co-Authored-By Claude | 用户明确要求 |
| 不要修改 user 的 global git config | 系统级安全规则 + 用户没明确同意 |
| 不要相信训练数据里的 Next.js 行为 | 16 版破坏性变更多，先查 `node_modules/next/dist/docs/` |
| 不要过度优化 UI | 用户偏好极简，每次改前先确认范围 |
| 不要做浏览器语言协商 | 默认必须是简体中文 |
| 不要直接把 `static_style/` 里的图当产品图用 | 那些是 mood board 模板图，需要先 crop 出干净的产品照片 |
| 不要把小程序项目（HBuilderProjects/Robot...）当本项目改 | 那是公司另一个产品的代码 |

## 本地开发

```bash
cd ~/Desktop/01web
npm run dev          # 起 Turbopack dev 服务器，默认 :3000
```

访问：
- http://localhost:3000      → 自动重定向 /zh
- http://localhost:3000/zh   → 简体中文首页
- http://localhost:3000/tw   → 繁体中文首页
- http://localhost:3000/en   → 英文首页

测试三语字典完整性：每个 locale 都跑一遍 home + 4 个内页，确认无 500 + 关键中文出现在 HTML 里。

**SEO/OG 改动后用 `npm run build` 跑 production 才能真正验证** —— dev 模式对 metadata 和 Satori 的检查比较宽松。

### 环境变量

| 变量 | 默认 | 何时设 |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://www.zeroone-innovation.com`（占位） | **部署前必设**真实域名。`src/app/site.ts` 集中读，sitemap/robots/canonical/OG 全部依赖它 |

### Dev server 启动遇到 `MODULE_NOT_FOUND .next/.../middleware-manifest.json`

不是缓存问题，是**端口冲突** —— 别的 Next 进程占着 3000，你的进程被切到 3001 但两个进程争抢同一个 `.next` 目录。先 `lsof -ti:3000` 看，确认是孤儿进程再 `kill`。不要无脑 `rm -rf .next`。
