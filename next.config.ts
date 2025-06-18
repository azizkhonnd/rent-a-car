/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['testing-api.ru-rating.ru'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

module.exports = nextConfig;