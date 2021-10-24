import { NextSeo } from 'next-seo'

import { ExchangeProvider } from 'context/exchange'

import { site } from 'config/site'
import { getUrl } from 'utils/getUrl'

import { Header } from 'components/Header'
import { Footer } from 'components/Footer'

import { ValidatingTransaction } from 'components/ValidatingTransaction'

const ExchangePage = () => {
  return (
    <ExchangeProvider>
      <NextSeo
        title={'Exchange'}
        canonical={getUrl('/exchange')}
        openGraph={{
          url: getUrl('/exchange'),
          title: `Exchange | ${site.name}`,
          description: site.description,
          site_name: site.name
        }}
      />

      <Header />

      <main>
        <ValidatingTransaction />
      </main>

      <Footer />
    </ExchangeProvider>
  )
}

export default ExchangePage
