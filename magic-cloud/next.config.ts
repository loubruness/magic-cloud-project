import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "export",
  /* config options here */
};

module.exports = {
  async rewrites() {
      return [
          {
              source: '/api/products',
              destination: 'http://magic-cloud-back:8080/products',
          },
      ];
  },
};


export default nextConfig;
