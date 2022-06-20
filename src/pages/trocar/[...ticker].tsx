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

type Paths = { params: { ticker: [string, string] } }

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

export const getStaticPaths: GetStaticPaths = async () => {
  const [{ data: availablePairs }, { data: currencies }] = await Promise.all([
    ChangeNow.getAvailablePairs(),
    ChangeNow.getCurrencies()
  ])

  let limit = 0
  const paths: Paths[] = []

  for await (const pair of availablePairs) {
    if (limit > 2500) return { paths, fallback: 'blocking' }

    try {
      const from = currencies.find(
        ({ ticker, network }) =>
          ticker === pair.fromCurrency && network === pair.fromNetwork
      )
      const to = currencies.find(
        ({ ticker, network }) =>
          ticker === pair.toCurrency && network === pair.toNetwork
      )

      if (from && to) {
        await ChangeNow.getRange({
          flow: 'standard',
          fromCurrency: from.ticker,
          fromNetwork: from.network,
          toCurrency: from.ticker,
          toNetwork: from.network
        })

        limit += 1
        paths.push({
          params: { ticker: [from.legacyTicker, to.legacyTicker] }
        })
      }
    } catch (err) {}
  }

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { ticker } = ctx.params as { ticker: string[] }
  const [fromLegacyTicker, toLegacyTicker] = ticker

  try {
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

    const fromAmount = String((range.minAmount * 10).toFixed(8))

    let limit = 0

    const suggestedCoins = availablePairs
      .filter((pair) => {
        if (limit >= 8) return null

        const isFromTicker = from!.ticker === pair.fromCurrency
        const isToTicker = from!.ticker !== pair.toCurrency
        const isUsd = !pair.toCurrency.includes('usd')

        if (isFromTicker && isToTicker && isUsd) limit += 1

        return limit <= 8 && isFromTicker && isToTicker && isUsd
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
      revalidate: 60 * 60
    }
  } catch (err) {
    return {
      notFound: true,
      revalidate: 30
    }
  }
}

export default TickerPage
