import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  //Bỏ qua lỗi eslint trong build
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
