/** @type {import('next').NextConfig} */

const DEPLOYMENT_MODE = process.env.DEPLOYMENT_ENV;

const nextConfig = {
  //** 스트릭모드
  reactStrictMode: false,
  //** 빌드시 결과물 standalone
  output: "export", // here
  //** 빌드시 lint 체크 안함
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  compiler: {
    removeConsole: DEPLOYMENT_MODE === "production",
  },
};

module.exports = nextConfig;
