/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'testing-api.ru-rating.ru',
      },
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
