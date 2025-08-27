/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['localhost'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.NODE_ENV === 'production' 
          ? 'https://your-app.vercel.app/api/:path*'
          : 'http://localhost:3001/:path*',
      },
    ];
  },
}

module.exports = nextConfig
