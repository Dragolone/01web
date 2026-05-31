import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // History of product key renames — keep existing inbound links working:
      //   "station" was merged into "robot" (one product)
      //   "robot" was renamed to "charge" (clearer naming: EV-charging robot)
      // Both legacy keys now resolve to /products/charge.
      {
        source: "/:lang(zh|tw|en)/products/station",
        destination: "/:lang/products/charge",
        permanent: true,
      },
      {
        source: "/:lang(zh|tw|en)/products/robot",
        destination: "/:lang/products/charge",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
