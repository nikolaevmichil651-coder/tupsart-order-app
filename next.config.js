/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Enable experimental app directory if not already enabled by default.
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
