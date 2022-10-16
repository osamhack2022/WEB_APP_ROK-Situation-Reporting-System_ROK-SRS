/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['camo.githubusercontent.com'],
  },
  swcMinify: true,
}

module.exports = nextConfig
