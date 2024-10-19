/** @type {import('next').NextConfig} */
const nextConfig = {
  staticPageGenerationTimeout: 120,
  productionBrowserSourceMaps: false,
  experimental: {
    serverSourceMaps: false,
    modern: true,
    optimizeCss: true,
  },
  images: {
    domains: ["drew.Tech", "prod-files-secure.s3.us-west-2.amazonaws.com"],
  },
};

module.exports = nextConfig;
