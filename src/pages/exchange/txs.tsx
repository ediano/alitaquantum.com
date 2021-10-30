import { NextSeo } from 'next-seo'

import { ExchangeProvider } from 'context/exchange'

import { site } from 'config/site'
import { getUrl } from 'utils/getUrl'

import { Header } from 'components/Header'
import { Footer } from 'components/Footer'

const TXSPage = () => {
  return (
    <ExchangeProvider>
      <NextSeo
        noindex={true}
        nofollow={true}
        title="Trocando moedas"
        canonical={getUrl('/tsx')}
        openGraph={{
          url: getUrl('/tsx'),
          title: `Trocando moedas | ${site.name}`,
          description: site.description,
          site_name: site.name
        }}
      />

      <Header />

      <Footer />
    </ExchangeProvider>
  )
}

export default TXSPage
