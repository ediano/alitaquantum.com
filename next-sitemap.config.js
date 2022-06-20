/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.alitaquantum.com',
  exclude: ['/trocar/txs', '/404', '/500', '/api'],
  generateRobotsTxt: true,
  sitemapSize: 5000
}
