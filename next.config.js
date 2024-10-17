/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
  images: {
    domains: ["drew.Tech", "prod-files-secure.s3.us-west-2.amazonaws.com"],
  },
};

module.exports = nextConfig;
