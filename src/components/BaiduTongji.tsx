"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { BAIDU_TONGJI_ID } from "./baiduTongjiId";

// 百度统计 — client-side navigation reporter. The loader itself is Baidu's
// standard snippet, inlined in the root layout's <head>: inline so Baidu's
// "代码安装检查" finds it in the raw HTML, and so short visits are counted even
// when the visitor leaves before hydration. hm.js records the landing page by
// itself; Baidu doesn't watch history, so later pages are reported here.
declare global {
  interface Window {
    _hmt?: unknown[][];
  }
}

export function BaiduTongji() {
  const pathname = usePathname();
  const isLanding = useRef(true);

  useEffect(() => {
    if (!BAIDU_TONGJI_ID) return;
    if (isLanding.current) {
      isLanding.current = false;
      return;
    }
    (window._hmt ||= []).push(["_trackPageview", pathname]);
  }, [pathname]);

  return null;
}
