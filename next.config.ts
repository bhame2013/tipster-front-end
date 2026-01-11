import type { NextConfig } from "next";

import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";
const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig: NextConfig = {
    env: {
        api: process.env.api,
    },
    cacheComponents: true,
};
export default withVanillaExtract(nextConfig);
