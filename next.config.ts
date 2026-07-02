import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/proxy-api/books/:path*",
        destination: "http://74.226.194.15/api/books/:path*",
      },
      {
        source: "/proxy-api/categories/:path*",
        destination: "http://74.226.194.15/api/categories/:path*",
      },
    ];
  },
};

export default nextConfig;
