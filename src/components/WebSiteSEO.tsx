import { site } from 'config/site'

export const WebSiteSEO = () => {
  return (
    <>
      <script
        id="logo-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            url: site.url,
            logo: site.url + site.logo
          })
        }}
      />

      <script
        id="website-seo"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'http://schema.org/',
            '@type': 'Website',
            url: site.url,
            name: site.name,
            description: site.description,
            image: site.url + site.logo,
            author: {
              type: 'Person',
              name: site.name,
              sameAs: [
                'https://twitter.com/AlitaQuantum',
                'https://www.facebook.com/alitaquantum',
                'https://www.instagram.com/alitaquantum/'
              ]
            }
          })
        }}
      />
    </>
  )
}
