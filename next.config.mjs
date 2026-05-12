/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/tier2",
        destination: "/",
        permanent: true,
      },
      {
        source: "/resources/cbps-summary-guide",
        destination: "/",
        permanent: true,
      },
      {
        source: "/resources/tier2-incentives-guide",
        destination: "/",
        permanent: true,
      },
      {
        source: "/resources/emp-om-checklist",
        destination: "/",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
