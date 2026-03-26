import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "pub-84bbef99499e4b5f880e701bbaebc663.r2.dev",
      },
    ],
  },
};

export default nextConfig;
