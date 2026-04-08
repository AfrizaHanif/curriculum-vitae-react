import type { NextConfig } from "next";
import os from "os";

const isDev = process.env.NODE_ENV === "development";

// Automatically detect local IPv4 address for remotePatterns in development
const localIps = Object.values(os.networkInterfaces())
  .flat()
  .filter(
    (iface) => iface?.family === "IPv4" && !iface.internal && iface.address,
  )
  .map((iface) => iface!.address);

const nextConfig: NextConfig = {
  // Export a fully static site
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
    dangerouslyAllowLocalIP: isDev,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/storage/**",
      },
      ...(isDev
        ? localIps.map((ip) => ({
            protocol: "http" as const,
            hostname: ip,
            port: "8000",
            pathname: "/storage/**",
          }))
        : []),
      // Production API Domain
      {
        protocol: "https",
        hostname: "api.afrizahanif.com", // REPLACE with your actual production API domain
        port: "",
        pathname: "/storage/**",
      },
    ],
  },
};

export default nextConfig;
