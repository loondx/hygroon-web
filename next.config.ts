import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  async redirects() {
    return [
      {
        source: '/diagnostic',
        destination: '/analyze',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.HYGROON_INTERNAL_API_URL || 'http://localhost:3001/api/:path*',
      },
    ];
  },
};

export default nextConfig;
