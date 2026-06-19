import type { MetadataRoute } from "next";

// PWA Web App Manifest —— 让官网可「添加到主屏幕」、启动屏/已安装应用图标规范化。
// 注意：本文件在 app/ 根级，动态根布局（[lang]/layout.tsx）不会自动注入 <link rel="manifest">，
// 已在 layout.tsx 的 generateMetadata 里显式声明 manifest。
// theme_color / background_color 仅用于 PWA 启动屏与已安装应用，不影响普通浏览器访问的页面渲染。
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "零一唯创 Zero-One Innovation",
    short_name: "零一唯创",
    description:
      "深圳零一唯创科技有限公司 —— 新能源智慧出行（移动 EV 充电机器人）与低空经济装备（垂起固定翼无人机）双赛道科技企业。",
    start_url: "/zh",
    scope: "/",
    display: "standalone",
    lang: "zh-CN",
    dir: "ltr",
    background_color: "#070a18",
    theme_color: "#070a18",
    categories: ["business", "technology", "utilities"],
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
