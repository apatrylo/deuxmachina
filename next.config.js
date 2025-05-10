/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.ctfassets.net", // ✅ Contentful
      "books.google.com", // ✅ Google Books thumbnails
    ],
  },
};

module.exports = nextConfig;

module.exports = {
  images: {
    domains: ["books.google.com", "images.ctfassets.net"],
  },
};
