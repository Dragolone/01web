"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

// 百度统计 — domestic traffic analytics (GA4's domains are unreachable from mainland
// China, so GA misses almost every domestic visitor). Loads only in production
// builds with NEXT_PUBLIC_BAIDU_TONGJI_ID set (inlined at build time, so the server
// needs it before `npm run build`). hm.js records the landing page by itself;
// client-side navigations are reported below because Baidu doesn't watch history.
const tongjiId = process.env.NEXT_PUBLIC_BAIDU_TONGJI_ID;
const enabled = process.env.NODE_ENV === "production" && !!tongjiId;

declare global {
  interface Window {
    _hmt?: unknown[][];
  }
}

export function BaiduTongji() {
  const pathname = usePathname();
  const isLanding = useRef(true);

  useEffect(() => {
    if (!enabled) return;
    if (isLanding.current) {
      isLanding.current = false;
      return;
    }
    (window._hmt ||= []).push(["_trackPageview", pathname]);
  }, [pathname]);

  if (!enabled) return null;
  return (
    <>
      <Script id="baidu-tongji-init" strategy="afterInteractive">
        {`window._hmt = window._hmt || [];`}
      </Script>
      <Script src={`https://hm.baidu.com/hm.js?${tongjiId}`} strategy="afterInteractive" />
    </>
  );
}
