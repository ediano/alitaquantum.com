import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'

import * as ChangeNow from 'services/ChangeNowService'
import { ExchangeProvider, DataFlow } from 'context/exchange'

import { MetaSEO } from 'components/MetaSEO'

import { Spinner } from 'components/Spinner'
import { Header } from 'components/Header'
import { TickerLayout } from 'layouts/Ticker'
import { Footer } from 'components/Footer'

import { getImage } from 'utils/getImage'

export const tickers = [
  { fromTicker: 'btc', from: 'btc', toTicker: 'eth', to: 'eth' },
  { fromTicker: 'eth', from: 'eth', toTicker: 'bnb', to: 'bnbmainnet' },
  { fromTicker: 'bnb', from: 'bnbmainnet', toTicker: 'xlm', to: 'xlm' },
  { fromTicker: 'xlm', from: 'xlm', toTicker: 'trx', to: 'trx' },
  { fromTicker: 'trx', from: 'trx', toTicker: 'xrp', to: 'xrp' },
  { fromTicker: 'xrp', from: 'xrp', toTicker: 'xmr', to: 'xmr' },
  { fromTicker: 'btc', from: 'btc', toTicker: 'xlm', to: 'xlm' },
  { fromTicker: 'sol', from: 'sol', toTicker: 'dot', to: 'dot' },
  { fromTicker: 'dot', from: 'dot', toTicker: 'ada', to: 'ada' },
  { fromTicker: 'eth', from: 'eth', toTicker: 'doge', to: 'doge' },
  { fromTicker: 'bnb', from: 'bnbmainnet', toTicker: 'eth', to: 'eth' },
  { fromTicker: 'eth', from: 'eth', toTicker: 'dot', to: 'dot' },
  { fromTicker: 'btc', from: 'btc', toTicker: 'doge', to: 'doge' },
  { fromTicker: 'trx', from: 'trx', toTicker: 'bnb', to: 'bnbmainnet' }
]

type SuggestedCoins = {
  name: string
  ticker: string
  network: string
  hasExternalId: string
  image: string
  legacyTicker: string
}

export type Props = {
  data: DataFlow
  suggestedCoins: SuggestedCoins[]
}

const TickerPage = ({ data, suggestedCoins }: Props) => {
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
        title={`Trocar ${
          data.fromName
        } (${data.fromCurrency?.toUpperCase()}) para ${
          data.toName
        } (${data.toCurrency?.toUpperCase()}) instantaneamente`}
        pathUrl={`trocar/${data.fromLegacyTicker}/${data.toLegacyTicker}`}
        description={`Trocar ${
          data.fromName
        } (${data.fromCurrency.toUpperCase()}) para ${
          data.toName
        } (${data.toCurrency.toUpperCase()}) instantaneamente. Rápido, seguro e totalmente privado, com o melhor preço disponível somente aqui na Alita Quantum.`}
      />

      <Header />

      <ExchangeProvider props={data}>
        <TickerLayout data={data} suggestedCoins={suggestedCoins} />
      </ExchangeProvider>

      <Footer />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = () => {
  const paths = tickers.map(({ from, to }) => ({
    params: { ticker: [from, to] }
  }))

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { ticker } = ctx.params as { ticker: string[] }
  const [fromLegacyTicker, toLegacyTicker] = ticker

  const [{ data: availablePairs }, { data: currencies }] = await Promise.all([
    ChangeNow.getAvailablePairs(),
    ChangeNow.getCurrencies()
  ])

  const from = currencies.find(
    (currency) => currency.legacyTicker === fromLegacyTicker
  )
  const to = currencies.find(
    (currency) => currency.legacyTicker === toLegacyTicker
  )

  const initialProps = {
    fromCurrency: from!.ticker,
    fromNetwork: from!.network,
    toCurrency: to!.ticker,
    toNetwork: to!.network
  }

  const { data: range } = await ChangeNow.getRange({
    ...initialProps,
    flow: 'standard'
  })

  if (!availablePairs.length && !currencies.length && !range.minAmount) {
    return {
      notFound: true,
      revalidate: 600000
    }
  }

  const fromAmount = String((range.minAmount * 250).toFixed(8))

  let limit = 0

  const suggestedCoins = availablePairs
    .filter((pair) => {
      if (limit >= 8) return null

      const isTicker = from!.ticker !== pair.toCurrency
      const isUsd = !pair.toCurrency.includes('usd')

      if (isTicker && isUsd) limit += 1

      return limit <= 8 && isTicker && isUsd
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
        image: getImage(to?.ticker as string),
        legacyTicker: to?.legacyTicker
      }
    })

  return {
    props: {
      data: {
        ...initialProps,
        fromAmount,
        fromName: from!.name,
        fromCurrency: from!.ticker,
        fromNetwork: from!.network,
        fromId: from!.hasExternalId,
        fromImage: getImage(from!.ticker),
        fromLegacyTicker: from!.legacyTicker,
        toName: to!.name,
        toCurrency: to!.ticker,
        toNetwork: to!.network,
        toId: to!.hasExternalId,
        toImage: getImage(to!.ticker),
        toLegacyTicker: to!.legacyTicker,
        minAmount: String(range.minAmount)
      },
      suggestedCoins
    },
    revalidate: 600000
  }
}

export default TickerPage
