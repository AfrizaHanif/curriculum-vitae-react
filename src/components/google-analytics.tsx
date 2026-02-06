"use client";

import Script from "next/script";

export default function GoogleAnalytics({ gaId }: { gaId: string }) {
  // Prevent tracking in development mode or if ID is missing
  if (process.env.NODE_ENV === "development" || !gaId) {
    console.log("Google Analytics is disabled (Dev mode or no ID)");
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
        onError={() => {
          console.warn(
            "Google Analytics script blocked by client (AdBlocker).",
          );
        }}
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  );
}
