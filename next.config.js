/** @type {import('next').NextConfig} */
const FMLMode = require('frontmatter-markdown-loader/mode')

const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

module.exports = withPWA({
  staticPageGenerationTimeout: 60 * 15,
  reactStrictMode: true,
  images: {
    domains: ['changenow.io']
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      loader: 'frontmatter-markdown-loader',
      options: { mode: [FMLMode.BODY] }
    })
    return config
  },
  pwa: {
    dest: 'public',
    runtimeCaching,
    disable: process.env.NODE_ENV === 'development'
  }
})
