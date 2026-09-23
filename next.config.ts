import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") ?? "";

const nextConfig: NextConfig = {
  output: isGitHubPages ? "export" : "standalone",
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  ...(isGitHubPages ? { trailingSlash: true } : {}),
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
