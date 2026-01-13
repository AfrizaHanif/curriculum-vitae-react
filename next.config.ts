import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Export a fully static site
  output: "export",
  // Disable Next.js image optimizer so images work with the static export
  images: {
    unoptimized: true,
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "assets.example.com",
    //     port: "",
    //     pathname: "/account123/**",
    //   },
    //   {
    //     protocol: "https",
    //     hostname: "cdn.another-domain.net",
    //   },
    // ],
  },
};

export default nextConfig;
