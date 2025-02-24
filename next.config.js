/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.ctfassets.net"], // ✅ Allows Contentful images
  },
};

module.exports = nextConfig;
