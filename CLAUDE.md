@AGENTS.md

# 零一唯创官网（01web）

零一唯创（Zero-One Innovation）公司官方网站，Next.js 16 静态站，目标是给中国 + 海外用户展示公司产品和技术能力。

> 写代码前先读 `node_modules/next/dist/docs/`。Next.js 16 与训练数据有破坏性变更（详见下方）。

## 公司与品牌

- **公司全称**：深圳零一唯创科技有限公司 / Shenzhen Zero-One Innovation Technology Co., Ltd.
- **业务**：**双赛道战略** —— ① 新能源智慧出行（LingYI-Charge 移动 EV 充电机器人）② 低空经济装备（LingYI-1 垂起固定翼无人机）
- **Slogan**：向前·创新，持续突破边界（主）／ 生而无畏，精益求精（辅，PDF 用）
- **官方简介**（在所有页面都对得上 —— 基于 PDF 公司手册，**创办方表述已脱敏**）：
  > 深圳零一唯创科技有限公司成立于 2026 年，由深圳技术大学人工智能学院与香港高校青年团队联合创办，是一家专注于智能机器人与特种无人机研发、制造和销售的科技型企业。
  >
  > ⚠️ PDF 原文写的是「与香港大学毕业生联合创办」，用户 2026-06-01 要求**全站不点名香港大学**，统一改为「香港高校青年团队」（meta 里「港大背景」→「港校背景」，en 用 `Hong Kong universities`）。改产品/公司文案做「按 PDF 还原」时**不要**把这句改回去。
- **联系邮箱**：810170966qq@gmail.com
- **完整 VI 资料**：`static_style/` 目录（mood board + VI 规范图，已 commit 进仓库以备重裁）
- **官方设计稿参考**：`public/products/_design-reference.jpg`（公司 mood board 里截出来的目标 layout，不要上线）

### 公司当前阶段（事实，会变 —— 触发"信任凭证/客户案例"类提议前先看）

| 项 | 状态 | 含义 |
|---|---|---|
| 公司主体 | **✅ 已注册（2026-03-03）** | 深圳零一唯创科技有限公司 / 统一社会信用代码 `91440300MAK7XEPD58` / 法人 龙俊洁 / 注册地址 深圳市坪山区马峦街道沙坣社区沙新路（南延伸段）2-49号。已写进 `[lang]/layout.tsx` 的 Organization JSON-LD（taxID + address）+ 联系页地址卡（三语 `pages.contact.{addrLabel,company,addr,creditLabel,creditCode}`）。**地址是真的，已上墙公开**（旧版「联系页不能加地址」的红线已解除） |
| 付费/试用客户 | **0** | **不要**做客户 logo 墙、案例区、"已部署 X 台"数字 —— 全是假的 |
| 专利 | 已有但未公开授权号 | 只能用「多项发明专利申请中」占位（zh.json `pages.about.patents`），不写数字 |
| 域名 | **✅ www.01weichuang.com（已备案上线）** | ICP：粤ICP备2026041942号-2（footer 已挂，链 beian.miit.gov.cn）。腾讯云广州托管。`site.ts` 默认值已改成真实域名，仍可被 `NEXT_PUBLIC_SITE_URL` 覆盖。⏳ 公安联网备案待办（服务开通起 30 天内，~2026-07-18） |
| 企业邮箱 | 未启用 | 全站用 gmail。联系页用「商务合作 / 技术支持」两栏分流卡片伪装专业感 |
| 产品成熟度 | **两条产品线都已落地** | LingYI-Charge 和 LingYI-1 都有完整参数和应用场景（见下方「真实产品信息」节），**不要**再写成「敬请期待」或「概念产品」 |

## 真实产品信息（来自 PDF 产品手册）

> 所有产品名、规格、场景**只能从这里取**，不要凭印象编造。每次涉及产品的文案改动前都看这一节。源文件在**仓库根目录**（不是 `docs/`，CLAUDE.md 旧版写错过）：`零一唯创-产品手册(3).pdf`（17MB，主手册）+ `零一唯创（1）.pdf`（PPT 版）。**这两个 PDF 是 untracked**（未 commit）。读 PDF：`Read` 工具原生支持（`pages` 参数）；抽图用 `pdfimages`/`pdftoppm`（poppler，已装）。
>
> **手册里还没全搬上网站的真实内容**（需要时再用）：合作模式（设备买断/服务分成/租赁/SaaS）、目标客户画像表、竞争优势长文、飞行器组件交付清单、更多核心功能（地面站监控/自主航线/AI 识别）。属 B 端招商细节，用户偏极简没硬塞。

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
- `productDetail.items.{charge,vtol}`: 详情页用。每个含 `features`（3 条核心特性）+ **`specs`**（PDF 真实参数表，分组 `{group, rows:[{k,v}]}`）+ **`value`**（商业价值对比 `{rows:[{k,old,neo}], note}`，两款都有 —— Charge 是痛点对比 + ROI，VTOL 是 vs 直升机降本）。`productDetail` 顶层还有 `valueTitle/valueColOld/valueColNew`。
- `pages.about.market`: 关于页市场规模表 `{title, subtitle, cols:{segment,domestic,global,growth}, rows:[]}`（PDF 真实测算：工业无人机 450 亿 / 移动充电 120 亿 / 低空经济 5000 亿 + CAGR）。
- **路由 `/technology` 已改名 `/solutions`**（2026-06-01，nav 标签本就是「解决方案」，URL 名实相符）。**但 nav/footer/dict 内部 key 仍叫 `technology`**（稳定标识符，别去改；`pages.technology` 内容就是解决方案页用的）。旧 `/technology` → `/solutions` 走 `next.config.ts` 308 redirect。
- 历史路由 `/products/robot` 和 `/products/station` 也通过 `next.config.ts` redirects 永久 308 → `/products/charge`，防外链 404

## 用户偏好（本项目特定）

- **沟通语言**：中文
- **设计风格**：⚠️ **2026-06-18 已整体转向「高端深色赛博科技风 + 沉浸式」**，旧的「极简/浅白/苹果风」已作废 —— 详见下方《⚠️ 沉浸式深色改版》。原话保留备查：「ui 可以优化一下 但是不要过度优化」（但后续用户多轮明确要求做炫酷沉浸式 3D，推翻了这条）。
- **动效要求**：鼠标悬停渐变 + 滚动揭示；首页有 WebGL 3D Hero、开场 Loader、滚动进度、页面转场（见改版节）
- **默认语言**：简体中文 —— `proxy.ts` 强制把根路径重定向到 `/zh`，**不做** 浏览器语言协商
- **改 UI 前先问** —— 仍适用于「加内容/改信息架构」；但视觉方向已确定为深色赛博沉浸

## ⚠️ 沉浸式深色改版（2026-06-18，最新现状 —— 覆盖下方多处旧的「极简/浅色」约定）

经过多轮迭代，全站从「极简浅色苹果风」**整体改成「高端深色赛博科技风 + 沉浸式 WebGL」**，已合并 main 并 push（线上服务器需 `git pull`+rebuild 才生效）。**下个会话改 UI 前先认这一节，别照旧约定往浅色/极简方向退。**

- **全站深色**：`globals.css` 主题 token 已翻深色（`--background:#070a18` / `--foreground` 浅 / `--surface` 半透明白玻璃 / `--border` 浅）。**所有用语义 token 的组件自动深色**。body 科技图标矩阵 tint 改成浅蓝（`rgba(150,176,255,...)`）。内页（产品/详情/方案/关于/联系/404）也全深色：开场是深色 hero，正文经 token 自动深色但仍可读。
- **新依赖（已装，React 19 兼容）**：`three` ^0.184 / `@react-three/fiber` ^9 / `@react-three/drei` ^10 / `@react-three/postprocessing` ^3 / `@pmndrs/assets`（CC0 HDRI，本地打包离线用）。→ 「不引入重型 3D 库」这条**已被用户明确要求推翻**。
- **首页 3D Hero**：`components/immersive/Hero3D.tsx` = 工业**涡轮引擎**（金属环+旋转扇叶+发光核心+霓虹反射+Bloom/Vignette/色散），可拖拽、鼠标倾斜。`ImmersiveHero.tsx` 包裹它 + 文案/标签/CTA。**性能关键：Hero3D `frameloop` 由可见性门控（离屏 `never` 暂停），别删——这是滚动卡顿的修复**。配色青/品红/蓝/紫赛博霓虹。**性能旋钮 + 用户偏好（2026-06-19，重要）**：可调的有 `dpr`（当前 `[1,1.8]`）/ Sparkles 粒子数（当前 ~960 = 520+280+160）/ EffectComposer 后处理 pass（Bloom+色散+Vignette+Noise 全开）。但用户**明确要效果优先**，**已否过「滚动时暂停渲染」和「降画质/大幅减粒子」**——别再为性能去停涡轮或砍画质，最多按用户口令微调一档；离屏暂停只保留 `IntersectionObserver threshold:0`（完全看不见才 `never`，不要再加「滚动手势中暂停」那套）。
- **immersive 组件目录** `components/immersive/`：`ImmersiveHero` / `Hero3D` / `Loader`（开场幕布，挂 layout）/ `ScrollProgress`（顶部霓虹进度条，挂 layout）。`[lang]/template.tsx` = 路由切换淡入转场。（历史上还做过 ParticleField/TerrainField/ShaderField/HoloDrone，均被否后删除——别找。）
- **首页叙事 section（顺序）**：ImmersiveHero → ProductMatrix → **HomeSolutions(新)** → HomeCapabilities → **HomeTech(新)** → TechCapabilities(商业价值已 dashboard 化) → HomeCTA(深色光束)。`HomeSolutions.tsx`/`HomeTech.tsx` 为新增组件。首页内容包在 `<div bg-[#070a18]>` 暗场容器里。
- **`theme="dark"` 变体**：`ProductMatrix`/`HomeCapabilities`/`HomeCTA` 有 `theme?:"dark"` prop；首页与产品页都传 `dark`（玻璃卡+霓虹）。它们的浅色分支基本已不用（全站深色）。
- **新增字典 key（三语已同步）**：`heroImmersive`（title1/title2/subtitle/tags/ctaPrimary/ctaSecondary）、`homeSolutions`、`homeTech`、`tech` 增 `metric/note/disclaimer`。**新增产品定位已拓宽**到「机器人 / 无人机 / AIoT / 智能硬件 / 自动化解决方案 / 智慧园区 / 远程运维平台」（用户亲自定的对外定位，非编造；与那个机器人小程序的真实 IoT/控制台能力一致）。
- **导航栏**：始终白字白 logo（`brightness-0 invert`），滚动后变**深色玻璃**（不再白条）。
- **字体**：新增 Playfair Display（仅英文点缀，如 hero 的 `ZERO-ONE INNOVATION`）；正文仍 Geist。
- **背景纹理**：全站「直线网格」已统一换成**柔和点阵**（`radial-gradient` 圆点，用户嫌横竖线不自然）。
- **作废的旧约定**（下方仍能看到，但**以本节为准**）：①「off-white #fafbfe 底色」→ 已深色；②「不要在白→黑加 fade overlay」→ 现到处用深↔浅渐变过渡且 OK；③「max-w-[88rem]」→ 已全站改 **96rem**；④「极简/不过度设计」视觉层面已不适用。
- **品牌名**：首页文案统一用「零一唯创」，**别写「01唯创」**（用户 2026-06-18 纠正过）。英文 `Zero-One Innovation`。
- **2026-06-19 视觉/性能/PWA 轮（已 push main）**：
  - **卡片光效** `components/CardFx.tsx`：鼠标跟随光斑 + 悬停流光渐变边框，作为 overlay drop-in 嵌进各卡片网格（ProductMatrix/HomeCapabilities/TechCapabilities/HomeSolutions/HomeTech）。`pointer-events-none` 不挡 Link；边框动画只在 hover 跑（idle 零开销）。样式在 `globals.css .card-fx*`（含 `@property --fx-angle`）。深色卡用青、浅色分支传 brand 蓝。
  - **数字滚动计数** `components/CountUp.tsx`：滚到视口 0→目标值。**SSR 渲染真实值**（SEO/无 JS 安全），客户端 arm 到 0 再 count；范围/非数字（「百公里级」「8–16 月」「5,000→200」）原样不动。用在关于页市场表 + TechCapabilities metric。⚠️ **正则匹配必须 `useMemo` 缓存**——否则每帧 setState 重渲染产生新数组引用、effect 反复重启、数字永不停（踩过这个 bug）。
  - **film-grain 噪点**：`globals.css .film-grain` + layout 挂一层 fixed 噪点。**禁止用 `mix-blend-mode`**（fixed + blend = 每帧全屏重绘 = 滚动卡顿，踩过），改 `transform: translateZ(0)` 提成静态 GPU 合成层；触屏 `@media (hover:none)` 隐藏。
  - **PWA**：`app/manifest.ts`（深色启动屏 #070a18 / 用 `/icon.png` 512）。proxy matcher 已排除 `manifest.webmanifest`；layout `generateMetadata` 显式 `manifest`（动态根布局不自动注入，同 og:image 坑）。
  - **导航栏「联系我们」按钮**：由 `bg-brand` 纯蓝改 **白底深字**（`bg-white text-[#0a1024]`），与首页 CTA 统一（桌面 + 移动端两处）——用户嫌孤立的蓝不搭深色霓虹。
  - **HomeTech 卡片标题**：zh/tw 已改中文（en 保留英文），**别再改回英文**（用户专门提过中文版不该出现英文标题）。
  - **脚手架清理**：删了 `public/` 的 next/vercel/window/file/globe.svg；`package.json` 的 dev + build 都带 `--turbopack`。
- **未做（用户判定非必要）**：首页精简版「应用场景」（/solutions 已有完整版）。

## 技术栈

| 类别 | 选择 | 备注 |
|---|---|---|
| 框架 | Next.js 16.2.6 (App Router + Turbopack) | |
| React | 19.2.4 | |
| 样式 | Tailwind CSS v4 | `@import "tailwindcss"` + `@theme inline` 注入品牌 token |
| 动效 | framer-motion 12 | client components only |
| 3D / WebGL | three ^0.184 + @react-three/fiber ^9 + drei ^10 + postprocessing ^3 + @pmndrs/assets | 仅首页 Hero3D 用；client-only 动态加载(ssr:false)；见《沉浸式深色改版》 |
| 字体 | + Playfair Display | 仅英文点缀；正文仍 Geist |
| i18n | Next.js 16 原生 i18n routing | 不依赖 next-intl 等第三方库 |
| 语言 | TypeScript | strict |
| 字体 | Geist Sans / Mono + PingFang SC 备用 | |
| 部署 | ✅ 腾讯云广州（43.139.159.234）+ HTTPS | www.01weichuang.com 已上线备案 |

## ⚠️ Next.js 16 破坏性变更

`AGENTS.md` 已警告："This is NOT the Next.js you know". 已知关键差异：

1. **`params` 是 Promise** —— `const { lang } = await params`，不能同步解构
2. **`middleware.js` 已弃用 → 改名 `proxy.js`** —— 我们的在 `src/proxy.ts`
3. **全局 `PageProps<'/[lang]'>` 和 `LayoutProps<'/[lang]'>`** 类型自动可用，直接当类型注解
4. **`hasLocale()`** 模式：先验证 locale 合法再走逻辑，不合法 `notFound()`
5. **`unstable_instant`** 可以导出加速 client 导航（暂未用到，但 `node_modules/next/dist/docs/01-app/01-getting-started/index.md` 里提到过）
6. **`opengraph-image.tsx` 放在根级（`app/opengraph-image.tsx`）不会被 `[lang]/layout.tsx` 自动注入 `og:image` meta** —— 必须在 layout 的 `generateMetadata` 里显式写 `openGraph.images: [{ url: \`${SITE_URL}/opengraph-image\`, ... }]` + `twitter.images`。文档未提，dev 不报错，社交分享时才发现没图。**同坑：`app/manifest.ts`（PWA）也一样**——必须在 `generateMetadata` 里显式 `manifest: "/manifest.webmanifest"`，否则动态根布局不会注入 `<link rel="manifest">`（已加）。
7. **Satori (`next/og` 的 `ImageResponse`) 严格约束**：① `height={数字}` 不能字符串 ② 任何有多个 children 的 `<div>` 必须显式 `style={{ display: "flex", ... }}` ③ 不能用 `<br/>` 在 multi-child 容器里，要拆成两个 `<span>` ④ dev/lint 都不报错，**build 时** prerender 阶段才抛
8. **`proxy.ts` 的 `matcher` 必须排除根级 metadata 路由**：当前是 `"/((?!_next|api|opengraph-image|twitter-image|sitemap.xml|robots.txt|manifest.webmanifest|.*\\..*).*)"`（已含 manifest.webmanifest）。漏掉的话，`/opengraph-image` 会被重定向到不存在的 `/zh/opengraph-image`，社交平台 fetch 失败。新增任何根级路由（manifest、ads.txt 等）都要加进来。

## 目录结构

```
src/
├── app/
│   ├── [lang]/                    ← 所有页面都在这里（⚠️ 根布局就在这层，**没有 app/layout.tsx** —— 见「路由 / 404 架构」）
│   │   ├── layout.tsx             ← 根布局（async params + generateMetadata + Organization JSON-LD + MotionProvider 包裹 + TechBackdrop）
│   │   ├── page.tsx               ← 首页（HomeHero/Features/ProductMatrix/HomeCapabilities/TechCapabilities/HomeCTA）
│   │   ├── dictionaries.ts        ← i18n 字典加载器 + locale 常量
│   │   │                            （⚠️ 这层**不要**建 not-found.tsx —— 动态根布局下不组合，404 走根 app/not-found.tsx）
│   │   ├── products/page.tsx
│   │   ├── products/[key]/page.tsx ← 产品详情（key: **charge|vtol**；非法 key → `redirect('/products')` 不是 notFound，见 404 架构）。含 features+specs 表+value 对比+Product JSON-LD
│   │   ├── solutions/page.tsx     ← 解决方案页（旧 /technology 改名，dict 仍用 pages.technology）。SolutionScenarios + TechCapabilities
│   │   ├── about/page.tsx         ← 公司简介 + 双产品图 + 研发/专利 + 市场规模表
│   │   └── contact/page.tsx       ← 商务/技术两卡（带图标 + 悬停 ↗）
│   ├── not-found.tsx              ← ✅ 真正生效的 404：自带完整 `<html>`（无根 layout 可借），client 用 usePathname 取 locale 出三语
│   ├── site.ts                    ← SITE_URL 常量（读 NEXT_PUBLIC_SITE_URL）
│   ├── sitemap.ts                 ← SITE_PATHS × 3 locale × hreflang 互链（SITE_PATHS 里已是 /solutions）
│   ├── robots.ts / opengraph-image.tsx / manifest.ts(PWA) / icon.png / apple-icon.png
│   └── globals.css                ← Tailwind + 品牌 token + 全页基底「科技图标矩阵」+ film-grain 噪点层 + .card-fx 卡片光效 + focus-visible 环 + reduced-motion media query（见「背景」「a11y」「2026-06-19 视觉轮」）
├── components/
│   ├── Navbar.tsx (client)        ← 3 段语言切换 + 移动端汉堡（aria-expanded/ESC/锁滚动）+ 滚动毛玻璃
│   ├── Footer.tsx (server)        ← 链接悬停滑入 ↗ 箭头
│   ├── MotionProvider.tsx (client)← `<MotionConfig reducedMotion="user">` 包裹全站（动效降级）
│   ├── TechBackdrop.tsx (server)  ← 全局 fixed 背景层（角落辉光 + 左右 blueprint 网格/电路带，mask 横向渐隐）
│   ├── HomeHero.tsx (client)      ← Hero 舞台 + 主产品图 + 4 浮动卡 + **VTOL 双赛道迷你卡**（舞台下方）
│   ├── HomeFeatures / HomeCTA / HomeCapabilities (client)
│   ├── ProductMatrix.tsx (client) ← 产品卡片（fallback 用 visuals.charge，别用已删的 visuals.robot）
│   ├── SolutionScenarios.tsx (client) ← 8 场景**全部有实景图**（scenarioImages map：4 张 PDF 抽图 + 4 张 ChatGPT 生成）。示意卡 fallback 分支保留但已无场景命中
│   ├── TechCapabilities.tsx (client) ← 「可量化商业价值」深色浮起卡片（VTOL 用，dict.tech）
│   ├── PageHero.tsx (client)      ← 内页通用 hero（eyebrow 圆点 + meta + 装饰流线）
│   ├── CardFx.tsx (client)        ← 卡片鼠标光斑 + 悬停流光边框 overlay（drop-in，pointer-events-none），样式在 globals.css .card-fx*
│   └── CountUp.tsx (client)       ← 数字滚动计数（SSR 真实值，范围/非数字不动；⚠️ useMemo 缓存正则别去掉，否则数字一直跳）
├── dictionaries/                  ← zh.json（默认/最权威）/ zh-Hant.json（/tw 台湾用词）/ en.json。新增 key 三个同步
└── proxy.ts                       ← 非 locale 路径 → 加 /zh 前缀重定向（matcher 已排除根级 metadata 路由）

# PDF 手册在仓库根目录（不是 docs/）：零一唯创-产品手册(3).pdf + 零一唯创（1）.pdf（均 untracked）

next.config.ts                     ← redirects 308: /products/robot|station → /products/charge；/technology → /solutions

public/
├── brand/                         ← logo.png（透明 1710×439）/ logo-white.png / logo-512.png（header/favicon 512×131）
└── products/                      ← ⚠️ 文件名易误导，认这里：
    ├── robot-hero.jpg             ← LingYI-Charge 白色机型（ProductMatrix 卡 + HomeHero 主图）
    ├── drone-hero.jpg             ← LingYI-1 飞行视角（HomeHero VTOL 迷你卡）
    ├── charge-station.jpg         ← 【PDF 抽出】充电机器人给特斯拉充电（charge 详情 hero + commercial 场景）
    ├── charge-event.jpg           ← 【PDF 抽出】音乐节应急供电（event 场景）
    ├── charge-residential.jpg     ← 【ChatGPT 生成，传 robot-hero 当参考图】住宅夜景机械臂插枪（residential 场景）
    ├── charge-campus.jpg          ← 【ChatGPT 生成】园区充电小车巡航（campus 场景）
    ├── drone-cruise.jpg           ← 【PDF 抽出】无人机跨湖巡航（vtol 详情 hero + pipeline 场景）
    ├── drone-security.jpg         ← 【ChatGPT 生成】城市夜景广场垂停（security 场景，替换了像 AI 的旧 drone-alley）
    ├── drone-rescue.jpg           ← 【ChatGPT 生成】洪水灾区上空（rescue 场景）
    ├── drone-farmland.jpg         ← 【ChatGPT 生成】农田遥感巡航（remote-sensing 场景）
    └── _design-reference.jpg      ← ⚠️ 设计参考，不要上线

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
<section className="py-20 md:py-28 px-4 sm:px-6 lg:px-10">          {/* 外层白底，给卡片外 margin */}
  <div className="relative rounded-[2rem] bg-[#0a0d14] text-white
                  py-24 md:py-32 overflow-hidden
                  shadow-[0_30px_80px_-40px_rgba(10,13,30,0.5)]">    {/* 浮起卡片 */}
    {/* radial gradient overlay + content */}
  </div>
</section>
```

下次任何"明暗节奏切换"都用这个套路，**不要再加 fade overlay**。

### 全站统一竖向节奏：`py-20 md:py-28`

2026-06-01 把杂乱的 section padding（曾经 12/16/20/24/28/32 六种混用）收敛成**一个标准值 `py-20 md:py-28`**，整体呼吸一致、显高级。新 section 一律用它。例外：page hero / HomeHero 保留 `pt-32 md:pt-40` 顶部间距（给固定导航栏让位）；HomeFeatures 用 `pt-4 pb-20 md:pt-6 md:pb-28`（贴住 Hero）。

### eyebrow 小标统一样式

所有区块小标（Product Matrix / Applications / Technology / About …）统一为「**brand 圆点 + 大写字距标签**」，**不要药丸底色**：
```tsx
<p className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-brand mb-3">
  <span aria-hidden className="w-1.5 h-1.5 rounded-full bg-brand" />Label
</p>
```
PageHero 的 eyebrow 也是这个（曾用 `bg-brand-soft` 药丸，已去掉）。

### 悬停 ↗ 箭头（Footer / Contact / specs 脚注链接）

文字链接悬停时从左下滑入一个 ↗ 小箭头（`viewBox 0 0 12 12` path `M3 9 9 3M9 3H4.5M9 3v4.5`，初始 `-translate-x-1 -translate-y-0.5 opacity-0`，`group-hover` 归位显现）。新文字链接沿用这个。

### 全站 max-w 用 `max-w-[88rem]`（1408px）

不要用 `max-w-7xl`（1280px）。已经全局 sed 批量替换。新组件容器模板：`mx-auto max-w-[88rem] px-6 lg:px-10`。

### 全站 ambient 背景在 `globals.css` body（fixed background）

底色是 **off-white 蓝白**（`--background: #fafbfe`，不是纯白 —— 纯白曾被反馈「页面太空/死白」，2026-06-01 改 off-white 让白卡片边界更清晰）。背景分两处：

**A. `globals.css` body —— 全页基底「科技图标矩阵」**（一张 360px 大 tile 的内联 SVG，散布 ~17 个小科技符号：六边形/靶环/芯片/电路走线/菱形/波形/十字准星…，brand 蓝 ~15%）。大 tile = 重复周期大，看起来是「随机科技图案场」而非网格。`background-attachment: fixed` 不随滚动。
> 历史演进（**不要往回退**）：48px 蓝图十字 tile → 6% 点阵（用户嫌「几乎看不见、太弱」）→ 10% 点阵（用户嫌「还是像纯白」）→ **当前：用户要求「把一个个点换成一个个小图案」「图案要随机分布、要科技元素」**。再调强弱改 SVG 里的 alpha；别改回纯点阵。

**B. `components/TechBackdrop.tsx` —— 全局 fixed 背景层**（挂在 `[lang]/layout.tsx` body 第一个子元素，`pointer-events-none fixed inset-0 -z-10`）。负责方向性 / 科技图案 / 辉光，专打宽屏左右留白：
1. **角落辉光**：右上 + 左下 brand 蓝 radial（~10%）+ 顶部中央 Hero 抬光（6%）
2. **左右 blueprint 带**：`36% max-w-560px` 宽，叠加「44px 网格线 + 200px PCB 电路 tile（走线 + 节点圆点）」，用 `mask-image` 横向渐隐——**最强在屏幕最边缘（空白处），向中间淡出到全透明**，所以正文/卡片区干净。左右镜像。

`-z-10` 让 TechBackdrop 在 body 基底之上、正文之下；Dark sections (`bg-[#0a0d14]` 等不透明 bg) 自动盖住 A+B。**新增 dark section 不需要处理背景；新增浅色 section 不要加自己的 bg-white，让背景层透出即可。** 调强弱：改 TechBackdrop 里 circuit/gridLines 的 rgba alpha + body 点阵 alpha；改左右带覆盖范围改 `w-[36%]`/`max-w-[560px]` 和 mask 的渐隐百分比。

### ⚠️ 路由 / 404 架构（动态根布局的坑）

**没有 `app/layout.tsx`** —— 根布局在动态段 `app/[lang]/layout.tsx` 里（为了 `<html lang>` 随 locale 变 + i18n metadata）。这是 Next 文档明确点名的「难以组合 404」情形（`not-found.md` 第 53-56 行）。带来两条**必须遵守**的规则：

1. **未匹配 URL 的 404 走根 `app/not-found.tsx`** —— 它自带完整 `<html><body>`（没有根 layout 可借），client 组件用 `usePathname` 取 locale 出三语品牌页。`app/[lang]/not-found.tsx` **不起作用**（动态根布局下不组合），别指望它。
2. **`[lang]` 内部页面里的 `notFound()` 会渲染空白页**（根 not-found 的 `<html>` 跟 `[lang]/layout` 的 `<html>` 冲突）。所以**产品详情非法 key 用 `redirect('/products')` 而不是 `notFound()`**。`hasLocale()` 那些 `notFound()` 分支实际永不触发（proxy 保证 lang 总是 zh/tw/en），是防御性的。**新增会对用户暴露的 notFound() 前先想清楚：未匹配 URL 用根 not-found，已匹配页的非法参数用 redirect。**

proxy 行为：非 `zh/tw/en` 前缀的路径 → 加 `/zh` 前缀重定向 → 变成 `/zh/<unknown>` 未匹配 → 根 not-found。所以打错域名后任何路径都能落到品牌 404。

### a11y / SEO（2026-06-01 硬化，别回退）

- **焦点环**：`globals.css` 有 `:where(a,button,input,select,textarea,[tabindex]):focus-visible { outline: 2px solid var(--brand); outline-offset:2px }`。别删。
- **动效降级**：`globals.css` 的 `@media (prefers-reduced-motion: reduce)` 把动画/过渡压到瞬时；framer-motion 由 `MotionProvider`（`reducedMotion="user"`）统一降级。新动画不用额外处理，已被这两层覆盖。
- **JSON-LD**：`[lang]/layout.tsx` 注 Organization（公司真实信息，**无假地址**）；产品详情页注 Product。改公司信息时同步。
- **图片**：所有 `<Image>` 带 `sizes`（响应式省流量）。新图照做。

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
- ✅ **视觉细化轮**（2026-06-01）：HomeCapabilities 图标 / TechCapabilities 浮起卡片 / 场景 6→8 贴 PDF / Footer i18n / max-w-7xl→max-w-[88rem]
- ✅ **2026-06-01 大轮**（详见上面各「关键设计决策」）：创办方脱敏 / 背景→科技图标矩阵 + TechBackdrop / `/technology`→`/solutions`(+redirect) / 产品详情真实规格表 + Charge&VTOL 商业价值 / 关于页市场规模表 / 从 PDF 抽 4 张实景图填解决方案场景卡 + 升级产品详情 hero / 统一节奏 py-20 md:py-28 / eyebrow 圆点 / Hero VTOL 双赛道迷你卡 / 联系页图标卡 / a11y(focus-visible + reduced-motion + 汉堡 aria) / JSON-LD / 三语品牌化 404 / 「查看技术规格」锚点滚动
- ✅ **域名 + 备案 + 上线**：www.01weichuang.com 已备案（粤ICP备2026041942号-2）+ HTTPS，部署在腾讯云广州（43.139.159.234）。`site.ts` 默认域名已改成真实域名
- ⏳ **公安联网备案**：服务开通起 30 天内必做（~2026-07-18），数据码 `b2a747a66b31b0ea4206454ec634e1`。办完拿到公安备案号加到 footer（链全国互联网安全管理服务平台）
- ⏸ 部署细节（服务器进程守护方式/nginx 配置）：本仓库无记录，需在服务器上现查（`git pull` → `npm ci` → `npm run build` → 重启服务）
- ⏸ Cloudflare CDN：可选
- 💡 部署环境也建议显式设 `NEXT_PUBLIC_SITE_URL=https://www.01weichuang.com`（与默认值双保险）
- ⏸ 真客户/数字/资质 → 出现后再做信任凭证区，**不要造假**（见「公司当前阶段（事实）」表格）
- ✅ 视觉素材：8 个场景全部有图。4 张 PDF 抽图（充电特斯拉/音乐节/巡航）+ 4 张 ChatGPT 生成（drone-security 城市夜景 / drone-rescue 洪水 / drone-farmland 农田 / charge-residential 住宅 / charge-campus 园区 —— 共 5 张，含替换旧 drone-alley）。生成手法：纪实摄影措辞压 AI 味，充电小车造型靠传 robot-hero.jpg 当参考图锁形态（2026-06-04）
- ✅ **2026-06-19 视觉/性能/PWA 轮**（详见《沉浸式深色改版》末条）：CardFx 卡片光斑+流光边框 / CountUp 数字滚动计数 / film-grain 噪点 / PWA manifest / 导航按钮白底 / HomeTech 标题中文化 / 删脚手架 svg + 启用 turbopack / Hero3D 性能微调（dpr 1.8、粒子 ~960）
- 💡 **访问统计 / 联系表单**：评估过，用户暂不做（腾讯云 CVM 后台只有服务器/带宽监控，看不到 PV/UV/来源；要真统计得埋 JS 或服务器侧 GoAccess）。需要时再上。
- 💡 图片转 WebP：评估过线上已由 next/image 自动优化，手动转只瘦仓库、要改路径有破图风险，**暂不做**。
- ⏸ 手册里未上网的 B 端内容（合作模式 / 客户画像 / 竞争优势 / 组件清单）—— 用户偏极简没硬塞，需要时再加

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
| **`[lang]` 内已匹配页别用 `notFound()`** | 动态根布局下会出空白页。非法参数用 `redirect()`；未匹配 URL 才靠根 `app/not-found.tsx`（见「路由 / 404 架构」） |
| **别找 `/technology` 路由** | 已改名 `/solutions`（dict/nav 内部 key 仍叫 technology）。旧 URL 有 308 redirect 兜底 |
| **别删 a11y 硬化** | `focus-visible` 焦点环 / `prefers-reduced-motion` / `MotionProvider` / 汉堡 `aria-expanded` 都要留 |
| **背景别退回纯点阵** | 用户明确要「一个个小图案、随机分布、科技元素」。当前 globals.css body 是 360px 科技图标矩阵，调强弱改 alpha 即可 |
| **新增 section 节奏用 `py-20 md:py-28`** | 全站已统一，别再引入 py-12/16/24/32 |
| **film-grain / 全屏 fixed 层别用 `mix-blend-mode`** | fixed + blend = 每帧全屏重绘，滚动卡顿。用 `transform: translateZ(0)` 提成静态合成层（踩过） |
| **别为性能停 Hero3D 涡轮或降画质** | 用户要效果优先，已否过「滚动时暂停渲染」「降画质/大幅减粒子」。只保留离屏（`threshold:0`）暂停 |
| **HomeTech 卡片标题 zh/tw 别改回英文** | 用户专门指出中文版不该出现英文标题。en 才保留英文 |
| **CountUp 的正则匹配别去掉 `useMemo`** | 否则每帧 setState 重渲染→新数组引用→effect 重启→数字一直跳（踩过） |
| **新增根级 metadata 路由记得加进 `proxy.ts` matcher** | manifest.webmanifest 已加；新增 manifest/ads.txt 等都要排除，否则被重定向到 /zh/... fetch 失败 |

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
| `NEXT_PUBLIC_SITE_URL` | `https://www.01weichuang.com`（已是真实域名） | `src/app/site.ts` 集中读，sitemap/robots/canonical/OG 全部依赖它。部署环境可显式再设一遍做双保险 |

### Dev server 启动遇到 `MODULE_NOT_FOUND .next/.../middleware-manifest.json`

不是缓存问题，是**端口冲突** —— 别的 Next 进程占着 3000，你的进程被切到 3001 但两个进程争抢同一个 `.next` 目录。先 `lsof -ti:3000` 看，确认是孤儿进程再 `kill`。不要无脑 `rm -rf .next`。
