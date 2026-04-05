import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL("https://api.redclass.redberryinternship.ge/**"),
      new URL(
        "https://gravatar.com/avatar/5bf39e5af5c6b623282f240568b3eee3?s=400&d=robohash&r=x",
      ),
    ],
  },
};

export default nextConfig;
