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
          {
            source: '/api/products/:id',
            destination: 'http://magic-cloud-back:8080/products/:id',
          },
          {
            source: '/api/register',
            destination: 'http://magic-cloud-auths:8081/api/register',
          },
          {
            source: '/api/login',
            destination: 'http://magic-cloud-auths:8081/api/login',
          },
      ];
  },
};


export default nextConfig;
