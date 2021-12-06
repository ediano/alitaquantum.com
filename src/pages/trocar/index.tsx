import { ExchangeProvider } from 'context/exchange'

import { MetaSEO } from 'components/MetaSEO'

import { Header } from 'components/Header'
import { ExchangeLayout } from 'layouts/Exchange'
import { Footer } from 'components/Footer'

const ExchangePage = () => {
  return (
    <>
      <MetaSEO title="Trocar" pathUrl="/trocar" />

      <Header />

      <ExchangeProvider>
        <ExchangeLayout />
      </ExchangeProvider>

      <Footer />
    </>
  )
}

export default ExchangePage
