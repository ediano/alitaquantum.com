import Script from 'next/script'

import { site } from 'config/site'

type Props = {
  pageTitle: string
  pageDescription: string
  pageUrl: string
}

export const OrganizationSEO = ({
  pageTitle,
  pageDescription,
  pageUrl
}: Props) => {
  return (
    <Script
      id="organization-seo"
      strategy="beforeInteractive"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: `
        {
          "@context": "https://schema.org",
          "@graph": [{
            "@type": "Organization",
            "@id": "${site.url}#organization",
            "name": "{{ site.title }}",
            "url": "${site.url}",
            "sameAs": []
          }, {
            "@type": "WebSite",
            "@id": "${site.url}#website",
            "url": "${site.url}",
            "name": "{{ site.title }}",
            "publisher": {
              "@id": "${site.url}#organization"
            }
          }, {
            "@type": "WebPage",
            "@id": "${pageUrl}#webpage",
            "url": "${pageUrl}",
            "inLanguage": "pt-BR",
            "name": ${pageTitle},
            "isPartOf": {
              "@id": "${site.url}#website"
            },
            "about": {
              "@id": "${site.url}#organization"
            },
              "description": ${pageDescription}
          }]
        }`
      }}
    />
  )
}
