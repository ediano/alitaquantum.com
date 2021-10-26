import type { AppProps } from 'next/app'
import Head from 'next/head'
import { DefaultSeo, LogoJsonLd } from 'next-seo'
import { ThemeProvider } from 'styled-components'
import { ExchangeProvider } from 'context/exchange'

import { site } from 'config/site'
import { getUrl } from 'utils/getUrl'
import { theme } from 'styles/theme'
import { GlobalStyle } from 'styles/global'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <ExchangeProvider>
        <Head>
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
      </ExchangeProvider>
    </ThemeProvider>
  )
}
export default App
