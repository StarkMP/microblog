/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    optimizePackageImports: ["@mantine/core", "@mantine/hooks", "@mantine/form"],
  },
  sassOptions: {
    prependData: '@import "./src/app/_mantine.scss";',
  },
};

export default nextConfig;
