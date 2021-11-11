import type { AppProps } from 'next/app'
import Head from 'next/head'
import { DefaultSeo, LogoJsonLd } from 'next-seo'

import { site } from 'config/site'
import { getUrl } from 'utils/getUrl'
import { GlobalStyle } from 'styles/global'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#08b9c1" />
        <link rel="shortcut icon" href={site.favicon} type="image/x-icon" />
        <link rel="apple-touch-icon" href={site.favicon} />
      </Head>

      <DefaultSeo
        description={site.description}
        titleTemplate={`%s | ${site.name}`}
        openGraph={{
          type: 'website',
          url: site.url,
          title: `${site.name} | ${site.title}`,
          description: site.description,
          site_name: site.name,
          images: [
            {
              url: getUrl(site.favicon),
              alt: site.name
            }
          ]
        }}
      />
      <LogoJsonLd logo={getUrl(`${site.logo}`)} url={site.url} />

      <GlobalStyle />
      <Component {...pageProps} />
    </>
  )
}

export default App
