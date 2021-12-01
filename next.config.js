const FMLMode = require('frontmatter-markdown-loader/mode')

/** @type {import('next').NextConfig} */
module.exports = {
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
  async redirects() {
    return [
      { source: '/trocar*', destination: '/transferir*', permanent: true }
    ]
  }
}
