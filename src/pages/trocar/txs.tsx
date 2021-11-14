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
        nofollow={true}
        noindex={true}
        title={'Trocar moedas'}
        canonical={getUrl('/trocar/txs')}
        openGraph={{
          title: `Trocar moedas | ${site.name}`
        }}
      />

      <Header />

      <TXSLayout />

      <Footer />
    </>
  )
}

export default TXSPage
