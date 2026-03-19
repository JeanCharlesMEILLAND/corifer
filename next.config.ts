import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "corifer.vercel.app",
      },
      {
        protocol: "https",
        hostname: "corifer-*.vercel.app",
      },
    ],
  },
};

export default nextConfig;
