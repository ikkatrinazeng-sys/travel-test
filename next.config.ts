import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        // Vercel Blob 存储域名
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
    ],
  },
  turbopack: {
    // 修复路径含空格时 workspace root 检测错误的问题
    root: __dirname,
  },
  webpack(config) {
    // 修复路径含空格时 enhanced-resolve 向上穿越找到错误 package.json 的问题
    config.resolve.modules = [
      path.resolve(__dirname, "node_modules"),
      "node_modules",
    ];
    return config;
  },
};

export default nextConfig;
