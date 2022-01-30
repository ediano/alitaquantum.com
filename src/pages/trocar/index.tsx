import { ExchangeProvider } from 'context/exchange'

import { Header } from 'components/Header'
import { ExchangeLayout } from 'layouts/Exchange'
import { Footer } from 'components/Footer'

const ExchangePage = () => {
  return (
    <>
      <Header />

      <ExchangeProvider>
        <ExchangeLayout />
      </ExchangeProvider>

      <Footer />
    </>
  )
}

export default ExchangePage
