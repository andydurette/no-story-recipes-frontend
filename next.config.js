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
    NEXT_PUBLIC_BACKEND_URL_PATH: process.env.NEXT_PUBLIC_BACKEND_URL_PATH,
  },
};

module.exports = nextConfig;
