/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**",
      },
    ],
  },
  env: {
    BACKEND_URL_PATH: process.env.NEXT_PUBLIC_SITE_URL,
  },
};

module.exports = nextConfig;
