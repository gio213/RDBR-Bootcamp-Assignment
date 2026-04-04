import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL("https://api.redclass.redberryinternship.ge/**")],
  },
};

export default nextConfig;
