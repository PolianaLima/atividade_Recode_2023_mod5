/** @type {import('next').NextConfig} */
/*const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig*/

module.exports = {
  async headers() {
    return [
      {
        // matching all API routes
        source: '/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*', // ou seu domínio específico
          },
        ],
      },
    ];
  },
  async redirects() {
    return [];
  }
};
