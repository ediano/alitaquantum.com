const FMLMode = require('frontmatter-markdown-loader/mode')

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      loader: 'frontmatter-markdown-loader',
      options: { mode: [FMLMode.BODY] }
    })
    return config
  }
}
