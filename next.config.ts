import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: 'ui-avatars.com', pathname: '/api/**' },
      { protocol: 'https', hostname: 'randomuser.me', pathname: '/api/**' },
    ],
  },
};

export default nextConfig;
