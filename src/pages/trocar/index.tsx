import { NextSeo } from 'next-seo'

import { ExchangeProvider } from 'context/exchange'

import { site } from 'config/site'
import { getUrl } from 'utils/getUrl'

import { Header } from 'components/Header'
import { ExchangeLayout } from 'layouts/Exchange'
import { Footer } from 'components/Footer'

const ExchangePage = () => {
  return (
    <>
      <NextSeo
        title="Trocar"
        canonical={getUrl('/trocar')}
        openGraph={{
          title: `Trocar | ${site.name}`
        }}
      />

      <Header />

      <ExchangeProvider>
        <ExchangeLayout />
      </ExchangeProvider>

      <Footer />
    </>
  )
}

export default ExchangePage
