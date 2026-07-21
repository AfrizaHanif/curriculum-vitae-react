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
import { fetchLaravel } from "@/lib/laravel";
import siteConfig from "../../public/site-config.json";

// Title and Description of Page (Metadata)
export const metadata: Metadata = {
  title: {
    template: "%s | Muhammad Afriza Hanif",
    default: "Muhammad Afriza Hanif",
  },
  description: "Sebuah Website Portofolio dari Muhammad Afriza Hanif",
  verification: {
    google: "_Umgl1fpf7l1VvK0tpqr-fYJXpK6WCakn7ohdLTaTtk",
  },
  openGraph: {
    title: "Muhammad Afriza Hanif",
    description: "Sebuah Website Portofolio dari Muhammad Afriza Hanif",
    url: "https://afrizahanif.com",
    siteName: "Muhammad Afriza Hanif Portfolio",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Afriza Hanif",
    description: "Sebuah Website Portofolio dari Muhammad Afriza Hanif",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Visitor Count Trigger
  // We check if it's production OR if we are explicitly targeting a local API for testing
  const isProduction = process.env.NODE_ENV === "production";

  // Replace 'NEXT_PUBLIC_API_URL' with your actual env variable name used for Laravel
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";
  const isLocalApi =
    apiUrl.includes("localhost") ||
    apiUrl.includes("127.0.0.1") ||
    apiUrl.includes("192.168.");

  if (isProduction || (isLocalApi && process.env.NODE_ENV === "development")) {
    // We trigger the API without awaiting to avoid blocking the initial page render.
    // Adjust the endpoint path to match your Laravel route.
    fetchLaravel("api/visitors", {
      method: "POST",
      skipAuth: true,
    }).catch((err) => console.error("Visitor count failed:", err));
  }

  return (
    <html
      lang="id"
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

                // Disable React DevTools safely without corrupting data structures like rendererInterfaces
                if (typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ === 'object') {
                  for (const prop in window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
                    if (typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__[prop] === 'function') {
                      window.__REACT_DEVTOOLS_GLOBAL_HOOK__[prop] = function() {};
                    }
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
