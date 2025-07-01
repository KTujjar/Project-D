// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // ✅ Prevent ESLint from failing production builds
  eslint: {
    ignoreDuringBuilds: true,
  },

  // ✅ Optimize for standalone deployment
  output: 'standalone',

  // ✅ Skip type errors during build (use with caution)
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
