import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { DefaultSeo, LogoJsonLd } from 'next-seo'
import { ThemeProvider } from 'styled-components'

import { site } from 'config/site'
import { getUrl } from 'utils/getUrl'
import { theme } from 'styles/theme'
import { GlobalStyle } from 'styles/global'
import { pageView } from '../lib/gtag'
import { Analytics } from 'components/Analytics'

const isDev = process.env.NODE_ENV === 'development'

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()

  useEffect(() => {
    console.log('kldsjfklsdjfsdkljfksjkljslfkdj')
    const handleRouteChange = (url: URL) => {
      if (!isDev) pageView(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <ThemeProvider theme={theme}>
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
      <Analytics />
    </ThemeProvider>
  )
}

export default App
