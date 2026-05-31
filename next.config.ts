import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Product "station" was merged into "robot" (mobile-charging robot).
      // Keep existing inbound links (search engines, bookmarks) working.
      {
        source: "/:lang(zh|tw|en)/products/station",
        destination: "/:lang/products/robot",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
