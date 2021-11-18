import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'

import * as ChangeNow from 'services/ChangeNowService'
import { ExchangeProvider, DataFlow } from 'context/exchange'

import { MetaSEO } from 'components/MetaSEO'

import { Spinner } from 'components/Spinner'
import { Header } from 'components/Header'
import { TickerLayout } from 'layouts/Ticker'
import { Footer } from 'components/Footer'

export const tickers = [
  { from: 'btc', to: 'eth' },
  { from: 'eth', to: 'bnb' },
  { from: 'bnb', to: 'xlm' },
  { from: 'xlm', to: 'trx' },
  { from: 'trx', to: 'xrp' },
  { from: 'xrp', to: 'xmr' },
  { from: 'btc', to: 'xlm' },
  { from: 'sol', to: 'dot' },
  { from: 'dot', to: 'ada' },
  { from: 'ada', to: 'doge' },
  { from: 'bnb', to: 'eth' },
  { from: 'eth', to: 'dot' },
  { from: 'btc', to: 'doge' },
  { from: 'trx', to: 'bnb' }
]

type SuggestedCoins = {
  name: string
  ticker: string
  network: string
  hasExternalId: string
  image: string
}

export type Props = {
  data: DataFlow
  suggestedCoins: SuggestedCoins[]
}

const TickersPage = (props: Props) => {
  const { isFallback } = useRouter()

  if (isFallback) {
    return (
      <Spinner
        heightBase="100vh"
        circle={{ width: '250px', height: '250px' }}
      />
    )
  }

  return (
    <>
      <MetaSEO
        title={`Trocar ${props.data.fromCurrency} para ${props.data.toCurrency}`}
        pathUrl={`trocar-${props.data.fromCurrency}-para-${props.data.toCurrency}`}
        description={`Troque ${props.data.fromCurrency} para ${props.data.toCurrency} instantaneamente. Rápido, seguro e totalmente privado, com o melhor preço disponível somente aqui na Alita Quantum.`}
      />

      <Header />

      <ExchangeProvider props={props.data}>
        <TickerLayout data={props.data} suggestedCoins={props.suggestedCoins} />
      </ExchangeProvider>

      <Footer />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = () => {
  const paths = tickers.map(({ from, to }) => ({
    params: { tickers: `trocar-${from}-para-${to}` }
  }))

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { tickers } = params as { tickers: string }
  const [, from, , to] = tickers.split('-')

  const initialProps = {
    fromCurrency: from,
    fromNetwork: from,
    toCurrency: to,
    toNetwork: to
  }

  const { data: availablePairs } = await ChangeNow.getAvailablePairs()
  const { data: currencies } = await ChangeNow.getCurrencies()

  const { data: range } = await ChangeNow.getRange({
    ...initialProps,
    flow: 'standard'
  })

  const fromAmount = String((range.minAmount * 250).toFixed(8))

  const f = currencies?.find((currency) => currency.ticker === from)
  const t = currencies?.find((currency) => currency.ticker === to)

  let limit = 0

  const suggestedCoins = availablePairs
    .filter((pair) => {
      if (limit >= 8) return null

      if (from !== pair.toCurrency && !pair.toCurrency.includes('usd')) {
        limit += 1
      }

      return (
        limit <= 8 &&
        from !== pair.toCurrency &&
        !pair.toCurrency.includes('usd')
      )
    })
    .map((item) => {
      const to = currencies.find(
        (currency) => currency.ticker === item.toCurrency
      )

      return {
        name: to?.name,
        ticker: to?.ticker,
        network: to?.network,
        hasExternalId: to?.hasExternalId,
        image: to?.image
      }
    })
    .filter((i) => i)

  return {
    props: {
      data: {
        ...initialProps,
        fromAmount,
        fromName: f?.name,
        fromCurrency: f?.ticker,
        fromNetwork: f?.network,
        fromId: f?.hasExternalId,
        fromImage: f?.image,
        toName: t?.name,
        toCurrency: t?.ticker,
        toNetwork: t?.network,
        toId: t?.hasExternalId,
        toImage: t?.image,
        minAmount: String(range.minAmount)
      },
      suggestedCoins
    },
    revalidate: 600000
  }
}

export default TickersPage
