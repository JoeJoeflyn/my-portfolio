/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: false,
  experimental: {
    serverSourceMaps: false,
  },
  images: {
    domains: ["drew.Tech", "prod-files-secure.s3.us-west-2.amazonaws.com"],
  },
};

module.exports = nextConfig;
