/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3004'],
    },
  },
  images: {
    domains: ['github.com', 'avatars.githubusercontent.com'],
  },
}

module.exports = nextConfig