import Script from 'next/script'

import { site } from 'config/site'

export const WebsiteSEO = () => {
  return (
    <Script
      id="website-seo"
      strategy="beforeInteractive"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: `
        {
          "@context": "http://schema.org/",
          "@type": "Website",
          "url": ${site.url},
          "name": ${site.name},
            "author": {
              "type": "Person",
              "name": ${site.name},
              "sameAs": [
                  "https://twitter.com/AlitaQuantum",
                  "https://www.facebook.com/alitaquantum",
                  "https://www.instagram.com/alitaquantum/"
              ]
            },
          "description": "{{ site.description }}"
        }`
      }}
    />
  )
}
