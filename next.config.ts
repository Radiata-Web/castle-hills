import { NextConfig } from "next";

const customWood = "/custom-wood-structures-outdoor-design";
const luxuryFinishes = "/luxury-finishes-coatings";
const fenceServices = "/fence-services";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/wood-fences",
        destination: fenceServices,
        permanent: true,
      },
      {
        source: "/fence-and-garage-door-stain",
        destination: fenceServices,
        permanent: true,
      },
      {
        source: "/fence-staining",
        destination: fenceServices,
        permanent: true,
      },
      {
        source: "/metal-fences",
        destination: fenceServices,
        permanent: true,
      },
      {
        source: "/automatic-gates",
        destination: fenceServices,
        permanent: true,
      },
      {
        source: "/pergolas-and-patio-covers",
        destination: customWood,
        permanent: true,
      },
      {
        source: "/patio-covers",
        destination: customWood,
        permanent: true,
      },
      {
        source: "/home-restoration-remodeling",
        destination: "/interior-exterior-restoration-renovation",
        permanent: true,
      },
      {
        source: "/interior-painting",
        destination: luxuryFinishes,
        permanent: true,
      },
      {
        source: "/exterior-painting",
        destination: luxuryFinishes,
        permanent: true,
      },
      {
        source: "/interior-exterior-painting",
        destination: luxuryFinishes,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
