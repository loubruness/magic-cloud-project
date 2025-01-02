// next.config.ts

import { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack(config) {
    // Optionally add custom Webpack configurations if necessary
    return config
  },
  async rewrites() {
    return [
      {
        source: '/pages/api/:path*',
        destination: 'http://magic-cloud-back.info/:path*', // Your API endpoint
      },
    ]
  },
}

export default nextConfig
