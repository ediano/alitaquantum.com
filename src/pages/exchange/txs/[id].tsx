import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'

import ChangeNow, { TransactionStatus } from 'services/ChangeNowService'
import { site } from 'config/site'
import { getUrl } from 'utils/getUrl'

import { Header } from 'components/Header'
import { TXSLayout } from 'layouts/TXS'
import { Spinner } from 'components/Spinner'
import Footer from 'components/Footer'

type Props = { title: string } & TransactionStatus

const TXSPage = (props: Props) => {
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
        nofollow={true}
        noindex={true}
        title={`Trocar ${props.title}`}
        canonical={getUrl('/exchange/txs')}
        openGraph={{
          url: getUrl(`/exchange/txs/${props.id}`),
          title: `Trocar ${props.title} | ${site.name}`,
          description: site.description,
          site_name: site.name
        }}
      />

      <Header />

      <TXSLayout {...props} />

      <Footer />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string }

  const response = await ChangeNow.getTransactionStatus({ id })
  const { fromCurrency, toCurrency } = response.data

  const title = `${fromCurrency.toUpperCase()} para ${toCurrency.toUpperCase()}`

  return { props: { ...response.data, title } }
}

export default TXSPage
