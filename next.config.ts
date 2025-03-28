/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  webpack: (config: any) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@vercel/turbopack-next": "@vercel/next",
    };
    return config;
  },
};

module.exports = nextConfig;
