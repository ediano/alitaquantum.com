import Head from 'next/head'

import { site } from 'config/site'
import { getUrl } from 'utils/getUrl'

import { OrganizationSEO } from 'components/OrganizationSEO'

type Props = {
  title?: string
  pathUrl?: string
  description?: string
  image?: string
  noIndex?: boolean
  noFollow?: boolean
}

export const MetaSEO = ({
  title,
  pathUrl,
  description,
  image,
  noIndex,
  noFollow
}: Props) => {
  const t = title ? `${title} | ${site.name}` : `${site.name} | ${site.title}`
  const u = pathUrl ? getUrl(pathUrl) : getUrl('/')
  const d = description || site.description
  const i = image ? getUrl(image) : site.url + site.logo

  const index = !noIndex ? 'index' : 'noindex'
  const follow = !noFollow ? ',follow' : ',nofollow'

  const logoJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    url: site.url,
    logo: site.url + site.logo
  }

  return (
    <Head>
      <title>{t}</title>

      <link rel="canonical" href={u} />
      <meta name="robots" content={index + follow} />
      <meta name="googlebot" content={index + follow} />

      <meta name="title" content={t} />
      <meta name="description" content={d} />
      <meta name="keywords" content={site.keywords} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={u} />
      <meta property="og:title" content={t} />
      <meta property="og:description" content={d} />
      <meta property="og:image" content={i} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={u} />
      <meta property="twitter:title" content={t} />
      <meta property="twitter:description" content={d} />
      <meta property="twitter:image" content={i}></meta>

      <script
        id="logo-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(logoJsonLd) }}
      />

      <OrganizationSEO pageUrl={u} pageTitle={t} pageDescription={d} />
    </Head>
  )
}
