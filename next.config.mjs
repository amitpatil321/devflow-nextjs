/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
    ],
  },
  experimental: {
    mdxRs: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
};

export default nextConfig;
