import { ExchangeProvider } from 'context/exchange'

import { MetaSEO } from 'components/MetaSEO'

import { Header } from 'components/Header'
import { ExchangeLayout } from 'layouts/Exchange'
import { Footer } from 'components/Footer'

const ExchangePage = () => {
  return (
    <>
      <MetaSEO
        title="Troca de criptomoeda com taxas mais baixas e sem registro"
        pathUrl="/trocar"
        description="Troque criptomoedas com taxas mais baixas e sem registro. Como Bitcoin, Ethereum, Solana, Shiba INU, Ripple, Baby Doge Coin, Stellar entre centenas de muitas outras."
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
