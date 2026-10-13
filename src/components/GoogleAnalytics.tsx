"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

// Google Analytics 4 — basic traffic analytics only.
// Loads only in production builds with NEXT_PUBLIC_GA_ID set (inlined at build
// time, so the server needs it before `npm run build`). Client-side navigations
// are recorded by GA4 Enhanced Measurement (history change events); no manual
// page_view is sent, which avoids duplicate counts. Google Signals and ad
// personalization are explicitly disabled.
//
// Injected 3s after hydration (and then with `lazyOnload`): gtag.js is ~170KB and
// its evaluation (25–90ms) used to land exactly while the intro curtain lifted.
const DELAY_MS = 3000;

export function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const [go, setGo] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setGo(true), DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  if (process.env.NODE_ENV !== "production" || !gaId || !go) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="lazyOnload" />
      <Script id="ga4-init" strategy="lazyOnload">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}', { allow_google_signals: false, allow_ad_personalization_signals: false });`}
      </Script>
    </>
  );
}
