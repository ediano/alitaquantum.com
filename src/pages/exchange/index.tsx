import { NextSeo } from 'next-seo'

import { ExchangeProvider } from 'context/exchange'

import { site } from 'config/site'
import { getUrl } from 'utils/getUrl'

import { Header } from 'components/Header'
import { ExchangeLayout } from 'layouts/Exchange'
import Footer from 'components/Footer'

type Props = {
  estimated: any
}

const ExchangePage = ({ estimated }: Props) => {
  return (
    <ExchangeProvider>
      <NextSeo
        title="Exchange"
        canonical={getUrl('/exchange')}
        openGraph={{
          url: getUrl('/exchange'),
          title: `Exchange | ${site.name}`,
          description: site.description,
          site_name: site.name
        }}
      />

      <Header />

      <ExchangeLayout />

      <Footer />
    </ExchangeProvider>
  )
}

export default ExchangePage
