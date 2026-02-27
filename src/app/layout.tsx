import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./globals.css";
import "./bootstrap.css";
import IconDefinitions from "@/components/icons/icon-definitions";
import BootstrapClient from "@/components/bootstrap-client";
import { BreadcrumbProvider } from "@/context/breadcrumb-context";
import "bootstrap-icons/font/bootstrap-icons.css";
import NextTopLoader from "nextjs-toploader";
import GoogleAnalytics from "@/components/google-analytics";
import InitialLoader from "@/components/initial-loader";
import siteConfig from "../../public/site-config.json";

// Title and Description of Page (Metadata)
export const metadata: Metadata = {
  title: {
    template: "%s | Muhammad Afriza Hanif",
    default: "Muhammad Afriza Hanif",
  },
  description: "Sebuah Website Portofolio dari Muhammad Afriza Hanif",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-bs-theme="auto"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var match = document.cookie.match(new RegExp('(^| )theme=([^;]+)'));
                var theme = match ? match[2] : 'auto';
                if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                  document.documentElement.setAttribute('data-bs-theme', 'dark');
                } else if (theme === 'auto') {
                  document.documentElement.setAttribute('data-bs-theme', 'light');
                } else {
                  document.documentElement.setAttribute('data-bs-theme', theme);
                }
              } catch (e) {}

              // Disable console logs and React DevTools in production
              if ("${process.env.NODE_ENV}" === "production") {
                // Disable console logs
                console.log = function() {};
                console.debug = function() {};
                console.info = function() {};

                // Disable React DevTools
                if (typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ === 'object') {
                  for (const method in window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
                    window.__REACT_DEVTOOLS_GLOBAL_HOOK__[method] = function() {};
                  }
                }
              }
            `,
          }}
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css"
          as="style"
        />
      </head>
      <body>
        <InitialLoader>
          <NextTopLoader
            color="#2299DD"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            showSpinner={false}
          />
          {/* List of SVGs' icons */}
          <IconDefinitions />
          {/* Main content via provider of breadcrumb */}
          <BreadcrumbProvider>
            <main>{children}</main>
            <GoogleAnalytics gaId={siteConfig.googleAnalyticsId} />
          </BreadcrumbProvider>
          {/* IMPORTANT: Use Bootstrap's Client file to avoid crash of JS between React and Bootstrap */}
          <BootstrapClient />
        </InitialLoader>
      </body>
    </html>
  );
}
