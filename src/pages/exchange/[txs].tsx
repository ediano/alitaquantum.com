import { NextSeo } from 'next-seo'

import { site } from 'config/site'
import { getUrl } from 'utils/getUrl'

import { Header } from 'components/Header'
import { TXSLayout } from 'layouts/TXS'
import { Footer } from 'components/Footer'

const TXSPage = () => {
  return (
    <>
      <NextSeo
        noindex={true}
        nofollow={true}
        title="Trocando moedas"
        canonical={getUrl('/exchange/txs')}
        openGraph={{
          url: getUrl('/exchange/txs'),
          title: `Trocando moedas | ${site.name}`,
          description: site.description,
          site_name: site.name
        }}
      />

      <Header />

      <TXSLayout />

      <Footer />
    </>
  )
}

export default TXSPage
