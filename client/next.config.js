/** @type {import('next').NextConfig} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const withTM = require('next-transpile-modules')(['@destiny/common']);

const nextConfig = withTM({
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:slug*',
        destination: 'http://localhost:4000/api/:slug*',
      },
    ];
  },
  images: {
    domains: ['via.placeholder.com', 'dummyimage.com', 'images.unsplash.com'],
  },
});

module.exports = nextConfig;
