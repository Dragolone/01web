@AGENTS.md

# 零一唯创官网（01web）

零一唯创（Zero-One Innovation）公司官方网站，Next.js 16 静态站，目标是给中国 + 海外用户展示公司产品和技术能力。

> 写代码前先读 `node_modules/next/dist/docs/`。Next.js 16 与训练数据有破坏性变更（详见下方）。

## 公司与品牌

- **公司全称**：深圳零一唯创科技有限公司 / Shenzhen Zero-One Innovation Technology Co., Ltd.
- **业务**：**双赛道战略** —— ① 新能源智慧出行（LingYI-Charge 移动 EV 充电机器人）② 低空经济装备（LingYI-1 垂起固定翼无人机）
- **Slogan**：向前·创新，持续突破边界（主）／ 生而无畏，精益求精（辅，PDF 用）
- **官方简介**（在所有页面都对得上 —— 来自 PDF 公司手册）：
  > 深圳零一唯创科技有限公司成立于 2026 年，由深圳技术大学人工智能学院与香港大学毕业生联合创办，是一家专注于智能机器人与特种无人机研发、制造和销售的科技型企业。
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
| 产品成熟度 | **两条产品线都已落地** | LingYI-Charge 和 LingYI-1 都有完整参数和应用场景（见下方「真实产品信息」节），**不要**再写成「敬请期待」或「概念产品」 |

## 真实产品信息（来自 PDF 产品手册，`docs/` 目录）

> 所有产品名、规格、场景**只能从这里取**，不要凭印象编造。每次涉及产品的文案改动前都看这一节。源文件：`docs/零一唯创-产品手册(3).pdf` + `docs/零一唯创（1）.pdf`。

### LingYI-Charge 移动充电机器人（产品 key: `charge`）

**定位**：给**电动汽车**充电的自主移动机器人（**不是给其他机器人/设备充电** —— 历史会话曾把它误解成"给机器人充电的桩"）。用户 APP 预约 → 机器人开到车位 → RGB-D 视觉识别 → 机械臂自动插充电枪。把固定充电桩升级为「桩找车」服务模式。

**真实规格**：
- 整机：1200×800×650 mm / 整备 180 kg / 额定负载 2 t
- 储能：100 kWh 电池 / 220V 市电逆变 / 750W 快充输入 / 充电效率 ≥94%
- 导航：激光 SLAM + 视觉融合 / ±15 cm 精度 / 360° 多传感器避障（超声波 + 深度相机）
- 移动：最大速度 1.5 m/s / 爬坡 ≤10°
- 防护：IP54 / 通信 4G/5G + Wi-Fi
- 安全：BMS 电池多级保护、硬件急停 + 软件安全触边

**应用场景（PDF 列的）**：商业综合体与写字楼 / 住宅小区 / 产业园区 / 机场高铁停车场 / 大型活动与展会

### LingYI-1 垂起固定翼无人机（产品 key: `vtol`）

**定位**：面向**工业巡检 / 安防侦察 / 应急搜救**的大型 VTOL 无人机。垂直起降 + 固定翼巡航双模。**已交付量产**，不是「敬请期待」。

**真实规格**：
- 尺寸：翼展 3 m / 机长 2.8 m / 空重 140 kg / 最大载荷 40 kg
- 飞行：巡航 180 km/h / 最高 200 km/h / 续航 2000 km / 升限 3000 m
- 抗风 6 级 / 遥控距离 10 km
- 动力：燃油发动机 + 设备电池（双供电突破电池续航瓶颈）
- 起降：垂直起降无需跑道
- 选配：FPV 图传、光电吊舱、喊话器、热成像仪

**应用场景**：边境/安防巡逻 / 能源管线巡检 / 应急搜救与灾情评估 / 战术侦察与警用安防 / 农林遥感

**商业价值**（PDF 实打实数据，用于 `tech` 节展示）：
- 单次成本 5000 元（直升机）→ 200 元（LingYI-1），降 95%
- 单架次覆盖 3-5 km/天（人工）→ 百公里级
- 年运维节省 50-80 万元，回收周期 8-16 个月

### 字典 key 对应（**当前实际状态**）

- `products.items[].key`: `charge` | `vtol`（只有 2 个，曾经有 `robot` 和 `station` 但都已被合并 → 重命名）
- `solutions.scenarios[].key`: `pipeline` | `rescue` | `security` | `remote-sensing`（VTOL 4 个）+ `commercial` | `residential` | `campus` | `event`（Charge 4 个）= 共 **8 个真实场景**。**每个 desc 必须贴 PDF 原文不简化**（用户曾因 desc 偏 AI 化抱怨过）
- `productDetail.items.{charge,vtol}`: 详情页用
- 历史路由 `/products/robot` 和 `/products/station` 已通过 `next.config.ts` redirects 永久 308 重定向到 `/products/charge`，防外链 404

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
│   │   ├── products/[key]/page.tsx ← 产品详情动态路由（key: **charge|vtol**）
│   │   ├── technology/page.tsx
│   │   ├── about/page.tsx
│   │   └── contact/page.tsx
│   ├── site.ts                    ← SITE_URL 常量（读 NEXT_PUBLIC_SITE_URL）
│   ├── sitemap.ts                 ← 15 URL × hreflang 互链
│   ├── robots.ts                  ← User-agent * / Sitemap
│   ├── opengraph-image.tsx        ← ImageResponse 1200×630（全英文，跨 locale 共享）
│   ├── icon.png                   ← 公司「0+1」logo 裁出的 512×512 favicon
│   ├── apple-icon.png             ← 180×180 白底 iOS 桌面图标
│   └── globals.css                ← Tailwind + 品牌 CSS 变量 + 全站 SVG tile 背景（48px 蓝图风 + 左右 brand 蓝径向晕）
├── components/
│   ├── Navbar.tsx (client)        ← 含 3 段语言切换 + 移动端汉堡 + 滚动毛玻璃
│   ├── Footer.tsx (server)
│   ├── HomeHero.tsx (client)      ← Hero 浅蓝舞台 + 主产品图 + 4 浮动玻璃状态卡
│   ├── HomeFeatures.tsx (client)  ← Hero 下方 4 卡能力条
│   ├── HomeCTA.tsx (client)
│   ├── HomeCapabilities.tsx (client) ← 4 卡技术能力（首页 + /products 页复用）
│   ├── ProductMatrix.tsx (client) ← 产品卡片（动态 cols：>=3 时 3 列，<3 时 2 列）
│   ├── SolutionScenarios.tsx (client) ← 8 场景（pipeline/rescue/security/remote-sensing + commercial/residential/campus/event）
│   ├── TechCapabilities.tsx (client) ← 「可量化商业价值」rounded-2rem 浮起卡片（外层白底 + 内层深蓝灰 #0a0d14 圆角，shadow 微浮）
│   └── PageHero.tsx (client)      ← 内页通用 hero（含 eyebrow + meta + 装饰流线）
├── dictionaries/
│   ├── zh.json                    ← 简体（默认，最权威，新增 key 先加这里）
│   ├── zh-Hant.json               ← 繁体（路由是 /tw，台湾倾向：智慧/即時/聯絡/信箱/硬體/使用者）
│   └── en.json                    ← 英文
└── proxy.ts                       ← 根路径 → /zh 强制重定向（matcher 已排除根级 metadata 路由）

docs/                              ← ⚠️ 产品手册 PDF（公司真实信息源头，文案改动前必看）
├── 零一唯创-产品手册(3).pdf      ← 17MB，完整产品手册（公司简介 + 两产品规格 + 应用场景）
└── 零一唯创（1）.pdf            ← 5MB，PPT 版战略与产品介绍

next.config.ts                     ← redirects: /products/robot|station → /products/charge (308 永久)

public/
├── brand/
│   ├── logo.png                   ← 透明背景（万能用，1710×439）
│   ├── logo-white.png             ← 白底
│   └── logo-512.png               ← header/favicon 用（512×131）
└── products/
    ├── robot-hero.jpg             ← ⚠️ 文件名误导 —— 实际是 LingYI-Charge 充电桩白色机型（"ENERGIZE ANYWHERE"）。`products[].key='charge'` 用它
    ├── drone-hero.jpg             ← LingYI-1 VTOL 无人机（飞行视角）。`products[].key='vtol'` 用它
    ├── delivery-robot-office.jpg  ← ⚠️ 高个子配送机器人，**非公司产品**。当前仅 about 页用作场景图，未来应替换或删除
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

### TechCapabilities 用 rounded card，**不要**用 fade overlay

历史教训（2026-06-01）：曾在白→黑 section 之间加 `from-white to-transparent` 渐变 overlay 做"软过渡"，但视觉呈现"白雾啃边"非常丑（用户原话「这个渐变太难看了」）。

当前方案（苹果 / Vercel 风的浮起卡片）：

```tsx
<section className="py-12 md:py-16 px-4 sm:px-6 lg:px-10">           {/* 外层白底，给卡片外 margin */}
  <div className="relative rounded-[2rem] bg-[#0a0d14] text-white
                  py-24 md:py-32 overflow-hidden
                  shadow-[0_30px_80px_-40px_rgba(10,13,30,0.5)]">    {/* 浮起卡片 */}
    {/* radial gradient overlay + content */}
  </div>
</section>
```

下次任何"明暗节奏切换"都用这个套路，**不要再加 fade overlay**。

### 全站 max-w 用 `max-w-[88rem]`（1408px）

不要用 `max-w-7xl`（1280px）。已经全局 sed 批量替换。新组件容器模板：`mx-auto max-w-[88rem] px-6 lg:px-10`。

### 全站 ambient 背景在 `globals.css` body（fixed background）

3 层叠加，用户偏好"科技图案 + 不抢戏 + 让人感觉不空"：

1. **SVG tile pattern**（48×48px）—— 蓝图/电路板风：4 角圆点（tile 重复后形成网格交点）+ tile 中心十字坐标。alpha 0.11-0.13。
2. **左侧 brand 蓝径向晕** `radial-gradient(45% 70% at 0% 45%, rgba(24,73,220,0.05), transparent)`
3. **右侧 brand 蓝径向晕** `radial-gradient(45% 70% at 100% 55%, rgba(24,73,220,0.04), transparent)`

`background-attachment: fixed` 让背景不随滚动移动（沉浸感）。Dark sections (`bg-[#0a0d14]`, `bg-foreground` 等不透明 bg) 自动盖住全部 3 层。**新增 dark section 不需要处理背景。**

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
- ✅ P0 升级完成（SEO 全套 + OG image + sitemap + robots + 产品详情动态路由 + 解决方案页场景化 + 关于页专利占位 + 联系页商务/技术分流）
- ✅ **基于 PDF 真实信息大重写完成**（2026-06-01）：字典三同步用 PDF 真实产品名/规格/场景；产品 key 重命名 robot→charge；产品矩阵从首版的"3 个模糊产品"对齐到"2 个真实产品"；TechCapabilities 改成商业价值对比（vs 直升机降本 95% 等实数据）
- ✅ **视觉细化轮**（2026-06-01 后续）：HomeCapabilities 图标修复（4 个新 key 加 SVG）/ TechCapabilities 改 rounded card 浮起卡片（取代难看的 fade overlay）/ 应用场景从 6 扩到 8 全部贴 PDF 原文 / Footer i18n（加 sitemapLabel + contactLabel）/ 全局 max-w-7xl → max-w-[88rem] sed 批量 / 全站背景升级为 SVG tile pattern + brand 蓝径向晕
- ⏸ **域名 + 备案**：未启动。用户决定先开发。备案需要 2-3 周，越早启动越好（但不是 Claude 该推动的事，提醒用户即可）
- ⏸ Vercel 预览部署：未启动
- ⏸ 国内服务器 + Cloudflare CDN：备案后做
- ⏸ **上线前必做**：设 `NEXT_PUBLIC_SITE_URL=https://<真实域名>`，否则 OG 图 / sitemap / canonical 全部用占位 `https://www.zeroone-innovation.com`
- ⏸ 真客户/数字/资质 → 出现后再做信任凭证区，**不要造假**（见「公司当前阶段（事实）」表格）
- ⏸ 视觉素材升级：当前 `public/products/` 只有 3 张图（充电桩/无人机/办公机器人），PDF 里有更多场景图（音乐节供电、巷战起降、固定翼巡航），需要从 PDF 抽出来用

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
| **不要凭印象编产品名/规格/场景** | 公司有真实 PDF 产品手册在 `docs/`，所有产品文案改动前必看「真实产品信息」节。历史踩过：曾把 LingYI-Charge 写成"给机器人充电的桩"（实际是给电动汽车）、把 LingYI-1 写成"敬请期待"（实际已交付） |
| **不要按字面理解产品 key** | `products.items[].key` 已经历 station→robot→charge 重命名，旧 key 通过 `next.config.ts` redirect 兜底。改产品矩阵前先看「字典 key 对应」节 |
| **不要再用旧场景词**（配送/巡检/安防/低空物流） | 当前 **8 场景** key 是 pipeline/rescue/security/remote-sensing + commercial/residential/campus/event。**每个 desc 必须用 PDF 原文，不简化、不漏 PDF 提到的细节**（比如"喊话器疏导"、"评估建筑物损毁程度"、"40kg 载荷可同时挂载可见光+热成像"等）。SolutionScenarios.tsx 的 `scenarioIcons` map 必须同步 8 个 key |
| **不要在白→黑 section 过渡处加 fade overlay** | 曾用 `from-white to-transparent` 做过，呈现"白雾啃边"非常难看。当前 TechCapabilities 用「外层白底 + 内层 `rounded-[2rem]` 深色卡片 + 微 shadow」浮起卡片方案，新增类似明暗节奏块也用这个套路 |
| **不要用 `max-w-7xl`** | 全站已统一改 `max-w-[88rem]`（1408px）。新组件用 `max-w-[88rem] mx-auto px-6 lg:px-10` 模板 |

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
