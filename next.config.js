// next.config.js

/** @type {import('next').NextConfig} */

const securityHeaders = [
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  }
]

const nextConfig = {
  reactStrictMode: true,
  // --- START OF THE CHANGE ---
  trailingSlash: false,
  // --- END OF THE CHANGE ---
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
};

module.exports = nextConfig;
