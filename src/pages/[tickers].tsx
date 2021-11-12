import { NextSeo } from 'next-seo'

import ChangeNow from 'services/ChangeNowService'
import { ExchangeProvider, DataFlow } from 'context/exchange'

import { site } from 'config/site'
import { getUrl } from 'utils/getUrl'

import { Header } from 'components/Header'
import { TickerLayout } from 'layouts/Ticker'
import { Footer } from 'components/Footer'
import { GetStaticPaths, GetStaticProps } from 'next'

const tickers = [
  { from: 'btc', to: 'eth' },
  { from: 'btc', to: 'bnb' },
  { from: 'bnb', to: 'btc' },
  { from: 'eth', to: 'btc' },
  { from: 'btc', to: 'trx' },
  { from: 'btc', to: 'xrp' },
  { from: 'eth', to: 'xrp' },
  { from: 'eth', to: 'bnb' },
  { from: 'btc', to: 'xlm' }
]

const TickersPage = (props: DataFlow) => {
  return (
    <>
      <NextSeo
        title="Trocar"
        canonical={getUrl('/trocar')}
        openGraph={{
          url: getUrl('/trocar'),
          title: `Trocar | ${site.name}`,
          description: site.description,
          site_name: site.name
        }}
      />

      <Header />

      <ExchangeProvider props={props}>
        <TickerLayout />
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

  return {
    props: {
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
    revalidate: 600000
  }
}

export default TickersPage
