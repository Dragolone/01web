// 百度统计 site ID — the 32-char hex after `hm.js?` in the code tongji.baidu.com
// gives you. NEXT_PUBLIC_* is inlined at build time (set it on the server before
// `npm run build`); empty outside production builds so local runs never count.
export const BAIDU_TONGJI_ID =
  process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_BAIDU_TONGJI_ID || "" : "";
