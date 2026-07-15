const isGitHubPages = process.env.GITHUB_PAGES === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  distDir: ".next-pages",
  basePath: isGitHubPages ? basePath : undefined,
  assetPrefix: isGitHubPages ? basePath : undefined,
  trailingSlash: isGitHubPages,
  images: { unoptimized: true },
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
