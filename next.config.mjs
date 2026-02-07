/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: 'build',
  output: 'standalone',
  env: {
    CUSTOM_API_URL: process.env.CUSTOM_API_URL,
  },
};

module.exports = nextConfig;