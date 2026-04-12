import { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/wood-fences",
        destination: "/fence-staining",
        permanent: true,
      },
      {
        source: "/fence-and-garage-door-stain",
        destination: "/fence-staining",
        permanent: true,
      },
      {
        source: "/home-restoration-remodeling",
        destination: "/interior-exterior-restoration-renovation",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
