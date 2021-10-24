import { NextSeo } from 'next-seo'

import { ExchangeProvider } from 'context/exchange'

import { site } from 'config/site'
import { getUrl } from 'utils/getUrl'

import { Header } from 'components/Header'
import { Footer } from 'components/Footer'

const DepositPage = () => {
  return (
    <ExchangeProvider>
      <NextSeo
        title={'Exchange'}
        canonical={getUrl('/depositar')}
        openGraph={{
          url: getUrl('/depositar'),
          title: `Depositar | ${site.name}`,
          description: site.description,
          site_name: site.name
        }}
      />

      <Header />

      <main></main>

      <Footer />
    </ExchangeProvider>
  )
}

export default DepositPage
