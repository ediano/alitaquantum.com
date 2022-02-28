type Props = {
  pageTitle: string
  pageDescription: string
  pageUrl: string
}

export const WebPageSEO = ({ pageTitle, pageDescription, pageUrl }: Props) => {
  return (
    <script
      id="organization-seo"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          '@id': pageUrl + '#webpage',
          url: pageUrl,
          inLanguage: 'pt-BR',
          name: pageTitle,
          description: pageDescription
        })
      }}
    />
  )
}
