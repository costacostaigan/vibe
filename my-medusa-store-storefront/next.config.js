const { withStoreConfig } = require("./store-config")
const withNextIntl = require('next-intl/plugin')
const store = require("./store.config.json")

/**
 * @type {import('next').NextConfig}
 */
let nextConfig = {
  features: store.features,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*"
      },
      {
        protocol: "http",
        hostname: "localhost"
      }
    ]
  }
}

nextConfig = withNextIntl('./src/lib/i18n/request.ts')(nextConfig)

nextConfig = withStoreConfig(nextConfig)

module.exports = nextConfig
