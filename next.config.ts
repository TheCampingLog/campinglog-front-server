import type { NextConfig } from "next";
import { imageUrl } from "./lib/config";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL(imageUrl + "/images/**"),
      new URL("https://gocamping.or.kr/upload/**"),
    ],
  },
};

export default nextConfig;
