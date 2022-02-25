/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_BACKEND_URL: "http://localhost:8669/",
  },
};

module.exports = nextConfig;
