import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/library/api/:path*",
        destination: "http://20.78.35.126/app2/library/api/:path*",
      },
    ];
  },
};

export default nextConfig;
