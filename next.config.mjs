/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://2lw7ahgm4f.execute-api.us-east-1.amazonaws.com/v1/:path*',
      },
    ];
  }
};

export default nextConfig;
