import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/proxy-api/books/:path*",
        destination: "http://74.226.194.15/api/books/:path*",
      },
    ];
  },
};

export default nextConfig;
