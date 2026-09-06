import Script from "next/script";

// Google Analytics 4 — basic traffic analytics only.
// Loads only in production builds with NEXT_PUBLIC_GA_ID set (inlined at build
// time, so the server needs it before `npm run build`). Client-side navigations
// are recorded by GA4 Enhanced Measurement (history change events); no manual
// page_view is sent, which avoids duplicate counts. Google Signals and ad
// personalization are explicitly disabled.
export function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  if (process.env.NODE_ENV !== "production" || !gaId) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}', { allow_google_signals: false, allow_ad_personalization_signals: false });`}
      </Script>
    </>
  );
}
