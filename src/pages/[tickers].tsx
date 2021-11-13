import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'

import ChangeNow from 'services/ChangeNowService'
import { ExchangeProvider, DataFlow } from 'context/exchange'

import { site } from 'config/site'
import { getUrl } from 'utils/getUrl'

import { Spinner } from 'components/Spinner'
import { Header } from 'components/Header'
import { TickerLayout } from 'layouts/Ticker'
import { Footer } from 'components/Footer'

const tickers = [
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
      <NextSeo
        title={`Trocar ${props.data.fromName} por ${props.data.toName}`}
        canonical={getUrl(
          `/trocar-${props.data.fromCurrency}-por-${props.data.toCurrency}`
        )}
        openGraph={{
          url: getUrl('/trocar'),
          title: `Trocar ${props.data.fromName} por ${props.data.toName} | ${site.name}`,
          description: `Troque ${props.data.fromName} por ${props.data.toName} instantaneamente. Rápido, seguro e totalmente privado, com o melhor preço disponível somente aqui na Alita Quantum.`,
          site_name: site.name
        }}
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
    params: { tickers: `trocar-${from}-por-${to}` }
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

  const { data: currencies } = await ChangeNow.getCurrencies()

  const { data: range } = await ChangeNow.getRange({ ...initialProps })

  const fromAmount = String((range.minAmount * 250).toFixed(8))

  const f = currencies?.find((currency) => currency.ticker === from)
  const t = currencies?.find((currency) => currency.ticker === to)

  let limit = 0

  const suggestedCoins = currencies?.filter((currency) => {
    if (currency.ticker !== from && !currency.ticker.includes('usd')) {
      limit = limit + 1
    }
    return (
      limit <= 8 && currency.ticker !== from && !currency.ticker.includes('usd')
    )
  })

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
