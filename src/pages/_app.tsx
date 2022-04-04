import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ThemeProvider } from 'styled-components'

import { site } from 'config/site'
import { theme } from 'styles/theme'
import { GlobalStyle } from 'styles/global'
import { pageView } from '../lib/gtag'
import { Analytics } from 'components/Analytics'

const isDev = process.env.NODE_ENV === 'development'

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()

  useEffect(() => {
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
        <meta name="theme-color" content="#08b9c1" />
        <link rel="shortcut icon" href={site.favicon} type="image/x-icon" />
        <link rel="apple-touch-icon" href={site.favicon} />
      </Head>

      <GlobalStyle />
      <Component {...pageProps} />
      <Analytics />
    </ThemeProvider>
  )
}

export default App
